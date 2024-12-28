import { Button, Dropdown, Menu } from "antd";
import { DownOutlined } from "@ant-design/icons";

const menu = (
  <Menu>
    <Menu.Item key="1">Delete</Menu.Item>{" "}
  </Menu>
);

const ActionButton = () => {
  return (
    <Dropdown overlay={menu} trigger={["click"]}>
      <Button
        style={{
          width: "103px",
          height: "40px",
          borderRadius: 8,
          padding: "12px 18px 12px 18px",
          gap: 4,
          border: "1px solid #EEEDDE",
          marginTop: 16,
          marginLeft: 16,
        }}
      >
        Action <DownOutlined />
      </Button>
    </Dropdown>
  );
};

export default ActionButton;
