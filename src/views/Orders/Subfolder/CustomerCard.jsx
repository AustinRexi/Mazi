import { Card, Avatar, Typography, Button, Divider } from "antd";
import { MailOutlined, PhoneOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const CustomerCard = () => {
  return (
    <Card
      style={{
        width: 300,
        borderRadius: 8,
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
        <Avatar size={48} style={{ backgroundColor: "#00B2A9" }}>
          US
        </Avatar>
        <div style={{ marginLeft: 16 }}>
          <Typography.Title level={5} style={{ margin: 0 }}>
            Usman Salawatu
          </Typography.Title>
          <Typography.Text type="secondary">
            Joined {dayjs("2024-03-16").format("MMM D, YYYY")}
          </Typography.Text>
        </div>
      </div>

      <Divider />

      <div style={{ marginBottom: 16 }}>
        <Typography.Text strong>Contact Info</Typography.Text>
        <div style={{ display: "flex", alignItems: "center", marginTop: 8 }}>
          <MailOutlined style={{ marginRight: 8 }} />
          <Typography.Text>tiamiyu.w.o@gmail.com</Typography.Text>
        </div>
        <div style={{ display: "flex", alignItems: "center", marginTop: 8 }}>
          <PhoneOutlined style={{ marginRight: 8 }} />
          <Typography.Text>08160178711</Typography.Text>
        </div>
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <Button type="default" style={{ flex: 1 }}>
          Message
        </Button>
        <Button type="primary" style={{ flex: 1 }}>
          Call
        </Button>
      </div>

      <Divider />

      <div>
        <Typography.Text strong>Address</Typography.Text>
        <div style={{ marginTop: 8 }}>
          <Typography.Text>17 Simbiat Abiola Way</Typography.Text>
          <br />
          <Typography.Text>Ikeja, Lagos</Typography.Text>
          <br />
          <Typography.Paragraph
            style={{
              width: "256px",
              marginTop: 8,
              border: "1px solid #B5C3C3",
              borderRadius: "12px",
              padding: 6,
            }}
          >
            Street Opposite Access Bank beside the yellow mall.
          </Typography.Paragraph>
        </div>
      </div>
    </Card>
  );
};

export default CustomerCard;
