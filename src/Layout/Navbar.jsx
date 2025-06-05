import { Row, Col, Select, Button, Drawer, Menu } from "antd";
import { useState, useEffect, useContext } from "react";
import { PlusOutlined, MenuOutlined } from "@ant-design/icons";
import cart from "../utils/icons/cart.svg";
import notification from "../utils/icons/notification.svg";
import avatar from "../utils/icons/avatar.svg"; // Fallback image
import flag from "../utils/icons/flag.svg";
import menu from "../utils/icons/menu.svg";
import logo from "../utils/icons/logo.svg";
import MenuItem from "./MenuItems";
import { AuthContext } from "../context/AuthContext"; // Adjust path to your Auth.jsx

const Navbar = () => {
  const { Option } = Select;
  const { user } = useContext(AuthContext);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
  const [drawerOpen, setDrawerOpen] = useState(false);

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
          <Row gutter={[14, 18]}>
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
              <div style={{ display: "flex", gap: "16px", marginTop: 14 }}>
                <img src={cart} alt="Cart" />
                <img src={notification} alt="Notifications" />
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
                <img src={cart} alt="" />
                <img src={notification} alt="" />
                <Button
                  type="primary"
                  style={{ height: 32, fontFamily: "roboto" }}
                >
                  Add store {<PlusOutlined />}
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
    </div>
  );
};

export default Navbar;
