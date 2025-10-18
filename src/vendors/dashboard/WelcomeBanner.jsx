import { useEffect, useState, useContext } from "react";
import { Card, Typography, Spin } from "antd";
import { AuthContext } from "../../context/AuthContext"; // adjust path if needed

const { Title, Text } = Typography;

const WelcomeBanner = () => {
  const { user } = useContext(AuthContext);
  const [revenue, setRevenue] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRevenue = async () => {
      try {
        const res = await fetch(`/api/store/stats?userId=${user?.id}`);
        const data = await res.json();
        setRevenue(data.monthlyRevenue || 0);
      } catch (error) {
        console.error("Failed to load revenue:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchRevenue();
  }, [user]);

  return (
    <Card
      style={{
        background: "linear-gradient(90deg, #16a34a, #15803d)",
        color: "white",
        borderRadius: 16,
        marginBottom: 24,
      }}
    >
      <Title level={3} style={{ color: "white" }}>
        Welcome back, {user?.name || "there"}! 👋
      </Title>

      {loading ? (
        <Spin size="small" style={{ color: "white" }} />
      ) : (
        <Text style={{ color: "#d1fae5" }}>
          Your store has generated{" "}
          <strong>${Number(revenue).toLocaleString()}</strong> in revenue this
          month. Keep up the great work!
        </Text>
      )}
    </Card>
  );
};

export default WelcomeBanner;
