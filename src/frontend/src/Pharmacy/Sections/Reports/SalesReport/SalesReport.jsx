import React, { useContext, useEffect } from "react";
import "./SalesReport.css";
import { SectionName } from "../../../Components/Components";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Linechart from "../Linechart/Linechart";
import { dataFlowContext } from "../../../Pharmacy";

const SalesReport = () => {
  const title = {
    main: "Sales Report",
    sub: "Sales related report of the pharmacy.",
    complex: "level1",
    source: "Reports",
  };

  const { usersList, salesList, groupsList } = useContext(dataFlowContext);
  const [value, setValue] = React.useState([null, null]);

  return (
    <div className="Inventory__container">
      <div className="Salesreport__top flex__container">
        <SectionName title={title} />
        <select name="downloadreport" id="dreport" className="p__poppins">
          <option value="" defaultValue hidden>
            Download Report
          </option>
          <option value="excel">Excel</option>
          <option value="Pdf">PDF</option>
        </select>
      </div>
      <div className="Salesreport__mid flex__container">
        <div className="Salesreport__mid-date">
          <p className="p__poppins">Date Range</p>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateRangePicker
              startText="Start Date"
              endText="End Date"
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
              }}
              renderInput={(startProps, endProps) => (
                <React.Fragment>
                  <TextField {...startProps} />
                  <Box sx={{ mx: 2 }}> to </Box>
                  <TextField {...endProps} />
                </React.Fragment>
              )}
            />
          </LocalizationProvider>
        </div>
        <div className="Salesreport__mid-medicinegroup">
          <p className="p__poppins">Medicine Group</p>
          <select
            name="selectsalesmedgroup"
            id="selectsalesmedgroup"
            className="p__poppins"
          >
            <option value="" defaultValue hidden>
              -Select Group-
            </option>
            {groupsList.map((group) => (
              <option value={group.groupName}>{group.groupName}</option>
            ))}
          </select>
        </div>
        <div className="Salesreport__mid-username">
          <p className="p__poppins">User Name</p>
          <select
            name="selectsalesusername"
            id="selectsalesusername"
            className="p__poppins"
          >
            <option value="" defaultValue hidden>
              -Select User Name-
            </option>
            {usersList.map((user) => (
              <option value={user.userName}>{user.userName}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="Salesreport__bottom flex__container">
        <div className="Salesreport__bottom-chart">
          <p className="p__poppins">Sales Made</p>
          <div className="Configuration__container-splitter" />
          <Linechart />
        </div>
        <div className="Salesreport__bottom-orders">
          <div className="Orders__title flex__container">
            <p>Order Id</p>
            <p>Date & Time</p>
          </div>
          <div className="Configuration__container-splitter" />
          <div className="Orders__body">
            {salesList.map((sale) => (
              <div className="flex">
                <p>{sale.salesId}</p>
                <div className="flex">
                  <p>{sale.saleDate}</p>
                  <p>{sale.saleTime}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesReport;
