import { Form, Col, Row } from "antd";
import { Card, Button } from "antd";
import flower from "../../utils/icons/flower.svg";
import Uploadimage from "./Uploadimage";
import Formfile from "./Formfile";
import Edit from "./Edit";

const AddProduct = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <Form
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        style={{ marginTop: "3px", backgroundColor: "#F0F7F8" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2 style={{ fontWeight: 600, fontSize: "24px", lineHeight: "32px" }}>
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
              Publish <img src={flower} />
            </Button>
          </Form.Item>
        </div>
        <Row style={{ marginTop: "3px" }}>
          <Col span={8}>
            <div style={{ width: "90%", marginLeft: "10px", height: "200vh" }}>
              <Card style={{ height: "167vh" }}>
                <Formfile />
              </Card>
            </div>
          </Col>
          <Col span={8}>
            <div style={{ width: "90%", marginLeft: "8px" }}>
              <Card style={{ height: "167vh", marginRight: "10px" }}>
                <Uploadimage />
              </Card>
            </div>
          </Col>
          <Col span={8}>
            <div style={{ width: "97%", marginRight: "10px" }}>
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
