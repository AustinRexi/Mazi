import { useState } from "react";
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

<<<<<<< HEAD
  // Define modal styles based on device type
  const getModalStyles = () => {
    const isMobileOrTablet = window.innerWidth <= 900; // iPads typically have max-width of 1024px
    return {
      position: "absolute",
      top: isMobileOrTablet ? 200 : 120, // 200px for mobile/iPad, 120px for desktop
      right: isMobileOrTablet ? 20 : 380, // 20px for mobile/iPad, 380px for desktop
      padding: 0,
      margin: 0,
      borderRadius: "8px",
      display: "inline-block",
    };
  };

=======
>>>>>>> dev-rex
  return (
    <div>
      {isSubmitted && (
        <ModalComponent
          isVisible={isSubmitted}
          hideModal={hideModal}
          wrapClassName="custom-modal"
<<<<<<< HEAD
          style={getModalStyles()} // Apply dynamic styles
=======
          style={{
            position: "absolute",
            top: "20%", // Adjusted for responsiveness
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: 0,
            margin: 0,
            borderRadius: "8px",
            display: "inline-block",
          }}
>>>>>>> dev-rex
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
<<<<<<< HEAD
        <Row gutter={[0, 0]} style={{ marginTop: 8 }}>
          <Col xs={24} md={24} lg={8}>
            <div style={{ width: "90%", marginLeft: "10px", height: "200vh" }}>
              <Card style={{ height: "167vh" }}>
=======
        <Row gutter={[8, 16]} style={{ marginTop: "10px" }}>
          <Col xs={24} md={8} lg={8}>
            <div style={{ width: "100%", marginLeft: "10px" }}>
              <Card style={{ minHeight: "500px" }}>
>>>>>>> dev-rex
                <Formfile />
              </Card>
            </div>
          </Col>
<<<<<<< HEAD
          <Col xs={24} md={24} lg={8}>
            <div style={{ width: "90%", marginLeft: "8px" }}>
              <Card style={{ height: "167vh", marginRight: "10px" }}>
=======
          <Col xs={24} md={8} lg={8}>
            <div style={{ width: "100%", marginLeft: "8px" }}>
              <Card
                style={{
                  minHeight: window.innerWidth < 700 ? "400px" : "1064px",
                  marginRight: "10px",
                }}
              >
>>>>>>> dev-rex
                <Uploadimage />
              </Card>
            </div>
          </Col>
<<<<<<< HEAD
          <Col xs={24} md={24} lg={8}>
            <div style={{ width: "90%", marginRight: "10px" }}>
              <Card style={{ height: "167vh" }}>
=======
          <Col xs={24} md={8} lg={8}>
            <div style={{ width: "100%", marginRight: "10px" }}>
              <Card
                style={{
                  minHeight: window.innerWidth < 700 ? "500px" : "1064px",
                }}
              >
>>>>>>> dev-rex
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
