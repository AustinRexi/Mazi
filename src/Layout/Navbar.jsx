import { Row, Col, Select, Button, Drawer, Menu, Badge, Modal } from "antd";
import { useState, useEffect, useContext } from "react";
import { MenuOutlined } from "@ant-design/icons";
import axios from "axios";
import flag from "../utils/icons/flag.svg";
import menu from "../utils/icons/menu.svg";
import logo from "../utils/icons/logo.svg";
import MenuItem from "./MenuItems";
import { AuthContext } from "../context/AuthContext"; // Adjust path to your Auth.jsx
import notification from "../utils/icons/notification.svg";
import UserManagement from "../views/usermanagement";
import addicon from "../Assets/Lineicons/Addicon.svg";
import { formatVendorMoney, useVendorCurrencyCode } from "../vendors/utils/currency";
import {
  getVendorRestaurantScope,
  setVendorRestaurantScope,
} from "../vendors/utils/restaurantScope";
import { fetchAdminCountries } from "../services/adminStoreService";
import {
  DEFAULT_ADMIN_COUNTRY,
  getAdminCountryScope,
  setAdminCountryScope,
} from "../utils/adminCountryScope";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api";

const Navbar = () => {
  const { Option } = Select;
  const { user } = useContext(AuthContext);
  const currencyCode = useVendorCurrencyCode();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const [pendingOrderNotifications, setPendingOrderNotifications] = useState([]);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState(() =>
    getVendorRestaurantScope()
  );
  const [notificationModalVisible, setNotificationModalVisible] =
    useState(false);
  const [userManagementModalVisible, setUserManagementModalVisible] =
    useState(false); // New state for UserManagement modal
  const [adminCountryOptions, setAdminCountryOptions] = useState([
    DEFAULT_ADMIN_COUNTRY,
  ]);
  const [selectedAdminCountry, setSelectedAdminCountry] = useState(() =>
    getAdminCountryScope()
  );
  const headerProfileImage =
    typeof user?.profileImage === "string" && user.profileImage.trim()
      ? user.profileImage
      : null;

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 1024);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (user?.role !== "admin") {
      return;
    }

    let mounted = true;

    const loadCountries = async () => {
      try {
        const countries = await fetchAdminCountries();
        if (!mounted) {
          return;
        }

        const nextOptions = Array.from(
          new Set([DEFAULT_ADMIN_COUNTRY, ...countries.filter(Boolean)])
        );
        setAdminCountryOptions(nextOptions);

        if (!nextOptions.includes(selectedAdminCountry)) {
          setSelectedAdminCountry(DEFAULT_ADMIN_COUNTRY);
          setAdminCountryScope(DEFAULT_ADMIN_COUNTRY);
        }
      } catch (_) {
        if (!mounted) {
          return;
        }

        setAdminCountryOptions([DEFAULT_ADMIN_COUNTRY]);
      }
    };

    loadCountries();

    return () => {
      mounted = false;
    };
  }, [selectedAdminCountry, user?.role]);

  useEffect(() => {
    if (user?.role !== "vendor") {
      return;
    }

    let isMounted = true;
    const token = localStorage.getItem("token");
    if (!token) {
      setNotificationCount(0);
      return;
    }

    const fetchPendingOrdersCount = async () => {
      try {
        if (!selectedRestaurantId) {
          const restaurantsResponse = await axios.get(
            `${API_BASE_URL}/vendor/restaurants?limit=100`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
              },
            }
          );
          const restaurantRows = restaurantsResponse.data?.data || [];
          const fallbackRestaurantId = restaurantRows[0]?.id || null;
          if (fallbackRestaurantId) {
            setSelectedRestaurantId(fallbackRestaurantId);
            setVendorRestaurantScope(fallbackRestaurantId);
          }
        }

        const query = new URLSearchParams({ limit: "100" });
        const effectiveRestaurantId = selectedRestaurantId || getVendorRestaurantScope();
        if (effectiveRestaurantId) {
          query.set("restaurant_id", String(effectiveRestaurantId));
        }

        const response = await axios.get(`${API_BASE_URL}/vendor/orders?${query.toString()}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });
        const rows = response.data?.data || [];
        const pendingOrders = rows.filter(
          (order) => String(order.order_status || "").toLowerCase() === "pending"
        );
        const pendingCount = pendingOrders.length;

        const pendingItems = pendingOrders
          .map((order) => {
            const timestamp = new Date(
              order.created_at || order.order_date || order.createdAt || Date.now()
            );
            const amount = Number(
              order.total_amount ??
                order.order_amount ??
                order.total ??
                order.amount ??
                0
            );
            return {
              id: order.order_number || `ORD-${order.id}`,
              sortTs: Number.isFinite(timestamp.getTime()) ? timestamp.getTime() : 0,
              time: Number.isFinite(timestamp.getTime())
                ? timestamp.toLocaleString()
                : "-",
              amount: Number.isFinite(amount) ? amount : 0,
            };
          })
          .sort((a, b) => b.sortTs - a.sortTs);

        if (isMounted) {
          setNotificationCount(pendingCount);
          setPendingOrderNotifications(pendingItems);
        }
      } catch {
        if (isMounted) {
          setNotificationCount(0);
          setPendingOrderNotifications([]);
        }
      }
    };

    fetchPendingOrdersCount();
    const interval = setInterval(fetchPendingOrdersCount, 10 * 1000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [user?.role, selectedRestaurantId]);

  const toggleDrawer = () => {
    setDrawerOpen((prev) => !prev);
  };

  // Function to handle opening the notification modal
  const handleOpenNotifications = () => {
    setNotificationModalVisible(true); // Open the notification modal
  };

  // Function to close the notification modal
  const handleCloseNotificationModal = () => {
    setNotificationModalVisible(false);
  };

  // Function to handle opening the UserManagement modal
  const handleOpenUserManagementModal = () => {
    setUserManagementModalVisible(true); // Open the UserManagement modal
  };

  // Function to close the UserManagement modal
  const handleCloseUserManagementModal = () => {
    setUserManagementModalVisible(false);
  };

  return (
    <div
      style={{
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      {isMobile ? (
        <div
          style={{
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Row
            gutter={[14, 18]}
            style={{ justifyContent: "center", alignContent: "center" }}
          >
            <Col span={6}>
              <Button
                type="text"
                icon={<MenuOutlined />}
                onClick={toggleDrawer}
                style={{ color: "#a4a4a4" }}
              />
            </Col>
            <Col span={8}>
              <img src={logo} alt="Logo" style={{ height: 40 }} />
            </Col>
            <Col span={5}>
              {user?.role === "admin" && (
                <Button
                  type="primary"
                  style={{ height: 22 }}
                  onClick={handleOpenUserManagementModal} // Updated to toggle modal
                >
                  <img src={addicon} alt="user management" />
                </Button>
              )}
            </Col>

            <Col span={2}>
              <div
                style={{
                  display: "flex",
                  gap: "16px",
                  marginTop: 14,
                  justifyContent: "center",
                }}
              >
                <Badge
                  count={notificationCount}
                  offset={[0, 0]}
                  style={{ backgroundColor: "#ff4d4f" }}
                >
                  <div
                    onClick={handleOpenNotifications}
                    style={{
                      width: "30px",
                      height: "30px",
                      backgroundColor: "#F2FBFB",
                      borderRadius: 8,
                      padding: "6px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                    }}
                  >
                    <img src={notification} alt="notifications" />
                  </div>
                </Badge>
                {headerProfileImage ? (
                  <img
                    src={headerProfileImage}
                    alt="Profile"
                    style={{
                      paddingRight: "2px",
                      width: "34px",
                      height: "32px",
                      borderRadius: "50%",
                    }}
                  />
                ) : (
                  <div
                    aria-hidden="true"
                    style={{
                      width: "34px",
                      height: "32px",
                      paddingRight: "2px",
                      borderRadius: "50%",
                    }}
                  />
                )}
              </div>
            </Col>
          </Row>
          <Drawer
            placement="left"
            onClose={toggleDrawer}
            open={drawerOpen}
            width={274}
          >
            <Menu mode="vertical">
              <MenuItem />
            </Menu>
          </Drawer>
        </div>
      ) : (
        <Row>
          <Col>
            <div
              style={{
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
                gap: "24px",
                width: "256px",
                background: "white",
                display: "flex",
                height: "78px",
                margin: 0,
                padding: 0,
              }}
            >
              <img src={menu} alt="" style={{}} />
              <img
                src={logo}
                alt=""
                style={{ width: "57.82px", height: "40px", marginTop: 16 }}
              />
            </div>
          </Col>
          <Col md={19} lg={19}>
            <div
              style={{
                background: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
                width: "102%",
                gap: 30,
                height: "78px",
              }}
            >
              <div style={{ padding: 8, marginLeft: 2 }}>
                {user?.role === "admin" ? (
                  <Select
                    value={selectedAdminCountry}
                    onChange={(value) => {
                      setSelectedAdminCountry(value);
                      setAdminCountryScope(value);
                    }}
                    style={{
                      width: 160,
                    }}
                  >
                    {adminCountryOptions.map((country) => (
                      <Option key={country} value={country} label={country}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <img
                            src={flag}
                            alt={country}
                            style={{
                              marginRight: "8px",
                              width: "30px",
                              height: "20px",
                            }}
                          />
                          <span
                            style={{
                              fontFamily: "NeueHaasDisplayRoman",
                              fontWeight: 500,
                              fontSize: "16px",
                              lineHeight: "24px",
                            }}
                          >
                            {country}
                          </span>
                        </div>
                      </Option>
                    ))}
                  </Select>
                ) : null}
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                  gap: 18,
                }}
              >
                <Badge
                  count={notificationCount}
                  offset={[0, 0]}
                  style={{ backgroundColor: "#ff4d4f" }}
                >
                  <div
                    onClick={handleOpenNotifications}
                    style={{
                      width: "30px",
                      height: "30px",
                      backgroundColor: "#F2FBFB",
                      borderRadius: 8,
                      padding: "6px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                    }}
                  >
                    <img src={notification} alt="notifications" />
                  </div>
                </Badge>
                {user?.role === "admin" && (
                  <Button
                    type="primary"
                    style={{ height: 32, fontFamily: "roboto" }}
                    onClick={handleOpenUserManagementModal} // Updated to toggle modal
                  >
                    User Management
                  </Button>
                )}
                {headerProfileImage ? (
                  <img
                    src={headerProfileImage}
                    alt="Profile"
                    style={{
                      paddingRight: "2px",
                      width: "34px",
                      height: "32px",
                      borderRadius: "50%",
                    }}
                  />
                ) : (
                  <div
                    aria-hidden="true"
                    style={{
                      width: "34px",
                      height: "32px",
                      paddingRight: "2px",
                      borderRadius: "50%",
                    }}
                  />
                )}
              </div>
            </div>
          </Col>
        </Row>
      )}
      {/* Notification Modal */}
      <Modal
        title="Notifications"
        open={notificationModalVisible}
        onCancel={handleCloseNotificationModal}
        footer={[
          <Button key="close" onClick={handleCloseNotificationModal}>
            Close
          </Button>,
        ]}
      >
        {user?.role === "vendor" ? (
          pendingOrderNotifications.length > 0 ? (
            <div style={{ maxHeight: 320, overflowY: "auto" }}>
              {pendingOrderNotifications.map((item) => (
                <div
                  key={`${item.id}-${item.time}`}
                  style={{
                    border: "1px solid #f0f0f0",
                    borderRadius: 8,
                    padding: 10,
                    marginBottom: 10,
                  }}
                >
                  <div><strong>Order ID:</strong> {item.id}</div>
                  <div><strong>Time:</strong> {item.time}</div>
                  <div>
                    <strong>Amount:</strong> {formatVendorMoney(item.amount, currencyCode)}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No pending orders.</p>
          )
        ) : (
          <p>No new notifications</p>
        )}
      </Modal>
      {/* User Management Modal */}
      <Modal
        title="User Management"
        open={userManagementModalVisible}
        onCancel={handleCloseUserManagementModal}
        footer={[
          <Button key="close" onClick={handleCloseUserManagementModal}>
            Close
          </Button>,
        ]}
        width={1000} // Adjust width as needed
      >
        <UserManagement />
      </Modal>
    </div>
  );
};

export default Navbar;
