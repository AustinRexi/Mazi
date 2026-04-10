import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Legend,
  Tooltip
);

const formatYAxisValue = (value) => Number(value || 0).toLocaleString("en-US");

const Chart = ({ chartData }) => {
  const data = {
    labels: chartData?.labels || [],
    datasets: [
      {
        label: "Revenue",
        data: chartData?.revenue || [],
        fill: false,
        borderColor: "#111111",
        backgroundColor: "#111111",
        tension: 0.25,
        borderWidth: 2,
        pointRadius: 0,
      },
      {
        label: "Orders",
        data: chartData?.orders || [],
        fill: false,
        borderColor: "#004DC0",
        backgroundColor: "#004DC0",
        tension: 0.25,
        borderWidth: 2,
        pointRadius: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const isRevenue = context.dataset.label === "Revenue";
            const value = context.parsed.y;
            return isRevenue
              ? `Revenue: N${Number(value || 0).toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}`
              : `Orders: ${Number(value || 0).toLocaleString("en-US")}`;
          },
        },
      },
    },
    scales: {
      x: {
        display: true,
        grid: {
          display: false,
        },
      },
      y: {
        display: true,
        beginAtZero: true,
        ticks: {
          callback: formatYAxisValue,
        },
        grid: {
          color: "#EDF2F2",
        },
      },
    },
  };

  return (
    <div
      style={{
        width: "110%",
        height: "250px",

        gap: "6px",
        opacity: "1",
        overflow: "hidden",
      }}
    >
      <Line data={data} options={options} />
    </div>
  );
};

export default Chart;
