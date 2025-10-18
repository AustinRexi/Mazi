import { Card, Space, Typography, Tag, Button } from "antd";

const { Text } = Typography;

const orders = [
  {
    id: "#12345",
    customer: "Sarah Johnson",
    amount: "$149.99",
    status: "shipped",
  },
  { id: "#12346", customer: "Mike Chen", amount: "$199.99", status: "pending" },
  {
    id: "#12347",
    customer: "Lisa Brown",
    amount: "$99.99",
    status: "completed",
  },
  {
    id: "#12348",
    customer: "David Wilson",
    amount: "$39.99",
    status: "shipped",
  },
];

const RecentOrders = () => (
  <Card title="Recent Orders" extra={<Text type="secondary">Latest</Text>}>
    <Space direction="vertical" style={{ width: "100%" }}>
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
            <Text>{order.amount}</Text>
            <br />
            <Tag
              color={
                order.status === "completed"
                  ? "green"
                  : order.status === "shipped"
                  ? "blue"
                  : "red"
              }
              style={{ fontSize: 10 }}
            >
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
