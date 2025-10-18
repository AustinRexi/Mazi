import { Card, Form, Input, Button, Row, Col, Typography } from "antd";
import { SaveOutlined, SafetyOutlined } from "@ant-design/icons";

const { TextArea } = Input;
const { Title, Paragraph } = Typography;

const BusinessSettings = ({
  businessSettings,
  setBusinessSettings,
  onSave,
}) => (
  <Card
    title={
      <Title level={4}>
        <SafetyOutlined style={{ color: "#722ed1", marginRight: 8 }} />
        Business Settings
      </Title>
    }
  >
    <Paragraph type="secondary">Legal and business configuration.</Paragraph>

    <Form layout="vertical">
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Tax ID / EIN">
            <Input
              value={businessSettings.taxId}
              onChange={(e) =>
                setBusinessSettings({
                  ...businessSettings,
                  taxId: e.target.value,
                })
              }
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Business License">
            <Input
              value={businessSettings.businessLicense}
              onChange={(e) =>
                setBusinessSettings({
                  ...businessSettings,
                  businessLicense: e.target.value,
                })
              }
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item label="Return Policy">
        <TextArea
          rows={3}
          value={businessSettings.returnPolicy}
          onChange={(e) =>
            setBusinessSettings({
              ...businessSettings,
              returnPolicy: e.target.value,
            })
          }
        />
      </Form.Item>

      <Form.Item label="Shipping Policy">
        <TextArea
          rows={3}
          value={businessSettings.shippingPolicy}
          onChange={(e) =>
            setBusinessSettings({
              ...businessSettings,
              shippingPolicy: e.target.value,
            })
          }
        />
      </Form.Item>

      <Form.Item label="Privacy Policy">
        <TextArea
          rows={3}
          value={businessSettings.privacyPolicy}
          onChange={(e) =>
            setBusinessSettings({
              ...businessSettings,
              privacyPolicy: e.target.value,
            })
          }
        />
      </Form.Item>

      <Button type="primary" icon={<SaveOutlined />} onClick={onSave}>
        Save Business Settings
      </Button>
    </Form>
  </Card>
);

export default BusinessSettings;
