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
      <Row style={{ padding: 18, marginLeft: 10 }}>
        <Col span={12}>
          <ProductDetails
            activeProduct={activeProduct}
            onClick={handleEditClick}
          />
        </Col>
        <Col span={12}>
          <ImageCard />
        </Col>
      </Row>
    </div>
  );
}

export default OptionDetails;
