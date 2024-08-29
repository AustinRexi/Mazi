import { Menu, Dropdown, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";

const DropdownMenu = () => {
  const menu = (
    <Menu>
      <Menu.Item key="1">View</Menu.Item>
      <Menu.Item key="2">Remove</Menu.Item>
      <Menu.Item key="3">Pay now</Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={["click"]} placement="bottomLeft">
      <Button>
        Options <DownOutlined />
      </Button>
    </Dropdown>
  );
};

export default DropdownMenu;
