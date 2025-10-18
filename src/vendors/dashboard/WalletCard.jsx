import { useEffect, useState } from "react";
import { Card, Typography, Space, Button, Spin } from "antd";
import walletIcon from "../../utils/icons/wallet.svg";

const { Title, Text } = Typography;

const WalletCard = () => {
  const [walletData, setWalletData] = useState({
    total: 2347.8,
    pending: 1250.5,
    available: 1007.3,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Example fetch — replace `/api/wallet` with your actual endpoint
    const fetchWalletData = async () => {
      try {
        const res = await fetch("/api/wallet");
        const data = await res.json();

        // Expected API response example:
        // { total: 2347.8, pending: 1250.5, available: 1097.3 }
        setWalletData(data);
      } catch (error) {
        console.error("Error fetching wallet data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWalletData();
  }, []);

  return (
    <Card
      title={
        <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <img src={walletIcon} alt="wallet" style={{ height: 24 }} /> Wallet
          Balance
        </span>
      }
    >
      {loading ? (
        <Spin />
      ) : (
        <>
          <Title level={3}>${walletData.total?.toLocaleString()}</Title>
          <Space
            direction="vertical"
            style={{ width: "100%", marginBottom: 16 }}
          >
            <Text>
              Pending: <b>${walletData.pending?.toLocaleString()}</b>
            </Text>
            <Text>
              Available:{" "}
              <b style={{ color: "#16a34a" }}>
                ${walletData.available?.toLocaleString()}
              </b>
            </Text>
          </Space>
          <Button type="primary" block style={{ background: "#16a34a" }}>
            Withdraw Funds
          </Button>
        </>
      )}
    </Card>
  );
};

export default WalletCard;
