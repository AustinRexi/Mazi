import { useState } from "react";
import { Card, Avatar, Typography, Button, Modal, Dropdown, Menu } from "antd";
import call from "../../Assets/Couriericons/call.svg";
import message from "../../Assets/Couriericons/message.svg";
import CallingCard from "./CallingCard";
import Chat from "../Courier/Chat";
import options from "../../Assets/Couriericons/options.svg";
import "../../Mobile/Courier.css";

const { Text } = Typography;

const UserCard = ({ datas }) => {
  const [isCallingModalVisible, setIsCallingModalVisible] = useState(false);
  const [isChatModalVisible, setIsChatModalVisible] = useState(false);
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);

  const showCallingModal = () => setIsCallingModalVisible(true);
  const hideCallingModal = () => setIsCallingModalVisible(false);

  const showChatModal = () => setIsChatModalVisible(true);
  const hideChatModal = () => setIsChatModalVisible(false);

  const menu = (
    <Menu
      items={[
        { key: "1", label: "View" },
        { key: "2", label: "Remove" },
        { key: "3", label: "Pay now" },
      ]}
    />
  );

  return (
    <>
      <style>
        {`
          @keyframes blink {
            50% { opacity: 0; }
          }
          .green-modal .ant-modal-content {
            background-color: #006D75 !important;
          }
        `}
      </style>

      <Card
      className="user-card"
        hoverable
        
        /*
        style={{
          width: "250px",
          maxWidth: "100%",
          borderRadius: "10px",
          borderColor: "#f0f0f0",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          position: "relative",
        }}
        */
        onMouseEnter={() => setIsOptionsVisible(true)}
        onMouseLeave={() => setIsOptionsVisible(false)}
      >
        <div className="courier-card"
        style={{ display: "flex", justifyContent: "space-between",}}>
          <img src={datas.status} alt="status" />
          <Text
            type="secondary"
            style={{
              fontSize: "12px",
              fontWeight: 600,
              lineHeight: "16px",
              color: "#838D8D",
             

            }}
          >
            {datas.title}
          </Text>
          {isOptionsVisible && (
            <Dropdown
              overlay={menu}
              trigger={["click"]}
              placement="bottomRight"
            >
              <img
                src={options}
                alt="options"
                style={{
                  position: "absolute",
                  top: 20,
                  right: 3,
                  cursor: "pointer",
                }}
              />
            </Dropdown>
          )}
        </div>

        <div
        className="courier-card"
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: "10px",
          }}
        >
          <Avatar size={64} src={datas.dp} style={{ marginRight: "15px" }} />
          <div>
            <Text
              strong
              style={{
                fontSize: "16px",
                fontWeight: 500,
                lineHeight: "24px",
                color: "#121515",
              }}
            >
              {datas.name}
            </Text>
            <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
              <img src={datas.rating.icon} alt="rating-icon" />
              <strong
                style={{
                  lineHeight: "24px",
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "#545E5E",
                }}
              >
                4.8
              </strong>
              <Text type="secondary">(196)</Text>
            </div>
          </div>
        </div>

        <div
        className="courier-card"
          style={{
            marginTop: "15px",
            borderTop: "1px solid #f0f0f0",
            paddingTop: "10px",
          }}
        >
          <Text style={{ display: "flex", alignItems: "center" }}>
            <img
              src={datas.email.icon}
              alt="email-icon"
              style={{ marginRight: "8px" }}
            />
            {datas.email.address}
          </Text>
          <br />
          <Text style={{ display: "flex", alignItems: "center" }}>
            <img
              src={datas.phone.icon}
              alt="phone-icon"
              style={{ marginRight: "8px" }}
            />
            {datas.phone.mobile}
          </Text>

          <div
            style={{
              marginTop: "15px",
              borderTop: "1px solid #f0f0f0",
              paddingTop: "14px",
            }}
          >
            <Text>
              <strong>Vehicle ({datas.title})</strong>
            </Text>
            <br />
            <Text>{datas.model.name}</Text>
            <Text
              style={{
                float: "right",
                color: "#121515",
                fontWeight: 700,
                fontSize: "14px",
                lineHeight: "20px",
              }}
            >
              {datas.model.color}
            </Text>
            <br />
            <Text>
              {datas.drive.item}
              <strong
                style={{
                  float: "right",
                  color: "#121515",
                  fontWeight: 700,
                  lineHeight: "20px",
                  fontSize: "14px",
                }}
              >
                {datas.drive.value}
              </strong>
            </Text>
          </div>
        </div>

        <div
        className="courier-card"
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "20px",
            gap: 2,
            opacity: isOptionsVisible ? 1 : 0,
            transition: "opacity 0.3s ease-in-out",
            
          }}
        >
          <Button
            type="primary"
            style={{ backgroundColor: "#055961", width: "50%" }}
            onClick={showCallingModal}
          >
            <img src={call} alt="call-icon" />
          </Button>
          <Button
            type="primary"
            style={{ backgroundColor: "#067782", width: "50%" }}
            onClick={showChatModal}
          >
            <img src={message} alt="message-icon" />
          </Button>
        </div>
      </Card>

      <Modal
        open={isCallingModalVisible}
        onOk={hideCallingModal}
        onCancel={hideCallingModal}
        wrapClassName="green-modal"
        footer={null}
        closable={false}
        style={{
          top: 20,
          right: 20,
          position: "absolute",
        }}
      >
        <CallingCard />
      </Modal>

      <Modal
        open={isChatModalVisible}
        onOk={hideChatModal}
        onCancel={hideChatModal}
        footer={null}
        closable={false}
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
        mask={false}
      >
        <Chat />
      </Modal>
    </>
  );
};

export default UserCard;
