import { useState } from "react";
import {
  Table,
  Tag,
  Typography,
  Space,
  Button,
  Modal,
  Descriptions,
  message,
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
} from "antd";
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { formatVendorMoney, useVendorCurrencyCode } from "../utils/currency";

const { Text } = Typography;
const { confirm } = Modal;
const { Option } = Select;

const normFile = (event) => {
  if (Array.isArray(event)) {
    return event;
  }
  return event?.fileList || [];
};

const ProductTable = ({ products, onDelete, onEdit, categories = [] }) => {
  const currencyCode = useVendorCurrencyCode();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [savingEdit, setSavingEdit] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [form] = Form.useForm();

  // 🟢 Tag color handler
  const getStatusTag = (status) => {
    switch (status) {
      case "in_stock":
        return <Tag color="green">in_stock</Tag>;
      case "active":
        return <Tag color="green">Active</Tag>;
      case "inactive":
        return <Tag color="default">Inactive</Tag>;
      case "out-of-stock":
        return <Tag color="red">Out of Stock</Tag>;
      default:
        return <Tag>Unknown</Tag>;
    }
  };

  // 👁 View Product Handler
  const handleView = (record) => {
    setSelectedProduct(record);
    setActiveImageIndex(0);
    setIsModalVisible(true);
  };

  // 🗑 Delete Product Handler
  const handleDelete = (record) => {
    confirm({
      title: "Are you sure you want to delete this product?",
      icon: <ExclamationCircleOutlined />,
      content: `${record.name} will be permanently removed.`,
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk() {
        if (onDelete) {
          onDelete(record);
          return;
        }

        message.success("Product deleted successfully!");
      },
    });
  };

  const handleEdit = (record) => {
    setEditingProduct(record);
    form.setFieldsValue({
      name: record.name,
      categoryIds: record.categoryIds || [],
      price: Number(record.price || 0),
      stock:
        record.resourceType === "grocery" ? Number(record.stock || 0) : undefined,
      status: record.status,
      description: record.description || "",
      foodImages: [],
      groceryImage: [],
    });
    setIsEditModalVisible(true);
  };

  const submitEdit = async (values) => {
    if (!editingProduct || !onEdit) {
      setIsEditModalVisible(false);
      return;
    }
    setSavingEdit(true);
    const ok = await onEdit(editingProduct, values);
    setSavingEdit(false);
    if (ok) {
      setIsEditModalVisible(false);
      setEditingProduct(null);
      form.resetFields();
    }
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      render: (src) => (
        <img
          src={src}
          alt="product"
          style={{
            width: 50,
            height: 50,
            borderRadius: 8,
            objectFit: "cover",
          }}
        />
      ),
    },
    {
      title: "Product",
      dataIndex: "name",
      render: (text, record) => (
        <>
          <Text strong>{text}</Text>
          <br />
          <Text type="secondary">ID: {record.id}</Text>
        </>
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      render: (cat) => <Tag color="blue">{cat}</Tag>,
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (price) => <Text>{formatVendorMoney(price, currencyCode)}</Text>,
    },
    {
      title: "Stock",
      dataIndex: "stock",
      render: (stock, record) => {
        if (record.resourceType === "food") {
          return getStatusTag(record.status);
        }

        if (stock === 0) return <Text type="danger">Out of Stock</Text>;
        if (stock < 20) return <Text type="warning">Low ({stock})</Text>;
        return <Text type="success">{stock}</Text>;
      },
    },
    { title: "Sales", dataIndex: "sales" },
    {
      title: "Status",
      dataIndex: "status",
      render: getStatusTag,
    },
    {
      title: "Actions",
      render: (_, record) => (
        <Space>
          <Button icon={<EyeOutlined />} onClick={() => handleView(record)} />
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />

          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDelete(record)}
          />
        </Space>
      ),
    },
  ];

  return (
    <>
      <div style={{ width: "100%", overflowX: "auto" }}>
        <Table
          dataSource={products}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          scroll={{ x: 800 }}
        />
      </div>

      <Modal
        open={isModalVisible}
        title="Product Details"
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setIsModalVisible(false)}>
            Close
          </Button>,
        ]}
      >
        {selectedProduct && (
          <Descriptions bordered column={1} size="small">
            <Descriptions.Item label="Product Name">
              {selectedProduct.name}
            </Descriptions.Item>
            <Descriptions.Item label="Category">
              {selectedProduct.category}
            </Descriptions.Item>
            <Descriptions.Item label="Price">
              {formatVendorMoney(selectedProduct.price, currencyCode)}
            </Descriptions.Item>
            <Descriptions.Item label="Stock">
              {selectedProduct.stock}
            </Descriptions.Item>
            <Descriptions.Item label="Status">
              {getStatusTag(selectedProduct.status)}
            </Descriptions.Item>
            <Descriptions.Item label="Image">
              {selectedProduct.resourceType === "food" ? (
                (() => {
                  const slides =
                    selectedProduct.images && selectedProduct.images.length > 0
                      ? selectedProduct.images
                      : [selectedProduct.image];
                  const clampedIndex =
                    activeImageIndex >= slides.length ? 0 : activeImageIndex;

                  return (
                    <div style={{ width: "100%", overflow: "hidden" }}>
                      <img
                        src={slides[clampedIndex]}
                        alt={`${selectedProduct.name}-${clampedIndex + 1}`}
                        style={{
                          width: "100%",
                          height: 260,
                          borderRadius: 8,
                          marginTop: 8,
                          objectFit: "cover",
                          display: "block",
                        }}
                      />
                      {slides.length > 1 ? (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginTop: 10,
                            gap: 8,
                          }}
                        >
                          <Button
                            size="small"
                            onClick={() =>
                              setActiveImageIndex((prev) =>
                                prev === 0 ? slides.length - 1 : prev - 1
                              )
                            }
                          >
                            Prev
                          </Button>
                          <Text type="secondary">
                            {clampedIndex + 1} / {slides.length}
                          </Text>
                          <Button
                            size="small"
                            onClick={() =>
                              setActiveImageIndex((prev) =>
                                prev === slides.length - 1 ? 0 : prev + 1
                              )
                            }
                          >
                            Next
                          </Button>
                        </div>
                      ) : null}
                    </div>
                  );
                })()
              ) : (
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  style={{
                    width: "100%",
                    borderRadius: 8,
                    marginTop: 8,
                    objectFit: "cover",
                  }}
                />
              )}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>

      <Modal
        open={isEditModalVisible}
        title="Edit Product"
        onCancel={() => setIsEditModalVisible(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={submitEdit}>
          <Form.Item label="Product Name" name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            label="Select One or Multiple Categories"
            name="categoryIds"
            rules={[{ required: true }]}
          >
            <Select mode="multiple" placeholder="Select categories">
              {categories.map((category) => (
                <Option key={category.id} value={category.id}>
                  {category.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Price" name="price" rules={[{ required: true }]}>
            <InputNumber style={{ width: "100%" }} min={0} step={0.01} />
          </Form.Item>
          {editingProduct?.resourceType === "food" ? (
            <Form.Item label="Stock Status" name="status" rules={[{ required: true }]}>
              <Select>
                <Option value="in_stock">In Stock</Option>
                <Option value="out-of-stock">Out of Stock</Option>
              </Select>
            </Form.Item>
          ) : (
            <Form.Item label="Stock Quantity" name="stock" rules={[{ required: true }]}>
              <InputNumber style={{ width: "100%" }} min={0} />
            </Form.Item>
          )}
          <Form.Item label="Description" name="description">
            <Input.TextArea rows={3} />
          </Form.Item>
          {editingProduct?.resourceType === "food" ? (
            <Form.Item
              label="Food Images (optional, up to 3)"
              name="foodImages"
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <Upload.Dragger
                multiple
                maxCount={3}
                beforeUpload={() => false}
                accept="image/*"
              >
                <p className="ant-upload-text">
                  Upload 1-3 new food images to replace existing ones
                </p>
              </Upload.Dragger>
            </Form.Item>
          ) : (
            <Form.Item
              label="Grocery Image (optional)"
              name="groceryImage"
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <Upload.Dragger maxCount={1} beforeUpload={() => false} accept="image/*">
                <p className="ant-upload-text">Upload new grocery image</p>
              </Upload.Dragger>
            </Form.Item>
          )}
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
            <Button onClick={() => setIsEditModalVisible(false)}>Cancel</Button>
            <Button type="primary" htmlType="submit" loading={savingEdit}>
              Save
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default ProductTable;
