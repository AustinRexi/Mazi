
import { useState } from "react";
import { Select, Button, Input, Row, Col, Space } from "antd";

const { Option } = Select;

const Bottompageignition = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const totalItems = 1534;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (value) => {
    setPageSize(value);
    setCurrentPage(1);
  };

  return (
    <Row
      style={{
        backgroundColor: "#F8FBFB",
        padding: "10px",
        width: "100%",
        maxWidth: "1020px",
      }}
      align="middle"
      justify="space-between"
      gutter={[16, 16]}
    >
      <Col xs={24} sm={8} md={6} lg={4}>
        <Select
          defaultValue="10"
          style={{ width: "100%" }}
          onChange={handlePageSizeChange}
        >
          <Option value="10">10</Option>
          <Option value="20">20</Option>
          <Option value="50">50</Option>
        </Select>
      </Col>
      <Col xs={24} sm={16} md={18} lg={20}>
        <Row justify="space-between" align="middle">
          <Col xs={24} md={12}>
            <span style={{ whiteSpace: "nowrap", color: "#8D8E8D" }}>
              Showing {Math.min((currentPage - 1) * pageSize + 1, totalItems)} -{" "}
              {Math.min(currentPage * pageSize, totalItems)} of {totalItems}
            </span>
          </Col>
          <Col xs={24} md={12}>
            <Row justify="center" gutter={[8, 8]}>
              <Col>
                <Button
                  style={{
                    backgroundColor: "#D3D3D3",
                    color: "#FFFFFF",
                  }}
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  &laquo; Prev
                </Button>
              </Col>
              <Col>
                <Button
                  style={{
                    backgroundColor: "#034147",
                    color: "#FFFFFF",
                  }}
                  disabled={currentPage === Math.ceil(totalItems / pageSize)}
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  Next &raquo;
                </Button>
              </Col>
              <Col>
                <Space>
                  <span>Page</span>
                  <Input
                    style={{ width: 50, textAlign: "center" }}
                    value={currentPage}
                    readOnly
                  />
                  <span>of {Math.ceil(totalItems / pageSize)}</span>
                </Space>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Bottompageignition;