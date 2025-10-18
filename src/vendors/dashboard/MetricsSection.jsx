import { Row, Col, Card, Statistic, Typography } from "antd";
import {
  DollarOutlined,
  ShoppingCartOutlined,
  InboxOutlined,
  StarFilled,
  ArrowUpOutlined,
} from "@ant-design/icons";

const { Text } = Typography;

const MetricsSection = () => (
  <Row gutter={[16, 16]}>
    <Col xs={24} sm={12} lg={6}>
      <Card>
        <Statistic
          title="Total Revenue"
          value={8500}
          prefix={<DollarOutlined style={{ color: "#16a34a" }} />}
          precision={2}
        />
        <Text type="success">
          <ArrowUpOutlined /> +12.5% from last month
        </Text>
      </Card>
    </Col>

    <Col xs={24} sm={12} lg={6}>
      <Card>
        <Statistic
          title="Total Orders"
          value={85}
          prefix={<ShoppingCartOutlined style={{ color: "#1677ff" }} />}
        />
        <Text type="success">
          <ArrowUpOutlined /> +8.2% from last month
        </Text>
      </Card>
    </Col>

    <Col xs={24} sm={12} lg={6}>
      <Card>
        <Statistic
          title="Products Sold"
          value={717}
          prefix={<InboxOutlined style={{ color: "#722ed1" }} />}
        />
        <Text type="success">
          <ArrowUpOutlined /> +15.1% from last month
        </Text>
      </Card>
    </Col>

    <Col xs={24} sm={12} lg={6}>
      <Card>
        <Statistic
          title="Store Rating"
          value={4.8}
          prefix={<StarFilled style={{ color: "#fadb14" }} />}
          precision={1}
        />
        <Text type="success">
          <ArrowUpOutlined /> +0.2 from last month
        </Text>
      </Card>
    </Col>
  </Row>
);

export default MetricsSection;
