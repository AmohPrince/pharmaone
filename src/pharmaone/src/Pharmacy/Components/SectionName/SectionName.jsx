import React from "react";
import "./SectionName.css";

/* This component takes in an object as a prop that contains the name and subtitle*/

const SectionName = ({ title }) => {
  return (
    <div className="SectionName__container">
      <p className="p__poppins">{title.main}</p>
      <p className="p__poppins">{title.sub}</p>
    </div>
  );
};

export default SectionName;
