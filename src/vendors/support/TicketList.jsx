import {
  Card,
  Input,
  Select,
  Tag,
  Avatar,
  Typography,
  Space,
  Divider,
} from "antd";
import {
  SearchOutlined,
  MessageOutlined,
  CalendarOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { Option } = Select;
const { Text, Paragraph } = Typography;

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

const TicketList = ({
  tickets,
  selectedTicket,
  onSelect,
  searchQuery,
  onSearch,
  statusFilter,
  onStatusChange,
  priorityFilter,
  onPriorityChange,
}) => (
  <Card title="Support Tickets">
    <Space direction="vertical" style={{ width: "100%" }}>
      <Input
        prefix={<SearchOutlined />}
        placeholder="Search tickets..."
        value={searchQuery}
        onChange={(e) => onSearch(e.target.value)}
      />
      <Space>
        <Select
          value={statusFilter}
          onChange={onStatusChange}
          style={{ width: 150 }}
        >
          <Option value="all">All Status</Option>
          <Option value="open">Open</Option>
          <Option value="in-progress">In Progress</Option>
          <Option value="resolved">Resolved</Option>
        </Select>
        <Select
          value={priorityFilter}
          onChange={onPriorityChange}
          style={{ width: 150 }}
        >
          <Option value="all">All Priority</Option>
          <Option value="high">High</Option>
          <Option value="medium">Medium</Option>
          <Option value="low">Low</Option>
        </Select>
      </Space>
    </Space>

    <Divider />

    <Space direction="vertical" style={{ width: "100%" }}>
      {tickets.map((ticket) => (
        <Card
          key={ticket.id}
          hoverable
          onClick={() => onSelect(ticket)}
          style={{
            background: selectedTicket?.id === ticket.id ? "#f6ffed" : "#fff",
          }}
        >
          <Space direction="vertical" style={{ width: "100%" }}>
            <Space align="start">
              <Avatar src={ticket.customer.avatar} icon={<UserOutlined />} />
              <div>
                <Text strong>{ticket.customer.name}</Text>
                <Paragraph type="secondary" style={{ marginBottom: 0 }}>
                  {ticket.subject}
                </Paragraph>
                <Tag color={getStatusColor(ticket.status)}>{ticket.status}</Tag>
                <Tag color={getPriorityColor(ticket.priority)}>
                  {ticket.priority}
                </Tag>
                {ticket.hasUnreadReply ? (
                  <Tag color="red">
                    NEW
                    {ticket.unreadMessagesCount > 0
                      ? ` (${ticket.unreadMessagesCount})`
                      : ""}
                  </Tag>
                ) : null}
              </div>
            </Space>
            <Space
              style={{
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Text type="secondary">
                <MessageOutlined /> {ticket.messages.length} messages
              </Text>
              <Text type="secondary">
                <CalendarOutlined />{" "}
                {new Date(ticket.created).toLocaleDateString()}
              </Text>
            </Space>
          </Space>
        </Card>
      ))}
    </Space>
  </Card>
);

export default TicketList;
