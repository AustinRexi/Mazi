import React, { useMemo } from "react";
import { EllipsisOutlined } from "@ant-design/icons";
import { Dropdown, Space, Typography } from "antd";
import { useNavigate } from "react-router-dom";

const OrderDropDown = ({ handleFullFilModalState }) => {
  const navigate = useNavigate();

  const handleMenuClick = ({ key }) => {
    console.log("handleFullFilModalState", handleFullFilModalState);

    if (!key) return;
    switch (key) {
      case "1":
        navigate("/Orders/details");
        break;
      case "2":
        handleFullFilModalState(true);
        break;
      case "3":
        handleCancelOrder();
        break;
      case "4":
        handleRefundOrder();
        break;

      default:
        break;
    }
  };

  const handleFulfilOrder = () => {
    // Logic to fulfil the order
    handleFullFilModalState();
  };

  const handleCancelOrder = () => {
    // Logic to cancel the order
  };

  const handleRefundOrder = () => {
    // Logic to refund the order
  };

  const orderActions = useMemo(() => [
    {
      key: "1",
      label: "View",
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
  ]);

  return (
    <Dropdown
      menu={{
        items: orderActions,
        onClick: handleMenuClick,
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
