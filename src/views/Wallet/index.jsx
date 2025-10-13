import { useState } from "react";
import { Layout, Space, Row, Col } from "antd"; // Import Ant Design components
import { TruckOutlined, CoffeeOutlined, SwapOutlined } from "@ant-design/icons";

import Header from "./Header";
import FinancialOverview from "./FinancialOverview";
import ServicePerformance from "./ServicePerformance";
import ChartsSection from "./ChartsSection";
import RecentTransactions from "./RecentTransactions";
import QuickActions from "./QuickActions";

const { Content } = Layout;

const Wallet = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("7days");
  const [selectedService, setSelectedService] = useState("all");

  // Mock data for demonstration
  const totalBalance = 2847562.5;
  const totalProfit = 184520.3;
  const totalLoss = -42180.75;
  const netProfit = totalProfit + totalLoss;

  const serviceData = [
    {
      name: "Food Delivery",
      icon: CoffeeOutlined,
      revenue: 1245680.0,
      profit: 98420.5,
      transactions: 15847,
      growth: 12.5,
      color: "#16a34a",
    },
    {
      name: "Courier Services",
      icon: TruckOutlined,
      revenue: 987432.0,
      profit: 67890.25,
      transactions: 8923,
      growth: 8.3,
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

  const chartData = [
    { name: "Jan", revenue: 185000, profit: 12000, loss: -3000 },
    { name: "Feb", revenue: 195000, profit: 15000, loss: -2500 },
    { name: "Mar", revenue: 210000, profit: 18000, loss: -4000 },
    { name: "Apr", revenue: 225000, profit: 22000, loss: -3500 },
    { name: "May", revenue: 240000, profit: 25000, loss: -5000 },
    { name: "Jun", revenue: 265000, profit: 28000, loss: -4500 },
  ];

  const pieData = [
    { name: "Food Delivery", value: 1245680, color: "#16a34a" },
    { name: "Courier", value: 987432, color: "#3b82f6" },
    { name: "Currency Exchange", value: 614450, color: "#f59e0b" },
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

  return (
    <Layout style={{ minHeight: "100vh", background: "#f5f5f5" }}>
      <Content>
        <Row justify="center">
          <Col xs={24} sm={22} md={20} lg={24} xl={24}>
            <Space direction="vertical" size="large" style={{ width: "100%" }}>
              <Header
                selectedPeriod={selectedPeriod}
                setSelectedPeriod={setSelectedPeriod}
              />
              <FinancialOverview
                totalBalance={totalBalance}
                totalProfit={totalProfit}
                totalLoss={totalLoss}
                netProfit={netProfit}
              />
              <ServicePerformance serviceData={serviceData} />
              <ChartsSection chartData={chartData} pieData={pieData} />
              <RecentTransactions
                recentTransactions={recentTransactions}
                selectedService={selectedService}
                setSelectedService={setSelectedService}
              />
              <QuickActions />
            </Space>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default Wallet;
