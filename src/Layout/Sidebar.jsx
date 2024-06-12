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

const Sidebar = () => {
  const side = [
    {
      name: "Dashboard",
      icon: homeIcon,
    },
    {
      name: "Products",
      icon: productIcon,
    },
    {
      name: "Orders",
      icon: orderIcon,
    },
    {
      name: "Customers",
      icon: customerIcon,
    },
    {
      name: "Currency Exchange",
      icon: currencyIcon,
    },
    {
      name: "Couriers",
      icon: courierIcon,
    },
    {
      name: "Wallet",
      icon: walletIcon,
    },
    {
      name: "Support",
      icon: supportIcon,
    },
    {
      name: "Settings",
      icon: settingIcon,
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
            <div key={index} style={{ display: "flex", marginBottom: 0 }}>
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
