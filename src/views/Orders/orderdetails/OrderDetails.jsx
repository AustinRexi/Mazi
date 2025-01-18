import OrderHeader from "./OrderHeader";
import OrderTab from "./OrderTab";

function OrderDetails({ isVisible }) {
  return (
    <div style={{ backgroundColor: "#F1F5F5", padding: 6 }}>
      <OrderHeader isVisible={isVisible} />
      <OrderTab isVisible={isVisible} />
    </div>
  );
}

export default OrderDetails;
