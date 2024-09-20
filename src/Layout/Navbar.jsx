// // import { Row, Col } from "antd";
// // import { Select, Button } from "antd";
// // import { PlusOutlined } from "@ant-design/icons";
// // import cart from "../utils/icons/cart.svg";
// // import notification from "../utils/icons/notification.svg";
// // import avatar from "../utils/icons/avatar.svg";
// // import flag from "../utils/icons/flag.svg";
// import menu from "../utils/icons/menu.svg";
// import logo from "../utils/icons/logo.svg";

// // const Navbar = () => {
// //   const { Option } = Select;

// const optionsWithImages = [
//   {
//     value: "apple",
//     label: "Apple",
//     image: "https://via.placeholder.com/30x30",
//   },
//   {
//     value: "banana",
//     label: "Banana",
//     image: "https://via.placeholder.com/30x30",
//   },
//   {
//     value: "Nigeria",
//     label: "Nigeria",
//     image: flag,
//   },
// ];
// //   return (
// //     <div>
// //       <Row>
// //         <Col>
// //           <div
// //             style={{
// //               gap: "24px",
// //               width: "256px",
// //               background: "#white",
// //               height: "72px",
// //               display: "flex",
// //               boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
// //               marginBottom: "1px",
// //               marginLeft: "1px",
// //               border: "0px 1px 0px 0px",
// //               opacity: "0px",
// //             }}
// //           >
// //             <img src={menu} alt="" />
// //             <img src={logo} alt="" />
// //           </div>
// //         </Col>
// //         <Col span={19}>
// //           <div
// //             style={{
// //               background: "white",
// //               height: "72px",
// //               alignItems: "center",
// //               padding: 0,
// //               width: "auto",
// //             }}
// //           >
// //             <div
// //               style={{
// //                 padding: 10,
// //                 display: "flex",
// //                 alignItems: "center",
// //                 justifyContent: "space-between",
// //                 boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
// //               }}
// //             >
// //               <div style={{ padding: 10 }}>
// <Select defaultValue="Nigeria" style={{ width: 200 }}>
//   {optionsWithImages.map((option) => (
//     <Option
//       key={option.value}
//       value={option.image}
//       label={option.label}
//     >
//       <div style={{ display: "flex", alignItems: "center" }}>
//         <img
//           src={option.image}
//           alt={option.label}
//           style={{
//             marginRight: "8px",
//             width: "30px",
//             height: "20px",
//           }}
//         />
//         {option.label}
//       </div>
//     </Option>
//   ))}
// </Select>
// //               </div>

// //               <div
// //                 style={{
// //                   display: "flex",
// //                   alignItems: "center",
// //                   justifyContent: "space-evenly",
// //                   gap: 10,
// //                 }}
// //               >
// //                 <img src={cart} alt="" />
// //                 <img src={notification} alt="" />
// //                 <Button type="primary" style={{ height: 32 }}>
// //                   Add store {<PlusOutlined />}
// //                 </Button>
// //                 <img src={avatar} alt="" style={{ paddingRight: "6px" }} />
// //               </div>
// //             </div>
// //           </div>
// //         </Col>
// //       </Row>
// //     </div>
// //   );
// // };
// // export default Navbar;

// import React, { useState } from "react";
// import { Row, Col, Select, Button, Drawer } from "antd";
// import { PlusOutlined, MenuOutlined } from "@ant-design/icons";
// import cart from "../utils/icons/cart.svg";
// import notification from "../utils/icons/notification.svg";
// import avatar from "../utils/icons/avatar.svg";
// import flag from "../utils/icons/flag.svg";
// import logo from "../utils/icons/logo.svg";

// const Navbar = () => {
//   const [visible, setVisible] = useState(false);
//   const { Option } = Select;

//   // ... existing optionsWithImages ...

//   return (
//     <div>
//       <Row align="middle" justify="space-between">
//         <Col xs={12} sm={6} md={4} lg={3}>
//           <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
//             <MenuOutlined onClick={() => setVisible(true)} style={{ fontSize: '24px', cursor: 'pointer' }} />
//             <img src={logo} alt="Logo" style={{ height: "40px" }} />
//           </div>
//         </Col>
//         <Col xs={0} sm={18} md={20} lg={21}>
//           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//             <Select defaultValue="Nigeria" style={{ width: 200 }}>
//               {/* ... existing Select options ... */}
//             </Select>
//             <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//               <img src={cart} alt="Cart" />
//               <img src={notification} alt="Notifications" />
//               <Button type="primary" icon={<PlusOutlined />}>
//                 Add store
//               </Button>
//               <img src={avatar} alt="Avatar" />
//             </div>
//           </div>
//         </Col>
//       </Row>
//       <Drawer
//         title="Menu"
//         placement="left"
//         onClose={() => setVisible(false)}
//         visible={visible}
//       >
//         {/* Add mobile menu items here */}
//         <Select defaultValue="Nigeria" style={{ width: '100%', marginBottom: 16 }}>
//           {/* ... existing Select options ... */}
//         </Select>
//         <Button type="primary" icon={<PlusOutlined />} style={{ width: '100%', marginBottom: 16 }}>
//           Add store
//         </Button>
//         {/* Add other menu items as needed */}
//       </Drawer>
//     </div>
//   );
// };

// export default Navbar;

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
