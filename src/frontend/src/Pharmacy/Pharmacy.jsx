import React, { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import "./Pharmacy.css";
import Assets from "../Assets/Assets";
import Date from "./Components/Date/Date";
import ProfileOn from "./Components/ProfileOn/ProfileOn";
import RightTab from "./Components/RightTab/RightTab";
/*The logo may be dynamic . Like on user upload it should change necessarilly
same as the name*/
/* This user details are going to be dynamic. Find a way for the user to upload
their photo and name. The status will be computed */
/*
  This state values will be calculated and updated as required. The value will
  then be read from the section icon which in turn updates the boxes
*/
export const dataGroupContext = React.createContext();
export const dataGroup2Context = React.createContext();
export const dataFlowContext = React.createContext();
export const inventoryClickContext = React.createContext();
export const dataGroup3Context = React.createContext();

const Pharmacy = () => {
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
  const [onTab, setOnTab] = useState("");
  const [arrowState, setArrowState] = useState(false);
  const [inventoryOn, setInventoryOn] = useState(false);
  const [reportsOn, setReportsOn] = useState(false);
  const [payments, setPayments] = useState(70);

  const toggleProfile = () => {
    const profile = document.querySelector(".User__details-showprofile");
    profile.classList.toggle("active");
  };

  const mockListOfMedicines = [
    {
      medicineName: "Augmentin 625 Duo Tablet",
      medicineId: "D06ID232435454",
      groupName: "Generic Medicine",
      stock: 350,
    },
    {
      medicineName: "Azithral 500 Tablet",
      medicineId: "D06ID232435451",
      groupName: "Generic Medicine",
      stock: 20,
    },
  ];
  const mockListOfGroups = [
    {
      groupName: "Generic Medicine",
      noOfMedicine: 2,
    },
    {
      groupName: "Diabetes",
      noOfMedicine: 32,
    },
  ];

  const getSpecificMedicineWithId = (number) => {
    const filteredData = mockListOfMedicines.find((medicine) => {
      return medicine.medicineId === number;
    });

    return filteredData;
  };
  const getSpecificGroupWithName = (name) => {
    const filteredData = mockListOfGroups.find((group) => {
      return group.groupName === name;
    });
    return filteredData;
  };

  const flowingData = {
    currentInventoryStatus: inventoryStatus,
    currentRevenue: revenue,
    currentAvailableMeds: availableMeds,
    currentMedicineShortage: medicineShortage,
    currentMedicineGroups: medicineGroups,
    currentSoldMedicine: soldMedicine,
    currentGeneratedInvoices: generatedInvoices,
    currentNoOfSuppliers: noOfSuppliers,
    currentNoOfUsers: noOfUsers,
    currentNoOfCustomers: noOfCustomers,
    currentFrequentlyBoughtItem: frequentlyBoughtItem,
    currrentOnTab: onTab,
    setInventoryStatus,
    setRevenue,
    setAvailableMeds,
    setMedicineShortage,
    setMedicineGroups,
    setSoldMedicine,
    setGeneratedInvoices,
    setNoOfSuppliers,
    setNoOfUsers,
    setNoOfCustomers,
    setFrequentlyBoughtItem,
    setOnTab,
    getSpecificMedicineWithId,
    getSpecificGroupWithName,
    mockListOfMedicines,
    mockListOfGroups,
  };

  const handleDashBoardClick = () => {
    setOnTab("dash");
  };

  const handleInventoryClick = () => {
    setOnTab("invent");
    setInventoryOn((prevState) => {
      return !prevState;
    });
    setArrowState((prevState) => {
      return !prevState;
    });
  };

  const handleReportsClick = () => {
    setOnTab("repo");
    setInventoryOn(false);
    setReportsOn((prevState) => !prevState);
  };

  const handleConfigurationClick = () => {
    setOnTab("conf");
  };

  const handleContactManagementClick = () => {
    setOnTab("cont");
  };
  const handleNotificationsClick = () => {
    setOnTab("not");
  };
  const handleChatClick = () => {
    setOnTab("chat");
  };
  const handleSettingsClick = () => {
    setOnTab("set");
  };
  const handleCovidClick = () => {
    setOnTab("cov");
  };
  const handleTechnicalClick = () => {
    setOnTab("tech");
  };

  /** This is the data that i map over to produce the right tab
   * like the inventory dashboard bla bla bla
   */
  const dataArray = [
    {
      name: "Dashboard",
      icon: Assets.Dashboard,
      dropDown: false,
      onClick: handleDashBoardClick,
    },
    {
      name: "Inventory",
      icon: Assets.Inventory,
      dropDown: true,
      inventoryOn: inventoryOn,
      onClick: handleInventoryClick,
    },
    {
      name: "Reports",
      icon: Assets.Reports,
      reportsOn: reportsOn,
      dropDown: true,
      onClick: handleReportsClick,
    },
    {
      name: "Configuration",
      icon: Assets.Configuration,
      dropDown: false,
      onClick: handleConfigurationClick,
    },
    {
      name: "Contact Management",
      icon: Assets.ContactIco,
      dropDown: true,
      onClick: handleContactManagementClick,
      topLine: true,
    },
    {
      name: "Notifications",
      icon: Assets.Bell,
      dropDown: false,
      onClick: handleNotificationsClick,
    },
    {
      name: "Chat With Others",
      icon: Assets.ChatIco,
      dropDown: false,
      onClick: handleChatClick,
    },
    {
      name: "Application Settings",
      icon: Assets.SettingsIco,
      dropDown: false,
      onClick: handleSettingsClick,
      spaceBelow: true,
    },
    {
      name: "Covid-19",
      icon: Assets.CovidIco,
      dropDown: false,
      onClick: handleCovidClick,
    },
    {
      name: "Get Technical Help",
      icon: Assets.QuestionIco,
      dropDown: false,
      onClick: handleTechnicalClick,
    },
  ];

  /**This is the data that i map over to produce the coloured
   * boxes on the dashboard and the inventory
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
      activeTab: "medslist",
    },
    {
      icon: Assets.MedicalGreen,
      status: medicineGroups,
      name: "Medicine Groups",
      linkTo: "groups",
      accentColor: "#01A768",
      bgColor: "#01A7684D",
      activeTab: "groups",
    },
    {
      icon: Assets.AvailableMeds,
      status: availableMeds,
      name: "Medicines Available",
      linkTo: "listofmeds2",
      accentColor: "#03A9F5",
      bgColor: "#03A9F54D",
      activeTab: "medslist",
    },
  ];

  const dataGroup3 = [
    {
      icon: Assets.Revenue,
      status: revenue,
      name: "Total Sales Report",
      linkTo: "salesreport",
      accentColor: "#FED600",
      bgColor: "#FED6004D",
      rs: true,
      activeTab: "repo",
    },
    {
      icon: Assets.Healthy,
      status: payments,
      name: "Payments Report",
      linkTo: "paymentreport",
      accentColor: "#01A768",
      bgColor: "#01A7684D",
      activeTab: "repo",
    },
  ];

  /** This is the dashboard data on the bottom the one with four groups .*/
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
    <div className="Pharmacy ">
      {/* Aside Section Begins Here */}
      <aside className="Pharmacy__sidebar">
        <div className="Logo__container flex__container">
          <img src={Assets.Logo} alt="Logo" />
          <div className="logo__name">
            <p className="p__poppins">Pharma One</p>
          </div>
        </div>

        <div className="Pharmacy__sidebar-body">
          {/* User Details */}
          <div className="User__details flex__container">
            <div className="User__details-right flex__container">
              <div className="User__details-img">
                <img src={Assets.Photo} alt="Profile Pic" />
                <img src={Assets.OnlineIcon} alt="Online /Offline" />
              </div>
              <div className="User__details-names">
                <p className="p__poppins">Subash</p>
                <p className="p__poppins">Super Admin</p>
              </div>
            </div>
            <div
              className="User__details-icons flex__container"
              onClick={toggleProfile}
            >
              <img src={Assets.ThreeDots} alt="Dots Icon" />
              <div className="User__details-showprofile ">
                <ProfileOn />
              </div>
            </div>
          </div>
          <dataFlowContext.Provider value={flowingData}>
            {dataArray.map((data) => (
              <RightTab
                data={data}
                key={data.name}
                onTab={onTab}
                arrowState={arrowState}
              />
            ))}
          </dataFlowContext.Provider>
          <div className="Pharmacy__powered">
            <p className="p__poppins">Powered by Cash © 2022 </p>
          </div>
        </div>
      </aside>
      {/* Right section begins here */}
      <div className="Pharmacy__right">
        <div className="Pharmacy__topbar flex__container">
          <div className="Topbar__input flex__container">
            <input
              type="search"
              name="Search"
              id="Search"
              placeholder="Search for anything here."
              className="p__poppins"
            />
            <img src={Assets.Search} alt="Search Icon" />
          </div>

          <div className="Topbar__changelang flex__container ">
            <img src={Assets.Lang} alt="Language Translate Icon" />
            <select name="ChangeLang" id="ChangeLang" className="p__poppins">
              <optgroup className="optgroup ">
                <option value="English" className="Option">
                  English (US)
                </option>
                <option value="French" className="Option">
                  French
                </option>
              </optgroup>
            </select>
          </div>
          <div className="Topbar__date">
            <Date />
          </div>
        </div>
        <dataGroup3Context.Provider value={dataGroup3}>
          <dataFlowContext.Provider value={flowingData}>
            <dataGroupContext.Provider value={dataGroup}>
              <dataGroup2Context.Provider value={dataGroup2}>
                <div className="Pharmacy__body">
                  <Outlet />
                </div>
              </dataGroup2Context.Provider>
            </dataGroupContext.Provider>
          </dataFlowContext.Provider>
        </dataGroup3Context.Provider>
      </div>
    </div>
  );
};

export default Pharmacy;
