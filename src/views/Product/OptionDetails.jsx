import { Col, Row, Button } from "antd";
import ProductDetails from "../../Components/Product/ProductDetails";
import ImageCard from "./ImageCard";

function OptionDetails({ activeProduct }) {
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          marginLeft: 400,
          marginTop: "4px",
        }}
      >
        <Button
          style={{
            border: "none",
            height: "40px",
            width: "108px",
            marginRight: 8,
            color: "#969696",
            gap: "4px",
            padding: "7px 24px",
          }}
        >
          &laquo; Prev
        </Button>
        <Button
          style={{
            height: "40px",
            width: "108px",
            borderRadius: "8px",
            gap: "4px",
            padding: "7px 24px", // Corrected padding format
            marginRight: 8,
            backgroundColor: " #EBF0ED",
            color: "#969696",
          }}
        >
          Next &raquo;
        </Button>
      </div>
      <Row style={{ padding: 15, marginTop: 20, marginLeft: 24 }}>
        <Col span={12}>
          <ProductDetails activeProduct={activeProduct} />
        </Col>
        <Col span={12}>
          <ImageCard />
        </Col>
      </Row>
    </>
  );
}

export default OptionDetails;
