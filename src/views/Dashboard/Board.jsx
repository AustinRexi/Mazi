import React from "react";
import { Card, Typography, DatePicker, Space } from "antd";
import chartIcon from "../../utils/icons/chart.svg";
import upArrowIcon from "../../utils/icons/arrow.svg";
import waveIcon from "../../utils/icons/emoji-wave.svg";
import dayjs from "dayjs";

const Board = () => {
  const onChange = (date) => {
    if (date) {
      console.log("Date: ", date);
    } else {
      console.log("Clear");
    }

    // const finDetails = [];
    const { Title } = Typography;
    return (
      <>
        <div
          style={{
            display: "flex",
            background: "white",
            alignContent: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignContent: "center", gap: 10 }}>
            <Title level={5}>Hello Tunde</Title>

            <img src={waveIcon} alt="" srcset="" />
          </div>
          {/* <div style={{ padding: 8 }}>
            <Space direction="vertical" size={4}>
              <DatePicker
                placeholder="This Month"
                presets={[
                  {
                    label: "This Month",
                    value: dayjs().add(-1, "d"),
                  },
                  {
                    label: "Three Months",
                    value: dayjs().add(-7, "d"),
                  },
                  {
                    label: "Six Months",
                    value: dayjs().add(-1, "month"),
                  },
                  {
                    label: "One Year",
                    value: dayjs().add(-1, "month"),
                  },
                ]}
                onChange={onChange}
              />
            </Space>
          </div> */}
        </div>

        <Card
          style={{
            width: 300,
            height: "auto",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
            padding: 0,
          }}
        >
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <img
              style={{ backgroundColor: "#E5F8EC", height: "fit-content" }}
              src={chartIcon}
              alt=""
              srcset=""
            />
            <div>
              <Title style={{ fontWeight: 100 }} level={5}>
                Revenue
              </Title>
              <Title level={5}>N150.456M</Title>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <Title style={{ fontWeight: 100 }} level={5}>
                Previous
              </Title>

              <Title level={5}>N132.77M</Title>
            </div>
            <div>
              <Title style={{ fontWeight: 100 }} level={5}>
                Difference
              </Title>
              <Title level={5}>15.4%</Title>
            </div>
            <div>
              <Title style={{ fontWeight: 100 }} level={5}>
                Trend
              </Title>
              <Title level={5}>
                <img src={upArrowIcon} alt="" srcset="" />
              </Title>
            </div>
          </div>
        </Card>
      </>
    );
  };
};

export default Board;
