import React from "react";
import "./SalesReport.css";
import { SectionName } from "../../../Components/Components";
import { useForm } from "react-hook-form";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Linechart from "../Linechart/Linechart";

const SalesReport = () => {
  const title = {
    main: "Sales Report",
    sub: "Sales related report of the pharmacy.",
    complex: "level1",
    source: "Reports",
  };
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };
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
            <option value="Group1">Group1</option>
            <option value="Group2">Group2</option>
            <option value="Group3">Group3</option>
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
            <option value="Group1">User Name 1</option>
            <option value="Group2">User Name 2</option>
          </select>
        </div>
      </div>
      <div className="Salesreport__bottom flex__container">
        <div className="Salesreport__bottom-chart">
          <p className="p__poppins">Sales Made</p>
          <div className="splitter" />
          <Linechart />
        </div>
        <div className="Salesreport__bottom-orders">
          <div className="Orders__title flex__container">
            <p className="p__poppins">Order Id</p>
            <p className="p__poppins">Date & Time</p>
          </div>
          <div className="splitter" />
          <div className="Orders__body flex__container">
            <div className="Orders__body-ids">
              <p className="p__poppins">2485855848598</p>
              <p className="p__poppins">2485855848577</p>
              <p className="p__poppins">2485855848563</p>
              <p className="p__poppins">2485855848563</p>
              <p className="p__poppins">2485855848568</p>
              <p className="p__poppins">2485855848567</p>
              <p className="p__poppins">2485855848564</p>
              <p className="p__poppins">2485855848544</p>
            </div>
            <div className="Orders__body-dates">
              <p className="p__poppins">01 Dec 2021 10:25</p>
              <p className="p__poppins">02 Dec 2021 18:25</p>
              <p className="p__poppins">02 Dec 2021 18:25</p>
              <p className="p__poppins">02 Dec 2021 18:25</p>
              <p className="p__poppins">02 Dec 2021 18:25</p>
              <p className="p__poppins">02 Dec 2021 18:25</p>
              <p className="p__poppins">02 Dec 2021 18:25</p>
              <p className="p__poppins">02 Dec 2021 18:25</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesReport;
