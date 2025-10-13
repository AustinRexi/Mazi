import { Card, Button, Select, Tag, Typography } from "antd";
import {
  RiseOutlined,
  FallOutlined,
  FilterOutlined,
  EyeOutlined,
} from "@ant-design/icons";

const { Option } = Select;
const { Text } = Typography;

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount);
};

const getStatusColor = (status) => {
  switch (status) {
    case "completed":
      return "success";
    case "pending":
      return "warning";
    case "failed":
      return "error";
    default:
      return "default";
  }
};

// Define transaction type configurations
const transactionTypes = {
  revenue: {
    icon: <RiseOutlined style={{ fontSize: 16, color: "#52c41a" }} />,
    backgroundColor: "#f6ffed",
  },
  expense: {
    icon: <FallOutlined style={{ fontSize: 16, color: "#f5222d" }} />,
    backgroundColor: "#fff1f0",
  },
};

// Define select options
const serviceOptions = [
  { value: "all", label: "All Services" },
  { value: "food", label: "Food Delivery" },
  { value: "courier", label: "Courier" },
  { value: "currency", label: "Currency Exchange" },
];

function RecentTransactions({
  recentTransactions,
  selectedService,
  setSelectedService,
}) {
  return (
    <Card title="Recent Transactions">
      <Text style={{ color: "#8c8c8c" }}>
        Latest financial activities across all services
      </Text>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginTop: "16px",
        }}
      >
        <Select
          value={selectedService}
          onChange={setSelectedService}
          style={{ width: 200 }}
        >
          {serviceOptions.map((option) => (
            <Option key={option.value} value={option.value}>
              {option.label}
            </Option>
          ))}
        </Select>
        <Button
          type="default"
          size="small"
          icon={<FilterOutlined style={{ marginRight: 8 }} />}
        >
          More Filters
        </Button>
      </div>
      <div style={{ marginTop: "16px" }}>
        {recentTransactions.map((transaction) => {
          const { icon, backgroundColor } =
            transactionTypes[transaction.type] || transactionTypes.expense;

          return (
            <div
              key={transaction.id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px",
                border: "1px solid #f0f0f0",
                borderRadius: "8px",
                marginBottom: "16px",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "16px" }}
              >
                <div
                  style={{
                    backgroundColor,
                    borderRadius: "50%",
                    padding: "8px",
                  }}
                >
                  {icon}
                </div>
                <div>
                  <Text strong>{transaction.vendor}</Text>
                  <Text
                    style={{ fontSize: 12, color: "#8c8c8c", display: "block" }}
                  >
                    {transaction.service} • {transaction.id}
                  </Text>
                </div>
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "16px" }}
              >
                <div style={{ textAlign: "right" }}>
                  <Text
                    strong
                    style={{
                      color: transaction.amount > 0 ? "#52c41a" : "#f5222d",
                    }}
                  >
                    {formatCurrency(Math.abs(transaction.amount))}
                  </Text>
                  <Text
                    style={{ fontSize: 12, color: "#8c8c8c", display: "block" }}
                  >
                    {transaction.date}
                  </Text>
                </div>
                <Tag color={getStatusColor(transaction.status)}>
                  {transaction.status}
                </Tag>
                <Button
                  type="text"
                  size="small"
                  icon={<EyeOutlined style={{ fontSize: 16 }} />}
                />
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

export default RecentTransactions;
