import { Card, Avatar, Typography, Button } from "antd";
import {
  PhoneOutlined,
  SoundOutlined,
  AudioMutedOutlined,
} from "@ant-design/icons";
import calling from "../../Assets/Couriericons/calling.svg";

const { Text } = Typography;

const CallingCard = () => {
  const blinkAnimation = {
    "@keyframes blink": {
      "50%": { opacity: 0 },
    },
  };

  return (
    <Card
      style={{
        width: 400,
        borderRadius: "20px",
        textAlign: "center",
        backgroundColor: "#006D75",
      }}
    >
      <style>
        {`
          @keyframes blink {
            50% { opacity: 0; }
          }
        `}
      </style>
      <Avatar size={64} src={calling} style={{ marginBottom: 20 }} />
      <Text
        style={{
          lineHeight: "14px",

          fontSize: "16px",
          display: "block",
          marginBottom: 8,
          color: "#ffffff",
          animation: "blink 0.5s step-start infinite",
        }}
      >
        Calling...
      </Text>
      <Text strong style={{ fontSize: 20, color: "#ffffff" }}>
        Tiamiyu Wasiu
      </Text>

      <div style={{ marginTop: 20 }}>
        <Button
          shape="circle"
          icon={<SoundOutlined />}
          size="large"
          style={{
            margin: "0 20px",
            backgroundColor: "#13C2C2",
            color: "#fff",
          }}
        />
        <Button
          shape="circle"
          icon={<PhoneOutlined />}
          size="large"
          style={{
            backgroundColor: "#F5222D",
            color: "#fff",
            margin: "0 20px",
          }}
        />
        <Button
          shape="circle"
          icon={<AudioMutedOutlined />}
          size="large"
          style={{
            margin: "0 20px",
            backgroundColor: "#13C2C2",
            color: "#fff",
          }}
        />
      </div>

      <div style={{ marginTop: 10 }}>
        <Text style={{ marginRight: "78px", paddingRight: "40px" }}>
          Speaker
        </Text>
        <Text>Mute</Text>
      </div>
    </Card>
  );
};

export default CallingCard;
