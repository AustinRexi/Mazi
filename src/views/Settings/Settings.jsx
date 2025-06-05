import React, { useContext } from "react";
import {
  Form,
  Input,
  Button,
  Checkbox,
  Card,
  Typography,
  Space,
  Avatar,
  Upload,
  message,
} from "antd";
import { UserOutlined, UploadOutlined } from "@ant-design/icons";
import { AuthContext } from "../../context/AuthContext"; // Adjust path to your Auth.jsx
import { useNavigate } from "react-router-dom"; // Import useNavigate

const { Title, Text } = Typography;

const Settings = () => {
  const { user, updateProfileImage, logout } = useContext(AuthContext);
  const navigate = useNavigate(); // Initialize navigate

  const onFinish = (values) => {
    console.log("Updated settings:", values);
    // Handle form submission (e.g., API call to update settings)
  };

  const handleLogout = () => {
    logout(); // Clears token and profileImage from localStorage via AuthContext
    // localStorage.clear(); // Optional: Only use if you want to clear ALL localStorage
    navigate("/login"); // Redirect to login page
  };

  // Custom upload handler for base64
  const handleUpload = ({ file, onSuccess, onError }) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64Image = reader.result;
      try {
        // Validate file type
        if (!file.type.startsWith("image/")) {
          throw new Error("Only image files are allowed");
        }
        // Validate file size (e.g., 5MB limit)
        if (file.size > 5 * 1024 * 1024) {
          throw new Error("Image size exceeds 5MB");
        }
        updateProfileImage(base64Image); // Update context with base64 image
        message.success("Profile picture updated successfully!");
        onSuccess(null, file);
      } catch (error) {
        message.error(error.message);
        onError(error);
      }
    };
    reader.onerror = () => {
      message.error("Failed to read image");
      onError(new Error("Failed to read image"));
    };
    reader.readAsDataURL(file);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f0f2f5", padding: "24px" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <Title level={2} style={{ marginBottom: "24px" }}>
          Settings
        </Title>

        <Card style={{ marginBottom: "24px" }} title="Profile">
          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            <Space align="center">
              <Avatar
                size={64}
                src={user?.profileImage}
                icon={<UserOutlined />}
              />
              <Upload
                customRequest={handleUpload}
                showUploadList={false}
                accept="image/*"
              >
                <Button icon={<UploadOutlined />}>
                  Change Profile Picture
                </Button>
              </Upload>
            </Space>
            <Form
              layout="vertical"
              onFinish={onFinish}
              initialValues={{
                name: "John Doe",
                email: "john.doe@example.com",
              }}
            >
              <Form.Item
                label="Full Name"
                name="name"
                rules={[
                  { required: true, message: "Please enter your full name" },
                ]}
              >
                <Input placeholder="Enter your full name" />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    type: "email",
                    message: "Please enter a valid email",
                  },
                ]}
              >
                <Input placeholder="Enter your email" />
              </Form.Item>
            </Form>
          </Space>
        </Card>

        <Card style={{ marginBottom: "24px" }} title="Change Password">
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Current Password"
              name="currentPassword"
              rules={[
                {
                  required: true,
                  message: "Please enter your current password",
                },
              ]}
            >
              <Input.Password placeholder="Current password" />
            </Form.Item>
            <Form.Item
              label="New Password"
              name="newPassword"
              rules={[
                { required: true, message: "Please enter a new password" },
              ]}
            >
              <Input.Password placeholder="New password" />
            </Form.Item>
            <Form.Item
              label="Confirm New Password"
              name="confirmPassword"
              rules={[
                { required: true, message: "Please confirm your new password" },
              ]}
            >
              <Input.Password placeholder="Confirm new password" />
            </Form.Item>
          </Form>
        </Card>

        <Card style={{ marginBottom: "24px" }} title="Notifications">
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item name="emailNotifications" valuePropName="checked">
              <Checkbox>Receive email notifications for order updates</Checkbox>
            </Form.Item>
            <Form.Item name="smsNotifications" valuePropName="checked">
              <Checkbox>Receive SMS notifications for order updates</Checkbox>
            </Form.Item>
            <Form.Item name="promotionalEmails" valuePropName="checked">
              <Checkbox>Receive promotional emails</Checkbox>
            </Form.Item>
          </Form>
        </Card>

        <Card title="Account">
          <Space direction="vertical" size="middle">
            <Text>Language Preference</Text>
            <Form layout="vertical" onFinish={onFinish}>
              <Form.Item name="language">
                <Input placeholder="Select language (e.g., English)" />
              </Form.Item>
            </Form>
            <Button type="primary" danger>
              Deactivate Account
            </Button>
            <Button type="default" onClick={handleLogout}>
              Log Out
            </Button>
          </Space>
        </Card>

        <div style={{ marginTop: "24px", textAlign: "right" }}>
          <Button type="primary" htmlType="submit" size="large">
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
