import { Card, Row, Col, Divider, Avatar } from "antd";
import rice from "../../../Assets/Ordericons/rice.svg";
import unfulfilled from "../../../Assets/Ordericons/unfulfill.svg";
import drink from "../../../Assets/Ordericons/drinks.svg";

function Request() {
  const data = [
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

  // Calculate the total price across all items
  //   const total = data.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const blinkAnimation = {
    animation: "blink 1s steps(5, start) infinite",
  };

  return (
    <Card style={{ width: "600px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignContent: "center",
          gap: 4,
        }}
      >
        <Avatar src={unfulfilled} style={blinkAnimation} />
        <h4
          style={{
            marginTop: "2px",
            fontWeight: 600,
            fontSize: "20px",
            lineHeight: "24px",
          }}
        >
          Unfulfilled
        </h4>
        <p
          style={{
            fontWeight: 500,
            fontSize: "16px",
            lineHeight: "24px",
            marginTop: "2px",
          }}
        >
          ({data.length})
        </p>
      </div>
      {data.map((item, index) => {
        // Calculate total price for the current item
        const totalPrice = item.price * item.quantity;

        return (
          <Row gutter={[10, 16]} style={{ marginLeft: "2px" }} key={index}>
            <Col span={5}>
              <img src={item.icon} alt="Food icon" />
            </Col>
            <Col span={12}>
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
                  alignContent: "center",
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
                  }}
                >
                  {item.quantity}
                </h2>
              </div>
            </Col>
            <Col
              span={5}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignContent: "center",
              }}
            >
              <h5 style={{ color: "#838D8D", marginLeft: 10 }}>
                {item.kitchen}
              </h5>
              <h2 style={{ fontWeight: 700 }}>${totalPrice}</h2>
            </Col>

            {index < data.length - 1 && <Divider />}
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
