import { useState, useCallback, useMemo, useEffect } from "react";
import { Carousel } from "antd";
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

const getUserCardGridStyles = (width) => {
  const baseStyles = {
    width: "100%",
    maxWidth: "1030px",
    margin: "14px auto 0 auto",
    display: "grid",
    gap: "8px",
    gridTemplateRows: "auto",
    padding: 0,
  };

  if (width <= 480) {
    return {
      ...baseStyles,
      gridTemplateColumns: "1fr",
      justifyItems: "center",
      maxWidth: "100%",
      marginTop: 40,
    };
  } else if (width <= 768) {
    return {
      ...baseStyles,
      gridTemplateColumns: "repeat(3, 1fr)",
    };
  } else {
    return {
      ...baseStyles,
      gridTemplateColumns: "repeat(4, 1fr)",
    };
  }
};

const styles = {
  container: { padding: "20px" },
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
    width: "100%",
    maxWidth: "1080px",
    padding: 14,
    marginLeft: 4,
    marginRight: "auto",
  },
  carouselContainer: {
    marginTop: "40px",
    width: "100%",
    padding: 14,
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
    height: "50px",
    width: "278px",
  },
  heading: {
    marginTop: "20px",
    color: "#000000",
    fontWeight: 500,
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
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  const onCarouselChange = (currentSlide) => {
    console.log(currentSlide);
  };

  const iconData = useMemo(() => dataRefrence[activeTabKey], [activeTabKey]);
  const orderData = useMemo(() => orders[activeTabKey], [activeTabKey]);
  const text = "New Order";
  const getPlaceholderText = "Stores, food or groceries";

  const userCardGridStyles = getUserCardGridStyles(windowWidth);

  const renderCourierList = () => {
    if (windowWidth < 780) {
      return (
        <Carousel
          afterChange={onCarouselChange}
          dots={true}
          slidesToShow={2}
          slidesToScroll={1}
          infinite={false}
          style={{
            width: "100%",
            marginTop: "40px",
            padding: "14px",
          }}
        >
          {iconData.map((item, index) => (
            <div
              key={index}
              style={{
                width: "50%",
                padding: "0 5px",
                display: "inline-block",
              }}
            >
              <CourierCard item={item} />
            </div>
          ))}
        </Carousel>
      );
    } else {
      return (
        <div style={styles.listContainer}>
          {iconData.map((item, index) => (
            <CourierCard key={index} item={item} />
          ))}
        </div>
      );
    }
  };

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
          <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
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

          {renderCourierList()}

          <div style={userCardGridStyles}>
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
