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
    Legend
  );
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Sales for 2020 (M)",
        data: [3, 2, 2, 1, 5],
        borderColor: ["#03A9F5"],
        fill: {
          target: "origin",
          above: "rgb(255, 0, 0)", // Area will be red above the origin
          below: "rgb(0, 0, 255)", // And blue below the origin
        },
        // backgroundColor: ["yellow"],
        // pointBackgroundColor: ["red"],
      },
      {
        label: "Sales for 2021 (M)",
        data: [4, 7, 7, 0, 8],
        backgroundColor: ["#03A9F5"],
        fill: {
          target: "origin",
          above: "rgb(255, 0, 0)", // Area will be red above the origin
          below: "rgb(0, 0, 255)", // And blue below the origin
        },
        // backgroundColor: ["yellow"],
        // pointBackgroundColor: ["red"],
      },
    ],
  };
  const options = {
    tension: 0.4,
    title: {
      display: true,
      text: "linechrt",
    },
    scales: [
      {
        ticks: {
          min: 0,
          max: 6,
          stepSize: 1,
        },
      },
    ],
  };
  return (
    <div>
      <Line data={data} options={options} />
    </div>
  );
};

export default Linechart;
