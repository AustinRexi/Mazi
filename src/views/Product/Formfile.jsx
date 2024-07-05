import { Form, Input, Select, Switch, Divider, InputNumber } from "antd";

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

function Formfile() {
  return (
    <div style={{ boxshadow: "0px 9px 18px 0px #AAAAAA26" }}>
      <div
        style={{
          marginLeft: "7px",

          backgroundColor: "#FFFFFF",
          // padding: "20px,   10px",
          // gap: "20px",
          borderRadius: "12px",
          // width: "450px",
        }}
      >
        <Divider>Main Information</Divider>
        <Form.Item
          name="name"
          // label="Name"
          rules={[
            { required: true, message: "Please input the product name!" },
          ]}
        >
          <Input
            placeholder="Name"
            style={{
              gap: "8px",
              width: "320",
              height: "50px",
              borderRadius: "12px",
            }}
          />
        </Form.Item>

        <Form.Item
          name="category"
          // label="Category"
          rules={[{ required: true, message: "Please select a category!" }]}
        >
          <Select
            placeholder="Category"
            style={{
              gap: "8px",
              width: "320",
              height: "50px",
              borderRadius: "12px",
            }}
          >
            <Option value="category1">Food</Option>
            <Option value="category2">Grocery</Option>
          </Select>
        </Form.Item>

        <Form.Item name="subcategory">
          <Select
            placeholder="Select a sub-category"
            style={{
              gap: "8px",
              width: "320",
              height: "50px",
              borderRadius: "12px",
            }}
          >
            {subcategories.map((subcategory, index) => (
              <Option key={index} value={`subcategory${index + 1}`}>
                {subcategory}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="Tax"
          rules={[{ required: true, message: "Please select an option" }]}
        >
          <Select
            placeholder="Tax"
            style={{
              gap: "8px",
              width: "320",
              height: "50px",
              borderRadius: "12px",
            }}
          >
            <Option value="VAT">VAT</Option>
            <Option value="NONE">NONE</Option>
          </Select>
        </Form.Item>

        <Form.Item name="tags">
          <Input
            placeholder="Tags"
            style={{
              gap: "8px",
              width: "320",
              height: "50px",
              borderRadius: "12px",
            }}
          />
        </Form.Item>

        <Form.Item name="delivery">
          <Input
            placeholder="Delivery"
            style={{
              gap: "8px",
              width: "320",
              height: "50px",
              borderRadius: "12px",
            }}
          />
        </Form.Item>

        <Form.Item name="weight">
          <InputNumber placeholder="Weight Kg" min={0} />
        </Form.Item>
        <div style={{ display: "flex" }}>
          <Form.Item name="price">
            <InputNumber
              placeholder="Price"
              min={0}
              style={{ width: "80%", borderRadius: "8px" }}
            />
          </Form.Item>

          <Form.Item name="salePrice">
            <InputNumber
              placeholder="Sale Price"
              min={0}
              style={{ width: "80%", borderRadius: "8px" }}
            />
          </Form.Item>
        </div>
        <div style={{ display: "flex" }}>
          <Form.Item label="Product Stock"></Form.Item>
          <Switch style={{ left: "100px" }} defaultChecked />
        </div>

        <Form.Item name="backorders" label="Allow Backorders?">
          <Select>
            <Option value="not_allow">Do Not Allow</Option>
            <Option value="allow_notify">Allow but notify customer</Option>
            <Option value="allow">Allow</Option>
          </Select>
        </Form.Item>
      </div>
    </div>
  );
}

export default Formfile;
