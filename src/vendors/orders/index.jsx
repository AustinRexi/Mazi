import { useState } from "react";
import { Card, Row, Col, Typography, Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import OrderStats from "./OrderStats";
import OrdersFilterBar from "./OrdersFilterBar";
import OrdersTable from "./OrdersTable";
import OrdersQuickActions from "./OrdersQuickActions";

const { Title, Text } = Typography;

const MOCK_ORDERS = [
  {
    id: "ORD-001",
    customer: { name: "Jane Doe", email: "jane@example.com" },
    products: [{ name: "Wireless Mouse", quantity: 2, price: 25 }],
    total: 50,
    status: "pending",
    paymentStatus: "paid",
    orderDate: "2025-10-16T09:30:00Z",
  },
  {
    id: "ORD-002",
    customer: { name: "John Smith", email: "john@example.com" },
    products: [{ name: "Bluetooth Keyboard", quantity: 1, price: 45 }],
    total: 45,
    status: "confirmed",
    paymentStatus: "paid",
    orderDate: "2025-10-17T12:15:00Z",
  },
];

function VendorOrder() {
  const [orders, setOrders] = useState(MOCK_ORDERS);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;
    const matchesPayment =
      paymentFilter === "all" || order.paymentStatus === paymentFilter;
    return matchesSearch && matchesStatus && matchesPayment;
  });

  const updateOrderStatus = (id, newStatus) => {
    setOrders(
      orders.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.status === "pending").length;
  const completedOrders = orders.filter((o) => o.status === "delivered").length;
  const totalRevenue = orders
    .filter((o) => o.paymentStatus === "paid")
    .reduce((sum, o) => sum + o.total, 0);

  return (
    <div style={{ padding: 24 }}>
      <OrderStats
        totalOrders={totalOrders}
        pendingOrders={pendingOrders}
        completedOrders={completedOrders}
        totalRevenue={totalRevenue}
      />

      <Card style={{ marginTop: 24 }}>
        <Row
          justify="space-between"
          align="middle"
          style={{ marginBottom: 16 }}
        >
          <Col>
            <Title level={4}>Order Management</Title>
            <Text type="secondary">Track and manage customer orders</Text>
          </Col>
          <Col>
            <Button icon={<DownloadOutlined />}>Export Orders</Button>
          </Col>
        </Row>

        <OrdersFilterBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          paymentFilter={paymentFilter}
          setPaymentFilter={setPaymentFilter}
        />

        <OrdersTable
          orders={filteredOrders}
          updateOrderStatus={updateOrderStatus}
        />
      </Card>

      <OrdersQuickActions orders={orders} pendingOrders={pendingOrders} />
    </div>
  );
}

export default VendorOrder;
