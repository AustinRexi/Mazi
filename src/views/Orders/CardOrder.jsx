import { Card, Avatar, Typography, Row, Col, Divider } from "antd";
import { useState } from "react";

const { Text } = Typography;

const CardOrder = ({ item, onClick, isClickable = false, borderColor = null }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Card
      style={{
        width: 256,
        borderRadius: 12,
        marginTop: 10,
        margin: 0,
        padding: 0,
        gap: 8,
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        transform: hovered ? "scale(1.03)" : "scale(1)",
        boxShadow: hovered
          ? "0 6px 20px rgba(0, 0, 0, 0.1)"
          : "0 1px 3px rgba(0, 0, 0, 0.1)",
        cursor: isClickable ? "pointer" : "default",
        border: borderColor ? `1.5px solid ${borderColor}` : undefined,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={isClickable ? onClick : undefined}
    >
      <Row justify="space-between" align="middle">
        <img src={item.icon} alt="Order Icon" />
        <Text
          type="secondary"
          style={{ fontWeight: 600, fontSize: "12px", lineHeight: "16px" }}
        >
          {item.title}
        </Text>
      </Row>

      <Row style={{ marginTop: 16, marginBottom: 16 }} align="middle">
        <Avatar src={item.displayimg} size="large" />
        <Col style={{ marginLeft: 16 }}>
          <Text
            style={{
              fontWeight: 500,
              fontSize: "16px",
              lineHeight: "24px",
            }}
          >
            {item.name}
          </Text>
        </Col>
      </Row>
      <Divider />

      <Row style={{ marginBottom: 16 }}>
        <Col span={12}>
          <Text
            type="secondary"
            style={{
              fontWeight: 500,
              fontSize: "16px",
              lineHeight: "24px",
              color: " #545E5E",
            }}
          >
            Order ID
          </Text>
        </Col>
        <Col span={12} style={{ textAlign: "right" }}>
          <Text
            style={{
              fontWeight: 500,
              fontSize: "16px",
              lineHeight: "24px",
              color: "#545E5E",
            }}
          >
            {item.orderid}
          </Text>
        </Col>
      </Row>
      <Divider />

      <Row style={{ marginBottom: 16 }}>
        <Col span={12}>
          <Text
            type="secondary"
            style={{
              fontWeight: 500,
              fontSize: "16px",
              lineHeight: "24px",
              color: " #545E5E",
            }}
          >
            Method
          </Text>
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
          <Text
            type="secondary"
            style={{
              fontWeight: 500,
              fontSize: "16px",
              lineHeight: "24px",
              color: " #545E5E",
            }}
          >
            Date
          </Text>
        </Col>
        <Col
          span={12}
          style={{
            textAlign: "right",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Text
            style={{
              fontWeight: 500,
              fontSize: "12px",
              lineHeight: "24px",
              color: " #545E5E",
              maxWidth: "100%",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {item.date}
          </Text>
        </Col>
      </Row>
      <Divider />

      <Row>
        <Col span={12}>
          <Text
            type="secondary"
            style={{
              fontWeight: 500,
              fontSize: "16px",
              lineHeight: "24px",
              color: " #545E5E",
            }}
          >
            Amount
          </Text>
        </Col>
        <Col span={12} style={{ textAlign: "right" }}>
          <Text
            style={{
              fontWeight: 500,
              fontSize: "16px",
              lineHeight: "24px",
              color: " #545E5E",
            }}
          >
            {item.Amount}
          </Text>
        </Col>
      </Row>
    </Card>
  );
};

export default CardOrder;
