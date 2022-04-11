import React from "react";
import { Link } from "react-router-dom";
import "./Dashboardgrp.css";
import Assets from "../../../Assets/Assets";

const Dashboardgrp = ({ data }) => {
  return (
    <div
      className="Dashboardgrp__container flex__container-v"
      style={{ border: `1px solid ${data.accentColor}` }}
    >
      <img src={data.icon} alt="Icon" />
      <p className="p__poppins">{data.status}</p>
      <p className="p__poppins">{data.name}</p>

      <Link to={`/pharmacy/${data.linkTo}`}>
        <div
          className="Dashboardgrp__btm flex__container"
          style={{ backgroundColor: data.bgColor }}
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
          <img src={Assets.DirectionArrows} alt="Direction Arrows" />
        </div>
      </Link>
    </div>
  );
};

export default Dashboardgrp;
