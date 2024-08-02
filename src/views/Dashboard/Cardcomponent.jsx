import { Card, Typography, Row, Col } from "antd";
import chartIcon from "../../utils/icons/chart.svg";
import upArrowIcon from "../../utils/icons/arrow.svg";
import downArrowIcon from "../../utils/icons/downarrow.svg";
import profitIcon from "../../utils/icons/profit.svg";
import peopleIcon from "../../utils/icons/people.svg";
import heartIcon from "../../utils/icons/heart.svg";
import little from "../../utils/icons/little.svg";

import Ratings from "./Ratings";
const { Title } = Typography;

function Cardcomponent() {
  const finDetails = [
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
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        width: "1033px",
        marginLeft: "8px",
      }}
    >
      {finDetails.map((detail, index) => (
        <Card
          key={index}
          style={{
            width: "252px",
            height: "156px",
            display: "flex",
            flexDirection: "column",
            right: "4px",
            borderRadius: "12px",
            boxShadow: " 0px 4px 8px 0px #AAAAAA14",
            border: "1px solid #DEEAEA",
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
                  lineHeight: "24px",
                  color: "#545E5E",
                }}
                level={5}
              >
                {detail.Detail}
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
              style={{
                width: "100%",
              }}
            >
              <Col span={8} style={{ padding: 2, gap: "10px" }}>
                <div style={{ fontSize: "10px" }}>
                  <span
                    style={{
                      fontWeight: 500,
                      fontSize: "14px",
                      lineHeight: "20px",
                      color: "#545E5E",
                    }}
                  >
                    Previous
                  </span>
                  <Title
                    level={4}
                    style={{
                      margin: 0,
                      fontSize: "13px",
                      fontWeight: 700,
                      lineHeight: "12px",
                      marginTop: "3px",
                    }}
                  >
                    {detail.price}
                  </Title>
                </div>
              </Col>
              <Col span={8} style={{ textAlign: "center", padding: 0 }}>
                <div style={{ fontSize: "10px" }}>
                  <span
                    style={{
                      fontWeight: 500,
                      fontSize: "14px",
                      lineHeight: "20px",
                      color: "#545E5E",
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
                      marginTop: "3px",
                    }}
                  >
                    {detail.percentage}
                  </Title>
                </div>
              </Col>
              <Col span={8} style={{ textAlign: "center", padding: 0 }}>
                <div style={{}}>
                  <span
                    style={{
                      marginTop: "8px",
                      color: detail.color,
                      fontWeight: 600,
                      fontSize: "14px",
                      lineHeight: "20px",
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
      <Card
        style={{
          width: "250px",
          height: "156px",
          gap: 8,
          right: "4px",
          borderRadius: "12px",
          boxShadow: "0px 4px 8px 0px #AAAAAA14",
          border: "1px solid #DEEAEA",
          // padding: "16px", // Added padding for better spacing
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between", // Ensures the content is spaced out evenly
        }}
      >
        <div style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
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
            padding: "8px 0", // Added padding for better spacing
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
    </div>
  );
}

export default Cardcomponent;
