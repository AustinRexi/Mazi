import {
  Card,
  Avatar,
  Typography,
  Row,
  Col,
  Divider,
  Menu,
  Dropdown,
} from "antd";
import { useState } from "react";
import options from "../../Assets/Couriericons/options.svg";

const { Text } = Typography;

const CardOrder = ({ item, isActiveTab, onViewDetails }) => {
  const [hovered, setHovered] = useState(false);

  const [isOptionsVisible, setIsOptionsVisible] = useState(false);
  const handleMenuClick = ({ key }) => {
    if (key === "1") {
      onViewDetails(item);
    }
  };
  const menu = (
    <Menu
      onClick={handleMenuClick}
      items={
        isActiveTab
          ? [
              { key: "1", label: "View" },
              { key: "2", label: "Cancel" },
              { key: "3", label: "Refund" },
            ]
          : [
              { key: "1", label: "View" },
              { key: "2", label: "Fulfil" },
              { key: "3", label: "Cancel" },
              { key: "4", label: "Refund" },
            ]
      }
    />
  );

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
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setIsOptionsVisible(false); // Hide options when not hovered
      }}
    >
      <Row justify="space-between" align="middle">
        <img src={item.icon} alt="Order Icon" />
        <Text
          type="secondary"
          style={{ fontWeight: 600, fontSize: "12px", lineHeight: "16px" }}
        >
          {item.title}
        </Text>

        {hovered && (
          <Dropdown
            overlay={menu}
            trigger={["click"]}
            placement="bottomRight"
            onVisibleChange={setIsOptionsVisible}
          >
            <img
              src={options}
              alt="options"
              style={{
                cursor: "pointer",
              }}
              onClick={() => setIsOptionsVisible(!isOptionsVisible)}
            />
          </Dropdown>
        )}
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
            flexWrap: "wrap",
          }}
        >
          <Text
            style={{
              whiteSpace: "nowrap",
              fontWeight: 500,
              fontSize: "12px",
              lineHeight: "24px",
              color: " #545E5E",
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
