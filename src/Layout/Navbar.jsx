import React from "react";
import { Row, Col } from "antd";
import { Select, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import cart from "../utils/icons/cart.svg";
import notification from "../utils/icons/notification.svg";
import avatar from "../utils/icons/avatar.svg";
import flag from "../utils/icons/flag.svg";
import menu from "../utils/icons/menu.svg";
import logo from "../utils/icons/logo.svg";

const Navbar = () => {
  const { Option } = Select;

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
  return (
    <div>
      <Row>
        <Col>
          <div
            style={{
              width: "32vh",
              background: "#white",
              height: "50px",
              display: "flex",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
            }}
          >
            <img src={menu} alt="" srcset="" />
            <img src={logo} alt="" srcset="" />
          </div>
        </Col>
        <Col
          span={19}
          // style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div
            style={{
              background: "white",
              height: "50px",
              alignItems: "center",
              padding: 0,
              width: "auto",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
              }}
            >
              <div style={{ padding: 8 }}>
                <Select defaultValue="Nigeria" style={{ width: 200 }}>
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
                        {option.label}
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
                  gap: 10,
                }}
              >
                <img src={cart} alt="" srcset="" />
                <img src={notification} alt="" srcset="" />
                <Button type="primary" style={{ height: 32 }}>
                  Add store {<PlusOutlined />}
                </Button>
                <img
                  src={avatar}
                  alt=""
                  srcset=""
                  style={{ paddingRight: "6px" }}
                />
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default Navbar;
