import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input, Alert, Typography, Form, message } from "antd";
import {
  MailOutlined,
  ArrowLeftOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  SafetyOutlined,
  KeyOutlined,
  LockOutlined,
} from "@ant-design/icons";
import axios from "axios";

const { Title, Paragraph, Text } = Typography;
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api";

export const ForgotPassword = ({ onClose }) => {
  const [form] = Form.useForm();
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const emailValue = Form.useWatch("email", form);

  const handleBackToLogin = () => {
    if (onClose) {
      onClose();
    } else {
      navigate("/login");
    }
  };

  const handleSendOtp = async () => {
    try {
      setError("");
      const email = form.getFieldValue("email");
      if (!email) {
        setError("Please enter your email address first.");
        return;
      }

      await form.validateFields(["email"]);

      setIsSendingOtp(true);
      await axios.post(`${API_BASE_URL}/forgot-password/vendor/send-otp`, {
        email,
      });

      setOtpSent(true);
      message.success("OTP sent to your email.");
    } catch (sendError) {
      setError(
        sendError.response?.data?.message ||
          sendError.message ||
          "Failed to send OTP.",
      );
    } finally {
      setIsSendingOtp(false);
    }
  };

  const handleResetPassword = async (values) => {
    try {
      setError("");
      setIsResetting(true);

      await axios.post(`${API_BASE_URL}/forgot-password/vendor/reset`, {
        email: values.email,
        otp: values.otp,
        password: values.password,
        password_confirmation: values.confirmPassword,
      });

      setResetSuccess(true);
      message.success("Password reset successful.");
    } catch (resetError) {
      setError(
        resetError.response?.data?.message ||
          resetError.message ||
          "Failed to reset password.",
      );
    } finally {
      setIsResetting(false);
    }
  };

  // Success Screen
  if (resetSuccess) {
    return (
      <div>
        <div style={{ textAlign: "center", paddingBottom: 12 }}>
          <div
            style={{
              width: 56,
              height: 56,
              backgroundColor: "#DCFCE7",
              borderRadius: 14,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 12px",
            }}
          >
            <CheckCircleOutlined style={{ fontSize: 26, color: "#16A34A" }} />
          </div>
          <Title level={3} style={{ marginBottom: 8 }}>
            Password Reset Complete
          </Title>
          <Paragraph style={{ marginBottom: 0 }}>
            Your password has been updated successfully. You can now sign in
            with your new password.
          </Paragraph>
        </div>

        <Button type="primary" block size="large" onClick={handleBackToLogin}>
          <ArrowLeftOutlined /> Back to Sign In
        </Button>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div style={{ textAlign: "center", paddingBottom: 16 }}>
        <div
          style={{
            width: 56,
            height: 56,
            backgroundColor: "#034147",
            borderRadius: 14,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 12px",
          }}
        >
          <SafetyOutlined style={{ color: "#FFFFFF", fontSize: 26 }} />
        </div>
        <Title level={3} style={{ marginBottom: 8 }}>
          Forgot Password
        </Title>
        <Paragraph style={{ marginBottom: 0 }}>
          Enter your details below. Use "Send OTP" first, then reset password.
        </Paragraph>
      </div>

      {/* Error Alert */}
      {error && (
        <Alert
          style={{ marginBottom: 14 }}
          showIcon
          type="error"
          icon={<ExclamationCircleOutlined />}
          message={error}
        />
      )}

      {/* OTP Sent Alert */}
      {otpSent && (
        <Alert
          style={{ marginBottom: 14 }}
          showIcon
          type="success"
          message={`OTP sent to ${emailValue || "your email"}.`}
        />
      )}

      <Form
        form={form}
        layout="vertical"
        requiredMark={false}
        onFinish={handleResetPassword}
      >
        {/* Responsive Grid for Input Fields */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 12,
          }}
        >
          <Form.Item
            label="Email Address"
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input
              size="large"
              prefix={<MailOutlined />}
              placeholder="you@example.com"
            />
          </Form.Item>

          <Form.Item
            label="OTP Code"
            name="otp"
            rules={[{ required: true, message: "Please enter OTP" }]}
          >
            <Input
              size="large"
              prefix={<KeyOutlined />}
              placeholder="6-digit code"
              maxLength={6}
            />
          </Form.Item>

          <Form.Item
            label="New Password"
            name="password"
            rules={[
              { required: true, message: "Please enter new password" },
              { min: 8, message: "Password must be at least 8 characters" },
            ]}
          >
            <Input.Password
              size="large"
              prefix={<LockOutlined />}
              placeholder="New password"
            />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Please confirm your password" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match"));
                },
              }),
            ]}
          >
            <Input.Password
              size="large"
              prefix={<LockOutlined />}
              placeholder="Confirm password"
            />
          </Form.Item>
        </div>

        {/* Responsive Buttons */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 12,
            marginTop: 8,
          }}
        >
          <Button
            block
            type="default"
            size="large"
            loading={isSendingOtp}
            onClick={handleSendOtp}
          >
            {isSendingOtp ? "Sending OTP..." : "Send OTP"}
          </Button>

          <Button
            block
            type="primary"
            size="large"
            htmlType="submit"
            loading={isResetting}
            style={{ background: "#034147" }}
          >
            {isResetting ? "Resetting..." : "Reset Password"}
          </Button>
        </div>

        {/* Back to Login Link */}
        <div style={{ marginTop: 16, textAlign: "center" }}>
          <Text style={{ color: "#667085" }}>Remember your password? </Text>
          <Button
            type="link"
            onClick={handleBackToLogin}
            style={{ padding: 0 }}
          >
            <ArrowLeftOutlined /> Back to Sign In
          </Button>
        </div>
      </Form>
    </div>
  );
};
