import React from "react";
import { Table, Tag, Typography } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";

const { Text } = Typography;

const TransactionTable = ({ transactions, loading }) => {
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
      title: "Amount",
      dataIndex: "amount",
      render: (amount, record) => (
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
          {record.type === "credit" ? "+" : ""}${Math.abs(amount).toFixed(2)}
        </Text>
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
      loading={loading} // 👈 Adds spinner overlay on table
      pagination={{ pageSize: 5 }}
    />
  );
};

export default TransactionTable;
