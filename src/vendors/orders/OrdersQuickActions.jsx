import { useEffect, useMemo, useState } from "react";
import {
  Row,
  Col,
  Card,
  Typography,
  Button,
  Modal,
  List,
  Tag,
  Descriptions,
  message,
} from "antd";
import {
  ClockCircleOutlined,
  TruckOutlined,
  CalendarOutlined,
  EyeOutlined,
  CheckOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import { formatVendorMoney, useVendorCurrencyCode } from "../utils/currency";
import axios from "axios";

const { Title, Text } = Typography;
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api";

function OrdersQuickActions({
  orders = [],
  pendingOrders = 0,
  onUpdateOrderStatus,
  onUpdateShippingLabel,
  onBroadcastOrder,
  onRefreshOrders,
}) {
  const currencyCode = useVendorCurrencyCode();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", data: [] });
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [loadingByKey, setLoadingByKey] = useState({});

  const normalizeStatus = (status) => String(status || "").toLowerCase();

  const readyToShip = useMemo(
    () => orders.filter((o) => normalizeStatus(o.status) === "active"),
    [orders]
  );
  const todayOrders = useMemo(
    () =>
      orders.filter(
        (o) => new Date(o.orderDate).toDateString() === new Date().toDateString()
      ),
    [orders]
  );
  const pendingOrActive = useMemo(
    () =>
      orders.filter((o) => {
        const status = normalizeStatus(o.status);
        return status === "pending" || status === "active";
      }),
    [orders]
  );

  const getPaymentColor = (status) => {
    switch (String(status || "").toLowerCase()) {
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

  const getActionKey = (action, orderId) => `${action}:${orderId}`;
  const isActionLoading = (action, orderId) =>
    Boolean(loadingByKey[getActionKey(action, orderId)]);
  const setActionLoading = (action, orderId, value) => {
    const key = getActionKey(action, orderId);
    setLoadingByKey((prev) => {
      if (!value && !prev[key]) {
        return prev;
      }
      return { ...prev, [key]: value };
    });
  };

  const refreshOrders = async () => {
    if (typeof onRefreshOrders === "function") {
      await onRefreshOrders();
    }
  };

  const handleOpenModal = (type) => {
    let data = [];
    let title = "";

    switch (type) {
      case "pending":
        title = "Pending Orders";
        data = pendingOrActive;
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

  useEffect(() => {
    if (!modalVisible) {
      return;
    }

    let data = [];
    if (modalContent.title === "Pending Orders") {
      data = pendingOrActive;
    } else if (modalContent.title === "Generate Shipping Labels") {
      data = readyToShip;
    } else if (modalContent.title === "Today's Orders Summary") {
      data = todayOrders;
    }

    setModalContent((prev) => ({ ...prev, data }));
  }, [
    modalVisible,
    modalContent.title,
    pendingOrActive,
    readyToShip,
    todayOrders,
  ]);

  useEffect(() => {
    if (!selectedOrder) {
      return;
    }

    const latestOrder = orders.find((o) => o.id === selectedOrder.id);
    if (latestOrder) {
      setSelectedOrder(latestOrder);
    }
  }, [orders, selectedOrder]);

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setIsViewModalVisible(true);
  };

  const handleAcceptOrder = async (order) => {
    const token = localStorage.getItem("token");

    if (!order.backendId) {
      message.error("Cannot accept this order: missing backend order id.");
      return;
    }

    setActionLoading("accept", order.id, true);
    try {
      await axios.patch(
        `${API_BASE_URL}/vendor/orders/${order.backendId}/accept`,
        {},
        {
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            Accept: "application/json",
          },
        }
      );

      if (onUpdateOrderStatus) {
        onUpdateOrderStatus(order.id, "active");
      }
      message.success(`Order ${order.id} is now active.`);
    } catch (error) {
      message.error(
        error.response?.data?.message || `Failed to accept order ${order.id}.`
      );
    } finally {
      setActionLoading("accept", order.id, false);
      await refreshOrders();
    }
  };

  const handleBroadcastOrder = async (order, options = {}) => {
    const { forceRebroadcast = false } = options;
    const orderStatus = normalizeStatus(order.status);

    if (orderStatus !== "active") {
      message.error(`Order ${order.id} must be active before broadcasting.`);
      return;
    }

    if (!forceRebroadcast && order.isBroadcasted) {
      message.info(`Order ${order.id} is already broadcasted.`);
      return;
    }

    if (!onBroadcastOrder) {
      message.error("Broadcast action is not available.");
      return;
    }

    const actionKey = forceRebroadcast ? "rebroadcast" : "broadcast";
    setActionLoading(actionKey, order.id, true);
    try {
      const result = await onBroadcastOrder(order);
      if (result?.ok) {
        message.success(
          forceRebroadcast
            ? `Order ${order.id} rebroadcasted successfully.`
            : `Order ${order.id} broadcasted successfully.`
        );
        return;
      }

      message.error(
        forceRebroadcast
          ? `Failed to rebroadcast order ${order.id}.`
          : `Failed to broadcast order ${order.id}.`
      );
    } finally {
      setActionLoading(actionKey, order.id, false);
      await refreshOrders();
    }
  };

  const handleGenerateShippingLabel = async (order) => {
    const token = localStorage.getItem("token");

    if (!order.backendId) {
      message.error("Cannot generate label: missing backend order id.");
      return;
    }

    setActionLoading("label", order.id, true);
    try {
      const response = await axios.patch(
        `${API_BASE_URL}/vendor/orders/${order.backendId}/shipping-label`,
        {},
        {
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            Accept: "application/json",
          },
        }
      );

      const shippingLabel = response.data?.data?.shipping_label || null;
      if (onUpdateShippingLabel) {
        onUpdateShippingLabel(order.id, shippingLabel);
      }

      message.success(`Shipping label generated for ${order.id}.`);
    } catch (error) {
      message.error(
        error.response?.data?.message ||
          `Failed to generate shipping label for ${order.id}.`
      );
    } finally {
      setActionLoading("label", order.id, false);
      await refreshOrders();
    }
  };

  const actions = [
    {
      title: "Pending Orders",
      count:
        typeof pendingOrders === "number"
          ? pendingOrders
          : pendingOrActive.length,
      description: "Pending and active orders awaiting your action",
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
      description: "Active orders ready for shipping",
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

      <Modal
        title={modalContent.title}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        width={760}
      >
        {modalContent.data.length > 0 ? (
          <List
            itemLayout="horizontal"
            dataSource={modalContent.data}
            renderItem={(order) => (
              <List.Item
                actions={
                  modalContent.title === "Pending Orders"
                    ? [
                        <Button
                          type="text"
                          key="view"
                          icon={<EyeOutlined />}
                          onClick={() => handleViewOrder(order)}
                        >
                          View
                        </Button>,
                        <Button
                          type="text"
                          key="accept"
                          icon={<CheckOutlined />}
                          onClick={() => handleAcceptOrder(order)}
                          loading={isActionLoading("accept", order.id)}
                          disabled={normalizeStatus(order.status) !== "pending"}
                        >
                          Accept
                        </Button>,
                        <Button
                          type="text"
                          key="broadcast"
                          icon={<NotificationOutlined />}
                          onClick={() => handleBroadcastOrder(order)}
                          loading={isActionLoading("broadcast", order.id)}
                          disabled={
                            normalizeStatus(order.status) !== "active" ||
                            Boolean(order.isBroadcasted)
                          }
                        >
                          Broadcast
                        </Button>,
                      ]
                    : modalContent.title === "Generate Shipping Labels"
                      ? [
                          <Button
                            type="text"
                            key="view"
                            icon={<EyeOutlined />}
                            onClick={() => handleViewOrder(order)}
                          >
                            View
                          </Button>,
                          <Button
                            type="text"
                            key="generate-label"
                            icon={<TruckOutlined />}
                            onClick={() => handleGenerateShippingLabel(order)}
                            loading={isActionLoading("label", order.id)}
                          >
                            Generate Label
                          </Button>,
                        ]
                      : [
                          <Button
                            type="text"
                            key="view"
                            icon={<EyeOutlined />}
                            onClick={() => handleViewOrder(order)}
                          >
                            View
                          </Button>,
                        ]
                }
              >
                <List.Item.Meta
                  title={`Order #${order.id}`}
                  description={`Status: ${order.status} | Date: ${new Date(
                    order.orderDate
                  ).toLocaleDateString()}${
                    order.shippingLabel?.label_number
                      ? ` | Label: ${order.shippingLabel.label_number}`
                      : ""
                  }${
                    order.isBroadcasted
                      ? ` | Broadcasted: ${new Date(
                          order.lastBroadcastAt || Date.now()
                        ).toLocaleString()}`
                      : ""
                  }`}
                />
              </List.Item>
            )}
          />
        ) : (
          <Text type="secondary">No orders available.</Text>
        )}
      </Modal>

      <Modal
        open={isViewModalVisible}
        title="Order Details"
        onCancel={() => setIsViewModalVisible(false)}
        footer={[
          selectedOrder && normalizeStatus(selectedOrder.status) === "active" ? (
            <Button
              key="rebroadcast"
              type="primary"
              icon={<NotificationOutlined />}
              loading={isActionLoading("rebroadcast", selectedOrder.id)}
              onClick={() =>
                handleBroadcastOrder(selectedOrder, { forceRebroadcast: true })
              }
            >
              Rebroadcast
            </Button>
          ) : null,
          <Button key="close" onClick={() => setIsViewModalVisible(false)}>
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
                {String(selectedOrder.paymentStatus || "").toUpperCase()}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Order Status">
              {selectedOrder.status}
            </Descriptions.Item>
            <Descriptions.Item label="Order Date">
              {new Date(selectedOrder.orderDate).toLocaleString()}
            </Descriptions.Item>
            <Descriptions.Item label="Broadcast Status">
              {selectedOrder.isBroadcasted ? (
                <Tag color="processing">Broadcasted</Tag>
              ) : (
                <Tag>Not Broadcasted</Tag>
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Last Broadcast">
              {selectedOrder.lastBroadcastAt
                ? new Date(selectedOrder.lastBroadcastAt).toLocaleString()
                : "-"}
            </Descriptions.Item>
            <Descriptions.Item label="Broadcast Attempts">
              {selectedOrder.broadcastAttempts || 0}
            </Descriptions.Item>
            <Descriptions.Item label="Products">
              {selectedOrder.products.map((p, i) => (
                <div key={i}>
                  • {p.name} ×{p.quantity}
                </div>
              ))}
            </Descriptions.Item>
            <Descriptions.Item label="Shipping Label">
              {selectedOrder.shippingLabel?.label_number || "Not generated"}
            </Descriptions.Item>
            <Descriptions.Item label="Carrier">
              {selectedOrder.shippingLabel?.carrier || "-"}
            </Descriptions.Item>
            <Descriptions.Item label="Service Level">
              {selectedOrder.shippingLabel?.service_level || "-"}
            </Descriptions.Item>
            <Descriptions.Item label="Label Status">
              {selectedOrder.shippingLabel?.status || "-"}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </>
  );
}

export default OrdersQuickActions;
