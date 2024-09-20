import React from "react";
import {
  Layout,
  Typography,
  Space,
  Button,
  Input,
  Select,
  Card,
  Avatar,
  Tag,
  Row,
  Col,
  Pagination,
  Divider,
} from "antd";
import mastercard from "../../Assets/Ordericons/mastercard.svg";
import bank from "../../Assets/Ordericons/bank.svg";
import mazitoken from "../../Assets/Ordericons/mazitoken.svg";
import paypal from "../../Assets/Ordericons/paypal.svg";
import dp from "../../Assets/Couriericons/dp.svg";
import pending from "../../Assets/Ordericons/pending.svg";
import active from "../../Assets/Ordericons/active.svg";
import refunded from "../../Assets/Ordericons/refunded.svg";
import cancelled from "../../Assets/Ordericons/cancel.svg";
import complete from "../../Assets/Ordericons/complete.svg";
import Bottompageignition from "../../Components/Product/Bottompageigition";

import OrdersCard from "./OrdersCard";
import OrdersHeader from "./OrderHeader";

const { Content } = Layout;
const { Text } = Typography;
const { Option } = Select;

const Orders = () => {
  const statusData = [
    { status: "Active", count: 12220, statusIcon: active },
    { status: "Pending", count: 12220, statusIcon: pending },
    { status: "Cancelled", count: 12220, statusIcon: cancelled },
    { status: "Refunded", count: 12220, statusIcon: refunded },
    { status: "Completed", count: 12220, statusIcon: complete },
  ];

  return (
    <Layout>
      <OrdersHeader />

      <Content style={{ padding: "10px" }}>
        <Card style={{ marginBottom: 10 }}>
          <Space
            wrap
            style={{ justifyContent: "space-evenly", display: "flex" }}
          >
            {statusData.map(({ status, count, statusIcon }) => (
              <Tag
                style={{
                  borderRadius: "8px",
                  padding: "2px 10px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <img src={statusIcon} alt="" style={{ marginRight: "5px" }} />
                {status}
                <Text
                  strong
                  style={{
                    backgroundColor: "#F3F3F3",
                    padding: "2px 5px",
                    borderRadius: "4px",
                    marginLeft: "10px",
                  }}
                >
                  {count}
                </Text>
              </Tag>
            ))}
          </Space>
        </Card>

        <OrdersCard />
      </Content>

      <Bottompageignition />
    </Layout>
  );
};

const getStatusColor = (status) => {
  const colors = {
    Active: "#2296f3",
    Pending: "#ff9800",
    Cancelled: "#f44336",
    Refunded: "#9e9e9e",
    Completed: "#4caf50",
  };
  return colors[status] || "default";
};

export default Orders;
