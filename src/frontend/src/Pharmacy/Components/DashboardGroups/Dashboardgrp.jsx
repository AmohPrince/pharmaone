import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Dashboardgrp.css";
import Assets from "../../../Assets/Assets";
import { dataFlowContext } from "../../Pharmacy";
import Select from "../Select/Select";

const Dashboardgrp = ({ data }) => {
  const incomingData = useContext(dataFlowContext);
  return (
    <div
      className="Dashboardgrp__container flex__container-v"
      style={{ border: `1px solid ${data.accentColor}` }}
    >
      <img src={data.icon} alt="Icon" />
      {data.rs === true ? (
        <p className="p__poppins">Ksh. {data.status}</p>
      ) : (
        <p className="p__poppins">{data.status}</p>
      )}
      {data.select === true ? (
        <div className="flex__container">
          <p className="p__poppins">{data.name}</p>
          <Select />
        </div>
      ) : (
        <p className="p__poppins">{data.name}</p>
      )}

      <Link to={data.linkTo}>
        <div
          className="Dashboardgrp__btm flex__container"
          style={{
            backgroundColor: data.bgColor,
            borderTop: `1px solid ${data.accentColor}`,
          }}
          onClick={() => {
            incomingData.setOnTab(data.activeTab);
          }}
        >
          {data.linkTo === "reports" ? (
            <p className="p__poppins">View Detailed Report</p>
          ) : null}
          {data.linkTo === "inventory" ? (
            <p className="p__poppins">Visit Inventory</p>
          ) : null}
          {data.linkTo === "listofmeds" ? (
            <p className="p__poppins">Resolve Now</p>
          ) : null}
          {data.linkTo === "groups" ? (
            <p className="p__poppins">View Groups</p>
          ) : null}
          {data.linkTo === "listofmeds2" ? (
            <p className="p__poppins">View Full List</p>
          ) : null}

          <img src={Assets.DirectionArrows} alt="Direction Arrows" />
        </div>
      </Link>
    </div>
  );
};

export default Dashboardgrp;
