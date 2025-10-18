import {
  Card,
  Form,
  Input,
  Button,
  Row,
  Col,
  Avatar,
  Typography,
  message,
} from "antd";
import {
  UploadOutlined,
  SaveOutlined,
  ShopOutlined,
  CameraOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { TextArea } = Input;
const { Title, Paragraph } = Typography;

const StoreInformation = ({ storeSettings, setStoreSettings, onSave }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any stored auth info (adjust key names to match your app)
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");

    message.success("You have been logged out.");
    navigate("/login"); // Redirect to login page
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

      <Row gutter={[24, 24]} align="middle">
        <Col xs={24} md={8} style={{ textAlign: "center" }}>
          <div style={{ position: "relative", display: "inline-block" }}>
            <Avatar size={100} src={storeSettings.storeLogo} />
            <Button
              icon={<CameraOutlined />}
              shape="circle"
              size="small"
              style={{ position: "absolute", bottom: 0, right: 0 }}
            />
          </div>
          <Paragraph>Upload a logo for your store (200x200px)</Paragraph>
          <Button icon={<UploadOutlined />}>Upload New Logo</Button>
        </Col>

        <Col xs={24} md={16}>
          <Form layout="vertical">
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Store Name">
                  <Input
                    value={storeSettings.storeName}
                    onChange={(e) =>
                      setStoreSettings({
                        ...storeSettings,
                        storeName: e.target.value,
                      })
                    }
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Website">
                  <Input
                    value={storeSettings.storeWebsite}
                    onChange={(e) =>
                      setStoreSettings({
                        ...storeSettings,
                        storeWebsite: e.target.value,
                      })
                    }
                    placeholder="https://your-website.com"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item label="Store Description">
              <TextArea
                rows={4}
                value={storeSettings.storeDescription}
                onChange={(e) =>
                  setStoreSettings({
                    ...storeSettings,
                    storeDescription: e.target.value,
                  })
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
                      setStoreSettings({
                        ...storeSettings,
                        storeEmail: e.target.value,
                      })
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
                      setStoreSettings({
                        ...storeSettings,
                        storePhone: e.target.value,
                      })
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
                  setStoreSettings({
                    ...storeSettings,
                    storeAddress: e.target.value,
                  })
                }
              />
            </Form.Item>

            <div style={{ display: "flex", gap: "10px" }}>
              <Button type="primary" icon={<SaveOutlined />} onClick={onSave}>
                Save Store Information
              </Button>
              <Button danger icon={<LogoutOutlined />} onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Card>
  );
};

export default StoreInformation;
