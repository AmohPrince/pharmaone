import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Dashboardgrp.css";
import Assets from "../../../Assets/Assets";
import { tabContext } from "../../Pharmacy";

const Dashboardgrp = ({ data }) => {
  const setOnTab = useContext(tabContext);
  return (
    <div
      className="Dashboardgrp__container flex__container-v"
      style={{ border: `1px solid ${data.accentColor}` }}
    >
      <img src={data.icon} alt="Icon" />
      <p className="p__poppins">
        {data.rs === true ? (
          <p className="p__poppins">Ksh. {data.status}</p>
        ) : (
          data.status
        )}
      </p>
      <p className="p__poppins">
        {data.select === true ? (
          <div className="flex__container">
            <p className="p__poppins">{data.name}</p>
            <select name="Revenue" id="Revenue" className="p__poppins">
              <option value="Jan2022">Jan 2022</option>
              <option value="Feb2022">Feb 2022</option>
              <option value="Mar2022">Mar 2022</option>
              <option value="Apr2022">Apr 2022</option>
              <option value="May2022">May 2022</option>
              <option value="June2022">June 2022</option>
              <option value="July2022">July 2022</option>
              <option value="Aug2022">Aug 2022</option>
              <option value="Sept2022">Sept 2022</option>
              <option value="Oct2022">Oct 2022</option>
              <option value="Nov2022">Nov 2022</option>
              <option value="Dec2022">Dec 2022</option>
            </select>
          </div>
        ) : (
          data.name
        )}
      </p>

      <Link to={data.linkTo}>
        <div
          className="Dashboardgrp__btm flex__container"
          style={{
            backgroundColor: data.bgColor,
            borderTop: `1px solid ${data.accentColor}`,
          }}
          onClick={() => {
            setOnTab(data.activeTab);
            console.log(data.activeTab);
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
          <img src={Assets.DirectionArrows} alt="Direction Arrows" />
        </div>
      </Link>
    </div>
  );
};

export default Dashboardgrp;
