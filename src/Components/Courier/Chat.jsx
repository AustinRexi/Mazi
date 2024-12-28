import { useState } from "react";
import { Avatar, Space, Typography, Card, Input, Button, Divider } from "antd";
import { CloseCircleOutlined, SendOutlined } from "@ant-design/icons";
import options from "../../Assets/Couriericons/options.svg";
import star from "../../Assets/Foodicons/Star.svg";
import dp from "../../Assets/Ordericons/displayimageicon.svg";

const { TextArea } = Input;

const Chat = ({ hideModal }) => {
  const [position, setPosition] = useState("end");

  return (
    <div
      style={{
        maxWidth: "550px",
        margin: "0 auto",
        border: "none",
        borderRadius: "8px",

        background: "#fff",
      }}
    >
      <Card
        style={{
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          width: "100%",
          marginBottom: "10px",
        }}
      >
        <Space align="center" size="medium" style={{ gap: 17 }}>
          <Avatar src={dp} size={40} />
          <Typography.Text strong>Tiamiyu Wasiu</Typography.Text>
          <Typography.Text type="secondary">
            Joined Mar. 16, 2024
          </Typography.Text>
          <img src={options} alt="options" />
          <img src={star} alt="star" />
          <CloseCircleOutlined
            style={{ fontSize: "24px", cursor: "pointer" }}
            onClick={hideModal}
          />
        </Space>
      </Card>

      <div>
        <div
          style={{
            marginBottom: "16px",
            textAlign: "center",
            color: "#bfbfbf",
          }}
        >
          <Typography.Text>September 05, 2023</Typography.Text>
        </div>

        <div style={{ marginBottom: "16px" }}>
          <div
            style={{
              background: "#e6f7ff",
              padding: "10px 16px",
              borderRadius: "12px",
              marginBottom: "8px",
              width: "350px",
            }}
          >
            <Typography.Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
              turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus
              nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum
              tellus elit sed risus. Maecenas eget condimentum velit, sit amet
              feugiat lectus. Class aptent taciti sociosqu ad litora torquent
              per conubia nostra, per inceptos himenaeos. Praesent auctor purus
              luctus enim egestas, ac scelerisque ante.
            </Typography.Text>
          </div>
          <Typography.Text style={{ color: "#bfbfbf" }}>12:03</Typography.Text>
        </div>

        <div style={{ marginBottom: "16px", textAlign: "right" }}>
          <div
            style={{
              background: "#f5f5f5",
              padding: "10px 16px",
              borderRadius: "12px",
              marginBottom: "8px",
              width: "300px",
              marginLeft: "auto",
            }}
          >
            <Typography.Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
              turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus
              nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum
              tellus elit sed risus.
            </Typography.Text>
          </div>
          <Typography.Text style={{ color: "#bfbfbf" }}>12:04</Typography.Text>
        </div>

        <div
          style={{
            borderTop: "1px solid #d9d9d9",
            paddingTop: "12px",
            borderBottom: "1px solid #d9d9d9",
          }}
        >
          <Space direction="horizontal" style={{ width: "100%" }}>
            <TextArea
              placeholder="Type your message here"
              autoSize={{ minRows: 1, maxRows: 2 }}
              style={{ width: "300px", border: "none", marginLeft: 2 }}
            />
            <Button
              type="primary"
              iconPosition={position}
              icon={<SendOutlined />}
              style={{ marginBottom: "8px" }}
            >
              Send
            </Button>
          </Space>
          {/* <Divider /> */}
        </div>
      </div>
    </div>
  );
};

export default Chat;
