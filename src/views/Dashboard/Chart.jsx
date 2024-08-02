import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

const Chart = () => {
  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        data: [625, 600, 175, 290, 300, 630, 100, 280, 750, 900, 1050, 930],
        fill: true,
        borderColor: "#F58B3F",
        tension: 0.001,
      },
      {
        data: [880, 920, 910, 800, 340, 500, 450, 900, 450, 320, 880, 1000],
        fill: true,
        borderColor: "#055961",
        tension: 0.001,
      },
      {
        data: [1050, 910, 930, 400, 900, 750, 450, 890, 530, 620, 880, 330],
        fill: true,
        borderColor: "#004DC0",
        tension: 0.001,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      title: {
        display: true,
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
        },
      },
      y: {
        display: true,
        title: {
          display: false,
        },
      },
    },
  };

  return (
    <div
      style={{
        width: "530px",
        height: "250px",
        // marginBottom: "16px",
        gap: "6px",
        opacity: "1", // Ensure the chart is visible
        overflow: "hidden",
      }}
    >
      <Line data={data} options={options} />
    </div>
  );
};

export default Chart;
