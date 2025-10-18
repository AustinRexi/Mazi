import { Row, Col } from "antd";
import WelcomeBanner from "./WelcomeBanner";
import MetricsSection from "./MetricsSection";
import ChartsSection from "./ChartsSection";
import WalletCard from "./WalletCard";
import StoreStats from "./StoreStats";
import RecentOrders from "./RecentOrders";

const VendorDashboard = () => {
  return (
    <div style={{ padding: 24 }}>
      <WelcomeBanner />
      <MetricsSection />
      <ChartsSection />

      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col xs={24} lg={8}>
          <WalletCard />
        </Col>
        <Col xs={24} lg={8}>
          <StoreStats />
        </Col>
        <Col xs={24} lg={8}>
          <RecentOrders />
        </Col>
      </Row>
    </div>
  );
};

export default VendorDashboard;
