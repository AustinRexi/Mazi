import { Row, Col, Select, Button, Drawer, Menu } from "antd";

import { useState, useEffect } from "react";
import { PlusOutlined, MenuOutlined } from "@ant-design/icons";
import cart from "../utils/icons/cart.svg";
import notification from "../utils/icons/notification.svg";
import avatar from "../utils/icons/avatar.svg";
import flag from "../utils/icons/flag.svg";
import menu from "../utils/icons/menu.svg";
import logo from "../utils/icons/logo.svg";

import MenuItem from "./MenuItems";

const Navbar = () => {
  const { Option } = Select;
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
    setIsMobile(window.innerWidth <= 768);
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
    <div>
      {isMobile ? (
        <div className="mobile-nav">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "16px",
            }}
          >
            <Button
              type="text"
              icon={<MenuOutlined />}
              onClick={toggleDrawer}
              style={{ color: "#a4a4a4" }}
            />
            <img src={logo} alt="Logo" style={{ height: 40 }} />
            <div style={{ display: "flex", gap: "16px" }}>
              <img src={cart} alt="Cart" />
              <img src={notification} alt="Notifications" />
            </div>
          </div>
          <Drawer
            placement="left"
            onClose={toggleDrawer}
            open={drawerOpen}
            width={292}
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
                gap: "24px",
                width: "256px",
                background: "#white",
                height: "72px",
                display: "flex",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
                marginBottom: "1px",
                marginLeft: "1px",
                border: "0px 1px 0px 0px",
                opacity: "0px",
              }}
            >
              <img src={menu} alt="" />
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
                height: "72px",
                alignItems: "center",

                width: "auto",
              }}
            >
              <div
                style={{
                  padding: 10,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
                  width: "100%",
                  // paddingRight: 20,
                  marginRight: 20,
                }}
              >
                <div style={{ padding: 10 }}>
                  <Select
                    defaultValue="Nigeria"
                    style={{
                      width: 200,
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
                    gap: 14,
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
                  <img src={avatar} alt="" style={{ paddingRight: "6px" }} />
                </div>
              </div>
            </div>
          </Col>
        </Row>
      )}
    </div>
  );
};
export default Navbar;
