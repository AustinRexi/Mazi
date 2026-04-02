import { Card, Row, Col, Divider } from "antd";
import processing from "../../../Assets/Ordericons/process.svg";
import { parseOrderItems, formatNaira } from "./orderDataUtils";

function Request({ order }) {
  const items = parseOrderItems(order?.order_product);
  const restaurantName =
    order?.restaurant?.restaurant_name || order?.title || "ORDER";
  const status =
    String(order?.order_status || "pending")
      .replace(/_/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase()) || "Pending";

  const blinkAnimation = {
    animation: "blink 1s steps(5, start) infinite",
  };

  return (
    <Card style={{ width: "600px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: 4,
          marginBottom: 12,
        }}
      >
        <img src={processing} alt="status" style={blinkAnimation} />
        <h4
          style={{
            fontFamily: "NeueHaasDisplayBold",
            fontWeight: 500,
            fontSize: "20px",
            lineHeight: "24px",
            margin: 0,
          }}
        >
          {status}
        </h4>
        <p style={{ fontWeight: 500, fontSize: "16px", lineHeight: "24px", margin: 0 }}>
          ({items.length})
        </p>
      </div>

      {items.length === 0 ? (
        <p style={{ margin: 0, color: "#838D8D" }}>No order items available.</p>
      ) : (
        items.map((item, index) => {
          const totalPrice = item.price * item.quantity;
          return (
            <Row gutter={[10, 16]} style={{ marginLeft: "2px" }} key={index}>
              <Col xs={0} md={5} lg={5} />
              <Col xs={14} md={12} lg={12}>
                <h5 style={{ fontWeight: 500, fontSize: "15px", lineHeight: "24px" }}>
                  {item.name}
                </h5>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <p>{formatNaira(item.price)} each</p>
                  <h2
                    style={{
                      backgroundColor: "#F3FAFA",
                      width: 80,
                      height: 30,
                      borderRadius: 4,
                      textAlign: "center",
                      lineHeight: "30px",
                      marginTop: 8,
                      fontSize: 16,
                    }}
                  >
                    {item.quantity}
                  </h2>
                </div>
              </Col>
              <Col
                xs={10}
                md={7}
                lg={7}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                }}
              >
                <h5 style={{ color: "#838D8D", marginLeft: 10, whiteSpace: "nowrap" }}>
                  {restaurantName}
                </h5>
                <h2 style={{ fontWeight: 500 }}>{formatNaira(totalPrice)}</h2>
              </Col>
              {index < items.length - 1 && <Divider />}
            </Row>
          );
        })
      )}
    </Card>
  );
}

const styles = `
@keyframes blink {
  50% {
    opacity: 0;
  }
}
`;

if (typeof document !== "undefined" && !document.getElementById("request-blink-style")) {
  const styleSheet = document.createElement("style");
  styleSheet.id = "request-blink-style";
  styleSheet.type = "text/css";
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}

export default Request;
