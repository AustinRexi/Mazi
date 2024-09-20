import React from "react";
import { EllipsisOutlined } from "@ant-design/icons";
import { Dropdown, Space, Typography } from "antd";

const orderActions = [
  {
    key: "1",
    label: "View",
    path: "Order/OrderDetails",
  },
  {
    key: "2",
    label: "Fulfil",
  },
  {
    key: "3",
    label: "Cancel",
  },
  {
    key: "4",
    label: "Refund",
  },
];

const OrderDropDown = ({ link }) => {
  // const navigate = useNavigate();

  // const handleMenuClick = ({ key }) => {
  //   const selectedAction = orderActions.find((action) => action.key === key);

  //   if (!selectedAction) return;

  //   switch (key) {
  //     case "1":
  //       if (selectedAction.path) {
  //         navigate(selectedAction.path);
  //       }
  //       break;
  //     case "2":
  //       handleFulfilOrder();
  //       break;
  //     case "3":
  //       handleCancelOrder();
  //       break;
  //     case "4":
  //       handleRefundOrder();
  //       break;
  //     default:
  //       break;
  //   }
  // };

  // const handleFulfilOrder = () => {
  //   // Logic to fulfil the order
  // };

  // const handleCancelOrder = () => {
  //   // Logic to cancel the order
  // };

  // const handleRefundOrder = () => {
  //   // Logic to refund the order
  // };

  return (
    <Dropdown
      menu={{
        items: link,
        // onClick: handleMenuClick,
        selectable: true,
      }}
      trigger={["click"]}
    >
      <Typography.Link>
        <Space>
          <EllipsisOutlined
            rotate={90}
            style={{
              fontSize: "15px",
              color: "#9e9e9e",
            }}
          />
        </Space>
      </Typography.Link>
    </Dropdown>
  );
};

export default OrderDropDown;
