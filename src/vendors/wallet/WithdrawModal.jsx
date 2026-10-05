import React, { useEffect, useMemo, useState } from "react";
import {
  Modal,
  Form,
  Input,
  Button,
  Typography,
  Select,
  Checkbox,
  message,
} from "antd";
import { DollarOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import axios from "axios";

const { Text } = Typography;
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api";

const WithdrawModal = ({
  isModalOpen,
  setIsModalOpen,
  availableBalance,
  onWithdraw,
  withdrawing,
  currencyCode = "NGN",
  endpointPrefix = "/vendor/wallet",
}) => {
  const [form] = Form.useForm();
  const [banks, setBanks] = useState([]);
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [loadingBanks, setLoadingBanks] = useState(false);
  const [loadingBeneficiaries, setLoadingBeneficiaries] = useState(false);
  const [resolving, setResolving] = useState(false);

  const bankCode = Form.useWatch("bank_code", form);
  const accountNumber = Form.useWatch("account_number", form);

  const canResolve = useMemo(
    () => Boolean(bankCode && bankCode !== "MANUAL" && String(accountNumber || "").length === 10),
    [bankCode, accountNumber]
  );

  const bankOptions = useMemo(() => {
    const seen = new Set();
    return banks.reduce((options, bank, index) => {
      const name = String(bank?.name || "").trim();
      if (!name || seen.has(name.toLowerCase())) return options;
      seen.add(name.toLowerCase());
      options.push({
        value: name,
        label: name,
        key: `${String(bank.code || "bank")}-${index}`,
        bankCode: bank.code,
      });
      return options;
    }, []);
  }, [banks]);

  const syncBank = (bankName) => {
    const selected = banks.find(
      (bank) => String(bank?.name || "").trim().toLowerCase() === String(bankName || "").trim().toLowerCase()
    );
    form.setFieldsValue({
      bank_name: bankName,
      bank_code: selected?.code || "MANUAL",
    });
  };

  const applyBeneficiary = (beneficiaryId) => {
    const selected = beneficiaries.find(
      (item) => String(item.id) === String(beneficiaryId)
    );

    if (!selected) {
      return;
    }

    form.setFieldsValue({
      beneficiary_id: selected.id,
      bank_code: selected.bank_code || undefined,
      bank_name: selected.bank_name || "",
      account_number: selected.account_number || "",
      account_name: selected.account_name || "",
    });
  };

  const handleWithdraw = async (values) => {
    await onWithdraw(values, form);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!isModalOpen || !token) {
      return;
    }

    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    };

    const fetchBanks = async () => {
      try {
        setLoadingBanks(true);
        const country = String(currencyCode).toUpperCase() === "ZAR" ? "south africa" : "nigeria";
        const response = await axios.get(`${API_BASE_URL}${endpointPrefix}/banks`, {
          params: { country },
          headers,
        });
        setBanks(response.data?.data || []);
      } catch (error) {
        message.error(
          error.response?.data?.message || "Failed to load bank list."
        );
      } finally {
        setLoadingBanks(false);
      }
    };

    const fetchBeneficiaries = async () => {
      try {
        setLoadingBeneficiaries(true);
        const response = await axios.get(
          `${API_BASE_URL}${endpointPrefix}/beneficiaries`,
          { headers }
        );
        setBeneficiaries(response.data?.data || []);
      } catch (error) {
        setBeneficiaries([]);
      } finally {
        setLoadingBeneficiaries(false);
      }
    };

    fetchBanks();
    fetchBeneficiaries();
  }, [currencyCode, endpointPrefix, isModalOpen]);

  useEffect(() => {
    if (!isModalOpen) {
      form.resetFields();
      form.setFieldValue("save_as_beneficiary", true);
      return;
    }

    if (!canResolve) {
      form.setFieldValue("account_name", "");
      return;
    }

    const resolveAccount = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }

      try {
        setResolving(true);
        const response = await axios.get(`${API_BASE_URL}${endpointPrefix}/resolve`, {
          params: {
            bank_code: bankCode,
            account_number: accountNumber,
          },
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        form.setFieldValue(
          "account_name",
          response.data?.data?.account_name || form.getFieldValue("account_name")
        );
      } catch (error) {
        form.setFieldValue("account_name", "");
      } finally {
        setResolving(false);
      }
    };

    resolveAccount();
  }, [accountNumber, bankCode, canResolve, endpointPrefix, form, isModalOpen]);

  return (
    <Modal
      title="Withdraw Funds"
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleWithdraw}
        initialValues={{ save_as_beneficiary: true }}
      >
        <Form.Item name="beneficiary_id" label="Saved Beneficiary">
          <Select
            allowClear
            showSearch
            placeholder="Select saved beneficiary"
            loading={loadingBeneficiaries}
            optionFilterProp="label"
            onChange={applyBeneficiary}
            options={beneficiaries.map((item) => ({
              value: item.id,
              label: `${item.account_name || "Beneficiary"} - ${
                item.bank_name || "Bank"
              } (${item.account_number_masked || item.account_number || ""})`,
            }))}
          />
        </Form.Item>

        <Form.Item
          name="amount"
          label="Amount"
          rules={[
            { required: true, message: "Enter withdrawal amount" },
            {
              validator: (_, value) => {
                const numeric = Number(value);
                if (!value || numeric <= 0) {
                  return Promise.reject(
                    new Error("Withdrawal amount must be greater than 0")
                  );
                }
                if (numeric > Number(availableBalance || 0)) {
                  return Promise.reject(
                    new Error("Amount exceeds available balance")
                  );
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input
            type="number"
            prefix={<DollarOutlined />}
            placeholder="0.00"
            max={availableBalance}
          />
        </Form.Item>

        <Form.Item
          name="account_number"
          label="Account Number"
          rules={[
            { required: true, message: "Enter account number" },
            { len: 10, message: "Account number must be 10 digits" },
          ]}
        >
          <Input inputMode="numeric" placeholder="0123456789" maxLength={10} />
        </Form.Item>

        <Form.Item
          name="bank_name"
          label="Bank Name"
          rules={[{ required: true, message: "Enter bank name" }]}
        >
          <Select
            mode="combobox"
            showSearch
            allowClear
            placeholder={loadingBanks ? "Loading banks... or type a bank name" : "Select or type bank name"}
            loading={loadingBanks}
            options={bankOptions}
            filterOption={(input, option) =>
              String(option?.label || "").toLowerCase().includes(String(input || "").toLowerCase())
            }
            onChange={syncBank}
            onSearch={(value) => {
              if (value) syncBank(value);
            }}
          />
        </Form.Item>

        <Form.Item name="bank_code" initialValue="MANUAL" hidden>
          <Input />
        </Form.Item>

        <Form.Item name="account_name" label="Account Name">
          <Input
            placeholder={resolving ? "Resolving account name..." : "John Doe"}
            disabled={resolving}
          />
        </Form.Item>

        <Form.Item name="description" label="Description (Optional)">
          <Input placeholder="Wallet withdrawal" />
        </Form.Item>

        <Form.Item name="save_as_beneficiary" valuePropName="checked">
          <Checkbox>Save as beneficiary</Checkbox>
        </Form.Item>

        <Form.Item
          name="transaction_pin"
          label="Transaction PIN"
          rules={[
            { required: true, message: "Enter your transaction PIN" },
            { len: 6, message: "PIN must be 6 digits" },
          ]}
        >
          <Input.Password inputMode="numeric" maxLength={6} placeholder="******" />
        </Form.Item>

        <div
          style={{
            background: "#e6f7ff",
            padding: 10,
            borderRadius: 8,
            marginBottom: 16,
          }}
        >
          <ExclamationCircleOutlined style={{ color: "#1890ff" }} />{" "}
          <Text type="secondary">
            Withdrawals are processed within 24 business hours. A small
            processing fee may apply.
          </Text>
        </div>

        <Button type="primary" htmlType="submit" block loading={withdrawing}>
          Withdraw
        </Button>
      </Form>
    </Modal>
  );
};

export default WithdrawModal;
