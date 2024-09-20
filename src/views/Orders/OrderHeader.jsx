import React from "react";
import { Row, Col, Button, Input, Badge, Typography, Tabs, Space } from "antd";
import {
  PlusOutlined,
  SearchOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import TabPane from "antd/es/tabs/TabPane";
import Search from "../../Components/Product/Search";
import Calender from "../Dashboard/Calender";

const { Text } = Typography;

const OrdersHeader = () => {
  return (
    <div style={{ padding: "20px", backgroundColor: "#fff" }}>
      <Row
        gutter={[16, 16]}
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
          <Text strong style={{ fontSize: "24px" }}>
            Orders
          </Text>
        </Col>
        <Col
          xs={24}
          sm={12}
          md={6}
          lg={4}
          style={{
            display: "flex",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <Tabs
            defaultActiveKey="1"
            style={{
              borderRadius: "16px",
              height: 50,
              alignItems: "center",
              border: " 1px solid #d9d9d9",
            }}
          >
            <TabPane tab="All Orders" key="1">
              {/* Order details content goes here */}
            </TabPane>
            <TabPane tab="Mazi Special Orders" key="2">
              {/* Track order content goes here */}
            </TabPane>
          </Tabs>
          <Badge
            count={140}
            style={{
              backgroundColor: "#f5222d",
              position: "absolute",
              top: "-10px",
              right: "40px",
              zIndex: 1,
            }}
          />
        </Col>
        <Col
          xs={24}
          sm={12}
          md={6}
          lg={4}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Button
            type="primary"
            style={{
              borderRadius: "20px",
              backgroundColor: "#00474f",
              borderColor: "#00474f",
            }}
          >
            New Order {<PlusOutlined rotate={90} />}
          </Button>
        </Col>
        <Col
          xs={24}
          sm={12}
          md={6}
          lg={6}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Search
            placeholder="Store,food and groceries"
            style={{ height: 40 }}
          />
        </Col>
        <Col
          xs={24}
          sm={12}
          md={6}
          lg={4}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Calender placeholder="Today" />
        </Col>
      </Row>
    </div>
  );
};

export default OrdersHeader;
