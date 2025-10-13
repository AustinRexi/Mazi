import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Form,
  Input,
  Button,
  Card,
  Checkbox,
  Radio,
  Space,
  Row,
  Col,
  Typography,
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  PhoneOutlined,
  ShopOutlined,
  CustomerServiceOutlined,
} from "@ant-design/icons";

// Dynamic form field configuration

const formFields = [
  {
    name: "firstName",
    label: "First Name",
    rules: [{ required: true, message: "First name is required" }],
    prefix: <UserOutlined />,
    placeholder: "John",
    span: 12,
  },
  {
    name: "lastName",
    label: "Last Name",
    rules: [{ required: true, message: "Last name is required" }],
    prefix: <UserOutlined />,
    placeholder: "Doe",
    span: 12,
  },
  {
    name: "email",
    label: "Email Address",
    rules: [
      { required: true, message: "Email is required" },
      { type: "email", message: "Email is invalid" },
    ],
    prefix: <MailOutlined />,
    placeholder: "john.doe@example.com",
  },
  {
    name: "phone",
    label: "Phone Number",
    rules: [{ required: true, message: "Phone number is required" }],
    prefix: <PhoneOutlined />,
    placeholder: "+1 (555) 123-4567",
  },
  {
    name: "password",
    label: "Password",
    rules: [
      { required: true, message: "Password is required" },
      { min: 8, message: "Password must be at least 8 characters" },
    ],
    prefix: <LockOutlined />,
    placeholder: "Create a strong password",
    type: "password",
  },
  {
    name: "confirmPassword",
    label: "Confirm Password",
    dependencies: ["password"],
    rules: [
      { required: true, message: "Please confirm your password" },
      ({ getFieldValue }) => ({
        validator(_, value) {
          if (!value || getFieldValue("password") === value) {
            return Promise.resolve();
          }
          return Promise.reject(new Error("Passwords do not match"));
        },
      }),
    ],
    prefix: <LockOutlined />,
    placeholder: "Confirm your password",
    type: "password",
  },
];

// Role options configuration
const roleOptions = [
  {
    value: "vendor",
    label: "Vendor",
    description: "Manage your store, products, and orders",
    icon: ShopOutlined,
  },
  {
    value: "support",
    label: "Support Staff",
    description: "Handle customer inquiries and tickets",
    icon: CustomerServiceOutlined,
  },
];

const SignupPage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const selectedRole = Form.useWatch("role", form);
  const navigate = useNavigate();
  const signIn = () => {
    navigate("/");
  };

  const handleSubmit = (values) => {
    setLoading(true);
    console.log("Form data:", values);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  // Dynamic form item renderer
  const renderFormItem = ({
    name,
    label,
    rules,
    prefix,
    placeholder,
    type,
    dependencies,
    span,
  }) => (
    <Col span={span || 24} key={name}>
      <Form.Item
        name={name}
        label={label}
        rules={rules}
        dependencies={dependencies}
      >
        {type === "password" ? (
          <Input.Password prefix={prefix} placeholder={placeholder} />
        ) : (
          <Input prefix={prefix} placeholder={placeholder} />
        )}
      </Form.Item>
    </Col>
  );

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card bordered={false} style={{ width: "100%" }}>
        <div style={{ textAlign: "center", paddingBottom: 24 }}>
          <div
            style={{
              width: 64,
              height: 64,
              background: "#1890ff",
              borderRadius: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px",
            }}
          >
            <UserOutlined style={{ fontSize: 32, color: "#fff" }} />
          </div>
          <Typography.Title level={3}>Create Your Account</Typography.Title>
          <Typography.Paragraph level={4}>
            Join our platform and start your journey today
          </Typography.Paragraph>
        </div>

        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Row gutter={16}>
            {formFields.map((field) => renderFormItem(field))}
          </Row>

          <Form.Item
            label="Select Your Role"
            name="role"
            rules={[{ required: true, message: "Please select a role" }]}
          >
            <Radio.Group style={{ width: "100%" }}>
              <Space
                direction="vertical"
                style={{ width: "100%" }}
                size="middle"
              >
                {roleOptions.map((role) => {
                  const IconComponent = role.icon;
                  return (
                    <Radio value={role.value} key={role.value}>
                      <Card
                        hoverable
                        style={{
                          ...(selectedRole === role.value
                            ? {
                                border: "2px solid #1890ff",
                                background: "#f0fdf4",
                              }
                            : {}),
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 12,
                          }}
                        >
                          <IconComponent
                            style={{ fontSize: 20, color: "#1890ff" }}
                          />
                          <div>
                            <div style={{ fontWeight: 500 }}>{role.label}</div>
                            <div style={{ fontSize: 12, color: "#666" }}>
                              {role.description}
                            </div>
                          </div>
                        </div>
                      </Card>
                    </Radio>
                  );
                })}
              </Space>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            name="agreed"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(new Error("You must agree to the terms")),
              },
            ]}
          >
            <Checkbox>
              I agree to the{" "}
              <a href="#" style={{ color: "#1890ff" }}>
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" style={{ color: "#1890ff" }}>
                Privacy Policy
              </a>
            </Checkbox>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              size="large"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </Button>
          </Form.Item>
        </Form>

        <div style={{ textAlign: "center", paddingTop: 16 }}>
          <Typography.Paragraph style={{ fontSize: 16, color: "#666" }}>
            Already have an account?{" "}
            <Button
              style={{
                border: "none",
                color: "#1890ff",
                fontWeight: 500,
                fontSize: "16px",
              }}
              onClick={signIn}
            >
              Sign In Instead
            </Button>
          </Typography.Paragraph>
        </div>
      </Card>
    </div>
  );
};

export default SignupPage;
