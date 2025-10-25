import { useState } from "react";
import {
  Table,
  Tag,
  Select,
  Space,
  Button,
  Typography,
  Modal,
  Descriptions,
  message,
} from "antd";
import { EyeOutlined, InboxOutlined } from "@ant-design/icons";

const { Text } = Typography;
const { Option } = Select;

function OrdersTable({ orders, updateOrderStatus }) {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // 🔹 Payment tag colors
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

  // 👁 View order details
  const handleView = (order) => {
    setSelectedOrder(order);
    setIsModalVisible(true);
  };

  // 📩 Send message to customer (placeholder for API)
  const handleMessageCustomer = (order) => {
    message.info(`Preparing to send message to ${order.customer.email}...`);
    // 🔜 When API is ready:
    // await sendMessageAPI(order.customer.email, "Your message content");
  };

  const columns = [
    {
      title: "Order ID",
      dataIndex: "id",
      render: (id) => <Text strong>{id}</Text>,
      fixed: "left",
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
            {p.name} ×{p.quantity}
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
      render: (order) =>
        new Date(order.orderDate).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
    },
    {
      title: "Actions",
      fixed: "right",
      render: (order) => (
        <Space>
          <Button icon={<EyeOutlined />} onClick={() => handleView(order)} />
          <Button
            icon={<InboxOutlined />}
            onClick={() => handleMessageCustomer(order)}
          />
        </Space>
      ),
    },
  ];

  return (
    <>
      {/* 🔹 Table Container with X-scroll for small screens */}
      <div style={{ width: "100%", overflowX: "auto" }}>
        <Table
          columns={columns}
          dataSource={orders}
          rowKey="id"
          pagination={{ pageSize: 5 }}
          scroll={{ x: 900 }} // ✅ Enables horizontal scroll
        />
      </div>

      {/* 👁 Order Details Modal */}
      <Modal
        open={isModalVisible}
        title="Order Details"
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setIsModalVisible(false)}>
            Close
          </Button>,
        ]}
      >
        {selectedOrder && (
          <Descriptions bordered column={1} size="small">
            <Descriptions.Item label="Order ID">
              {selectedOrder.id}
            </Descriptions.Item>
            <Descriptions.Item label="Customer Name">
              {selectedOrder.customer.name}
            </Descriptions.Item>
            <Descriptions.Item label="Customer Email">
              {selectedOrder.customer.email}
            </Descriptions.Item>
            <Descriptions.Item label="Total">
              ${selectedOrder.total.toFixed(2)}
            </Descriptions.Item>
            <Descriptions.Item label="Payment Status">
              <Tag color={getPaymentColor(selectedOrder.paymentStatus)}>
                {selectedOrder.paymentStatus.toUpperCase()}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Order Status">
              {selectedOrder.status}
            </Descriptions.Item>
            <Descriptions.Item label="Order Date">
              {new Date(selectedOrder.orderDate).toLocaleString()}
            </Descriptions.Item>
            <Descriptions.Item label="Products">
              {selectedOrder.products.map((p, i) => (
                <div key={i}>
                  • {p.name} ×{p.quantity}
                </div>
              ))}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </>
  );
}

export default OrdersTable;
