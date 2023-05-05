import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
      beginAtZero: true,
    },
  },
};

export function GraphicBar({ goals }) {
  console.log(goals)
  const labels = ["março de 2021", "junho de 2021", "agosto de 2021"];
  const values = [85, 60, 90];
  const data = {
    labels,
    datasets: [
      {
        label: "",
        data: values,
        backgroundColor: "#2f4390",
        maxBarThickness: 100,
      },
    ],
  };
  return <Bar className="chart-container" options={options} data={data} />;
}
