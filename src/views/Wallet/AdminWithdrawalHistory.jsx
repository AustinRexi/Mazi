import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Descriptions,
  Drawer,
  Input,
  Modal,
  Row,
  Select,
  Space,
  Spin,
  Statistic,
  Table,
  Tag,
  Typography,
  Upload,
  message,
} from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  EyeOutlined,
  ReloadOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import axios from "axios";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const { Paragraph, Text, Title } = Typography;

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api";

const normalizeStatus = (value) =>
  String(value || "pending").trim().toLowerCase();

const formatAmount = (amount, currency = "NGN") => {
  const value = Number(amount || 0);
  const currencyCode = String(currency || "NGN").toUpperCase();

  try {
    return new Intl.NumberFormat("en", {
      style: "currency",
      currency: currencyCode,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  } catch {
    return `${currencyCode} ${value.toLocaleString("en", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }
};

const formatOptionalAmount = (amount, currency) =>
  amount === null || amount === undefined
    ? "Not supplied"
    : formatAmount(amount, currency);

const statusColor = (value) => {
  const status = normalizeStatus(value);
  if (["completed", "success", "successful"].includes(status)) return "green";
  if (["failed", "reversed", "rejected"].includes(status)) return "red";
  if (status === "processing") return "blue";
  if (status === "under_review") return "gold";
  return "orange";
};

const formatStatus = (value) =>
  normalizeStatus(value)
    .replace(/_/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());

const maskAccountNumber = (value) => {
  const text = String(value || "").trim();
  if (!text) return "N/A";
  if (text.length <= 4) return text;
  return `${"•".repeat(Math.max(text.length - 4, 4))}${text.slice(-4)}`;
};

const getVendorName = (record = {}) => {
  const vendor = record.vendor || {};
  const name = `${vendor.firstName || vendor.firstname || ""} ${
    vendor.lastName || vendor.lastname || ""
  }`.trim();
  return name || vendor.business_name || vendor.email || `Vendor #${record.vendor_id || "N/A"}`;
};

const getCurrency = (record = {}) =>
  record.currency ||
  record.currency_code ||
  record.restaurant?.restaurant_currency ||
  record.vendor?.currency ||
  "NGN";

const firstFiniteNumber = (...values) => {
  const value = values.find(
    (entry) => entry !== null && entry !== undefined && Number.isFinite(Number(entry))
  );
  return value === undefined ? null : Number(value);
};

const getReviewSnapshot = (record = {}) => {
  const verification = record.verification || record.review || {};
  const reconciliation =
    verification.reconciliation || record.reconciliation || record.wallet_snapshot || {};
  return {
    verification,
    reconciliation: {
      balanceBefore: firstFiniteNumber(
        reconciliation.before,
        reconciliation.balance_before,
        reconciliation.available_balance,
        record.wallet_balance_before,
        record.balance_before
      ),
      reserved: firstFiniteNumber(
        reconciliation.reserved,
        reconciliation.reserved_amount,
        reconciliation.pending_withdrawals,
        record.amount,
        record.reserved_amount
      ),
      remaining: firstFiniteNumber(
        reconciliation.after,
        reconciliation.remaining_balance,
        reconciliation.balance_after,
        record.wallet_balance_after,
        record.balance_after
      ),
    },
  };
};

const getVerificationChecks = (record = {}) => {
  const { verification, reconciliation } = getReviewSnapshot(record);
  const vendor = record.vendor || {};
  const amount = Number(record.amount || 0);
  const vendorStatus = normalizeStatus(vendor.status || record.vendor_status);
  const bankDetailsComplete =
    verification.bank_details_complete ??
    Boolean(
      record.bank_name &&
        record.account_number &&
        record.account_name
    );
  const hasSufficientBalance =
    verification.sufficient_balance ??
    (reconciliation.balanceBefore === null
      ? null
      : reconciliation.balanceBefore >= amount);

  return [
    {
      key: "vendor",
      label: "Vendor account is approved and active",
      state:
        verification.vendor_approved ??
        (["approved", "active", "verified"].includes(vendorStatus)
          ? true
          : vendor.status || record.vendor_status
            ? false
            : null),
    },
    {
      key: "account",
      label: "Bank details are complete for manual verification",
      state: bankDetailsComplete,
    },
    {
      key: "balance",
      label: "Withdrawable balance covers this request",
      state: hasSufficientBalance,
    },
    {
      key: "duplicate",
      label: "No duplicate pending withdrawal was detected",
      state:
        verification.no_duplicate_request ??
        (verification.duplicate_request === undefined
          ? null
          : !verification.duplicate_request),
    },
    {
      key: "bank-change",
      label: "Bank details were not changed recently",
      state:
        verification.bank_details_stable ??
        (verification.bank_details_recently_changed === undefined
          ? null
          : !verification.bank_details_recently_changed),
    },
    {
      key: "pin",
      label: "Transaction PIN was verified at submission",
      state: verification.transaction_pin_verified ?? record.transaction_pin_verified ?? null,
    },
  ];
};

const VerificationCheck = ({ check }) => {
  if (check.state === true) {
    return (
      <Text style={{ color: "#389e0d" }}>
        <CheckCircleOutlined /> {check.label}
      </Text>
    );
  }

  if (check.state === false) {
    return (
      <Text type="danger">
        <CloseCircleOutlined /> {check.label}
      </Text>
    );
  }

  return (
    <Text type="secondary">
      <ExclamationCircleOutlined /> {check.label} — not supplied by API
    </Text>
  );
};

VerificationCheck.propTypes = {
  check: PropTypes.shape({
    label: PropTypes.string.isRequired,
    state: PropTypes.bool,
  }).isRequired,
};

const AdminWithdrawalHistory = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [rows, setRows] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchText, setSearchText] = useState("");
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);
  const [adminNote, setAdminNote] = useState("");
  const [receiptFile, setReceiptFile] = useState(null);
  const [manualPaymentReference, setManualPaymentReference] = useState("");

  const fetchRows = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("You need to log in as an admin to view withdrawal requests.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");
      const config = {
        params: { limit: 100, offset: 0 },
        headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
      };
      const [vendorResponse, courierResponse] = await Promise.all([
        axios.get(`${API_BASE_URL}/admin/vendor-withdrawals`, config),
        axios.get(`${API_BASE_URL}/admin/courier-withdrawals`, config),
      ]);
      const vendorRows = Array.isArray(vendorResponse.data?.data)
        ? vendorResponse.data.data.map((row) => ({ ...row, actor_type: "vendor" }))
        : [];
      const courierRows = Array.isArray(courierResponse.data?.data)
        ? courierResponse.data.data
        : [];
      const nextRows = [...vendorRows, ...courierRows].sort(
        (a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0)
      );
      setRows(nextRows);
      setSelectedRecord((current) =>
        current
          ? nextRows.find(
              (row) =>
                String(row.id) === String(current.id) &&
                row.actor_type === current.actor_type
            ) || current
          : null
      );
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Failed to load withdrawal requests.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRows();
  }, []);

  const filteredRows = useMemo(() => {
    const query = searchText.trim().toLowerCase();
    return rows.filter((row) => {
      const matchesStatus =
        statusFilter === "all" || normalizeStatus(row.status) === statusFilter;
      const matchesSearch =
        !query ||
        [
          getVendorName(row),
          row.reference,
          row.account_name,
          row.bank_name,
          row.vendor?.email,
        ].some((value) => String(value || "").toLowerCase().includes(query));
      return matchesStatus && matchesSearch;
    });
  }, [rows, searchText, statusFilter]);

  const summary = useMemo(
    () => ({
      pending: rows.filter((row) =>
        ["pending", "under_review"].includes(normalizeStatus(row.status))
      ).length,
      processing: rows.filter((row) => normalizeStatus(row.status) === "processing").length,
      completed: rows.filter((row) =>
        ["completed", "success", "successful"].includes(normalizeStatus(row.status))
      ).length,
    }),
    [rows]
  );

  const openReview = (record) => {
    setSelectedRecord(record);
    setAdminNote(record.admin_note || "");
    setReceiptFile(null);
    setManualPaymentReference(record.manual_payment_reference || "");
  };

  const updateWithdrawal = async (record, status) => {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("status", status);
    if (adminNote.trim()) formData.append("admin_note", adminNote.trim());
    if (receiptFile) formData.append("receipt", receiptFile);
    if (manualPaymentReference.trim()) {
      formData.append("manual_payment_reference", manualPaymentReference.trim());
    }

    try {
      setUpdatingId(record.id);
      const resource = record.actor_type === "courier"
        ? "courier-withdrawals"
        : "vendor-withdrawals";
      await axios.post(`${API_BASE_URL}/admin/${resource}/${record.id}`, formData, {
        headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
      });
      message.success(
        status === "processing"
          ? "Withdrawal verified for manual payment."
          : status === "completed"
            ? "Manual payment recorded and withdrawal completed."
            : "Withdrawal rejected."
      );
      setSelectedRecord(null);
      setAdminNote("");
      setReceiptFile(null);
      setManualPaymentReference("");
      await fetchRows();
    } catch (requestError) {
      message.error(requestError.response?.data?.message || "Failed to update withdrawal.");
    } finally {
      setUpdatingId(null);
    }
  };

  const confirmAction = (status) => {
    if (!selectedRecord) return;
    if (status === "rejected" && !adminNote.trim()) {
      message.error("Add a reason before rejecting this withdrawal.");
      return;
    }

    if (status === "completed" && !manualPaymentReference.trim()) {
      message.error("Enter the bank transfer reference before completing this withdrawal.");
      return;
    }

    if (
      status === "completed" &&
      !receiptFile
    ) {
      message.error("Attach the manual payment receipt before completing this withdrawal.");
      return;
    }

    const failedChecks = getVerificationChecks(selectedRecord).filter(
      (check) => check.state === false
    );
    const isApproval = status === "processing";
    const isCompletion = status === "completed";

    Modal.confirm({
      title: isApproval
        ? "Verify withdrawal for manual payment?"
        : isCompletion
          ? "Confirm that the manual payment was sent?"
          : "Reject withdrawal request?",
      icon: isApproval || isCompletion ? <ExclamationCircleOutlined /> : <CloseCircleOutlined />,
      content: isApproval
        ? failedChecks.length
          ? `${failedChecks.length} verification check(s) failed. Review them before continuing.`
          : "This marks the details as verified. Send the money manually before completing the request."
        : isCompletion
          ? "The request will be completed using the payment reference and receipt you supplied."
          : "The requester will see this as rejected and the reserved balance will be released.",
      okText: isApproval
        ? "Mark Verified"
        : isCompletion
          ? "Confirm Manual Payment"
          : "Reject request",
      okType: isApproval || isCompletion ? "primary" : "danger",
      onOk: () => updateWithdrawal(selectedRecord, status),
    });
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
      "Vendor",
      "Amount",
      "Currency",
      "Account Name",
      "Masked Account Number",
      "Bank",
      "Request Reference",
      "Manual Payment Reference",
      "Status",
    ];
    const lines = filteredRows.map((row) =>
      [
        row.created_at ? new Date(row.created_at).toISOString() : "",
        getVendorName(row),
        Number(row.amount || 0).toFixed(2),
        getCurrency(row),
        row.account_name || "",
        maskAccountNumber(row.account_number),
        row.bank_name || row.bank_code || "",
        row.reference || "",
        row.manual_payment_reference || "",
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

  const columns = [
    {
      title: "Requester",
      key: "vendor",
      render: (_, record) => (
        <Space direction="vertical" size={0}>
          <Text strong>{getVendorName(record)}</Text>
          <Text type="secondary">
            {formatStatus(record.actor_type || "vendor")} · {record.vendor?.email || `ID: ${record.vendor_id || "N/A"}`}
          </Text>
        </Space>
      ),
    },
    {
      title: "Requested",
      dataIndex: "created_at",
      key: "created_at",
      render: (value) => (value ? new Date(value).toLocaleString() : "-"),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (value, record) => <Text strong>{formatAmount(value, getCurrency(record))}</Text>,
    },
    {
      title: "Destination",
      key: "account",
      render: (_, record) => (
        <Space direction="vertical" size={0}>
          <Text>{record.account_name || "Unresolved account"}</Text>
          <Text type="secondary">
            {record.bank_name || record.bank_code || "Bank unavailable"} · {maskAccountNumber(record.account_number)}
          </Text>
        </Space>
      ),
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
      render: (value) => <Tag color={statusColor(value)}>{formatStatus(value)}</Tag>,
    },
    {
      title: "Action",
      key: "actions",
      fixed: "right",
      render: (_, record) => (
        <Button icon={<EyeOutlined />} onClick={() => openReview(record)}>
          Review
        </Button>
      ),
    },
  ];

  const selectedStatus = normalizeStatus(selectedRecord?.status);
  const canStartReview =
    selectedRecord &&
    ["pending", "under_review"].includes(selectedStatus);
  const canRecordPayment = selectedRecord && selectedStatus === "processing";
  const canReject = canStartReview || canRecordPayment;
  const selectedSnapshot = selectedRecord ? getReviewSnapshot(selectedRecord) : null;
  const selectedChecks = selectedRecord ? getVerificationChecks(selectedRecord) : [];
  const selectedCurrency = selectedRecord ? getCurrency(selectedRecord) : "NGN";
  const selectedVendor = selectedRecord?.vendor || {};
  const selectedRestaurantId =
    selectedRecord?.restaurant_id || selectedRecord?.restaurant?.id || null;
  const hasFailedVerification = selectedChecks.some(
    (check) => check.state === false
  );

  return (
    <div style={{ padding: 24 }}>
      <Space
        wrap
        style={{ width: "100%", justifyContent: "space-between", marginBottom: 16 }}
      >
        <div>
          <Title level={3} style={{ margin: 0 }}>Vendor & Courier Withdrawals</Title>
          <Text type="secondary">Review identity, wallet coverage, and payout destination before manual payment.</Text>
        </div>
        <Space wrap>
          <Button icon={<ReloadOutlined />} onClick={fetchRows} loading={loading}>Refresh</Button>
          <Button onClick={downloadCsv} disabled={!filteredRows.length}>Export CSV</Button>
          <Button onClick={() => navigate("/Wallet")}>Back to Wallet</Button>
        </Space>
      </Space>

      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col xs={24} sm={8}><Card><Statistic title="Awaiting Review" value={summary.pending} /></Card></Col>
        <Col xs={24} sm={8}><Card><Statistic title="Processing" value={summary.processing} /></Card></Col>
        <Col xs={24} sm={8}><Card><Statistic title="Completed" value={summary.completed} /></Card></Col>
      </Row>

      <Card>
        <Space wrap style={{ marginBottom: 16 }}>
          <Input.Search
            allowClear
            placeholder="Search vendor, reference, or account name"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            style={{ width: 340, maxWidth: "100%" }}
          />
          <Select
            value={statusFilter}
            onChange={setStatusFilter}
            style={{ width: 180 }}
            options={[
              { value: "all", label: "All statuses" },
              { value: "pending", label: "Pending" },
              { value: "under_review", label: "Under review" },
              { value: "processing", label: "Processing" },
              { value: "completed", label: "Completed" },
              { value: "rejected", label: "Rejected" },
              { value: "failed", label: "Failed" },
              { value: "reversed", label: "Reversed" },
            ]}
          />
        </Space>

        {error ? <Alert type="error" showIcon message={error} style={{ marginBottom: 16 }} /> : null}
        <Spin spinning={loading}>
          <Table
            rowKey={(record) => `${record.actor_type || "vendor"}-${record.id}`}
            columns={columns}
            dataSource={filteredRows}
            pagination={{ pageSize: 10, showSizeChanger: true }}
            scroll={{ x: 1100 }}
          />
        </Spin>
      </Card>

      <Drawer
        title="Withdrawal Review"
        width={720}
        open={Boolean(selectedRecord)}
        onClose={() => setSelectedRecord(null)}
        destroyOnClose
        extra={selectedRecord ? <Tag color={statusColor(selectedStatus)}>{formatStatus(selectedStatus)}</Tag> : null}
      >
        {selectedRecord ? (
          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            {selectedStatus === "processing" ? (
              <Alert
                type="info"
                showIcon
                message="Verified — awaiting manual payment"
                description="Send the money through the bank, then enter the transfer reference and attach the receipt below."
              />
            ) : null}

            <Card size="small" title="Request">
              <Descriptions bordered size="small" column={{ xs: 1, sm: 2 }}>
                <Descriptions.Item label="Amount">
                  <Text strong>{formatAmount(selectedRecord.amount, selectedCurrency)}</Text>
                </Descriptions.Item>
                <Descriptions.Item label="Reference">{selectedRecord.reference || "N/A"}</Descriptions.Item>
                <Descriptions.Item label="Requested">
                  {selectedRecord.created_at ? new Date(selectedRecord.created_at).toLocaleString() : "N/A"}
                </Descriptions.Item>
                <Descriptions.Item label="Updated">
                  {selectedRecord.updated_at ? new Date(selectedRecord.updated_at).toLocaleString() : "N/A"}
                </Descriptions.Item>
                <Descriptions.Item label="Description" span={2}>
                  {selectedRecord.description || "No description supplied"}
                </Descriptions.Item>
                {selectedRecord.manual_payment_reference ? (
                  <Descriptions.Item label="Manual payment reference" span={2}>
                    {selectedRecord.manual_payment_reference}
                  </Descriptions.Item>
                ) : null}
              </Descriptions>
            </Card>

            <Card size="small" title="Vendor Record">
              <Descriptions bordered size="small" column={{ xs: 1, sm: 2 }}>
                <Descriptions.Item label="Vendor">{getVendorName(selectedRecord)}</Descriptions.Item>
                <Descriptions.Item label="Vendor ID">{selectedRecord.vendor_id || selectedVendor.id || "N/A"}</Descriptions.Item>
                <Descriptions.Item label="Email">{selectedVendor.email || "N/A"}</Descriptions.Item>
                <Descriptions.Item label="Phone">{selectedVendor.phone || "N/A"}</Descriptions.Item>
                <Descriptions.Item label="Account status">
                  {selectedVendor.status ? <Tag>{formatStatus(selectedVendor.status)}</Tag> : "Not supplied by API"}
                </Descriptions.Item>
                <Descriptions.Item label="Joined">
                  {selectedVendor.created_at ? new Date(selectedVendor.created_at).toLocaleDateString() : "Not supplied by API"}
                </Descriptions.Item>
              </Descriptions>
              {selectedRestaurantId ? (
                <Button
                  type="link"
                  style={{ paddingInline: 0, marginTop: 8 }}
                  onClick={() => navigate(`/Customers/store/${selectedRestaurantId}`)}
                >
                  Open vendor/store record
                </Button>
              ) : (
                <Paragraph type="secondary" style={{ marginTop: 8, marginBottom: 0 }}>
                  This request has no restaurant ID. The API should include one if wallets are store-specific.
                </Paragraph>
              )}
            </Card>

            <Card size="small" title="Payout Destination">
              <Descriptions bordered size="small" column={1}>
                <Descriptions.Item label="Account name">{selectedRecord.account_name || "Unresolved"}</Descriptions.Item>
                <Descriptions.Item label="Bank">{selectedRecord.bank_name || selectedRecord.bank_code || "N/A"}</Descriptions.Item>
                <Descriptions.Item label="Account number">{maskAccountNumber(selectedRecord.account_number)}</Descriptions.Item>
              </Descriptions>
            </Card>

            <Card size="small" title="Wallet Reconciliation">
              {selectedSnapshot?.reconciliation.balanceBefore === null ? (
                <Alert
                  type="warning"
                  showIcon
                  message="Wallet snapshot not supplied by the API"
                  description="Approval should be blocked by the backend until it atomically verifies and reserves the vendor's balance."
                />
              ) : (
                <Row gutter={[12, 12]}>
                  <Col xs={24} sm={8}>
                    <Statistic title="Balance before" value={selectedSnapshot.reconciliation.balanceBefore} formatter={() => formatOptionalAmount(selectedSnapshot.reconciliation.balanceBefore, selectedCurrency)} />
                  </Col>
                  <Col xs={24} sm={8}>
                    <Statistic title="Reserved" value={selectedSnapshot.reconciliation.reserved ?? 0} formatter={() => formatOptionalAmount(selectedSnapshot.reconciliation.reserved, selectedCurrency)} />
                  </Col>
                  <Col xs={24} sm={8}>
                    <Statistic title="Remaining" value={selectedSnapshot.reconciliation.remaining ?? 0} formatter={() => formatOptionalAmount(selectedSnapshot.reconciliation.remaining, selectedCurrency)} />
                  </Col>
                </Row>
              )}
            </Card>

            <Card size="small" title="Verification Checks">
              <Space direction="vertical" size="middle">
                {selectedChecks.map((check) => <VerificationCheck key={check.key} check={check} />)}
              </Space>
            </Card>

            {selectedRecord.receipt_url ? (
              <Card size="small" title="Existing Evidence">
                <a href={selectedRecord.receipt_url} target="_blank" rel="noreferrer">View attached receipt or evidence</a>
              </Card>
            ) : null}

            {canStartReview || canRecordPayment ? (
              <Card size="small" title="Admin Decision">
                <Space direction="vertical" style={{ width: "100%" }}>
                  {canRecordPayment ? (
                    <Input
                      placeholder="Bank transfer reference / session ID"
                      value={manualPaymentReference}
                      onChange={(event) => setManualPaymentReference(event.target.value)}
                    />
                  ) : null}
                  <Input.TextArea
                    rows={3}
                    placeholder="Add a review note. A reason is required when rejecting."
                    value={adminNote}
                    onChange={(event) => setAdminNote(event.target.value)}
                  />
                  {canRecordPayment ? (
                    <Upload
                      maxCount={1}
                      accept="image/png,image/jpeg,application/pdf"
                      beforeUpload={(file) => {
                        setReceiptFile(file);
                        return false;
                      }}
                      onRemove={() => setReceiptFile(null)}
                    >
                      <Button icon={<UploadOutlined />}>Attach payment receipt</Button>
                    </Upload>
                  ) : null}
                  <Alert
                    type="info"
                    showIcon
                    message={
                      canRecordPayment
                        ? "The payment reference and receipt are required to complete a manually paid withdrawal."
                        : "Verification does not send money. Payment must be made manually after this step."
                    }
                  />
                  <Space wrap>
                    {canStartReview ? (
                      <Button
                        type="primary"
                        loading={updatingId === selectedRecord.id}
                        disabled={hasFailedVerification}
                        onClick={() => confirmAction("processing")}
                      >
                        Mark Verified
                      </Button>
                    ) : null}
                    {canRecordPayment ? (
                      <Button
                        type="primary"
                        loading={updatingId === selectedRecord.id}
                        onClick={() => confirmAction("completed")}
                      >
                        Mark Paid & Complete
                      </Button>
                    ) : null}
                    {canReject ? (
                      <Button
                        danger
                        loading={updatingId === selectedRecord.id}
                        onClick={() => confirmAction("rejected")}
                      >
                        Reject Request
                      </Button>
                    ) : null}
                  </Space>
                  {hasFailedVerification ? (
                    <Text type="danger">
                      Approval is disabled because one or more verification checks failed.
                    </Text>
                  ) : null}
                </Space>
              </Card>
            ) : null}
          </Space>
        ) : null}
      </Drawer>
    </div>
  );
};

export default AdminWithdrawalHistory;
