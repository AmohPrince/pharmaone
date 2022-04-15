import React from "react";
import "./SectionName.css";
import Assets from "../../../Assets/Assets";

/* This component takes in an object as a prop that contains the name and subtitle and any other relevant data*/

const SectionName = ({ title }) => {
  if (title.complex === "level1") {
    return (
      <div className="SectionName__level1">
        <div className="level1__top flex__container">
          <p className="p__poppins">{title.source}</p>
          <img
            className="sectionname__leftarrow"
            src={Assets.LeftDirectionArrow}
            alt="Points to the left"
          />
          <p className="p__poppins">
            {title.main} ({title.meds})
          </p>
        </div>
        <p className="p__poppins">{title.sub}</p>
      </div>
    );
  } else if (title.complex === "level2") {
    return (
      <div className="SectionName__level2">
        <div className="level2__top flex__container">
          <p className="p__poppins">{title.source1}</p>
          <img
            className="sectionname__leftarrow"
            src={Assets.LeftDirectionArrow}
            alt="Points to the left"
          />
          <p className="p__poppins">{title.source2}</p>
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
