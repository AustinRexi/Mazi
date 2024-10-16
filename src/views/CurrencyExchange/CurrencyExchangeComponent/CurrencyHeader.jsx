import React from "react";
import { Row, Col, Button, Input, Badge, Typography, Tabs, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import Search from "../../../Components/Product/Search";
import Filterbutton from "../../../Components/Product/Filterbutton";

const { Text } = Typography;

const CurrencyHeader = () => {
  return (
    <div style={{ padding: "20px", backgroundColor: "#fff" }}>
      <Row
        gutter={[6, 6]}
        align="middle"
        justify="space-between"
        style={{ display: "flex", flexWrap: "wrap" }}
      >
        <Col
          xs={24}
          sm={12}
          md={6}
          lg={4}
          style={{ display: "flex", alignItems: "center" }}
        >
          <Text strong style={{ fontSize: "24px", whiteSpace: "nowrap" }}>
            Currency Exchange
          </Text>
        </Col>

        <Col
          //   xs={24}
          //   sm={12}
          //   md={6}
          //   lg={6}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }} // Added alignItems for vertical alignment
        >
          <Search
            placeholder="Search name"
            style={{ height: 40, maxWidth: "200px", marginRight: "8px" }} // Set maxWidth and margin
          />
          <Filterbutton style={{ height: 20 }} />{" "}
          {/* Ensure Filterbutton has the same height */}
        </Col>
      </Row>
      <div>
        <Typography style={{ fontSize: 22 }}>Recent Transactions</Typography>
      </div>
    </div>
  );
};

export default CurrencyHeader;
