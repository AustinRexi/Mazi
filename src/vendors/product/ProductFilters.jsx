import { Row, Col, Input, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const { Option } = Select;

const ProductFilters = ({
  search,
  setSearch,
  categoryFilter,
  setCategoryFilter,
  statusFilter,
  setStatusFilter,
  categories = [],
}) => {
  return (
    <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
      <Col xs={24} sm={12} md={8}>
        <Input
          placeholder="Search products..."
          prefix={<SearchOutlined />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Col>
      <Col xs={24} sm={12} md={8}>
        <Select
          value={categoryFilter}
          onChange={setCategoryFilter}
          style={{ width: "100%" }}
        >
          <Option value="all">All Categories</Option>
          {categories.map((category) => (
            <Option key={category} value={category}>
              {category}
            </Option>
          ))}
        </Select>
      </Col>
      <Col xs={24} sm={12} md={8}>
        <Select
          value={statusFilter}
          onChange={setStatusFilter}
          style={{ width: "100%" }}
        >
          <Option value="all">All Status</Option>
          <Option value="in_stock">in_stock</Option>
          <Option value="active">Active</Option>
          <Option value="inactive">Inactive</Option>
          <Option value="out-of-stock">Out of Stock</Option>
        </Select>
      </Col>
    </Row>
  );
};

export default ProductFilters;
