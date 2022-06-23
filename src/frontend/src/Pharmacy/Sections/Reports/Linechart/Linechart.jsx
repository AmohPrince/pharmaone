import React, { useContext } from "react";
import { Line } from "react-chartjs-2";
import "./LineChart.css";
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
import { dataFlowContext } from "../../../Pharmacy";
import { useUpdateLogger } from "../../../Utilities/Updatelogger";

const Linechart = () => {
  const { salesList } = useContext(dataFlowContext);

  const amountValuesForChart = () =>
    salesList.map((sale) => {
      return sale.amount;
    });

  const saleDatesForChart = () => {
    return salesList.map((sale) => sale.saleDate);
  };

  useUpdateLogger(saleDatesForChart());

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
    labels: saleDatesForChart(),
    datasets: [
      {
        label: "Sales",
        data: amountValuesForChart(),
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
      text: "linechart",
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
    <div className="linechart__container">
      <Line data={data} options={options} draggable={true} />
    </div>
  );
};

export default Linechart;
