import { Card, Row, Col, Typography, Space } from "antd";
import { formatVendorMoney, useVendorCurrencyCode } from "../utils/currency";
import {
  ShoppingCartOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  DollarOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

function OrderStats({
  totalOrders,
  pendingOrders,
  completedOrders,
  totalRevenue,
}) {
  const currencyCode = useVendorCurrencyCode();

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={12} md={6}>
        <Card>
          <Space>
            <ShoppingCartOutlined style={{ color: "#1890ff" }} />
            <Text>Total Orders</Text>
          </Space>
          <Title level={3}>{totalOrders}</Title>
          <Text type="secondary">All time orders</Text>
        </Card>
      </Col>

      <Col xs={24} sm={12} md={6}>
        <Card>
          <Space>
            <ClockCircleOutlined style={{ color: "#faad14" }} />
            <Text>Pending Orders</Text>
          </Space>
          <Title level={3}>{pendingOrders}</Title>
          <Text type="secondary">Awaiting processing</Text>
        </Card>
      </Col>

      <Col xs={24} sm={12} md={6}>
        <Card>
          <Space>
            <CheckCircleOutlined style={{ color: "#52c41a" }} />
            <Text>Completed</Text>
          </Space>
          <Title level={3}>{completedOrders}</Title>
          <Text type="secondary">Delivered successfully</Text>
        </Card>
      </Col>

      <Col xs={24} sm={12} md={6}>
        <Card>
          <Space>
            <DollarOutlined style={{ color: "#52c41a" }} />
            <Text>Revenue</Text>
          </Space>
          <Title level={3}>{formatVendorMoney(totalRevenue, currencyCode)}</Title>
          <Text type="secondary">From paid orders</Text>
        </Card>
      </Col>
    </Row>
  );
}

export default OrderStats;
