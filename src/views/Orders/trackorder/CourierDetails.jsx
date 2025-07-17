import { Card, Avatar, Typography, Button, Row, Col, Modal } from "antd";

import email from "../../../Assets/Couriericons/mail.svg";
import courierdata from "../../../Components/Courier/courierdata";
import callicon from "../../../Assets/Couriericons/callicon2.svg";
import message from "../../../Assets/Couriericons/messageicon2.svg";
import CallingCard from "../../../Components/Courier/CallingCard";
import Chat from "../../../Components/Courier/Chat";
import { useState } from "react";

import Address from "../orderdetails/Address";
import ModalComponent from "../../../Components/shared/ModalComponent";
const { Text } = Typography;
const CourierDetails = () => {
  const [isCallingModalVisible, setIsCallingModalVisible] = useState(false);
  const [isChatModalVisible, setIsChatModalVisible] = useState(false);

  const showCallingModal = () => setIsCallingModalVisible(true);
  const hideCallingModal = () => setIsCallingModalVisible(false);

  const showChatModal = () => setIsChatModalVisible(true);
  const hideChatModal = () => setIsChatModalVisible(false);

  const data = courierdata.find((item) => item.title === "CAR");
  const items = data
    ? {
        icon: data.dp,
        name: data.name,
        rating: data.rating.icon,
        model: data.model,
        drive: data.drive,
      }
    : null;
  const courierNotes =
    "Go to counter 4 on the left where the sign for  “pick up”  is and present the order number.";
  return (
    <>
      {/* <style>
        {`
          @keyframes blink {
            50% { opacity: 0; }
          }
          .green-modal .ant-modal-content {
            background-color: #006D75 !important;
          }
        `}
      </style> */}
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
          Courier
        </h6>

        <div
          style={{ display: "flex", alignItems: "center", marginBottom: 16 }}
        >
          <Avatar size={48} src={items.icon} />

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
              {items.name}
            </Typography.Title>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "9px",
              }}
            >
              <img src={items.rating} alt="rating-icon" />
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
              <Typography.Text type="secondary">(196)</Typography.Text>
            </div>
          </div>
        </div>

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
        <h6
          style={{
            fontFamily: "NeueHaasDisplayBold",
            fontSize: "20px",
            fontWeight: 500,
            lineHeight: "24px",
          }}
        >
          Vehicle
        </h6>

        <Row gutter={[16, 6]} style={{ marginBottom: 6 }}>
          <Col span={18}>
            <Text>{items.model.name}</Text>
          </Col>
          <Col span={6}>
            {" "}
            <Text
              style={{
                color: "#121515",
                fontWeight: 700,
                fontSize: "14px",
                lineHeight: "20px",
              }}
            >
              {items.model.color}
            </Text>
          </Col>
          <Col span={18}>
            <Text>{items.drive.item}</Text>
          </Col>
          <Col span={6}>
            <Text
              style={{
                color: "#121515",
                fontWeight: 700,
                lineHeight: "20px",
                fontSize: "14px",
              }}
            >
              {items.drive.value}
            </Text>
          </Col>
        </Row>

        <Text style={{ marginTop: 4 }}>Note for the courier:</Text>
        <Typography.Paragraph
          style={{
            width: "256px",
            marginTop: 8,
            border: "1px solid #B5C3C3",
            borderRadius: "12px",
            padding: 6,
          }}
        >
          {courierNotes}
        </Typography.Paragraph>

        <Address
          style={{
            fontSize: "20px",
            fontWeight: 500,
            fontFamily: "NeueHaasDisplayBold",
            lineHeight: "24px",
          }}
          title="Delivery Address"
          info="Additional info"
        />
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

export default CourierDetails;
