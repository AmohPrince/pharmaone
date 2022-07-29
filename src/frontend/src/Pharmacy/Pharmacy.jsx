import React, { useEffect, useState, createContext } from "react";
import { Outlet } from "react-router-dom";
import "./Pharmacy.css";
import Assets from "../Assets/Assets";
import Date from "./Components/Date/Date";
import ProfileOn from "./Components/ProfileOn/ProfileOn";
import RightTab from "./Components/RightTab/RightTab";
import Chase from "./Components/Pill/Chase";
import { useUpdateLogger } from "./Utilities/Updatelogger";

export const dataGroupContext = createContext();
export const dataGroup2Context = createContext();
export const dataFlowContext = createContext();
export const inventoryClickContext = createContext();
export const dataGroup3Context = createContext();

const Pharmacy = () => {
  const [inventoryStatus, setInventoryStatus] = useState("Good");
  const [revenue, setRevenue] = useState(0);
  const [availableMeds, setAvailableMeds] = useState(0);
  const [medicineShortage, setMedicineShortage] = useState(-1);
  const [noOfGroups, setNoOfGroups] = useState(0);
  const [soldMedicine, setSoldMedicine] = useState(45);
  const [generatedInvoices, setGeneratedInvoices] = useState(13);
  const [noOfSuppliers, setNoOfSuppliers] = useState(0);
  const [noOfUsers, setNoOfUsers] = useState(0);
  const [noOfCustomers, setNoOfCustomers] = useState(4);
  const [frequentlyBoughtItem, setFrequentlyBoughtItem] =
    useState("Ixabepillalone");
  const [payments, setPayments] = useState(0);
  const [medicineList, setMedicineList] = useState([]);
  const [groupsList, setGroupsList] = useState([]);
  const [groupNames, setGroupNames] = useState([]);
  const [salesList, setSalesList] = useState([]);
  const [amountSold, setAmountSold] = useState(0);
  const [activeTab, setActiveTab] = useState("");
  const [activeChildTab, setActiveChildTab] = useState("");
  const [inventoryOn, setInventoryOn] = useState(false);
  const [reportsOn, setReportsOn] = useState(false);
  const [usersList, setUsersList] = useState([]);
  const [overlay, setOverlay] = useState(false);
  const [modals, setModals] = useState(false);
  const [loading, setLoading] = useState(false);
  const [suppliers, setSuppliers] = useState([]);
  const [refetchRequired, setRefetchRequired] = useState(false);

  const toggleProfile = () => {
    const profile = document.querySelector(".User__details-showprofile");
    profile.classList.toggle("active");
  };

  const fetchSuppliers = () => {
    fetch(`${process.env.REACT_APP_API_ROOT_URL}/suppliers/getAllSuppliers`)
      .then((res) => res.json())
      .then((data) => {
        setSuppliers(data);
      });
  };

  //fetch users
  const fetchUsers = () => {
    fetch(`${process.env.REACT_APP_API_ROOT_URL}/getAllUsers`)
      .then((res) => res.json())
      .then((data) => setUsersList(data))
      .catch((error) => failedFetchRetrying(error));
  };

  //fetch sales
  const fetchSales = () => {
    fetch(`${process.env.REACT_APP_API_ROOT_URL}/getListOfSales`)
      .then((res) => res.json())
      .then((data) => setSalesList(data))
      .catch((error) => failedFetchRetrying(error));
  };

  const calculateTotalRevenue = () => {
    const totalRevenue = salesList.reduce((currentTotal, sale) => {
      return sale.amount + currentTotal;
    }, 0);

    setAmountSold(totalRevenue);
  };

  useEffect(() => {
    setPayments(salesList.length);
    calculateTotalRevenue();
    setSoldMedicine(salesList.length);
  }, [salesList]);

  //Get all Medicine
  const fetchMedicine = () => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_API_ROOT_URL}/getallmedicine`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setMedicineList(data);
        setLoading(false);
      })
      .catch((error) => failedFetchRetrying(error));
  };

  //Runs only on fail
  const failedFetchRetrying = (error) => {
    console.log("Retrying fetch");
    console.log(error);
    setTimeout(() => {
      fetchMedicine();
    }, 500);
  };

  //fetch groups
  const fetchGroups = () => {
    fetch(`${process.env.REACT_APP_API_ROOT_URL}/getallgroups`)
      .then((res) => res.json())
      .then((data) => {
        return setGroupsList(data);
      })
      .catch((error) => failedFetchRetrying(error));
  };

  useEffect(() => {
    fetchMedicine();
    fetchGroups();
    fetchSales();
    fetchUsers();
    fetchSuppliers();
  }, []);

  useEffect(() => {
    if (refetchRequired) {
      fetchMedicine();
      fetchGroups();
      fetchSales();
      fetchUsers();
      fetchSuppliers();
    }
  }, [refetchRequired]);

  useEffect(() => {
    setNoOfSuppliers(suppliers.length);
  }, [suppliers]);

  useEffect(() => {
    setNoOfUsers(usersList.length);
  }, [usersList]);

  useEffect(() => {
    setAvailableMeds(medicineList.length);
  }, [medicineList]);

  useEffect(() => {
    setNoOfGroups(groupsList.length);
    getGroupOptions();
  }, [groupsList]);

  const getSpecificMedicineWithId = (number) => {
    const filteredData = medicineList.find((medicine) => {
      return medicine.medicineId === number;
    });

    return filteredData;
  };
  const getSpecificGroupWithName = (name) => {
    const filteredData = groupsList.find((group) => {
      return group.groupName === name;
    });
    return filteredData;
  };

  //Fetch group names for group options
  const getGroupOptions = () => {
    const groupNames = groupsList.map((group) => {
      return group.groupName;
    });
    setGroupNames(groupNames);
  };

  useUpdateLogger(medicineList);

  const getMedicinesWithShortage = () => {
    setMedicineShortage(
      medicineList.filter((medicine) => medicine.inStock === 0).length
    );
  };

  useEffect(() => {
    getMedicinesWithShortage();
  }, [medicineList]);

  const flowingData = {
    refetchRequired,
    setRefetchRequired,
    inventoryStatus,
    revenue,
    availableMeds,
    medicineShortage,
    noOfGroups,
    soldMedicine,
    generatedInvoices,
    noOfSuppliers,
    noOfUsers,
    noOfCustomers,
    frequentlyBoughtItem,
    setInventoryStatus,
    setRevenue,
    setAvailableMeds,
    setMedicineShortage,
    setSoldMedicine,
    setGeneratedInvoices,
    setNoOfSuppliers,
    setNoOfCustomers,
    setFrequentlyBoughtItem,
    getSpecificMedicineWithId,
    getSpecificGroupWithName,
    medicineList,
    groupNames,
    groupsList,
    salesList,
    amountSold,
    activeTab,
    activeChildTab,
    inventoryOn,
    reportsOn,
    setActiveTab,
    setInventoryOn,
    setActiveChildTab,
    setReportsOn,
    setModals,
    setOverlay,
    setLoading,
    usersList,
    modals,
    suppliers,
  };

  const dataGroup = [
    {
      icon: Assets.Healthy,
      status: inventoryStatus,
      name: "Inventory Status",
      linkTo: "reports",
      accentColor: "#01A768",
      bgColor: "#01A7684D",
      activeTab: "reports-active",
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
      activeTab: "reports-active",
    },
    {
      icon: Assets.AvailableMeds,
      status: availableMeds,
      name: "Medicines Available",
      linkTo: "inventory",
      accentColor: "#03A9F5",
      bgColor: "#03A9F54D",
      activeTab: "inventory-active",
    },
    {
      icon: Assets.Danger,
      status: -Math.abs(medicineShortage),
      name: "Medicine Shortage",
      linkTo: "listofmeds",
      accentColor: "#F0483E",
      bgColor: "#F0483E4D",
      activeTab: "medslist",
    },
    {
      icon: Assets.MedicalGreen,
      status: noOfGroups,
      name: "Medicine Groups",
      linkTo: "inventory/groups",
      accentColor: "#01A768",
      bgColor: "#01A7684D",
      activeTab: "groups",
    },
    {
      icon: Assets.AvailableMeds,
      status: availableMeds,
      name: "Medicines Available",
      linkTo: "inventory/listofmedicines",
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
      linkTo: "reports/salesreport",
      accentColor: "#FED600",
      bgColor: "#FED6004D",
      rs: true,
      activeTab: "sales-report",
    },
    {
      icon: Assets.Healthy,
      status: payments,
      name: "Payments Report",
      linkTo: "reports/paymentreport",
      accentColor: "#01A768",
      bgColor: "#01A7684D",
      activeTab: "payment-report",
    },
  ];

  /** This is the dashboard data on the bottom the one with four groups .*/
  const dataGroup2 = [
    {
      groupTitle: "Inventory",
      linkTo: "Configuration",
      value1: availableMeds,
      value2: noOfGroups,
      text1: "Total no of Medicines",
      text2: "Medicine Groups",
      activeTab: "configuration-active",
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
    <>
      {overlay === true ? (
        <div
          className="overlay"
          onClick={() => {
            setOverlay(false);
            setModals(false);
          }}
        />
      ) : null}
      {loading && (
        <div className="overlay loading">
          <Chase />
        </div>
      )}

      <div className="Pharmacy ">
        <aside className="Pharmacy__sidebar">
          <div className="Logo__container flex">
            <img src={Assets.Logo} alt="Logo" />
            <p className="logo__name">Pharma One</p>
          </div>

          <div className="Pharmacy__sidebar-body">
            <dataFlowContext.Provider value={flowingData}>
              <div className="User__details flex">
                <div className="User__details-right flex">
                  <div className="User__details-img">
                    <img src={Assets.Photo} alt="Profile Pic" />
                    <img src={Assets.OnlineIcon} alt="Online /Offline" />
                  </div>
                  <div className="User__details-names">
                    <p>Subash</p>
                    <p>Super Admin</p>
                  </div>
                </div>
                <div
                  className="User__details-icons flex"
                  onClick={toggleProfile}
                >
                  <img src={Assets.ThreeDots} alt="Dots Icon" />
                  <div className="User__details-showprofile ">
                    <ProfileOn />
                  </div>
                </div>
              </div>
              <RightTab />
              <div className="Pharmacy__powered flex space-between">
                <p>Powered by Saludos © 2022 </p>
                <p>v1.12</p>
              </div>
              <img
                src={Assets.ToggleMenu}
                alt="Toggle Menu"
                className="toggle-button cursor"
              />
            </dataFlowContext.Provider>
          </div>
        </aside>
        <div className="Pharmacy__right">
          <div className="Pharmacy__topbar flex">
            <div className="Topbar__input flex">
              <input
                type="search"
                name="Search"
                id="Search"
                placeholder="Search for anything here..."
              />
              <img src={Assets.Search} alt="Search Icon" />
            </div>

            <div className="Topbar__change-lang flex ">
              <img src={Assets.Lang} alt="Language Translate Icon" />
              <select name="ChangeLang" className="ChangeLang">
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
    </>
  );
};

export default Pharmacy;
