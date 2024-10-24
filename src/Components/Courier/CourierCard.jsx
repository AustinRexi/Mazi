import { Card, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

const CourierCard = ({ item }) => {
  return (
    <Card
      style={{
        borderRadius: "8px 0px 0px 0px",
        backgroundColor: "#f5f5f5",
        display: "flex",
        alignItems: "center",
        width: "100%",
        height: "48px",
        padding: "0px 12px",
        opacity: "0.9",
      }}
      bodyStyle={{ padding: "0px" }}
    >
      <Avatar
        src={item.icon}
        style={{
          backgroundColor: "#13c2c2",
          dropshadow: "16px ,16px",
        }}
        size="medium"
        icon={!item.icon && <UserOutlined />}
      />
      <span
        style={{
          fontWeight: "500",
          size: "16px",
          lineHeight: 24,
          marginLeft: "20px",
          whiteSpace: "nowrap",
          color: item.color,
        }}
      >
        {item.title}
      </span>
      <span
        style={{
          whiteSpace: "nowrap",
          marginLeft: "14px",
          fontWeight: 600,
          size: 16,
          lineHeight: 24,
        }}
      >
        {item.amount}
      </span>
    </Card>
  );
};

export default CourierCard;
