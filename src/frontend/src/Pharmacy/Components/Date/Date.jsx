import React, { useEffect, useState } from "react";
import moment from "moment";
import Assets from "../../../Assets/Assets";
import "./Date.css";

const Date = () => {
  const [currentDate, setCurrentDate] = useState();
  const [currentTime, setcurrentTime] = useState();
  const [amOrPm, setamOrPm] = useState();

  const setCurrents = () => {
    setCurrentDate(moment().format("dddd D MMMM YYYY"));
    setcurrentTime(moment().format(" h:mm:ss "));
    setamOrPm(moment().format("a"));
  };

  const updateTimes = () => {
    setTimeout(() => {
      setCurrents();
      updateTimes();
    }, 1000);
  };

  useEffect(() => {
    setCurrents();
    updateTimes();
  }, []);

  return (
    <div className="date flex-v">
      {amOrPm === "pm" ? (
        <div className="moon flex">
          <img src={Assets.Moon} alt="Moon Icon" />
          <p className="p__poppins date__greeting">Good Evening</p>
        </div>
      ) : (
        <div className="sun flex">
          <img src={Assets.Sun} alt="Sun Icon" />
          <p className="p__poppins date__greeting">Good Morning</p>
        </div>
      )}
      <div className="date__btm flex">
        <p>{currentDate}</p>
        <p>{currentTime}</p>
      </div>
    </div>
  );
};

export default Date;
