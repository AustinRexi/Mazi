import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
const items = [
  {
    key: "sub1",
    label: "Navigation One",
    icon: <MailOutlined />,
  },

  {
    key: "1",
    label: "Option 1",
  },
  {
    key: "2",
    label: "Option 2",
  },

  {
    key: "3",
    label: "Option 3",
  },
  {
    key: "4",
    label: "Option 4",
  },

  {
    key: "2",
    label: "Navigation Two",
    icon: <AppstoreOutlined />,
  },

  {
    type: "divider",
  },
  {
    key: "sub4",
    label: "Navigation Three",
    icon: <SettingOutlined />,
  },
];
const Sidebar = () => {
  const onClick = (e) => {
    console.log("click ", e);
  };
  return (
    <Menu
      onClick={onClick}
      style={{
        width: 256,
      }}
      defaultSelectedKeys={["1"]}
      items={items}
    />
  );
};
export default Sidebar;
