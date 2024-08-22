import React, { useState } from "react";
import { Card, Avatar, Rate, Typography, Button, Modal } from "antd";
import call from "../../Assets/Couriericons/call.svg";
import message from "../../Assets/Couriericons/message.svg";
import CallingCard from "./CallingCard"; // Import the CallingCard component

const { Text } = Typography;

const UserCard = ({ datas }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Card
        hoverable
        style={{
          width: 299,
          borderRadius: "10px",
          borderColor: "#f0f0f0",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
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
        </div>
        <div
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
              <Rate disabled defaultValue={4} style={{ fontSize: "14px" }} />
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
          style={{
            marginTop: "15px",
            borderTop: "1px solid #f0f0f0",
            paddingTop: "10px",
          }}
        >
          <Text style={{ display: "flex" }}>
            <img
              src={datas.email.icon}
              alt="email-icon"
              style={{ marginRight: "8px" }}
            />
            {datas.email.address}
          </Text>
          <br />
          <Text style={{ display: "flex" }}>
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
              paddingTop: "10px",
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
        <div style={{ width: "229px", height: "36px", borderRadius: "4px" }}>
          <Button
            type="primary"
            style={{ backgroundColor: "#055961", width: "114.5px" }}
            onClick={showModal}
          >
            <img src={call} alt="call-icon" />
          </Button>
          <Button
            type="primary"
            href="sms:08160178711"
            style={{ backgroundColor: "#067782", width: "114.5px" }}
          >
            <img src={message} alt="message-icon" />
          </Button>
        </div>
      </Card>

      <Modal
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
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
    </>
  );
};

export default UserCard;
