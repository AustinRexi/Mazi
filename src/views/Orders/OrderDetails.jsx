import React from "react";
import {
  Row,
  Col,
  Card,
  Avatar,
  List,
  Button,
  Divider,
  Typography,
  Input,
} from "antd";
import {
  MailOutlined,
  PhoneOutlined,
  MessageOutlined,
} from "@ant-design/icons";

import jollof from "../../Assets/RestaurantIcons/Jollof.svg";
import softdrink from "../../Assets/RestaurantIcons/Softdrink.svg";
import mazitoken from "../../Assets/Ordericons/mazitoken.svg";
import active from "../../Assets/Ordericons/active.svg";
import mastercard from "../../Assets/Ordericons/mastercard.svg";
import OrderDetailsHeader from "../Wallet/OrderDetailsHeader";

const OrderDetails = () => {
  const { Title, Text } = Typography;
  const { TextArea } = Input;

  const orderItems = [
    {
      title: "Jollof Rice and Curry Chicken Flavour",
      price: "$140",
      quantity: 3,
      image: jollof,
      kitchen: "MAZI KITCHEN",
    },
    {
      title: "50Cl of Fearless Drink",
      price: "$0",
      quantity: 1,
      image: softdrink,
      kitchen: "MAZI KITCHEN",
    },
  ];

  const calculateTotal = () => {
    return orderItems.reduce(
      (total, item) =>
        total + item.quantity * parseFloat(item.price.replace("$", "")),
      0
    );
  };

  const renderOrderItem = (item) => (
    <List.Item>
      <List.Item.Meta
        avatar={
          <img
            src={item.image}
            alt={item.title}
            style={{ width: 50, height: 50, borderRadius: "50%" }}
          />
        }
        title={
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>{item.title}</span>
            <div style={{ margin: "0 10px", textAlign: "center" }}>
              {item.quantity}
            </div>
            <span style={{ marginLeft: "auto", color: "gray" }}>
              {item.kitchen}
            </span>
          </div>
        }
        description={
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>{item.price} Per plate</span>
            <strong style={{ marginLeft: "auto", color: "black" }}>
              ${item.quantity * parseFloat(item.price.replace("$", ""))}
            </strong>
          </div>
        }
      />
    </List.Item>
  );

  return (
    <div style={{ padding: "20px" }}>
      <OrderDetailsHeader />
      <Row gutter={[16, 16]}>
        <Col xs={24} md={16}>
          <Card>
            <Divider />
            <h3>Delivery in progress (2)</h3>
            <List
              itemLayout="horizontal"
              dataSource={orderItems}
              renderItem={renderOrderItem}
            />
            <Divider />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <List>
                <strong>Delivery</strong>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={mazitoken}
                    alt="Mazi Token"
                    style={{ marginRight: "10px" }}
                  />
                  <p style={{ margin: 0 }}>Mazi Delivery</p>
                </div>
              </List>
              <strong>Free</strong>
            </div>
            <Divider />
            <h3>Payment Summary</h3>
            <List>
              {orderItems.map((item, index) => (
                <List.Item key={index}>
                  <List.Item.Meta title={item.title} />
                  <div>
                    ${item.quantity * parseFloat(item.price.replace("$", ""))}
                  </div>
                </List.Item>
              ))}
              <List.Item>
                <List.Item.Meta title="Delivery" />
                <div>Free</div>
              </List.Item>
              <List.Item>
                <List.Item.Meta title="Service fee" />
                <div>$10</div>
              </List.Item>
              <List.Item>
                <List.Item.Meta title="Total" />
                <strong>${calculateTotal() + 10}</strong>
              </List.Item>
            </List>
            <Divider />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src={active}
                  alt="Status"
                  style={{ marginRight: "10px" }}
                />
                <h3 style={{ margin: 0 }}>Status</h3>
              </div>
              <Text style={{ color: "green", fontWeight: 600 }}>
                Successful
              </Text>
            </div>
            <Divider />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>Payment method</h3>
              <p>
                4526****0556 <img src={mastercard} alt="Mastercard" />
              </p>
            </div>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card>
            <Title level={4}>Customer</Title>
            <Card.Meta
              avatar={
                <Avatar style={{ backgroundColor: "#00a2ae" }}>US</Avatar>
              }
              title="Usman Salawatu"
              description={<Text type="secondary">Joined Mar. 16, 2024</Text>}
            />

            <Divider />
            <h3>Contact Info</h3>
            <p>
              <MailOutlined /> tianyiwuwo@gmail.com
            </p>
            <p>
              <PhoneOutlined /> 08160178711
            </p>
            <Row gutter={[16, 16]}>
              <Col>
                <Button
                  type="default"
                  icon={<MessageOutlined />}
                  style={{
                    backgroundColor: "#d1f0f2",
                    color: "#004d4d",
                    borderColor: "#d1f0f2",
                    borderRadius: "8px",
                    padding: "0 20px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  Message
                </Button>
              </Col>
              <Col>
                <Button
                  type="default"
                  icon={<PhoneOutlined />}
                  style={{
                    backgroundColor: "#d1f0f2",
                    color: "#004d4d",
                    borderColor: "#d1f0f2",
                    borderRadius: "8px",
                    padding: "0 20px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  Call
                </Button>
              </Col>
            </Row>
            <Divider />
            <div style={{ padding: "20px" }}>
              <Title level={4}>Address</Title>
              <Text>17 Simbiat Abiola Way</Text>
              <br />
              <Text>Ikeja, Lagos</Text>
              <br />
              <Text
                style={{
                  marginTop: "10px",
                  display: "block",
                  color: "#8c8c8c",
                }}
              >
                Additional Info:
              </Text>
              <TextArea
                value="Street Opposite Access Bank beside the yellow mall."
                autoSize={{ minRows: 2, maxRows: 4 }}
                style={{ marginTop: "5px", borderRadius: "8px" }}
                bordered
              />
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default OrderDetails;
