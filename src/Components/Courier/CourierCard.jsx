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
        width: "200px",
        height: "48px",
        padding: "0px 12px",
        opacity: "0.9",
      }}
      bodyStyle={{ padding: "0px" }} // Remove extra padding
    >
      <Avatar
        src={item.courier.icon}
        style={{
          backgroundColor: "#13c2c2",
          dropshadow: "16px ,16px",
        }}
        size="large"
        icon={!item.courier.icon && <UserOutlined />}
      />
      <span
        style={{
          fontWeight: "500",
          fontSize: "16px",
          marginLeft: "20px",
          whiteSpace: "nowrap",
        }}
      >
        {item.courier.title}
      </span>
    </Card>
  );
};

export default CourierCard;
