import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MyTable from "./MyTable";
import Search from "../../Components/Product/Search";
import ActionButton from "./ActionButton";
import Tabbutton from "../../Components/Product/Tabbutton";
import { Flex, Row, Col, Alert, message } from "antd";
import Bottompageignition from "../../Components/Product/Bottompageigition";
import FilteredItems from "./FilteredItems";
import {
  fetchAdminUsers,
  updateAdminUserStatus,
} from "../../services/adminUserService";
import {
  deleteAdminStore,
  fetchAdminStores,
} from "../../services/adminStoreService";

const DEFAULT_FILTERS = {
  status: "all",
  sortBy: "date-desc",
  joinedDate: null,
};

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

const formatDateJoined = (value) => {
  if (!value) {
    return "-";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
};

const formatNaira = (value) => {
  const amount = Number(value || 0);
  return `N${amount.toLocaleString("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

const formatUsdm = (value) => {
  const amount = Number(value);
  if (!Number.isFinite(amount)) {
    return "N/A";
  }

  return `USDM ${amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

const parseMoney = (value) => {
  if (typeof value === "number") {
    return value;
  }

  const normalized = String(value || "").replace(/[^\d.-]/g, "");
  const amount = Number(normalized);
  return Number.isFinite(amount) ? amount : 0;
};

const buildVendorName = (entry) => {
  const directName = String(
    entry?.vendor_name || entry?.vendor?.name || entry?.vendor?.full_name || ""
  ).trim();
  if (directName) {
    return directName;
  }

  const firstName =
    entry?.vendor_firstname ||
    entry?.vendor_first_name ||
    entry?.firstname ||
    entry?.firstName ||
    entry?.vendor?.firstname ||
    entry?.vendor?.firstName ||
    "";
  const lastName =
    entry?.vendor_lastname ||
    entry?.vendor_last_name ||
    entry?.lastname ||
    entry?.lastName ||
    entry?.vendor?.lastname ||
    entry?.vendor?.lastName ||
    "";

  const fullName = `${firstName} ${lastName}`.trim();
  return fullName || "Unknown Vendor";
};

const parseJoinedDate = (value) => {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
};

const matchesJoinedDate = (value, selectedDate) => {
  if (!selectedDate) {
    return true;
  }

  const parsed = parseJoinedDate(value);
  if (!parsed) {
    return false;
  }

  const [year, month, day] = selectedDate.split("-").map(Number);
  return (
    parsed.getFullYear() === year &&
    parsed.getMonth() + 1 === month &&
    parsed.getDate() === day
  );
};

const applyCustomerFilters = (items, filters) => {
  const scopedItems = Array.isArray(items) ? [...items] : [];
  const normalizedStatus = String(filters?.status || "all").toLowerCase();
  const sortBy = String(filters?.sortBy || "date-desc");
  const joinedDate = filters?.joinedDate || null;

  const filteredItems = scopedItems.filter((item) => {
    const itemStatus = String(item?.status || "").trim().toLowerCase();
    const matchesStatus =
      normalizedStatus === "all" || itemStatus === normalizedStatus;

    return matchesStatus && matchesJoinedDate(item?.datejoined, joinedDate);
  });

  const compareText = (left, right) => left.localeCompare(right, undefined, { sensitivity: "base" });

  filteredItems.sort((left, right) => {
    switch (sortBy) {
      case "name-asc":
        return compareText(left?.name?.title || "", right?.name?.title || "");
      case "name-desc":
        return compareText(right?.name?.title || "", left?.name?.title || "");
      case "email-asc":
        return compareText(left?.email || "", right?.email || "");
      case "email-desc":
        return compareText(right?.email || "", left?.email || "");
      case "amount-asc":
        return parseMoney(left?.amountSpent) - parseMoney(right?.amountSpent);
      case "amount-desc":
        return parseMoney(right?.amountSpent) - parseMoney(left?.amountSpent);
      case "wallet-asc":
        return parseMoney(left?.wallet) - parseMoney(right?.wallet);
      case "wallet-desc":
        return parseMoney(right?.wallet) - parseMoney(left?.wallet);
      case "store-asc":
        return compareText(left?.store || "", right?.store || "");
      case "store-desc":
        return compareText(right?.store || "", left?.store || "");
      case "date-asc": {
        const leftDate = parseJoinedDate(left?.datejoined);
        const rightDate = parseJoinedDate(right?.datejoined);
        return (leftDate?.getTime() || 0) - (rightDate?.getTime() || 0);
      }
      case "date-desc":
      default: {
        const leftDate = parseJoinedDate(left?.datejoined);
        const rightDate = parseJoinedDate(right?.datejoined);
        return (rightDate?.getTime() || 0) - (leftDate?.getTime() || 0);
      }
    }
  });

  return filteredItems;
};

function Customers() {
  const navigate = useNavigate();
  const [activeTabKey, setActiveTabKey] = useState("user");
  const [users, setUsers] = useState([]);
  const [stores, setStores] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [loadingStores, setLoadingStores] = useState(false);
  const [usersError, setUsersError] = useState("");
  const [storesError, setStoresError] = useState("");
  const [userSearchQuery, setUserSearchQuery] = useState("");
  const [storeSearchQuery, setStoreSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [totalUsers, setTotalUsers] = useState(0);
  const [currentStorePage, setCurrentStorePage] = useState(1);
  const [storePageSize, setStorePageSize] = useState(20);
  const [totalStores, setTotalStores] = useState(0);
  const [storesReloadKey, setStoresReloadKey] = useState(0);
  const [userFilters, setUserFilters] = useState(DEFAULT_FILTERS);
  const [storeFilters, setStoreFilters] = useState(DEFAULT_FILTERS);

  const onTabChange = (tab) => {
    setActiveTabKey(tab);
  };

  const getPlaceholderText = "Search Users or Stores";
  const activeSearchValue =
    activeTabKey === "user" ? userSearchQuery : storeSearchQuery;

  useEffect(() => {
    let isMounted = true;

    const loadUsers = async () => {
      setLoadingUsers(true);
      setUsersError("");
      try {
        const response = await fetchAdminUsers({
          usertype: "user",
          per_page: pageSize,
          page: currentPage,
          ...(userSearchQuery.trim() ? { q: userSearchQuery.trim() } : {}),
        });

        if (!isMounted) {
          return;
        }

        const mappedUsers = Array.isArray(response?.data)
          ? response.data.map((entry) => {
              const firstName = entry.firstname || entry.firstName || "";
              const lastName = entry.lastname || entry.lastName || "";
              const fullName =
                `${firstName} ${lastName}`.trim() || entry.name || "Unknown User";

              return {
                key: entry.id,
                name: { title: fullName, icon: resolveProfilePic(entry.profilePics) },
                email: entry.email || "-",
                phone: entry.phone || "-",
                amountSpent: formatNaira(entry.amount_spent),
                userPoint: formatUsdm(entry.user_point),
                datejoined: formatDateJoined(entry.created_at),
                status:
                  String(entry.status || "")
                    .replace(/\b\w/g, (c) => c.toUpperCase())
                    .trim() || "Pending",
                store: null,
                wallet: null,
              };
            })
          : [];

        setUsers(mappedUsers);
        setTotalUsers(Number(response?.total || 0));
      } catch (error) {
        if (!isMounted) {
          return;
        }
        setUsersError(
          error?.response?.data?.message ||
            error?.message ||
            "Failed to load users."
        );
      } finally {
        if (isMounted) {
          setLoadingUsers(false);
        }
      }
    };

    loadUsers();

    return () => {
      isMounted = false;
    };
  }, [currentPage, pageSize, userSearchQuery]);

  useEffect(() => {
    let isMounted = true;

    const loadStores = async () => {
      setLoadingStores(true);
      setStoresError("");
      try {
        const response = await fetchAdminStores({
          per_page: storePageSize,
          page: currentStorePage,
          ...(storeSearchQuery.trim() ? { q: storeSearchQuery.trim() } : {}),
        });

        if (!isMounted) {
          return;
        }

        const mappedStores = Array.isArray(response?.data)
          ? response.data.map((entry) => ({
              key: `store-${entry.id}`,
              id: entry.id,
              vendorId: entry.vendor_user_id || entry.vendor_id || null,
              name: {
                title: buildVendorName(entry),
                icon: resolveProfilePic(entry.restaurant_logo),
              },
              email: entry.vendor_email || entry.restaurant_email || "-",
              phone: null,
              amountSpent: null,
              datejoined: formatDateJoined(entry.created_at),
              status:
                String(entry.vendor_status || "pending")
                  .replace(/\b\w/g, (c) => c.toUpperCase())
                  .trim() || "Pending",
              store: entry.restaurant_name || "-",
              wallet: formatNaira(entry.vendor_wallet_amount),
            }))
          : [];

        setStores(mappedStores);
        setTotalStores(Number(response?.total || 0));
      } catch (error) {
        if (!isMounted) {
          return;
        }
        setStoresError(
          error?.response?.data?.message ||
            error?.message ||
            "Failed to load stores."
        );
      } finally {
        if (isMounted) {
          setLoadingStores(false);
        }
      }
    };

    loadStores();

    return () => {
      isMounted = false;
    };
  }, [currentStorePage, storePageSize, storeSearchQuery, storesReloadKey]);

  const filteredUsers = useMemo(
    () => applyCustomerFilters(users, userFilters),
    [users, userFilters]
  );

  const filteredStores = useMemo(
    () => applyCustomerFilters(stores, storeFilters),
    [stores, storeFilters]
  );

  const dataReference = useMemo(
    () => ({ user: filteredUsers, store: filteredStores }),
    [filteredStores, filteredUsers]
  );

  const handleStoreApprove = async (record) => {
    if (!record?.vendorId) {
      message.error("Vendor ID is missing for this store.");
      return;
    }

    try {
      await updateAdminUserStatus(record.vendorId, "approved");
      message.success("Vendor approved successfully.");
      setStoresReloadKey((previous) => previous + 1);
    } catch (error) {
      message.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to approve vendor."
      );
    }
  };

  const handleStoreSuspend = async (record) => {
    if (!record?.vendorId) {
      message.error("Vendor ID is missing for this store.");
      return;
    }

    try {
      await updateAdminUserStatus(record.vendorId, "rejected");
      message.success("Vendor suspended successfully.");
      setStoresReloadKey((previous) => previous + 1);
    } catch (error) {
      message.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to suspend vendor."
      );
    }
  };

  const handleStoreDelete = async (record) => {
    if (!record?.id) {
      message.error("Store ID is missing.");
      return;
    }

    try {
      await deleteAdminStore(record.id);
      message.success("Store deleted successfully.");
      setStoresReloadKey((previous) => previous + 1);
    } catch (error) {
      message.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to delete store."
      );
    }
  };

  const activeFilters = activeTabKey === "user" ? userFilters : storeFilters;

  return (
    <div
      style={{
        padding: "8px",
        background: "#F8FBFB",
        minHeight: "100vh",
      }}
    >
      <Row gutter={[16, 16]}>
        <Col
          xs={24} // Full width on mobile
          sm={12} // Half width on small tablets
          md={6} // Quarter width on medium devices
          lg={3} // Original width on desktop
        >
          <h2
            style={{
              marginTop: "20px",
              color: "#000000",
              fontWeight: 500,
              fontSize: "clamp(18px, 4vw, 24px)", // Responsive font size
              lineHeight: "32px",
              marginLeft: 4,
            }}
          >
            Customers
          </h2>
        </Col>

        <Col
          xs={0} // Hidden on mobile
          sm={0}
          md={2}
          lg={2}
        />

        <Col xs={24} sm={24} md={16} lg={18}>
          <Flex
            style={{
              gap: 8,
              flexWrap: "wrap", // Allow wrapping on smaller screens
              width: "100%",
              justifyContent: "flex-end",
            }}
          >
            <Search
              placeholder={getPlaceholderText}
              value={activeSearchValue}
              onChange={(event) => {
                const nextValue = event.target.value;
                if (activeTabKey === "user") {
                  setUserSearchQuery(nextValue);
                  setCurrentPage(1);
                  return;
                }

                setStoreSearchQuery(nextValue);
                setCurrentStorePage(1);
              }}
              style={{
                width: "100%", // Full width on all screens
                maxWidth: "531px", // Maximum width on larger screens
                height: "45px",
                borderRadius: "16px",
                border: "1px solid #B5C3C3",
                padding: "0 16px",
                marginLeft: 0, // Remove fixed margin
              }}
            />
            <ActionButton />
            <FilteredItems
              activeTabKey={activeTabKey}
              filters={activeFilters}
              onFilterApply={(nextFilters) => {
                if (activeTabKey === "user") {
                  setUserFilters(nextFilters);
                  setCurrentPage(1);
                  return;
                }

                setStoreFilters(nextFilters);
                setCurrentStorePage(1);
              }}
              style={{
                minWidth: "119px",
                height: "40px",
                borderRadius: "8px",
                flexShrink: 0,
              }}
            />
          </Flex>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 8 }}>
        <Col xs={24} md={18}>
          <Flex
            style={{
              gap: "10px",
              padding: "2px 8px",
              border: "1px solid #B5B6B5",
              borderRadius: "16px",
              height: "48px",
              width: "100%", // Full width instead of fixed
              maxWidth: "154px",
              marginLeft: 0,
              justifyContent: "center",
              alignItems: "center",
            }}
            wrap
          >
            {[
              { id: "user", label: "Users" },
              { id: "store", label: "Stores" },
            ].map(({ id, label }) => (
              <Tabbutton
                key={id}
                activeTabKey={activeTabKey}
                id={id}
                handleClick={() => onTabChange(id)}
                style={{
                  color: "#494949",
                  fontSize: "clamp(14px, 2vw, 16px)", // Responsive font
                  lineHeight: "24px",
                  width: "60px",
                  borderRadius: "2px",
                  marginTop: "8px",
                }}
              >
                {label}
              </Tabbutton>
            ))}
          </Flex>
        </Col>
        <Col
          xs={24}
          md={6}
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          <Bottompageignition
            isVisible={false}
            currentPage={
              activeTabKey === "user"
                ? currentPage
                : activeTabKey === "store"
                ? currentStorePage
                : undefined
            }
            pageSize={
              activeTabKey === "user"
                ? pageSize
                : activeTabKey === "store"
                ? storePageSize
                : undefined
            }
            totalItems={
              activeTabKey === "user"
                ? totalUsers
                : activeTabKey === "store"
                ? totalStores
                : undefined
            }
            onPageChange={
              activeTabKey === "user"
                ? (page) => setCurrentPage(page)
                : activeTabKey === "store"
                ? (page) => setCurrentStorePage(page)
                : undefined
            }
            onPageSizeChange={
              activeTabKey === "user"
                ? (size) => {
                    setPageSize(size);
                    setCurrentPage(1);
                  }
                : activeTabKey === "store"
                ? (size) => {
                    setStorePageSize(size);
                    setCurrentStorePage(1);
                  }
                : undefined
            }
          />
        </Col>
      </Row>

      <MyTable
        activeTabKey={activeTabKey}
        data={dataReference[activeTabKey]}
        loading={
          activeTabKey === "user"
            ? loadingUsers
            : activeTabKey === "store"
            ? loadingStores
            : false
        }
        pagination={false}
        onStoreView={(record) => {
          if (!record?.id) {
            message.error("Store ID is missing.");
            return;
          }
          navigate(`/Customers/store/${record.id}`);
        }}
        onStoreApprove={handleStoreApprove}
        onStoreSuspend={handleStoreSuspend}
        onStoreDelete={handleStoreDelete}
        style={{ width: "100%" }}
      />
      {activeTabKey === "user" && usersError ? (
        <Alert
          type="error"
          showIcon
          message={usersError}
          style={{ margin: "0 20px 12px" }}
        />
      ) : null}
      {activeTabKey === "store" && storesError ? (
        <Alert
          type="error"
          showIcon
          message={storesError}
          style={{ margin: "0 20px 12px" }}
        />
      ) : null}
      <Bottompageignition
        isVisible={true}
        currentPage={
          activeTabKey === "user"
            ? currentPage
            : activeTabKey === "store"
            ? currentStorePage
            : undefined
        }
        pageSize={
          activeTabKey === "user"
            ? pageSize
            : activeTabKey === "store"
            ? storePageSize
            : undefined
        }
        totalItems={
          activeTabKey === "user"
            ? totalUsers
            : activeTabKey === "store"
            ? totalStores
            : undefined
        }
        onPageChange={
          activeTabKey === "user"
            ? (page) => setCurrentPage(page)
            : activeTabKey === "store"
            ? (page) => setCurrentStorePage(page)
            : undefined
        }
        onPageSizeChange={
          activeTabKey === "user"
            ? (size) => {
                setPageSize(size);
                setCurrentPage(1);
              }
            : activeTabKey === "store"
            ? (size) => {
                setStorePageSize(size);
                setCurrentStorePage(1);
              }
            : undefined
        }
      />
    </div>
  );
}

export default Customers;
