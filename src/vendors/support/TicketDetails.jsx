import { useEffect, useRef } from "react";
import { Card, Avatar, Typography, Divider, Input, Button, Space } from "antd";
import PropTypes from "prop-types";
import {
  UserOutlined,
  SendOutlined,
  CheckCircleOutlined,
  PaperClipOutlined,
} from "@ant-design/icons";

const { Text, Paragraph } = Typography;

const isImageAttachment = (msg) => {
  const mime = String(msg?.attachmentMime || "").toLowerCase();
  if (mime.startsWith("image/")) return true;
  const url = String(msg?.attachmentUrl || "").toLowerCase();
  return [".jpg", ".jpeg", ".png", ".gif", ".webp", ".bmp"].some((ext) => url.includes(ext));
};

const TicketDetails = ({
  ticket,
  onSendReply,
  onMarkResolved,
  replyMessage,
  setReplyMessage,
  replyAttachment,
  setReplyAttachment,
  isSubmitting = false,
  typingIndicator = "",
}) => {
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    if (!messagesContainerRef.current) return;
    messagesContainerRef.current.scrollTop =
      messagesContainerRef.current.scrollHeight;
  }, [ticket?.id, ticket?.messages?.length]);

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

        <div ref={messagesContainerRef} style={{ maxHeight: 300, overflowY: "auto" }}>
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
                {msg.attachmentUrl ? (
                  <div style={{ marginBottom: 8 }}>
                    {isImageAttachment(msg) ? (
                      <a href={msg.attachmentUrl} target="_blank" rel="noreferrer">
                        <img
                          src={msg.attachmentUrl}
                          alt={msg.attachmentName || "attachment"}
                          style={{ maxWidth: 220, borderRadius: 8, border: "1px solid #f0f0f0" }}
                        />
                      </a>
                    ) : (
                      <a href={msg.attachmentUrl} target="_blank" rel="noreferrer">
                        <PaperClipOutlined /> {msg.attachmentName || "View attachment"}
                      </a>
                    )}
                  </div>
                ) : null}
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
            <input
              type="file"
              onChange={(event) => {
                const file = event.target.files?.[0] || null;
                setReplyAttachment(file);
              }}
            />
            {replyAttachment ? (
              <Text type="secondary">Attachment: {replyAttachment.name}</Text>
            ) : null}
            <Button
              type="primary"
              icon={<SendOutlined />}
              onClick={onSendReply}
              disabled={!replyMessage.trim() && !replyAttachment}
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
        attachmentUrl: PropTypes.string,
        attachmentName: PropTypes.string,
        attachmentMime: PropTypes.string,
        timestamp: PropTypes.string,
      })
    ),
  }),
  onSendReply: PropTypes.func.isRequired,
  onMarkResolved: PropTypes.func.isRequired,
  replyMessage: PropTypes.string.isRequired,
  setReplyMessage: PropTypes.func.isRequired,
  replyAttachment: PropTypes.oneOfType([
    PropTypes.shape({ name: PropTypes.string }),
    PropTypes.oneOf([null]),
  ]),
  setReplyAttachment: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool,
  typingIndicator: PropTypes.string,
};
