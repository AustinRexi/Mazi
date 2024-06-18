import React from "react";
import { Card, Typography, DatePicker, Space } from "antd";
import chartIcon from "../../utils/icons/chart.svg";
import upArrowIcon from "../../utils/icons/arrow.svg";
import downArrowIcon from "../../utils/icons/downarrow.svg";
import waveIcon from "../../utils/icons/emoji-wave.svg";
import dayjs from "dayjs";
import { CalendarOutlined } from "@ant-design/icons";

const Board = () => {
  const onChange = (date) => {
    if (date) {
      console.log("Date: ", date);
    } else {
      console.log("Clear");
    }
  };
  const finDetails = [
    {
      Detail: "Revenue",
      DetailIcon: "chartIcon",
      net: "N150.456",
      price: "N132.77m",
      percentage: "15.4%",
      icon: "upArrowIcon",
    },
    {
      Detail: "Gross Profit",
      DetailIcon: "profitIcon",
      net: "N150.456",
      price: "N162.77m",
      percentage: "25.4%",
      icon: "downArrowIcon",
    },
  ];
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

          <img
            style={{ height: "fit-content" }}
            src={waveIcon}
            alt=""
            srcset=""
          />
        </div>
        <div style={{ padding: 8 }}>
          <Space direction="vertical" size={4}>
            <DatePicker
              suffixIcon={<CalendarOutlined />}
              placeholder="This Month"
              presets={[
                {
                  label: "This Month",
                  value: dayjs().add(-1, "month"),
                },
                {
                  label: "Three Months",
                  value: dayjs().subtract(3, "month"),
                },
                {
                  label: "Six Months",
                  value: dayjs().subtract(6, "month"),
                },
                {
                  label: "One Year",
                  value: dayjs().add(-1, "month"),
                },
              ]}
              onChange={onChange}
            />
          </Space>
        </div>
      </div>

      {finDetails.map((detail, index) => (
        <Card
          style={{
            width: 300,
            height: 250,
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
            padding: 0,
          }}
        >
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <img
              style={{
                backgroundColor: "#E5F8EC",
                height: "fit-content",
                borderRadius: 5,
              }}
              src={detail.DetailIcon}
              alt=""
              srcset=""
            />
            <div>
              <Title style={{ fontWeight: 100 }} level={5}>
                Revenue
              </Title>
              <Title level={5}>{detail.net}</Title>
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

              <Title level={5}>{detail.price}</Title>
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
      ))}
    </>
  );
};

export default Board;
