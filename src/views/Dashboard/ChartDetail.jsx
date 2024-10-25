{
  /*
import { Card } from "antd";
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
    className="chartDetail-container"
    >
      <Card
      className="chartDetail-card"
        hoverable
      >
        <div
         className="chartDetail-card2"
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
                width: "80%",
                alignItems: "flex-start",
                gap: "20px",
              }}
            >
              <h5
                style={{
                  fontSize: "24px",
                  fontWeight: 600,
                  lineHeight: "32px",
                  marginBottom: "10px",
                }}
              >
                Sales Report
              </h5>

              <nav
               className="summary-items"
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  gap: "10px",
                  marginTop: "13px",
                  marginLeft: "16px",
                }}
              >
                {items.map((list) => (
                  <div
                    key={list.detail}
                    style={{
                      fontSize: "16px",
                      display: "flex",
                      gap: "5px",
                      fontWeight: 500,
                      lineHeight: "24px",
                    }}
                  >
                    <img src={list.icon} alt={list.detail} />
                    <h6>{list.detail}</h6>
                  </div>
                ))}
              </nav>
            </div>

             <Chart />
          
          </div>
          <Card2 data={items} />
        </div>
      </Card>
      <Topstores />
    </div>
  );
};

export default ChartDetail;
*/
}

import { Card } from "antd";
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
    <div className="chartDetail-container">
      <Card className="chartDetail-card" hoverable>
        <div className="chartDetail-card2">
          <div 
          className="chartDetail-card3">
            <div
            className="chartDetail-div4"
            >

            <h5
              style={{
                fontSize: "24px",
                fontWeight: 600,
                lineHeight: "32px",
                marginBottom: "10px",
                textAlign: "center",
              }}
            >
              Sales Report
            </h5>

            <nav
              className="summary-items"
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
                gap: "10px",
                marginTop: "13px",
                margin: "auto"
              }}
            >
              {items.map((list) => (
                <div
                  key={list.detail}
                  style={{
                    fontSize: "16px",
                    display: "flex",
                    gap: "5px",
                    fontWeight: 500,
                    lineHeight: "24px",
                  }}
                >
                  <img src={list.icon} alt={list.detail} />
                  <h6>{list.detail}</h6>
                </div>
              ))}
            </nav>
            </div>
            
            <div style={{ width: "100%" }}>
              <Chart />
            </div>
          </div>
          <Card2 data={items} />
        </div>
      </Card>
      <Topstores />
    </div>
  );
};

export default ChartDetail;
