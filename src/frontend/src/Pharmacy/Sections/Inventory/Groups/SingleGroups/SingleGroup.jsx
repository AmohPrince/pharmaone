import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Assets from "../../../../../Assets/Assets";
import "./SingleGroup.css";

const SingleGroup = ({ data }) => {
  const [noOfMedicine, setNoOfMedicine] = useState(0);
  useEffect(() => {
    fetchNoOfMedicinesInGroup();
  }, []);
  const fetchNoOfMedicinesInGroup = () => {
    fetch(
      `${process.env.REACT_APP_API_ROOT_URL}/getnumberofmedicineingroup/${data.groupId}`
    )
      .then((res) => res.json())
      .then((resBody) => setNoOfMedicine(resBody));
  };
  return (
    <>
      <div className="Singlegroup__container flex__container">
        <p className="p__poppins">{data.groupName}</p>
        <p className="p__poppins">{noOfMedicine}</p>
        <Link
          to={`/inventory/groups/${data.groupName}`}
          className="flex__container"
          style={{ textDecoration: "none" }}
        >
          <p className="p__poppins">View Full Details</p>
          <img src={Assets.DirectionArrows} alt="Left Directions" />
        </Link>
      </div>
      <div className="groupsplitter" />
    </>
  );
};

export default SingleGroup;
