import React from "react";
import "./RightTab.css";
import Assets from "../../../Assets/Assets";
import { Link } from "react-router-dom";
/*This component is lives in the left section. It will take an object containg an 
icon a name and a boolean whether or not there is a dropdown. 
*/
const RightTab = ({ data, onTab }) => {
  return (
    <Link to={`/pharmacy/${data.name}`} style={{ textDecoration: "none" }}>
      <div className={`${onTab}${data.name}`}>
        {data.topLine ? <div className="splitter" /> : null}
        <div className="RightTab flex__container" onClick={data.onClick}>
          <img src={data.icon} alt="Dashboard Icon" />
          <p className="p__poppins">{data.name}</p>
          {data.dropDown === true ? (
            <div className="dropdown__icon">
              <img src={Assets.Arrow} alt="Arrow" />
            </div>
          ) : null}
        </div>
        {data.spaceBelow ? <div className="space" /> : null}
      </div>
    </Link>
  );
};

export default RightTab;
