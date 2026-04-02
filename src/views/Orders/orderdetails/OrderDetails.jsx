import { useEffect, useState } from "react";
import { Spin } from "antd";
import OrderHeader from "./OrderHeader";
import OrderTab from "./OrderTab";
import { fetchAdminOrderById } from "../../../services/adminOrderService";

function OrderDetails({ isVisible, initialTab = "tab1", order, onBack }) {
  const [resolvedOrder, setResolvedOrder] = useState(order || null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadOrder = async () => {
      if (!order?.id) {
        setResolvedOrder(order || null);
        return;
      }

      setLoading(true);
      try {
        const data = await fetchAdminOrderById(order.id);
        if (isMounted) {
          setResolvedOrder({
            ...(order || {}),
            ...(data || {}),
            buyer_fullname:
              data?.buyer_fullname ||
              data?.buyer_name ||
              order?.buyer_fullname ||
              order?.buyer_name ||
              order?.name ||
              "",
            courier_fullname:
              data?.courier_fullname ||
              data?.courier_name ||
              order?.courier_fullname ||
              order?.courier_name ||
              "",
          });
        }
      } catch {
        if (isMounted) {
          setResolvedOrder(order || null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadOrder();

    return () => {
      isMounted = false;
    };
  }, [order]);

  return (
    <div style={{ backgroundColor: "#F1F5F5", padding: 6 }}>
      <OrderHeader isVisible={isVisible} onBack={onBack} order={resolvedOrder} />
      {loading ? (
        <div style={{ padding: 24, textAlign: "center" }}>
          <Spin />
        </div>
      ) : (
        <OrderTab
          isVisible={isVisible}
          initialTab={initialTab}
          order={resolvedOrder}
        />
      )}
    </div>
  );
}

export default OrderDetails;
