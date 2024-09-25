import React from "react";
import { NavLink } from "react-router-dom";
import homeIcon from "../utils/icons/home.svg";
import productIcon from "../utils/icons/product.svg";
import orderIcon from "../utils/icons/orders.svg";
import customerIcon from "../utils/icons/customer.svg";
import currencyIcon from "../utils/icons/currency.svg";
import courierIcon from "../utils/icons/courier.svg";
import walletIcon from "../utils/icons/wallet.svg";
import supportIcon from "../utils/icons/support.svg";
import settingIcon from "../utils/icons/settings.svg";
import menu from "../utils/icons/menu.svg";
import logo from "../utils/icons/logo.svg";
import homefilled from "../utils/icons/homefilled.svg";
import productfilled from "../utils/icons/productfilled.svg";
import orderfilled from "../utils/icons/ordersfilled.svg";
import customersfilled from "../utils/icons/customersfilled.svg";
import currencyfilled from "../utils/icons/currencyfilled.svg";
import courierfilled from "../utils/icons/courierfilled.svg";
import walletfilled from "../utils/icons/walletfilled.svg";
import supportfilled from "../utils/icons/supportfilled.svg";
import settingsfilled from "../utils/icons/settingsfilled.svg";

import { Divider } from "antd"; // Import Divider from Ant Design

const Sidebar = () => {
  const menuItems = [
    {
      name: "Dashboard",
      icon: homeIcon,
      activeIcon: homefilled,
      path: "/Board",
    },
    {
      name: "Products",
      icon: productIcon,
      activeIcon: productfilled,
      path: "/Products",
    },
    {
      name: "Orders",
      icon: orderIcon,
      activeIcon: orderfilled,
      path: "/Orders",
    },
    {
      name: "Customers",
      icon: customerIcon,
      activeIcon: customersfilled,
      path: "/Customers",
    },
    {
      name: "Currency Exchange",
      icon: currencyIcon,
      activeIcon: currencyfilled,
      path: "/CurrencyExchange",
    },
    {
      name: "Couriers",
      icon: courierIcon,
      activeIcon: courierfilled,
      path: "/Courier",
    },
    {
      name: "Wallet",
      icon: walletIcon,
      activeIcon: walletfilled,
      path: "/Wallet",
    },
    {
      name: "Support",
      icon: supportIcon,
      activeIcon: supportfilled,
      path: "/Support",
    },
    {
      name: "Settings",
      icon: settingIcon,
      activeIcon: settingsfilled,
      path: "/Settings",
    },
  ];

  return (
    <div className="sidebar" style={styles.sidebar}>
      <img src={menu} style={styles.logoIcon} alt="menu" />
      <img
        src={logo}
        style={{ ...styles.logoIcon, marginLeft: "10px" }}
        alt="logo"
      />

      <Divider style={styles.divider} />
      <nav>
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            style={({ isActive }) => ({
              ...styles.navLink,
              ...(isActive ? styles.activeNavLink : {}),
            })}
          >
            {({ isActive }) => (
              <>
                <img
                  src={isActive ? item.activeIcon : item.icon}
                  alt={item.name}
                  style={styles.icon}
                />
                {item.name}
                {item.notification && (
                  <span style={styles.notification}>•</span>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

const styles = {
  sidebar: {
    width: "20%", // Changed from 250px to 20%
    height: "100vh",
    backgroundColor: "white",
    color: "black",
    padding: "20px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    position: "fixed", // Added to keep sidebar in place
    left: 0, // Added to align sidebar to the left
    top: 0, // Added to align sidebar to the top
    overflowY: "auto", // Added to allow scrolling if content overflows
  },
  logo: {
    display: "flex",
    alignItems: "center",
    marginBottom: "12px",
    height: "72px", // Set height to 72px
  },
  logoIcon: {
    height: "32px", // Set height to 100% to fill the div
    width: "auto", // Maintain aspect ratio
    color: "black",
  },
  logoText: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "black",
  },
  navLink: {
    display: "flex",
    alignItems: "center",
    padding: "10px",
    textDecoration: "none",
    color: "black",
    position: "relative",
    borderRadius: "5px",
    marginBottom: "5px",
  },
  activeNavLink: {
    backgroundColor: "#F2FBFB",
    color: "black",
    fontWeight: "bold",
  },
  icon: {
    width: "20px",
    height: "20px",
    marginRight: "10px",
  },
  divider: {
    margin: "5px 0",
    borderColor: "#e8e8e8", // Light grey color for the divider
  },
  notification: {
    marginLeft: "auto",
    color: "red",
  },
  "@media (max-width: 768px)": {
    sidebar: {
      display: "none",
    },
  },
};

export default Sidebar;
