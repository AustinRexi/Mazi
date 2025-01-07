import { NavLink } from "react-router-dom";
import { Typography, Space } from "antd";
import homeIcon from "../utils/icons/home.svg";
import productIcon from "../utils/icons/product.svg";
import orderIcon from "../utils/icons/orders.svg";
import customerIcon from "../utils/icons/customer.svg";
import currencyIcon from "../utils/icons/currency.svg";
import courierIcon from "../utils/icons/courier.svg";
import walletIcon from "../utils/icons/wallet.svg";
import supportIcon from "../utils/icons/support.svg";
import settingIcon from "../utils/icons/settings.svg";
import homefilled from "../utils/icons/homefilled.svg";
import productfilled from "../utils/icons/productfilled.svg";
import orderfilled from "../utils/icons/ordersfilled.svg";
import customersfilled from "../utils/icons/customersfilled.svg";
import currencyfilled from "../utils/icons/currencyfilled.svg";
import courierfilled from "../utils/icons/courierfilled.svg";
import walletfilled from "../utils/icons/walletfilled.svg";
import supportfilled from "../utils/icons/supportfilled.svg";
import settingsfilled from "../utils/icons/settingsfilled.svg";

const { Title } = Typography;

const navLinkStyles = ({ isActive }) => ({
  top: "12px",
  marginTop: isActive ? "6px" : "",
  display: "flex",
  color: isActive ? "cyan" : "orange",
  borderLeft: isActive ? "7px solid #034147" : "none",
  height: isActive ? "56px" : "auto",
  borderRadius: isActive ? "6px" : "0",
  backgroundColor: isActive ? "#F2FBFB" : "",
  justifyItems: "center",
  alignItems: "center",
  padding: isActive ? "8px 16px" : "8px 40px",
});

const side = [
  { name: "Dashboard", icon: homeIcon, activeIcon: homefilled, link: "/" },
  {
    name: "Products",
    icon: productIcon,
    activeIcon: productfilled,
    link: "/Products",
  },
  { name: "Orders", icon: orderIcon, activeIcon: orderfilled, link: "/Orders" },
  {
    name: "Customers",
    icon: customerIcon,
    activeIcon: customersfilled,
    link: "/Customers",
  },
  {
    name: "Currency Exchange",
    icon: currencyIcon,
    activeIcon: currencyfilled,
    link: "/CurrencyExchange",
  },
  {
    name: "Couriers",
    icon: courierIcon,
    activeIcon: courierfilled,
    link: "/Courier",
  },
  {
    name: "Wallet",
    icon: walletIcon,
    activeIcon: walletfilled,
    link: "/Wallet",
  },
  {
    name: "Support",
    icon: supportIcon,
    activeIcon: supportfilled,
    link: "/Support",
  },
  {
    name: "Settings",
    icon: settingIcon,
    activeIcon: settingsfilled,
    link: "/Settings",
  },
];

const MenuItem = () => {
  return (
    <Space
      direction="vertical"
      size="8"
      style={{
        width: "258px",
        padding: 4,
        height: "160vh",
      }}
    >
      {side.map((item) => (
        <NavLink key={item.name} to={item.link} style={navLinkStyles}>
          {({ isActive }) => (
            <nav
              style={{
                display: "flex",
                marginTop: "4px",
                gap: "4px",
                cursor: "pointer",
                justifyItems: "flex-start",
                alignContent: "center",
              }}
            >
              <img
                src={isActive ? item.activeIcon : item.icon}
                alt={item.name}
              />
              <Title
                level={4}
                style={{
                  marginLeft: "6px",
                  marginTop: "10px",
                  fontSize: "16px",
                  fontWeight: 500,
                  lineHeight: "24px",
                  fontFamily: "NeueHaasDisplayLight",
                }}
              >
                {item.name}
              </Title>
            </nav>
          )}
        </NavLink>
      ))}
    </Space>
  );
};

export default MenuItem;
