import React from "react";
import { Table, Tag, Typography, Space, Button } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

const { Text } = Typography;

const ProductTable = ({ products }) => {
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
      render: () => (
        <Space>
          <Button icon={<EyeOutlined />} />
          <Button icon={<EditOutlined />} />
          <Button icon={<DeleteOutlined />} danger />
        </Space>
      ),
    },
  ];

  return (
    <Table
      dataSource={products}
      columns={columns}
      rowKey="id"
      pagination={{ pageSize: 5 }}
    />
  );
};

export default ProductTable;
