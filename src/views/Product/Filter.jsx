import { Card, Space, Divider, Slider, Row, Col } from "antd";
import chicken from "../../Assets/RestaurantIcons/chicken.svg";
import Jollof from "../../Assets/RestaurantIcons/Jollof.svg";
import Burgers from "../../Assets/RestaurantIcons/Burgers.svg";
import Nigeria from "../../Assets/RestaurantIcons/Nigeria.svg";
import Alcohol from "../../Assets/RestaurantIcons/Alcohol.svg";
import Breakfast from "../../Assets/RestaurantIcons/Breakfast.svg";
import Chinese from "../../Assets/RestaurantIcons/Chinese.svg";
import Pizza from "../../Assets/RestaurantIcons/Pizza.svg";
import Softdrink from "../../Assets/RestaurantIcons/Softdrink.svg";
import Icecream from "../../Assets/RestaurantIcons/Icecream.svg";
import Bakery from "../../Assets/RestaurantIcons/Bakery.svg";
import Seafood from "../../Assets/RestaurantIcons/Seafood.svg";

function Filter() {
  const sortByItems = [
    "Popularity",
    "Delivery time",
    "A-Z",
    "Z-A",
    "Open",
    "Near me",
    "Rating",
    "Delivery fee",
  ];

  const restaurantTypes = [
    { name: "Chicken", icon: chicken },
    { name: "Jollof", icon: Jollof },
    { name: "Burgers", icon: Burgers },
    { name: "Nigeria", icon: Nigeria },
    { name: "Alcohol", icon: Alcohol },
    { name: "Breakfast", icon: Breakfast },
    { name: "Chinese", icon: Chinese },
    { name: "Pizza", icon: Pizza },
    { name: "Softdrink", icon: Softdrink },
    { name: "Icecream", icon: Icecream },
    { name: "Bakery", icon: Bakery },
    { name: "Seafood", icon: Seafood },
  ];

  return (
    <Space size={16} direction="vertical" style={{ width: "100%" }}>
      <Card
        size="small"
        title={<div style={{ fontWeight: 500, fontSize: "24px" }}>Sort by</div>}
        extra={
          <a href="#" style={{ color: "#F58B3F" }}>
            Clear All
          </a>
        }
        headStyle={{
          borderBottom: "none",
          paddingBottom: "0px",
        }}
        style={{
          fontFamily: "Neue Haas Grotesk Display Pro",
          color: "#121515",
          fontSize: "16px",
          lineHeight: "24px",
          width: "350px",
          height: "700px",
          borderRadius: "12px",
          padding: "24px",
          top: "15px",
          left: "400px",
          gap: "16px",
          backgroundColor: "#FFFFFF",
          boxShadow: "0px 9px 18px 0px #AAAAAA26",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            marginTop: "16px",
          }}
        >
          {sortByItems.map((item, index) => (
            <div
              key={index}
              style={{
                backgroundColor: "#F5F5F5",
                borderRadius: "4px",
                padding: "4px 8px",
                fontSize: "14px",
                color: "#333",
              }}
            >
              {item}
            </div>
          ))}
        </div>
        <Divider />
        <div>
          <div
            style={{ fontWeight: 500, fontSize: "16px", marginBottom: "16px" }}
          >
            Price
          </div>
          <Slider range defaultValue={[1200, 15000]} min={500} max={35000} />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>N500</span>
            <span>N35,000</span>
          </div>
        </div>
        <Divider />
        <div>
          <div
            style={{ fontWeight: 500, fontSize: "16px", marginBottom: "16px" }}
          >
            Types of restaurant
          </div>
          <Row gutter={[16, 16]}>
            {restaurantTypes.map((type, index) => (
              <Col span={6} key={index} style={{ textAlign: "center" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <img src={type.icon} />
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </Card>
    </Space>
  );
}

export default Filter;
