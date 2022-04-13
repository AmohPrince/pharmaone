import React from "react";
import "./RedButton.css";

/* This component takes in a prop that determines the color icon and text */

const RedButton = ({ buttonData }) => {
  return (
    <div
      className="flex__container Redbutton__container "
      style={{ backgroundColor: buttonData.color }}
    >
      <img src={buttonData.icon} alt="icon" />
      <p className="p__poppins">{buttonData.text}</p>
    </div>
  );
};

export default RedButton;
