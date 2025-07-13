import { Col, Row } from "antd";
import ProductDetails from "../../Components/Product/ProductDetails";
import ImageCard from "./ImageCard";
import Addproduct from "./Addproduct";
import { useState } from "react";

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
      <Row style={{ padding: 15 }}>
        <Col
          xs={{ span: 24, order: 2, offset: 0 }}
          md={{ span: 24, order: 2, offset: 3 }}
          lg={{ span: 12, order: 1, offset: 0 }}
        >
          <ProductDetails
            activeProduct={activeProduct}
            onClick={handleEditClick}
          />
        </Col>
        <Col
          xs={{ span: 24, order: 1, offset: 0 }}
          md={{ span: 24, order: 1, offset: 3 }}
          lg={{ span: 12, order: 2, offset: 0 }}
        >
          <ImageCard />
        </Col>
      </Row>
    </div>
  );
}

export default OptionDetails;
