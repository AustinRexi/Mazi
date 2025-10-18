import { Row, Col, Input, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const { Option } = Select;

function OrdersFilterBar({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  paymentFilter,
  setPaymentFilter,
}) {
  return (
    <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
      <Col xs={24} sm={12} md={8}>
        <Input
          prefix={<SearchOutlined />}
          placeholder="Search orders, customers..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Col>
      <Col xs={24} sm={6} md={4}>
        <Select
          value={statusFilter}
          onChange={setStatusFilter}
          style={{ width: "100%" }}
        >
          <Option value="all">All Orders</Option>
          <Option value="pending">Pending</Option>
          <Option value="confirmed">Confirmed</Option>
          <Option value="shipped">Shipped</Option>
          <Option value="delivered">Delivered</Option>
          <Option value="cancelled">Cancelled</Option>
        </Select>
      </Col>
      <Col xs={24} sm={6} md={4}>
        <Select
          value={paymentFilter}
          onChange={setPaymentFilter}
          style={{ width: "100%" }}
        >
          <Option value="all">All Payments</Option>
          <Option value="paid">Paid</Option>
          <Option value="pending">Pending</Option>
          <Option value="failed">Failed</Option>
        </Select>
      </Col>
    </Row>
  );
}

export default OrdersFilterBar;
