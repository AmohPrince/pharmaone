import React, { useState } from "react";
import "./RightTab.css";
import Assets from "../../../Assets/Assets";
import { Link } from "react-router-dom";
/*This component is lives in the left section. It will take an object containg an 
icon a name and a boolean whether or not there is a dropdown. 
*/
const RightTab = ({ data, onTab, arrowState }) => {
  const [clickedLink, setClickedLink] = useState("");

  const handleListClick = () => {
    setClickedLink("medslist");
  };

  const handleGroupClick = () => {
    setClickedLink("groups");
  };
  return (
    <Link to={`${data.name}`} style={{ textDecoration: "none" }}>
      <div className={`${onTab}${data.name}`}>
        {data.topLine ? <div className="splitter" /> : null}
        <div className="RightTab flex__container" onClick={data.onClick}>
          <img src={data.icon} alt="Dashboard Icon" />
          <p className="p__poppins">{data.name}</p>
          {data.dropDown === true ? (
            <div className={`dropdown__icon${" "}${arrowState}${data.name}`}>
              <img src={Assets.Arrow} alt="Arrow" />
            </div>
          ) : null}
        </div>

        {data.inventoryOn === true ? (
          <div className="inventoryOptions flex__container-v">
            <div
              className={`inventoryoption listofmeds ${clickedLink}`}
              onClick={handleListClick}
            >
              <Link
                to="/Inventory/listofmeds"
                style={{ textDecoration: "none" }}
              >
                <p className="p__poppins">List Of Medicines</p>
              </Link>
            </div>
            <div
              className={`inventoryoption medicinegroups ${clickedLink}`}
              onClick={handleGroupClick}
            >
              <Link to="/Inventory/groups" style={{ textDecoration: "none" }}>
                <p className="p__poppins">Medicines Groups</p>
              </Link>
            </div>
          </div>
        ) : null}
        {data.spaceBelow ? <div className="space" /> : null}
      </div>
    </Link>
  );
};

export default RightTab;
