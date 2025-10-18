import { useState, useEffect } from "react";
import { Row, Col, message, Card, Spin } from "antd";
import StatsCards from "./StatsCards";
import TicketList from "./TicketList";
import TicketDetails from "./TicketDetails";
import { MOCK_TICKETS } from "./mockData";

const VendorSupport = () => {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [replyMessage, setReplyMessage] = useState("");
  const [loading, setLoading] = useState(true);

  // 🕒 Simulate API call to fetch tickets
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setTickets(MOCK_TICKETS);
      setLoading(false);
    }, 1500); // simulate 1.5s API delay
    return () => clearTimeout(timer);
  }, []);

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.customer.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || ticket.status === statusFilter;
    const matchesPriority =
      priorityFilter === "all" || ticket.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleSendReply = () => {
    if (!replyMessage.trim() || !selectedTicket) return;
    const newMessage = {
      id: `MSG-${Date.now()}`,
      sender: "vendor",
      message: replyMessage,
      timestamp: new Date().toISOString(),
      senderName: "John's Electronics",
    };
    setTickets((prev) =>
      prev.map((ticket) =>
        ticket.id === selectedTicket.id
          ? {
              ...ticket,
              messages: [...ticket.messages, newMessage],
              lastReply: new Date().toISOString(),
            }
          : ticket
      )
    );
    setSelectedTicket({
      ...selectedTicket,
      messages: [...selectedTicket.messages, newMessage],
    });
    setReplyMessage("");
    message.success("Reply sent!");
  };

  const markAsResolved = (id) => {
    setTickets((prev) =>
      prev.map((ticket) =>
        ticket.id === id ? { ...ticket, status: "resolved" } : ticket
      )
    );
    if (selectedTicket?.id === id)
      setSelectedTicket({ ...selectedTicket, status: "resolved" });
    message.success("Ticket marked as resolved");
  };

  const openTickets = tickets.filter((t) => t.status === "open").length;
  const inProgressTickets = tickets.filter(
    (t) => t.status === "in-progress"
  ).length;
  const resolvedTickets = tickets.filter((t) => t.status === "resolved").length;

  // 🌀 Show spinner while data is loading
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
      <StatsCards
        total={tickets.length}
        open={openTickets}
        inProgress={inProgressTickets}
        resolved={resolvedTickets}
      />

      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col xs={24} lg={12}>
          <TicketList
            tickets={filteredTickets}
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
              onReplyChange={setReplyMessage}
              onSendReply={handleSendReply}
              onResolve={markAsResolved}
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
