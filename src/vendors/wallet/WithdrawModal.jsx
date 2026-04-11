import React, { useEffect, useMemo, useState } from "react";
import { Modal, Form, Input, Button, Typography, Select, message } from "antd";
import { DollarOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import axios from "axios";

const { Text } = Typography;
const { Option } = Select;
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api";

const WithdrawModal = ({
  isModalOpen,
  setIsModalOpen,
  availableBalance,
  onWithdraw,
  withdrawing,
}) => {
  const [form] = Form.useForm();
  const [banks, setBanks] = useState([]);
  const [loadingBanks, setLoadingBanks] = useState(false);
  const [resolving, setResolving] = useState(false);

  const bankCode = Form.useWatch("bank_code", form);
  const accountNumber = Form.useWatch("account_number", form);

  const canResolve = useMemo(
    () => Boolean(bankCode && String(accountNumber || "").length === 10),
    [bankCode, accountNumber]
  );

  const handleWithdraw = async (values) => {
    await onWithdraw(values, form);
  };

  useEffect(() => {
    const fetchBanks = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }

      try {
        setLoadingBanks(true);
        const response = await axios.get(`${API_BASE_URL}/vendor/wallet/banks`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
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

    if (isModalOpen) {
      fetchBanks();
    }
  }, [isModalOpen]);

  useEffect(() => {
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
        const response = await axios.get(`${API_BASE_URL}/vendor/wallet/resolve`, {
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
  }, [accountNumber, bankCode, canResolve, form]);

  return (
    <Modal
      title="Withdraw Funds"
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={handleWithdraw}>
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
          name="bank_code"
          label="Bank"
          rules={[{ required: true, message: "Select a bank" }]}
        >
          <Select
            showSearch
            placeholder="Select bank"
            loading={loadingBanks}
            optionFilterProp="children"
            filterOption={(input, option) =>
              String(option?.children || "")
                .toLowerCase()
                .includes(input.toLowerCase())
            }
          >
            {banks.map((bank) => (
              <Option key={bank.code} value={bank.code}>
                {bank.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="account_name" label="Account Name">
          <Input
            placeholder={resolving ? "Resolving account name..." : "John Doe"}
            disabled={resolving}
          />
        </Form.Item>

        <Form.Item name="description" label="Description (Optional)">
          <Input placeholder="Vendor wallet withdrawal" />
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
            Bank transfers take 1–3 business days. PayPal is instant. A small
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
