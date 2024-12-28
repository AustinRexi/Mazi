import { useState, useEffect } from "react";
import courierdata from "../../../../Components/Courier/courierdata";
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
const { Title, Text } = Typography;

const ArrivalCard = () => {
  const [timeLeft, setTimeLeft] = useState(960);
  const [confirmed, setConfirmed] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

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

  return (
    <Card
      style={{
        padding: 0,
        width: 600,
        height: isMinimized ? 80 : 570, // Adjust height when minimized
        margin: "auto",
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        overflow: "hidden", // Hide content outside card when minimized
        transition: "height 0.3s ease",
      }}
    >
      <Row gutter={[16, 16]}>
        <Col span={10}>
          <Typography.Title
            level={5}
            style={{ fontWeight: 600, lineHeight: "28px", fontSize: "20px" }}
          >
            {" "}
            Courier is here
          </Typography.Title>
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

      {!isMinimized && (
        <>
          <Row>
            <Col span={12}>
              <div
                style={{
                  border: "1px solid #AAAAAA",
                  backgroundColor: " #F5F5F5",
                  width: "268px",
                  height: "118px",
                  borderRadius: 14,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "8px",
                    gap: 5,
                  }}
                >
                  <Avatar
                    size={40}
                    src={items.icon}
                    style={{ marginRight: "15px" }}
                  />
                  <Text
                    strong
                    style={{
                      fontSize: "16px",
                      fontWeight: 500,
                      lineHeight: "24px",
                      color: "#121515",
                    }}
                  >
                    {items.name}
                  </Text>
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
                    <Text type="secondary">(196)</Text>
                  </div>
                </div>
                <div style={{ marginTop: 2, marginLeft: 4 }}>
                  <Row gutter={[16, 6]}>
                    <Col span={12}>
                      <Text>{items.model.name}</Text>
                    </Col>
                    <Col span={12}>
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
                    <Col span={12}>
                      <Text>{items.drive.item}</Text>
                    </Col>
                    <Col span={12}>
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
                </div>
              </div>
            </Col>

            <Col span={12}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#FEE7D7",
                  borderRadius: "12px",
                  padding: "13px 0",
                  paddingBottom: 20,
                  marginBottom: 18,
                  border: "1px solid #F58B3F",
                  height: "118px",
                }}
              >
                <Row gutter={[16, 16]}>
                  <Col span={3}></Col>
                  <Col span={20}>
                    <h5
                      style={{
                        fontSize: "20px",
                        fontWeight: 600,
                        lineHeight: "28px",
                      }}
                    >
                      Estimated time (16mins)
                    </h5>
                  </Col>

                  <Col span={4}></Col>
                  <Col
                    span={16}
                    style={{
                      display: "flex",
                      gap: 18,
                      justifyContent: "center",
                      alignContent: "center",
                    }}
                  >
                    <Title
                      level={4}
                      style={{
                        margin: 0,
                        border: "1.23px solid #FFFFFF",
                        width: "80px",
                        height: "34px",
                        backgroundColor: "#FFFFFF",
                        textAlign: "center",
                        borderRadius: 12,
                      }}
                    >
                      {minutes}
                    </Title>
                    <h5
                      style={{
                        margin: 0,
                        color: " #000000",
                        fontSize: "24px",
                        lineHeight: "24px",
                      }}
                    >
                      :
                    </h5>
                    <Title
                      level={4}
                      style={{
                        margin: 0,
                        border: "1.23px solid #FFFFFF",
                        width: "80px",
                        height: "34px",
                        backgroundColor: "#FFFFFF",
                        textAlign: "center",
                        borderRadius: 12,
                      }}
                    >
                      {seconds}
                    </Title>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>

          <h5
            style={{
              fontSize: "24px",
              fontWeight: 600,
              lineHeight: "32px",
            }}
          >
            Please Hand Over Order #4567872
          </h5>
          <Text
            style={{
              fontSize: "16px",
              fontWeight: 500,
              lineHeight: "24px",
            }}
          >
            Please confirm items carefully to avoid error.
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

          <Row style={{ marginTop: 40 }}>
            <Col span={24}>
              <Button
                size="large"
                type="primary"
                style={{
                  borderRadius: "24px",
                  fontWeight: 500,
                  fontSize: "16px",
                  lineHeight: "24px",
                  color: "#ffffff",
                  width: "550px",
                  backgroundColor: confirmed ? undefined : "#99C4C8", // Conditional background color
                }}
                disabled={!confirmed}
              >
                Proceed To Deliver
              </Button>
            </Col>
          </Row>
        </>
      )}
    </Card>
  );
};

export default ArrivalCard;
