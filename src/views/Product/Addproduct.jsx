import {
  Form,
  Input,
  Button,
  Select,
  Switch,
  Upload,
  Divider,
  InputNumber,
  Col,
  Row,
} from "antd";
// import { UploadOutlined } from "@ant-design/icons";
import { PlusOutlined } from "@ant-design/icons";
import Uploadimage from "./Uploadimage";
import Formfile from "./Formfile";

const { TextArea } = Input;
const { Option } = Select;
const subcategories = [
  "Chicken",
  "Jollof",
  "Burgers",
  "Nigerian",
  "Alcohol",
  "Breakfast",
  "Pasta",
  "Chinese",
  "International",
];

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
          <div style={{ width: "70%" }}>
            <Formfile />
          </div>
        </Col>
        <Col span={8}>
          {" "}
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ width: "50%", marginLeft: "100px" }}>
              <Divider>Product Image</Divider>
              <Form.Item label="Cover Image Here">
                <Uploadimage />
              </Form.Item>
            </div>{" "}
          </div>
        </Col>
        <Col span={8}>
          {" "}
          <div style={{ width: "50%", marginLeft: "10px" }}>
            <Divider>About Product</Divider>
            <Form.Item name="description" label="Product Description">
              <TextArea rows={4} />
            </Form.Item>

            <Form.Item name="specifications" label="Product Specification">
              <TextArea rows={4} />
            </Form.Item>
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
