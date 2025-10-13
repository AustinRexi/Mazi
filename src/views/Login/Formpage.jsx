import { useState, useEffect, useContext } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Typography, Alert, Modal } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { loginUser } from "../../services/authService";
import SignupPage from "./SignupPage";

import { ForgotPassword } from "./ForgotPassword";

const { Title } = Typography;

function Formpage() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [form] = Form.useForm();
  const [clientReady, setClientReady] = useState(false);
  const [error, setError] = useState("");
  const [isSignupModalVisible, setIsSignupModalVisible] = useState(false);
  const [isForgotPasswordModalVisible, setIsForgotPasswordModalVisible] =
    useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const isMobile = window.innerWidth <= 768;

  useEffect(() => {
    setClientReady(true);
  }, []);

  const onFinish = async (values) => {
    try {
      const { token } = await loginUser(values);
      login(token);
      setError("");
      navigate("/");
    } catch (err) {
      setError(err.message || "Failed to login. Please try again.");
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
    <div
      style={{
        height: "100vh",
        alignContent: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ marginLeft: isMobile ? "150px" : "80px" }}>
        <Title
          level={3}
          style={{
            marginLeft: "14px",
            fontSize: "26px",
            lineHeight: "22px",
            fontFamily: "NeueHaasDisplayMediu",
          }}
        >
          Admin Login
        </Title>
        <Title
          level={4}
          style={{
            fontSize: "16px",
            lineHeight: "24px",
            fontFamily: "NeueHaasDisplayRoman",
            fontWeight: 500,
          }}
        >
          Please enter your login details
        </Title>
      </div>
      {error && (
        <Alert
          message={error}
          type="error"
          showIcon
          style={{ marginBottom: 16, marginLeft: "60px", width: "50vh" }}
        />
      )}
      <Form
        form={form}
        name="horizontal_login"
        layout="block"
        onFinish={onFinish}
        style={{
          width: "50vh",
          padding: "24px",
          borderRadius: "8px",
          marginLeft: "25px",
        }}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type={passwordVisible ? "text" : "password"}
            placeholder="Password"
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
        <Button
          style={{
            border: "none",
            marginLeft: "160px",
            fontSize: "16px",
            lineHeight: "30px",
            color: "#666",
          }}
          onClick={showForgotPasswordModal}
        >
          Forgot Password?
        </Button>
        <Form.Item shouldUpdate>
          {() => (
            <Button
              style={{
                width: "43vh",
                marginTop: "8px",
                backgroundColor: "#034147",
                color: "white",
              }}
              type="primary"
              htmlType="submit"
              disabled={
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
          }}
        >
          <p
            style={{
              fontSize: "16px",
              lineHeight: "30px",
              fontFamily: "NeueHaasDisplayRoman",
              color: "#666",
            }}
          >
            {"Don't have an account yet? "}
          </p>
          <Button
            style={{
              border: "none",
              color: "#1890ff",
              fontSize: "16px",
              lineHeight: "28px",
              fontFamily: "NeueHaasDisplayLight",
            }}
            onClick={showSignupModal}
          >
            Sign up
          </Button>
        </div>
      </Form>

      {/* Modal for SignupPage */}
      <Modal
        title="Sign Up"
        open={isSignupModalVisible}
        onCancel={handleSignupCancel}
        footer={null}
        width={500}
        maskClosable={false}
      >
        <SignupPage />
      </Modal>

      {/* Modal for ForgotPasswordPage */}
      <Modal
        title="Forgot Password"
        open={isForgotPasswordModalVisible}
        onCancel={handleForgotPasswordCancel}
        footer={null}
        width={500}
        maskClosable={false}
      >
        <ForgotPassword />
      </Modal>
    </div>
  );
}

export default Formpage;
