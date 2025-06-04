import { Card } from "antd";
import { Flex } from "antd"; // Assuming Flex is correctly imported from Ant Design
import edith from "../../Assets/Lineicons/edith.svg";
import Star from "../../Assets/Foodicons/Star.svg";
import promote from "../../Assets/Lineicons/promote.svg";
import progress from "../../Assets/Lineicons/progress.svg";
import stock from "../../Assets/Lineicons/stock.svg";
import Comment from "./Comment";

function ProductDetails({ onClick }) {
  const ismobile = window.innerWidth <= 600;
  const description =
    "Belleful meal is the new lovely jollof rice served with chicken dipped meal is the new lovely jollof rice served.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent bibendum augue sed urna consequat, vel dictum turpis malesuada. Nullam condimentum elementum accumsan. Nullam maximus purus ac mi maximus tristique. Integer ultricies vitae nibh pulvinar pulvinar.";

  return (
    <Card
      style={{
        width: ismobile ? 400 : 470,
      }}
      bodyStyle={{ margin: 6, padding: 3 }}
    >
      <Flex style={{ gap: ismobile ? 0 : 7, marginTop: 4 }}>
        <span
          style={{
            fontWeight: 500,
            fontSize: "16px",
            lineHeight: "24px",
            fontFamily: "NeueHaasDisplayRoman",
          }}
        >
          Jollof
        </span>
        <img
          src={Star}
          style={{ marginBottom: 26, marginLeft: 120 }}
          alt="Star"
        />
        <b>5.0</b>
        <span style={{ marginBottom: 20 }}>(198)</span>
        <Flex style={{ gap: 15, marginBottom: 20, marginLeft: 10 }}>
          <img src={promote} alt="Promote" style={{ width: 90 }} />
          <img
            src={edith}
            alt="Edit"
            style={{ width: 70, cursor: "pointer" }}
            onClick={onClick}
          />
        </Flex>
      </Flex>

      <h4
        style={{
          fontWeight: 600,
          fontSize: "32px",
          lineHeight: "40px",
          fontFamily: "NeueHaasDisplayRoman",
        }}
      >
        Jollof Rice and Curry Chicken Flavour
      </h4>

      <div style={{ display: "flex", gap: 20, marginTop: 10 }}>
        <span style={{ fontSize: 28 }}>
          From{" "}
          <span
            style={{ fontWeight: 600, fontSize: "32px", lineHeight: "32px" }}
          >
            N28,950.00
          </span>
        </span>

        <div style={{ display: "block", marginLeft: "auto", marginTop: 10 }}>
          <img
            src={progress}
            alt="Progress"
            style={{ display: "block", marginBottom: 10 }}
          />
          <img src={stock} alt="Stock" style={{ display: "block" }} />
        </div>
      </div>
      <p
        style={{
          fontWeight: 500,
          fontSize: "16px",
          lineHeight: "24px",
          fontFamily: "NeueHaasDisplayRoman",
        }}
      >
        {description}
      </p>
      <Comment />
    </Card>
  );
}

export default ProductDetails;
