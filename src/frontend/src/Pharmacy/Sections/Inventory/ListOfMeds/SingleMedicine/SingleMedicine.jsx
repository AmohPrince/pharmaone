import React from "react";
import { Link } from "react-router-dom";
import Assets from "../../../../../Assets/Assets";
import "./SingleMedicine.css";
/***
 * This component is the horizontal data on the list of meds component
 * don't confuse
 */

const SingleMedicine = ({ data }) => {
  return (
    <div className="SingleMedicine__container flex__container-v">
      <div className="SingleMedicine__body flex__container">
        <p className="p__poppins">{data.medicineName}</p>
        <p className="p__poppins">{data.medicineId}</p>
        {data.medicineGroup === null ? (
          <p className="p__poppins">Unset</p>
        ) : (
          <p className="p__poppins">{data.medicineGroup.groupName}</p>
        )}

        <p className="p__poppins">{data.inStock}</p>
        <Link to={data.medicineId} style={{ textDecoration: "none" }}>
          <div className="SingleMedicine__body-link flex__container">
            <p className="p__poppins">View Full Detail</p>
            <img src={Assets.DirectionArrows} alt="Directions" />
          </div>
        </Link>
      </div>
      <div className="medicinesplitter" />
    </div>
  );
};

export default SingleMedicine;
