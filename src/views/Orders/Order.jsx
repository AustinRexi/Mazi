import { useState, useCallback, useMemo } from "react";
import Allorder from "./data.js/Allorder";
import MaziSpecialOrder from "./data.js/MaziSpecialOrder";
import CourierCard from "../../Components/Courier/CourierCard";
import CardOrder from "./CardOrder";
import Calender from "../Dashboard/Calender";
import { Badge } from "antd";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import Tabbutton from "../../Components/Product/Tabbutton";
import Addbutton from "../../Components/Product/Addbutton";
import Search from "../../Components/Product/Search";
import allorderstatus from "./data.js/allorderstatusdata";
import mazispecialstatus from "./data.js/mazispecialorderstatusdata";
import OrderDetails from "./orderdetails/OrderDetails";

const dataRefrence = { tab1: allorderstatus, tab2: mazispecialstatus };
const orders = { tab1: Allorder, tab2: MaziSpecialOrder };

const styles = {
  container: { padding: "40px" },
  header: {
    display: "flex",
    alignItems: "center",
    gap: "19px",
  },
  searchBox: {
    marginLeft: "42px",
    width: "531px",
    height: "45px",
    borderRadius: "16px",
    border: "1px solid #B5C3C3",
    padding: "0 16px",
  },
  calendar: {
    marginTop: "6px",
    height: "48px",
    cursor: "pointer",
  },
  listContainer: {
    display: "flex",
    flexDirection: "row",
    gap: "16px",
    marginTop: "40px",
    width: "1080px",
    background: "#FFFFFF",
    marginLeft: 14,
  },
  userCardGrid: {
    padding: 12,
    width: "1030px",
    marginTop: "10px",
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gridTemplateRows: "repeat(4, auto)",
    gap: "10px",
  },
  h: {
    fontWeight: 600,
    lineHeight: "32px",
    textAlign: "left",
    fontSize: "24px",
    margin: "0",
  },
  badge: {
    padding: "2px 8px",
    marginLeft: "100px",
    marginTop: "18px",
    border: "1px solid #B5B6B5",
    borderRadius: "16px",
    height: "8vh",
    width: "278px",
  },
  heading: {
    marginTop: "20px",
    color: "#000000",
    fontWeight: 600,
    fontSize: "24px",
    lineHeight: "32px",
    marginLeft: 20,
  },
};

const presets = [
  { label: "Today", value: dayjs() },
  { label: "Three Months", value: dayjs().subtract(3, "month") },
  { label: "Six Months", value: dayjs().subtract(6, "month") },
  { label: "One Year", value: dayjs().subtract(1, "year") },
];

function Order() {
  const [activeTabKey, setActiveTabKey] = useState("tab1");
  const [isVisible, setIsVisible] = useState(activeTabKey === "tab1");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const navigate = useNavigate();

  const handleViewDetails = useCallback(
    (order) => {
      setSelectedOrder(order);
      setIsVisible(activeTabKey === "tab1");
    },
    [activeTabKey]
  );

  const handleBackToOrders = useCallback(() => {
    setSelectedOrder(null);
  }, []);

  const onTabChange = useCallback((key) => {
    setActiveTabKey(key);
    setIsVisible(key === "tab1");
  }, []);

  const handleAddButtonClick = () => {
    navigate("/addproduct");
  };

  const iconData = useMemo(() => dataRefrence[activeTabKey], [activeTabKey]);
  const orderData = useMemo(() => orders[activeTabKey], [activeTabKey]);
  const text = "New Order";
  const getPlaceholderText = "Stores, food or groceries";

  return (
    <div>
      {selectedOrder ? (
        <OrderDetails
          isVisible={isVisible}
          order={selectedOrder}
          onBack={handleBackToOrders}
        />
      ) : (
        <div>
          <div style={{ display: "flex", gap: 10 }}>
            <h2 style={styles.heading}>Order</h2>
            <div style={styles.badge}>
              <Badge count={252}>
                <div style={{ display: "flex", gap: 16 }}>
                  {[
                    { id: "tab1", label: "All Orders" },
                    { id: "tab2", label: "Mazi Special Orders" },
                  ].map(({ id, label }) => (
                    <Tabbutton
                      key={id}
                      activeTabKey={activeTabKey}
                      id={id}
                      handleClick={onTabChange}
                      style={{
                        width: "115px",
                        color: "#494949",
                        fontSize: "16px",
                        lineHeight: "24px",
                        borderRadius: "2px",
                        marginTop: "8px",
                      }}
                    >
                      {label}
                    </Tabbutton>
                  ))}
                </div>
              </Badge>
            </div>
            <Addbutton text={text} onClick={handleAddButtonClick} />
            <Search
              placeholder={getPlaceholderText}
              style={{
                width: "260px",
                height: "56px",
                padding: "16px",
                border: "1px solid #B5C3C3",
              }}
            />
            <Calender
              placeholder="Today"
              data={presets}
              style={styles.calendar}
            />
          </div>

          <div style={styles.listContainer}>
            {iconData.map((item, index) => (
              <CourierCard key={index} item={item} />
            ))}
          </div>

          <div style={styles.userCardGrid}>
            {orderData.map((item, index) => (
              <CardOrder
                item={item}
                key={index}
                isActiveTab={activeTabKey === "tab1"}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Order;
