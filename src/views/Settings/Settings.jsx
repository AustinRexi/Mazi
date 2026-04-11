import React, { useContext, useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Card,
  Typography,
  Space,
  Avatar,
  Upload,
  message,
  Select,
  Spin,
} from "antd";
import { UserOutlined, UploadOutlined } from "@ant-design/icons";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  fetchAdminSettings,
  updateAdminPassword,
  updateAdminPreferences,
  updateAdminProfile,
  updateAdminTransactionPin,
} from "../../services/adminSettingsService";

const { Title, Text } = Typography;
const LANGUAGE_OPTIONS = [
  { label: "English", value: "English" },
  { label: "French", value: "French" },
];

const Settings = () => {
  const { user, updateProfileImage, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
  const [savingPin, setSavingPin] = useState(false);
  const [savingPreferences, setSavingPreferences] = useState(false);

  const [profileForm] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const [pinForm] = Form.useForm();
  const [preferenceForm] = Form.useForm();

  const loadSettings = async () => {
    try {
      setLoading(true);
      const data = await fetchAdminSettings();
      const admin = data?.admin || {};
      const settings = data?.settings || {};

      profileForm.setFieldsValue({
        firstName: admin?.firstName || "",
        lastName: admin?.lastName || "",
        email: admin?.email || "",
      });
      preferenceForm.setFieldsValue({
        languagePreference: settings?.language_preference || "English",
      });
    } catch (error) {
      message.error(
        error?.response?.data?.message || error?.message || "Failed to load settings."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  const handleUpload = ({ file, onSuccess, onError }) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64Image = reader.result;
      try {
        if (!file.type.startsWith("image/")) {
          throw new Error("Only image files are allowed");
        }
        if (file.size > 5 * 1024 * 1024) {
          throw new Error("Image size exceeds 5MB");
        }
        updateProfileImage(base64Image);
        message.success("Profile picture updated.");
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

  const saveProfile = async (values) => {
    try {
      setSavingProfile(true);
      await updateAdminProfile(values);
      message.success("Profile updated.");
      await loadSettings();
    } catch (error) {
      message.error(
        error?.response?.data?.message || error?.message || "Failed to update profile."
      );
    } finally {
      setSavingProfile(false);
    }
  };

  const savePassword = async (values) => {
    try {
      setSavingPassword(true);
      await updateAdminPassword(values);
      message.success("Password updated.");
      passwordForm.resetFields();
    } catch (error) {
      message.error(
        error?.response?.data?.message || error?.message || "Failed to update password."
      );
    } finally {
      setSavingPassword(false);
    }
  };

  const savePin = async (values) => {
    try {
      setSavingPin(true);
      await updateAdminTransactionPin(values);
      message.success("Transaction PIN updated.");
      pinForm.resetFields();
    } catch (error) {
      message.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to update transaction PIN."
      );
    } finally {
      setSavingPin(false);
    }
  };

  const savePreferences = async (values) => {
    try {
      setSavingPreferences(true);
      await updateAdminPreferences(values);
      message.success("Preferences updated.");
    } catch (error) {
      message.error(
        error?.response?.data?.message || error?.message || "Failed to update preferences."
      );
    } finally {
      setSavingPreferences(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f0f2f5", padding: "24px" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <Title level={2} style={{ marginBottom: "24px" }}>
          Settings
        </Title>

        <Spin spinning={loading}>
          <Card style={{ marginBottom: "24px" }} title="Profile">
            <Space direction="vertical" size="large" style={{ width: "100%" }}>
              <Space align="center">
                <Avatar size={64} src={user?.profileImage} icon={<UserOutlined />} />
                <Upload customRequest={handleUpload} showUploadList={false} accept="image/*">
                  <Button icon={<UploadOutlined />}>Change Profile Picture</Button>
                </Upload>
              </Space>
              <Form form={profileForm} layout="vertical" onFinish={saveProfile}>
                <Form.Item
                  label="First Name"
                  name="firstName"
                  rules={[{ required: true, message: "Please enter first name." }]}
                >
                  <Input placeholder="Enter first name" />
                </Form.Item>
                <Form.Item
                  label="Last Name"
                  name="lastName"
                  rules={[{ required: true, message: "Please enter last name." }]}
                >
                  <Input placeholder="Enter last name" />
                </Form.Item>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, type: "email", message: "Please enter a valid email." },
                  ]}
                >
                  <Input placeholder="Enter your email" />
                </Form.Item>
                <Button type="primary" htmlType="submit" loading={savingProfile}>
                  Save Profile
                </Button>
              </Form>
            </Space>
          </Card>

          <Card style={{ marginBottom: "24px" }} title="Change Password">
            <Form layout="vertical" form={passwordForm} onFinish={savePassword}>
              <Form.Item
                label="Current Password"
                name="current_password"
                rules={[{ required: true, message: "Please enter your current password." }]}
              >
                <Input.Password placeholder="Current password" />
              </Form.Item>
              <Form.Item
                label="New Password"
                name="new_password"
                rules={[
                  { required: true, message: "Please enter a new password." },
                  { min: 8, message: "Password must be at least 8 characters." },
                ]}
              >
                <Input.Password placeholder="New password" />
              </Form.Item>
              <Form.Item
                label="Confirm New Password"
                name="new_password_confirmation"
                dependencies={["new_password"]}
                rules={[
                  { required: true, message: "Please confirm your new password." },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("new_password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error("Passwords do not match."));
                    },
                  }),
                ]}
              >
                <Input.Password placeholder="Confirm new password" />
              </Form.Item>
              <Button type="primary" htmlType="submit" loading={savingPassword}>
                Save Password
              </Button>
            </Form>
          </Card>

          <Card style={{ marginBottom: "24px" }} title="Transaction PIN">
            <Form layout="vertical" form={pinForm} onFinish={savePin}>
              <Form.Item
                label="Transaction PIN"
                name="transaction_pin"
                rules={[
                  { required: true, message: "Please enter a transaction PIN." },
                  { len: 4, message: "PIN must be 4 digits." },
                  { pattern: /^\d+$/, message: "PIN must contain digits only." },
                ]}
              >
                <Input.Password maxLength={4} placeholder="Enter 4-digit PIN" />
              </Form.Item>
              <Form.Item
                label="Confirm Transaction PIN"
                name="transaction_pin_confirmation"
                dependencies={["transaction_pin"]}
                rules={[
                  { required: true, message: "Please confirm your transaction PIN." },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("transaction_pin") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error("PINs do not match."));
                    },
                  }),
                ]}
              >
                <Input.Password maxLength={4} placeholder="Confirm 4-digit PIN" />
              </Form.Item>
              <Button type="primary" htmlType="submit" loading={savingPin}>
                Save Transaction PIN
              </Button>
            </Form>
          </Card>

          <Card title="Account">
            <Space direction="vertical" size="middle" style={{ width: "100%" }}>
              <Text>Language Preference</Text>
              <Form layout="vertical" form={preferenceForm} onFinish={savePreferences}>
                <Form.Item
                  name="languagePreference"
                  rules={[{ required: true, message: "Select a language." }]}
                >
                  <Select options={LANGUAGE_OPTIONS} />
                </Form.Item>
                <Button type="primary" htmlType="submit" loading={savingPreferences}>
                  Save Preferences
                </Button>
              </Form>
              <Button type="default" onClick={handleLogout}>
                Log Out
              </Button>
            </Space>
          </Card>
        </Spin>
      </div>
    </div>
  );
};

export default Settings;
