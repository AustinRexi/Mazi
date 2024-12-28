import { Dropdown, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";

const DropdownMenu = () => {
  return (
    <Dropdown overlay={menu} trigger={["click"]} placement="bottomLeft">
      <Button>
        Options <DownOutlined />
      </Button>
    </Dropdown>
  );
};

export default DropdownMenu;
