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

  const onFinish = (values) => {
    console.log("Success:", values);
    setIsSubmitted(true);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const hideModal = () => setIsSubmitted(false);

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

  return (
    <div>
      {isSubmitted && (
        <ModalComponent
          isVisible={isSubmitted}
          hideModal={hideModal}
          wrapClassName="custom-modal"
          style={getModalStyles()} // Apply dynamic styles
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
              fontWeight: 600,
              fontSize: "24px",
              lineHeight: "32px",
              padding: 2,
              marginLeft: "5px",
            }}
          >
            AddProduct
          </h2>
          <Form.Item style={{ margin: 0 }}>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                height: "44px",
                backgroundColor: "#F58B3F",
                color: "white",
                borderRadius: "24px",
                gap: "10px",
                padding: "14px 28px 14px 28px",
                marginBottom: "4px",
                width: "120px",
                right: "20px",
              }}
            >
              Publish <img src={flower} alt="flower icon" />
            </Button>
          </Form.Item>
        </div>
        <Row gutter={[0, 0]} style={{ marginTop: 8 }}>
          <Col xs={24} md={24} lg={8}>
            <div style={{ width: "90%", marginLeft: "10px", height: "200vh" }}>
              <Card style={{ height: "167vh" }}>
                <Formfile />
              </Card>
            </div>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <div style={{ width: "90%", marginLeft: "8px" }}>
              <Card style={{ height: "167vh", marginRight: "10px" }}>
                <Uploadimage />
              </Card>
            </div>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <div style={{ width: "90%", marginRight: "10px" }}>
              <Card style={{ height: "167vh" }}>
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
