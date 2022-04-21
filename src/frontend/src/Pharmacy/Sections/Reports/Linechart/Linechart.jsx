import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

const Linechart = () => {
  /**
   * Labels-> An array of strings on the x axis.
   * Dataset - > The data you are working with .
   */

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
  );
  const data = {
    labels: ["1 Dec", "8 Dec", "16 Dec", "31 Dec"],
    datasets: [
      {
        label: "Sales",
        data: [3, 7, 4, 5],
        borderColor: "#03A9F5",
        fill: true,
        backgroundColor: "rgb(16, 156, 241 , 0.3)",
        borderWidth: 2,
        hoverBorderColor: "rgb(255,196,208)",
      },
    ],
  };
  const options = {
    tension: 0.4,
    title: {
      display: true,
      text: "linechrt",
    },
    scales: {
      y: [
        {
          display: true,
          stacked: true,
          ticks: {
            beginAtZero: true,
            steps: 10,
            stepValue: 5,
            min: 0,
            max: 100,
          },
        },
      ],
    },
  };
  return (
    <div>
      <Line data={data} options={options} draggable={true} />
    </div>
  );
};

export default Linechart;
