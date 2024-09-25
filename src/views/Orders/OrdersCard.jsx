import React, { useState } from "react";
import { Typography, Space, Card, Avatar, Tag, Row, Col, Divider } from "antd";
import mastercard from "../../Assets/Ordericons/mastercard.svg";
import bank from "../../Assets/Ordericons/bank.svg";
import mazitoken from "../../Assets/Ordericons/mazitoken.svg";
import paypal from "../../Assets/Ordericons/paypal.svg";
import dp from "../../Assets/Couriericons/dp.svg";
import activeIcon from "../../Assets/Ordericons/activestatus.svg";
import CancelledIcon from "../../Assets/Ordericons/cancelstatus.svg";
import PendingIcon from "../../Assets/Ordericons/pendingstatus.svg";
import CompletedIcon from "../../Assets/Ordericons/completestatus.svg";
import RefundedIcon from "../../Assets/Ordericons/refundedstatus.svg";
// import { OrderLayout } from "./OrderLayout";
import OrderDropDown from "./OrderDropDown";
const { Text } = Typography;
const orderData = [
  {
    vendor: "GROCERIES",
    orderId: "465765322",
    methodIcon: mastercard,
    method: "****0556",
    amount: "N14,560.00",
    StatusIcon: activeIcon,
  },
  {
    vendor: "CHICKEN REPUBLIC",
    orderId: "465765323",
    methodIcon: mastercard,
    method: "****0556",
    amount: "N14,560.00",
    StatusIcon: activeIcon,
  },
  {
    vendor: "MR BIGGS",
    orderId: "465765324",
    methodIcon: mazitoken,
    method: "Mazi Token",
    amount: "N14,560.00",
    StatusIcon: RefundedIcon,
  },
  {
    vendor: "CHICKEN REPUBLIC",
    orderId: "465765325",
    methodIcon: paypal,
    method: "Paypal",
    amount: "N14,560.00",
    StatusIcon: PendingIcon,
  },
  {
    vendor: "TANTALIZER",
    orderId: "465765326",
    methodIcon: mastercard,
    method: "****0556",
    amount: "N14,560.00",
    StatusIcon: CompletedIcon,
  },
  {
    vendor: "KFC",
    orderId: "465765327",
    methodIcon: bank,
    method: "Bank transfer",
    amount: "N14,560.00",
    StatusIcon: CancelledIcon,
  },
  {
    vendor: "GROCERIES",
    orderId: "465765328",
    methodIcon: mastercard,
    method: "****0556",
    amount: "N14,560.00",
    StatusIcon: activeIcon,
  },
  {
    vendor: "TANTALIZER",
    orderId: "465765329",
    methodIcon: mastercard,
    method: "****0556",
    amount: "N14,560.00",
    StatusIcon: CompletedIcon,
  },
];

const OrdersCard = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div>
      <Row gutter={[16, 16]}>
        {orderData.map((order) => (
          <Col xs={24} sm={12} md={8} lg={6} key={order.orderId}>
            <Card
              bodyStyle={{ padding: "15px" }}
              onMouseEnter={() => setHoveredCard(order.orderId)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <Space
                direction="vertical"
                size="small"
                style={{ width: "100%" }}
              >
                <Space
                  style={{ width: "100%", justifyContent: "space-between" }}
                >
                  <img src={order.StatusIcon} alt="" />

                  <Space
                    style={{ justifyContent: "space-between", width: "100%" }}
                  >
                    <Text type="secondary" style={{ fontSize: "0.8em" }}>
                      {order.vendor}
                    </Text>
                    <div
                      style={{
                        visibility:
                          hoveredCard === order.orderId ? "visible" : "hidden",
                        transition: "visibility 0.3s",
                      }}
                    >
                      <OrderDropDown />
                    </div>
                  </Space>
                </Space>
                <Space>
                  <Avatar src={dp} />
                  <Text strong>Tiamiyu Wasiu</Text>
                </Space>

                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Text>Order ID </Text>
                  <Text> {order.orderId}</Text>
                </div>
                <Divider style={{ margin: "8px 0" }} />

                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Text>Method</Text>
                  <Text>
                    <img src={order.methodIcon} alt="" /> {order.method}
                  </Text>
                </div>
                <Divider style={{ margin: "8px 0" }} />
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Text>Date </Text>
                  <Text> Feb 13, 2024 10:15am</Text>
                </div>
                <Divider style={{ margin: "8px 0" }} />

                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Text>Amount </Text>
                  <Text> {order.amount}</Text>
                </div>
              </Space>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
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

export default OrdersCard;
