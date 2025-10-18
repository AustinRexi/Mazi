import { Card, Form, Switch, Button, Row, Col, Typography } from "antd";
import { SaveOutlined, BellOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;

const NotificationPreferences = ({
  notifications,
  setNotifications,
  onSave,
}) => {
  const labels = {
    orderNotifications: "Order Notifications",
    paymentNotifications: "Payment Notifications",
    inventoryAlerts: "Inventory Alerts",
    customerMessages: "Customer Messages",
    marketingEmails: "Marketing Emails",
    promotionalSms: "Promotional SMS",
  };

  const descriptions = {
    orderNotifications: "Receive alerts for new orders and updates.",
    paymentNotifications: "Get notified when payments are received.",
    inventoryAlerts: "Low stock and out-of-stock alerts.",
    customerMessages: "Notifications for customer messages.",
    marketingEmails: "Platform updates and best practices.",
    promotionalSms: "Special offers and promotional messages.",
  };

  return (
    <Card
      title={
        <Title level={4}>
          <BellOutlined style={{ color: "#1677ff", marginRight: 8 }} />
          Notification Preferences
        </Title>
      }
    >
      <Paragraph type="secondary">
        Choose how you want to receive notifications.
      </Paragraph>

      <Form layout="vertical">
        {Object.entries(notifications).map(([key, value]) => (
          <Row
            key={key}
            justify="space-between"
            align="middle"
            style={{ marginBottom: 12 }}
          >
            <Col>
              <strong>{labels[key]}</strong>
              <Paragraph type="secondary" style={{ margin: 0 }}>
                {descriptions[key]}
              </Paragraph>
            </Col>
            <Col>
              <Switch
                checked={value}
                onChange={(checked) =>
                  setNotifications({ ...notifications, [key]: checked })
                }
              />
            </Col>
          </Row>
        ))}

        <Button type="primary" icon={<SaveOutlined />} onClick={onSave}>
          Save Notification Settings
        </Button>
      </Form>
    </Card>
  );
};

export default NotificationPreferences;
