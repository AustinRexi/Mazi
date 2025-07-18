import { Card, Row, Col } from "antd";
import listIcon1 from "../../utils/icons/listIcon1.svg";
import listIcon2 from "../../utils/icons/listIcon2.svg";
import listIcon3 from "../../utils/icons/listIcon3.svg";
import Chart from "../../views/Dashboard/Chart";
import Card2 from "./Card2";
import Topstores from "./Topstores";

const ChartDetail = () => {
  const items = [
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
    <div
      style={{
        marginLeft: "14px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Row gutter={[0, 16]}>
        <Col xs={0} md={21} lg={21}>
          {" "}
          <Card
            hoverable
            style={{
              gap: "24px",
              height: "340px",
              display: "flex",

              width: "90%",
              justifyContent: "space-between",
              background: "#FFFFFF",
              borderRadius: "8px",
              border: "1px solid #DEEAEA",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <div
                style={{
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "20px",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "92%",
                    alignItems: "center",
                    gap: "15px",
                  }}
                >
                  <h5
                    style={{
                      fontSize: "24px",
                      fontWeight: 400,
                      lineHeight: "32px",
                      marginBottom: "10px",
                    }}
                  >
                    Sales Report
                  </h5>

                  <nav
                    style={{
                      display: "flex",
                      justifyContent: "space-evenly",
                      alignItems: "center",
                      gap: "10px",
                      marginTop: "13px",
                      marginLeft: "10px",
                    }}
                  >
                    {items.map((list) => (
                      <div
                        key={list.detail}
                        style={{
                          fontFamily: "NeueHaasDisplayLight",
                          fontSize: "16px",
                          display: "flex",
                          gap: "5px",
                          fontWeight: 500,
                          lineHeight: "24px",
                          justifyContent: "center",
                          alignItems: "center",
                          color: "#055961",
                        }}
                      >
                        <img src={list.icon} alt={list.detail} />
                        <h6 style={{ marginTop: 3 }}>{list.detail}</h6>
                      </div>
                    ))}
                  </nav>
                </div>

                <Chart />
              </div>
              <Card2 data={items} />
            </div>
          </Card>
        </Col>
        <Col xs={9} md={14} lg={0}></Col>
        <Col span={2}>
          <Topstores />
        </Col>
      </Row>
    </div>
  );
};

export default ChartDetail;
