import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Alert, Button, Card, Spin, Typography } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import MetricsSection from "../dashboard/MetricsSection";
import ChartsSection from "../dashboard/ChartsSection";
import { useVendorCurrencyCode } from "../utils/currency";
import {
  getVendorRestaurantScope,
  setVendorRestaurantScope,
} from "../utils/restaurantScope";

const { Title, Text } = Typography;
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api";

const parseOrderProducts = (orderProduct) => {
  if (!orderProduct) {
    return [];
  }

  if (Array.isArray(orderProduct)) {
    return orderProduct;
  }

  if (typeof orderProduct !== "string") {
    return [];
  }

  try {
    const parsed = JSON.parse(orderProduct);

    if (Array.isArray(parsed)) {
      return parsed.map((item) => ({
        name: item.name || item.product_name || item.food_name || "Product",
        quantity: Number(item.quantity || item.qty || 1),
        price: Number(
          item.price ||
            item.unit_price ||
            item.food_price ||
            item.groceries_price ||
            item.drink_price ||
            0
        ),
      }));
    }

    const normalized = [];

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
        });
      });
    });

    return normalized;
  } catch {
    return [{ name: orderProduct, quantity: 1, price: 0 }];
  }
};

const getMonthKey = (dateValue) => {
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) {
    return "";
  }
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
};

const formatMonthLabel = (monthKey) => {
  const [year, month] = monthKey.split("-");
  const date = new Date(Number(year), Number(month) - 1, 1);
  return date.toLocaleDateString("en-US", { month: "short", year: "2-digit" });
};

const getEntityRestaurantId = (row) =>
  Number(row?.restaurant_id || row?.restaurant?.id || 0);

function VendorAnalytics() {
  const currencyCode = useVendorCurrencyCode();
  const navigate = useNavigate();
  const [selectedRestaurantId, setSelectedRestaurantId] = useState(() =>
    getVendorRestaurantScope()
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [metrics, setMetrics] = useState({
    revenue: 0,
    orders: 0,
    productsSold: 0,
    pendingOrders: 0,
  });
  const [charts, setCharts] = useState({
    revenueData: [],
    productPerformance: [],
  });

  const fetchAnalytics = useCallback(async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("You need to log in as a vendor to view analytics.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      };

      const restaurantsResponse = await axios.get(
        `${API_BASE_URL}/vendor/restaurants?limit=100`,
        config
      );
      const restaurantRows = restaurantsResponse.data?.data || [];

      const effectiveRestaurantId =
        selectedRestaurantId || restaurantRows[0]?.id || null;
      if (!selectedRestaurantId && restaurantRows[0]?.id) {
        setSelectedRestaurantId(restaurantRows[0].id);
        setVendorRestaurantScope(restaurantRows[0].id);
      }

      const orderQuery = new URLSearchParams({ limit: "100" });
      if (effectiveRestaurantId) {
        orderQuery.set("restaurant_id", String(effectiveRestaurantId));
      }

      const [ordersResponse, foodsResponse, groceriesResponse] = await Promise.all([
        axios.get(`${API_BASE_URL}/vendor/orders?${orderQuery.toString()}`, config),
        axios.get(`${API_BASE_URL}/vendor/foods?limit=100`, config),
        axios.get(`${API_BASE_URL}/vendor/groceries?limit=100`, config),
      ]);

      const orders = (ordersResponse.data?.data || [])
        .filter((order) => {
          if (!effectiveRestaurantId) {
            return true;
          }
          return getEntityRestaurantId(order) === Number(effectiveRestaurantId);
        })
        .map((order) => {
        const products = parseOrderProducts(order.order_product);
        const amount = products.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );

        return {
          status: String(order.order_status || "pending").toLowerCase(),
          paymentStatus: String(order.payment_status || "pending").toLowerCase(),
          createdAt: order.created_at,
          amount,
          products,
        };
      });

      const revenueByMonth = new Map();
      const productSales = new Map();

      orders.forEach((order) => {
        const monthKey = getMonthKey(order.createdAt);
        if (monthKey && order.paymentStatus === "paid") {
          revenueByMonth.set(
            monthKey,
            (revenueByMonth.get(monthKey) || 0) + order.amount
          );
        }

        order.products.forEach((item) => {
          productSales.set(
            item.name,
            (productSales.get(item.name) || 0) + Number(item.quantity || 0)
          );
        });
      });

      const sortedMonthKeys = Array.from(revenueByMonth.keys()).sort();
      const revenueData = sortedMonthKeys.slice(-6).map((monthKey) => ({
        month: formatMonthLabel(monthKey),
        revenue: revenueByMonth.get(monthKey) || 0,
      }));

      const productPerformance = Array.from(productSales.entries())
        .map(([name, sales]) => ({ name, sales }))
        .sort((a, b) => b.sales - a.sales)
        .slice(0, 5);

      const totalRevenue = orders
        .filter((order) => order.paymentStatus === "paid")
        .reduce((sum, order) => sum + order.amount, 0);

      const productsSold = orders.reduce(
        (sum, order) =>
          sum +
          order.products.reduce(
            (productSum, item) => productSum + Number(item.quantity || 0),
            0
          ),
        0
      );

      const pendingOrders = orders.filter(
        (order) => order.status === "pending"
      ).length;

      const foodsCount = (foodsResponse.data?.data || []).filter((item) => {
        if (!effectiveRestaurantId) {
          return true;
        }
        return getEntityRestaurantId(item) === Number(effectiveRestaurantId);
      }).length;
      const groceriesCount = (groceriesResponse.data?.data || []).filter((item) => {
        if (!effectiveRestaurantId) {
          return true;
        }
        return getEntityRestaurantId(item) === Number(effectiveRestaurantId);
      }).length;

      setMetrics({
        revenue: totalRevenue,
        orders: orders.length,
        productsSold,
        pendingOrders,
        foodsCount,
        groceriesCount,
      });

      setCharts({
        revenueData,
        productPerformance,
      });
    } catch (fetchError) {
      setError(
        fetchError.response?.data?.message || "Failed to load analytics data."
      );
    } finally {
      setLoading(false);
    }
  }, [selectedRestaurantId]);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  return (
    <div style={{ padding: 24 }}>
      <Card style={{ marginBottom: 24 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <Title level={4} style={{ marginBottom: 0 }}>
              Store Analytics
            </Title>
            <Text type="secondary">
              Revenue trends and product performance for your store
            </Text>
          </div>
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate("/vendors/dashboard")}
          >
            Back to Dashboard
          </Button>
        </div>
      </Card>

      {error ? (
        <Alert type="error" showIcon message={error} style={{ marginBottom: 16 }} />
      ) : null}

      <Spin spinning={loading}>
        <MetricsSection metrics={metrics} currencyCode={currencyCode} />
        <ChartsSection
          revenueData={charts.revenueData}
          productPerformance={charts.productPerformance}
          currencyCode={currencyCode}
        />
      </Spin>
    </div>
  );
}

export default VendorAnalytics;
