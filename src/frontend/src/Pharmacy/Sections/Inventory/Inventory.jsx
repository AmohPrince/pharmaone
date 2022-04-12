import React from "react";
import SectionName from "../../Components/SectionName/SectionName";
import "./Inventory.css";

const Inventory = () => {
  const title = {
    main: "Inventory",
    sub: "List of medicines available for sales.",
  };
  return (
    <div className="Inventory__container">
      <SectionName title={title} />
    </div>
  );
};

export default Inventory;
