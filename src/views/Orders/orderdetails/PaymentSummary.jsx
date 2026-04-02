import { Card, Row, Col, Divider } from "antd";
import mastercard from "../../../Assets/Ordericons/mastercard.svg";
import banktransfer from "../../../Assets/Ordericons/banktransfer.svg";
import mazitoken from "../../../Assets/Ordericons/mazitoken.svg";
import paypal from "../../../Assets/Ordericons/paypal.svg";
import { parseOrderItems, formatNaira } from "./orderDataUtils";

const paymentIcons = {
  card: mastercard,
  cash: banktransfer,
  bank_transfer: banktransfer,
  transfer: banktransfer,
  token: mazitoken,
  mazi_token: mazitoken,
  paypal,
};

const PaymentSummary = ({ order }) => {
  const items = parseOrderItems(order?.order_product);
  const itemSubtotal = items.reduce(
    (sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 1),
    0
  );
  const serviceFee = Number(order?.service_fee || 0);
  const deliveryFee = Number(order?.delivery_fee || 0);
  const total = itemSubtotal + serviceFee + deliveryFee;
  const paymentMethod = String(order?.payment_method || "cash").toLowerCase();
  const paymentStatus = String(order?.payment_status || "pending");

  const rows = [
    { product: "Items Subtotal", totalPrice: formatNaira(itemSubtotal) },
    { product: "Delivery Fee", totalPrice: deliveryFee > 0 ? formatNaira(deliveryFee) : "Free" },
    { product: "Service Fee", totalPrice: formatNaira(serviceFee) },
    { product: "Total", totalPrice: formatNaira(total) },
    {
      product: "Status",
      totalPrice: paymentStatus.replace(/\b\w/g, (c) => c.toUpperCase()),
    },
    {
      product: "Payment Method",
      totalPrice: {
        icon: paymentIcons[paymentMethod] || banktransfer,
        details: paymentMethod.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
      },
    },
  ];

  return (
    <Card style={{ width: "600px" }}>
      <h3
        style={{
          fontFamily: "NeueHaasDisplayBold",
          fontWeight: 500,
          lineHeight: "24px",
          fontSize: "20px",
          marginBottom: 20,
        }}
      >
        Payment Summary
      </h3>
      {rows.map((item, index) => (
        <Row gutter={[1, 0]} key={index} style={{ alignItems: "center" }}>
          <Col xs={12} md={19} lg={19}>
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
          <Col xs={12} md={5} lg={5}>
            {typeof item.totalPrice === "object" ? (
              <div style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "flex-end" }}>
                <span>{item.totalPrice.details}</span>
                <img src={item.totalPrice.icon} alt="Payment Icon" width={24} />
              </div>
            ) : (
              <h3
                style={{
                  textAlign: "right",
                  fontWeight: item.product === "Total" ? 500 : "inherit",
                  fontSize: item.product === "Total" ? "20px" : "inherit",
                  lineHeight: item.product === "Total" ? "20px" : "inherit",
                  color:
                    item.product === "Status" &&
                    String(item.totalPrice).toLowerCase() === "successful"
                      ? "green"
                      : "inherit",
                }}
              >
                {item.totalPrice}
              </h3>
            )}
          </Col>
          {index < rows.length - 1 && <Divider />}
        </Row>
      ))}
    </Card>
  );
};

export default PaymentSummary;
