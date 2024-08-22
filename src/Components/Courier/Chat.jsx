import { Avatar, Input, Button, List } from "antd";
import { UserOutlined } from "@ant-design/icons";

const messages = [
  {
    id: 1,
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus.",
    time: "12:03",
    align: "left",
  },
  {
    id: 2,
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus.",
    time: "12:04",
    align: "right",
  },
];

const Chat = () => {
  return (
    <div
      style={{
        width: "350px",
        margin: "0 auto",
        backgroundColor: "#f0f0f0",
        padding: "16px",
        borderRadius: "8px",
      }}
    >
      <List
        itemLayout="horizontal"
        dataSource={messages}
        renderItem={(message) => (
          <List.Item
            style={{
              display: "flex",
              justifyContent:
                message.align === "right" ? "flex-end" : "flex-start",
              marginBottom: "12px",
            }}
          >
            <List.Item.Meta
              description={
                <div
                  style={{
                    backgroundColor:
                      message.align === "right" ? "#f5f5f5" : "#e6f7ff",
                    padding: "12px",
                    borderRadius: "12px",
                    maxWidth: "70%",
                  }}
                >
                  <p>{message.content}</p>
                  <span
                    style={{
                      display: "block",
                      fontSize: "12px",
                      marginTop: "8px",
                      textAlign: "right",
                    }}
                  >
                    {message.time}
                  </span>
                </div>
              }
            />
          </List.Item>
        )}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "16px",
        }}
      >
        <Input
          placeholder="Type your message here"
          style={{ flex: 1, marginRight: "8px" }}
        />
        <Button type="primary">Send</Button>
      </div>
    </div>
  );
};

export default Chat;
