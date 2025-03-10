import { Card, Typography, Row, Col } from "antd";
import chartIcon from "../../utils/icons/chart.svg";
import upArrowIcon from "../../utils/icons/arrow.svg";
import downArrowIcon from "../../utils/icons/downarrow.svg";
import profitIcon from "../../utils/icons/profit.svg";
import peopleIcon from "../../utils/icons/people.svg";
import heartIcon from "../../utils/icons/heart.svg";
import little from "../../utils/icons/little.svg";
import { useState, useEffect } from "react";

import Ratings from "./Ratings";
const { Title } = Typography;

function Cardcomponent() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 576px)"); // Same as AntD xs breakpoint
    setIsMobile(mediaQuery.matches);

    const handler = (event) => setIsMobile(event.matches);
    mediaQuery.addEventListener("change", handler);

    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const statistics = [
    {
      Detail: "Revenue",
      DetailIcon: chartIcon,
      net: "N150.456M",
      price: "N132.77m",
      percentage: "15.4%",
      icon: upArrowIcon,
      color: "#22BB5F",
    },
    {
      Detail: "New Customers",
      DetailIcon: peopleIcon,
      net: "5,456",
      price: "N162.77m",
      percentage: "25.4%",
      icon: upArrowIcon,
      color: "#22BB5F",
    },
    {
      Detail: "Gross Profit",
      DetailIcon: profitIcon,
      net: "N150.456M",
      price: "N132.77m",
      percentage: "15.4%",
      icon: downArrowIcon,
      color: "#E72529",
    },
  ];
  return (
    <Row
      guttter={[2, 14]}
      style={{ justifyContent: "center", alignContent: "center" }}
    >
      <Col
        xs={24}
        md={18}
        lg={18}
        style={{
          display: "flex",
          flexWrap: "wrap",

          justifyContent: "space-evenly",
        }}
      >
        {statistics.map((detail, index) => (
          <Card
            hoverable
            key={index}
            style={{
              width: "242px",
              height: "156px",
              display: "flex",
              flexDirection: "column",
              background: "#FFFFFF",
              borderRadius: "12px",
              boxShadow: " 0px 4px 8px 0px #AAAAAA14",
              border: "1px solid #DEEAEA",
              justifyContent: "flex-start",
              marginTop: isMobile ? "8px" : "0px",
            }}
          >
            <div style={{ display: "flex", gap: "8px" }}>
              <img
                style={{
                  borderRadius: "5px",
                  height: "40px",
                }}
                src={detail.DetailIcon}
                alt="detail icon"
              />
              <div style={{ flex: 1, marginBottom: "10px" }}>
                <Title
                  style={{
                    fontWeight: 500,
                    margin: 0,
                    fontSize: "14px",
                    lineHeight: "20px",
                    color: "#545E5E",
                  }}
                  level={5}
                >
                  {detail.Detail}
                </Title>
                <Title
                  style={{
                    margin: 2,
                    fontSize: "22px",
                    fontWeight: 600,
                    lineHeight: "32px",
                    fontFamily: " NeueHaasDisplayLight",
                  }}
                  level={5}
                >
                  {detail.net}
                </Title>
              </div>
            </div>
            <div
              style={{
                width: "100%",
                height: "48px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Row
                gutter={[4, 0]}
                justify="space-between"
                style={{
                  width: "100%",
                }}
              >
                <Col span={8} style={{ gap: "10px" }}>
                  <div>
                    <span
                      style={{
                        fontWeight: 500,
                        fontSize: "14px",
                        lineHeight: "30px",
                        color: "#545E5E",
                        fontFamily: "NeueHaasDisplayMediu",
                      }}
                    >
                      Previous
                    </span>
                    <Title
                      level={4}
                      style={{
                        margin: 0,
                        fontSize: "14px",
                        fontWeight: 500,
                        lineHeight: "12px",
                        whiteSpace: "nowrap",

                        textOverflow: "ellipsis",
                      }}
                    >
                      {detail.price}
                    </Title>
                  </div>
                </Col>
                <Col span={8} style={{ textAlign: "center", padding: 0 }}>
                  <div style={{ marginLeft: "5px" }}>
                    <span
                      style={{
                        fontWeight: 500,
                        fontSize: "14px",
                        lineHeight: "29px",
                        color: "#545E5E",
                        fontFamily: "NeueHaasDisplayMediu",
                      }}
                    >
                      Difference
                    </span>
                    <Title
                      level={5}
                      style={{
                        margin: 0,
                        fontSize: "13px",
                        fontWeight: 700,
                        lineHeight: "12px",
                      }}
                    >
                      {detail.percentage}
                    </Title>
                  </div>
                </Col>
                <Col span={8} style={{ textAlign: "center" }}>
                  <div style={{ marginLeft: "14px", marginTop: "4px" }}>
                    <span
                      style={{
                        color: detail.color,
                        fontWeight: 500,
                        fontSize: "14px",
                        lineHeight: "24px",
                        fontFamily: "NeueHaasDisplayMediu",
                      }}
                    >
                      Trend
                    </span>
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
      </Col>

      <Col xs={24} md={6} lg={6}>
        <Card
          hoverable
          style={{
            width: "242px",
            height: "156px",
            marginTop: isMobile ? "8px" : "0px",
            borderRadius: "12px",
            boxShadow: "0px 4px 8px 0px #AAAAAA14",
            border: "1px solid #DEEAEA",
            marginLeft: isMobile ? "54px" : "0px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}
          >
            <img
              style={{
                borderRadius: "5px",
                height: "40px",
              }}
              src={heartIcon}
              alt="detail"
            />
            <div style={{ flex: 1 }}>
              <Title
                style={{
                  fontWeight: 500,
                  margin: 0,
                  fontSize: "14px",
                  lineHeight: "24px",
                  color: "#545E5E",
                }}
                level={5}
              >
                Product Rating
              </Title>
              <Title
                style={{
                  margin: 0,
                  fontSize: "24px",
                  fontWeight: 600,
                  lineHeight: "32px",
                }}
                level={5}
              >
                4.8
              </Title>
            </div>
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "start",
              justifyContent: "center",
              padding: "8px 0",
            }}
          >
            <Row
              gutter={[4, 0]}
              justify="flex-start"
              align="flex-start"
              style={{ width: "100%" }}
            >
              <Col span={8} style={{ marginRight: "85px" }}>
                <div
                  style={{
                    fontSize: "10px",
                    display: "flex",
                    alignItems: "start",
                    gap: "4px",
                  }}
                >
                  <img src={little} alt="" />
                  <span
                    style={{
                      lineHeight: "20px",
                      fontSize: "14px",
                      fontWeight: 500,
                    }}
                  >
                    15,056
                  </span>
                </div>
              </Col>
            </Row>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "start",
              marginBottom: "14px",
            }}
          >
            <Ratings />
          </div>
        </Card>
      </Col>
    </Row>
  );
}

export default Cardcomponent;
