import React from "react";
import { Row, Col, Card, Typography } from "antd";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const { Text } = Typography;

const revenueData = [
  { month: "Jan", revenue: 4500 },
  { month: "Feb", revenue: 5200 },
  { month: "Mar", revenue: 4800 },
  { month: "Apr", revenue: 6100 },
  { month: "May", revenue: 7200 },
  { month: "Jun", revenue: 8500 },
];

const productPerformance = [
  { name: "Wireless Headphones", sales: 156 },
  { name: "Smart Watch", sales: 89 },
  { name: "Bluetooth Speaker", sales: 124 },
  { name: "Phone Case", sales: 203 },
  { name: "Charging Cable", sales: 145 },
];

// Revenue Area Chart
const revenueOptions = {
  chart: { type: "areaspline", height: 300 },
  title: { text: null },
  xAxis: {
    categories: revenueData.map((d) => d.month),
    tickmarkPlacement: "on",
    title: { enabled: false },
  },
  yAxis: { title: { text: "Revenue ($)" } },
  tooltip: { shared: true, valuePrefix: "$" },
  credits: { enabled: false },
  series: [
    {
      name: "Revenue",
      data: revenueData.map((d) => d.revenue),
      color: "#16a34a",
      fillColor: {
        linearGradient: [0, 0, 0, 300],
        stops: [
          [0, "#16a34a"],
          [1, "rgba(22,163,74,0.1)"],
        ],
      },
    },
  ],
};

// Product Bar Chart
const productOptions = {
  chart: { type: "bar", height: 300 },
  title: { text: null },
  xAxis: {
    categories: productPerformance.map((p) => p.name),
    title: { text: null },
  },
  yAxis: {
    title: { text: "Sales" },
  },
  tooltip: { valueSuffix: " units" },
  credits: { enabled: false },
  plotOptions: {
    bar: {
      borderRadius: 4,
      color: "#16a34a",
    },
  },
  series: [
    {
      name: "Sales",
      data: productPerformance.map((p) => p.sales),
    },
  ],
};

const ChartsSection = () => (
  <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
    <Col xs={24} lg={12}>
      <Card
        title="Revenue Trend"
        extra={<Text type="secondary">Last 6 months</Text>}
      >
        <HighchartsReact highcharts={Highcharts} options={revenueOptions} />
      </Card>
    </Col>

    <Col xs={24} lg={12}>
      <Card
        title="Top Performing Products"
        extra={<Text type="secondary">This month</Text>}
      >
        <HighchartsReact highcharts={Highcharts} options={productOptions} />
      </Card>
    </Col>
  </Row>
);

export default ChartsSection;
