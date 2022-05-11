import React from "react";
import "./SectionName.css";
import Assets from "../../../Assets/Assets";
import { Link } from "react-router-dom";

/* This component takes in an object as a prop that contains the name and subtitle and any other relevant data*/

const SectionName = ({ title }) => {
  if (title.complex === "level1") {
    return (
      <div className="SectionName__level1">
        <div className="level1__top flex__container">
          <Link
            to={`/${title.source.toLowerCase()}`}
            style={{ textDecoration: "none" }}
          >
            <p className="p__poppins">{title.source}</p>
          </Link>
          <img
            className="sectionname__leftarrow"
            src={Assets.LeftDirectionArrow}
            alt="Points to the left"
          />
          {title.main === "Sales Report" ? (
            <p className="p__poppins">{title.main}</p>
          ) : (
            <p className="p__poppins">
              {title.main} ({title.meds})
            </p>
          )}
        </div>
        <p className="p__poppins">{title.sub}</p>
      </div>
    );
  } else if (title.complex === "level2") {
    return (
      <div className="SectionName__level2">
        <div className="level2__top flex__container">
          <Link to="/inventory" style={{ textDecoration: "none" }}>
            <p className="p__poppins">{title.source1}</p>
          </Link>
          <img
            className="sectionname__leftarrow"
            src={Assets.LeftDirectionArrow}
            alt="Points to the left"
          />
          <Link
            to={`/inventory/${title.source2.toLowerCase().split(" ").join("")}`}
            style={{ textDecoration: "none" }}
          >
            <p className="p__poppins">{title.source2}</p>
          </Link>
          <img
            className="sectionname__leftarrow"
            src={Assets.LeftDirectionArrow}
            alt="Points to the left"
          />
          <p className="p__poppins">{title.main}</p>
        </div>
        <p className="p__poppins">{title.sub}</p>
      </div>
    );
  } else {
    return (
      <div className="SectionName__container">
        <p className="p__poppins">{title.main}</p>
        <p className="p__poppins">{title.sub}</p>
      </div>
    );
  }
};

export default SectionName;
