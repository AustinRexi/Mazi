import { Button, Space, Flex, Row, Col } from "antd";
import { useState } from "react";
import { CalendarOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import PrevandNext from "../../../Components/shared/PrevandNext";

function OrderHeader() {
  const [hoveredButton, setHoveredButton] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const handleMouseEnter = (button) => {
    setHoveredButton(button);
  };

  const handleMouseLeave = () => {
    setHoveredButton(null);
  };

  const orderDate = dayjs("2024-02-13T10:15:00");
  return (
    <div style={{ paddingRight: 70 }}>
      <Row>
        <Col span={6}>
          <h2
            style={{
              marginTop: 12,
              fontWeight: 600,
              lineHeight: "32px",
              fontSize: "24px",

              fontFamily: "NeueHaasDisplayRoman",
            }}
          >
            Order #465765322
          </h2>
        </Col>
        <Col span={10}>
          <Flex
            style={{
              justifyContent: "start",
              alignContent: "center",
              marginTop: 16,
              gap: 3,
            }}
          >
            <Space>
              <Button
                type="secondary"
                style={{
                  border: `1px solid ${
                    hoveredButton === "Paid" ? "#ED9922" : "#22BB5F"
                  }`,
                  borderRadius: "18px",
                  color: `${hoveredButton === "Paid" ? "#ED9922" : "#22BB5F"}`,
                  fontWeight: 500,
                  fontSize: "14px",
                  lineHeight: "20px",
                  fontFamily: "NeueHaasDisplayThin",
                }}
                onMouseEnter={() => handleMouseEnter("Paid")}
                onMouseLeave={handleMouseLeave}
              >
                Paid
              </Button>
              <Button
                style={{
                  border: "1px solid #ED9922",
                  borderRadius: "18px",
                  color: "#ED9922",
                  fontWeight: 500,
                  fontSize: "14px",
                  lineHeight: "20px",
                  fontFamily: "NeueHaasDisplayThin",
                  display: isVisible ? "flex" : "none",
                }}
              >
                Unfulfilled
              </Button>
              <Button
                style={{
                  border: `1px solid ${
                    hoveredButton === "processing" ? "#ED9922" : "#3CBCE3"
                  }`,
                  // border: "1px solid ",
                  borderRadius: "18px",
                  // color: "#3CBCE3",
                  color: `${
                    hoveredButton === "processing" ? "#ED9922" : "#3CBCE3"
                  }`,
                  fontWeight: 500,
                  fontSize: "14px",
                  lineHeight: "20px",
                  fontFamily: "NeueHaasDisplayThin",
                  display: !isVisible ? "flex" : "none",
                }}
                onMouseEnter={() => handleMouseEnter("processing")}
                onMouseLeave={handleMouseLeave}
              >
                Processing
              </Button>
            </Space>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginLeft: 3,
              }}
            >
              <CalendarOutlined style={{ marginRight: "8px" }} />
              <span
                style={{
                  color: "#545E5E",
                  fontFamily: "NeueHaasDisplayRoman",
                  fontSize: "16px",
                  fontWeight: 500,
                  lineHeight: "24px",
                }}
              >
                {orderDate.format("MMM D, YYYY [at] h:mm A")}
              </span>
            </div>
          </Flex>
        </Col>
        <Col span={3}></Col>
        <Col span={5}>
          <PrevandNext />
        </Col>
      </Row>
    </div>
  );
}

export default OrderHeader;
