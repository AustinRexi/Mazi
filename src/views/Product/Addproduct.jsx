import { useState } from "react";
import { Form, Col, Row, Card, Button, Modal } from "antd";
import flower from "../../utils/icons/flower.svg";
import Uploadimage from "./Uploadimage";
import Formfile from "./Formfile";
import Edit from "./Edit";
import CongratulationsCard from "../../Components/Product/CongratulationsCard";
import "../../Mobile/Addproduct.css";

const AddProduct = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onFinish = (values) => {
    console.log("Success:", values);
    setIsSubmitted(true);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <Modal
        visible={isSubmitted}
        closable={false}
        footer={null}
        onCancel={() => setIsSubmitted(false)}
        centered
      >
        <CongratulationsCard />
      </Modal>

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
            }}
          >
            AddProduct
          </h2>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                height: "44px",
                backgroundColor: "#F58B3F",
                color: "white",
                borderRadius: "24px",
                gap: "10px",
                padding: "14px 28px",
                width: "120px",
              }}
            >
              Publish <img src={flower} alt="flower icon" />
            </Button>
          </Form.Item>
        </div>

        <Row style={{ marginTop: "0px" }} gutter={[16, 16]}>
          <Col xs={24} sm={12} lg={8} span={8}>
            <div style={{ width: "100%" }}>
              <Card className="card-height">
                <Formfile />
              </Card>
            </div>
          </Col>

          <Col xs={24} sm={12} lg={8} span={8}>
            <div style={{ width: "100%" }}>
              <Card className="card-height">
                <Uploadimage />
              </Card>
            </div>
          </Col>

          <Col xs={24} sm={12} lg={8} span={8}>
            <div style={{ width: "100%" }}>
              <Card className="card-height">
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
