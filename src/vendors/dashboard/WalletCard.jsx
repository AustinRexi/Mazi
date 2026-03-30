import { Card, Typography, Space, Button } from "antd";
import walletIcon from "../../utils/icons/wallet.svg";
import { formatVendorMoney } from "../utils/currency";

const { Title, Text } = Typography;

const WalletCard = ({
  walletData,
  onWithdrawClick,
  withdrawing = false,
  currencyCode = "",
}) => {
  return (
    <Card
      title={
        <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <img src={walletIcon} alt="wallet" style={{ height: 24 }} /> Wallet
          Balance
        </span>
      }
    >
      <>
        <Title level={3}>
          {formatVendorMoney(walletData?.total || 0, currencyCode)}
        </Title>
        <Space direction="vertical" style={{ width: "100%", marginBottom: 16 }}>
          <Text>
            Pending: <b>{formatVendorMoney(walletData?.pending || 0, currencyCode)}</b>
          </Text>
          <Text>
            Available:{" "}
            <b style={{ color: "#16a34a" }}>
              {formatVendorMoney(walletData?.available || 0, currencyCode)}
            </b>
          </Text>
        </Space>
        <Button
          type="primary"
          block
          style={{ background: "#16a34a" }}
          onClick={onWithdrawClick}
          loading={withdrawing}
        >
          Withdraw Funds
        </Button>
      </>
    </Card>
  );
};

export default WalletCard;
