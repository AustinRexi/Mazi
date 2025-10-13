import { useState } from "react";
import {
  Table,
  Button,
  Input,
  Card,
  Badge,
  Select,
  Modal,
  Form,
  Typography,
  Avatar,
  Space,
  message,
} from "antd";
import {
  SearchOutlined,
  ClockCircleOutlined,
  UserOutlined,
  ShopOutlined,
  CreditCardOutlined,
  TruckOutlined,
  DollarOutlined,
  SettingOutlined,
  SendOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  MessageOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  CodeSandboxOutlined,
} from "@ant-design/icons";
import "antd/dist/reset.css";

const { Title, Text } = Typography;

const SUPPORT_TICKETS = [
  {
    id: "T-2024-001",
    customer: {
      name: "John Smith",
      email: "john.smith@email.com",
      avatar: "JS",
    },
    subject: "Food order missing items - Order #FD-12345",
    status: "open",
    priority: "high",
    category: "food-orders",
    created: "2024-03-15T10:30:00Z",
    lastReply: "2024-03-15T14:22:00Z",
    assignedTo: "Sarah Wilson",
    messages: 3,
    description:
      "I ordered a family meal but received only half the items. Missing: 2 burgers, fries, and drinks. Order was from McDonald's Downtown. Very disappointed as this was for a family gathering.",
  },
  {
    id: "T-2024-002",
    customer: {
      name: "Emma Davis",
      email: "emma.davis@email.com",
      avatar: "ED",
    },
    subject: "Currency exchange rate dispute - TX #CX-78901",
    status: "in-progress",
    priority: "medium",
    category: "currency-exchange",
    created: "2024-03-14T09:15:00Z",
    lastReply: "2024-03-15T11:30:00Z",
    assignedTo: "Mike Johnson",
    messages: 5,
    description:
      "I exchanged $500 USD to EUR but the rate applied was different from what was displayed on the app. The rate shown was 0.92 but I was charged at 0.89. Need clarification and possible refund of the difference.",
  },
  {
    id: "T-2024-003",
    customer: { name: "Alex Chen", email: "alex.chen@email.com", avatar: "AC" },
    subject: "Courier package damaged during delivery",
    status: "resolved",
    priority: "high",
    category: "courier-delivery",
    created: "2024-03-13T16:45:00Z",
    lastReply: "2024-03-14T08:20:00Z",
    assignedTo: "Lisa Brown",
    messages: 4,
    description:
      "My package containing fragile electronics was severely damaged during delivery. The box was crushed and the items inside are broken. Package ID: CR-56789. Need immediate compensation.",
  },
  {
    id: "T-2024-004",
    customer: {
      name: "Maria Garcia",
      email: "maria.garcia@email.com",
      avatar: "MG",
    },
    subject: "Food delivery 2 hours late - cold food",
    status: "open",
    priority: "high",
    category: "food-delivery",
    created: "2024-03-15T13:20:00Z",
    lastReply: "2024-03-15T13:20:00Z",
    assignedTo: null,
    messages: 1,
    description:
      "Ordered pizza at 6 PM with estimated delivery of 30 minutes. Food arrived at 8:15 PM completely cold. Driver said there were traffic issues but no communication was provided. Order #FD-67890.",
  },
  {
    id: "T-2024-005",
    customer: {
      name: "David Wilson",
      email: "david.wilson@email.com",
      avatar: "DW",
    },
    subject: "Courier pickup not completed - urgent documents",
    status: "open",
    priority: "high",
    category: "courier-pickup",
    created: "2024-03-15T11:10:00Z",
    lastReply: "2024-03-15T11:10:00Z",
    assignedTo: "Tom Anderson",
    messages: 1,
    description:
      "Scheduled urgent document pickup for 10 AM but courier never showed up. These are time-sensitive legal documents that need to be delivered today. Pickup ID: CR-11223. Please resolve immediately.",
  },
  {
    id: "T-2024-006",
    customer: {
      name: "Lisa Zhang",
      email: "lisa.zhang@email.com",
      avatar: "LZ",
    },
    subject: "Unable to complete currency exchange transaction",
    status: "in-progress",
    priority: "medium",
    category: "currency-exchange",
    created: "2024-03-14T14:30:00Z",
    lastReply: "2024-03-15T09:45:00Z",
    assignedTo: "Mike Johnson",
    messages: 3,
    description:
      "Trying to exchange GBP to JPY but the transaction keeps failing at the final step. My card has sufficient funds and I've tried multiple times. Error code: CX-ERROR-401.",
  },
  {
    id: "T-2024-007",
    customer: {
      name: "Ahmed Hassan",
      email: "ahmed.hassan@email.com",
      avatar: "AH",
    },
    subject: "Restaurant served wrong order entirely",
    status: "resolved",
    priority: "medium",
    category: "food-orders",
    created: "2024-03-13T19:20:00Z",
    lastReply: "2024-03-14T10:15:00Z",
    assignedTo: "Sarah Wilson",
    messages: 2,
    description:
      "Ordered vegetarian pasta but received chicken curry instead. I'm vegetarian for religious reasons. The restaurant (Spice Garden) acknowledged the mistake. Order #FD-44556.",
  },
];

const TEAM_MEMBERS = [
  { id: "1", name: "Sarah Wilson", role: "Food Service Specialist" },
  { id: "2", name: "Mike Johnson", role: "Currency Exchange Specialist" },
  { id: "3", name: "Lisa Brown", role: "Courier Operations" },
  { id: "4", name: "Tom Anderson", role: "Delivery Coordinator" },
  { id: "5", name: "Rachel Kim", role: "Senior Support Manager" },
];

const CATEGORIES = [
  { id: "food-orders", label: "Food Orders", icon: ShopOutlined },
  { id: "food-delivery", label: "Food Delivery", icon: TruckOutlined },
  { id: "courier-pickup", label: "Courier Pickup", icon: CodeSandboxOutlined },
  {
    id: "courier-delivery",
    label: "Courier Delivery",
    icon: EnvironmentOutlined,
  },
  { id: "currency-exchange", label: "Currency Exchange", icon: DollarOutlined },
  { id: "payments", label: "Payments & Billing", icon: CreditCardOutlined },
  { id: "account", label: "Account Issues", icon: UserOutlined },
  { id: "technical", label: "Technical Issues", icon: SettingOutlined },
];

const StatCard = ({ icon: Icon, title, value, color }) => (
  <Card>
    <Card.Meta
      title={
        <Space>
          <Icon style={{ color }} /> {title}
        </Space>
      }
      description={
        <Title level={3} style={{ color }}>
          {value}
        </Title>
      }
    />
  </Card>
);

const Support = () => {
  const [tickets, setTickets] = useState(SUPPORT_TICKETS);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [replyMessage, setReplyMessage] = useState("");

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || ticket.status === statusFilter;
    const matchesPriority =
      priorityFilter === "all" || ticket.priority === priorityFilter;
    const matchesCategory =
      categoryFilter === "all" || ticket.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "open":
        return "red";
      case "in-progress":
        return "blue";
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
        return "blue";
      case "low":
        return "green";
      default:
        return "default";
    }
  };

  const getCategoryIcon = (category) => {
    const categoryData = CATEGORIES.find((cat) => cat.id === category);
    const Icon = categoryData?.icon || MessageOutlined;
    return <Icon />;
  };

  const handleAssignTicket = (ticketId, assigneeId) => {
    const assignee = TEAM_MEMBERS.find((member) => member.id === assigneeId);
    setTickets(
      tickets.map((ticket) =>
        ticket.id === ticketId
          ? { ...ticket, assignedTo: assignee?.name || null }
          : ticket
      )
    );
    message.success("Ticket assigned successfully");
  };

  const handleStatusChange = (ticketId, newStatus) => {
    setTickets(
      tickets.map((ticket) =>
        ticket.id === ticketId ? { ...ticket, status: newStatus } : ticket
      )
    );
    message.success("Ticket status updated");
  };

  const handleSendReply = () => {
    if (!replyMessage.trim()) return;
    message.success("Reply sent successfully");
    setReplyMessage("");
  };

  // Stats
  const totalTickets = tickets.length;
  const openTickets = tickets.filter((t) => t.status === "open").length;
  const inProgressTickets = tickets.filter(
    (t) => t.status === "in-progress"
  ).length;
  const resolvedTickets = tickets.filter((t) => t.status === "resolved").length;
  const foodTickets = tickets.filter((t) =>
    t.category.startsWith("food")
  ).length;
  const courierTickets = tickets.filter((t) =>
    t.category.startsWith("courier")
  ).length;
  const currencyTickets = tickets.filter(
    (t) => t.category === "currency-exchange"
  ).length;

  const statCards = [
    {
      icon: MessageOutlined,
      title: "Total Tickets",
      value: totalTickets,
      color: undefined,
    },
    {
      icon: ExclamationCircleOutlined,
      title: "Open",
      value: openTickets,
      color: "red",
    },
    {
      icon: ClockCircleOutlined,
      title: "In Progress",
      value: inProgressTickets,
      color: "#1890ff",
    },
    {
      icon: CheckCircleOutlined,
      title: "Resolved",
      value: resolvedTickets,
      color: "green",
    },
    {
      icon: ShopOutlined,
      title: "Food",
      value: foodTickets,
      color: "#fa8c16",
    },
    {
      icon: CodeSandboxOutlined,
      title: "Courier",
      value: courierTickets,
      color: "#1890ff",
    },
  ];

  const columns = [
    {
      title: "Customer",
      dataIndex: "customer",
      width: 200,
      render: (customer) => (
        <Space>
          <Avatar>{customer.avatar}</Avatar>
          <div>
            <div>{customer.name}</div>
            <Text type="secondary">{customer.email}</Text>
          </div>
        </Space>
      ),
    },
    {
      title: "Subject",
      dataIndex: "subject",
      width: 250,
      render: (subject, record) => (
        <div>
          <div style={{ whiteSpace: "normal", wordBreak: "break-word" }}>
            {subject}
          </div>
          <Text type="secondary">{record.id}</Text>
        </div>
      ),
    },
    {
      title: "Service",
      dataIndex: "category",
      width: 150,
      render: (category) => {
        const categoryData = CATEGORIES.find((cat) => cat.id === category);
        return (
          <Space>
            {getCategoryIcon(category)}
            <span>{categoryData?.label}</span>
          </Space>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      width: 120,
      render: (status) => (
        <Badge color={getStatusColor(status)}>{status.replace("-", " ")}</Badge>
      ),
    },
    {
      title: "Priority",
      dataIndex: "priority",
      width: 120,
      render: (priority) => (
        <Badge color={getPriorityColor(priority)}>{priority}</Badge>
      ),
    },
    {
      title: "Assigned To",
      dataIndex: "assignedTo",
      width: 150,
      render: (assignedTo) => assignedTo || <Badge>Unassigned</Badge>,
    },
    {
      title: "Created",
      dataIndex: "created",
      width: 120,
      render: (created) => new Date(created).toLocaleDateString(),
    },
    {
      title: "Messages",
      dataIndex: "messages",
      width: 100,
      render: (messages) => (
        <Space>
          <MessageOutlined />
          <span>{messages}</span>
        </Space>
      ),
    },
    {
      title: "Actions",
      width: 250,
      render: (_, record) => (
        <Space wrap>
          <Button
            type="link"
            onClick={() => {
              setSelectedTicket(record);
              setIsModalOpen(true);
            }}
          >
            View
          </Button>
          <Select
            placeholder="Assign"
            style={{ width: 100 }}
            onChange={(value) => handleAssignTicket(record.id, value)}
          >
            {TEAM_MEMBERS.map((member) => (
              <Select.Option key={member.id} value={member.id}>
                {member.name}
              </Select.Option>
            ))}
          </Select>
          <Select
            placeholder="Status"
            style={{ width: 100 }}
            onChange={(value) => handleStatusChange(record.id, value)}
          >
            <Select.Option value="open">Open</Select.Option>
            <Select.Option value="in-progress">In Progress</Select.Option>
            <Select.Option value="resolved">Resolved</Select.Option>
          </Select>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ background: "#fff", minHeight: "100vh", padding: "16px" }}>
      <Title
        level={3}
        style={{
          fontWeight: 400,
          fontSize: 24,
          fontFamily: "NeueHaasDisplayBold",
        }}
      >
        Support{" "}
      </Title>
      <Text type="secondary">
        Manage customer support for food delivery, courier services, and
        currency exchange
      </Text>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: "10px",
          margin: "16px 0",
          overflowX: "auto",
        }}
      >
        {statCards.map((card, index) => (
          <StatCard
            key={index}
            icon={card.icon}
            title={card.title}
            value={card.value}
            color={card.color}
          />
        ))}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "16px",
          marginBottom: "24px",
          overflowX: "auto",
        }}
      >
        <Card>
          <Card.Meta
            title={
              <Space>
                <ShopOutlined style={{ color: "#fa8c16" }} /> Food Services
              </Space>
            }
            description={
              <>
                <Title level={3} style={{ color: "#fa8c16" }}>
                  {foodTickets}
                </Title>
                <Text type="secondary">Orders & Delivery Issues</Text>
              </>
            }
          />
        </Card>
        <Card>
          <Card.Meta
            title={
              <Space>
                <CodeSandboxOutlined style={{ color: "#1890ff" }} /> Courier
                Services
              </Space>
            }
            description={
              <>
                <Title level={3} style={{ color: "#1890ff" }}>
                  {courierTickets}
                </Title>
                <Text type="secondary">Pickup & Delivery Issues</Text>
              </>
            }
          />
        </Card>
        <Card>
          <Card.Meta
            title={
              <Space>
                <DollarOutlined style={{ color: "#52c41a" }} /> Currency
                Exchange
              </Space>
            }
            description={
              <>
                <Title level={3} style={{ color: "#52c41a" }}>
                  {currencyTickets}
                </Title>
                <Text type="secondary">Exchange & Transaction Issues</Text>
              </>
            }
          />
        </Card>
      </div>

      <Card>
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <Space wrap style={{ overflowX: "auto", paddingBottom: "8px" }}>
            <Input
              prefix={<SearchOutlined />}
              placeholder="Search tickets, customers, or issues..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ minWidth: 200, maxWidth: 300 }}
            />
            <Select
              value={categoryFilter}
              onChange={setCategoryFilter}
              style={{ minWidth: 140, maxWidth: 180 }}
              placeholder="Service Category"
            >
              <Select.Option value="all">All Services</Select.Option>
              {CATEGORIES.map((category) => (
                <Select.Option key={category.id} value={category.id}>
                  {category.label}
                </Select.Option>
              ))}
            </Select>
            <Select
              value={statusFilter}
              onChange={setStatusFilter}
              style={{ minWidth: 120, maxWidth: 140 }}
              placeholder="Status"
            >
              <Select.Option value="all">All Status</Select.Option>
              <Select.Option value="open">Open</Select.Option>
              <Select.Option value="in-progress">In Progress</Select.Option>
              <Select.Option value="resolved">Resolved</Select.Option>
            </Select>
            <Select
              value={priorityFilter}
              onChange={setPriorityFilter}
              style={{ minWidth: 120, maxWidth: 140 }}
              placeholder="Priority"
            >
              <Select.Option value="all">All Priority</Select.Option>
              <Select.Option value="high">High</Select.Option>
              <Select.Option value="medium">Medium</Select.Option>
              <Select.Option value="low">Low</Select.Option>
            </Select>
          </Space>
          <div style={{ overflowX: "auto" }}>
            <Table
              columns={columns}
              dataSource={filteredTickets}
              rowKey="id"
              pagination={false}
              scroll={{ x: 1200 }}
            />
          </div>
        </Space>
      </Card>

      <Modal
        title={selectedTicket?.subject}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width="90%"
        style={{ maxWidth: 800 }}
      >
        {selectedTicket && (
          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            <Space wrap>
              <Text>{selectedTicket.id}</Text>
              <Badge color={getStatusColor(selectedTicket.status)}>
                {selectedTicket.status.replace("-", " ")}
              </Badge>
              <Badge color={getPriorityColor(selectedTicket.priority)}>
                {selectedTicket.priority} priority
              </Badge>
            </Space>
            <Card>
              <Card.Meta
                avatar={<Avatar icon={<UserOutlined />} />}
                title={selectedTicket.customer.name}
                description={
                  <Space wrap>
                    <MailOutlined />
                    <Text>{selectedTicket.customer.email}</Text>
                    <Button type="primary" icon={<MailOutlined />}>
                      Email
                    </Button>
                    <Button type="primary" icon={<PhoneOutlined />}>
                      Call
                    </Button>
                  </Space>
                }
              />
            </Card>
            <Card>
              <Card.Meta
                title="Original Message"
                description={
                  <>
                    <Text>
                      Created on{" "}
                      {new Date(selectedTicket.created).toLocaleString()}
                    </Text>
                    <p style={{ whiteSpace: "pre-wrap" }}>
                      {selectedTicket.description}
                    </p>
                  </>
                }
              />
            </Card>
            <Card>
              <Card.Meta
                title="Send Reply"
                description={
                  <Form layout="vertical">
                    <Form.Item>
                      <Input.TextArea
                        value={replyMessage}
                        onChange={(e) => setReplyMessage(e.target.value)}
                        placeholder="Type your reply to the customer..."
                        rows={4}
                      />
                    </Form.Item>
                    <Form.Item>
                      <Space wrap>
                        <Select
                          placeholder="Change status"
                          style={{ width: 140 }}
                          onChange={(value) =>
                            handleStatusChange(selectedTicket.id, value)
                          }
                        >
                          <Select.Option value="open">Open</Select.Option>
                          <Select.Option value="in-progress">
                            In Progress
                          </Select.Option>
                          <Select.Option value="resolved">
                            Resolved
                          </Select.Option>
                        </Select>
                        <Button
                          type="primary"
                          icon={<SendOutlined />}
                          onClick={handleSendReply}
                        >
                          Send Reply
                        </Button>
                      </Space>
                    </Form.Item>
                  </Form>
                }
              />
            </Card>
          </Space>
        )}
      </Modal>
    </div>
  );
};

export default Support;
