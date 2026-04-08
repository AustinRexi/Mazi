import { useState, useEffect } from "react";
import { Carousel, Spin, Empty, Alert, message } from "antd";
import { useNavigate } from "react-router-dom";
import Search from "../../Components/Product/Search";
import dayjs from "dayjs";
import Calender from "../Dashboard/Calender";
import data from "../../Components/CourierandOrder/data";
import CourierCard from "../../Components/Courier/CourierCard";
import UserCard from "../../Components/Courier/UserCard";
import {
  fetchAdminUsers,
  updateAdminUserStatus,
  deleteAdminUser,
} from "../../services/adminUserService";
import mail from "../../Assets/Couriericons/mail.svg";
import phone from "../../Assets/Couriericons/phone.svg";
import star from "../../Assets/Foodicons/Star.svg";

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
      gridTemplateColumns: "repeat(2, 1fr)",
    };
  } else {
    return {
      ...baseStyles,
      gridTemplateColumns: "repeat(4, 1fr)",
    };
  }
};

const styles = {
  container: { padding: "15px" },
  header: {
    display: "flex",
    alignItems: "center",
    gap: "19px",
    flexWrap: "wrap",
  },
  searchBox: {
    width: "531px",
    height: "45px",
    borderRadius: "16px",
    border: "1px solid #B5C3C3",
    padding: "0 16px",
  },
  calendar: {
    height: "48px",
    cursor: "pointer",
  },
  listContainer: {
    display: "flex",
    flexDirection: "row",
    gap: "16px",
    marginTop: "40px",
    width: "104%",
    maxWidth: "1080px",
    padding: 14,
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
};

const presets = [
  { label: "Date Joined", value: dayjs().add(-1, "month") },
  { label: "Active", value: dayjs().subtract(3, "month") },
  { label: "Busy", value: dayjs().subtract(6, "month") },
  { label: "Offline", value: dayjs().add(-1, "month") },
];

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api";
const STORAGE_BASE_URL = API_BASE_URL.replace(/\/api\/?$/, "");

const resolveProfilePic = (value) => {
  if (!value) {
    return null;
  }

  const raw = String(value).trim();
  if (!raw) {
    return null;
  }

  if (/^https?:\/\//i.test(raw)) {
    return raw;
  }

  return `${STORAGE_BASE_URL}/storage/${raw.replace(/^\/+/, "")}`;
};

const normalizeStatus = (status) => {
  const value = String(status || "").trim().toLowerCase();
  if (value === "approved") {
    return "approved";
  }
  if (value === "rejected" || value === "suspended") {
    return "rejected";
  }
  return "pending";
};

const toStatusLabel = (status) => {
  if (status === "approved") {
    return "Approved";
  }
  if (status === "rejected") {
    return "Rejected";
  }
  return "Pending";
};

const formatCurrency = (value) => {
  const amount = Number(value);
  if (!Number.isFinite(amount)) {
    return "N/A";
  }

  return `USDM ${amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

const Courier = () => {
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [couriers, setCouriers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [joinedDateRange, setJoinedDateRange] = useState(null);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    let isMounted = true;

    const loadCouriers = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetchAdminUsers({
          usertype: "courier",
          per_page: 200,
          ...(searchQuery.trim() ? { q: searchQuery.trim() } : {}),
        });

        if (!isMounted) {
          return;
        }

        const mapped = Array.isArray(response?.data)
          ? response.data.map((entry) => {
              const firstName = entry.firstname || entry.firstName || "";
              const lastName = entry.lastname || entry.lastName || "";
              const status = normalizeStatus(entry.status);
              const vehicleType = String(
                entry.courier_vehicle_type || "FOOT"
              ).toUpperCase();

              return {
                id: entry.id,
                title: vehicleType,
                status,
                statusText: toStatusLabel(status),
                statusIcon: status,
                dp: resolveProfilePic(entry.profilePics),
                name:
                  `${firstName} ${lastName}`.trim() ||
                  entry.name ||
                  "N/A",
                createdAt: entry.created_at,
                rating: {
                  icon: star,
                  descriptio: "4.8  (196)",
                },
                email: {
                  icon: mail,
                  address: entry.email || "N/A",
                },
                phone: {
                  icon: phone,
                  mobile: entry.phone || "N/A",
                },
                model: {
                  name: entry.courier_vehicle_brand || "N/A",
                  color: entry.courier_vehicle_color || "N/A",
                },
                drive: {
                  item: "vehicleNo",
                  value: entry.courier_vehicle_number || "N/A",
                },
                walletAmount: formatCurrency(entry.courier_wallet_amount),
                userPoint: Number.isFinite(Number(entry.user_point))
                  ? Number(entry.user_point).toLocaleString("en-US")
                  : "N/A",
              };
            })
          : [];

        setCouriers(mapped);
      } catch (requestError) {
        if (!isMounted) {
          return;
        }

        setError(
          requestError?.response?.data?.message ||
            requestError?.message ||
            "Failed to load couriers."
        );
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadCouriers();

    return () => {
      isMounted = false;
    };
  }, [searchQuery]);

  const handleStatusUpdate = async (courierId, statusValue) => {
    try {
      await updateAdminUserStatus(courierId, statusValue);
      setCouriers((previous) =>
        previous.map((item) => {
          if (item.id !== courierId) {
            return item;
          }

          const normalized = normalizeStatus(statusValue);
          return {
            ...item,
            status: normalized,
            statusIcon: normalized,
            statusText: toStatusLabel(normalized),
          };
        })
      );
      message.success(`Courier ${toStatusLabel(normalizeStatus(statusValue))}.`);
    } catch (requestError) {
      message.error(
        requestError?.response?.data?.message ||
          requestError?.message ||
          "Failed to update courier status."
      );
    }
  };

  const handleDelete = async (courier) => {
    const shouldDelete = window.confirm(
      `Delete courier ${courier?.name || ""}?`
    );
    if (!shouldDelete) {
      return;
    }

    try {
      await deleteAdminUser(courier.id);
      setCouriers((previous) => previous.filter((item) => item.id !== courier.id));
      message.success("Courier deleted.");
    } catch (requestError) {
      message.error(
        requestError?.response?.data?.message ||
          requestError?.message ||
          "Failed to delete courier."
      );
    }
  };

  const onCarouselChange = (currentSlide) => {
    console.log(currentSlide);
  };

  const filteredCouriers = couriers.filter((item) => {
    if (
      !joinedDateRange ||
      !Array.isArray(joinedDateRange) ||
      joinedDateRange.length !== 2 ||
      !joinedDateRange[0] ||
      !joinedDateRange[1]
    ) {
      return true;
    }

    if (!item.createdAt) {
      return false;
    }

    const createdAtDate = dayjs(item.createdAt);
    if (!createdAtDate.isValid()) {
      return false;
    }

    const startDate = joinedDateRange[0].startOf("day");
    const endDate = joinedDateRange[1].endOf("day");

    return (
      createdAtDate.isSame(startDate) ||
      createdAtDate.isSame(endDate) ||
      (createdAtDate.isAfter(startDate) && createdAtDate.isBefore(endDate))
    );
  });

  const userCardGridStyles = getUserCardGridStyles(windowWidth);
  const typeCounts = filteredCouriers.reduce(
    (acc, item) => {
      acc.all += 1;
      const key = String(item.title || "").toUpperCase();
      if (acc[key] !== undefined) {
        acc[key] += 1;
      }
      return acc;
    },
    { all: 0, CAR: 0, MOTORCYCLE: 0, BICYCLE: 0, FOOT: 0 }
  );

  const summaryCards = data.map((item) => {
    const key = String(item.title || "").toUpperCase();
    if (key === "ALL COURIERS") {
      return { ...item, amount: typeCounts.all };
    }

    return {
      ...item,
      amount: typeCounts[key] ?? 0,
    };
  });

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
          {summaryCards.map((item, index) => (
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
          {summaryCards.map((item, index) => (
            <CourierCard key={index} item={item} />
          ))}
        </div>
      );
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h3 style={styles.h}>Courier</h3>
        <Search
          placeholder="Search couriers"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          style={{
            ...styles.searchBox,
            width: windowWidth <= 480 ? "100%" : "531px",
          }}
        />
        <Calender
          placeholder={["Joined from", "Joined to"]}
          value={joinedDateRange}
          onChange={(value) => setJoinedDateRange(value)}
          isRange
          needConfirm
          style={styles.calendar}
        />
      </div>

      {renderCourierList()}

      <div style={userCardGridStyles}>
        {loading ? (
          <div style={{ width: "100%", textAlign: "center", padding: "24px 0" }}>
            <Spin />
          </div>
        ) : null}

        {error ? (
          <Alert
            type="error"
            message={error}
            showIcon
            style={{ width: "100%", marginBottom: 12 }}
          />
        ) : null}

        {!loading && !error && filteredCouriers.length === 0 ? (
          <div style={{ width: "100%" }}>
            <Empty description="No couriers found" />
          </div>
        ) : null}

        {!loading && !error
          ? filteredCouriers.map((item) => (
              <UserCard
                datas={item}
                key={item.id}
                onView={(courier) => navigate(`/Courier/${courier.id}`)}
                onApprove={(courier) => handleStatusUpdate(courier.id, "approved")}
                onSuspend={(courier) => handleStatusUpdate(courier.id, "rejected")}
                onDelete={handleDelete}
              />
            ))
          : null}
      </div>
    </div>
  );
};

export default Courier;
