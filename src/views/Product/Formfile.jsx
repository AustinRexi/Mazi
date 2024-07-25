import { Form, Input, Select, Switch, Divider, InputNumber } from "antd";
import Radiobtn from "./Radiobtn";

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
          marginLeft: "8px",

          backgroundColor: "#FFFFFF",

          borderRadius: "12px",
        }}
      >
        <h3 style={{ fontWeight: 600, fontSize: "24px", lineHeight: "32px" }}>
          Main Information
        </h3>
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
          <InputNumber
            placeholder="Weight Kg"
            min={0}
            style={{
              width: "100%",
              height: "50px",
              borderRadius: "12px",
              gap: "8px",
            }}
          />
        </Form.Item>
        <div style={{ display: "flex" }}>
          <Form.Item name="price">
            <InputNumber
              placeholder="Price"
              min={0}
              style={{ width: "95%", height: "56px", borderRadius: "12px" }}
            />
          </Form.Item>

          <Form.Item name="salePrice">
            <InputNumber
              placeholder="Sale Price"
              min={0}
              style={{
                width: "98%",
                height: "56px",
                borderRadius: "12px",
                marginLeft: "2px",
              }}
            />
          </Form.Item>
        </div>
        <Divider />
        <div style={{ padding: "2px" }}>
          <div style={{ display: "flex" }}>
            <h3
              style={{
                fontWeight: 600,
                fontSize: "22px",
                height: "24px",
                whiteSpace: "wrap",
              }}
            >
              Product Stock
            </h3>
            <Switch
              style={{ left: "50px", marginTop: "10px" }}
              defaultChecked
            />
          </div>
          <div style={{ display: "flex", marginTop: "18px" }}>
            <Form.Item name="stock">
              <InputNumber
                placeholder="No.In Stock"
                min={0}
                style={{ width: "95%", height: "56px", borderRadius: "12px" }}
              />
            </Form.Item>
            <Form.Item name="low stock range">
              <InputNumber
                placeholder="Low stock range"
                min={0}
                style={{
                  width: "98%",
                  height: "56px",
                  borderRadius: "12px",
                  marginLeft: "2px",
                }}
              />
            </Form.Item>
          </div>
        </div>
        <Divider />
        <h3 style={{ fontWeight: 600, fontSize: "24px", lineHeight: "32px" }}>
          {" "}
          Allow Backorders?
        </h3>
        <Radiobtn />
      </div>
    </div>
  );
}

export default Formfile;
