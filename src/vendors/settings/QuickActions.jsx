import { Card, Button, Row, Col, Typography } from "antd";
import {
  CreditCardOutlined,
  GlobalOutlined,
  SafetyOutlined,
} from "@ant-design/icons";

const { Title, Paragraph } = Typography;

const QuickActions = () => (
  <Row gutter={[24, 24]}>
    <Col xs={24} md={8}>
      <Card
        title={
          <Title level={5}>
            <CreditCardOutlined style={{ color: "#52c41a", marginRight: 8 }} />
            Payment Setup
          </Title>
        }
      >
        <Paragraph>
          Configure your payment methods and withdrawal options.
        </Paragraph>
        <Button block>Manage Payment Methods</Button>
      </Card>
    </Col>

    <Col xs={24} md={8}>
      <Card
        title={
          <Title level={5}>
            <GlobalOutlined style={{ color: "#1677ff", marginRight: 8 }} />
            Store Analytics
          </Title>
        }
      >
        <Paragraph>View detailed analytics and performance metrics.</Paragraph>
        <Button block>View Analytics</Button>
      </Card>
    </Col>

    <Col xs={24} md={8}>
      <Card
        title={
          <Title level={5}>
            <SafetyOutlined style={{ color: "#ff4d4f", marginRight: 8 }} />
            Account Security
          </Title>
        }
      >
        <Paragraph>Manage password, 2FA, and security settings.</Paragraph>
        <Button block>Security Settings</Button>
      </Card>
    </Col>
  </Row>
);

export default QuickActions;
