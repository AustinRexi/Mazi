import { Card, Flex } from "antd";
import { useState, useEffect } from "react";
import edith from "../../Assets/Lineicons/edith.svg";
import Star from "../../Assets/Foodicons/Star.svg";
import promote from "../../Assets/Lineicons/promote.svg";
import progress from "../../Assets/Lineicons/progress.svg";
import stock from "../../Assets/Lineicons/stock.svg";
import Comment from "./Comment";

function ProductDetails({ onClick }) {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 700);

  // Update isSmallScreen on window resize
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 700);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const description =
    "Belleful meal is the new lovely jollof rice served with chicken dipped meal is the new lovely jollof rice served. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent bibendum augue sed urna consequat, vel dictum turpis malesuada. Nullam condimentum elementum accumsan. Nullam maximus purus ac mi maximus tristique. Integer ultricies vitae nibh pulvinar pulvinar.";

  return (
    <Card
      style={{
        width: "100%",
        maxWidth: isSmallScreen ? 400 : 470, // Responsive width
      }}
      bodyStyle={{ margin: 6, padding: 3 }}
    >
      <Flex style={{ gap: isSmallScreen ? 4 : 7, marginTop: 4 }}>
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
        <Flex style={{ gap: 6 }} aria-label="Rating: 5.0 out of 5">
          <img
            src={Star}
            style={{
              marginBottom: 26,
              marginLeft: isSmallScreen ? 10 : 120,
            }}
            alt="Star rating icon"
          />
          <b>5.0</b>
          <span style={{ marginBottom: 20 }}>(198)</span>
        </Flex>
        <Flex style={{ gap: 15, marginBottom: 20, marginLeft: 10 }}>
          <img
            src={promote}
            alt="Promote product icon"
            style={{
              width: isSmallScreen ? 60 : 90, // Responsive width
              // display: isSmallScreen ? "none" : "block", // Hide on small screens
            }}
          />
          <img
            src={edith}
            alt="Edit product icon"
            style={{ width: isSmallScreen ? 50 : 70, cursor: "pointer" }}
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
        Jollof Rice Curry Chicken Flavour
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
            alt="Progress status icon"
            style={{ display: "block", marginBottom: 10 }}
          />
          <img
            src={stock}
            alt="Stock status icon"
            style={{ display: "block" }}
          />
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
