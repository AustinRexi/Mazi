import { Card, Button, Row, Col, Typography } from "antd";
import {
  DownloadOutlined,
  UploadOutlined,
  CheckCircleOutlined,
  StopOutlined,
} from "@ant-design/icons";

const { Text } = Typography;

// Define button configurations
const actionButtons = [
  {
    type: "primary",
    icon: <UploadOutlined style={{ fontSize: 20 }} />,
    label: "Transfer Funds",
  },
  {
    type: "default",
    icon: <DownloadOutlined style={{ fontSize: 20 }} />,
    label: "Withdraw",
  },
  {
    type: "default",
    icon: <StopOutlined style={{ fontSize: 20 }} />,
    label: "Freeze Account",
  },
  {
    type: "default",
    icon: <CheckCircleOutlined style={{ fontSize: 20 }} />,
    label: "Approve Payments",
  },
];

function QuickActions({ onAction }) {
  return (
    <Card title="Quick Actions">
      <Text
        style={{ color: "#8c8c8c", marginBottom: "16px", display: "block" }}
      >
        Financial management tools and operations
      </Text>
      <Row gutter={[16, 16]}>
        {actionButtons.map((button, index) => (
          <Col xs={12} md={6} key={index}>
            <Button
              type={button.type}
              style={{
                height: 80,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: 8,
              }}
              onClick={() => onAction?.(button.label)}
            >
              {button.icon}
              {button.label}
            </Button>
          </Col>
        ))}
      </Row>
    </Card>
  );
}

export default QuickActions;
