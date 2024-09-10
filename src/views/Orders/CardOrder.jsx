import { Card, Avatar, Typography, Row, Col, Divider } from "antd";
import { useState } from "react";

const { Text } = Typography;

const CardOrder = ({ item }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Card
      style={{
        width: 260,
        borderRadius: 12,
        margin: 0,
        padding: 0,
        gap: 8,
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        transform: hovered ? "scale(1.03)" : "scale(1)",
        boxShadow: hovered
          ? "0 6px 20px rgba(0, 0, 0, 0.1)"
          : "0 1px 3px rgba(0, 0, 0, 0.1)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Row justify="space-between">
        <img src={item.icon} alt="Order Icon" />
        <Text
          type="secondary"
          style={{ fontWeight: 600, size: 12, lineHeight: "16px" }}
        >
          {item.title}
        </Text>
      </Row>

      <Row style={{ marginTop: 16, marginBottom: 16 }} align="middle">
        <Avatar src={item.displayimg} size="large" />
        <Col style={{ marginLeft: 16 }}>
          <Text strong>{item.name}</Text>
        </Col>
      </Row>
      <Divider />

      <Row style={{ marginBottom: 16 }}>
        <Col span={12}>
          <Text type="secondary">Order ID</Text>
        </Col>
        <Col span={12} style={{ textAlign: "right" }}>
          <Text>{item.orderid}</Text>
        </Col>
      </Row>
      <Divider />

      <Row style={{ marginBottom: 16 }}>
        <Col span={12}>
          <Text type="secondary">Method</Text>
        </Col>
        <Col
          span={12}
          style={{
            textAlign: "right",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <img
            src={item.method.icon}
            alt="Payment Method"
            style={{ marginRight: 8 }}
          />
          <Text style={{ whiteSpace: "nowrap" }}>{item.method.details}</Text>
        </Col>
      </Row>
      <Divider />

      <Row style={{ marginBottom: 16 }}>
        <Col span={12}>
          <Text type="secondary">Date</Text>
        </Col>
        <Col
          span={12}
          style={{
            textAlign: "right",
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          <Text style={{ whiteSpace: "nowrap" }}>{item.date}</Text>
        </Col>
      </Row>
      <Divider />

      <Row>
        <Col span={12}>
          <Text type="secondary">Amount</Text>
        </Col>
        <Col span={12} style={{ textAlign: "right" }}>
          <Text strong>{item.Amount}</Text>
        </Col>
      </Row>
    </Card>
  );
};

export default CardOrder;
