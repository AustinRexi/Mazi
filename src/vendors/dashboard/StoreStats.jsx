import { Card, Space, Typography } from "antd";
import {
  StarFilled,
  UserOutlined,
  EyeOutlined,
  InboxOutlined,
} from "@ant-design/icons";

const { Text } = Typography;

const StoreStats = () => (
  <Card title="Store Statistics">
    <Space direction="vertical" style={{ width: "100%" }}>
      <div className="flex-between">
        <Space>
          <StarFilled style={{ color: "#fadb14" }} />
          <Text>Average Rating</Text>
        </Space>
        <Text strong>4.8/5.0</Text>
      </div>
      <div className="flex-between">
        <Space>
          <UserOutlined style={{ color: "#1677ff" }} />
          <Text>Total Reviews</Text>
        </Space>
        <Text strong>247</Text>
      </div>
      <div className="flex-between">
        <Space>
          <EyeOutlined style={{ color: "#722ed1" }} />
          <Text>Store Views</Text>
        </Space>
        <Text strong>1,542</Text>
      </div>
      <div className="flex-between">
        <Space>
          <InboxOutlined style={{ color: "#16a34a" }} />
          <Text>Total Products</Text>
        </Space>
        <Text strong>28</Text>
      </div>
    </Space>
  </Card>
);

export default StoreStats;
