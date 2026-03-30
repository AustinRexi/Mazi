import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { Alert, Row, Col, Spin, message, Modal, Button } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import WelcomeBanner from "./WelcomeBanner";
import MetricsSection from "./MetricsSection";
import ChartsSection from "./ChartsSection";
import WalletCard from "./WalletCard";
import StoreStats from "./StoreStats";
import RecentOrders from "./RecentOrders";
import WithdrawModal from "../wallet/WithdrawModal";
import { useVendorCurrencyCode } from "../utils/currency";
import {
  getVendorRestaurantScope,
  setVendorRestaurantScope,
} from "../utils/restaurantScope";

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
    return [
      {
        name: orderProduct,
        quantity: 1,
        price: 0,
      },
    ];
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

  return date.toLocaleDateString("en-US", {
    month: "short",
    year: "2-digit",
  });
};

const getEntityRestaurantId = (row) =>
  Number(row?.restaurant_id || row?.restaurant?.id || 0);

const VendorDashboard = () => {
  const currencyCode = useVendorCurrencyCode();
  const navigate = useNavigate();
  const location = useLocation();
  const analyticsSectionRef = useRef(null);
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState(() =>
    getVendorRestaurantScope()
  );
  const [dashboardData, setDashboardData] = useState({
    userName: "Vendor",
    storeName: "Your Store",
    monthlyRevenue: 0,
    metrics: {
      revenue: 0,
      orders: 0,
      productsSold: 0,
      pendingOrders: 0,
    },
    charts: {
      revenueData: [],
      productPerformance: [],
    },
    wallet: {
      total: 0,
      pending: 0,
      available: 0,
    },
    storeStats: {
      restaurants: 0,
      foods: 0,
      groceries: 0,
      products: 0,
    },
    recentOrders: [],
  });
  const [loading, setLoading] = useState(true);
  const [withdrawing, setWithdrawing] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [showRestaurantSetupModal, setShowRestaurantSetupModal] = useState(false);
  const [error, setError] = useState("");

  const fetchDashboard = useCallback(async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("You need to log in as a vendor to view dashboard data.");
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
      setRestaurants(restaurantRows);
      setShowRestaurantSetupModal(restaurantRows.length === 0);

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

      const [ordersResponse, walletResponse, foodsResponse, groceriesResponse] =
        await Promise.all([
          axios.get(`${API_BASE_URL}/vendor/orders?${orderQuery.toString()}`, config),
          axios.get(`${API_BASE_URL}/vendor/wallet?limit=100`, config),
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
        const total = products.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );

        return {
          id: order.order_number || `ORD-${order.id}`,
          customer:
            order.buyer_name?.trim() || order.buyer_email || `Buyer #${order.buyer_id}`,
          amount: total,
          status: order.order_status || "pending",
          paymentStatus: order.payment_status || "pending",
          createdAt: order.created_at,
          products,
        };
      });

      const walletTransactions = (walletResponse.data?.data || []).map(
        (entry) => ({
          type: String(entry.type || "").toLowerCase(),
          status: String(entry.status || "").toLowerCase(),
          amount: Number(entry.amount || 0),
        })
      );

      const foods = (foodsResponse.data?.data || []).filter((item) => {
        if (!effectiveRestaurantId) {
          return true;
        }
        return getEntityRestaurantId(item) === Number(effectiveRestaurantId);
      });
      const groceries = (groceriesResponse.data?.data || []).filter((item) => {
        if (!effectiveRestaurantId) {
          return true;
        }
        return getEntityRestaurantId(item) === Number(effectiveRestaurantId);
      });
      const selectedRestaurant =
        restaurantRows.find((restaurant) => restaurant.id === effectiveRestaurantId) ||
        restaurantRows[0] ||
        null;

      const revenueByMonth = new Map();
      const productSales = new Map();

      orders.forEach((order) => {
        const monthKey = getMonthKey(order.createdAt);
        const isPaid = order.paymentStatus === "paid";

        if (monthKey && isPaid) {
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

      const monthlyRevenue =
        revenueData.length > 0 ? revenueData[revenueData.length - 1].revenue : 0;

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

      const pendingWallet = walletTransactions
        .filter((entry) => entry.status === "pending")
        .reduce((sum, entry) => sum + entry.amount, 0);

      setDashboardData({
        userName: selectedRestaurant?.restaurant_name || "Vendor",
        storeName: selectedRestaurant?.restaurant_name || "Your Store",
        monthlyRevenue,
        metrics: {
          revenue: totalRevenue,
          orders: orders.length,
          productsSold,
          pendingOrders,
        },
        charts: {
          revenueData,
          productPerformance,
        },
        wallet: {
          total: Number(walletResponse.data?.wallet?.amount || 0) + pendingWallet,
          pending: pendingWallet,
          available: Number(walletResponse.data?.wallet?.amount || 0),
        },
        storeStats: {
          restaurants: selectedRestaurant ? 1 : 0,
          foods: foods.length,
          groceries: groceries.length,
          products: foods.length + groceries.length,
        },
        recentOrders: orders
          .sort(
            (a, b) =>
              new Date(b.createdAt || 0).getTime() -
              new Date(a.createdAt || 0).getTime()
          )
          .slice(0, 5),
      });
    } catch (fetchError) {
      setError(
        fetchError.response?.data?.message ||
          "Failed to load vendor dashboard data."
      );
    } finally {
      setLoading(false);
    }
  }, [selectedRestaurantId]);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    if (query.get("focus") !== "analytics") {
      return;
    }

    const timeout = setTimeout(() => {
      analyticsSectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 150);

    return () => clearTimeout(timeout);
  }, [location.search, loading]);

  const handleWithdraw = async (values, form) => {
    const token = localStorage.getItem("token");

    if (!token) {
      message.error("You need to log in as a vendor to withdraw.");
      return;
    }

    try {
      setWithdrawing(true);
      await axios.post(
        `${API_BASE_URL}/vendor/wallet/withdraw`,
        {
          amount: Number(values.amount),
          bank_code: values.bank_code,
          account_number: values.account_number,
          account_name: values.account_name,
          description: values.description,
          transaction_pin: values.transaction_pin,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      message.success("Withdrawal initiated successfully.");
      setIsWithdrawModalOpen(false);
      form.resetFields();
      await fetchDashboard();
    } catch (withdrawError) {
      message.error(
        withdrawError.response?.data?.message || "Failed to process withdrawal."
      );
    } finally {
      setWithdrawing(false);
    }
  };

  const handleRestaurantChange = (restaurantId) => {
    setSelectedRestaurantId(restaurantId);
    setVendorRestaurantScope(restaurantId);
  };

  return (
    <div style={{ padding: 24 }}>
      {error ? (
        <Alert
          type="error"
          showIcon
          message={error}
          style={{ marginBottom: 16 }}
        />
      ) : null}

      <Spin spinning={loading}>
        <WelcomeBanner
          userName={dashboardData.userName}
          storeName={dashboardData.storeName}
          revenue={dashboardData.monthlyRevenue}
          currencyCode={currencyCode}
        />
        <MetricsSection metrics={dashboardData.metrics} currencyCode={currencyCode} />
        <div ref={analyticsSectionRef}>
          <ChartsSection
            revenueData={dashboardData.charts.revenueData}
            productPerformance={dashboardData.charts.productPerformance}
            currencyCode={currencyCode}
          />
        </div>

        <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
          <Col xs={24} lg={8}>
            <WalletCard
              walletData={dashboardData.wallet}
              onWithdrawClick={() => setIsWithdrawModalOpen(true)}
              withdrawing={withdrawing}
              currencyCode={currencyCode}
            />
          </Col>
          <Col xs={24} lg={8}>
            <StoreStats stats={dashboardData.storeStats} />
          </Col>
          <Col xs={24} lg={8}>
            <RecentOrders
              orders={dashboardData.recentOrders}
              currencyCode={currencyCode}
            />
          </Col>
        </Row>
      </Spin>

      <WithdrawModal
        isModalOpen={isWithdrawModalOpen}
        setIsModalOpen={setIsWithdrawModalOpen}
        availableBalance={dashboardData.wallet.available}
        onWithdraw={handleWithdraw}
        withdrawing={withdrawing}
      />

      <Modal
        open={showRestaurantSetupModal}
        closable={false}
        maskClosable={false}
        footer={null}
        title="Complete your store setup"
      >
        <p style={{ marginBottom: 16 }}>
          You do not have a restaurant record yet. Set up your restaurant in
          Settings before using the dashboard.
        </p>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
          <Button onClick={() => setShowRestaurantSetupModal(false)}>Later</Button>
          <Button
            type="primary"
            onClick={() => {
              setShowRestaurantSetupModal(false);
              navigate("/vendors/settings");
            }}
          >
            Go to Settings
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default VendorDashboard;
