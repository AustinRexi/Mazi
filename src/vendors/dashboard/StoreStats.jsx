import { Card, Space, Typography } from "antd";
import {
  StarFilled,
  UserOutlined,
  EyeOutlined,
  InboxOutlined,
} from "@ant-design/icons";

const { Text } = Typography;

// ✅ You can pass stats as props to make it reusable and dynamic
const StoreStats = ({ stats }) => {
  const statItems = [
    {
      label: "Average Rating",
      value: stats?.rating || "0.0/5.0",
      icon: <StarFilled style={{ color: "#fadb14" }} />,
    },
    {
      label: "Total Reviews",
      value: stats?.reviews || "10",
      icon: <UserOutlined />,
    },
    {
      label: "Store Views",
      value: stats?.views || "120",
      icon: <EyeOutlined />,
    },
    {
      label: "Total Products",
      value: stats?.products || "150",
      icon: <InboxOutlined style={{ color: "#16a34a" }} />,
    },
  ];

  return (
    <Card title="Store Statistics">
      <Space direction="vertical" style={{ width: "100%" }}>
        {statItems.map((item, index) => (
          <div className="flex-between" key={index}>
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
