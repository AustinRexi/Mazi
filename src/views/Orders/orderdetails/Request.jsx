import { Card, Row, Col, Divider } from "antd";
import rice from "../../../Assets/Ordericons/rice.svg";
import unfulfilled from "../../../Assets/Ordericons/unfulfill.svg";
import drink from "../../../Assets/Ordericons/drinks.svg";
import orange from "../../../Assets/Ordericons/orange.svg";
import ewedu from "../../../Assets/Ordericons/ewedu.svg";
import processing from "../../../Assets/Ordericons/process.svg";

function Request() {
  const unfulfillRequest = { icon: unfulfilled, request: "Unfulfilled" };
  const processingRequest = { icon: processing, request: "In progress" };
  const specialOrder = [
    {
      price: 140,
      kitchen: "MAZIKITCHEN",
      product: "Jollof rice and chicken flavour",
      quantity: 3,
      icon: rice,
      description: "$140 per plate",
    },
    {
      price: 0,
      kitchen: "MAZIKITCHEN",
      product: "50 Cl of Fearless Drink",
      quantity: 1,
      icon: drink,
      description: "Free",
    },
  ];
  const allOrder = [
    {
      price: 520,
      kitchen: "AZAMAN STORE",
      product: "Sweet orange",
      quantity: 1,
      icon: orange,
      description: "$7.13 per kg",
    },
    {
      price: 520,
      kitchen: "INK SHOP GROCERIES",
      product: "Fresh Ewedu leaf",
      quantity: 1,
      icon: ewedu,
      description: "$7.13 per kg",
    },
  ];

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
          marginBottom: 4,
        }}
      >
        <img src={processingRequest.icon} style={blinkAnimation} />
        <h4
          style={{
            fontFamily: "NeueHaasDisplayBold",
            fontWeight: 500,
            fontSize: "20px",
            lineHeight: "24px",
            margin: 0,
          }}
        >
          {processingRequest.request}
        </h4>
        <p
          style={{
            fontWeight: 500,
            fontSize: "16px",
            lineHeight: "24px",
            margin: 0,
          }}
        >
          ({allOrder.length})
        </p>
      </div>
      {allOrder.map((item, index) => {
        // Calculate total price for the current item
        const totalPrice = item.price * item.quantity;

        return (
          <Row gutter={[10, 16]} style={{ marginLeft: "2px" }} key={index}>
            <Col xs={0} md={5} lg={5}>
              <img src={item.icon} alt="Food icon" />
            </Col>
            <Col xs={8} md={12} lg={12}>
              <h5
                style={{
                  fontWeight: 500,
                  fontSize: "15px",
                  lineHeight: "24px",
                }}
              >
                {item.product}
              </h5>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <p>{item.description}</p>
                <h2
                  style={{
                    backgroundColor: "#F3FAFA",
                    width: 80,
                    height: 30,
                    borderRadius: 4,
                    textAlign: "center",
                    lineHeight: "30px",
                    marginTop: 8,
                  }}
                >
                  {item.quantity}
                </h2>
              </div>
            </Col>
            <Col
              xs={4}
              md={5}
              lg={5}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h5
                style={{
                  color: "#838D8D",
                  marginLeft: 10,
                  whiteSpace: "nowrap",
                }}
              >
                {item.kitchen}
              </h5>
              <h2 style={{ fontWeight: 500 }}>${totalPrice}</h2>
            </Col>

            {index < allOrder.length - 1 && <Divider />}
          </Row>
        );
      })}
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

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default Request;
