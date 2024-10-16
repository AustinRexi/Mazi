import React from "react";
import { Card, Row, Col } from "antd";
import convertbar from "../../../utils/icons/convertbar.svg";

const tableData = [
  {
    name: "Tiamiyu Wasiu",
    fromAmount: "256",
    toAmount: "N363043.84",
    fromCurrency: "USD",
    toCurrency: "NGN",
    fee: "$4",
    Status: "Successful",
    convertLine: convertbar,
  },
  {
    name: "Tiamiyu Wasiu",
    fromAmount: "256",
    toAmount: "N363043.84",
    fromCurrency: "USD",
    toCurrency: "NGN",
    fee: "$4",
    Status: "Successful",
  },
  {
    name: "Tiamiyu Wasiu",
    fromAmount: "256",
    toAmount: "N363043.84",
    fromCurrency: "USD",
    toCurrency: "NGN",
    fee: "$4",
    Status: "Successful",
  },
  {
    name: "Tiamiyu Wasiu",
    fromAmount: "256",
    toAmount: "N363043.84",
    fromCurrency: "USD",
    toCurrency: "NGN",
    fee: "$4",
    Status: "Successful",
  },
];

const CurrencyTable = () => {
  return (
    <Card bordered={false}>
      {tableData.map((table) => (
        <Row gutter={16} style={{ borderBottom: "2px solid black" }}>
          <Col span={6}>
            <div
              style={{
                paddingRight: "15px",
                borderRight: "2px solid #f0f0f0",
              }}
            >
              <h3>{table.name}</h3>
              <img src={table.convertLine} alt="" />
            </div>
          </Col>
          <Col span={6}>
            <div
              style={{ paddingRight: "15px", borderRight: "1px solid #f0f0f0" }}
            >
              <h3>Column 2</h3>
              <p>Content for column 2</p>
            </div>
          </Col>
          <Col span={6}>
            <div
              style={{ paddingRight: "15px", borderRight: "1px solid #f0f0f0" }}
            >
              <h3>Column 3</h3>
              <p>Content for column 3</p>
            </div>
          </Col>
          <Col span={6}>
            <div>
              <h3>Column 4</h3>
              <p>Content for column 4</p>
            </div>
          </Col>
        </Row>
      ))}
    </Card>
  );
};

export default CurrencyTable;
