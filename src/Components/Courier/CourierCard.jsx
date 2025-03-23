import { Card } from "antd";
import { UserOutlined } from "@ant-design/icons";

const CourierCard = ({ item }) => {
  return (
    <Card
      style={{
        borderRadius: "8px 0px 0px 0px",
        backgroundColor: "#f5f5f5",
        display: "flex",
        alignItems: "center",
        width: window.innerWidth < 780 ? "100%" : "200px",
        height: "48px",
        padding: "0px 14px",
        gap: 18,
      }}
      bodyStyle={{ padding: "0px" }}
    >
      <img
        src={item.icon}
        alt="icon"
        icon={!item.icon && <UserOutlined />}
        style={{
          width: "36px",
        }}
      />
      <span
        style={{
          fontWeight: "500",
          fontSize: "14px",
          lineHeight: "24px",
          marginLeft: "20px",
          whiteSpace: "nowrap",
          color: item.color,
        }}
      >
        {item.title}
      </span>
      <span
        style={{
          fontWeight: "500",
          fontSize: "14px",
          lineHeight: "24px",
          marginLeft: "20px",
          whiteSpace: "nowrap",
        }}
      >
        {item.amount}
      </span>
    </Card>
  );
};

export default CourierCard;
