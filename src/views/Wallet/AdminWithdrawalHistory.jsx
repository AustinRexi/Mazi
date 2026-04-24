import { useEffect, useMemo, useState } from "react";
import { Alert, Button, Card, Space, Spin, Table, Tag, Typography } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api";

const formatAmount = (amount) => {
  const value = Number(amount || 0);
  return `NGN ${value.toLocaleString("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

const statusColor = (value) => {
  const status = String(value || "pending").toLowerCase();
  if (["success", "successful"].includes(status)) {
    return "green";
  }
  if (["failed", "reversed"].includes(status)) {
    return "red";
  }
  return "blue";
};

const AdminWithdrawalHistory = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [rows, setRows] = useState([]);

  const escapeCsv = (value) => {
    const text = String(value ?? "");
    if (text.includes(",") || text.includes("\"") || text.includes("\n")) {
      return `"${text.replace(/"/g, "\"\"")}"`;
    }
    return text;
  };

  const downloadCsv = () => {
    const headers = [
      "Date",
      "Amount",
      "Account Name",
      "Account Number",
      "Bank Code",
      "Reference",
      "Status",
    ];

    const lines = rows.map((row) =>
      [
        row.created_at ? new Date(row.created_at).toISOString() : "",
        Number(row.amount || 0).toFixed(2),
        row.account_name || "",
        row.account_number || "",
        row.bank_code || "",
        row.reference || "",
        row.status || "",
      ]
        .map(escapeCsv)
        .join(",")
    );

    const csv = [headers.join(","), ...lines].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      `admin-withdrawals-${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    const fetchRows = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You need to log in as an admin to view withdrawal history.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");
        const response = await axios.get(
          `${API_BASE_URL}/admin/wallet/withdrawals`,
          {
            params: { limit: 100, offset: 0 },
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );

        setRows(response.data?.data || []);
      } catch (requestError) {
        setError(
          requestError.response?.data?.message ||
            "Failed to load withdrawal history."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRows();
  }, []);

  const columns = useMemo(
    () => [
      {
        title: "Date",
        dataIndex: "created_at",
        key: "created_at",
        render: (value) =>
          value ? new Date(value).toLocaleString("en-NG") : "-",
      },
      {
        title: "Amount",
        dataIndex: "amount",
        key: "amount",
        render: (value) => formatAmount(value),
      },
      {
        title: "Account",
        key: "account",
        render: (_, record) =>
          `${record.account_name || "-"} (${record.account_number || "-"})`,
      },
      {
        title: "Reference",
        dataIndex: "reference",
        key: "reference",
        render: (value) => value || "-",
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: (value) => (
          <Tag color={statusColor(value)}>{String(value || "pending")}</Tag>
        ),
      },
    ],
    []
  );

  return (
    <div style={{ padding: 24 }}>
      <Space
        style={{ width: "100%", justifyContent: "space-between", marginBottom: 16 }}
      >
        <Title level={4} style={{ margin: 0 }}>
          Admin Withdrawal History
        </Title>
        <Space>
          <Button onClick={downloadCsv} disabled={!rows.length}>
            Export CSV
          </Button>
          <Button onClick={() => navigate("/Wallet")}>Back to Wallet</Button>
        </Space>
      </Space>

      <Spin spinning={loading}>
        {error ? (
          <Alert type="error" showIcon message={error} style={{ marginBottom: 16 }} />
        ) : null}

        <Card>
          <Table
            rowKey={(record) => String(record.id)}
            columns={columns}
            dataSource={rows}
            pagination={{ pageSize: 10 }}
          />
        </Card>
      </Spin>
    </div>
  );
};

export default AdminWithdrawalHistory;
