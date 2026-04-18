import { useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";
import { Row, Col, message, Card, Spin, Alert } from "antd";
import StatsCards from "./StatsCards";
import TicketList from "./TicketList";
import TicketDetails from "./TicketDetails";
import { getVendorRestaurantScope } from "../utils/restaurantScope";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api";

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

  const token = localStorage.getItem("token");
  const restaurantId = getVendorRestaurantScope();

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
