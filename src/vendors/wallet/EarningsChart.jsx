import React from "react";
import { Card, Typography } from "antd";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const { Title, Text } = Typography;

const EarningsChart = ({ data }) => {
  // Transform data into Highcharts series
  const months = data.map((item) => item.month);
  const earnings = data.map((item) => item.earnings);

  const options = {
    chart: {
      type: "line",
      backgroundColor: "transparent",
      height: 300,
    },
    title: {
      text: "",
    },
    xAxis: {
      categories: months,
      title: { text: "Month" },
      lineColor: "#e8e8e8",
    },
    yAxis: {
      title: { text: "Earnings ($)" },
      gridLineColor: "#f0f0f0",
    },
    legend: {
      enabled: false,
    },
    tooltip: {
      shared: true,
      backgroundColor: "#fff",
      borderColor: "#52c41a",
      borderRadius: 8,
      shadow: true,
      formatter: function () {
        return `<b>${
          this.x
        }</b><br/>Earnings: <b>$${this.y.toLocaleString()}</b>`;
      },
    },
    series: [
      {
        name: "Earnings",
        data: earnings,
        color: "#52c41a",
        lineWidth: 3,
        marker: {
          enabled: true,
          radius: 4,
          fillColor: "#52c41a",
        },
      },
    ],
    credits: {
      enabled: false,
    },
  };

  return (
    <Card style={{ marginTop: 24 }}>
      <Title level={4}>Earnings Overview</Title>
      <Text type="secondary">Your earnings trend over the past 6 months</Text>
      <div style={{ marginTop: 16 }}>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    </Card>
  );
};

export default EarningsChart;
