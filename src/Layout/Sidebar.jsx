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
      top: "12px",
      marginTop: isActive ? "6px" : "",
      display: "flex",
      paddingLeft: "40px",
      alignItems: "center",
      textDecoration: isActive ? "" : "none",
      color: isActive ? "cyan" : "orange",
      borderLeft: isActive ? "5px solid #034147" : "none",
      height: isActive ? "56px" : "auto", // Set height to "24px" when active, otherwise "auto"
      borderRadius: isActive ? " 4px " : "0", // Adjust border-radius if necessary
      backgroundColor: isActive ? "#F2FBFB" : "",
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
          width: "50vh",
          minHeight: "100vh",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Space
          direction="vertical"
          size="8"
          style={{ width: "max-content", padding: 12, height: "160vh" }}
        >
          {side.map((item, index) => (
            <NavLink key={item.name} to={item.link} style={navLinkStyles}>
              <nav
                style={{
                  display: "flex",
                  marginTop: "4px",
                  cursor: "pointer",
                  justifyItems: "center",
                }}
              >
                {navLinkStyles}
                <img src={item.icon} alt="" style={{ marginBottom: "12px" }} />

                <Title
                  level={4}
                  style={{
                    marginLeft: "8px",
                    marginTop: "12px",
                    size: "16px",
                    fontWeight: 500,
                    lineHeight: "24px",
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
