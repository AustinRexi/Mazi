import { Card, Typography, Space, Button } from "antd";
import { WalletOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const WalletCard = () => (
  <Card
    title={
      <>
        <WalletOutlined /> Wallet Balance
      </>
    }
  >
    <Title level={3}>$2,347.80</Title>
    <Space direction="vertical" style={{ width: "100%", marginBottom: 16 }}>
      <Text>
        Pending: <b>$1,250.50</b>
      </Text>
      <Text>
        Available: <b style={{ color: "#16a34a" }}>$1,097.30</b>
      </Text>
    </Space>
    <Button type="primary" block style={{ background: "#16a34a" }}>
      Withdraw Funds
    </Button>
  </Card>
);

export default WalletCard;
