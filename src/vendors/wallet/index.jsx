import { useEffect, useState } from "react";
import { Row, Col, Card, Select, Button, Spin } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import BalanceCards from "./BalanceCards";
import EarningsChart from "./EarningsChart";
import TransactionTable from "./TransactionTable";
import WithdrawModal from "./WithdrawModal";
import { MOCK_TRANSACTIONS, earningsData } from "./mockData";

const { Option } = Select;

const VendorWallet = () => {
  const [transactions, setTransactions] = useState([]);
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true); // 👈 Loading state

  const availableBalance = 1097.3;
  const pendingBalance = 1250.5;
  const totalBalance = availableBalance + pendingBalance;

  // ✅ Simulate API call delay (2s)
  useEffect(() => {
    const timer = setTimeout(() => {
      setTransactions(MOCK_TRANSACTIONS);
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const totalCredits = transactions
    .filter((t) => t.type === "credit" && t.status === "completed")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalWithdrawals = Math.abs(
    transactions
      .filter((t) => t.type === "withdrawal" && t.status === "completed")
      .reduce((sum, t) => sum + t.amount, 0)
  );

  const filteredTransactions = transactions.filter((t) => {
    const matchesType = filterType === "all" || t.type === filterType;
    const matchesStatus = filterStatus === "all" || t.status === filterStatus;
    return matchesType && matchesStatus;
  });

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

      {/* Wrap spinner around main content */}
      <Spin spinning={loading} tip="Loading wallet data..." size="large">
        <div>
          <EarningsChart data={earningsData} />

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
      />
    </div>
  );
};

export default VendorWallet;
