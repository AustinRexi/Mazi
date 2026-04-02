import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { Alert, Button, Card, Col, Row, Spin, Typography, notification } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import OrderStats from "./OrderStats";
import OrdersFilterBar from "./OrdersFilterBar";
import OrdersTable from "./OrdersTable";
import OrdersQuickActions from "./OrdersQuickActions";
import {
  getVendorRestaurantScope,
  setVendorRestaurantScope,
} from "../utils/restaurantScope";

const { Title, Text } = Typography;
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api";
const STORAGE_BASE_URL = API_BASE_URL.replace(/\/api\/?$/, "");
const REBROADCAST_INTERVAL_MS = 20 * 60 * 1000;
const ORDERS_REFRESH_INTERVAL_MS = 10 * 1000;

const normalizeOrderStatus = (status) => {
  const value = String(status || "pending").toLowerCase();

  switch (value) {
    case "confirmed":
      return "active";
    case "accepted":
      return "active";
    case "shipped":
    case "collected":
      return "on_the_way";
    case "pending":
    case "active":
    case "arrived":
    case "on_the_way":
    case "delivered":
    case "cancelled":
      return value;
    default:
      return "pending";
  }
};

const getRestaurantIdFilter = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const directParam = searchParams.get("restaurant_id");

  if (directParam) {
    return directParam;
  }

  const hashQuery = window.location.hash.split("?")[1];
  if (!hashQuery) {
    return "";
  }

  return new URLSearchParams(hashQuery).get("restaurant_id") || "";
};

const normalizeOrderProductImage = (imagePath) => {
  if (!imagePath) {
    return null;
  }

  if (/^https?:\/\//i.test(imagePath)) {
    return imagePath;
  }

  return `${STORAGE_BASE_URL}/storage/${String(imagePath).replace(/^\/+/, "")}`;
};

const parseProducts = (orderProduct) => {
  if (!orderProduct) {
    return [];
  }

  if (Array.isArray(orderProduct)) {
    return orderProduct.map((item) => ({
      name: item.name || item.product_name || item.food_name || "Product",
      quantity: Number(item.quantity || item.qty || 1),
      price: Number(
        item.price ||
          item.unit_price ||
          item.food_price ||
          item.groceries_price ||
          0
      ),
      image: normalizeOrderProductImage(
        item.image ||
          item.product_image ||
          item.food_image ||
          item.food_images ||
          item.groceries_images ||
          item.drink_image
      ),
    }));
  }

  if (typeof orderProduct !== "string") {
    return [];
  }

  try {
    const parsed = JSON.parse(orderProduct);
    const normalized = [];

    if (Array.isArray(parsed)) {
      return parsed.map((item) => ({
        name: item.name || item.product_name || item.food_name || "Product",
        quantity: Number(item.quantity || item.qty || 1),
        price: Number(
          item.price ||
            item.unit_price ||
            item.food_price ||
            item.groceries_price ||
            0
        ),
        image: normalizeOrderProductImage(
          item.image ||
            item.product_image ||
            item.food_image ||
            item.food_images ||
            item.groceries_images ||
            item.drink_image
        ),
      }));
    }

    ["foods", "groceries", "drinks"].forEach((group) => {
      if (!Array.isArray(parsed[group])) {
        return;
      }

      parsed[group].forEach((item) => {
        normalized.push({
          name:
            item.name ||
            item.product_name ||
            item.food_name ||
            item.groceries_name ||
            item.drink_name ||
            "Product",
          quantity: Number(item.quantity || item.qty || 1),
          price: Number(
            item.price ||
              item.unit_price ||
              item.food_price ||
              item.groceries_price ||
              item.drink_price ||
              0
          ),
          image: normalizeOrderProductImage(
            item.image ||
              item.product_image ||
              item.food_image ||
              item.food_images ||
              item.groceries_images ||
              item.drink_image
          ),
        });
      });
    });

    return normalized;
  } catch {
    return [
      {
        name: orderProduct,
        quantity: 1,
        price: 0,
        image: null,
      },
    ];
  }
};

const toTimestamp = (value) => {
  if (!value) {
    return null;
  }

  const timestamp = new Date(value).getTime();
  return Number.isFinite(timestamp) ? timestamp : null;
};

const extractLastBroadcastAt = (order) =>
  toTimestamp(
    order.last_broadcast_at ||
      order.broadcasted_at ||
      order.last_broadcasted_at ||
      order.rebroadcasted_at
  );

const isAcceptedOrder = (status) => {
  const normalized = normalizeOrderStatus(status);
  return normalized === "active" || normalized === "arrived" || normalized === "on_the_way" || normalized === "delivered";
};

const normalizeOrder = (order) => {
  const products = parseProducts(order.order_product);
  const productTotal = products.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const lastBroadcastAt = extractLastBroadcastAt(order);
  const hasBroadcastStatus = String(order.order_status || "").toLowerCase() === "broadcasted";
  const broadcastAttempts = Number(
    order.broadcast_attempts ||
      order.rebroadcast_count ||
      order.broadcast_count ||
      0
  );

  return {
    id: order.order_number || `ORD-${order.id}`,
    backendId: order.id,
    userId: order.buyer_id || order.user_id || order.buyer?.id || null,
    vendorId: order.vendor_id || order.vendor?.id || null,
    restaurantId: order.restaurant_id || order.restaurant?.id || null,
    customer: {
      name:
        order.buyer_name ||
        [order.buyer?.firstname, order.buyer?.lastname].filter(Boolean).join(" ") ||
        order.buyer?.name ||
        `Customer #${order.buyer_id}`,
      email:
        order.buyer_email ||
        order.buyer?.email ||
        `buyer_id: ${order.buyer_id}`,
    },
    products,
    total: productTotal,
    status: normalizeOrderStatus(order.order_status),
    paymentStatus: order.payment_status || "pending",
    orderDate: order.created_at,
    isBroadcasted: hasBroadcastStatus || Boolean(lastBroadcastAt),
    lastBroadcastAt,
    broadcastAttempts: Number.isFinite(broadcastAttempts) ? broadcastAttempts : 0,
    shippingLabel: order.shipping_label || null,
    raw: order,
  };
};

function VendorOrder() {
  const [api, contextHolder] = notification.useNotification();
  const [orders, setOrders] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState(
    () => getVendorRestaurantScope() || getRestaurantIdFilter() || null
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const rebroadcastInFlight = useRef(new Set());
  const knownOrderIdsRef = useRef(new Set());
  const hasLoadedInitialOrdersRef = useRef(false);
  const previousOrdersCountRef = useRef(0);
  const previousLatestOrderTsRef = useRef(0);

  const fetchRestaurants = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }

    try {
      const response = await axios.get(`${API_BASE_URL}/vendor/restaurants?limit=100`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      const rows = response.data?.data || [];
      setRestaurants(rows);
      setSelectedRestaurantId((current) => {
        const nextValue = current || rows[0]?.id || null;
        if (nextValue) {
          setVendorRestaurantScope(nextValue);
        }
        return nextValue;
      });
    } catch {
      // Keep existing behavior if restaurants cannot be fetched.
    }
  }, []);

  const playNotificationSound = useCallback(() => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) {
        return;
      }
      const context = new AudioCtx();
      const oscillator = context.createOscillator();
      const gainNode = context.createGain();

      oscillator.type = "sine";
      oscillator.frequency.value = 880;
      gainNode.gain.value = 0.08;

      oscillator.connect(gainNode);
      gainNode.connect(context.destination);
      oscillator.start();

      setTimeout(() => {
        oscillator.stop();
        context.close();
      }, 220);
    } catch {
      // no-op: sound is best-effort
    }
  }, []);

  const fetchOrders = useCallback(async (options = {}) => {
    const { silent = false } = options;
    const token = localStorage.getItem("token");
    const restaurantId = selectedRestaurantId;

    if (!token) {
      setError("You need to log in as a vendor to view orders.");
      setLoading(false);
      return;
    }

    try {
      if (!silent) {
        setLoading(true);
      }
      setError("");

      const query = new URLSearchParams({ limit: "100" });
      if (restaurantId) {
        query.set("restaurant_id", String(restaurantId));
      }

      const response = await axios.get(
        `${API_BASE_URL}/vendor/orders?${query.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      const normalizedOrders = (response.data?.data || []).map(normalizeOrder);
      const incomingOrderIds = new Set(
        normalizedOrders.map((order) => String(order.backendId || order.id))
      );
      const latestOrderTs = normalizedOrders.reduce((maxTs, order) => {
        const ts = new Date(order.orderDate).getTime();
        const safeTs = Number.isFinite(ts) ? ts : 0;
        return Math.max(maxTs, safeTs);
      }, 0);

      if (hasLoadedInitialOrdersRef.current) {
        const newOrders = normalizedOrders.filter(
          (order) => !knownOrderIdsRef.current.has(String(order.backendId || order.id))
        );
        const hasCountIncrease =
          normalizedOrders.length > previousOrdersCountRef.current;
        const hasNewerTimestamp =
          latestOrderTs > previousLatestOrderTsRef.current;

        if (newOrders.length > 0 || (hasCountIncrease && hasNewerTimestamp)) {
          const latestOrder = normalizedOrders[0];
          const inferredCount = Math.max(
            newOrders.length,
            normalizedOrders.length - previousOrdersCountRef.current
          );
          api.open({
            message:
              inferredCount === 1
                ? `New order received: ${latestOrder.id}`
                : `${inferredCount} new orders received`,
            description:
              inferredCount === 1
                ? "Open Orders to review and process it."
                : "Open Orders to review and process them.",
            placement: "topRight",
          });
          playNotificationSound();
        }
      }

      setOrders(normalizedOrders);
      knownOrderIdsRef.current = incomingOrderIds;
      previousOrdersCountRef.current = normalizedOrders.length;
      previousLatestOrderTsRef.current = latestOrderTs;
      hasLoadedInitialOrdersRef.current = true;
    } catch (fetchError) {
      setError(
        fetchError.response?.data?.message || "Failed to load vendor orders."
      );
    } finally {
      if (!silent) {
        setLoading(false);
      }
    }
  }, [api, playNotificationSound, selectedRestaurantId]);

  useEffect(() => {
    fetchRestaurants();
  }, [fetchRestaurants]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchOrders({ silent: true });
    }, ORDERS_REFRESH_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [fetchOrders]);

  const filteredOrders = orders
    .filter((order) => {
      const matchesRestaurant =
        !selectedRestaurantId ||
        Number(order.restaurantId || 0) === Number(selectedRestaurantId);
      const matchesSearch =
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customer.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus =
        statusFilter === "all"
          ? true
          : statusFilter === "broadcasted"
            ? order.isBroadcasted
            : order.status === statusFilter;
      const matchesPayment =
        paymentFilter === "all" || order.paymentStatus === paymentFilter;
      return matchesRestaurant && matchesSearch && matchesStatus && matchesPayment;
    })
    .sort((a, b) => {
      const dateA = new Date(a.orderDate).getTime();
      const dateB = new Date(b.orderDate).getTime();
      const safeDateA = Number.isFinite(dateA) ? dateA : 0;
      const safeDateB = Number.isFinite(dateB) ? dateB : 0;
      return safeDateB - safeDateA;
    });

  const updateOrderStatus = (id, newStatus) => {
    setOrders((currentOrders) =>
      currentOrders.map((order) =>
        order.id === id
          ? {
              ...order,
              status: newStatus,
              ...(isAcceptedOrder(newStatus)
                ? { isBroadcasted: false, lastBroadcastAt: null }
                : {}),
            }
          : order
      )
    );
  };

  const updateShippingLabel = (id, shippingLabel) => {
    setOrders((currentOrders) =>
      currentOrders.map((order) =>
        order.id === id ? { ...order, shippingLabel: shippingLabel || null } : order
      )
    );
  };

  const markOrderBroadcasted = (id, overrideTimestamp = null) => {
    const now = overrideTimestamp || Date.now();

    setOrders((currentOrders) =>
      currentOrders.map((order) =>
        order.id === id
          ? {
              ...order,
              isBroadcasted: true,
              lastBroadcastAt: now,
              broadcastAttempts: Number(order.broadcastAttempts || 0) + 1,
            }
          : order
      )
    );
  };

  const broadcastOrderById = async (order, options = {}) => {
    const token = localStorage.getItem("token");
    const { silent = false } = options;

    if (!order?.backendId) {
      return { ok: false, reason: "missing_order_id" };
    }

    try {
      await axios.post(
        `${API_BASE_URL}/vendor/orders/${order.backendId}/broadcast`,
        {},
        {
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            Accept: "application/json",
          },
        }
      );

      markOrderBroadcasted(order.id);
      return { ok: true };
    } catch (requestError) {
      if (!silent) {
        setError(
          requestError.response?.data?.message ||
            `Failed to broadcast order ${order.id}.`
        );
      }
      return { ok: false, reason: "request_failed" };
    }
  };

  const sendOrderMessage = async (order, payload) => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("You need to log in as a vendor.");
    }

    const orderId = order?.backendId || order?.raw?.id || null;
    const userId = order?.userId || order?.raw?.buyer_id || null;
    const vendorId = order?.vendorId || order?.raw?.vendor_id || null;
    const restaurantId =
      order?.restaurantId || order?.raw?.restaurant_id || null;

    if (!orderId) {
      throw new Error("Missing order id for this message.");
    }
    if (!userId) {
      throw new Error("Missing user id for this message.");
    }
    if (!vendorId) {
      throw new Error("Missing vendor id for this message.");
    }
    if (!restaurantId) {
      throw new Error("Missing restaurant id for this message.");
    }

    await axios.post(
      `${API_BASE_URL}/vendor/messages`,
      {
        user_id: userId,
        vendor_id: vendorId,
        restaurant_id: restaurantId,
        title: payload.title,
        message: payload.message,
        order_id: orderId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const candidates = orders.filter((order) => {
        if (!order.isBroadcasted) {
          return false;
        }
        if (order.status !== "pending") {
          return false;
        }
        if (!order.lastBroadcastAt) {
          return false;
        }
        return now - order.lastBroadcastAt >= REBROADCAST_INTERVAL_MS;
      });

      candidates.forEach((order) => {
        if (rebroadcastInFlight.current.has(order.id)) {
          return;
        }

        rebroadcastInFlight.current.add(order.id);
        broadcastOrderById(order, { silent: true }).finally(() => {
          rebroadcastInFlight.current.delete(order.id);
        });
      });
    }, 60 * 1000);

    return () => clearInterval(interval);
  }, [orders]);

  const formatStatusLabel = (status) =>
    String(status || "")
      .split("_")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");

  const exportOrdersToExcel = () => {
    const rows = filteredOrders.map((order) => ({
      orderId: order.id,
      customerName: order.customer?.name || "",
      customerEmail: order.customer?.email || "",
      products: (order.products || [])
        .map((p) => `${p.name} x${p.quantity}`)
        .join(", "),
      total: Number(order.total || 0).toFixed(2),
      status: formatStatusLabel(order.status),
      paymentStatus: String(order.paymentStatus || "").toUpperCase(),
      orderDate: order.orderDate
        ? new Date(order.orderDate).toLocaleString()
        : "",
    }));

    const header = [
      "Order ID",
      "Customer Name",
      "Customer Email",
      "Products",
      "Total",
      "Order Status",
      "Payment Status",
      "Order Date",
    ];

    const tableRows = rows
      .map(
        (row) => `
          <tr>
            <td>${row.orderId}</td>
            <td>${row.customerName}</td>
            <td>${row.customerEmail}</td>
            <td>${row.products}</td>
            <td>${row.total}</td>
            <td>${row.status}</td>
            <td>${row.paymentStatus}</td>
            <td>${row.orderDate}</td>
          </tr>
        `
      )
      .join("");

    const html = `
      <html>
        <head>
          <meta charset="utf-8" />
        </head>
        <body>
          <table border="1">
            <thead>
              <tr>${header.map((h) => `<th>${h}</th>`).join("")}</tr>
            </thead>
            <tbody>${tableRows}</tbody>
          </table>
        </body>
      </html>
    `;

    const blob = new Blob([html], {
      type: "application/vnd.ms-excel;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const timestamp = new Date().toISOString().slice(0, 19).replace(/[:T]/g, "-");
    link.href = url;
    link.setAttribute("download", `orders-${timestamp}.xls`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const totalOrders = orders.length;
  const pendingOrders = orders.filter(
    (o) => o.status === "pending" || o.status === "active"
  ).length;
  const completedOrders = orders.filter((o) => o.status === "delivered").length;
  const totalRevenue = orders
    .filter((o) => o.paymentStatus === "paid")
    .reduce((sum, o) => sum + o.total, 0);

  return (
    <div style={{ padding: 24 }}>
      {contextHolder}
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
            <Button icon={<DownloadOutlined />} onClick={exportOrdersToExcel}>
              Export Orders
            </Button>
          </Col>
        </Row>

        {error ? (
          <Alert
            type="error"
            showIcon
            message={error}
            style={{ marginBottom: 16 }}
          />
        ) : null}

        <OrdersFilterBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          paymentFilter={paymentFilter}
          setPaymentFilter={setPaymentFilter}
        />

        <Spin spinning={loading}>
          <OrdersTable
            orders={filteredOrders}
            updateOrderStatus={updateOrderStatus}
            sendOrderMessage={sendOrderMessage}
          />
        </Spin>
      </Card>

      <OrdersQuickActions
        orders={orders}
        pendingOrders={pendingOrders}
        onUpdateOrderStatus={updateOrderStatus}
        onUpdateShippingLabel={updateShippingLabel}
        onBroadcastOrder={broadcastOrderById}
        onRefreshOrders={fetchOrders}
      />
    </div>
  );
}

export default VendorOrder;
