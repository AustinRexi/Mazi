import React from "react";
import { Select, Button, Badge, Avatar } from "antd";
import {
  ShoppingCartOutlined,
  BellOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import avatar from "../utils/icons/avatar.svg";
import flag from "../utils/icons/flag.svg";
import logo from "../utils/icons/logo.svg";
const Navbar = () => {
  const optionsWithImages = [
    {
      value: "apple",
      label: "Apple",
      image: "https://via.placeholder.com/30x30",
    },
    {
      value: "banana",
      label: "Banana",
      image: "https://via.placeholder.com/30x30",
    },
    {
      value: "Nigeria",
      label: "Nigeria",
      image: flag,
    },
  ];
  return (
    <div style={styles.navbarContainer}>
      <div style={styles.navbar}>
        <div style={styles.leftSection}>
          <Select
            defaultValue="Nigeria"
            style={styles.select}
            suffixIcon={
              <img src={flag} alt="Nigeria flag" style={styles.flag} />
            }
          >
            <Select.Option value="Nigeria">Nigeria</Select.Option>
            {/* Add more country options here */}
          </Select>
        </div>

        <div style={styles.rightSection}>
          <Badge count={2} style={styles.badge}>
            <ShoppingCartOutlined style={styles.icon} />
          </Badge>
          <Badge count={1} style={styles.badge}>
            <BellOutlined style={styles.icon} />
          </Badge>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            style={styles.addStoreButton}
          >
            Add store
          </Button>
          <Avatar src={avatar} size="large" style={styles.avatar} />
        </div>
      </div>
    </div>
  );
};

const styles = {
  navbarContainer: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    backgroundColor: "white",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  },
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    width: "100%",
    borderBottom: "1px solid #e8e8e8",
    boxShadow:
      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  },
  leftSection: {
    display: "flex",
    alignItems: "center",
  },
  select: {
    width: 150,
  },
  flag: {
    width: 20,
    height: 15,
    marginLeft: 8,
  },
  rightSection: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },
  icon: {
    fontSize: 24,
    color: "#333",
  },
  badge: {
    backgroundColor: "#ff4d4f",
  },
  addStoreButton: {
    backgroundColor: "#034147",
    borderColor: "#034147",
  },
  avatar: {
    cursor: "pointer",
  },
};

export default Navbar;
