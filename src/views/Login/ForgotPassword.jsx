import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input, Card, Alert, Typography } from "antd";
import {
  MailOutlined,
  ArrowLeftOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  SafetyOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;

// Reusable Info Block Component
const InfoBlock = ({ icon, title, description }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: "12px",
      padding: "16px",
      backgroundColor: "#F9FAFB",
      borderRadius: "8px",
    }}
  >
    {icon}
    <div>
      <p style={{ fontSize: "14px", fontWeight: 500, margin: 0 }}>{title}</p>
      <p style={{ fontSize: "12px", color: "#6B7280", margin: 0 }}>
        {description}
      </p>
    </div>
  </div>
);

// Reusable Security Notice Component
const SecurityNotice = () => (
  <div
    style={{
      marginTop: "24px",
      padding: "16px",
      backgroundColor: "#F9FAFB",
      borderRadius: "8px",
    }}
  >
    <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
      <SafetyOutlined
        style={{
          width: "20px",
          height: "20px",
          color: "#6B7280",
          marginTop: "2px",
        }}
      />
      <div>
        <Title
          level={5}
          style={{
            fontSize: "14px",
            fontWeight: 500,
            color: "#111827",
            margin: 0,
          }}
        >
          Security Notice
        </Title>
        <ul
          style={{
            fontSize: "12px",
            color: "#4B5563",
            marginTop: "4px",
            paddingLeft: "16px",
            listStyleType: "disc",
          }}
        >
          <li>Reset links are valid for 1 hour only</li>
          <li>Links can only be used once</li>
          <li>Check your spam folder if you don't see the email</li>
          <li>Contact support if you continue having issues</li>
        </ul>
      </div>
    </div>
  </div>
);

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  // Data for info blocks in submitted state
  const infoBlocks = [
    {
      icon: (
        <ClockCircleOutlined
          style={{ width: "20px", height: "20px", color: "#6B7280" }}
        />
      ),
      title: "Link expires in 1 hour",
      description: "Please check your email and click the reset link",
    },
    {
      icon: (
        <SafetyOutlined
          style={{ width: "20px", height: "20px", color: "#6B7280" }}
        />
      ),
      title: "Secure reset process",
      description: "The link is unique and can only be used once",
    },
  ];

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Please enter your email address");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 2000);
  };

  const handleBackToLogin = () => {
    navigate("/");
  };

  const handleResendEmail = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ width: "100%" }}>
          <Card
            style={{
              border: "none",
            }}
          >
            <div style={{ textAlign: "center", paddingBottom: "24px" }}>
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  backgroundColor: "#DCFCE7",
                  borderRadius: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px",
                }}
              >
                <CheckCircleOutlined
                  style={{ fontSize: "30px", height: "32px", color: "#16A34A" }}
                />
              </div>
              <Title level={2} style={{ fontSize: "24px", margin: 0 }}>
                Check Your Email
              </Title>
              <Paragraph style={{ fontSize: "16px", margin: 0 }}>
                We've sent password reset instructions to your email
              </Paragraph>
            </div>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "24px" }}
            >
              <Alert
                style={{ borderColor: "#BBF7D0", backgroundColor: "#F0FDF4" }}
                showIcon
                icon={
                  <MailOutlined
                    style={{ width: "16px", height: "16px", color: "#16A34A" }}
                  />
                }
                message={
                  <Text style={{ color: "#14532D" }}>
                    A password reset link has been sent to{" "}
                    <strong>{email}</strong>
                  </Text>
                }
                type="success"
              />

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                {infoBlocks.map((block, index) => (
                  <InfoBlock
                    key={index}
                    icon={block.icon}
                    title={block.title}
                    description={block.description}
                  />
                ))}
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                <p
                  style={{
                    fontSize: "14px",
                    textAlign: "center",
                    color: "#4B5563",
                  }}
                >
                  Didn't receive the email? Check your spam folder or
                </p>
                <Button
                  onClick={handleResendEmail}
                  type="default"
                  block
                  disabled={isLoading}
                >
                  {isLoading ? "Sending..." : "Resend Email"}
                </Button>
              </div>

              <div
                style={{ paddingTop: "16px", borderTop: "1px solid #E5E7EB" }}
              >
                <Button
                  onClick={handleBackToLogin}
                  type="link"
                  block
                  style={{ color: "#1677FF" }}
                >
                  <ArrowLeftOutlined
                    style={{
                      width: "16px",
                      height: "16px",
                      marginRight: "8px",
                    }}
                  />
                  Back to Sign In
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ width: "100%" }}>
        <Card
          style={{
            border: "none",
          }}
        >
          <div style={{ textAlign: "center", paddingBottom: "24px" }}>
            <div
              style={{
                width: "64px",
                height: "64px",
                backgroundColor: "#1677FF",
                borderRadius: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px",
              }}
            >
              <SafetyOutlined
                style={{ height: "32px", color: "#FFFFFF", fontSize: "30px" }}
              />
            </div>
            <Title level={2} style={{ fontSize: "24px", margin: 0 }}>
              Forgot Password?
            </Title>
            <Paragraph style={{ fontSize: "16px", margin: 0 }}>
              No worries! Enter your email and we'll send you reset instructions
            </Paragraph>
          </div>

          <div>
            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: "24px" }}
            >
              <div
                style={{ display: "flex", flexDirection: "column", gap: "8px" }}
              >
                <label
                  htmlFor="email"
                  style={{ fontSize: "14px", fontWeight: 500 }}
                >
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  prefix={
                    <MailOutlined
                      style={{
                        width: "16px",
                        height: "16px",
                        color: "#6B7280",
                      }}
                    />
                  }
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  disabled={isLoading}
                />
                {error && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      fontSize: "14px",
                      color: "#EF4444",
                    }}
                  >
                    <ExclamationCircleOutlined
                      style={{ width: "16px", height: "16px" }}
                    />
                    {error}
                  </div>
                )}
              </div>

              <Alert
                style={{ borderColor: "#BFDBFE", backgroundColor: "#EFF6FF" }}
                showIcon
                icon={
                  <MailOutlined
                    style={{ width: "16px", height: "16px", color: "#2563EB" }}
                  />
                }
                message={
                  <Text style={{ color: "#1E3A8A" }}>
                    We'll send a secure link to reset your password. The link
                    will expire in 1 hour for security.
                  </Text>
                }
                type="info"
              />

              <Button
                type="primary"
                htmlType="submit"
                style={{ height: "48px" }}
                loading={isLoading}
                block
              >
                {isLoading ? "Sending Reset Link..." : "Send Reset Link"}
              </Button>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                <div style={{ position: "relative" }}>
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{ width: "100%", borderTop: "1px solid #E5E7EB" }}
                    />
                  </div>
                  <div
                    style={{
                      position: "relative",
                      display: "flex",
                      justifyContent: "center",
                      fontSize: "12px",
                      textTransform: "uppercase",
                    }}
                  >
                    <span
                      style={{
                        backgroundColor: "#FFFFFF",
                        padding: "0 8px",
                        color: "#6B7280",
                      }}
                    >
                      Remember your password?
                    </span>
                  </div>
                </div>

                <Button
                  type="link"
                  onClick={handleBackToLogin}
                  style={{ color: "#1677FF" }}
                  block
                >
                  <ArrowLeftOutlined
                    style={{
                      width: "16px",
                      height: "16px",
                      marginRight: "8px",
                    }}
                  />
                  Back to Sign In
                </Button>
              </div>
            </form>

            <SecurityNotice />
          </div>
        </Card>
      </div>
    </div>
  );
};
