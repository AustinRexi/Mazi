import { Card, Row, Col } from "antd";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { formatAdminMoney } from "../../utils/adminCurrency";

function ChartsSection({ chartData, pieData, currencyCode }) {
  // Line Chart Options
  const lineChartOptions = {
    title: {
      text: null,
    },
    subtitle: {
      text: "Monthly performance overview",
      style: {
        color: "#8c8c8c", // Matches Ant Design's gray text
      },
    },
    xAxis: {
      categories: chartData?.labels || [],
      title: {
        text: null,
      },
    },
    yAxis: {
      title: {
        text: null,
      },
    },
    tooltip: {
      formatter: function () {
        return `${this.series.name}: ${formatAdminMoney(this.y, currencyCode)}`;
      },
    },
    legend: {
      enabled: true,
    },
    series: [
      {
        name: "Revenue",
        data: chartData?.revenue || [],
        color: "#16a34a",
        lineWidth: 2,
      },
      {
        name: "Profit",
        data: chartData?.profit || [],
        color: "#3b82f6",
        lineWidth: 2,
      },
      {
        name: "Expenses",
        data: chartData?.expenses || [],
        color: "#ef4444",
        lineWidth: 2,
      },
    ],
    chart: {
      type: "line",
      height: 300,
    },
    credits: {
      enabled: false,
    },
  };

  // Pie Chart Options
  const pieChartOptions = {
    title: {
      text: null,
    },
    subtitle: {
      text: "Revenue breakdown by service",
      style: {
        color: "#8c8c8c", // Matches Ant Design's gray text
      },
    },
    chart: {
      type: "pie",
      height: 300,
    },
    tooltip: {
      formatter: function () {
        return `${this.point.name}: ${formatAdminMoney(this.y, currencyCode)}`;
      },
    },
    legend: {
      enabled: true,
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: false,
        },
        showInLegend: true,
      },
    },
    series: [
      {
        name: "Revenue",
        data: pieData.map((item) => ({
          name: item.name,
          y: item.value,
          color: item.color,
        })),
        innerSize: "0%", // Set to '50%' if you want a donut chart
        size: "80%", // Matches outerRadius of 80
      },
    ],
    credits: {
      enabled: false,
    },
  };

  return (
    <Row gutter={[24, 24]}>
      <Col xs={24} lg={12}>
        <Card title="Revenue & Profit Trends">
          <HighchartsReact highcharts={Highcharts} options={lineChartOptions} />
        </Card>
      </Col>
      <Col xs={24} lg={12}>
        <Card title="Revenue Distribution">
          <HighchartsReact highcharts={Highcharts} options={pieChartOptions} />
        </Card>
      </Col>
    </Row>
  );
}

export default ChartsSection;
