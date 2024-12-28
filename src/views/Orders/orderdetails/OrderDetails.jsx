import CustomerCard from "./CustomerCard";
import Delivery from "./Delivery";
import PaymentSummary from "./PaymentSummary";
import Request from "./Request";
import { Row, Col } from "antd";
import OrderHeader from "./OrderHeader";
import OrderTab from "./OrderTab";

function OrderDetails() {
  return (
    <div style={{ backgroundColor: "#F1F5F5", padding: 6 }}>
      <OrderHeader />
      <OrderTab />
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
    </div>
  );
}

export default OrderDetails;
