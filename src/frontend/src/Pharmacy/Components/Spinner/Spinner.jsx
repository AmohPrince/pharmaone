import React from "react";
import "./Spinner.css";

const Spinner = ({ context }) => {
  console.log(context);
  return (
    <div className={context}>
      <div className="spinner"></div>
    </div>
  );
};

export default Spinner;
