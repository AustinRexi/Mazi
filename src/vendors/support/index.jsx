import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import axios from "axios";
import Pusher from "pusher-js";
import { Row, Col, message, Card, Spin, Alert, Button, Space, Tag } from "antd";
import StatsCards from "./StatsCards";
import TicketList from "./TicketList";
import TicketDetails from "./TicketDetails";
import { getVendorRestaurantScope } from "../utils/restaurantScope";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api";

const PUSHER_KEY = import.meta.env.VITE_REVERB_APP_KEY || import.meta.env.VITE_PUSHER_KEY || "";
const WS_HOST = import.meta.env.VITE_REVERB_HOST || import.meta.env.VITE_WS_HOST || "";
const WS_PORT = Number(import.meta.env.VITE_REVERB_PORT || import.meta.env.VITE_WS_PORT || 443);
const WS_TLS = String(import.meta.env.VITE_REVERB_TLS || import.meta.env.VITE_WS_TLS || "true") === "true";

const toCustomer = (ticket) => {
  const user = ticket?.user || {};
  const firstName = user?.firstname || "";
  const lastName = user?.lastname || "";

  return {
    name: `${firstName} ${lastName}`.trim() || "Customer",
    email: user?.email || "unknown@customer.com",
    avatar: user?.profilePics || null,
  };
};

const mapTicket = (ticket) => ({
  ...ticket,
  id: ticket?.id,
  customer: toCustomer(ticket),
  subject: ticket?.subject || "No subject",
  status: ticket?.status || "open",
  priority: ticket?.priority || "medium",
  created: ticket?.created_at,
  messages: Array.isArray(ticket?.messages)
    ? ticket.messages.map((msg) => ({
        id: msg.id,
        sender: msg.sender_type === "vendor" ? "vendor" : "customer",
        message: msg.message,
        timestamp: msg.created_at,
        senderName:
          msg.sender_type === "vendor"
            ? "Vendor"
            : toCustomer(ticket).name,
      }))
    : [],
});

const VendorSupport = () => {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [replyMessage, setReplyMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [realtimeStatus, setRealtimeStatus] = useState("disconnected");
  const [realtimeEnabled, setRealtimeEnabled] = useState(true);
  const pusherRef = useRef(null);
  const channelRef = useRef(null);

  const token = localStorage.getItem("token");
  const restaurantId = getVendorRestaurantScope();
  const [realtimeConfig, setRealtimeConfig] = useState(null);
  const [typingByTicket, setTypingByTicket] = useState({});
  const typingTimeoutsRef = useRef({});
  const localTypingDebounceRef = useRef(null);
  const localTypingIdleRef = useRef(null);
  const localTypingSentRef = useRef({ ticketId: null, active: false });

  const fetchTickets = useCallback(async () => {
    if (!token) {
      setError("You need to log in as a vendor to view support tickets.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const params = {
        status: statusFilter,
        priority: priorityFilter,
      };

      if (searchQuery.trim()) {
        params.search = searchQuery.trim();
      }

      if (restaurantId) {
        params.restaurant_id = restaurantId;
      }

      const response = await axios.get(`${API_BASE_URL}/vendor/support/tickets`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        params,
      });

      const rows = response.data?.data || [];
      const nextTickets = rows.map(mapTicket);
      setTickets(nextTickets);

      if (!nextTickets.length) {
        setSelectedTicket(null);
        return;
      }

      if (selectedTicket?.id) {
        const refreshedSelected = nextTickets.find((t) => t.id === selectedTicket.id);
        setSelectedTicket(refreshedSelected || nextTickets[0]);
      } else {
        setSelectedTicket(nextTickets[0]);
      }
    } catch (fetchError) {
      setError(
        fetchError.response?.data?.message ||
          "Failed to load support tickets."
      );
    } finally {
      setLoading(false);
    }
  }, [token, statusFilter, priorityFilter, searchQuery, restaurantId, selectedTicket?.id]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchTickets();
    }, 250);

    return () => clearTimeout(timeout);
  }, [fetchTickets]);

  useEffect(() => {
    if (!token) return;

    let cancelled = false;
    const loadRealtimeConfig = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/realtime/config`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });
        const data = response?.data?.data;
        if (!cancelled && data && typeof data === "object") {
          setRealtimeConfig(data);
        }
      } catch (_) {
        // Ignore realtime config fetch failures and keep polling available.
      }
    };

    loadRealtimeConfig();
    return () => {
      cancelled = true;
    };
  }, [token]);

  useEffect(() => {
    const vendorId = Number(realtimeConfig?.user_id);
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
    if (!token || !Number.isFinite(vendorId) || vendorId <= 0) return undefined;
    const host = String(realtimeConfig?.host || WS_HOST).trim();
    const key = String(realtimeConfig?.key || PUSHER_KEY).trim();
    const port = Number(realtimeConfig?.port || WS_PORT || 443);
    const tls = typeof realtimeConfig?.tls === "boolean" ? realtimeConfig.tls : WS_TLS;
    if (!host || !key || !Number.isFinite(port)) return undefined;

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

    const channelName = `vendors.${vendorId}`;
    const channel = pusher.subscribe(channelName);
    channelRef.current = channel;

    const onTicketTyping = (eventPayload) => {
      try {
        const payload =
          typeof eventPayload === "string"
            ? JSON.parse(eventPayload)
            : eventPayload;
        if (!payload || typeof payload !== "object") return;

        const ticketId = Number(payload.ticket_id);
        if (!Number.isFinite(ticketId) || ticketId <= 0) return;

        const senderType = String(payload.sender_type || "").toLowerCase();
        const senderId = Number(payload.sender_id || 0);
        if (senderType === "vendor" && Number.isFinite(vendorId) && senderId === vendorId) {
          return;
        }

        const typing = Boolean(payload.typing);

        if (typingTimeoutsRef.current[ticketId]) {
          clearTimeout(typingTimeoutsRef.current[ticketId]);
        }

        if (typing) {
          const label = senderType === "admin" ? "Admin support is typing..." : "Customer is typing...";
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

    const onTicketUpdated = (eventPayload) => {
      try {
        const payload =
          typeof eventPayload === "string"
            ? JSON.parse(eventPayload)
            : eventPayload;
        if (!payload || typeof payload !== "object") return;

        const updatedTicket = payload.ticket;
        if (
          restaurantId &&
          updatedTicket?.restaurant_id &&
          String(updatedTicket.restaurant_id) !== String(restaurantId)
        ) {
          return;
        }

        fetchTickets();
      } catch (_) {
        fetchTickets();
      }
    };

    channel.bind("SupportTicketUpdated", onTicketUpdated);
    channel.bind("SupportTicketTyping", onTicketTyping);

    return () => {
      channel.unbind("SupportTicketUpdated", onTicketUpdated);
      channel.unbind("SupportTicketTyping", onTicketTyping);
      pusher.unsubscribe(channelName);
      pusher.disconnect();
      channelRef.current = null;
      pusherRef.current = null;
      setRealtimeStatus("disconnected");
    };
  }, [token, realtimeConfig, restaurantId, fetchTickets, realtimeEnabled]);

  const handleSendReply = async () => {
    if (!replyMessage.trim() || !selectedTicket || !token) return;

    try {
      setSubmitting(true);
      await axios.post(
        `${API_BASE_URL}/vendor/support/tickets/${selectedTicket.id}/messages`,
        { message: replyMessage.trim() },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      setReplyMessage("");
      await sendVendorTyping(selectedTicket.id, false);
      localTypingSentRef.current = { ticketId: selectedTicket.id, active: false };
      message.success("Reply sent");
      await fetchTickets();
    } catch (replyError) {
      message.error(
        replyError.response?.data?.message || "Failed to send reply"
      );
    } finally {
      setSubmitting(false);
    }
  };

  const markAsResolved = async (id) => {
    if (!token) return;

    try {
      setSubmitting(true);
      await axios.patch(
        `${API_BASE_URL}/vendor/support/tickets/${id}/resolve`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      message.success("Ticket marked as resolved");
      await fetchTickets();
    } catch (resolveError) {
      message.error(
        resolveError.response?.data?.message || "Failed to resolve ticket"
      );
    } finally {
      setSubmitting(false);
    }
  };

  const sendVendorTyping = useCallback(
    async (ticketId, typing) => {
      if (!token || !ticketId) return;
      try {
        await axios.post(
          `${API_BASE_URL}/vendor/support/tickets/${ticketId}/typing`,
          { typing },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );
      } catch (_) {
        // Typing events are non-blocking.
      }
    },
    [token]
  );

  useEffect(() => {
    const ticketId = selectedTicket?.id;
    const text = replyMessage.trim();

    if (!ticketId || !token) return undefined;

    if (localTypingSentRef.current.ticketId && localTypingSentRef.current.ticketId !== ticketId && localTypingSentRef.current.active) {
      sendVendorTyping(localTypingSentRef.current.ticketId, false);
      localTypingSentRef.current = { ticketId, active: false };
    }

    if (!text) {
      if (localTypingSentRef.current.ticketId === ticketId && localTypingSentRef.current.active) {
        sendVendorTyping(ticketId, false);
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
        sendVendorTyping(ticketId, true);
        localTypingSentRef.current = { ticketId, active: true };
      }
    }, 250);

    localTypingIdleRef.current = setTimeout(() => {
      sendVendorTyping(ticketId, false);
      localTypingSentRef.current = { ticketId, active: false };
    }, 2000);

    return () => {
      if (localTypingDebounceRef.current) clearTimeout(localTypingDebounceRef.current);
      if (localTypingIdleRef.current) clearTimeout(localTypingIdleRef.current);
    };
  }, [replyMessage, selectedTicket?.id, token, sendVendorTyping]);

  useEffect(() => {
    const typingTimeouts = typingTimeoutsRef.current;
    return () => {
      const sent = localTypingSentRef.current;
      if (sent?.ticketId && sent.active) {
        sendVendorTyping(sent.ticketId, false);
      }
      Object.values(typingTimeouts).forEach((timerId) => clearTimeout(timerId));
    };
  }, [sendVendorTyping]);

  const stats = useMemo(() => {
    const openTickets = tickets.filter((t) => t.status === "open").length;
    const inProgressTickets = tickets.filter((t) => t.status === "in-progress").length;
    const resolvedTickets = tickets.filter((t) => t.status === "resolved").length;

    return {
      total: tickets.length,
      open: openTickets,
      inProgress: inProgressTickets,
      resolved: resolvedTickets,
    };
  }, [tickets]);

  if (loading) {
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
      {error ? <Alert type="error" showIcon message={error} style={{ marginBottom: 16 }} /> : null}
      <Card size="small" style={{ marginBottom: 16 }}>
        <Space wrap>
          <span style={{ fontWeight: 600 }}>Realtime:</span>
          <Tag color={realtimeStatus === "connected" ? "green" : realtimeStatus === "connecting" ? "blue" : realtimeStatus === "error" ? "red" : "default"}>
            {realtimeStatus.toUpperCase()}
          </Tag>
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

      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col xs={24} lg={12}>
          <TicketList
            tickets={tickets}
            selectedTicket={selectedTicket}
            onSelect={setSelectedTicket}
            searchQuery={searchQuery}
            onSearch={setSearchQuery}
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
            priorityFilter={priorityFilter}
            onPriorityChange={setPriorityFilter}
          />
        </Col>

        <Col xs={24} lg={12}>
          {selectedTicket ? (
            <TicketDetails
              ticket={selectedTicket}
              replyMessage={replyMessage}
              setReplyMessage={setReplyMessage}
              onSendReply={handleSendReply}
              onMarkResolved={markAsResolved}
              isSubmitting={submitting}
              typingIndicator={typingByTicket[selectedTicket?.id] || ""}
            />
          ) : (
            <Card style={{ textAlign: "center", padding: 50 }}>
              Select a ticket to view details
            </Card>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default VendorSupport;
