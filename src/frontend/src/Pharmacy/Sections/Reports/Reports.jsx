import React, { useContext } from "react";
import "./Reports.css";
import { SectionName } from "../../Components/Components";
import { dataGroup3Context } from "../../Pharmacy";
import { Dashboardgrp } from "../../Components/Components";

const Reports = () => {
  const data = useContext(dataGroup3Context);
  const title = {
    main: "Reports",
    sub: "Overall reports related to the pharmacy",
  };

  return (
    <div className="Inventory__container Salesreport__container">
      <SectionName title={title} />
      <div className="flex__container">
        {data.map((data) => (
          <Dashboardgrp data={data} />
        ))}
      </div>
    </div>
  );
};

export default Reports;
