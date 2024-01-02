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
import ChartDataLabels from "chartjs-plugin-datalabels";
import "./graphicBar.styles.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

export const options = {
  responsive: true,
  scales: {
    x: {
      stacked: true,
      fontSize: 40,
      ticks: {
        font: {
          size: 12,
        },
      },
    },
    y: {
      stacked: true,
      beginAtZero: true,
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    datalabels: {
      color: "#fff",
      fontWeight: "bold",
      align: "end",
      anchor: "start",
      formatter: (value) => {
        return `${value}%`;
      },
    },
  },
};

export function GraphicBar({ okrs }) {
  const getLabels = () => {
    return okrs?.map((okr) => okr.name);
  };

  const getValues = () => {
    return okrs?.map((okr) => {
      let sum = 0;
      okr?.keyResults?.forEach((keyResult) => {
        sum += keyResult.achievement;
      });
      return sum / okr?.keyResults.length;
    });
  };

  const labels = getLabels();
  const values = getValues();
  const data = {
    labels,
    datasets: [
      {
        barThickness: 100,
        data: values,
        backgroundColor: "#F3328D",
        fontSize: 16,
      },
    ],
  };
  return <Bar className="chart-okr" options={options} data={data} />;
}
