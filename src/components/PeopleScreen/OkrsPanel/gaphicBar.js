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
import { getMonthNames } from "../../../modules/utils";

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
        label: "Atingimento",
        data: values,
        backgroundColor: "#2f4390",
        maxBarThickness: 100,
      },
    ],
  };
  return <Bar className="chart-container" options={options} data={data} />;
}
