import React, { useContext, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { useUpdateLogger } from "../../../Utilities/Updatelogger";
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

const Linechart = ({ selectedUserName, selectedGroup }) => {
  const { salesList } = useContext(dataFlowContext);
  const [labels, setLabels] = useState([]);
  const [amountValues, setAmountValues] = useState([]);

  const amountValuesForChart = () =>
    setAmountValues(salesList.map((sale) => sale.amount));

  const saleDatesForChart = () =>
    setLabels(salesList.map((sale) => sale.saleDate));

  const filterByGroups = () => {
    if (selectedGroup === "All Groups") {
      return;
    } else {
      const filteredSalesList = salesList.filter(
        (sale) => sale.medicine.medicineGroup.groupName === selectedGroup
      );
      setLabels(filteredSalesList.map((sale) => sale.saleDate));
      setAmountValues(filteredSalesList.map((sale) => sale.amount));
    }
  };

  useUpdateLogger(salesList);

  useEffect(() => {
    if (selectedUserName === "All Users") {
      amountValuesForChart();
      saleDatesForChart();
    } else {
      const filteredSalesList = salesList.filter(
        (sale) => sale.user.userName === selectedUserName
      );
      setLabels(filteredSalesList.map((sale) => sale.saleDate));
      setAmountValues(filteredSalesList.map((sale) => sale.amount));
    }
  }, [selectedUserName]);

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
    labels: labels,
    datasets: [
      {
        label: "Sales",
        data: amountValues,
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
