import React from "react";
import { Card, Typography, Row, Col } from "antd";
import chartIcon from "../../utils/icons/chart.svg";
import upArrowIcon from "../../utils/icons/arrow.svg";
import downArrowIcon from "../../utils/icons/downarrow.svg";
import profitIcon from "../../utils/icons/profit.svg";
import waveIcon from "../../utils/icons/emoji-wave.svg";
import peopleIcon from "../../utils/icons/people.svg";
import heartIcon from "../../utils/icons/heart.svg";

import Calender from "./Calender";
import ChartDetail from "./ChartDetail";

const { Title } = Typography;

const Board = () => {
  const finDetails = [
    {
      Detail: "Previous",
      DetailIcon: chartIcon,
      net: "N150.456",
      price: "N132.77m",
      percentage: "15.4%",
      icon: upArrowIcon,
      color: "#E5F7F8",
    },
    {
      Detail: "New Customers",
      DetailIcon: peopleIcon,
      net: "5,456",
      price: "N162.77m",
      percentage: "25.4%",
      icon: downArrowIcon,
      color: "#F6E9D7",
    },
    {
      Detail: "Revenue",
      DetailIcon: profitIcon,
      net: "N150.456",
      price: "N132.77m",
      percentage: "15.4%",
      icon: upArrowIcon,
      color: "#E5F8EC",
    },
    {
      Detail: "Product Rating",
      DetailIcon: heartIcon,
      net: "4.8",
      // price: "N132.77m",
      // percentage: "15.4%",
      // icon: upArrowIcon,
      color: "#FEEEEE",
    },
  ];

  return (
    <>
      <div
        style={{
          display: "flex",
          background: "white",
          alignContent: "center",
          justifyContent: "space-between",
          width: "100%",
          padding: "24px 0px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Title level={5}>Hello Tunde</Title>
          <img
            style={{ height: "fit-content" }}
            src={waveIcon}
            alt="wave icon"
          />
        </div>
        <Calender />
      </div>

      <div
        style={{ display: "flex", justifyContent: "space-between", gap: 16 }}
      >
        {finDetails.map((detail, index) => (
          <Card
            key={index}
            style={{
              width: "260px",
              height: "156px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: "10px",
            }}
          >
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <img
                style={{
                  backgroundColor: detail.color,
                  height: "40px",
                  width: "40px",
                  borderRadius: "5px",
                }}
                src={detail.DetailIcon}
                alt="detail icon"
              />
              <div style={{ flex: 1 }}>
                <Title
                  style={{ fontWeight: 100, margin: 0, fontSize: "14px" }}
                  level={5}
                >
                  {detail.Detail}
                </Title>
                <Title style={{ margin: 0, fontSize: "14px" }} level={5}>
                  {detail.net}
                </Title>
              </div>
            </div>
            <div
              style={{
                width: "100%",
                height: "48px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Row
                gutter={[4, 0]}
                justify="center"
                align="middle"
                style={{ width: "100%" }}
              >
                <Col span={8} style={{ textAlign: "center", padding: 0 }}>
                  <div style={{ fontSize: "10px" }}>
                    <span>Previous</span>
                    <Title level={5} style={{ margin: 0, fontSize: "12px" }}>
                      {detail.price}
                    </Title>
                  </div>
                </Col>
                <Col span={8} style={{ textAlign: "center", padding: 0 }}>
                  <div style={{ fontSize: "10px" }}>
                    <span>Difference</span>
                    <Title level={5} style={{ margin: 0, fontSize: "12px" }}>
                      {detail.percentage}
                    </Title>
                  </div>
                </Col>
                <Col span={8} style={{ textAlign: "center", padding: 0 }}>
                  <div style={{ fontSize: "10px" }}>
                    <span>Trend</span>
                    <Title level={5} style={{ margin: 0, fontSize: "12px" }}>
                      <img
                        src={detail.icon}
                        style={{ width: "12px", height: "12px" }}
                      />
                    </Title>
                  </div>
                </Col>
              </Row>
            </div>
          </Card>
        ))}
      </div>

      <div
        style={{
          gap: "10px",
          alignItems: "center",
          width: "100%",
          marginTop: "24px",
        }}
      >
        <ChartDetail />
      </div>
    </>
  );
};

export default Board;
