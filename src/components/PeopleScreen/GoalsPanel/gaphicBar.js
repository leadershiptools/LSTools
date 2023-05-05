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

export function GraphicBar({ goals }) {
  const getLastThreeMonths = () => {
    const today = new Date();
    const lastThreeMonths = [];
    for (let i = -2; i < 0; i++) {
      let month = today.getMonth();
      let year = today.getFullYear();
      if (month + i < 1) {
        month += 12;
        year -= 1;
      }
      lastThreeMonths.push({ month: getMonthNames(month + i), year: year });
    }
    lastThreeMonths.push({
      month: getMonthNames(today.getMonth()),
      year: today.getFullYear(),
    });
    return lastThreeMonths;
  };
  const getLabels = () => {
    const lastThreeMonths = getLastThreeMonths();
    return lastThreeMonths.map((item) => `${item.month} de ${item.year}`);
  };

  const getValues = () => {
    const lastThreeMonths = getLastThreeMonths();
    const lastThreeMonthsHistory = {};
    goals?.forEach((goal) => {
      lastThreeMonths?.forEach((item) => {
        const { month, year } = item;
        goal?.history?.forEach((historyItem, index) => {
          const historyItemDate = new Date(historyItem.date);
          const historyItemMonth = getMonthNames(historyItemDate.getMonth());
          const historyItemYear = historyItemDate.getFullYear();
          if (month === historyItemMonth && year === historyItemYear) {
            lastThreeMonthsHistory[month] = {
              ...lastThreeMonthsHistory[month],
              [index]: historyItem,
            };
          }
        });
      });
    });

    const values = lastThreeMonths.map((item) => {
      const { month } = item;
      let sum = 0;
      Object.keys(lastThreeMonthsHistory[month] ?? {}).forEach((key) => {
        console.log(lastThreeMonthsHistory[month][key]?.achievement);
        sum += lastThreeMonthsHistory[month][key]?.achievement;
      });
      const mean =
        sum / Object.keys(lastThreeMonthsHistory[month] ?? {}).length;
      if (isNaN(mean)) return 0;
      return sum / Object.keys(lastThreeMonthsHistory[month] ?? {}).length;
    });
    return values;
  };

  getLastThreeMonths();
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
