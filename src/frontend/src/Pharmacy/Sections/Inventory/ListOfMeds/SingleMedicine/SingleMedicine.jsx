import React from "react";
import Assets from "../../../../../Assets/Assets";
import "./SingleMedicine.css";

const SingleMedicine = ({ data }) => {
  return (
    <div className="SingleMedicine__container flex__container-v">
      <div className="medicinesplitter" />
      <div className="SingleMedicine__body flex__container">
        <p className="p__poppins">{data.medicineName}</p>
        <p className="p__poppins">{data.medicineId}</p>
        <p className="p__poppins">{data.groupName}</p>
        <p className="p__poppins">{data.stock}</p>
        <div className="SingleMedicine__body-link flex__container">
          <p className="p__poppins">View Full Detail</p>
          <img src={Assets.DirectionArrows} alt="Directions" />
        </div>
      </div>
      <div className="medicinesplitter" />
    </div>
  );
};

export default SingleMedicine;
