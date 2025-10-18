import React from "react";
import { Modal, Form, Input, Select, Row, Col, Upload, Button } from "antd";
import { InboxOutlined, PlusOutlined } from "@ant-design/icons";

const { Option } = Select;

const AddProductModal = ({ isOpen, setIsOpen, onAddProduct }) => {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    const newProduct = {
      id: Date.now().toString(),
      ...values,
      sales: 0,
      image: "https://via.placeholder.com/100x100.png?text=New+Product",
      created: new Date().toISOString(),
      status: "active",
    };
    onAddProduct(newProduct);
    form.resetFields();
  };

  return (
    <>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setIsOpen(true)}
      >
        Add Product
      </Button>

      <Modal
        title="Add New Product"
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Product Name"
            name="name"
            rules={[{ required: true }]}
          >
            <Input placeholder="Enter product name" />
          </Form.Item>

          <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true }]}
          >
            <Select placeholder="Select category">
              <Option value="Electronics">Electronics</Option>
              <Option value="Wearables">Wearables</Option>
              <Option value="Audio">Audio</Option>
              <Option value="Accessories">Accessories</Option>
            </Select>
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Price ($)"
                name="price"
                rules={[{ required: true }]}
              >
                <Input type="number" step="0.01" placeholder="0.00" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Stock Quantity"
                name="stock"
                rules={[{ required: true }]}
              >
                <Input type="number" placeholder="0" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="Description" name="description">
            <Input.TextArea rows={3} placeholder="Enter product description" />
          </Form.Item>

          <Form.Item label="Product Image">
            <Upload.Dragger name="files">
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Click or drag to upload</p>
              <p className="ant-upload-hint">PNG, JPG up to 10MB</p>
            </Upload.Dragger>
          </Form.Item>

          <Form.Item>
            <div style={{ textAlign: "right" }}>
              <Button
                onClick={() => setIsOpen(false)}
                style={{ marginRight: 8 }}
              >
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
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
