import { Card, Typography } from "antd";
import { formatVendorMoney } from "../utils/currency";

const { Title, Text } = Typography;

const WelcomeBanner = ({ userName, storeName, revenue, currencyCode = "" }) => {
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
        Welcome back, {userName || "Vendor"}!
      </Title>

      <Text style={{ color: "#d1fae5" }}>
        {storeName || "Your store"} has generated{" "}
        <strong>{formatVendorMoney(revenue || 0, currencyCode)}</strong> in paid
        sales this month.
      </Text>
    </Card>
  );
};

export default WelcomeBanner;
