import React from "react";
import { Link } from "react-router-dom";
import Assets from "../../../../../Assets/Assets";
import "./SingleGroup.css";

const SingleGroup = ({ data }) => {
  return (
    <>
      <div className="Singlegroup__container flex__container">
        <p className="p__poppins">{data.groupName}</p>
        <p className="p__poppins">{data.noOfMedicine}</p>
        <Link
          to={data.groupName}
          className="flex__container"
          style={{ textDecoration: "none" }}
        >
          <p className="p__poppins">View Full Details</p>
          <img src={Assets.DirectionArrows} alt="Left Directions" />
        </Link>
      </div>
      <div className="medicinesplitter" />
    </>
  );
};

export default SingleGroup;
