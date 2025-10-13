import { Button, Select, Space, Typography } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

const { Option } = Select;
const { Title, Text } = Typography;

function Header({ selectedPeriod, setSelectedPeriod }) {
  return (
    <Space
      direction="horizontal"
      style={{ width: "100%", justifyContent: "space-between" }}
    >
      <div>
        <Title level={2} style={{ color: "#1f2a44", margin: 0 }}>
          Super Admin Wallet
        </Title>
        <Text style={{ color: "#6b7280", display: "block", marginTop: 4 }}>
          Comprehensive financial oversight and management
        </Text>
      </div>
      <Space size="middle">
        <Select
          value={selectedPeriod}
          onChange={setSelectedPeriod}
          style={{ width: 120 }}
        >
          <Option value="7days">7 Days</Option>
          <Option value="30days">30 Days</Option>
          <Option value="90days">90 Days</Option>
          <Option value="1year">1 Year</Option>
        </Select>
        <Button type="default" size="small">
          <DownloadOutlined style={{ marginRight: 8 }} />
          Export
        </Button>
      </Space>
    </Space>
  );
}

export default Header;
