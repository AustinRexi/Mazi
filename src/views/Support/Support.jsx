import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Pusher from "pusher-js";
import {
  Alert,
  Avatar,
  Badge,
  Button,
  Card,
  Col,
  Empty,
  Input,
  Row,
  Select,
  Space,
  Spin,
  Tag,
  Typography,
  message,
} from "antd";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  MessageOutlined,
  ReloadOutlined,
  SearchOutlined,
  SendOutlined,
  ShopOutlined,
  SolutionOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import StatsCards from "../../vendors/support/StatsCards";
import {
  fetchAdminSupportTickets,
  fetchRealtimeConfig,
  replyToAdminSupportTicket,
  resolveAdminSupportTicket,
} from "../../services/adminSupportService";

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

const PUSHER_KEY =
  import.meta.env.VITE_REVERB_APP_KEY || import.meta.env.VITE_PUSHER_KEY || "";
const WS_HOST = import.meta.env.VITE_REVERB_HOST || import.meta.env.VITE_WS_HOST || "";
const WS_PORT = Number(
  import.meta.env.VITE_REVERB_PORT || import.meta.env.VITE_WS_PORT || 443
);
const WS_TLS =
  String(import.meta.env.VITE_REVERB_TLS || import.meta.env.VITE_WS_TLS || "true") ===
  "true";

const SERVICE_OPTIONS = [
  { value: "all", label: "All Services" },
  { value: "food", label: "Food" },
  { value: "courier", label: "Courier" },
  { value: "currency", label: "Currency" },
  { value: "billing", label: "Billing" },
  { value: "account", label: "Account" },
  { value: "general", label: "General" },
];

const TARGET_OPTIONS = [
  { value: "all", label: "All Targets" },
  { value: "admin", label: "Admin" },
  { value: "vendor", label: "Vendor" },
];

const getFullName = (person = {}, fallback = "Unknown") => {
  const firstName = person?.firstname || person?.firstName || "";
  const lastName = person?.lastname || person?.lastName || "";
  return `${firstName} ${lastName}`.trim() || fallback;
};

const getInitials = (name) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "NA";

const inferService = (ticket) => {
  const haystack = [
    ticket?.subject,
    ticket?.description,
    ticket?.restaurant?.restaurant_name,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  if (
    haystack.includes("exchange") ||
    haystack.includes("currency") ||
    haystack.includes("rate") ||
    haystack.includes("wallet") ||
    haystack.includes("payment")
  ) {
    return "currency";
  }

  if (
    haystack.includes("courier") ||
    haystack.includes("pickup") ||
    haystack.includes("package") ||
    haystack.includes("dispatch")
  ) {
    return "courier";
  }

  if (
    haystack.includes("bill") ||
    haystack.includes("billing") ||
    haystack.includes("charge") ||
    haystack.includes("refund")
  ) {
    return "billing";
  }

  if (
    haystack.includes("account") ||
    haystack.includes("login") ||
    haystack.includes("password") ||
    haystack.includes("otp")
  ) {
    return "account";
  }

  if (
    haystack.includes("food") ||
    haystack.includes("restaurant") ||
    haystack.includes("order") ||
    haystack.includes("delivery") ||
    ticket?.restaurant?.id
  ) {
    return "food";
  }

  return "general";
};

const mapTicket = (ticket) => {
  const customerName = getFullName(ticket?.user, "Customer");
  const vendorName = getFullName(ticket?.vendor, "Vendor");
  const service = inferService(ticket);

  return {
    ...ticket,
    id: ticket?.id,
    customer: {
      name: customerName,
      email: ticket?.user?.email || "unknown@customer.com",
      avatar: ticket?.user?.profilePics || null,
      initials: getInitials(customerName),
    },
    vendor: {
      name: vendorName,
      email: ticket?.vendor?.email || "",
    },
    restaurantName: ticket?.restaurant?.restaurant_name || null,
    ticketNumber: ticket?.ticket_number || `#${ticket?.id}`,
    subject: ticket?.subject || "No subject",
    description: ticket?.description || "",
    status: ticket?.status || "open",
    priority: ticket?.priority || "medium",
    ticketTarget: ticket?.ticket_target || "admin",
    service,
    created: ticket?.created_at,
    lastReplyAt: ticket?.last_reply_at || ticket?.updated_at || ticket?.created_at,
    messages: Array.isArray(ticket?.messages)
      ? ticket.messages.map((entry) => ({
          id: entry.id,
          senderType: entry.sender_type || "user",
          senderName:
            entry.sender_type === "admin"
              ? "Admin Support"
              : entry.sender_type === "vendor"
                ? vendorName
                : customerName,
          message: entry.message,
          timestamp: entry.created_at,
        }))
      : [],
  };
};

const getStatusColor = (status) => {
  switch (status) {
    case "open":
      return "red";
    case "in-progress":
      return "gold";
    case "resolved":
      return "green";
    default:
      return "default";
  }
};

const getPriorityColor = (priority) => {
  switch (priority) {
    case "high":
      return "red";
    case "medium":
      return "orange";
    case "low":
      return "blue";
    default:
      return "default";
  }
};

const getServiceLabel = (service) =>
  SERVICE_OPTIONS.find((option) => option.value === service)?.label || "General";

const getRealtimeTagColor = (status) => {
  switch (status) {
    case "connected":
      return "green";
    case "connecting":
      return "blue";
    case "error":
      return "red";
    default:
      return "default";
  }
};

const Support = () => {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [targetFilter, setTargetFilter] = useState("all");
  const [serviceFilter, setServiceFilter] = useState("all");
  const [replyMessage, setReplyMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [realtimeConfig, setRealtimeConfig] = useState(null);
  const [realtimeEnabled, setRealtimeEnabled] = useState(true);
  const [realtimeStatus, setRealtimeStatus] = useState("disconnected");
  const pusherRef = useRef(null);
  const channelRef = useRef(null);

  const fetchTickets = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const rows = await fetchAdminSupportTickets({
        status: statusFilter,
        priority: priorityFilter,
        target: targetFilter,
        search: searchQuery.trim() || undefined,
      });

      const nextTickets = rows.map(mapTicket);
      setTickets(nextTickets);

      if (!nextTickets.length) {
        setSelectedTicket(null);
        return;
      }

      setSelectedTicket((current) => {
        if (!current?.id) {
          return nextTickets[0];
        }

        return nextTickets.find((ticket) => ticket.id === current.id) || nextTickets[0];
      });
    } catch (fetchError) {
      setError(
        fetchError.response?.data?.message ||
          fetchError.message ||
          "Failed to load support tickets."
      );
    } finally {
      setLoading(false);
    }
  }, [priorityFilter, searchQuery, statusFilter, targetFilter]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchTickets();
    }, 250);

    return () => clearTimeout(timer);
  }, [fetchTickets]);

  useEffect(() => {
    let cancelled = false;

    const loadRealtimeConfig = async () => {
      try {
        const nextConfig = await fetchRealtimeConfig();
        if (!cancelled) {
          setRealtimeConfig(nextConfig);
        }
      } catch (_) {}
    };

    loadRealtimeConfig();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!realtimeEnabled) {
      setRealtimeStatus("disconnected");
      if (channelRef.current) {
        try {
          channelRef.current.unbind_all();
        } catch (_) {}
      }
      if (pusherRef.current) {
        try {
          pusherRef.current.disconnect();
        } catch (_) {}
      }
      channelRef.current = null;
      pusherRef.current = null;
      return undefined;
    }

    const host = String(realtimeConfig?.host || WS_HOST).trim();
    const key = String(realtimeConfig?.key || PUSHER_KEY).trim();
    const port = Number(realtimeConfig?.port || WS_PORT || 443);
    const tls =
      typeof realtimeConfig?.tls === "boolean" ? realtimeConfig.tls : WS_TLS;

    if (!host || !key || !Number.isFinite(port)) {
      return undefined;
    }

    setRealtimeStatus("connecting");

    const pusher = new Pusher(key, {
      wsHost: host,
      wsPort: port,
      wssPort: port,
      forceTLS: tls,
      encrypted: tls,
      enabledTransports: ["ws", "wss"],
      disableStats: true,
      cluster: "mt1",
      authEndpoint: undefined,
    });

    pusherRef.current = pusher;
    pusher.connection.bind("connected", () => setRealtimeStatus("connected"));
    pusher.connection.bind("connecting", () => setRealtimeStatus("connecting"));
    pusher.connection.bind("disconnected", () => setRealtimeStatus("disconnected"));
    pusher.connection.bind("error", () => setRealtimeStatus("error"));

    const channel = pusher.subscribe("admins");
    channelRef.current = channel;

    const onTicketUpdated = () => {
      fetchTickets();
    };

    channel.bind("SupportTicketUpdated", onTicketUpdated);

    return () => {
      channel.unbind("SupportTicketUpdated", onTicketUpdated);
      pusher.unsubscribe("admins");
      pusher.disconnect();
      channelRef.current = null;
      pusherRef.current = null;
      setRealtimeStatus("disconnected");
    };
  }, [fetchTickets, realtimeConfig, realtimeEnabled]);

  const filteredTickets = useMemo(() => {
    if (serviceFilter === "all") {
      return tickets;
    }

    return tickets.filter((ticket) => ticket.service === serviceFilter);
  }, [serviceFilter, tickets]);

  const stats = useMemo(() => {
    const open = tickets.filter((ticket) => ticket.status === "open").length;
    const inProgress = tickets.filter(
      (ticket) => ticket.status === "in-progress"
    ).length;
    const resolved = tickets.filter(
      (ticket) => ticket.status === "resolved"
    ).length;

    return {
      total: tickets.length,
      open,
      inProgress,
      resolved,
      adminTarget: tickets.filter((ticket) => ticket.ticketTarget === "admin").length,
      vendorTarget: tickets.filter((ticket) => ticket.ticketTarget === "vendor")
        .length,
    };
  }, [tickets]);

  const handleSendReply = async () => {
    if (!selectedTicket || !replyMessage.trim()) return;

    try {
      setSubmitting(true);
      await replyToAdminSupportTicket(selectedTicket.id, replyMessage.trim());
      message.success("Reply sent");
      setReplyMessage("");
      await fetchTickets();
    } catch (replyError) {
      message.error(
        replyError.response?.data?.message ||
          replyError.message ||
          "Failed to send reply."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleResolve = async () => {
    if (!selectedTicket) return;

    try {
      setSubmitting(true);
      await resolveAdminSupportTicket(selectedTicket.id);
      message.success("Ticket marked as resolved");
      await fetchTickets();
    } catch (resolveError) {
      message.error(
        resolveError.response?.data?.message ||
          resolveError.message ||
          "Failed to resolve ticket."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading && !tickets.length && !error) {
    return (
      <div
        style={{
          height: "70vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Spin size="large" tip="Loading support tickets..." />
      </div>
    );
  }

  return (
    <div style={{ padding: 24 }}>
      <Space
        direction="vertical"
        size="large"
        style={{ width: "100%" }}
      >
        <div>
          <Title
            level={3}
            style={{ marginBottom: 4, fontFamily: "NeueHaasDisplayBold" }}
          >
            Support
          </Title>
          <Text type="secondary">
            Monitor customer tickets, respond as admin support, and close issues
            from one place.
          </Text>
        </div>

        {error ? (
          <Alert
            type="error"
            showIcon
            message={error}
            action={
              <Button size="small" onClick={fetchTickets}>
                Retry
              </Button>
            }
          />
        ) : null}

        <Card size="small">
          <Space wrap>
            <Text strong>Realtime</Text>
            <Tag color={getRealtimeTagColor(realtimeStatus)}>
              {realtimeStatus.toUpperCase()}
            </Tag>
            <Button size="small" onClick={fetchTickets} icon={<ReloadOutlined />}>
              Refresh
            </Button>
            <Button
              size="small"
              onClick={() => setRealtimeEnabled(true)}
              disabled={realtimeEnabled && realtimeStatus === "connected"}
            >
              Connect
            </Button>
            <Button
              size="small"
              danger
              onClick={() => setRealtimeEnabled(false)}
              disabled={!realtimeEnabled}
            >
              Disconnect
            </Button>
            <Button
              size="small"
              onClick={() => {
                setRealtimeEnabled(false);
                setTimeout(() => setRealtimeEnabled(true), 150);
              }}
            >
              Reconnect
            </Button>
          </Space>
        </Card>

        <StatsCards
          total={stats.total}
          open={stats.open}
          inProgress={stats.inProgress}
          resolved={stats.resolved}
        />

        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Card>
              <Space
                direction="vertical"
                size="middle"
                style={{ width: "100%" }}
              >
                <Space wrap style={{ width: "100%" }}>
                  <Input
                    prefix={<SearchOutlined />}
                    placeholder="Search subject, ticket number, customer, vendor..."
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    style={{ minWidth: 260, flex: 1 }}
                  />
                  <Select
                    value={statusFilter}
                    onChange={setStatusFilter}
                    style={{ minWidth: 140 }}
                    options={[
                      { value: "all", label: "All Status" },
                      { value: "open", label: "Open" },
                      { value: "in-progress", label: "In Progress" },
                      { value: "resolved", label: "Resolved" },
                    ]}
                  />
                  <Select
                    value={priorityFilter}
                    onChange={setPriorityFilter}
                    style={{ minWidth: 140 }}
                    options={[
                      { value: "all", label: "All Priority" },
                      { value: "high", label: "High" },
                      { value: "medium", label: "Medium" },
                      { value: "low", label: "Low" },
                    ]}
                  />
                  <Select
                    value={targetFilter}
                    onChange={setTargetFilter}
                    style={{ minWidth: 140 }}
                    options={TARGET_OPTIONS}
                  />
                  <Select
                    value={serviceFilter}
                    onChange={setServiceFilter}
                    style={{ minWidth: 140 }}
                    options={SERVICE_OPTIONS}
                  />
                </Space>

                <Space wrap>
                  <Tag icon={<SolutionOutlined />} color="blue">
                    Admin Target: {stats.adminTarget}
                  </Tag>
                  <Tag icon={<ShopOutlined />} color="purple">
                    Vendor Target: {stats.vendorTarget}
                  </Tag>
                </Space>

                <div style={{ maxHeight: "70vh", overflowY: "auto" }}>
                  <Space
                    direction="vertical"
                    size="middle"
                    style={{ width: "100%" }}
                  >
                    {filteredTickets.length ? (
                      filteredTickets.map((ticket) => (
                        <Card
                          key={ticket.id}
                          hoverable
                          onClick={() => setSelectedTicket(ticket)}
                          style={{
                            borderColor:
                              selectedTicket?.id === ticket.id ? "#1677ff" : "#f0f0f0",
                            background:
                              selectedTicket?.id === ticket.id ? "#f5faff" : "#fff",
                          }}
                          bodyStyle={{ padding: 16 }}
                        >
                          <Space
                            direction="vertical"
                            size="small"
                            style={{ width: "100%" }}
                          >
                            <Space align="start" style={{ width: "100%" }}>
                              <Avatar
                                src={ticket.customer.avatar}
                                icon={<UserOutlined />}
                              >
                                {!ticket.customer.avatar
                                  ? ticket.customer.initials
                                  : null}
                              </Avatar>
                              <div style={{ flex: 1, minWidth: 0 }}>
                                <Space
                                  style={{
                                    width: "100%",
                                    justifyContent: "space-between",
                                  }}
                                  align="start"
                                >
                                  <div style={{ minWidth: 0 }}>
                                    <Text strong>{ticket.customer.name}</Text>
                                    <div>
                                      <Text type="secondary">{ticket.ticketNumber}</Text>
                                    </div>
                                  </div>
                                  <Text type="secondary">
                                    {ticket.created
                                      ? new Date(ticket.created).toLocaleDateString()
                                      : "Unknown date"}
                                  </Text>
                                </Space>
                                <Paragraph
                                  ellipsis={{ rows: 2 }}
                                  style={{ margin: "8px 0 0" }}
                                >
                                  {ticket.subject}
                                </Paragraph>
                              </div>
                            </Space>

                            <Space wrap>
                              <Tag color={getStatusColor(ticket.status)}>
                                {ticket.status}
                              </Tag>
                              <Tag color={getPriorityColor(ticket.priority)}>
                                {ticket.priority}
                              </Tag>
                              <Tag>{ticket.ticketTarget}</Tag>
                              <Tag>{getServiceLabel(ticket.service)}</Tag>
                            </Space>

                            <Space wrap style={{ justifyContent: "space-between" }}>
                              <Text type="secondary">
                                <MessageOutlined /> {ticket.messages.length} messages
                              </Text>
                              {ticket.restaurantName ? (
                                <Text type="secondary">
                                  <ShopOutlined /> {ticket.restaurantName}
                                </Text>
                              ) : null}
                            </Space>
                          </Space>
                        </Card>
                      ))
                    ) : (
                      <Card>
                        <Empty description="No tickets match the current filters." />
                      </Card>
                    )}
                  </Space>
                </div>
              </Space>
            </Card>
          </Col>

          <Col xs={24} md={12}>
            {selectedTicket ? (
              <Card
                title={selectedTicket.subject}
                extra={
                  selectedTicket.status !== "resolved" ? (
                    <Button
                      type="primary"
                      icon={<CheckCircleOutlined />}
                      onClick={handleResolve}
                      loading={submitting}
                    >
                      Mark Resolved
                    </Button>
                  ) : null
                }
              >
                <Space
                  direction="vertical"
                  size="large"
                  style={{ width: "100%" }}
                >
                  <Space wrap>
                    <Badge color={getStatusColor(selectedTicket.status)} />
                    <Text>{selectedTicket.status}</Text>
                    <Badge color={getPriorityColor(selectedTicket.priority)} />
                    <Text>{selectedTicket.priority} priority</Text>
                    <Tag>{selectedTicket.ticketTarget}</Tag>
                    <Tag>{getServiceLabel(selectedTicket.service)}</Tag>
                  </Space>

                  <Card size="small" style={{ background: "#fafafa" }}>
                    <Space align="start">
                      <Avatar
                        src={selectedTicket.customer.avatar}
                        icon={<UserOutlined />}
                      >
                        {!selectedTicket.customer.avatar
                          ? selectedTicket.customer.initials
                          : null}
                      </Avatar>
                      <div>
                        <Text strong>{selectedTicket.customer.name}</Text>
                        <div>
                          <Text type="secondary">
                            {selectedTicket.customer.email}
                          </Text>
                        </div>
                        <div>
                          <Text type="secondary">
                            Ticket: {selectedTicket.ticketNumber}
                          </Text>
                        </div>
                      </div>
                    </Space>
                  </Card>

                  <Row gutter={[12, 12]}>
                    <Col xs={24} sm={12}>
                      <Card size="small">
                        <Space>
                          <TeamOutlined />
                          <div>
                            <Text strong>Vendor</Text>
                            <div>
                              <Text type="secondary">
                                {selectedTicket.vendor.name}
                              </Text>
                            </div>
                          </div>
                        </Space>
                      </Card>
                    </Col>
                    <Col xs={24} sm={12}>
                      <Card size="small">
                        <Space>
                          <ShopOutlined />
                          <div>
                            <Text strong>Restaurant</Text>
                            <div>
                              <Text type="secondary">
                                {selectedTicket.restaurantName || "Not linked"}
                              </Text>
                            </div>
                          </div>
                        </Space>
                      </Card>
                    </Col>
                  </Row>

                  <Card size="small" title="Original Description">
                    <Paragraph style={{ whiteSpace: "pre-wrap", marginBottom: 0 }}>
                      {selectedTicket.description || "No description provided."}
                    </Paragraph>
                  </Card>

                  <Card size="small" title="Conversation">
                    <div style={{ maxHeight: 340, overflowY: "auto" }}>
                      <Space
                        direction="vertical"
                        size="middle"
                        style={{ width: "100%" }}
                      >
                        {selectedTicket.messages.map((entry) => {
                          const isAdmin = entry.senderType === "admin";
                          return (
                            <div
                              key={entry.id}
                              style={{
                                display: "flex",
                                justifyContent: isAdmin ? "flex-end" : "flex-start",
                              }}
                            >
                              <div
                                style={{
                                  maxWidth: "85%",
                                  background: isAdmin ? "#e6f4ff" : "#fafafa",
                                  borderRadius: 12,
                                  padding: 12,
                                }}
                              >
                                <Text strong>{entry.senderName}</Text>
                                <Paragraph
                                  style={{ margin: "4px 0 8px", whiteSpace: "pre-wrap" }}
                                >
                                  {entry.message}
                                </Paragraph>
                                <Text type="secondary">
                                  {entry.timestamp
                                    ? new Date(entry.timestamp).toLocaleString()
                                    : "Unknown time"}
                                </Text>
                              </div>
                            </div>
                          );
                        })}
                      </Space>
                    </div>
                  </Card>

                  {selectedTicket.status !== "resolved" ? (
                    <Card size="small" title="Reply">
                      <Space
                        direction="vertical"
                        size="middle"
                        style={{ width: "100%" }}
                      >
                        <TextArea
                          rows={4}
                          placeholder="Type your reply to the customer..."
                          value={replyMessage}
                          onChange={(event) => setReplyMessage(event.target.value)}
                        />
                        <Button
                          type="primary"
                          icon={<SendOutlined />}
                          onClick={handleSendReply}
                          disabled={!replyMessage.trim()}
                          loading={submitting}
                        >
                          Send Reply
                        </Button>
                      </Space>
                    </Card>
                  ) : (
                    <Alert
                      type="success"
                      showIcon
                      icon={<CheckCircleOutlined />}
                      message="This ticket has been resolved."
                    />
                  )}
                </Space>
              </Card>
            ) : (
              <Card>
                <Empty description="Select a ticket to view its details." />
              </Card>
            )}
          </Col>
        </Row>
      </Space>
    </div>
  );
};

export default Support;
