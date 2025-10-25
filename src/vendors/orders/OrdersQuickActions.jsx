import { useState } from "react";
import { Row, Col, Card, Typography, Button, Modal, List } from "antd";
import {
  ClockCircleOutlined,
  TruckOutlined,
  CalendarOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

function OrdersQuickActions({ orders = [], pendingOrders = 0 }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", data: [] });

  // Derived dynamic counts
  const readyToShip = orders.filter((o) => o.status === "confirmed");
  const todayOrders = orders.filter(
    (o) => new Date(o.orderDate).toDateString() === new Date().toDateString()
  );
  const pending = orders.filter((o) => o.status === "pending");

  // Handle modal opening dynamically
  const handleOpenModal = (type) => {
    let data = [];
    let title = "";

    switch (type) {
      case "pending":
        title = "Pending Orders";
        data = pending;
        break;
      case "ship":
        title = "Generate Shipping Labels";
        data = readyToShip;
        break;
      case "today":
        title = "Today's Orders Summary";
        data = todayOrders;
        break;
      default:
        title = "Details";
    }

    setModalContent({ title, data });
    setModalVisible(true);
  };

  // Dynamic card configuration
  const actions = [
    {
      title: "Pending Orders",
      count: pendingOrders || pending.length,
      description: "Orders awaiting your action",
      icon: (
        <ClockCircleOutlined style={{ color: "#faad14", marginRight: 8 }} />
      ),
      color: "#faad14",
      buttonText: "Process Pending Orders",
      onClick: () => handleOpenModal("pending"),
    },
    {
      title: "Ready to Ship",
      count: readyToShip.length,
      description: "Confirmed orders ready for shipping",
      icon: <TruckOutlined style={{ color: "#1890ff", marginRight: 8 }} />,
      color: "#1890ff",
      buttonText: "Generate Shipping Labels",
      onClick: () => handleOpenModal("ship"),
    },
    {
      title: "Today's Orders",
      count: todayOrders.length,
      description: "Orders received today",
      icon: <CalendarOutlined style={{ color: "#52c41a", marginRight: 8 }} />,
      color: "#52c41a",
      buttonText: "View Today's Summary",
      onClick: () => handleOpenModal("today"),
    },
  ];

  return (
    <>
      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        {actions.map((item) => (
          <Col xs={24} md={8} key={item.title}>
            <Card hoverable>
              <Title level={5}>
                {item.icon}
                {item.title}
              </Title>
              <Title level={3}>{item.count}</Title>
              <Text>{item.description}</Text>
              <Button
                type="primary"
                block
                onClick={item.onClick}
                style={{
                  backgroundColor: item.color,
                  borderColor: item.color,
                  marginTop: 12,
                }}
              >
                {item.buttonText}
              </Button>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Dynamic Modal */}
      <Modal
        title={modalContent.title}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        width={600}
      >
        {modalContent.data.length > 0 ? (
          <List
            itemLayout="horizontal"
            dataSource={modalContent.data}
            renderItem={(order) => (
              <List.Item
                actions={[
                  <Button type="link" key="view">
                    View
                  </Button>,
                  <Button type="link" key="action">
                    Take Action
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  title={`Order #${order.id}`}
                  description={`Status: ${order.status} | Date: ${new Date(
                    order.orderDate
                  ).toLocaleDateString()}`}
                />
              </List.Item>
            )}
          />
        ) : (
          <Text type="secondary">No orders available.</Text>
        )}
      </Modal>
    </>
  );
}

export default OrdersQuickActions;
