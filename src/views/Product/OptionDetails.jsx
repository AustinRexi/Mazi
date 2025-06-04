import { Col, Row } from "antd";
import ProductDetails from "../../Components/Product/ProductDetails";
import ImageCard from "./ImageCard";
import Addproduct from "./Addproduct";
import { useState } from "react";
import PrevandNext from "../../Components/shared/PrevandNext";

function OptionDetails({ activeProduct }) {
  const [viewProduct, setViewProduct] = useState(false);

  const handleEditClick = () => {
    setViewProduct(true);
  };

  if (viewProduct) {
    return <Addproduct />;
  }

  return (
    <div style={{ backgroundColor: "#F8FBFB" }}>
      <Row>
        <Col xs={11} md={16} lg={19}></Col>
        <Col xs={9} md={8} lg={5}>
          <PrevandNext />{" "}
        </Col>
      </Row>

      <Row gutter={[10, 10]} style={{ marginTop: 14 }}>
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
          xs={{ span: 22, order: 1 }}
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
