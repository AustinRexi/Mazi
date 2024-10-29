import { Card, Row, Col, Divider } from "antd";
import mastercard from "../../../Assets/Ordericons/mastercard.svg";

const items = [
  {
    product: "Jollof Rice and Curry Chicken Flavour",
    totalPrice: "$520",
  },
  { product: "50Cl of Fearless Drink", totalPrice: "Free" },
  {
    product: "Service fee",
    totalPrice: "$10",
  },
  { product: "Total", totalPrice: "$1040" },
  {
    product: "Status",
    totalPrice: "Successful",
  },
  {
    product: "Payment Method",
    totalPrice: { icon: mastercard, details: "4526****0556" },
  },
];

const PaymentSummary = () => {
  return (
    <Card style={{ width: "600px" }}>
      <h3
        style={{
          fontWeight: 700,
          lineHeight: "24px",
          fontSize: "20px",
          marginBottom: 20,
        }}
      >
        Payment Summary
      </h3>
      {items.map((item, index) => (
        <Row key={index} style={{ alignItems: "center" }}>
          <Col span={19}>
            <h3
              style={{
                fontWeight: item.product === "Total" ? 700 : 500,
                fontSize: item.product === "Total" ? "20px" : "14px",
                lineHeight: item.product === "Total" ? "20px" : "24px",
              }}
            >
              {item.product}
            </h3>
          </Col>
          <Col span={4}>
            {typeof item.totalPrice === "object" ? (
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span>{item.totalPrice.details}</span>
                <img src={item.totalPrice.icon} alt="Payment Icon" width={24} />
              </div>
            ) : (
              <h3
                style={{
                  fontWeight: item.product === "Total" ? 700 : "inherit",
                  fontSize: item.product === "Total" ? "20px" : "inherit",
                  lineHeight: item.product === "Total" ? "20px" : "inherit",
                  color:
                    item.product === "Status" &&
                    item.totalPrice === "Successful"
                      ? "green"
                      : "inherit",
                }}
              >
                {item.totalPrice}
              </h3>
            )}
          </Col>
          {index < items.length - 1 && <Divider />}
        </Row>
      ))}
    </Card>
  );
};

export default PaymentSummary;
