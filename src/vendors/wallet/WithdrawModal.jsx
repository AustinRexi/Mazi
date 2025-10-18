import React from "react";
import { Modal, Form, Input, Select, Button, Typography } from "antd";
import { DollarOutlined, ExclamationCircleOutlined } from "@ant-design/icons";

const { Text } = Typography;
const { Option } = Select;

const WithdrawModal = ({ isModalOpen, setIsModalOpen, availableBalance }) => {
  const [form] = Form.useForm();

  const handleWithdraw = (values) => {
    console.log(values);
    setIsModalOpen(false);
    form.resetFields();
  };

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
          rules={[{ required: true, message: "Enter withdrawal amount" }]}
        >
          <Input
            type="number"
            prefix={<DollarOutlined />}
            placeholder="0.00"
            max={availableBalance}
          />
        </Form.Item>

        <Form.Item
          name="method"
          label="Withdrawal Method"
          rules={[{ required: true, message: "Select a method" }]}
        >
          <Select placeholder="Select method">
            <Option value="bank">Bank Account (****1234)</Option>
            <Option value="paypal">PayPal (john@example.com)</Option>
            <Option value="stripe">Stripe Express</Option>
          </Select>
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

        <Button type="primary" htmlType="submit" block>
          Withdraw
        </Button>
      </Form>
    </Modal>
  );
};

export default WithdrawModal;
