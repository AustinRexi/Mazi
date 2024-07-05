import React from "react";
import { Avatar, List, Typography } from "antd";
import chicken from "../../utils/icons/chickenRepublic.svg";
import food from "../../utils/icons/Food.svg";
import diet from "../../utils/icons/diet.svg";
import healthy from "../../utils/icons/healthy.svg";
import { Card } from "antd";
import "./Global.css";

const { Title } = Typography;
const data = [
  {
    title: "Chicken Republic",
    price: "N56,789",
    image: chicken,
  },
  {
    title: "ETPL Foods",
    price: "N56,789",
    image: food,
  },
  {
    title: "Diet Click",
    price: "N56,789",
    image: diet,
  },
  {
    title: "Eat Healthy",
    price: "N56,789",
    image: healthy,
  },
];
const { Meta } = Card;
const Orders = () => (
  <Card
    hoverable
    style={{
      width: 240,
    }}
  >
    <header>Top Stores</header>
    <List
      itemLayout="horizontal"
      dataSource={data}
      renderItem={(item, index) => (
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar src={item.image} />}
            title={item.title}
            description={item.price}
          />
        </List.Item>
      )}
    />
  </Card>
);
export default Orders;
