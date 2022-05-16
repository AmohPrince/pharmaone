import React from "react";
import Assets from "../../../../../Assets/Assets";
import "./SingleMedicineInGroup.css";

const SingleMedicineInGroup = ({ data }) => {
  return (
    <>
      <div className="flex__container Singlemedicinegroup">
        <p className="p__poppins">{data.medicineName}</p>
        <p className="p__poppins">{data.inStock}</p>
        <div className="flex__container">
          <img src={Assets.Trash} alt="Dustbin Icon" />
          <p className="p__poppins">Remove From Group</p>
        </div>
      </div>
      <div className="divider" />
    </>
  );
};

export default SingleMedicineInGroup;
