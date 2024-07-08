import React from "react";
import { Row, Col, Typography, Card } from "antd";
import Calender from "../Dashboard/Calender";
import listIcon1 from "../../utils/icons/listIcon1.svg";
import listIcon2 from "../../utils/icons/listIcon2.svg";
import listIcon3 from "../../utils/icons/listIcon3.svg";
import Chart from "../../views/Dashboard/Chart";
import Orders from "../Orders/Orders";
const { Title } = Typography;
const ChartDetail = () => {
  const chartsDetail = [
    {
      icon: listIcon1,
      detail: "Total Earning",
      total: "N150.456M",
    },
    {
      icon: listIcon2,
      detail: "Total order",
      total: "7453",
    },

    {
      icon: listIcon3,
      detail: "Total Refund",
      total: "N150.456M",
    },
  ];
  return (
    <Card
      hoverable
      style={{
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",

        height: "340px",
        display: "flex",
        width: "721px",
        justifyContent: "space-between",
        color: "white",
        borderRadius: "8px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "70%",
          padding: 0,

          margin: 10,
          alignItems: "center",
          position: "absolute",
        }}
      >
        <h5 style={{ fontSize: 13, color: "black" }}>Sales Report</h5>

        <nav
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            gap: 15,
            fontSize: 12,
            color: "#055961",
          }}
        >
          {chartsDetail.map((list) => (
            <div style={{ display: "flex", gap: 5, fontWeight: 200 }}>
              <img src={list.icon} alt="" />
              <h6>{list.detail}</h6>
            </div>
          ))}
        </nav>
      </div>

      <div
        style={{
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
          padding: "8px",
          borderRadius: "4px",
          color: "white",
          position: "absolute",
          right: "8px",
          bottom: "8px",
          justifyItems: "center",
          alignItems: "center",
          margin: 10,
          width: "18%",
        }}
      >
        <Calender />
        {chartsDetail.map((list) => (
          <div
            style={{
              fontSize: "10px",
              color: "black",
              margin: 10,
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
              borderRadius: 5,
              padding: 6,
            }}
          >
            <Title level={5} style={{ margin: 0, fontSize: "8px" }}>
              {list.total}
            </Title>
            <span>{list.detail}</span>
          </div>
        ))}
      </div>
      <div style={{ padding: "24px" }}>
        <Chart />
      </div>
      {/* <Orders /> */}
    </Card>
  );
};
export default ChartDetail;
