import { useState, useEffect } from "react";
import {
  Card,
  Avatar,
  Typography,
  Button,
  Checkbox,
  Divider,
  Row,
  Col,
} from "antd";
import minimize from "../../../../Assets/Calendaricon/minimizeicon.svg";
import ModalComponent from "../../../../Components/shared/ModalComponent";
import FulfillCard from "./FulfillCard";
const { Title, Text } = Typography;

const ProceedCard = ({ hideModal }) => {
  const [timeLeft, setTimeLeft] = useState(960);
  const [confirmed, setConfirmed] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return {
      minutes: String(minutes).padStart(2, "0"),
      seconds: String(secs).padStart(2, "0"),
    };
  };

  const { minutes, seconds } = formatTime(timeLeft);

  return (
    <Card
      style={{
        width: 600,
        height: isMinimized ? 100 : 600, // Adjust height when minimized
        margin: 0,
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        overflow: "hidden",
        transition: "height 0.3s ease",
      }}
    >
      <Row gutter={[16, 16]}>
        <Col span={10}>
          <div
            style={{ display: "flex", alignItems: "center", marginBottom: 16 }}
          >
            <Avatar size={32} style={{ backgroundColor: "#00B2A9" }}>
              US
            </Avatar>
            <div style={{ marginLeft: 16 }}>
              <Typography.Title
                level={5}
                style={{
                  margin: 0,
                  fontWeight: 600,
                  fontSize: "16px",
                  lineHeight: "24px",
                }}
              >
                Usman Salawatu
              </Typography.Title>
            </div>
          </div>
        </Col>
        <Col span={8}></Col>
        <Col span={6}>
          <div
            style={{ display: "flex", gap: 6, cursor: "pointer" }}
            onClick={() => setIsMinimized(!isMinimized)} // Toggle minimize state
          >
            <Avatar src={minimize} size={24} />
            <Typography.Title
              level={5}
              style={{ fontWeight: 400, fontSize: "16px", lineHeight: "24px" }}
            >
              {isMinimized ? "Maximize" : "Minimize"}
            </Typography.Title>
          </div>
        </Col>
      </Row>

      {!isMinimized && ( // Hide content when minimized
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#FEE7D7",
              borderRadius: "8px",
              padding: "20px 0",
              marginBottom: 20,
            }}
          >
            <Row gutter={[16, 16]}>
              <Col span={3}></Col>
              <Col span={20}>
                <h5
                  style={{
                    fontSize: "24px",
                    fontWeight: 600,
                    lineHeight: "32px",
                  }}
                >
                  Estimated time (16mins) 10:15 to 10:31
                </h5>
              </Col>

              <Col span={4}></Col>
              <Col
                span={16}
                style={{
                  display: "flex",
                  gap: 10,
                  justifyContent: "center",
                  alignContent: "center",
                }}
              >
                <Title
                  level={1}
                  style={{
                    margin: 0,
                    border: "1.23px solid #FFFFFF",
                    width: "100px",
                    height: "52px",
                    backgroundColor: "#FFFFFF",
                    textAlign: "center",
                    lineHeight: "48px",
                    borderRadius: "9.8px",
                  }}
                >
                  {minutes}
                </Title>
                <h5
                  style={{
                    margin: 0,
                    color: " #000000",
                    fontSize: "44px",
                    lineHeight: "36px",
                  }}
                >
                  :
                </h5>
                <Title
                  level={1}
                  style={{
                    margin: 0,
                    border: "1.23px solid #FFFFFF",
                    width: "100px",
                    height: "52px",
                    backgroundColor: "#FFFFFF",
                    textAlign: "center",
                    lineHeight: "48px",
                    borderRadius: "9.8px",
                  }}
                >
                  {seconds}
                </Title>
              </Col>
            </Row>
          </div>
          <h5
            style={{
              fontSize: "24px",
              fontWeight: 600,
              lineHeight: "32px",
            }}
          >
            Order #4567872
          </h5>
          <Text
            style={{
              fontSize: "16px",
              fontWeight: 500,
              lineHeight: "24px",
            }}
          >
            Please read and prepare the order(s) carefully for delivery.
          </Text>
          <Divider />
          <div>
            <Row>
              <Col span={3}>
                <Text
                  style={{
                    fontSize: "16px",
                    fontWeight: 600,
                    lineHeight: "24px",
                  }}
                >
                  4 item
                </Text>
              </Col>
              <Col span={18}></Col>
              <Col span={3}>
                {" "}
                <Text
                  style={{
                    marginLeft: 5,
                    fontSize: "16px",
                    fontWeight: 600,
                    lineHeight: "24px",
                  }}
                >
                  Quantity
                </Text>
              </Col>
            </Row>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 10,
              }}
            >
              <Text
                style={{
                  fontSize: "16px",
                  fontWeight: 600,
                  lineHeight: "24px",
                }}
              >
                1 Jollof Rice and Curry Chicken Flavour
              </Text>
              <Text
                style={{
                  fontSize: "16px",
                  fontWeight: 600,
                  lineHeight: "24px",
                  marginRight: 8,
                }}
              >
                3
              </Text>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 10,
              }}
            >
              <Text
                style={{
                  fontSize: "16px",
                  fontWeight: 600,
                  lineHeight: "24px",
                }}
              >
                {" "}
                2 50cl of Fearless Drink
              </Text>
              <Text
                style={{
                  fontSize: "16px",
                  fontWeight: 600,
                  lineHeight: "24px",
                  marginRight: 8,
                }}
              >
                1
              </Text>
            </div>
          </div>
          <Row gutter={[20, 20]}>
            <Col span={8}></Col>
            <Col span={16}>
              {" "}
              <Checkbox
                style={{
                  marginTop: 30,

                  fontSize: "16px",
                  fontStyle: "italic",
                  fontWeight: 600,
                  lineHeight: "24px",
                  color: "#F58B3F",
                }}
                onChange={(e) => setConfirmed(e.target.checked)}
              >
                Click the check box to confirm order
              </Checkbox>
            </Col>
          </Row>

          <Row gutter={[16, 16]} style={{ marginTop: 40 }}>
            <Col span={8}>
              <Button
                size="large"
                style={{
                  borderRadius: "24px",
                  border: "1px solid #055961",
                  fontWeight: 500,
                  fontSize: "16px",
                  lineHeight: "24px",
                  color: "#1F2323",
                }}
                onClick={hideModal}
              >
                Cancel Order
              </Button>
            </Col>
            <Col span={16}>
              <Button
                size="large"
                type="primary"
                style={{
                  borderRadius: "24px",
                  fontWeight: 500,
                  fontSize: "16px",
                  lineHeight: "24px",
                  color: "#ffffff",
                  width: "350px",
                  backgroundColor: confirmed ? undefined : "#99C4C8",
                }}
                onClick={showModal}
                disabled={!confirmed}
              >
                Proceed To Deliver
              </Button>
            </Col>
          </Row>
        </>
      )}
      {isModalVisible && (
        <ModalComponent
          isVisible={isModalVisible}
          hideModal={handleCancel}
          wrapClassName="custom-modal"
          style={{
            position: "absolute",
            top: 20,
            right: 380,
            padding: 0,
            margin: 0,
            borderRadius: "8px",
            display: "inline-block",
          }}
          bodyStyle={{
            backgroundColor: "transparent",
            padding: 0,
          }}
        >
          <FulfillCard hideModal={handleCancel} />
        </ModalComponent>
      )}
    </Card>
  );
};

export default ProceedCard;
