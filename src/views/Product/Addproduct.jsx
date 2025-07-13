import { useState, useEffect } from "react"; // Added useEffect
import { Form, Col, Row, Card, Button } from "antd";
import flower from "../../utils/icons/flower.svg";
import Uploadimage from "./Uploadimage";
import Formfile from "./Formfile";
import Edit from "./Edit";
import CongratulationsCard from "../../Components/Product/CongratulationsCard";
import ModalComponent from "../../Components/shared/ModalComponent";

const AddProduct = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 700); // Track screen size

  // Handle window resize for responsive minHeight
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 700);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      console.log("Success:", values); // Replace with API call
      setIsSubmitted(true);
    } catch (error) {
      console.error("Submission failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const hideModal = () => setIsSubmitted(false);

  return (
    <div>
      {isSubmitted && (
        <ModalComponent
          isVisible={isSubmitted}
          hideModal={hideModal}
          wrapClassName="custom-modal"
          style={{
            position: "absolute",
            top: "50%", // Centered vertically
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: 0,
            margin: 0,
            borderRadius: "8px",
            display: "inline-block",
          }}
          bodyStyle={{
            backgroundColor: "transparent",
            padding: 0,
          }}
        >
          <CongratulationsCard />
        </ModalComponent>
      )}

      <Form
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        style={{ padding: "10px", backgroundColor: "#F8FBFB" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2
            style={{
              fontWeight: 400,
              fontSize: "24px",
              lineHeight: "32px",
              padding: 2,
              marginLeft: "5px",
            }}
          >
            Add Product
          </h2>
          <Form.Item style={{ margin: 0 }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              style={{
                height: "44px",
                backgroundColor: "#F58B3F",
                color: "white",
                borderRadius: "24px",
                padding: "14px 28px",
                marginBottom: "4px",
                width: "120px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
              }}
              aria-label="Publish product"
            >
              Publish{" "}
              <img
                src={flower}
                alt="Publish button flower icon"
                style={{ height: "16px" }}
              />
            </Button>
          </Form.Item>
        </div>
        <Row gutter={[8, 16]} style={{ marginTop: "10px" }}>
          <Col xs={24} md={8} lg={8}>
            <div style={{ width: "100%", marginLeft: "10px" }}>
              <Card style={{ minHeight: isMobile ? "500px" : "1064px" }}>
                <Formfile />
              </Card>
            </div>
          </Col>
          <Col xs={24} md={8} lg={8}>
            <div style={{ width: "100%", marginLeft: "8px" }}>
              <Card
                style={{
                  minHeight: isMobile ? "500px" : "1064px", // Unified minHeight
                  marginRight: "10px",
                }}
              >
                <Uploadimage />
              </Card>
            </div>
          </Col>
          <Col xs={24} md={8} lg={8}>
            <div style={{ width: "100%", marginRight: "10px" }}>
              <Card
                style={{
                  minHeight: isMobile ? "500px" : "1064px", // Unified minHeight
                }}
              >
                <Edit />
              </Card>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default AddProduct;
