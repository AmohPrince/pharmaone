import React, { useContext } from "react";
import "./Dashboard.css";
import {
  SectionName,
  Dashboardgrp,
  DashBoardLinks,
} from "../../Components/Components";

import { dataGroupContext, dataGroup2Context } from "../../Pharmacy";

const Dashboard = () => {
  const title = {
    main: "Dashboard",
    sub: "A quick data overview of the inventory",
  };

  const dataGroup = useContext(dataGroupContext);
  const dataGroup2 = useContext(dataGroup2Context);

  return (
    <div className="Dashboard__container">
      <div className="Dashboard__top ">
        <div className="Dashboard__top-name flex">
          <SectionName title={title} />
          <select name="downloadreport" className="dreport">
            <option value="" defaultValue hidden>
              Download Report
            </option>
            <option value="excel">Excel</option>
            <option value="Pdf">PDF</option>
          </select>
        </div>
        <div className="Dashboard__top-boxes flex">
          {dataGroup.slice(0, 4).map((data) => (
            <Dashboardgrp data={data} key={data.name} />
          ))}
        </div>
      </div>
      <div className="Dashboard__bottom flex">
        {dataGroup2.map((data) => {
          return <DashBoardLinks data={data} key={data.groupTitle} />;
        })}
      </div>
    </div>
  );
};

export default Dashboard;
