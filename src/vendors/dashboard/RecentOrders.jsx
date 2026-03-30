import { Card, Space, Typography, Tag, Button } from "antd";
import { formatVendorMoney } from "../utils/currency";

const { Text } = Typography;

const getStatusColor = (status) => {
  if (status === "delivered" || status === "completed") {
    return "green";
  }

  if (status === "shipped" || status === "processing") {
    return "blue";
  }

  if (status === "pending") {
    return "orange";
  }

  return "red";
};

const RecentOrders = ({ orders = [], currencyCode = "" }) => (
  <Card title="Recent Orders" extra={<Text type="secondary">Latest</Text>}>
    <Space direction="vertical" style={{ width: "100%" }}>
      {orders.length === 0 ? (
        <Text type="secondary">No recent orders yet.</Text>
      ) : null}
      {orders.map((order) => (
        <div
          key={order.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderBottom: "1px solid #f0f0f0",
            paddingBottom: 8,
          }}
        >
          <div>
            <Text strong>{order.id}</Text>
            <br />
            <Text type="secondary" style={{ fontSize: 12 }}>
              {order.customer}
            </Text>
          </div>
          <div style={{ textAlign: "right" }}>
            <Text>{formatVendorMoney(order.amount || 0, currencyCode)}</Text>
            <br />
            <Tag color={getStatusColor(order.status)} style={{ fontSize: 10 }}>
              {order.status}
            </Tag>
          </div>
        </div>
      ))}
      <Button block>View All Orders</Button>
    </Space>
  </Card>
);

export default RecentOrders;
