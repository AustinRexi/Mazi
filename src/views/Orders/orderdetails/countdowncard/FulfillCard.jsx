import { useState, useEffect } from "react";
import { Card, Avatar, Typography, Row, Col, Button } from "antd";
import backicon from "../../../../Assets/Couriericons/backicon.svg";
import Editor from "../../../../Components/shared/Editor";
const { Title, Text } = Typography;

const FulfillCard = ({ onBack, hideModal }) => {
  const [timeLeft, setTimeLeft] = useState(960);

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

  const data = {
    title: "Note for Courier",
    data: '<p> Go to counter 4 on the left sign where the <b>"pick up"</b> is and present the order number</p>',
  };

  return (
    <Card
      style={{
        padding: 4,
        width: 620,
        height: 630,

        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      }}
    >
      <Row gutter={[16, 10]}>
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
        <Col span={10}></Col>
        <Col span={4}>
          <div
            style={{ display: "flex", gap: 6, cursor: "pointer" }}
            onClick={onBack}
          >
            <Avatar src={backicon} size={24} />
            <Typography.Title
              level={5}
              style={{ fontWeight: 400, fontSize: "16px", lineHeight: "24px" }}
            >
              Back{" "}
            </Typography.Title>
          </div>
        </Col>
      </Row>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#FEE7D7",
          borderRadius: "8px",
          padding: "17px 0",
          marginBottom: 15,
        }}
      >
        <Row gutter={[16, 10]}>
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
        Leave a quote for the courier (Optional)
      </Text>
      <Row>
        <Col span={24}>
          <Editor
            data={data}
            style={{
              border: "1px solid #DEEAEA",
              width: "560px",
              height: "250px",
              marginTop: 8,
              borderRadius: " 8px 0px 0px 0px",
            }}
          />
        </Col>
      </Row>
      <Row>
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
              width: "565px",
              height: "48px",
              marginTop: 8,
            }}
            onClick={hideModal}
          >
            Continue
          </Button>
        </Col>{" "}
      </Row>
    </Card>
  );
};

export default FulfillCard;
