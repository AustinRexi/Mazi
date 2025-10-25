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
} from "antd";
import {
  EyeOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

const { Text } = Typography;
const { confirm } = Modal;

const ProductTable = ({ products }) => {
  const [data, setData] = useState(products || []);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // 🟢 Tag color handler
  const getStatusTag = (status) => {
    switch (status) {
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
        setData((prev) => prev.filter((item) => item.id !== record.id));
        message.success("Product deleted successfully!");
      },
    });
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
      title: "Price ($)",
      dataIndex: "price",
      render: (price) => <Text>${price}</Text>,
    },
    {
      title: "Stock",
      dataIndex: "stock",
      render: (stock) => {
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
          dataSource={data}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 5 }}
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
              ${selectedProduct.price}
            </Descriptions.Item>
            <Descriptions.Item label="Stock">
              {selectedProduct.stock}
            </Descriptions.Item>
            <Descriptions.Item label="Status">
              {getStatusTag(selectedProduct.status)}
            </Descriptions.Item>
            <Descriptions.Item label="Image">
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
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </>
  );
};

export default ProductTable;
