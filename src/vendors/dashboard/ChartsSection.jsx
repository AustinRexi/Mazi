import React from "react";
import { Row, Col, Card, Typography } from "antd";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { formatVendorMoney } from "../utils/currency";

const { Text } = Typography;

const ChartsSection = ({
  revenueData = [],
  productPerformance = [],
  currencyCode = "",
}) => {
  const safeRevenueData =
    revenueData.length > 0 ? revenueData : [{ month: "No Data", revenue: 0 }];
  const safeProductPerformance =
    productPerformance.length > 0
      ? productPerformance
      : [{ name: "No Sales Yet", sales: 0 }];

  const revenueOptions = {
    chart: { type: "areaspline", height: 300 },
    title: { text: null },
    xAxis: {
      categories: safeRevenueData.map((d) => d.month),
      tickmarkPlacement: "on",
      title: { enabled: false },
    },
    yAxis: { title: { text: `Revenue (${currencyCode || "$"})` } },
    tooltip: {
      shared: true,
      pointFormatter: function () {
        return `<span style="color:${this.color}">\u25CF</span> ${this.series.name}: <b>${formatVendorMoney(this.y, currencyCode)}</b><br/>`;
      },
    },
    credits: { enabled: false },
    series: [
      {
        name: "Revenue",
        data: safeRevenueData.map((d) => d.revenue),
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

  const productOptions = {
    chart: { type: "bar", height: 300 },
    title: { text: null },
    xAxis: {
      categories: safeProductPerformance.map((p) => p.name),
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
        data: safeProductPerformance.map((p) => p.sales),
      },
    ],
  };

  return (
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
          extra={<Text type="secondary">Top 5 by units sold</Text>}
        >
          <HighchartsReact highcharts={Highcharts} options={productOptions} />
        </Card>
      </Col>
    </Row>
  );
};

export default ChartsSection;
