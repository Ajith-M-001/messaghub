/* eslint-disable react/prop-types */
import { Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Tooltip,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Legend,
  scales,
  Filler,
} from "chart.js";
import { getLast7Days } from "../../lib/features";

ChartJS.register(
  Tooltip,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Legend,
  Filler
);

const labels = getLast7Days();

const LineChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
  scales: {
    y: {
      grid: {
        display: false,
      },
    },
    x: {
      beginAtZero: true,
      grid: {
        display: false,
      },
    },
  },
};

const doughnutOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top", // Legend position
    },
    title: {
      display: false,
    },
    tooltip: {
      enabled: true, // Enable tooltips on hover
    },
  },
  cutout: 90,
};

const LineChart = ({ value = {} }) => {
  const data = {
    labels,
    datasets: [
      {
        label: "# of Votes",
        data: value,
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)", // Line color
      },
    ],
  };
  return <Line data={data} options={LineChartOptions} />;
};
const DoughnutChart = ({ value = {}, labels = {} }) => {
  const data = {
    labels,
    datasets: [
      {
        label: "total charts vs total messages",
        data: value,
        backgroundColor: [
          "rgba(75, 192, 192, 0.5)", // Color for "Total Charts"
          "rgba(255, 99, 132, 0.5)", // Color for "Total Messages"
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)", // Border color for "Total Charts"
          "rgba(255, 99, 132, 1)", // Border color for "Total Messages"
        ],
        borderWidth: 1, // Border width around the doughnut sections
      },
    ],
  };
  return <Doughnut data={data} options={doughnutOptions} />;
};

export { LineChart, DoughnutChart };
