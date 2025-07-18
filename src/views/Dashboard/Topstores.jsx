import { Avatar, List, Card } from "antd";
import chicken from "../../utils/icons/chickenRepublic.svg";
import food from "../../utils/icons/Food.svg";
import diet from "../../utils/icons/diet.svg";
import healthy from "../../utils/icons/healthy.svg";

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

const Topstores = () => (
  <Card
    hoverable
    style={{
      width: 240,
      height: "340px",
      margin: 4,
      right: "50px",
    }}
  >
    <header
      style={{
        fontWeight: 400,
        fontSize: "24px",
        lineHeight: "32px",
        marginBottom: "12px",
      }}
    >
      Top Stores
    </header>
    <List
      itemLayout="horizontal"
      dataSource={data}
      renderItem={(item) => (
        <List.Item style={{ borderBottom: "none", padding: 4 }}>
          <List.Item.Meta
            avatar={<Avatar src={item.image} />}
            title={
              <span
                style={{
                  fontFamily: "NeueHaasDisplayRoman",
                  lineHeight: "24px",
                  fontSize: "16px",
                  fontWeight: 500,
                }}
              >
                {item.title}
              </span>
            }
            description={
              <span
                style={{
                  fontSize: "12px",
                  lineHeight: "16px",
                  fontWeight: 500,
                  fontFamily: "NeueHaasDisplayRoman",
                  color: "#2A2F2F",
                }}
              >
                {item.price}
              </span>
            }
          />
        </List.Item>
      )}
    />
  </Card>
);

export default Topstores;
