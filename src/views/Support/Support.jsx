import { Card, Row, Col, Flex, Divider, Avatar } from "antd";
import rice from "../../Assets/Ordericons/rice.svg";
import unfulfilled from "../../Assets/Ordericons/unfulfilled.svg";

function Support() {
  const data = [
    {
      price: 140,
      Descriptions: " $140 Per plate",
      kitchen: "MAZIKITCHEN",
      product: "Jollof rice and chicken flavour",
      quantity: 3,
      icon: rice,
    },
    {
      icon: "null",
      product: "50Cl of Fearless Drink",
      quantity: 1,
      price: 0,
      Descriptions: "Free",
    },
  ];

  const total = data[0].price * data[0].quantity;

  return (
    <Card style={{ width: 500 }}>
      <Flex
        style={{
          justifyContent: "flex-start",
          alignContent: "center",
          gap: 4,
        }}
      >
        <Avatar src={unfulfilled} />
        <h4
          style={{
            marginTop: "2px",
            fontWeight: 600,
            fontSize: "20px",
            lineHeight: "24px",
          }}
        >
          Unfulfilled
        </h4>
        <p
          style={{
            fontWeight: 500,
            fontSize: "16px",
            lineHeight: "24px",
            marginTop: "2px",
          }}
        >
          (2)
        </p>
      </Flex>
      <Row gutter={[16, 16]} style={{ marginLeft: "2px" }}>
        <Col span={6}>
          <img src={data[0].icon} alt="Food icon" />
        </Col>
        <Col span={14}>
          <h5 style={{ fontWeight: 500, fontSize: "15px", lineHeight: "24px" }}>
            {data[0].product}
          </h5>
          <Flex
            style={{
              justifyContent: "space-between",
              alignContent: "center",
            }}
          >
            <p style={{ fontWeight: 500 }}>{data[0].Descriptions} </p>
            <h2
              style={{
                backgroundColor: "#F3FAFA",
                width: 80,
                height: 30,
                borderRadius: 4,
              }}
            >
              {data[0].quantity}
            </h2>
          </Flex>
        </Col>
        <Col
          span={4}
          style={{
            justifyContent: "space-between",
            alignContent: "center",
          }}
        >
          <h5 style={{ color: "#838D8D" }}> {data[0].kitchen}</h5>
          <h2 style={{ fontWeight: 700 }}>${total}</h2>
        </Col>
        <Divider />
      </Row>
    </Card>
  );
}

export default Support;
