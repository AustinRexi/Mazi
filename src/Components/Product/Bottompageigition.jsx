import { useState } from "react";
import { Select, Button, Input } from "antd";

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
  const options = [10, 20, 50].map((value) => (
    <Option key={value} value={value}>
      {value}
    </Option>
  ));

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "#F8FBFB",
        width: "1020px",
      }}
    >
      <Select
        defaultValue="10"
        style={{
          marginLeft: "9px",
          padding: 6,
          borderRadius: "16px",
          Padding: "10px, 14px, 10px, 14px",
          gap: "8px",
          height: "45px",
          width: "72px",
        }}
        onChange={handlePageSizeChange}
      >
        {options}
      </Select>
      <span
        style={{
          marginLeft: 8,
          whiteSpace: "nowrap",
          fontWeight: 500,
          fontSize: "16px",
          lineHeight: "24px",
          color: "#8D8E8D",
        }}
      >
        Showing {Math.min((currentPage - 1) * pageSize + 1, totalItems)} -{" "}
        {Math.min(currentPage * pageSize, totalItems)} of {totalItems}
      </span>
      <div
        style={{
          marginLeft: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Button
            style={{
              height: "40px",
              width: "108px",
              marginRight: 8,
              backgroundColor: "#D3D3D3",
              color: "#FFFFFF",
              borderRadius: "8px",
              gap: "4px",
              padding: "7px, 24px, 7px, 24px",
            }}
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            &laquo; Prev
          </Button>
          <Button
            style={{
              height: "40px",
              width: "108px",
              borderRadius: "8px",
              gap: "4px",
              padding: "7px, 24px, 7px, 24px",
              marginRight: 8,
              backgroundColor: "#034147",
              color: "#FFFFFF",
            }}
            disabled={currentPage === Math.ceil(totalItems / pageSize)}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next &raquo;
          </Button>
        </div>
        <span style={{ whiteSpace: "nowrap" }}>
          Page{" "}
          <Input
            style={{ width: 50, textAlign: "center" }}
            value={currentPage}
            readOnly
          />{" "}
          of {Math.ceil(totalItems / pageSize)}
        </span>
      </div>
    </div>
  );
};

export default Bottompageignition;
