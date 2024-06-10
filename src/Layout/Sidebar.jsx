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
const { Title } = Typography;
// const active=

const Sidebar = () => {
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
      {/* <ul>
        {side.map((item, index) => {
          return (
            <li
              key={index}
              onClick={() => {
                window.location.pathname = item.link;
              }}
            >
              <img src={item.icon} alt="" />
              <div>{item.name}</div>
            </li>
          );
        })}
      </ul> */}

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
            <div
              key={index}
              onClick={() => {
                window.location.pathname = item.link;
              }}
              style={{ display: "flex", marginBottom: 0, cursor: "pointer" }}
              id={window.location.pathname == item.link ? "active" : ""}
            >
              <img src={item.icon} alt="" style={{ marginTop: "12px" }} />

              <Title
                level={5}
                style={{
                  marginLeft: "8px",
                  fontWeight: 200,
                  marginBottom: 0,
                }}
              >
                {item.name}
              </Title>
            </div>
          ))}
        </Space>
      </div>
    </>
  );
};

export default Sidebar;
