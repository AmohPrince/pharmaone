import React, { useContext } from "react";
import "./RightTab.css";
import Assets from "../../../Assets/Assets";
import { Link } from "react-router-dom";
import { dataFlowContext, rightSectionClickContext } from "../../Pharmacy";

/*This component is lives in the left section. It will take an object containg an 
icon a name and a boolean whether or not there is a dropdown. 
*/

const RightTab = ({ data, arrowState }) => {
  /**
   * This incoming data is the global state . Is the one that
   * contains all the state that lives in the main pharmacy component.
   */
  const incomingData = useContext(dataFlowContext);
  const changeColor = useContext(rightSectionClickContext);

  const handleListClick = () => {
    incomingData.setOnTab("medslist");
  };

  const handleGroupClick = () => {
    incomingData.setOnTab("groups");
  };
  return (
    <Link to={`${data.name}`} style={{ textDecoration: "none" }}>
      <div className={`${incomingData.currrentOnTab}${data.name}`}>
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
              className={`inventoryoption listofmeds ${incomingData.currrentOnTab}`}
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
              className={`inventoryoption medicinegroups ${incomingData.currrentOnTab}`}
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
