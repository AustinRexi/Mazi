import { useEffect, useState } from "react";
import {
  Modal,
  Form,
  Input,
  Button,
  Typography,
  Select,
  Checkbox,
} from "antd";
import { DollarOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import axios from "axios";
import PropTypes from "prop-types";

const { Text } = Typography;
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api";

const WithdrawModal = ({
  isModalOpen,
  setIsModalOpen,
  availableBalance,
  onWithdraw,
  withdrawing,
  endpointPrefix = "/vendor/wallet",
}) => {
  const [form] = Form.useForm();
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [loadingBeneficiaries, setLoadingBeneficiaries] = useState(false);

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

    fetchBeneficiaries();
  }, [endpointPrefix, isModalOpen]);

  useEffect(() => {
    if (!isModalOpen) {
      form.resetFields();
      form.setFieldValue("save_as_beneficiary", true);
      return;
    }

  }, [form, isModalOpen]);

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
          <Input placeholder="Enter bank name" />
        </Form.Item>

        <Form.Item name="bank_code" initialValue="MANUAL" hidden>
          <Input />
        </Form.Item>

        <Form.Item
          name="account_name"
          label="Account Name"
          rules={[{ required: true, message: "Enter the account name" }]}
        >
          <Input placeholder="Name shown on the bank account" />
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
            The admin will verify these details and send approved withdrawals
            manually. Confirm the bank information carefully before submitting.
          </Text>
        </div>

        <Button type="primary" htmlType="submit" block loading={withdrawing}>
          Withdraw
        </Button>
      </Form>
    </Modal>
  );
};

WithdrawModal.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  setIsModalOpen: PropTypes.func.isRequired,
  availableBalance: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    .isRequired,
  onWithdraw: PropTypes.func.isRequired,
  withdrawing: PropTypes.bool,
  endpointPrefix: PropTypes.string,
};

export default WithdrawModal;
