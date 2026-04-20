import { Card, Avatar, Typography, Divider, Input, Button, Space } from "antd";
import PropTypes from "prop-types";
import {
  UserOutlined,
  SendOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";

const { Text, Paragraph } = Typography;

const TicketDetails = ({
  ticket,
  onSendReply,
  onMarkResolved,
  replyMessage,
  setReplyMessage,
  isSubmitting = false,
  typingIndicator = "",
}) => {
  if (!ticket)
    return (
      <Card>
        <div style={{ textAlign: "center", padding: "80px 0" }}>
          <Paragraph>Select a ticket to view details</Paragraph>
        </div>
      </Card>
    );

  return (
    <Card
      title={ticket.subject}
      extra={
        ticket.status !== "resolved" && (
          <Button
            type="primary"
            icon={<CheckCircleOutlined />}
            onClick={() => onMarkResolved(ticket.id)}
            loading={isSubmitting}
          >
            Mark Resolved
          </Button>
        )
      }
    >
      <Space direction="vertical" style={{ width: "100%" }}>
        <Card size="small" style={{ background: "#fafafa" }}>
          <Space>
            <Avatar src={ticket.customer.avatar} icon={<UserOutlined />} />
            <div>
              <Text strong>{ticket.customer.name}</Text>
              <Paragraph type="secondary" style={{ marginBottom: 0 }}>
                {ticket.customer.email}
              </Paragraph>
            </div>
          </Space>
        </Card>

        <div style={{ maxHeight: 300, overflowY: "auto" }}>
          {ticket.messages.map((msg) => (
            <div
              key={msg.id}
              style={{
                display: "flex",
                justifyContent:
                  msg.sender === "vendor" ? "flex-end" : "flex-start",
                marginBottom: 12,
              }}
            >
              <div
                style={{
                  background: msg.sender === "vendor" ? "#e6fffb" : "#fafafa",
                  padding: "10px 14px",
                  borderRadius: 10,
                  maxWidth: "80%",
                }}
              >
                <Text strong>{msg.senderName}</Text>
                <Paragraph style={{ marginBottom: 4 }}>{msg.message}</Paragraph>
                <Text type="secondary" style={{ fontSize: 12 }}>
                  {new Date(msg.timestamp).toLocaleString()}
                </Text>
              </div>
            </div>
          ))}
        </div>

        {ticket.status !== "resolved" && (
          <>
            {typingIndicator ? (
              <Text type="secondary" style={{ fontStyle: "italic" }}>
                {typingIndicator}
              </Text>
            ) : null}
            <Divider />
            <Input.TextArea
              rows={3}
              placeholder="Type your reply..."
              value={replyMessage}
              onChange={(e) => setReplyMessage(e.target.value)}
            />
            <Button
              type="primary"
              icon={<SendOutlined />}
              onClick={onSendReply}
              disabled={!replyMessage.trim()}
              loading={isSubmitting}
            >
              Send Reply
            </Button>
          </>
        )}
      </Space>
    </Card>
  );
};

export default TicketDetails;

TicketDetails.propTypes = {
  ticket: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    subject: PropTypes.string,
    status: PropTypes.string,
    customer: PropTypes.shape({
      avatar: PropTypes.string,
      name: PropTypes.string,
      email: PropTypes.string,
    }),
    messages: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        sender: PropTypes.string,
        senderName: PropTypes.string,
        message: PropTypes.string,
        timestamp: PropTypes.string,
      })
    ),
  }),
  onSendReply: PropTypes.func.isRequired,
  onMarkResolved: PropTypes.func.isRequired,
  replyMessage: PropTypes.string.isRequired,
  setReplyMessage: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool,
  typingIndicator: PropTypes.string,
};
