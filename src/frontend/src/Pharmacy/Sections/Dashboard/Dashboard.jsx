import React, { useState } from "react";
import "./Dashboard.css";
import SectionName from "../../Components/SectionName/SectionName";
import Assets from "../../../Assets/Assets";
import Dashboardgrp from "../../Components/DashboardGroups/Dashboardgrp";

const Dashboard = () => {
  const [inventoryStatus, setInventoryStatus] = useState("Good");
  const [revenue, setRevenue] = useState(0);
  const [availableMeds, setAvailableMeds] = useState(50);
  const [medicineShortage, setMedicineShortage] = useState(0);

  /*
  This state values will be calculated and updated as required. The value will
  then be read from the section icon which in turn updates the boxes
  */

  const dataGroup = [
    {
      icon: Assets.Healthy,
      status: inventoryStatus,
      name: "Inventory Status",
      linkTo: "reports",
      accentColor: "#01A768",
      bgColor: "#01A7684D",
      activeTab: "repo",
    },
    {
      icon: Assets.Revenue,
      status: revenue,
      name: "Revenue :",
      select: true,
      linkTo: "reports",
      accentColor: "#FED600",
      bgColor: "#FED6004D",
      rs: true,
      activeTab: "repo",
    },
    {
      icon: Assets.AvailableMeds,
      status: availableMeds,
      name: "Medicines Available",
      linkTo: "inventory",
      accentColor: "#03A9F5",
      bgColor: "#03A9F54D",
      activeTab: "invent",
    },
    {
      icon: Assets.Danger,
      status: medicineShortage,
      name: "Medicine Shortage",
      linkTo: "listofmeds",
      accentColor: "#F0483E",
      bgColor: "#F0483E4D",
      activeTab: "meds",
    },
  ];

  const title = {
    main: "Dashboard",
    sub: "A quick data overview of the inventory",
  };

  return (
    <div className="Dashboard__container">
      <div className="Dashboard__top ">
        <div className="Dashboard__top-name flex__container">
          <SectionName title={title} />
          <select name="downloadreport" id="dreport" className="p__poppins">
            <option value="" defaultValue disabled hidden>
              Download Report
            </option>
            <option value="excel">Excel</option>
            <option value="Pdf">PDF</option>
          </select>
        </div>
        <div className="Dashboard__top-boxes flex__container">
          {dataGroup.map((data) => (
            <Dashboardgrp data={data} key={data.name} />
          ))}
        </div>
      </div>
      <div className="Dashboard__bottom"></div>
    </div>
  );
};

export default Dashboard;
