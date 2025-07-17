import { Card, Avatar, Typography, Button, Divider } from "antd";

import email from "../../../Assets/Couriericons/mail.svg";
import ModalComponent from "../../../Components/shared/ModalComponent";
import callicon from "../../../Assets/Couriericons/callicon2.svg";
import message from "../../../Assets/Couriericons/messageicon2.svg";
import CallingCard from "../../../Components/Courier/CallingCard";
import Chat from "../../../Components/Courier/Chat";
import { useState } from "react";
import dayjs from "dayjs";
import Address from "./Address";

const CustomerCard = () => {
  const [isCallingModalVisible, setIsCallingModalVisible] = useState(false);
  const [isChatModalVisible, setIsChatModalVisible] = useState(false);

  const showCallingModal = () => setIsCallingModalVisible(true);
  const hideCallingModal = () => setIsCallingModalVisible(false);

  const showChatModal = () => setIsChatModalVisible(true);
  const hideChatModal = () => setIsChatModalVisible(false);
  return (
    <>
      <Card
        style={{
          width: 300,
          borderRadius: 8,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        }}
      >
        <h6
          style={{
            fontFamily: "NeueHaasDisplayBold",
            fontSize: "20px",
            fontWeight: 500,
            lineHeight: "24px",
          }}
        >
          Customer
        </h6>
        <div
          style={{ display: "flex", alignItems: "center", marginBottom: 16 }}
        >
          <Avatar size={48} style={{ backgroundColor: "#00B2A9" }}>
            US
          </Avatar>
          <div style={{ marginLeft: 16 }}>
            <Typography.Title
              level={5}
              style={{
                margin: 0,
                fontWeight: 400,
                fontSize: "20px",
                lineHeight: "24px",
              }}
            >
              Usman Salawatu
            </Typography.Title>
            <Typography.Text
              type="secondary"
              style={{ fontSize: "16px", fontWeight: 500, lineHeight: "24px" }}
            >
              Joined {dayjs("2024-03-16").format("MMM D, YYYY")}
            </Typography.Text>
          </div>
        </div>

        <Divider />

        <div style={{ marginBottom: 16 }}>
          <h6
            style={{
              fontFamily: "NeueHaasDisplayBold",
              fontWeight: 500,
              lineHeight: "24px",
              fontSize: "20px",
            }}
          >
            Contact Info
          </h6>
          <div style={{ display: "flex", alignItems: "center", marginTop: 8 }}>
            <img src={email} alt="mailicon" style={{ marginRight: 8 }} />
            <Typography.Text>tiamiyu.w.o@gmail.com</Typography.Text>
          </div>
          <div style={{ display: "flex", alignItems: "center", marginTop: 8 }}>
            <img src={callicon} alt="callicon" style={{ marginRight: 8 }} />
            <Typography.Text>08160178711</Typography.Text>
          </div>
        </div>

        <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
          <Button
            style={{ flex: 1, backgroundColor: " #C5E7EA" }}
            onClick={showChatModal}
          >
            <img src={message} alt="messageicon" />
            message
          </Button>
          <Button
            style={{ flex: 1, backgroundColor: " #C5E7EA" }}
            onClick={showCallingModal}
          >
            <img src={callicon} alt="messageicon" /> Call
          </Button>
        </div>

        <Divider />
        <Address />
      </Card>
      {isCallingModalVisible && (
        <ModalComponent
          isVisible={isCallingModalVisible}
          hideModal={hideCallingModal}
        >
          <CallingCard hideModal={hideCallingModal} />
        </ModalComponent>
      )}

      {isChatModalVisible && (
        <ModalComponent
          isVisible={isChatModalVisible}
          hideModal={hideChatModal}
          wrapClassName={null}
          style={{
            position: "absolute",
            bottom: 20,
            right: 20,
            width: "400px",
            maxWidth: "100%",
            borderRadius: "8px",
            padding: 0,
          }}
          bodyStyle={{
            padding: "0px",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <Chat hideModal={hideChatModal} />
        </ModalComponent>
      )}
    </>
  );
};

export default CustomerCard;
