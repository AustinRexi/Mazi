import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Form,
  Input,
  Button,
  Card,
  Checkbox,
  Typography,
  Divider,
  Alert,
  message,
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { registerVendor } from "../../services/authService";
import { AuthContext } from "../../context/AuthContext";

const formFields = [
  {
    name: "firstName",
    label: "First Name",
    rules: [{ required: true, message: "First name is required" }],
    prefix: <UserOutlined />,
    placeholder: "John",
  },
  {
    name: "lastName",
    label: "Last Name",
    rules: [{ required: true, message: "Last name is required" }],
    prefix: <UserOutlined />,
    placeholder: "Doe",
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
    rules: [
      { required: true, message: "Phone number is required" },
      {
        pattern: /^\+?[0-9\s()-]{7,20}$/,
        message: "Enter a valid phone number",
      },
    ],
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

const SignupPage = ({ onClose }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [locationData, setLocationData] = useState({
    lat: 0,
    lng: 0,
    country: "",
    location: "",
  });

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  // Location detection effect
  useEffect(() => {
    const fallbackCountryFromLocale = () => {
      const locale = navigator.language || "";
      const region = locale.includes("-") ? locale.split("-")[1] : "";
      return region ? region.toUpperCase() : "";
    };

    const getCountryName = (countryCode) => {
      try {
        if (!countryCode) return "";
        const displayNames = new Intl.DisplayNames(["en"], { type: "region" });
        return displayNames.of(countryCode.toUpperCase()) || "";
      } catch {
        return countryCode || "";
      }
    };

    if (!navigator.geolocation) {
      const fallback = fallbackCountryFromLocale();
      setLocationData((prev) => ({
        ...prev,
        country: getCountryName(fallback) || fallback,
      }));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = Number(position.coords.latitude || 0);
        const lng = Number(position.coords.longitude || 0);
        let country = "";
        let location = `${lat},${lng}`;

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`,
          );
          if (response.ok) {
            const data = await response.json();
            country = data?.address?.country || "";
            location =
              data?.address?.city ||
              data?.address?.town ||
              data?.address?.state ||
              data?.display_name ||
              location;
          }
        } catch {
          // Ignore reverse geocode errors
        }

        if (!country) {
          const fallback = fallbackCountryFromLocale();
          country = getCountryName(fallback) || fallback;
        }

        setLocationData({
          lat,
          lng,
          country,
          location,
        });
      },
      () => {
        const fallback = fallbackCountryFromLocale();
        setLocationData((prev) => ({
          ...prev,
          country: getCountryName(fallback) || fallback,
        }));
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 300000,
      },
    );
  }, []);

  const handleBackToLogin = () => {
    if (onClose) {
      onClose(); // Close the modal when inside ForgotPassword/Signup modal
    } else {
      navigate("/login"); // Fallback if component is used directly
    }
  };

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      setError("");

      const payload = {
        firstname: values.firstName,
        lastname: values.lastName,
        phone: values.phone,
        email: values.email,
        password: values.password,
        location: locationData.location || "",
        lat: Number(locationData.lat || 0),
        lng: Number(locationData.lng || 0),
        country: locationData.country || "",
      };

      const response = await registerVendor(payload);

      if (response?.token) {
        login(response.token, "vendor");
        message.success(response.message || "Account created successfully.");
        navigate("/vendors/dashboard");
        return;
      }

      throw new Error("Signup succeeded but no token was returned.");
    } catch (submitError) {
      setError(submitError.message || "Failed to create account.");
    } finally {
      setLoading(false);
    }
  };

  const renderFormItem = ({
    name,
    label,
    rules,
    prefix,
    placeholder,
    type,
    dependencies,
  }) => (
    <Form.Item
      key={name}
      name={name}
      label={label}
      rules={rules}
      dependencies={dependencies}
      style={{ marginBottom: 14 }}
    >
      {type === "password" ? (
        <Input.Password
          size="large"
          prefix={prefix}
          placeholder={placeholder}
          autoComplete={name === "password" ? "new-password" : "off"}
        />
      ) : (
        <Input
          size="large"
          prefix={prefix}
          placeholder={placeholder}
          autoComplete={name === "email" ? "email" : "off"}
        />
      )}
    </Form.Item>
  );

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card
        bordered={false}
        style={{
          width: "100%",
          borderRadius: 14,
          border: "1px solid #e6ebf1",
          boxShadow: "0 14px 30px rgba(2, 6, 23, 0.08)",
        }}
      >
        <div style={{ textAlign: "center", paddingBottom: 20 }}>
          <div
            style={{
              width: 56,
              height: 56,
              background: "#034147",
              borderRadius: 14,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 14px",
            }}
          >
            <UserOutlined style={{ fontSize: 28, color: "#fff" }} />
          </div>
          <Typography.Title
            level={3}
            style={{ marginBottom: 8, fontFamily: "NeueHaasDisplayMediu" }}
          >
            Create Vendor Account
          </Typography.Title>
          <Typography.Text style={{ color: "#667085" }}>
            Set up your vendor account in a few steps.
          </Typography.Text>
        </div>

        {error ? (
          <Alert
            type="error"
            showIcon
            message={error}
            style={{ marginBottom: 14 }}
          />
        ) : null}

        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
          requiredMark={false}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gap: 12,
            }}
          >
            {formFields.map((field) => renderFormItem(field))}
          </div>

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
              <a href="#" style={{ color: "#034147" }}>
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" style={{ color: "#034147" }}>
                Privacy Policy
              </a>
            </Checkbox>
          </Form.Item>

          <Form.Item style={{ marginBottom: 12 }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              size="large"
              style={{ height: 44, background: "#034147" }}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </Button>
          </Form.Item>
        </Form>

        <Divider style={{ margin: "10px 0 14px" }} />

        <div style={{ textAlign: "center" }}>
          <Typography.Text style={{ color: "#667085" }}>
            Already have an account?{" "}
          </Typography.Text>
          <Button
            style={{
              border: "none",
              color: "#034147",
              fontWeight: 600,
              paddingInline: 4,
            }}
            onClick={handleBackToLogin}
          >
            Sign In Instead
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default SignupPage;
