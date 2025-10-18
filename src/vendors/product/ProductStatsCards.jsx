import React from "react";
import { Card, Col, Row, Typography, Space } from "antd";
import {
  AppstoreOutlined,
  DollarOutlined,
  WarningOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const ProductStatsCards = ({ products }) => {
  const totalValue = products.reduce((acc, p) => acc + p.price * p.stock, 0);
  const lowStockCount = products.filter(
    (p) => p.stock < 20 && p.stock > 0
  ).length;
  const outOfStockCount = products.filter((p) => p.stock === 0).length;

  const stats = [
    {
      icon: <AppstoreOutlined style={{ color: "#1890ff" }} />,
      title: "Total Products",
      value: products.length,
      subtitle: "Active products",
    },
    {
      icon: <DollarOutlined style={{ color: "#52c41a" }} />,
      title: "Total Value",
      value: `$${totalValue.toLocaleString()}`,
      subtitle: "Inventory value",
    },
    {
      icon: <WarningOutlined style={{ color: "#faad14" }} />,
      title: "Low Stock",
      value: lowStockCount,
      subtitle: "Need restock",
    },
    {
      icon: <ExclamationCircleOutlined style={{ color: "#ff4d4f" }} />,
      title: "Out of Stock",
      value: outOfStockCount,
      subtitle: "Unavailable",
    },
  ];

  return (
    <Row gutter={[16, 16]}>
      {stats.map((s) => (
        <Col xs={24} sm={12} md={6} key={s.title}>
          <Card>
            <Space direction="vertical">
              <Space align="center">
                {s.icon}
                <Text>{s.title}</Text>
              </Space>
              <Title level={3}>{s.value}</Title>
              <Text type="secondary">{s.subtitle}</Text>
            </Space>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default ProductStatsCards;
