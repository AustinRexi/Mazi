import React from "react";
import { Row, Col } from "antd";
import { Menu, Select, Button, Flex } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import cart from "../../utils/icons/cart.svg";
import notification from "../../utils/icons/notification.svg";
import avatar from "../../utils/icons/avatar.svg";
import flag from "../../utils/icons/flag.svg";
import menu from "../../utils/icons/menu.svg";
import logo from "../../utils/icons/logo.svg";

const Adminbar = () => {
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
      <Row gutter={[16, 16]}>
        <Col span={5}>
          <div
            style={{
              background: "#white",
              height: "50px",
              display: "flex",
              gap: 10,
              padding: 0,
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
              // justifyContent: "center",
              // flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ padding: 8 }}>
                <Select style={{ width: 200 }}>
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
                <Button type="primary" style={{ height: 28 }}>
                  Add store {<PlusOutlined />}
                </Button>
                <img src={avatar} alt="" srcset="" />
                {/* <Button type="primary">Add store {<PlusOutlined />}</Button> */}
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default Adminbar;

/* <Menu
theme="white"
mode="horizontal"
width="10px"
style={{
  display: "flex",
  justifyContent: "space-between",
  height: 72,
}}
>

{
  <Select
    defaultValue="lucy"
    options={[
      { value: "jack", label: "Jack" },
      { value: "lucy", label: "Lucy" },
      { value: "Yiminghe", label: "yiminghe" },
      { value: "disabled", label: "Disabled", disabled: true },
    ]}
  ></Select>

  <Menu.Item key="home" icon={<ShoppingCartOutlined />}>
    Home
  </Menu.Item>
  <Menu.Item key="home" icon={<BellOutlined />}>
    Home
  </Menu.Item>
  <Menu.Item key="profile" icon={<UserOutlined />}>
    Profile
  </Menu.Item>
  <Flex gap="small" wrap>
 
  </Flex>
</Menu> */
