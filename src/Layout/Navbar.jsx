import { Row, Col, Select, Button, Drawer, Menu, Badge, Modal } from "antd";
import { useState, useEffect, useContext } from "react";
import { MenuOutlined, BellOutlined } from "@ant-design/icons";
import avatar from "../utils/icons/avatar.svg"; // Fallback image
import flag from "../utils/icons/flag.svg";
import menu from "../utils/icons/menu.svg";
import logo from "../utils/icons/logo.svg";
import MenuItem from "./MenuItems";
import { AuthContext } from "../context/AuthContext"; // Adjust path to your Auth.jsx
import notification from "../utils/icons/notification.svg";

const Navbar = () => {
  const { Option } = Select;
  const { user } = useContext(AuthContext);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(7);
  const [modalVisible, setModalVisible] = useState(false);

  const optionsWithImages = [
    {
      value: "apple",
      label: "Apple",
      image: "https://via.placeholder.com/30x30",
    },
    {
      value: "banana",
      label: "Banana",
      image: "https://via.placeholder.com/30x30",
    },
    {
      value: "Nigeria",
      label: "Nigeria",
      image: flag,
    },
  ];

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 1024);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleDrawer = () => {
    setDrawerOpen((prev) => !prev);
  };

  // Function to handle incoming notifications
  const handleNewNotification = () => {
    setNotificationCount((prev) => prev + 1);
  };

  // Function to handle opening the notification modal
  const handleOpenNotifications = () => {
    setNotificationCount(0); // Reset count to 0
    setModalVisible(true); // Open the modal
  };

  // Function to close the notification modal
  const handleCloseModal = () => {
    setModalVisible(false);
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
            <Col span={12}>
              <img src={logo} alt="Logo" style={{ height: 40 }} />
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
                <img
                  src={user?.profileImage || avatar}
                  alt="Profile"
                  style={{
                    paddingRight: "2px",
                    width: "34px",
                    height: "32px",
                    borderRadius: "50%",
                  }}
                />
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
                <Select
                  defaultValue="Nigeria"
                  style={{
                    width: 130,
                  }}
                >
                  {optionsWithImages.map((option) => (
                    <Option
                      key={option.value}
                      value={option.value}
                      label={option.label}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <img
                          src={option.image}
                          alt={option.label}
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
                          {option.label}
                        </span>
                      </div>
                    </Option>
                  ))}
                </Select>
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
                <Button
                  type="primary"
                  style={{ height: 32, fontFamily: "roboto" }}
                >
                  User Management
                </Button>
                <img
                  src={user?.profileImage || avatar}
                  alt="Profile"
                  style={{
                    paddingRight: "2px",
                    width: "34px",
                    height: "32px",
                    borderRadius: "50%",
                  }}
                />
              </div>
            </div>
          </Col>
        </Row>
      )}
      <Modal
        title="Notifications"
        open={modalVisible}
        onCancel={handleCloseModal}
        footer={[
          <Button key="close" onClick={handleCloseModal}>
            Close
          </Button>,
          <Button key="test" onClick={handleNewNotification}>
            Simulate New Notification
          </Button>,
        ]}
      >
        <p>No new notifications</p>
        {/* Replace with actual notification content */}
      </Modal>
    </div>
  );
};

export default Navbar;
