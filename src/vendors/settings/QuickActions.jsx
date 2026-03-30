import { Card, Button, Row, Col, Typography } from "antd";
import {
  CreditCardOutlined,
  GlobalOutlined,
  SafetyOutlined,
} from "@ant-design/icons";

const { Title, Paragraph } = Typography;

// Define all quick actions in an array
const actions = [
  {
    key: "payment",
    title: "Payment Setup",
    description: "Configure your payment methods and withdrawal options.",
    icon: <CreditCardOutlined style={{ color: "#52c41a", marginRight: 8 }} />,
    buttonText: "Manage Payment Methods",
  },
  {
    key: "analytics",
    title: "Store Analytics",
    description: "View detailed analytics and performance metrics.",
    icon: <GlobalOutlined style={{ color: "#1677ff", marginRight: 8 }} />,
    buttonText: "View Analytics",
  },
  {
    key: "security",
    title: "Account Security",
    description: "Manage password, 2FA, and security settings.",
    icon: <SafetyOutlined style={{ color: "#ff4d4f", marginRight: 8 }} />,
    buttonText: "Security Settings",
  },
];

const QuickActions = ({ onAction }) => (
  <Row gutter={[24, 24]}>
    {actions.map((action) => (
      <Col xs={24} md={8} key={action.key}>
        <Card
          title={
            <Title level={5}>
              {action.icon}
              {action.title}
            </Title>
          }
        >
          <Paragraph>{action.description}</Paragraph>
          <Button block onClick={() => onAction?.(action.key)}>
            {action.buttonText}
          </Button>
        </Card>
      </Col>
    ))}
  </Row>
);

export default QuickActions;
