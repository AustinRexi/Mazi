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
        style={{ padding: 20, marginTop: "10px", backgroundColor: "#F0F7F8" }}
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
                height: "48px",
                backgroundColor: "#F58B3F",
                color: "white",
                borderRadius: "24px",
                gap: "12px",
                padding: "14px 28px 14px 28px",
                marginBottom: "14px",
              }}
            >
              Publish <img src={flower} />
            </Button>
          </Form.Item>
        </div>
        <Row style={{ marginTop: "6px" }}>
          <Col span={8}>
            <div style={{ width: "95%", marginLeft: "18px", height: "160vh" }}>
              <Card style={{ height: "158vh" }}>
                <Formfile />
              </Card>
            </div>
          </Col>
          <Col span={8}>
            <div style={{ width: "95%", marginLeft: "10px" }}>
              <Card style={{ height: "158vh", marginRight: "10px" }}>
                <Uploadimage />
              </Card>
            </div>
          </Col>
          <Col span={8}>
            <div style={{ width: "95%", marginRight: "10px" }}>
              <Card style={{}}>
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
