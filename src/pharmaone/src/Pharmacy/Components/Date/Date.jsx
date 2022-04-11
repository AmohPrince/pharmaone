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
    <div className="Date flex__container-v">
      {amOrPm === "pm" ? (
        <div className="Moon__icon flex__container">
          <img src={Assets.Moon} alt="Moon Icon" />
          <p className="p__poppins Date__greeting">Good Evening</p>
        </div>
      ) : (
        <div className="Sun__icon flex__container">
          <img src={Assets.Sun} alt="Sun Icon" />
          <p className="p__poppins Date__greeting">Good Morning</p>
        </div>
      )}
      <div className="Date__btm flex__container">
        <p className="p__poppins">{currentDate}</p>
        <p className="p__poppins">{currentTime}</p>
      </div>
    </div>
  );
};

export default Date;
