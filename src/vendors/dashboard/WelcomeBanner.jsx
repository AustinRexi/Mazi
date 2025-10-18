import { Card, Typography } from "antd";

const { Title, Text } = Typography;

const WelcomeBanner = () => (
  <Card
    style={{
      background: "linear-gradient(90deg, #16a34a, #15803d)",
      color: "white",
      borderRadius: 16,
      marginBottom: 24,
    }}
  >
    <Title level={3} style={{ color: "white" }}>
      Welcome back, John! 👋
    </Title>
    <Text style={{ color: "#d1fae5" }}>
      Your store has generated $8,500 in revenue this month. Keep up the great
      work!
    </Text>
  </Card>
);

export default WelcomeBanner;
