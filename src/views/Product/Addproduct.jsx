import { Form, Col, Row } from "antd";
import { Card } from "antd";

import Uploadimage from "./Uploadimage";
import Formfile from "./Formfile";
import Editor from "./Edit";

const AddProduct = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
      <Row style={{ backgroundColor: "green" }}>
        <Col span={8} style={{}}>
          <div style={{ width: "95%" }}>
            <Card
              style={{
                // width: 352,
                marginLeft: "18px",
              }}
            >
              <Formfile />
            </Card>
          </div>
        </Col>
        <Col span={8}>
          {" "}
          <div style={{ width: "95%", marginLeft: "10px" }}>
            <Card
              style={{
                // width: 352,
                marginRight: "10px",
                height: "172vh",
              }}
            >
              <Uploadimage />
            </Card>
          </div>{" "}
        </Col>
        <Col span={8}>
          <div style={{ width: "95%", marginRight: "10px" }}>
            <Card style={{}}>
              <Editor />
            </Card>
          </div>
        </Col>
      </Row>

      {/* <Form.Item>
        <Button type="primary" htmlType="submit">
          Publish
        </Button>
      </Form.Item> */}
    </Form>
  );
};

export default AddProduct;
