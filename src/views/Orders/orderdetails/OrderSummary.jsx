import CustomerCard from "./CustomerCard";
import Delivery from "./Delivery";
import PaymentSummary from "./PaymentSummary";
import Request from "./Request";
import { Row, Col } from "antd";
function OrderSummary() {
  return (
    <Row>
      <Col span={16}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",

            marginLeft: 20,
          }}
        >
          <Request />
          <Delivery />
          <PaymentSummary />
        </div>
      </Col>
      <Col span={8}>
        <CustomerCard />
      </Col>
    </Row>
  );
}

export default OrderSummary;
