import { Table, Tag, Typography } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import { formatVendorMoney, useVendorCurrencyCode } from "../utils/currency";

const { Text } = Typography;

const TransactionTable = ({ transactions, loading }) => {
  const currencyCode = useVendorCurrencyCode();
  const getStatusTag = (status) => {
    switch (status) {
      case "completed":
        return <Tag color="green">Completed</Tag>;
      case "pending":
        return <Tag color="orange">Pending</Tag>;
      case "failed":
        return <Tag color="red">Failed</Tag>;
      default:
        return <Tag>Unknown</Tag>;
    }
  };

  const columns = [
    {
      title: "Type",
      dataIndex: "type",
      render: (type) => {
        const icon =
          type === "credit" ? (
            <ArrowDownOutlined style={{ color: "green" }} />
          ) : (
            <ArrowUpOutlined style={{ color: "red" }} />
          );
        return (
          <span>
            {icon} <Text strong>{type}</Text>
          </span>
        );
      },
    },
    {
      title: "Description",
      dataIndex: "description",
      ellipsis: true,
    },
    {
      title: "Order Amount",
      dataIndex: "amount",
      render: (_, record) => (
        !record.orderId ? (
          <Text type="secondary">—</Text>
        ) : (
        <Text
          strong
          style={{
            color:
              record.type === "credit"
                ? "green"
                : record.type === "withdrawal" || record.type === "debit"
                ? "red"
                : "inherit",
          }}
        >
          {record.type === "credit" ? "+" : ""}
          {formatVendorMoney(Math.abs(Number(record.orderProductTotal || 0)), currencyCode)}
        </Text>
        )
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: getStatusTag,
    },
    {
      title: "Date",
      dataIndex: "date",
      render: (d) => new Date(d).toLocaleDateString(),
    },
    {
      title: "Order ID",
      dataIndex: "orderId",
      render: (id) => (id ? <Tag>{id}</Tag> : <Text type="secondary">—</Text>),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={transactions}
      rowKey="id"
      loading={loading}
      pagination={{ pageSize: 5 }}
      scroll={{ x: 600 }} // 👈 Enables horizontal scroll on small screens
      style={{
        width: "100%",
        overflowX: "auto",
      }}
    />
  );
};

export default TransactionTable;
