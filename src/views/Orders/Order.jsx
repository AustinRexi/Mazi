import { useState, useMemo, useEffect } from "react";
import { Carousel, Alert, Spin, Pagination } from "antd";
import CourierCard from "../../Components/Courier/CourierCard";
import CardOrder from "./CardOrder";
import Calender from "../Dashboard/Calender";
import dayjs from "dayjs";
import Search from "../../Components/Product/Search";
import allorderstatus from "./data.js/allorderstatusdata";
import OrderDetails from "./orderdetails/OrderDetails";
import { fetchAdminOrderCards } from "../../services/adminOrderService";
import banktransfer from "../../Assets/Ordericons/banktransfer.svg";
import activeIcon from "../../Assets/Ordericons/activeicon.svg";
import cancelIcon from "../../Assets/Ordericons/cancelicon.svg";
import completeIcon from "../../Assets/Ordericons/completedicon.svg";
import mastercard from "../../Assets/Ordericons/mastercard.svg";
import mazitoken from "../../Assets/Ordericons/mazitoken.svg";
import paypal from "../../Assets/Ordericons/paypal.svg";
import pendingIcon from "../../Assets/Ordericons/pendingicon.svg";
import refundedIcon from "../../Assets/Ordericons/refundedicon.svg";
import dp from "../../Assets/Ordericons/displayimageicon.svg";

const paymentIconMap = {
  cash: banktransfer,
  bank_transfer: banktransfer,
  transfer: banktransfer,
  card: mastercard,
  token: mazitoken,
  mazi_token: mazitoken,
  paypal,
};

const statusIconMap = {
  active: activeIcon,
  accepted: activeIcon,
  on_the_way: activeIcon,
  arrived: activeIcon,
  shipped: activeIcon,
  collected: activeIcon,
  pending: pendingIcon,
  canceled: cancelIcon,
  cancelled: cancelIcon,
  refund: refundedIcon,
  refunded: refundedIcon,
  delivered: completeIcon,
  complete: completeIcon,
  completed: completeIcon,
};

const formatAmount = (value) => {
  const numericValue = Number(value || 0);
  return `N${numericValue.toLocaleString("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

const formatCardDate = (value) => {
  if (!value) {
    return "-";
  }

  const parsed = dayjs(value);
  if (!parsed.isValid()) {
    return "-";
  }

  return parsed.format("MMM.DD,YYYY | hh:mma");
};

const matchesOrderDate = (value, selectedDate) => {
  if (!selectedDate) {
    return true;
  }

  const parsed = dayjs(value);
  return parsed.isValid() ? parsed.isSame(selectedDate, "day") : false;
};

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
    marginTop: 0,
    height: "56px",
    padding: 0,
    display: "flex",
    alignItems: "center",
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
  heading: {
    marginTop: "20px",
    color: "#000000",
    fontWeight: 500,
    fontSize: "24px",
    lineHeight: "32px",
    marginLeft: 20,
  },
  headerControls: {
    marginLeft: "auto",
    display: "flex",
    alignItems: "center",
    gap: 7,
    flexWrap: "wrap",
  },
};

const presets = [
  { label: "Today", value: dayjs() },
  { label: "Three Months", value: dayjs().subtract(3, "month") },
  { label: "Six Months", value: dayjs().subtract(6, "month") },
  { label: "One Year", value: dayjs().subtract(1, "year") },
];

function Order() {
  const [isVisible] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [detailsInitialTab, setDetailsInitialTab] = useState("tab1");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [orderCards, setOrderCards] = useState([]);
  const [summary, setSummary] = useState({
    active: 0,
    pending: 0,
    cancelled: 0,
    refunded: 0,
    completed: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(24);
  const [totalOrders, setTotalOrders] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleBackToOrders = () => {
    setSelectedOrder(null);
    setDetailsInitialTab("tab1");
  };

  const onCarouselChange = (currentSlide) => {
    console.log(currentSlide);
  };

  useEffect(() => {
    let isMounted = true;

    const loadOrderCards = async () => {
      setLoading(true);
      setError("");
      try {
        const result = await fetchAdminOrderCards({
          per_page: pageSize,
          page: currentPage,
        });

        if (!isMounted) {
          return;
        }

        const cards = Array.isArray(result.cards)
          ? result.cards.map((card) => {
              const status = String(card.status || "pending").toLowerCase();
              const paymentMethod = String(
                card.payment_method || "cash"
              ).toLowerCase();

              return {
                id: card.id,
                icon: statusIconMap[status] || pendingIcon,
                title: String(card.title || "Order").toUpperCase(),
                displayimg: dp,
                name: card.name || "Customer",
                orderid: card.orderid || card.id || "-",
                createdAt: card.date || null,
                method: {
                  icon: paymentIconMap[paymentMethod] || banktransfer,
                  details: card.payment_details || paymentMethod,
                },
                date: formatCardDate(card.date),
                Amount: formatAmount(card.amount),
                rawStatus: String(card.raw_status || card.status || "pending"),
              };
            })
          : [];

        const apiSummary = result.summary || {};
        const apiMeta = result.meta || {};
        setOrderCards(cards);
        setSummary({
          active: Number(apiSummary.active || 0),
          pending: Number(apiSummary.pending || 0),
          cancelled: Number(apiSummary.cancelled || 0),
          refunded: Number(apiSummary.refunded || 0),
          completed: Number(apiSummary.completed || 0),
        });
        setTotalOrders(Number(apiMeta.total || 0));
      } catch (fetchError) {
        if (!isMounted) {
          return;
        }
        setError(
          fetchError?.response?.data?.message ||
            fetchError?.message ||
            "Failed to load admin orders."
        );
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadOrderCards();

    return () => {
      isMounted = false;
    };
  }, [currentPage, pageSize]);

  const iconData = useMemo(
    () =>
      allorderstatus.map((item) => {
        const key = item.title.toLowerCase();
        return {
          ...item,
          amount: String(summary[key] ?? 0),
        };
      }),
    [summary]
  );

  const filteredOrderCards = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return orderCards.filter((item) => {
      const matchesSearch =
        !normalizedQuery ||
        String(item.orderid || "")
          .toLowerCase()
          .includes(normalizedQuery) ||
        String(item.name || "")
          .toLowerCase()
          .includes(normalizedQuery);

      return matchesSearch && matchesOrderDate(item.createdAt, selectedDate);
    });
  }, [orderCards, searchQuery, selectedDate]);

  const getPlaceholderText = "Search by order ID or buyer name";
  const isTrackableStatus = (status) => {
    const normalized = String(status || "")
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "_")
      .replace(/-/g, "_");

    return normalized === "accepted" || normalized === "on_the_way";
  };

  const getStatusBorderColor = (status) => {
    const normalized = String(status || "")
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "_")
      .replace(/-/g, "_");

    if (normalized === "accepted") {
      return "#0B9843";
    }

    if (normalized === "on_the_way") {
      return "#D76514";
    }

    return null;
  };

  const handleOrderCardClick = (item) => {
    if (!isTrackableStatus(item?.rawStatus)) {
      return;
    }

    setDetailsInitialTab("tab1");
    setSelectedOrder(item);
  };

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
          initialTab={detailsInitialTab}
        />
      ) : (
        <div>
          <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
            <h2 style={styles.heading}>Order</h2>
            <div style={styles.headerControls}>
              {/* <Addbutton text={text} onClick={handleAddButtonClick} /> */}
              <Search
                placeholder={getPlaceholderText}
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                style={{
                  width: "260px",
                  height: "56px",
                  marginTop: 0,
                  padding: "16px",
                  border: "1px solid #B5C3C3",
                }}
              />
              <Calender
                placeholder="Filter by date"
                data={presets}
                value={selectedDate}
                onChange={(value) => setSelectedDate(value)}
                style={styles.calendar}
              />
            </div>
          </div>

          {renderCourierList()}

          {error ? (
            <Alert
              type="error"
              showIcon
              style={{ margin: "12px 20px" }}
              message={error}
            />
          ) : null}

          <div style={userCardGridStyles}>
            {loading ? (
              <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "24px 0" }}>
                <Spin />
              </div>
            ) : (
              filteredOrderCards.map((item) => (
                <CardOrder
                  item={item}
                  key={item.id || item.orderid}
                  isClickable={isTrackableStatus(item.rawStatus)}
                  onClick={() => handleOrderCardClick(item)}
                  borderColor={getStatusBorderColor(item.rawStatus)}
                />
              ))
            )}
          </div>

          {!loading && !filteredOrderCards.length ? (
            <div style={{ margin: "12px 20px", color: "#545E5E" }}>
              No orders matched the current search or date filter.
            </div>
          ) : null}

          {!loading && totalOrders > pageSize ? (
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                margin: "16px 20px 0 20px",
              }}
            >
              <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={totalOrders}
                showSizeChanger={false}
                onChange={(page) => setCurrentPage(page)}
              />
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}

export default Order;
