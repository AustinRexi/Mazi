import { useEffect, useState } from "react";
import {
  Layout,
  Space,
  Row,
  Col,
  Spin,
  message,
} from "antd"; // Import Ant Design components
import { TruckOutlined, CoffeeOutlined, SwapOutlined } from "@ant-design/icons";
import axios from "axios";
import WithdrawModal from "../../vendors/wallet/WithdrawModal";

import Header from "./Header";
import FinancialOverview from "./FinancialOverview";
import ServicePerformance from "./ServicePerformance";
import ChartsSection from "./ChartsSection";
import RecentTransactions from "./RecentTransactions";
import QuickActions from "./QuickActions";
import { fetchAdminOrderCards } from "../../services/adminOrderService";
import {
  fetchAllAdminExpenses,
} from "../../services/adminExpenseService";
import { convertAdminCurrency } from "../../services/adminCurrencyService";
import {
  ADMIN_COUNTRY_SCOPE_EVENT,
  getAdminCountryScope,
} from "../../utils/adminCountryScope";
import {
  getCurrencyCodeForCountry,
  useAdminCountryCurrency,
} from "../../utils/adminCurrency";

const { Content } = Layout;

const mapWalletPeriodToRange = (period) => {
  if (period === "7days") {
    return "7d";
  }

  if (period === "30days") {
    return "30d";
  }

  if (period === "90days") {
    return "90d";
  }

  return "12m";
};

const buildExpenseLabels = (period) => {
  const now = new Date();
  const labels = [];
  const range = mapWalletPeriodToRange(period);

  if (range === "7d") {
    for (let offset = 6; offset >= 0; offset -= 1) {
      const date = new Date(now);
      date.setDate(now.getDate() - offset);
      labels.push(
        date.toLocaleDateString("en-US", { weekday: "short" })
      );
    }
    return labels;
  }

  if (range === "30d" || range === "90d") {
    const totalDays = range === "30d" ? 30 : 90;
    for (let offset = totalDays - 1; offset >= 0; offset -= 1) {
      const date = new Date(now);
      date.setDate(now.getDate() - offset);
      labels.push(
        date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })
      );
    }
    return labels;
  }

  for (let offset = 11; offset >= 0; offset -= 1) {
    const date = new Date(now.getFullYear(), now.getMonth() - offset, 1);
    labels.push(
      date.toLocaleDateString("en-US", {
        month: "short",
      })
    );
  }

  return labels;
};

const buildExpenseSeries = (expenses, period) => {
  const labels = buildExpenseLabels(period);
  const buckets = Object.fromEntries(labels.map((label) => [label, 0]));
  const range = mapWalletPeriodToRange(period);
  const now = new Date();

  expenses.forEach((expense) => {
    if (!expense?.expense_date) {
      return;
    }

    const expenseDate = new Date(expense.expense_date);
    if (Number.isNaN(expenseDate.getTime())) {
      return;
    }

    let label = "";
    if (range === "7d") {
      const threshold = new Date(now);
      threshold.setDate(now.getDate() - 6);
      if (expenseDate < threshold) {
        return;
      }
      label = expenseDate.toLocaleDateString("en-US", { weekday: "short" });
    } else if (range === "30d" || range === "90d") {
      const totalDays = range === "30d" ? 29 : 89;
      const threshold = new Date(now);
      threshold.setDate(now.getDate() - totalDays);
      if (expenseDate < threshold) {
        return;
      }
      label = expenseDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    } else {
      const threshold = new Date(now.getFullYear(), now.getMonth() - 11, 1);
      if (expenseDate < threshold) {
        return;
      }
      label = expenseDate.toLocaleDateString("en-US", { month: "short" });
    }

    if (!(label in buckets)) {
      return;
    }

    buckets[label] += Number(expense?.convertedAmount ?? expense?.amount ?? 0);
  });

  return {
    labels,
    expenses: labels.map((label) => Number(buckets[label] || 0)),
  };
};

const ensureChartHasVisibleTotals = (series, fallbackTotal) => {
  const normalizedSeries = Array.isArray(series)
    ? series.map((value) => Number(value || 0))
    : [];

  if (!normalizedSeries.length) {
    return [];
  }

  const hasAnyValue = normalizedSeries.some((value) => value > 0);
  if (hasAnyValue) {
    return normalizedSeries;
  }

  const nextSeries = [...normalizedSeries];
  nextSeries[nextSeries.length - 1] = Number(fallbackTotal || 0);
  return nextSeries;
};

const Wallet = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("7days");
  const [selectedService, setSelectedService] = useState("all");
  const { currencyCode } = useAdminCountryCurrency();
  const [financialSummary, setFinancialSummary] = useState({
    totalRevenue: 0,
    totalProfit: 0,
    totalExpenses: 0,
  });
  const [foodDeliveryPerformance, setFoodDeliveryPerformance] = useState({
    revenue: 0,
    profit: 0,
    transactions: 0,
  });
  const [courierServicePerformance, setCourierServicePerformance] = useState({
    revenue: 0,
    profit: 0,
    transactions: 0,
  });
  const [walletChartData, setWalletChartData] = useState({
    labels: [],
    revenue: [],
    profit: [],
    expenses: [],
  });
  const [walletPieData, setWalletPieData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [withdrawing, setWithdrawing] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(() =>
    getAdminCountryScope()
  );

  // Mock data for demonstration
  const netProfit = financialSummary.totalProfit - financialSummary.totalExpenses;

  useEffect(() => {
    const handleCountryChange = (event) => {
      setSelectedCountry(event.detail?.country || getAdminCountryScope());
    };

    window.addEventListener(ADMIN_COUNTRY_SCOPE_EVENT, handleCountryChange);
    return () =>
      window.removeEventListener(ADMIN_COUNTRY_SCOPE_EVENT, handleCountryChange);
  }, []);

  useEffect(() => {
    let isMounted = true;
    const sourceCurrencyCode = getCurrencyCodeForCountry(selectedCountry);

    const loadExpenses = async () => {
      const rows = await fetchAllAdminExpenses({
        country: selectedCountry,
      });

      return {
        data: rows,
      };
    };

    const loadFinancialSummary = async () => {
      if (isMounted) {
        setLoading(true);
      }

      const [ordersResult, expensesResult] = await Promise.allSettled([
        fetchAdminOrderCards({
          per_page: 1,
          country: selectedCountry,
          range: mapWalletPeriodToRange(selectedPeriod),
        }),
        loadExpenses(),
      ]);

      if (!isMounted) {
        return;
      }

      const ordersResponse =
        ordersResult.status === "fulfilled" ? ordersResult.value : null;
      const expenseRows =
        expensesResult.status === "fulfilled" &&
        Array.isArray(expensesResult.value?.data)
          ? expensesResult.value.data
          : [];

      let totalExpenses = 0;
      let totalRevenue = Number(ordersResponse?.wallet?.total_amount || 0);
      let totalProfit = Number(ordersResponse?.gross_profit || 0);
      let foodDeliveryRevenue = Number(
        ordersResponse?.service_performance?.food_delivery?.revenue || 0
      );
      let foodDeliveryProfit = Number(
        ordersResponse?.service_performance?.food_delivery?.profit || 0
      );
      let courierRevenue = Number(
        ordersResponse?.service_performance?.courier_services?.revenue || 0
      );
      let courierProfit = Number(
        ordersResponse?.service_performance?.courier_services?.profit || 0
      );
      let revenueChartSeries = Array.isArray(
        ordersResponse?.sales_report?.chart?.revenue
      )
        ? ordersResponse.sales_report.chart.revenue.map((value) => Number(value || 0))
        : [];
      let profitChartSeries = Array.isArray(
        ordersResponse?.sales_report?.chart?.profit
      )
        ? ordersResponse.sales_report.chart.profit.map((value) => Number(value || 0))
        : [];
      const chartLabels = Array.isArray(ordersResponse?.sales_report?.chart?.labels)
        ? ordersResponse.sales_report.chart.labels
        : [];

      try {
        const convertedWalletValues = await Promise.all([
          convertAdminCurrency({
            amount: totalRevenue,
            from: sourceCurrencyCode,
            to: currencyCode,
          }),
          convertAdminCurrency({
            amount: totalProfit,
            from: sourceCurrencyCode,
            to: currencyCode,
          }),
          convertAdminCurrency({
            amount: foodDeliveryRevenue,
            from: sourceCurrencyCode,
            to: currencyCode,
          }),
          convertAdminCurrency({
            amount: foodDeliveryProfit,
            from: sourceCurrencyCode,
            to: currencyCode,
          }),
          convertAdminCurrency({
            amount: courierRevenue,
            from: sourceCurrencyCode,
            to: currencyCode,
          }),
          convertAdminCurrency({
            amount: courierProfit,
            from: sourceCurrencyCode,
            to: currencyCode,
          }),
          ...revenueChartSeries.map((amount) =>
            convertAdminCurrency({
              amount,
              from: sourceCurrencyCode,
              to: currencyCode,
            })
          ),
          ...profitChartSeries.map((amount) =>
            convertAdminCurrency({
              amount,
              from: sourceCurrencyCode,
              to: currencyCode,
            })
          ),
        ]);

        totalRevenue = Number(convertedWalletValues[0]?.amount || 0);
        totalProfit = Number(convertedWalletValues[1]?.amount || 0);
        foodDeliveryRevenue = Number(convertedWalletValues[2]?.amount || 0);
        foodDeliveryProfit = Number(convertedWalletValues[3]?.amount || 0);
        courierRevenue = Number(convertedWalletValues[4]?.amount || 0);
        courierProfit = Number(convertedWalletValues[5]?.amount || 0);
        revenueChartSeries = convertedWalletValues
          .slice(6, 6 + revenueChartSeries.length)
          .map((item) => Number(item?.amount || 0));
        profitChartSeries = convertedWalletValues
          .slice(6 + revenueChartSeries.length)
          .map((item) => Number(item?.amount || 0));
      } catch (_) {
        totalRevenue = Number(ordersResponse?.wallet?.total_amount || 0);
        totalProfit = Number(ordersResponse?.gross_profit || 0);
        foodDeliveryRevenue = Number(
          ordersResponse?.service_performance?.food_delivery?.revenue || 0
        );
        foodDeliveryProfit = Number(
          ordersResponse?.service_performance?.food_delivery?.profit || 0
        );
        courierRevenue = Number(
          ordersResponse?.service_performance?.courier_services?.revenue || 0
        );
        courierProfit = Number(
          ordersResponse?.service_performance?.courier_services?.profit || 0
        );
      }

      revenueChartSeries = ensureChartHasVisibleTotals(
        revenueChartSeries,
        totalRevenue
      );
      profitChartSeries = ensureChartHasVisibleTotals(
        profitChartSeries,
        totalProfit
      );

      try {
        const convertedExpenseEntries = await Promise.all(
          expenseRows.map(async (expense) => {
            try {
              const converted = await convertAdminCurrency({
                amount: Number(expense?.amount || 0),
                from: expense?.currency || "USD",
                to: currencyCode,
              });

              return {
                ...expense,
                convertedAmount: Number(converted?.amount || 0),
              };
            } catch (_) {
              return {
                ...expense,
                convertedAmount: Number(expense?.amount || 0),
              };
            }
          })
        );

        totalExpenses = convertedExpenseEntries.reduce(
          (sum, expense) => sum + Number(expense?.convertedAmount || 0),
          0
        );
        const expenseChartSeries = buildExpenseSeries(
          convertedExpenseEntries,
          selectedPeriod
        );
        setWalletChartData({
          labels: chartLabels.length ? chartLabels : expenseChartSeries.labels,
          revenue: revenueChartSeries,
          profit: profitChartSeries,
          expenses: expenseChartSeries.expenses,
        });
      } catch (_) {
        totalExpenses = 0;
        setWalletChartData({
          labels: chartLabels,
          revenue: revenueChartSeries,
          profit: profitChartSeries,
          expenses: chartLabels.map(() => 0),
        });
      }

      setFinancialSummary({
        totalRevenue,
        totalProfit,
        totalExpenses,
      });
      setFoodDeliveryPerformance({
        revenue: foodDeliveryRevenue,
        profit: foodDeliveryProfit,
        transactions: Number(
          ordersResponse?.service_performance?.food_delivery?.transactions || 0
        ),
      });
      setCourierServicePerformance({
        revenue: courierRevenue,
        profit: courierProfit,
        transactions: Number(
          ordersResponse?.service_performance?.courier_services?.transactions || 0
        ),
      });
      setWalletPieData([
        { name: "Food Delivery", value: foodDeliveryRevenue, color: "#16a34a" },
        { name: "Courier", value: courierRevenue, color: "#3b82f6" },
        {
          name: "Currency Exchange",
          value: 0,
          color: "#f59e0b",
        },
      ]);

      if (isMounted) {
        setLoading(false);
      }
    };

    loadFinancialSummary().catch(() => {
      if (isMounted) {
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [currencyCode, selectedCountry, selectedPeriod]);

  const serviceData = [
    {
      name: "Food Delivery",
      icon: CoffeeOutlined,
      revenue: foodDeliveryPerformance.revenue,
      profit: foodDeliveryPerformance.profit,
      transactions: foodDeliveryPerformance.transactions,
      growth: 0,
      color: "#16a34a",
    },
    {
      name: "Courier Services",
      icon: TruckOutlined,
      revenue: courierServicePerformance.revenue,
      profit: courierServicePerformance.profit,
      transactions: courierServicePerformance.transactions,
      growth: 0,
      color: "#3b82f6",
    },
    {
      name: "Currency Exchange",
      icon: SwapOutlined,
      revenue: 614450.5,
      profit: 18209.55,
      transactions: 2156,
      growth: -2.1,
      color: "#f59e0b",
    },
  ];

  const recentTransactions = [
    {
      id: "TXN001",
      type: "revenue",
      service: "Food Delivery",
      amount: 1250.0,
      status: "completed",
      date: "2024-01-15",
      vendor: "Pizza Palace",
    },
    {
      id: "TXN002",
      type: "expense",
      service: "Courier",
      amount: -350.75,
      status: "completed",
      date: "2024-01-15",
      vendor: "Fuel Costs",
    },
    {
      id: "TXN003",
      type: "revenue",
      service: "Currency Exchange",
      amount: 89.5,
      status: "pending",
      date: "2024-01-14",
      vendor: "USD-EUR Exchange",
    },
    {
      id: "TXN004",
      type: "revenue",
      service: "Food Delivery",
      amount: 2100.0,
      status: "completed",
      date: "2024-01-14",
      vendor: "Burger House",
    },
    {
      id: "TXN005",
      type: "expense",
      service: "System",
      amount: -1200.0,
      status: "completed",
      date: "2024-01-13",
      vendor: "Server Maintenance",
    },
  ];

  const handleQuickAction = (actionLabel) => {
    if (actionLabel === "Withdraw") {
      setIsWithdrawModalOpen(true);
    }
  };

  const handleAdminWithdraw = async (values, form) => {
    const token = localStorage.getItem("token");
    if (!token) {
      message.error("You need to log in as an admin to withdraw.");
      return;
    }

    try {
      setWithdrawing(true);
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api"}/admin/wallet/withdraw`,
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
      setIsWithdrawModalOpen(false);
      form.resetFields();
    } catch (error) {
      message.error(
        error?.response?.data?.message || "Failed to process withdrawal."
      );
    } finally {
      setWithdrawing(false);
    }
  };

  return (
    <Layout style={{ minHeight: "100vh", background: "#f5f5f5" }}>
      <Content>
        <Spin spinning={loading} tip="Loading wallet data...">
          <Row justify="center">
            <Col xs={24} sm={22} md={20} lg={24} xl={24}>
              <Space direction="vertical" size="large" style={{ width: "100%" }}>
                <Header
                  selectedPeriod={selectedPeriod}
                  setSelectedPeriod={setSelectedPeriod}
                />
                <FinancialOverview
                  totalRevenue={financialSummary.totalRevenue}
                  totalProfit={financialSummary.totalProfit}
                  totalExpenses={financialSummary.totalExpenses}
                  netProfit={netProfit}
                  currencyCode={currencyCode}
                />
                <ServicePerformance
                  serviceData={serviceData}
                  currencyCode={currencyCode}
                />
                <ChartsSection
                  chartData={walletChartData}
                  pieData={walletPieData}
                  currencyCode={currencyCode}
                />
                <RecentTransactions
                  recentTransactions={recentTransactions}
                  selectedService={selectedService}
                  setSelectedService={setSelectedService}
                  currencyCode={currencyCode}
                />
                <QuickActions onAction={handleQuickAction} />
              </Space>
            </Col>
          </Row>
        </Spin>
      </Content>

      <WithdrawModal
        isModalOpen={isWithdrawModalOpen}
        setIsModalOpen={setIsWithdrawModalOpen}
        availableBalance={Number(financialSummary.totalRevenue || 0)}
        onWithdraw={handleAdminWithdraw}
        withdrawing={withdrawing}
        endpointPrefix="/admin/wallet"
      />
    </Layout>
  );
};

export default Wallet;
