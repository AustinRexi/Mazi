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
  MessageOutlined,
  PaperClipOutlined,
  ReloadOutlined,
  SearchOutlined,
  SendOutlined,
  ShopOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import StatsCards from "../../vendors/support/StatsCards";
import {
  fetchAdminSupportTicket,
  fetchAdminSupportTickets,
  fetchRealtimeConfig,
  replyToAdminSupportTicket,
  resolveAdminSupportTicket,
  sendAdminSupportTyping,
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
    unreadMessagesCount: Number(ticket?.unread_messages_count || 0),
    hasUnreadReply:
      Boolean(ticket?.has_unread_reply) ||
      Number(ticket?.unread_messages_count || 0) > 0,
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
          attachmentUrl: entry.attachment_url || "",
          attachmentName: entry.attachment_name || "",
          attachmentMime: entry.attachment_mime || "",
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

const isImageAttachment = (entry) => {
  const mime = String(entry?.attachmentMime || "").toLowerCase();
  if (mime.startsWith("image/")) return true;
  const url = String(entry?.attachmentUrl || "").toLowerCase();
  return [".jpg", ".jpeg", ".png", ".gif", ".webp", ".bmp"].some((ext) => url.includes(ext));
};

const Support = () => {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [serviceFilter, setServiceFilter] = useState("all");
  const [replyMessage, setReplyMessage] = useState("");
  const [replyAttachment, setReplyAttachment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [realtimeConfig, setRealtimeConfig] = useState(null);
  const [realtimeEnabled, setRealtimeEnabled] = useState(true);
  const [realtimeStatus, setRealtimeStatus] = useState("disconnected");
  const [typingByTicket, setTypingByTicket] = useState({});
  const pusherRef = useRef(null);
  const channelRef = useRef(null);
  const typingTimeoutsRef = useRef({});
  const localTypingDebounceRef = useRef(null);
  const localTypingIdleRef = useRef(null);
  const localTypingSentRef = useRef({ ticketId: null, active: false });
  const conversationContainerRef = useRef(null);

  const fetchTickets = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const rows = await fetchAdminSupportTickets({
        status: statusFilter,
        priority: priorityFilter,
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
  }, [priorityFilter, searchQuery, statusFilter]);

  const handleSelectTicket = useCallback(
    async (ticket) => {
      if (!ticket?.id) {
        setSelectedTicket(null);
        return;
      }

      try {
        const latest = await fetchAdminSupportTicket(ticket.id);
        const mapped = mapTicket(latest || ticket);
        const nextSelected = {
          ...mapped,
          unreadMessagesCount: 0,
          hasUnreadReply: false,
        };

        setSelectedTicket(nextSelected);
        setTickets((current) =>
          current.map((row) =>
            row.id === nextSelected.id ? { ...row, ...nextSelected } : row
          )
        );
        fetchTickets();
      } catch (selectError) {
        setSelectedTicket(ticket);
        message.error(
          selectError.response?.data?.message ||
            selectError.message ||
            "Failed to load latest ticket messages."
        );
      }
    },
    [fetchTickets]
  );

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
      } catch (_) {
        // Ignore realtime config fetch errors and allow manual reconnect.
      }
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
        } catch (_) {
          // Best-effort cleanup.
        }
      }
      if (pusherRef.current) {
        try {
          pusherRef.current.disconnect();
        } catch (_) {
          // Best-effort cleanup.
        }
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

    const onTicketTyping = (eventPayload) => {
      try {
        const payloadCandidate =
          typeof eventPayload === "string"
            ? JSON.parse(eventPayload)
            : eventPayload;
        const payload =
          payloadCandidate && typeof payloadCandidate?.data === "string"
            ? JSON.parse(payloadCandidate.data)
            : payloadCandidate && payloadCandidate?.data && typeof payloadCandidate.data === "object"
              ? payloadCandidate.data
              : payloadCandidate;
        if (!payload || typeof payload !== "object") return;

        const ticketId = Number(payload.ticket_id);
        if (!Number.isFinite(ticketId) || ticketId <= 0) return;

        const senderType = String(payload.sender_type || "").toLowerCase();
        const senderId = Number(payload.sender_id || 0);
        const adminId = Number(realtimeConfig?.user_id || 0);
        if (senderType === "admin" && adminId > 0 && senderId === adminId) {
          return;
        }

        const typing = Boolean(payload.typing);

        if (typingTimeoutsRef.current[ticketId]) {
          clearTimeout(typingTimeoutsRef.current[ticketId]);
        }

        if (typing) {
          const label = senderType === "vendor" ? "Vendor is typing..." : "Customer is typing...";
          setTypingByTicket((prev) => ({ ...prev, [ticketId]: label }));
          typingTimeoutsRef.current[ticketId] = setTimeout(() => {
            setTypingByTicket((prev) => {
              const next = { ...prev };
              delete next[ticketId];
              return next;
            });
          }, 4000);
        } else {
          setTypingByTicket((prev) => {
            const next = { ...prev };
            delete next[ticketId];
            return next;
          });
        }
      } catch (_) {
        // Ignore malformed realtime payloads.
      }
    };

    const onTicketUpdated = () => {
      fetchTickets();
    };

    channel.bind("SupportTicketUpdated", onTicketUpdated);
    const typingEvents = ["SupportTicketTyping", ".SupportTicketTyping", "App\\Events\\SupportTicketTyping"];
    typingEvents.forEach((eventName) => channel.bind(eventName, onTicketTyping));

    return () => {
      channel.unbind("SupportTicketUpdated", onTicketUpdated);
      typingEvents.forEach((eventName) => channel.unbind(eventName, onTicketTyping));
      pusher.unsubscribe("admins");
      pusher.disconnect();
      channelRef.current = null;
      pusherRef.current = null;
      setRealtimeStatus("disconnected");
    };
  }, [fetchTickets, realtimeConfig, realtimeEnabled]);

  useEffect(() => {
    const ticketId = selectedTicket?.id;
    const text = replyMessage.trim();

    if (!ticketId) return undefined;

    if (localTypingSentRef.current.ticketId && localTypingSentRef.current.ticketId !== ticketId && localTypingSentRef.current.active) {
      sendAdminSupportTyping(localTypingSentRef.current.ticketId, false).catch(() => {});
      localTypingSentRef.current = { ticketId, active: false };
    }

    if (!text) {
      if (localTypingSentRef.current.ticketId === ticketId && localTypingSentRef.current.active) {
        sendAdminSupportTyping(ticketId, false).catch(() => {});
      }
      localTypingSentRef.current = { ticketId, active: false };
      if (localTypingDebounceRef.current) clearTimeout(localTypingDebounceRef.current);
      if (localTypingIdleRef.current) clearTimeout(localTypingIdleRef.current);
      return undefined;
    }

    if (localTypingDebounceRef.current) clearTimeout(localTypingDebounceRef.current);
    if (localTypingIdleRef.current) clearTimeout(localTypingIdleRef.current);

    localTypingDebounceRef.current = setTimeout(() => {
      if (!(localTypingSentRef.current.ticketId === ticketId && localTypingSentRef.current.active)) {
        sendAdminSupportTyping(ticketId, true).catch(() => {});
        localTypingSentRef.current = { ticketId, active: true };
      }
    }, 250);

    localTypingIdleRef.current = setTimeout(() => {
      sendAdminSupportTyping(ticketId, false).catch(() => {});
      localTypingSentRef.current = { ticketId, active: false };
    }, 2000);

    return () => {
      if (localTypingDebounceRef.current) clearTimeout(localTypingDebounceRef.current);
      if (localTypingIdleRef.current) clearTimeout(localTypingIdleRef.current);
    };
  }, [replyMessage, selectedTicket?.id, realtimeConfig?.user_id]);

  useEffect(() => {
    const typingTimeouts = typingTimeoutsRef.current;
    return () => {
      const sent = localTypingSentRef.current;
      if (sent?.ticketId && sent.active) {
        sendAdminSupportTyping(sent.ticketId, false).catch(() => {});
      }
      Object.values(typingTimeouts).forEach((timerId) => clearTimeout(timerId));
    };
  }, []);

  useEffect(() => {
    setReplyAttachment(null);
  }, [selectedTicket?.id]);

  useEffect(() => {
    if (!conversationContainerRef.current) return;
    conversationContainerRef.current.scrollTop =
      conversationContainerRef.current.scrollHeight;
  }, [selectedTicket?.id, selectedTicket?.messages?.length]);

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
    };
  }, [tickets]);

  const handleSendReply = async () => {
    if (!selectedTicket || (!replyMessage.trim() && !replyAttachment)) return;

    try {
      setSubmitting(true);
      await replyToAdminSupportTicket(
        selectedTicket.id,
        replyMessage.trim(),
        replyAttachment
      );
      message.success("Reply sent");
      setReplyMessage("");
      setReplyAttachment(null);
      await sendAdminSupportTyping(selectedTicket.id, false);
      localTypingSentRef.current = { ticketId: selectedTicket.id, active: false };
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
                    value={serviceFilter}
                    onChange={setServiceFilter}
                    style={{ minWidth: 140 }}
                    options={SERVICE_OPTIONS}
                  />
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
                          onClick={() => handleSelectTicket(ticket)}
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
                                      {ticket.hasUnreadReply ? (
                                        <Tag color="red" style={{ marginLeft: 8 }}>
                                          NEW
                                          {ticket.unreadMessagesCount > 0
                                            ? ` (${ticket.unreadMessagesCount})`
                                            : ""}
                                        </Tag>
                                      ) : null}
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
                    <div
                      ref={conversationContainerRef}
                      style={{ maxHeight: 340, overflowY: "auto" }}
                    >
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
                                {entry.attachmentUrl ? (
                                  <div style={{ marginBottom: 8 }}>
                                    {isImageAttachment(entry) ? (
                                      <a href={entry.attachmentUrl} target="_blank" rel="noreferrer">
                                        <img
                                          src={entry.attachmentUrl}
                                          alt={entry.attachmentName || "attachment"}
                                          style={{
                                            maxWidth: 220,
                                            borderRadius: 8,
                                            border: "1px solid #f0f0f0",
                                          }}
                                        />
                                      </a>
                                    ) : (
                                      <a href={entry.attachmentUrl} target="_blank" rel="noreferrer">
                                        <PaperClipOutlined /> {entry.attachmentName || "View attachment"}
                                      </a>
                                    )}
                                  </div>
                                ) : null}
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
                        {typingByTicket[selectedTicket?.id] ? (
                          <Text type="secondary" style={{ fontStyle: "italic" }}>
                            {typingByTicket[selectedTicket?.id]}
                          </Text>
                        ) : null}
                        <TextArea
                          rows={4}
                          placeholder="Type your reply to the customer..."
                          value={replyMessage}
                          onChange={(event) => setReplyMessage(event.target.value)}
                        />
                        <input
                          type="file"
                          onChange={(event) => {
                            const file = event.target.files?.[0] || null;
                            setReplyAttachment(file);
                          }}
                        />
                        {replyAttachment ? (
                          <Text type="secondary">
                            Attachment: {replyAttachment.name}
                          </Text>
                        ) : null}
                        <Button
                          type="primary"
                          icon={<SendOutlined />}
                          onClick={handleSendReply}
                          disabled={!replyMessage.trim() && !replyAttachment}
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
