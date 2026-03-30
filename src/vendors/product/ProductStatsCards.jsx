import React from "react";
import {
  formatVendorMoney,
  useVendorCurrencyCode,
} from "../utils/currency";
import { Card, Col, Row, Typography, Space, Button } from "antd";
import {
  AppstoreOutlined,
  DollarOutlined,
  WarningOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const ProductStatsCards = ({ products, onOpenLowStock }) => {
  const currencyCode = useVendorCurrencyCode();
  const totalValue = products.reduce((acc, p) => {
    if (p.resourceType === "grocery") {
      return acc + p.price * (p.stock || 0);
    }

    return acc + p.price;
  }, 0);

  const lowStockProducts = products.filter(
    (p) => p.resourceType === "grocery" && p.stock < 20 && p.stock > 0
  );
  const lowStockCount = lowStockProducts.length;

  const outOfStockCount = products.filter((p) => {
    if (p.resourceType === "food") {
      return p.status === "out-of-stock";
    }

    return p.stock === 0;
  }).length;

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={12} md={6}>
        <Card>
          <Space direction="vertical">
            <Space align="center">
              <AppstoreOutlined style={{ color: "#1890ff" }} />
              <Text>Total Products</Text>
            </Space>
            <Title level={3}>{products.length}</Title>
            <Text type="secondary">Foods and groceries</Text>
          </Space>
        </Card>
      </Col>
      <Col xs={24} sm={12} md={6}>
        <Card>
          <Space direction="vertical">
            <Space align="center">
              <DollarOutlined style={{ color: "#52c41a" }} />
              <Text>Total Value</Text>
            </Space>
            <Title level={3}>{formatVendorMoney(totalValue, currencyCode)}</Title>
            <Text type="secondary">Inventory value</Text>
          </Space>
        </Card>
      </Col>
      <Col xs={24} sm={12} md={6}>
        <Card>
          <Space direction="vertical">
            <Space align="center">
              <ExclamationCircleOutlined style={{ color: "#ff4d4f" }} />
              <Text>Out of Stock</Text>
            </Space>
            <Title level={3}>{outOfStockCount}</Title>
            <Text type="secondary">Unavailable</Text>
          </Space>
        </Card>
      </Col>
      <Col xs={24} md={6}>
        <Card
          title={
            <Space>
              <WarningOutlined style={{ color: "#faad14" }} />
              <span>Low Stock ({lowStockCount})</span>
            </Space>
          }
        >
          <Space direction="vertical">
            <Text type="secondary">Need restock</Text>
            <Button type="primary" onClick={() => onOpenLowStock?.(lowStockProducts)}>
              View Low Stock
            </Button>
          </Space>
        </Card>
      </Col>
    </Row>
  );
};

export default ProductStatsCards;
