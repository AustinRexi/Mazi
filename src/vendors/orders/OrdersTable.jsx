import { Table, Tag, Select, Space, Button, Typography } from "antd";
import { EyeOutlined, InboxOutlined } from "@ant-design/icons";

const { Text } = Typography;
const { Option } = Select;

function OrdersTable({ orders, updateOrderStatus }) {
  const getPaymentColor = (status) => {
    switch (status) {
      case "paid":
        return "green";
      case "pending":
        return "gold";
      case "failed":
        return "red";
      default:
        return "default";
    }
  };

  const columns = [
    {
      title: "Order ID",
      dataIndex: "id",
      render: (id) => <Text strong>{id}</Text>,
    },
    {
      title: "Customer",
      render: (order) => (
        <>
          <Text strong>{order.customer.name}</Text>
          <br />
          <Text type="secondary">{order.customer.email}</Text>
        </>
      ),
    },
    {
      title: "Products",
      render: (order) =>
        order.products.map((p, i) => (
          <div key={i}>
            {p.name} x{p.quantity}
          </div>
        )),
    },
    {
      title: "Total",
      render: (order) => `$${order.total.toFixed(2)}`,
    },
    {
      title: "Order Status",
      render: (order) => (
        <Select
          value={order.status}
          onChange={(value) => updateOrderStatus(order.id, value)}
          style={{ width: 120 }}
        >
          <Option value="pending">Pending</Option>
          <Option value="confirmed">Confirmed</Option>
          <Option value="shipped">Shipped</Option>
          <Option value="delivered">Delivered</Option>
          <Option value="cancelled">Cancelled</Option>
        </Select>
      ),
    },
    {
      title: "Payment",
      render: (order) => (
        <Tag color={getPaymentColor(order.paymentStatus)}>
          {order.paymentStatus.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Date",
      render: (order) => new Date(order.orderDate).toLocaleDateString("en-US"),
    },
    {
      title: "Actions",
      render: () => (
        <Space>
          <Button icon={<EyeOutlined />} />
          <Button icon={<InboxOutlined />} />
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={orders}
      rowKey="id"
      pagination={{ pageSize: 5 }}
    />
  );
}

export default OrdersTable;
