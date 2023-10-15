import React from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";
import { Box } from "@mui/material";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
);

export function SkillsGraph({ skills }) {
  const data = {
    labels: skills?.map((skill) => skill.name),
    datasets: [
      {
        label: "Score",
        data: skills?.map((skill) => skill.score),
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 2,
        pointRadius: 9,
        pointHoverRadius: 10,
        pointBackgroundColor: "rgb(999, 999, 999)",
        pointHoverBorderWidth: 2,
        pointStyle: "circle",
      },
    ],
  };

  const options = {
    scales: {
      r: {
        min: 0,
        max: 5,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    scale: {
      angleLines: {
        lineWidth: 0.5,
        color: "rgba(128, 128, 128, 0.2)",
      },
      pointLabels: {
        fontSize: 12,
        fontColor: "black",
        fontStyle: "bold",
        callback: function (value, index, values) {
          return value;
        },
      },
      ticks: {
        beginAtZero: true,
        maxTicksLimit: 10,
        min: 0,
        max: 5,
        display: false,
      },
    },
  };
  return (
    <Box sx={{mt: -10}}>
      <Radar data={data} options={options} />
    </Box>
  );
}
