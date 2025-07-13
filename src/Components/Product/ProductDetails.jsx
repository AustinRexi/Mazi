import { Card, Flex } from "antd";
import { useState, useEffect } from "react";
import edith from "../../Assets/Lineicons/edith.svg";
import Star from "../../Assets/Foodicons/Star.svg";
import promote from "../../Assets/Lineicons/promote.svg";
import progress from "../../Assets/Lineicons/progress.svg";
import stock from "../../Assets/Lineicons/stock.svg";
import Comment from "./Comment";

function ProductDetails({ onClick }) {
  const ismobile = window.innerWidth <= 600;
  const description =
    " Belleful meal is the new lovely jollof rice served with chicken dipped meal is the new lovely jollof rice served.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent bibendum augue sed urna consequat, vel dictum turpis malesuada. Nullam condimentum elementum accumsan. Nullam maximus purus ac mi maximus tristique. Integer ultricies vitae nibh pulvinar pulvinar.";

  // State to track screen size
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 700);

  // Update isSmallScreen on window resize
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 700);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize); // Cleanup
  }, []);

  return (
    <Card
      style={{
<<<<<<< HEAD
        width: ismobile ? 400 : 470,
=======
        width: 500,
        marginTop: "60px",
>>>>>>> dev-rex
      }}
      bodyStyle={{ margin: 6, padding: 3 }}
    >
<<<<<<< HEAD
      <Flex style={{ gap: ismobile ? 0 : 7, marginTop: 4 }}>
        <span
=======
      <Flex style={{ gap: 7, marginTop: 4 }}>
        <text
>>>>>>> dev-rex
          style={{
            fontWeight: 500,
            fontSize: "16px",
            lineHeight: "24px",
            fontFamily: "NeueHaasDisplayRoman",
          }}
        >
          Jollof
        </text>
        <Flex style={{ gap: 6 }}>
          <img
            src={Star}
            style={{
              marginBottom: 26,
              marginLeft: isSmallScreen ? 10 : 120, // Responsive margin
            }}
            alt="Star"
          />
          <b>5.0</b>
          <span style={{ marginBottom: 20 }}>(198)</span>{" "}
        </Flex>
        <Flex style={{ gap: 15, marginBottom: 20, marginLeft: 10 }}>
          <img
            src={promote}
            alt="Promote"
            style={{
              width: 90,
              // display: isSmallScreen ? "none" : "block", // Responsive display
            }}
          />
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
