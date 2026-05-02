import { useState, useEffect, useContext } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  Typography,
  Alert,
  Modal,
  Card,
  Space,
} from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import {
  loginAdmin,
  loginVendor,
  resendVendor2FA,
  verifyVendor2FA,
} from "../../services/authService";
import SignupPage from "./SignupPage";
import { ForgotPassword } from "./ForgotPassword";

const { Title, Text } = Typography;

function Formpage({ mode = "vendor" }) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [form] = Form.useForm();
  const [clientReady, setClientReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSignupModalVisible, setIsSignupModalVisible] = useState(false);
  const [isForgotPasswordModalVisible, setIsForgotPasswordModalVisible] =
    useState(false);
  const [isOtpModalVisible, setIsOtpModalVisible] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [otpChallengeId, setOtpChallengeId] = useState("");
  const [otpChannel, setOtpChannel] = useState("email");
  const [otpLoading, setOtpLoading] = useState(false);
  const [resendingOtp, setResendingOtp] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const isAdminLogin = mode === "admin";
  const loginTitle = isAdminLogin ? "Admin Login" : "Vendor Login";
  const loginDescription = isAdminLogin
    ? "Sign in with your admin account to access the admin dashboard."
    : "Please enter your vendor login details to continue.";

  useEffect(() => {
    setClientReady(true);
  }, []);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const authenticate = isAdminLogin ? loginAdmin : loginVendor;
      const {
        token,
        role,
        requires2FA,
        challengeId,
        channel,
        message: loginMessage,
      } = await authenticate(values);

      if (requires2FA && role === "vendor") {
        setOtpChallengeId(challengeId || "");
        setOtpChannel(channel || "email");
        setOtpCode("");
        setIsOtpModalVisible(true);
        setError(loginMessage || "Enter OTP to continue.");
        return;
      }

      login(token, role);
      setError("");

      if (role === "admin") {
        navigate("/admin/dashboard");
      } else if (role === "vendor") {
        navigate("/vendors/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(err.message || "Failed to login. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otpChallengeId) {
      setError("OTP session expired. Please login again.");
      setIsOtpModalVisible(false);
      return;
    }

    if (!otpCode.trim()) {
      setError("Please enter the OTP code.");
      return;
    }

    try {
      setOtpLoading(true);
      const { token, role } = await verifyVendor2FA({
        challengeId: otpChallengeId,
        otp: otpCode.trim(),
      });
      login(token, role);
      setError("");
      setIsOtpModalVisible(false);
      setOtpCode("");
      setOtpChallengeId("");
      navigate("/vendors/dashboard");
    } catch (err) {
      setError(err.message || "Failed to verify OTP.");
    } finally {
      setOtpLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!otpChallengeId) {
      setError("OTP session expired. Please login again.");
      setIsOtpModalVisible(false);
      return;
    }

    try {
      setResendingOtp(true);
      const messageText = await resendVendor2FA(otpChallengeId);
      setError("");
      Modal.success({
        title: "OTP Sent",
        content: messageText,
      });
    } catch (err) {
      setError(err.message || "Failed to resend OTP.");
    } finally {
      setResendingOtp(false);
    }
  };

  const showSignupModal = () => {
    setIsSignupModalVisible(true);
  };

  const handleSignupCancel = () => {
    setIsSignupModalVisible(false);
  };

  const showForgotPasswordModal = () => {
    setIsForgotPasswordModalVisible(true);
  };

  const handleForgotPasswordCancel = () => {
    setIsForgotPasswordModalVisible(false);
  };

  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <Card
        style={{
          width: "100%",
          maxWidth: 470,
          borderRadius: 14,
          border: "1px solid #e6ebf1",
          boxShadow: "0 18px 40px rgba(15, 23, 42, 0.08)",
        }}
      >
        <div style={{ marginBottom: 20 }}>
          <Text
            style={{
              display: "inline-block",
              padding: "4px 10px",
              borderRadius: 999,
              background: "#e6f4ea",
              color: "#1b5e20",
              fontFamily: "NeueHaasDisplayRoman",
              marginBottom: 10,
            }}
          >
            Secure Access
          </Text>
          <Title
            level={3}
            style={{
              margin: 0,
              fontSize: 30,
              lineHeight: "36px",
              fontFamily: "NeueHaasDisplayMediu",
              color: "#101828",
            }}
          >
            {loginTitle}
          </Title>
          <Text
            style={{
              display: "block",
              marginTop: 8,
              color: "#667085",
              fontFamily: "NeueHaasDisplayRoman",
            }}
          >
            {loginDescription}
          </Text>
        </div>

        {error ? (
          <Alert
            message={error}
            type="error"
            showIcon
            style={{ marginBottom: 16 }}
          />
        ) : null}

        <Form
          form={form}
          name="horizontal_login"
          layout="vertical"
          onFinish={onFinish}
          requiredMark={false}
        >
          <Form.Item
            name="email"
            label="Email Address"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email address!" },
            ]}
          >
            <Input
              size="large"
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email address"
              autoComplete="email"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input
              size="large"
              prefix={<LockOutlined className="site-form-item-icon" />}
              type={passwordVisible ? "text" : "password"}
              placeholder="Password"
              autoComplete="current-password"
              suffix={
                passwordVisible ? (
                  <EyeTwoTone onClick={() => setPasswordVisible(false)} />
                ) : (
                  <EyeInvisibleOutlined
                    onClick={() => setPasswordVisible(true)}
                  />
                )
              }
            />
          </Form.Item>

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              type="link"
              style={{ paddingInline: 0, color: "#0b6b6f" }}
              onClick={showForgotPasswordModal}
              disabled={isAdminLogin}
            >
              Forgot Password?
            </Button>
          </div>

          <Form.Item shouldUpdate style={{ marginTop: 8, marginBottom: 10 }}>
            {() => (
              <Button
                style={{
                  width: "100%",
                  height: 46,
                  backgroundColor: "#034147",
                  color: "white",
                }}
                type="primary"
                htmlType="submit"
                loading={loading}
                disabled={
                  loading ||
                  !clientReady ||
                  !form.isFieldsTouched(true) ||
                  !!form.getFieldsError().filter(({ errors }) => errors.length)
                    .length
                }
              >
                Continue
              </Button>
            )}
          </Form.Item>

          <div
            style={{
              justifyContent: "space-between",
              alignContent: "center",
              display: "flex",
              borderTop: "1px solid #eef2f7",
              paddingTop: 10,
            }}
          >
            <p
              style={{
                fontSize: "15px",
                lineHeight: "26px",
                fontFamily: "NeueHaasDisplayRoman",
                color: "#667085",
                marginBottom: 0,
              }}
            >
              {isAdminLogin
                ? ""
                : "Don't have an account yet? "}
            </p>
            {!isAdminLogin ? (
              <Button
                style={{
                  border: "none",
                  color: "#0b6b6f",
                  fontSize: "15px",
                  lineHeight: "26px",
                  fontFamily: "NeueHaasDisplayLight",
                  paddingInline: 4,
                }}
                onClick={showSignupModal}
              >
                Sign up
              </Button>
            ) : null}
          </div>
        </Form>
      </Card>

      {!isAdminLogin ? (
        <Modal
          title="Sign Up"
          open={isSignupModalVisible}
          onCancel={handleSignupCancel}
          footer={null}
          width={860}
          maskClosable={false}
          styles={{ body: { maxHeight: "75vh", overflowY: "auto" } }}
        >
          <SignupPage onClose={handleSignupCancel} />
        </Modal>
      ) : null}

      {!isAdminLogin ? (
        <Modal
          title="Forgot Password"
          open={isForgotPasswordModalVisible}
          onCancel={handleForgotPasswordCancel}
          footer={null}
          width={860}
          maskClosable={false}
          styles={{ body: { maxHeight: "75vh", overflowY: "auto" } }}
        >
          <ForgotPassword onClose={handleForgotPasswordCancel} />
        </Modal>
      ) : null}

      {/* OTP Modal */}
      <Modal
        title="Two-Factor Authentication"
        open={isOtpModalVisible}
        onCancel={() => {
          if (otpLoading) return;
          setIsOtpModalVisible(false);
          setOtpCode("");
          setOtpChallengeId("");
        }}
        footer={[
          <Button key="resend" onClick={handleResendOtp} loading={resendingOtp}>
            Resend OTP
          </Button>,
          <Button
            key="verify"
            type="primary"
            loading={otpLoading}
            onClick={handleVerifyOtp}
          >
            Verify & Login
          </Button>,
        ]}
        maskClosable={false}
      >
        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          <Text type="secondary">
            Enter the OTP sent to your{" "}
            {otpChannel === "sms"
              ? "configured channel (email fallback)"
              : "email"}
            .
          </Text>
          <Input
            value={otpCode}
            onChange={(event) => setOtpCode(event.target.value)}
            placeholder="Enter OTP code"
            maxLength={10}
            size="large"
          />
        </Space>
      </Modal>
    </div>
  );
}

export default Formpage;
