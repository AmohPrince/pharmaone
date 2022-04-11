import React, { useState } from "react";
import "./Dashboard.css";
import SectionName from "../../Components/SectionName/SectionName";
import Assets from "../../../Assets/Assets";
import Dashboardgrp from "../../Components/DashboardGroups/Dashboardgrp";
import DashBoardLinks from "../../Components/DashboardLinks/DashBoardLinks";

const Dashboard = () => {
  const [inventoryStatus, setInventoryStatus] = useState("Good");
  const [revenue, setRevenue] = useState(135540);
  const [availableMeds, setAvailableMeds] = useState(50);
  const [medicineShortage, setMedicineShortage] = useState(-1);

  const [medicineGroups, setMedicineGroups] = useState(70);
  const [soldMedicine, setSoldMedicine] = useState(45);
  const [generatedInvoices, setGeneratedInvoices] = useState(13);
  const [noOfSuppliers, setNoOfSuppliers] = useState(22);
  const [noOfUsers, setNoOfUsers] = useState(44);
  const [noOfCustomers, setNoOfCustomers] = useState(4);
  const [frequentlyBoughtItem, setFrequentlyBoughtItem] = useState("Weed");
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

  const dataGroup2 = [
    {
      groupTitle: "Inventory",
      linkTo: "Configuration",
      value1: availableMeds,
      value2: medicineGroups,
      text1: "Total no of Medicines",
      text2: "Medicine Groups",
    },
    {
      groupTitle: "Quick Report",
      select: true,
      value1: soldMedicine,
      value2: generatedInvoices,
      text1: "Qty of Medicines Sold",
      text2: "Invoices Generated",
    },
    {
      groupTitle: "My Pharmacy",
      linkTo: "user management",
      value1: noOfSuppliers,
      value2: noOfUsers,
      text1: "Total no of Suppliers",
      text2: "Total no of Users",
    },
    {
      groupTitle: "Customers",
      linkTo: "Customers",
      value1: noOfCustomers,
      value2: frequentlyBoughtItem,
      text1: "Total no of Customers",
      text2: "Frequently bought item",
    },
  ];

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
      <div className="Dashboard__bottom flex__container">
        {dataGroup2.map((data) => {
          return <DashBoardLinks data={data} />;
        })}
      </div>
    </div>
  );
};

export default Dashboard;
