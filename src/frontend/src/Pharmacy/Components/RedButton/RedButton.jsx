import React from "react";
import "./RedButton.css";

/* This component takes in a prop that determines the color icon and text */

const RedButton = ({ buttonData }) => {
  return (
    <>
      {buttonData.delete === true ? (
        <div
          className="flex__container Redbutton__container "
          style={{ border: `0.2px solid ${buttonData.color}` }}
        >
          <img src={buttonData.icon} alt="icon" />
          <p className="p__poppins delete__text">{buttonData.text}</p>
        </div>
      ) : (
        <div
          className="flex__container Redbutton__container "
          style={{ backgroundColor: buttonData.color }}
        >
          {buttonData.icon === null ? null : (
            <img src={buttonData.icon} alt="icon" />
          )}
          <p className="p__poppins">{buttonData.text}</p>
        </div>
      )}
    </>
  );
};

export default RedButton;
