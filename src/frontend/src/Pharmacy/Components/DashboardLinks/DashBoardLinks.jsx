import React from "react";
import { Link } from "react-router-dom";
import Assets from "../../../Assets/Assets";
import Select from "../Select/Select";
import "./DashBoardLinks.css";

const DashBoardLinks = ({ data }) => {
  return (
    <div className="DashBoardLinks__container">
      <div className="Dashboard__links-top flex__container">
        <p className="p__poppins">{data.groupTitle}</p>

        {data.select === true ? (
          <Select />
        ) : (
          <Link to={`${data.linkTo}`} style={{ textDecoration: "none" }}>
            <div className="Dashboard__links-link flex__container">
              <p className="p__poppins">Go to {data.linkTo}</p>
              <img src={Assets.DirectionArrows} alt="Direction Arrows" />
            </div>
          </Link>
        )}
      </div>
      <div className="splitterlinks" />
      <div className="Dashboard__links-bottom flex__container">
        <div className="links-bottomleft">
          <p className="p__poppins">{data.value1}</p>
          <p className="p__poppins">{data.text1}</p>
        </div>
        <div className="links-bottomright">
          <p className="p__poppins">{data.value2}</p>
          <p className="p__poppins">{data.text2}</p>
        </div>
      </div>
    </div>
  );
};

export default DashBoardLinks;
