import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Button,
  Card,
  Input,
  Select,
  Space,
  Spin,
  Table,
  Tag,
  Typography,
  Upload,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
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
  const [updatingId, setUpdatingId] = useState(null);
  const [receiptFiles, setReceiptFiles] = useState({});
  const [notes, setNotes] = useState({});
  const [draftStatuses, setDraftStatuses] = useState({});

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
      const response = await axios.get(`${API_BASE_URL}/admin/vendor-withdrawals`, {
        params: { limit: 100, offset: 0 },
        headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
      });
      setRows(response.data?.data || []);
      setDraftStatuses((current) => {
        const next = { ...current };
        (response.data?.data || []).forEach((row) => {
          if (!next[row.id]) next[row.id] = row.status;
        });
        return next;
      });
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Failed to load withdrawal requests.");
    } finally {
      setLoading(false);
    }
  };

  const updateWithdrawal = async (record) => {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("status", draftStatuses[record.id] || record.status);
    if (notes[record.id]) formData.append("admin_note", notes[record.id]);
    if (receiptFiles[record.id]) formData.append("receipt", receiptFiles[record.id]);

    try {
      setUpdatingId(record.id);
      await axios.post(`${API_BASE_URL}/admin/vendor-withdrawals/${record.id}`, formData, {
        headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
      });
      message.success("Withdrawal updated.");
      await fetchRows();
    } catch (requestError) {
      message.error(requestError.response?.data?.message || "Failed to update withdrawal.");
    } finally {
      setUpdatingId(null);
    }
  };

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

  useEffect(() => { fetchRows(); }, []);

  const columns = useMemo(
    () => [
      {
        title: "Vendor",
        key: "vendor",
        render: (_, record) => {
          const vendor = record.vendor || {};
          return `${vendor.firstName || vendor.firstname || ""} ${vendor.lastName || vendor.lastname || ""}`.trim() || vendor.email || `Vendor #${record.vendor_id}`;
        },
      },
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
      {
        title: "Receipt / Update",
        key: "actions",
        render: (_, record) => (
          <Space direction="vertical" size="small">
            <Select
              value={draftStatuses[record.id] || record.status}
              style={{ width: 140 }}
              loading={updatingId === record.id}
              onChange={(value) => setDraftStatuses((current) => ({ ...current, [record.id]: value }))}
              options={["pending", "processing", "completed", "rejected", "failed"].map((value) => ({ value, label: value }))}
            />
            <Input
              size="small"
              placeholder="Admin note (optional)"
              value={notes[record.id] || ""}
              onChange={(event) => setNotes((current) => ({ ...current, [record.id]: event.target.value }))}
            />
            <Upload
              maxCount={1}
              accept="image/png,image/jpeg,application/pdf"
              beforeUpload={(file) => {
                setReceiptFiles((current) => ({ ...current, [record.id]: file }));
                return false;
              }}
              showUploadList={{ showRemoveIcon: true }}
            >
              <Button size="small" icon={<UploadOutlined />}>Choose receipt</Button>
            </Upload>
            {record.receipt_url ? (
              /\.(png|jpe?g)(?:\?|$)/i.test(record.receipt_url) ? (
                <a href={record.receipt_url} target="_blank" rel="noreferrer">
                  <img
                    src={record.receipt_url}
                    alt="Payment receipt"
                    style={{ width: 96, maxHeight: 72, objectFit: "cover", borderRadius: 4, border: "1px solid #d9d9d9" }}
                  />
                </a>
              ) : (
                <a href={record.receipt_url} target="_blank" rel="noreferrer">View receipt PDF</a>
              )
            ) : null}
            <Button size="small" type="primary" loading={updatingId === record.id} onClick={() => updateWithdrawal(record)}>Save</Button>
          </Space>
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
