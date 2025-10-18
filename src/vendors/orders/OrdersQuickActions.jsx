import { Row, Col, Card, Typography, Button } from "antd";
import {
  ClockCircleOutlined,
  TruckOutlined,
  CalendarOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

function OrdersQuickActions({ orders, pendingOrders }) {
  const readyToShip = orders.filter((o) => o.status === "confirmed").length;
  const todayOrders = orders.filter(
    (o) => new Date(o.orderDate).toDateString() === new Date().toDateString()
  ).length;

  return (
    <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
      <Col xs={24} md={8}>
        <Card>
          <Title level={5}>
            <ClockCircleOutlined style={{ color: "#faad14", marginRight: 8 }} />
            Pending Orders
          </Title>
          <Title level={3}>{pendingOrders}</Title>
          <Text>Orders awaiting your action</Text>
          <Button
            type="primary"
            block
            style={{
              backgroundColor: "#faad14",
              borderColor: "#faad14",
              marginTop: 12,
            }}
          >
            Process Pending Orders
          </Button>
        </Card>
      </Col>

      <Col xs={24} md={8}>
        <Card>
          <Title level={5}>
            <TruckOutlined style={{ color: "#1890ff", marginRight: 8 }} />
            Ready to Ship
          </Title>
          <Title level={3}>{readyToShip}</Title>
          <Text>Confirmed orders ready for shipping</Text>
          <Button type="primary" block style={{ marginTop: 12 }}>
            Generate Shipping Labels
          </Button>
        </Card>
      </Col>

      <Col xs={24} md={8}>
        <Card>
          <Title level={5}>
            <CalendarOutlined style={{ color: "#52c41a", marginRight: 8 }} />
            Today's Orders
          </Title>
          <Title level={3}>{todayOrders}</Title>
          <Text>Orders received today</Text>
          <Button
            type="primary"
            block
            style={{
              backgroundColor: "#52c41a",
              borderColor: "#52c41a",
              marginTop: 12,
            }}
          >
            View Today's Summary
          </Button>
        </Card>
      </Col>
    </Row>
  );
}

export default OrdersQuickActions;
