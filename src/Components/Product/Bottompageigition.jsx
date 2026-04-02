import { useState } from "react";
import { Select, Button, Input, Flex } from "antd";

const { Option } = Select;

const Bottompageignition = ({
  isVisible,
  style,
  currentPage: controlledCurrentPage,
  pageSize: controlledPageSize,
  totalItems: controlledTotalItems,
  onPageChange,
  onPageSizeChange,
}) => {
  const [internalCurrentPage, setInternalCurrentPage] = useState(1);
  const [internalPageSize, setInternalPageSize] = useState(10);
  const totalItems = Number(controlledTotalItems ?? 0);
  const currentPage = Number(controlledCurrentPage ?? internalCurrentPage);
  const pageSize = Number(controlledPageSize ?? internalPageSize);
  const maxPage = Math.max(1, Math.ceil(totalItems / pageSize));
  const showingFrom = totalItems === 0 ? 0 : Math.min((currentPage - 1) * pageSize + 1, totalItems);
  const showingTo = totalItems === 0 ? 0 : Math.min(currentPage * pageSize, totalItems);

  const handlePageChange = (page) => {
    const nextPage = Math.min(Math.max(1, page), maxPage);
    if (typeof onPageChange === "function") {
      onPageChange(nextPage);
      return;
    }
    setInternalCurrentPage(nextPage);
  };

  const handlePageSizeChange = (value) => {
    if (typeof onPageSizeChange === "function") {
      onPageSizeChange(value);
      return;
    }
    setInternalPageSize(value);
    setInternalCurrentPage(1);
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
        width: "95%",
        ...style,
      }}
    >
      <Select
        defaultValue="10"
        style={{
          marginLeft: "9px",
          padding: 6,
          Padding: "10px, 14px, 10px, 14px",
          gap: "4px",
          height: "40px",
          width: "72px",
        }}
        onChange={handlePageSizeChange}
      >
        {options}
      </Select>
      <span
        style={{
          marginLeft: 3,
          whiteSpace: "nowrap",
          fontFamily: "Aeonik",
          fontWeight: 500,
          fontSize: "16px",
          lineHeight: "28px",
          color: "#8D8E8D",
        }}
      >
        Showing {showingFrom} - {showingTo} of {totalItems}
      </span>
      <div
        style={{
          marginLeft: "auto",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          display: isVisible ? "flex" : "none",
          ...style,
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
              height: "30px",
              width: "80px",
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
              height: "30px",
              width: "80px",
              borderRadius: "8px",
              gap: "4px",
              padding: "7px, 24px, 7px, 24px",
              marginRight: 8,
              backgroundColor: "#034147",
              color: "#FFFFFF",
            }}
            disabled={currentPage === maxPage}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next &raquo;
          </Button>
        </div>
        <span
          style={{
            whiteSpace: "nowrap",
            fontFamily: "Aeonik",
            fontWeight: 500,
            fontSize: "16px",
            lineHeight: "28px",
          }}
        >
          Page{" "}
          <Input
            style={{ width: 50, textAlign: "center", height: "27px" }}
            value={currentPage}
            readOnly
          />{" "}
          of {maxPage}
        </span>
      </div>
    </div>
  );
};

export default Bottompageignition;
