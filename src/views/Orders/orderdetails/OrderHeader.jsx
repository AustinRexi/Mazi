import { Button, Space, Flex, Row, Col } from "antd";
import { useState } from "react";
import { CalendarOutlined, LeftOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import PrevandNext from "../../../Components/shared/PrevandNext";

function OrderHeader({ isVisible: initialIsVisible, onBack, order }) {
  const [hoveredButton, setHoveredButton] = useState(null);
  const [isButtonVisible, setIsButtonVisible] = useState(initialIsVisible);

  const handleMouseEnter = (button) => {
    setHoveredButton(button);
  };

  const handleMouseLeave = () => {
    setHoveredButton(null);
  };

  const orderDate = dayjs(order?.created_at || "2024-02-13T10:15:00");
  const getPersonName = (person, fallback = "") => {
    if (!person) {
      return fallback;
    }
    const fullName = [
      person.firstname || person.firstName,
      person.lastname || person.lastName,
    ]
      .filter(Boolean)
      .join(" ")
      .trim();
    return fullName || person.name || fallback;
  };

  const buyerName =
    order?.buyer_fullname ||
    getPersonName(order?.buyer, "") ||
    order?.buyer_name ||
    order?.name ||
    "Unknown Buyer";
  const courierName =
    order?.courier_fullname ||
    getPersonName(order?.courier, "") ||
    order?.courier_name ||
    "Not assigned";

  return (
    <div style={{ paddingRight: 70 }}>
      <div style={{ marginBottom: 6 }}>
        <Button type="link" onClick={onBack} style={{ paddingLeft: 0 }}>
          <LeftOutlined />
          Back to Orders
        </Button>
      </div>
      <Row>
        <Col
          xs={{ span: 10, order: 3 }}
          md={{ span: 6, order: 1 }}
          lg={{ span: 6, order: 1 }}
        >
          <h2
            style={{
              marginTop: 12,
              fontWeight: 600,
              lineHeight: "32px",
              fontSize: "24px",
              whiteSpace: "nowrap",
              fontFamily: "NeueHaasDisplayRoman",
            }}
          >
            Order #{order?.order_number || order?.orderid || order?.id || "-"}
          </h2>
          <div style={{ marginTop: 2 }}>
            <span
              style={{
                fontSize: "14px",
                lineHeight: "20px",
                color: "#545E5E",
                marginRight: 16,
              }}
            >
              Buyer: {buyerName}
            </span>
            <span
              style={{
                fontSize: "14px",
                lineHeight: "20px",
                color: "#545E5E",
              }}
            >
              Courier: {courierName}
            </span>
          </div>
        </Col>
        <Col
          xs={{ span: 24, order: 4 }}
          md={{ span: 10, order: 4 }}
          lg={{ span: 10, order: 4 }}
        >
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
                  display: !isButtonVisible ? "flex" : "none",
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
                  display: isButtonVisible ? "flex" : "none",
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
                whiteSpace: "nowrap",
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
        <Col
          xs={{ span: 12, order: 1 }}
          md={{ span: 3, order: 3 }}
          lg={{ span: 3, order: 3 }}
        ></Col>
        <Col
          xs={{ span: 5, order: 2 }}
          md={{ span: 5, order: 4 }}
          lg={{ span: 5, order: 4 }}
        >
          <PrevandNext />
        </Col>
      </Row>
    </div>
  );
}

export default OrderHeader;
