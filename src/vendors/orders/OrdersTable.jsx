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
  Avatar,
} from "antd";
import { EyeOutlined, InboxOutlined } from "@ant-design/icons";
import { formatVendorMoney, useVendorCurrencyCode } from "../utils/currency";

const { Text } = Typography;
const { Option } = Select;
const REBROADCAST_INTERVAL_MS = 20 * 60 * 1000;

const formatStatusLabel = (status) =>
  String(status || "")
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

const getBroadcastLabel = (order) => {
  if (!order.isBroadcasted) {
    return { color: "default", text: "Not Broadcasted" };
  }

  if (order.status !== "pending" || !order.lastBroadcastAt) {
    return { color: "processing", text: "Broadcasted" };
  }

  const nextRebroadcastAt = order.lastBroadcastAt + REBROADCAST_INTERVAL_MS;
  const msLeft = nextRebroadcastAt - Date.now();
  if (msLeft <= 0) {
    return { color: "orange", text: "Rebroadcast Due" };
  }

  const totalMinutes = Math.ceil(msLeft / 60000);
  return {
    color: "processing",
    text: `Rebroadcast in ${totalMinutes}m`,
  };
};

function OrdersTable({ orders, updateOrderStatus }) {
  const currencyCode = useVendorCurrencyCode();
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
      width: 95,
      render: (id) => <Text strong style={{ fontSize: 13 }}>{id}</Text>,
      fixed: "left",
    },
    {
      title: "Total",
      width: 85,
      align: "right",
      render: (order) => <Text strong>{formatVendorMoney(order.total, currencyCode)}</Text>,
    },
    {
      title: "Order Status",
      width: 130,
      align: "center",
      render: (order) => (
        <Select
          value={order.status}
          onChange={(value) => updateOrderStatus(order.id, value)}
          size="small"
          style={{ width: 100 }}
        >
          <Option value="pending">Pending</Option>
          <Option value="active">Active</Option>
          <Option value="arrived">Arrived</Option>
          <Option value="on_the_way">On The Way</Option>
          <Option value="delivered">Delivered</Option>
          <Option value="cancelled">Cancelled</Option>
        </Select>
      ),
    },
    {
      title: "Broadcast",
      width: 150,
      align: "center",
      render: (order) => {
        const broadcast = getBroadcastLabel(order);
        return <Tag color={broadcast.color}>{broadcast.text}</Tag>;
      },
    },
    {
      title: "Payment",
      width: 110,
      align: "center",
      render: (order) => (
        <Tag color={getPaymentColor(order.paymentStatus)}>
          {order.paymentStatus.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Date",
      width: 130,
      render: (order) =>
        new Date(order.orderDate).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
    },
    {
      title: "Actions",
      width: 110,
      align: "center",
      fixed: "right",
      render: (order) => (
        <Space size={6}>
          <Button
            icon={<EyeOutlined />}
            size="small"
            onClick={() => handleView(order)}
          />
          <Button
            icon={<InboxOutlined />}
            size="small"
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
          bordered
          size="middle"
          pagination={{
            pageSize: 10,
            showSizeChanger: false,
            showTotal: (total) => `${total} orders`,
          }}
          scroll={{ x: 980 }}
          locale={{ emptyText: "No orders found" }}
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
              {formatVendorMoney(selectedOrder.total, currencyCode)}
            </Descriptions.Item>
            <Descriptions.Item label="Payment Status">
              <Tag color={getPaymentColor(selectedOrder.paymentStatus)}>
                {selectedOrder.paymentStatus.toUpperCase()}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Order Status">
              {formatStatusLabel(selectedOrder.status)}
            </Descriptions.Item>
            <Descriptions.Item label="Broadcast">
              <Tag color={getBroadcastLabel(selectedOrder).color}>
                {getBroadcastLabel(selectedOrder).text}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Last Broadcast">
              {selectedOrder.lastBroadcastAt
                ? new Date(selectedOrder.lastBroadcastAt).toLocaleString()
                : "-"}
            </Descriptions.Item>
            <Descriptions.Item label="Order Date">
              {new Date(selectedOrder.orderDate).toLocaleString()}
            </Descriptions.Item>
            <Descriptions.Item label="Products">
              <Space wrap>
                {selectedOrder.products.map((p, i) => (
                  <Tag key={`${p.name}-${i}`} color="blue">
                    <Space size={6}>
                      <Avatar size="small" src={p.image || undefined}>
                        {String(p.name || "P").charAt(0).toUpperCase()}
                      </Avatar>
                      <span>
                        {p.name} x{p.quantity}
                      </span>
                    </Space>
                  </Tag>
                ))}
              </Space>
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </>
  );
}

export default OrdersTable;
