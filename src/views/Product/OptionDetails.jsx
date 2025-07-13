import { Col, Row } from "antd";
import { useState, useEffect } from "react";
import ProductDetails from "../../Components/Product/ProductDetails";
import ImageCard from "./ImageCard";
import Addproduct from "./Addproduct";
import PrevandNext from "../../Components/shared/PrevandNext";

function OptionDetails({ activeProduct }) {
  const [viewProduct, setViewProduct] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 576);

  // Handle window resize for responsive styling
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 576);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleEditClick = () => {
    setViewProduct(true);
  };

  const handleBackFromAdd = () => {
    setViewProduct(false);
  };

  if (viewProduct) {
    return <Addproduct onBack={handleBackFromAdd} />;
  }

  return (
    <div style={{ backgroundColor: "#F8FBFB", width: "100%" }}>
      <Row
        justify="end"
        style={{
          padding: isMobile ? "8px" : "10px",
          width: "100%",
        }}
      >
        <Col
          xs={12}
          md={12}
          lg={8}
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          <PrevandNext />
        </Col>
      </Row>

      <Row gutter={[10, 10]} style={{ marginTop: isMobile ? 10 : 14 }}>
        <Col
          xs={{ span: 24, order: 2 }}
          md={{ span: 24, order: 2 }}
          lg={{ span: 12, order: 1 }}
        >
          <ProductDetails
            activeProduct={activeProduct}
            onClick={handleEditClick}
          />
        </Col>
        <Col
          xs={{ span: 24, order: 1 }}
          md={{ span: 24, order: 1 }}
          lg={{ span: 12, order: 2 }}
        >
          <ImageCard />
        </Col>
      </Row>
    </div>
  );
}

export default OptionDetails;
