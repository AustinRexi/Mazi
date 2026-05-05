import React from "react";
import {
  Modal,
  Form,
  Input,
  Select,
  Row,
  Col,
  Upload,
  Button,
  Radio,
  InputNumber,
} from "antd";
import { InboxOutlined, PlusOutlined } from "@ant-design/icons";

const { Option } = Select;

const normFile = (event) => {
  if (Array.isArray(event)) {
    return event;
  }
  return event?.fileList || [];
};

const resizeImageTo900x600 = (file) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    const reader = new FileReader();

    reader.onload = () => {
      image.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = 900;
        canvas.height = 600;
        const context = canvas.getContext("2d");
        context.drawImage(image, 0, 0, 900, 600);

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error("Failed to resize image."));
              return;
            }

            const baseName = file.name.replace(/\.[^.]+$/, "");
            resolve(
              new File([blob], `${baseName}-900x600.jpg`, {
                type: "image/jpeg",
              })
            );
          },
          "image/jpeg",
          0.9
        );
      };
      image.onerror = () => reject(new Error("Invalid image file."));
      image.src = reader.result;
    };
    reader.onerror = () => reject(new Error("Failed to read image file."));
    reader.readAsDataURL(file);
  });

const AddProductModal = ({
  isOpen,
  setIsOpen,
  onAddProduct,
  onRequestOpen,
  categories = [],
  defaultRestaurantId = null,
  submitting = false,
}) => {
  const [form] = Form.useForm();
  const productType = Form.useWatch("productType", form) || "food";

  const handleSubmit = async (values) => {
    const restaurantId = defaultRestaurantId || values.restaurantId;
    if (!restaurantId) {
      return;
    }

    const resizedFoodImages = await Promise.all(
      (values.foodImages || []).map((entry) =>
        resizeImageTo900x600(entry.originFileObj)
      )
    );
    const resizedGroceryImage = await Promise.all(
      (values.groceryImage || []).map((entry) =>
        resizeImageTo900x600(entry.originFileObj)
      )
    );

    const payload = {
      productType: values.productType,
      categoryIds: values.categoryIds,
      restaurantId,
      name: values.name,
      description: values.description || "",
      price: Number(values.price),
      stockStatus: values.stockStatus || "in_stock",
      noInStock: Number(values.noInStock || 0),
      foodImages: resizedFoodImages,
      groceryImage: resizedGroceryImage,
    };

    const ok = await onAddProduct(payload);
    if (ok) {
      form.resetFields();
      setIsOpen(false);
    }
  };

  return (
    <>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => {
          if (typeof onRequestOpen === "function") {
            const canOpen = onRequestOpen();
            if (!canOpen) {
              return;
            }
          }
          setIsOpen(true);
        }}
      >
        Add Product
      </Button>

      <Modal
        title="Add New Product"
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            productType: "food",
            stockStatus: "in_stock",
          }}
        >
          <Form.Item
            label="Product Type"
            name="productType"
            rules={[{ required: true }]}
          >
            <Radio.Group>
              <Radio value="food">Food</Radio>
              <Radio value="grocery">Groceries</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="Product Name" name="name" rules={[{ required: true }]}>
            <Input placeholder="Enter product name" />
          </Form.Item>

          <Form.Item
            label="Select One or Multiple Categories"
            name="categoryIds"
            rules={[{ required: true, message: "Select at least one category" }]}
          >
            <Select mode="multiple" placeholder="Select categories">
              {categories.map((category) => (
                <Option key={category.id} value={category.id}>
                  {category.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {!defaultRestaurantId ? (
            <Form.Item
              label="Restaurant ID"
              name="restaurantId"
              rules={[{ required: true }]}
            >
              <InputNumber style={{ width: "100%" }} min={1} />
            </Form.Item>
          ) : null}

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Price"
                name="price"
                rules={[{ required: true, message: "Enter a valid price" }]}
              >
                <InputNumber style={{ width: "100%" }} min={0} step={0.01} />
              </Form.Item>
            </Col>

            {productType === "food" ? (
              <Col span={12}>
                <Form.Item
                  label="Stock Status"
                  name="stockStatus"
                  rules={[{ required: true }]}
                >
                  <Select>
                    <Option value="in_stock">In Stock</Option>
                    <Option value="out_of_stock">Out of Stock</Option>
                  </Select>
                </Form.Item>
              </Col>
            ) : (
              <Col span={12}>
                <Form.Item
                  label="Stock Quantity"
                  name="noInStock"
                  rules={[{ required: true, message: "Enter stock quantity" }]}
                >
                  <InputNumber style={{ width: "100%" }} min={0} />
                </Form.Item>
              </Col>
            )}
          </Row>

          <Form.Item label="Description" name="description">
            <Input.TextArea rows={3} placeholder="Enter product description" />
          </Form.Item>

          {productType === "food" ? (
            <Form.Item
              label="Food Images (3 required)"
              name="foodImages"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              rules={[
                {
                  validator: (_, fileList) =>
                    (fileList || []).length === 3
                      ? Promise.resolve()
                      : Promise.reject(new Error("Upload exactly 3 food images")),
                },
              ]}
            >
              <Upload.Dragger
                multiple
                maxCount={3}
                beforeUpload={() => false}
                accept="image/*"
              >
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">Upload exactly 3 food images</p>
              </Upload.Dragger>
            </Form.Item>
          ) : (
            <Form.Item
              label="Grocery Image (1 required)"
              name="groceryImage"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              rules={[
                {
                  validator: (_, fileList) =>
                    (fileList || []).length === 1
                      ? Promise.resolve()
                      : Promise.reject(new Error("Upload exactly 1 grocery image")),
                },
              ]}
            >
              <Upload.Dragger maxCount={1} beforeUpload={() => false} accept="image/*">
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">Upload 1 grocery image</p>
              </Upload.Dragger>
            </Form.Item>
          )}

          <Form.Item>
            <div style={{ textAlign: "right" }}>
              <Button onClick={() => setIsOpen(false)} style={{ marginRight: 8 }}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit" loading={submitting}>
                Add Product
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddProductModal;
