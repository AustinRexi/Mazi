import { Card, Space, Typography } from "antd";
import {
  ShopOutlined,
  CoffeeOutlined,
  ShoppingOutlined,
  InboxOutlined,
} from "@ant-design/icons";

const { Text } = Typography;

const StoreStats = ({ stats }) => {
  const statItems = [
    {
      label: "Restaurants",
      value: stats?.restaurants || 0,
      icon: <ShopOutlined style={{ color: "#1677ff" }} />,
    },
    {
      label: "Foods Listed",
      value: stats?.foods || 0,
      icon: <CoffeeOutlined style={{ color: "#fa8c16" }} />,
    },
    {
      label: "Groceries Listed",
      value: stats?.groceries || 0,
      icon: <ShoppingOutlined style={{ color: "#722ed1" }} />,
    },
    {
      label: "Total Products",
      value: stats?.products || 0,
      icon: <InboxOutlined style={{ color: "#16a34a" }} />,
    },
  ];

  return (
    <Card title="Store Summary">
      <Space direction="vertical" style={{ width: "100%" }}>
        {statItems.map((item, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Space>
              {item.icon}
              <Text>{item.label}</Text>
            </Space>
            <Text strong>{item.value}</Text>
          </div>
        ))}
      </Space>
    </Card>
  );
};

export default StoreStats;
