import { useState } from "react";
import { Drawer, Button, Menu } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import SideBar from "./SideBar";
import logo from "../utils/icons/logo.svg";
import cart from "../utils/icons/cart.svg";
import notification from "../utils/icons/notification.svg";

const NavBar = () => {
  const [open, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <Button
            type="text"
            icon={<MenuOutlined />}
            onClick={showDrawer}
            style={{ color: "#a4a4a4" }}
          />

          <img src={logo} alt="Logo" style={{ height: 40 }} />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <img src={cart} alt="" />
          <img src={notification} alt="" />
        </div>
      </div>

      <Drawer placement="left" onClose={onClose} open={open} width={292}>
        <Menu mode="vertical">
          <SideBar />
        </Menu>
      </Drawer>
    </>
  );
};

export default NavBar;
