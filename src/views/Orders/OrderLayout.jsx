import { Link, Outlet } from "react-router-dom";
import { Card, Dropdown, Menu, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";

export const OrderLayout = () => {
  const link = [
    {
      key: "1",
      label: "View",
      to: "OrderDetails", // Adjust the path as necessary
    },
    {
      key: "2",
      label: "Fulfil",
      to: "Order/Fulfil", // Adjust the path as necessary
    },
    {
      key: "3",
      label: "Cancel",
      to: "Order/Cancel", // Adjust the path as necessary
    },
    {
      key: "4",
      label: "Refund",
      to: "Order/Refund", // Adjust the path as necessary
    },
  ];

  // Create a menu for the dropdown
  const menu = (
    <Menu>
      {link.map((el) => (
        <Menu.Item key={el.key}>
          <Link to={el.to}>{el.label}</Link>
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <div style={{ width: "100%", padding: "8px" }}>
      <Card
        style={{ margin: "auto", borderRadius: "16px", borderColor: "#d9d9d9" }} // Adjust border color as needed
        bodyStyle={{
          display: "flex",
          justifyContent: "center",
          padding: "8px",
        }}
      >
        <Dropdown overlay={menu} trigger={["click"]}>
          <a
            onClick={(e) => e.preventDefault()}
            style={{ display: "flex", alignItems: "center" }}
          >
            Select Option <DownOutlined />
          </a>
        </Dropdown>
      </Card>
      <div style={{ color: "#595959" }}>
        <Outlet />
      </div>
    </div>
  );
};
