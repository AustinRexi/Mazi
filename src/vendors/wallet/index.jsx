import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Alert, Button, Card, Col, Row, Select, Spin, message } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import BalanceCards from "./BalanceCards";
import EarningsChart from "./EarningsChart";
import TransactionTable from "./TransactionTable";
import WithdrawModal from "./WithdrawModal";
import { useVendorCurrencyCode } from "../utils/currency";
import {
  getVendorRestaurantScope,
  setVendorRestaurantScope,
} from "../utils/restaurantScope";

const { Option } = Select;
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api";

const normalizeType = (type) => {
  switch (String(type || "").toLowerCase()) {
    case "credits":
      return "credit";
    case "debits":
      return "debit";
    case "withdrawals":
      return "withdrawal";
    default:
      return String(type || "credit").toLowerCase();
  }
};

const parseOrderProductTotal = (orderProduct) => {
  if (!orderProduct) {
    return 0;
  }

  const normalizeItems = (items = []) =>
    items.reduce((sum, item) => {
      const quantity = Number(item.quantity || item.qty || 1);
      const price = Number(
        item.price ||
          item.unit_price ||
          item.food_price ||
          item.groceries_price ||
          item.drink_price ||
          0
      );
      return sum + quantity * price;
    }, 0);

  if (Array.isArray(orderProduct)) {
    return normalizeItems(orderProduct);
  }

  if (typeof orderProduct !== "string") {
    return 0;
  }

  try {
    const parsed = JSON.parse(orderProduct);
    if (Array.isArray(parsed)) {
      return normalizeItems(parsed);
    }

    const groupedItems = [
      ...(Array.isArray(parsed.foods) ? parsed.foods : []),
      ...(Array.isArray(parsed.groceries) ? parsed.groceries : []),
      ...(Array.isArray(parsed.drinks) ? parsed.drinks : []),
    ];
    return normalizeItems(groupedItems);
  } catch {
    return 0;
  }
};

const normalizeTransaction = (entry, orderTotalsById = new Map()) => ({
  id: entry.id,
  type: normalizeType(entry.type),
  description:
    entry.description ||
    entry.order?.order_product ||
    "Wallet transaction",
  amount: Number(entry.amount || 0),
  status: entry.status || "pending",
  date: entry.created_at,
  orderId: entry.order_id || entry.order?.id || null,
  orderProductTotal:
    parseOrderProductTotal(entry.order?.order_product) ||
    Number(orderTotalsById.get(Number(entry.order_id || entry.order?.id || 0)) || 0),
  restaurantId:
    entry.restaurant_id || entry.order?.restaurant_id || entry.order?.restaurant?.id || null,
});

const getTransactionEffectiveAmount = (transaction) => {
  if (transaction?.orderId) {
    return Number(transaction.orderProductTotal || 0);
  }
  return Number(transaction?.amount || 0);
};

const buildEarningsData = (transactions) => {
  const monthlyMap = new Map();

  transactions.forEach((transaction) => {
    const date = new Date(transaction.date);
    if (Number.isNaN(date.getTime())) {
      return;
    }

    const month = date.toLocaleDateString("en-US", { month: "short" });
    const currentValue = monthlyMap.get(month) || 0;
    const amount =
      transaction.type === "credit"
        ? getTransactionEffectiveAmount(transaction)
        : -getTransactionEffectiveAmount(transaction);

    monthlyMap.set(month, currentValue + amount);
  });

  return Array.from(monthlyMap.entries()).map(([month, earnings]) => ({
    month,
    earnings,
  }));
};

const VendorWallet = () => {
  const currencyCode = useVendorCurrencyCode();
  const [transactions, setTransactions] = useState([]);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState(
    () => getVendorRestaurantScope() || null
  );
  const [walletBalance, setWalletBalance] = useState(0);
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [withdrawing, setWithdrawing] = useState(false);
  const [error, setError] = useState("");

  const fetchWallet = useCallback(async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("You need to log in as a vendor to view wallet data.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const [walletResponse, restaurantResponse, ordersResponse] = await Promise.all([
        axios.get(`${API_BASE_URL}/vendor/wallet?limit=100`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }),
        axios.get(`${API_BASE_URL}/vendor/restaurants`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }),
        axios.get(`${API_BASE_URL}/vendor/orders?limit=500`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }),
      ]);

      const vendorRestaurants = restaurantResponse.data?.data || [];

      setSelectedRestaurantId((current) => {
        const scoped = Number(current || getVendorRestaurantScope() || 0);
        const scopedExists = vendorRestaurants.some(
          (restaurant) => Number(restaurant.id) === scoped
        );

        if (scopedExists) {
          setVendorRestaurantScope(scoped);
          return scoped;
        }

        const fallbackId = Number(vendorRestaurants[0]?.id || 0);
        if (fallbackId > 0) {
          setVendorRestaurantScope(fallbackId);
          return fallbackId;
        }

        setVendorRestaurantScope(null);
        return null;
      });

      const orderTotalsById = new Map(
        (ordersResponse.data?.data || []).map((order) => [
          Number(order.id || 0),
          parseOrderProductTotal(order.order_product),
        ])
      );

      setTransactions(
        (walletResponse.data?.data || []).map((entry) =>
          normalizeTransaction(entry, orderTotalsById)
        )
      );
      setWalletBalance(Number(walletResponse.data?.wallet?.amount || 0));
    } catch (fetchError) {
      setError(
        fetchError.response?.data?.message || "Failed to load wallet entries."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWallet();
  }, [fetchWallet]);

  useEffect(() => {
    const onStorage = () => {
      const nextScope = getVendorRestaurantScope();
      setSelectedRestaurantId((current) =>
        Number(current || 0) === Number(nextScope || 0) ? current : nextScope
      );
    };

    window.addEventListener("storage", onStorage);
    window.addEventListener("focus", onStorage);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("focus", onStorage);
    };
  }, []);

  const scopedTransactions = selectedRestaurantId
    ? transactions.filter(
        (transaction) =>
          Number(transaction.restaurantId || 0) === Number(selectedRestaurantId)
      )
    : transactions;

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
          bank_name: values.bank_name,
          description: values.description,
          save_as_beneficiary: Boolean(values.save_as_beneficiary),
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
      setIsModalOpen(false);
      form.resetFields();
      await fetchWallet();
    } catch (withdrawError) {
      message.error(
        withdrawError.response?.data?.message || "Failed to process withdrawal."
      );
    } finally {
      setWithdrawing(false);
    }
  };

  const availableBalance = Number(walletBalance || 0);

  const pendingBalance = scopedTransactions
    .filter((t) => t.status === "pending")
    .reduce((sum, t) => {
      const amount = getTransactionEffectiveAmount(t);
      if (t.type === "credit") {
        return sum + amount;
      }

      if (t.type === "withdrawal") {
        return sum + amount;
      }

      return sum;
    }, 0);

  const totalBalance = availableBalance + pendingBalance;

  const totalCredits = scopedTransactions
    .filter((t) => t.type === "credit")
    .reduce((sum, t) => sum + getTransactionEffectiveAmount(t), 0);

  const totalWithdrawals = Math.abs(
    scopedTransactions
      .filter((t) => t.type === "withdrawal")
      .reduce((sum, t) => sum + getTransactionEffectiveAmount(t), 0)
  );

  const filteredTransactions = scopedTransactions.filter((t) => {
    const matchesType = filterType === "all" || t.type === filterType;
    const matchesStatus = filterStatus === "all" || t.status === filterStatus;
    return matchesType && matchesStatus;
  });

  const earningsData = buildEarningsData(scopedTransactions);

  return (
    <div style={{ padding: 24 }}>
      <BalanceCards
        availableBalance={availableBalance}
        pendingBalance={pendingBalance}
        totalBalance={totalBalance}
        totalCredits={totalCredits}
        totalWithdrawals={totalWithdrawals}
        onWithdrawClick={() => setIsModalOpen(true)}
      />

      <Spin spinning={loading} tip="Loading wallet data..." size="large">
        <div>
          {error ? (
            <Alert
              type="error"
              showIcon
              message={error}
              style={{ marginBottom: 16 }}
            />
          ) : null}

          <EarningsChart data={earningsData} currencyCode={currencyCode} />

          <Card
            title="Transaction History"
            extra={<Button icon={<DownloadOutlined />}>Export</Button>}
            style={{ marginTop: 24 }}
          >
            <Row gutter={16} style={{ marginBottom: 16 }}>
              <Col xs={24} md={6}>
                <Select
                  value={filterType}
                  onChange={setFilterType}
                  style={{ width: "100%" }}
                >
                  <Option value="all">All Types</Option>
                  <Option value="credit">Credits</Option>
                  <Option value="debit">Debits</Option>
                  <Option value="withdrawal">Withdrawals</Option>
                </Select>
              </Col>
              <Col xs={24} md={6}>
                <Select
                  value={filterStatus}
                  onChange={setFilterStatus}
                  style={{ width: "100%" }}
                >
                  <Option value="all">All Status</Option>
                  <Option value="completed">Completed</Option>
                  <Option value="pending">Pending</Option>
                  <Option value="failed">Failed</Option>
                </Select>
              </Col>
            </Row>

            <TransactionTable
              transactions={filteredTransactions}
              loading={loading}
            />
          </Card>
        </div>
      </Spin>

      <WithdrawModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        availableBalance={availableBalance}
        onWithdraw={handleWithdraw}
        withdrawing={withdrawing}
        endpointPrefix="/vendor/wallet"
      />
    </div>
  );
};

export default VendorWallet;
