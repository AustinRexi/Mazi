import CustomerCard from "./CustomerCard";
import Delivery from "./Delivery";
import PaymentSummary from "./PaymentSummary";
import Request from "./Request";
import { Row, Col } from "antd";
import CourierDetails from "../trackorder/CourierDetails";
function OrderSummary({ order }) {
  return (
    <div style={{ marginRight: 20 }}>
      <Row gutter={[0, 10]}>
        <Col
          xs={{ span: 24, offset: 0 }}
          md={{ span: 24, offset: 1 }}
          lg={{ span: 16, offset: 0 }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            <Request order={order} />
            <Delivery order={order} />
            <PaymentSummary order={order} />
          </div>
        </Col>
        <Col
          xs={{ span: 24, offset: 0 }}
          md={{ span: 24, offset: 1 }}
          lg={{ span: 8, offset: 0 }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <CustomerCard order={order} />
            <CourierDetails order={order} />
          </div>
        </Col>
      </Row>{" "}
    </div>
  );
}

export default OrderSummary;
