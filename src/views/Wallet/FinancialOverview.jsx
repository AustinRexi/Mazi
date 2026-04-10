import { Card, Row, Col, Typography } from "antd";
import {
  WalletOutlined,
  RiseOutlined,
  FallOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import { formatAdminMoney } from "../../utils/adminCurrency";

const { Text } = Typography;

// Define card configurations
const cardData = [
  {
    title: "Total Revenue",
    icon: <WalletOutlined style={{ color: "#8c8c8c", fontSize: "24px" }} />,
    value: "totalRevenue",
    description: "All wallet entries",
    textStyle: { fontSize: 24 },
  },
  {
    title: "Total Profit",
    icon: <RiseOutlined style={{ color: "#52c41a", fontSize: "24px" }} />,
    value: "totalProfit",
    description: "+12.5% from last month",
    textStyle: { fontSize: 24, color: "#52c41a" },
  },
  {
    title: "Total Expenses",
    icon: <FallOutlined style={{ color: "#f5222d", fontSize: "24px" }} />,
    value: "totalExpenses",
    description: "All recorded expenses",
    textStyle: { fontSize: 24, color: "#f5222d" },
  },
  {
    title: "Net Profit",
    icon: <DollarOutlined style={{ color: "#1890ff", fontSize: "24px" }} />,
    value: "netProfit",
    description: "+8.1% from last month",
    textStyle: { fontSize: 24, color: "#1890ff" },
  },
];

function FinancialOverview({
  totalRevenue,
  totalProfit,
  totalExpenses,
  netProfit,
  currencyCode,
}) {
  // Map props to their values for dynamic access
  const values = {
    totalRevenue,
    totalProfit,
    totalExpenses,
    netProfit,
  };

  return (
    <Row gutter={[24, 24]} style={{ width: "100%" }}>
      {cardData.map((card, index) => (
        <Col xs={24} md={6} key={index}>
          <Card title={card.title} extra={card.icon}>
            <Text strong style={card.textStyle}>
              {formatAdminMoney(values[card.value], currencyCode)}
            </Text>
            <Text style={{ fontSize: 12, color: "#8c8c8c", display: "block" }}>
              {card.description}
            </Text>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default FinancialOverview;
