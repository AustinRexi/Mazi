import { Row, Col, Card, Button, Typography } from "antd";
import { WalletOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { formatVendorMoney, useVendorCurrencyCode } from "../utils/currency";

const { Title, Text } = Typography;

const BalanceCards = ({
  availableBalance,
  pendingBalance,
  totalBalance,
  totalCredits,
  totalWithdrawals,
  onWithdrawClick,
}) => {
  const currencyCode = useVendorCurrencyCode();
  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} md={12} lg={8}>
        <Card
          title={
            <span>
              <WalletOutlined /> Wallet Balance
            </span>
          }
        >
          <Title level={3}>{formatVendorMoney(totalBalance, currencyCode)}</Title>
          <Text>Total Balance</Text>
          <Row gutter={16} style={{ marginTop: 16 }}>
            <Col span={12}>
              <Text strong style={{ color: "green" }}>
                {formatVendorMoney(availableBalance, currencyCode)}
              </Text>
              <p>Available</p>
            </Col>
            <Col span={12}>
              <Text strong style={{ color: "#faad14" }}>
                {formatVendorMoney(pendingBalance, currencyCode)}
              </Text>
              <p>Pending</p>
            </Col>
          </Row>
          <Button
            type="primary"
            icon={<ArrowUpOutlined />}
            onClick={onWithdrawClick}
            block
            style={{ marginTop: 16 }}
          >
            Withdraw Funds
          </Button>
        </Card>
      </Col>

      <Col xs={24} md={12} lg={8}>
        <Card
          title={
            <span>
              <ArrowUpOutlined /> Total Earnings
            </span>
          }
        >
          <Title level={4}>{formatVendorMoney(totalCredits, currencyCode)}</Title>
          <Text type="secondary">All time earnings</Text>
        </Card>
      </Col>

      <Col xs={24} md={12} lg={8}>
        <Card
          title={
            <span>
              <ArrowUpOutlined /> Total Withdrawals
            </span>
          }
        >
          <Title level={4}>
            {formatVendorMoney(totalWithdrawals, currencyCode)}
          </Title>
          <Text type="secondary">Total withdrawn</Text>
        </Card>
      </Col>
    </Row>
  );
};

export default BalanceCards;
