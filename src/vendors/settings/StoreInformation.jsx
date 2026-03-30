import {
  Card,
  Form,
  Input,
  Button,
  Row,
  Col,
  Typography,
  message,
  Spin,
} from "antd";
import {
  UploadOutlined,
  SaveOutlined,
  ShopOutlined,
  CameraOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const { TextArea } = Input;
const { Title, Paragraph } = Typography;
const StoreInformation = ({
  storeSettings,
  setStoreSettings,
  onSave,
  saving,
  loading,
}) => {
  const navigate = useNavigate();
  const logoInputRef = useRef(null);
  const bannerInputRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("profileImage");

    message.success("You have been logged out.");
    navigate("/login");
  };

  const handleSelectLogo = () => {
    logoInputRef.current?.click();
  };

  const handleSelectBanner = () => {
    bannerInputRef.current?.click();
  };

  const handleLogoChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setStoreSettings((current) => ({
      ...current,
      storeLogoFile: file,
      storeLogo: previewUrl,
    }));
  };

  const handleBannerChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setStoreSettings((current) => ({
      ...current,
      storeBannerFile: file,
      storeBanner: previewUrl,
    }));
  };

  return (
    <Card
      title={
        <Title level={4}>
          <ShopOutlined style={{ color: "#52c41a", marginRight: 8 }} />
          Store Information
        </Title>
      }
      bordered
    >
      <Paragraph type="secondary">
        Manage your store details and public information.
      </Paragraph>
      <Spin spinning={loading}>
        <Row gutter={[24, 24]}>
          <Col xs={24} md={8} style={{ textAlign: "center" }}>
            <div style={{ position: "relative", display: "inline-block" }}>
              <div
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: "50%",
                  overflow: "hidden",
                  background: "#f5f5f5",
                  border: "1px solid #f0f0f0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {storeSettings.storeLogo ? (
                  <img
                    src={storeSettings.storeLogo}
                    alt="Store logo"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <ShopOutlined style={{ fontSize: 28, color: "#bfbfbf" }} />
                )}
              </div>
              <Button
                icon={<CameraOutlined />}
                shape="circle"
                size="small"
                style={{ position: "absolute", bottom: 0, right: 0 }}
                onClick={handleSelectLogo}
              />
            </div>
            <Paragraph>Logo for your store</Paragraph>
            <input
              ref={logoInputRef}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleLogoChange}
            />
            <Button icon={<UploadOutlined />} onClick={handleSelectLogo}>
              Upload New Logo
            </Button>

            <div style={{ marginTop: 24, textAlign: "left" }}>
              <Paragraph strong style={{ marginBottom: 8 }}>
                Company Banner
              </Paragraph>
              <Paragraph type="secondary" style={{ marginBottom: 12 }}>
                Uploaded image should be 900 x 600 pixels
              </Paragraph>
              <div
                style={{
                  width: "100%",
                  maxWidth: 420,
                  aspectRatio: "3 / 2",
                  minHeight: 180,
                  borderRadius: 16,
                  overflow: "hidden",
                  background: "#f5f5f5",
                  border: "1px solid #f0f0f0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto",
                }}
              >
                {storeSettings.storeBanner ? (
                  <img
                    src={storeSettings.storeBanner}
                    alt="Store banner"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <Paragraph type="secondary" style={{ marginBottom: 0 }}>
                    No banner uploaded yet
                  </Paragraph>
                )}
              </div>
              <input
                ref={bannerInputRef}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleBannerChange}
              />
              <Button
                icon={<UploadOutlined />}
                onClick={handleSelectBanner}
                style={{ marginTop: 12 }}
              >
                Upload Company Banner
              </Button>
            </div>
          </Col>

          <Col xs={24} md={16}>
            <Form layout="vertical">
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Store Name">
                    <Input
                      value={storeSettings.storeName}
                      onChange={(e) =>
                        setStoreSettings((current) => ({
                          ...current,
                          storeName: e.target.value,
                        }))
                      }
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Website">
                    <Input
                      value={storeSettings.storeWebsite}
                      onChange={(e) =>
                        setStoreSettings((current) => ({
                          ...current,
                          storeWebsite: e.target.value,
                        }))
                      }
                      placeholder="Stored locally only"
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item label="Store Description">
                <TextArea
                  rows={4}
                  value={storeSettings.storeDescription}
                  onChange={(e) =>
                    setStoreSettings((current) => ({
                      ...current,
                      storeDescription: e.target.value,
                    }))
                  }
                />
              </Form.Item>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Contact Email">
                    <Input
                      prefix={<MailOutlined />}
                      value={storeSettings.storeEmail}
                      onChange={(e) =>
                        setStoreSettings((current) => ({
                          ...current,
                          storeEmail: e.target.value,
                        }))
                      }
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Phone Number">
                    <Input
                      prefix={<PhoneOutlined />}
                      value={storeSettings.storePhone}
                      onChange={(e) =>
                        setStoreSettings((current) => ({
                          ...current,
                          storePhone: e.target.value,
                        }))
                      }
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item label="Business Address">
                <Input
                  prefix={<EnvironmentOutlined />}
                  value={storeSettings.storeAddress}
                  onChange={(e) =>
                    setStoreSettings((current) => ({
                      ...current,
                      storeAddress: e.target.value,
                    }))
                  }
                />
              </Form.Item>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Country">
                    <Input
                      value={storeSettings.storeCountry}
                      onChange={(e) =>
                        setStoreSettings((current) => ({
                          ...current,
                          storeCountry: e.target.value,
                        }))
                      }
                      placeholder="e.g. Nigeria"
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Currency (ISO code)">
                    <Input
                      value={storeSettings.storeCurrency}
                      onChange={(e) =>
                        setStoreSettings((current) => ({
                          ...current,
                          storeCurrency: e.target.value.toUpperCase(),
                        }))
                      }
                      maxLength={3}
                      placeholder="e.g. NGN"
                    />
                  </Form.Item>
                </Col>
              </Row>

              <div style={{ display: "flex", gap: "10px" }}>
                <Button
                  type="primary"
                  icon={<SaveOutlined />}
                  onClick={onSave}
                  loading={saving}
                >
                  Save Store Information
                </Button>
                <Button onClick={handleLogout}>Logout</Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Spin>
    </Card>
  );
};

export default StoreInformation;
