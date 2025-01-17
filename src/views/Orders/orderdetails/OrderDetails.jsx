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
    </div>
  );
}

export default OrderDetails;
