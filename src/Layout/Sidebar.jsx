import { Space, Typography } from "antd";
import homeIcon from "../utils/icons/home.svg";
import productIcon from "../utils/icons/product.svg";
import orderIcon from "../utils/icons/orders.svg";
import customerIcon from "../utils/icons/customer.svg";
import currencyIcon from "../utils/icons/currency.svg";
import courierIcon from "../utils/icons/courier.svg";
import walletIcon from "../utils/icons/wallet.svg";
import supportIcon from "../utils/icons/support.svg";
import settingIcon from "../utils/icons/settings.svg";
import { NavLink } from "react-router-dom";
const { Title } = Typography;
// const active=

const Sidebar = () => {
  const navLinkStyles = ({ isActive }) => {
    return {
      fontWeight: isActive ? 200 : 100,
      textDecoration: isActive ? "none" : "underline",
      color: isActive ? "cyan" : "orange",
      borderLeft: isActive ? "5px solid " : "none",
      hover: isActive ? "brown" : "green",
      borderRadiusLeft: isActive ? "50px" : "0",
    };
  };
  const side = [
    {
      name: "Dashboard",
      icon: homeIcon,
      link: "/Board",
    },
    {
      name: "Products",
      icon: productIcon,
      link: "/Products",
    },
    {
      name: "Orders",
      icon: orderIcon,
      link: "/Orders",
    },
    {
      name: "Customers",
      icon: customerIcon,
      link: "/Customers",
    },
    {
      name: "Currency Exchange",
      icon: currencyIcon,
      link: "/CurrencyExchange",
    },
    {
      name: "Couriers",
      icon: courierIcon,
      link: "/Courier",
    },
    {
      name: "Wallet",
      icon: walletIcon,
      link: "/Wallet",
    },
    {
      name: "Support",
      icon: supportIcon,
      link: "/Support",
    },
    {
      name: "Settings",
      icon: settingIcon,
      link: "/Settings",
    },
  ];
  return (
    <>
      <div
        style={{
          width: "39vh",
          minHeight: "100vh",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Space
          direction="vertical"
          size="6"
          style={{ width: "100%", padding: 12 }}
        >
          {side.map((item, index) => (
            <NavLink key={item.name} to={item.link} style={navLinkStyles}>
              <nav
                style={{
                  display: "flex",
                  marginBottom: 0,
                  cursor: "pointer",
                  justifyItems: "center",
                }}
              >
                <img src={item.icon} alt="" style={{ marginTop: "12px" }} />

                <Title
                  level={5}
                  style={{
                    marginLeft: "8px",
                    // fontWeight: 200,
                    marginBottom: 0,
                  }}
                >
                  {item.name}
                </Title>
              </nav>
            </NavLink>
          ))}
        </Space>
      </div>
    </>
  );
};

export default Sidebar;
