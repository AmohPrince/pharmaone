import React, { useContext } from "react";
import { SectionName, Dashboardgrp } from "../../Components/Components";
import "./Inventory.css";
import { dataGroupContext } from "../../Pharmacy";

const Inventory = () => {
  const contextData = useContext(dataGroupContext);
  const data = contextData.slice(3, 6);

  const title = {
    main: "Inventory",
    sub: "List of medicines available for sales.",
  };

  return (
    <div className="Inventory__container">
      <SectionName title={title} />
      <div className="Inventory__body flex__container">
        {data.map((data) => (
          <Dashboardgrp data={data} key={data.name} />
        ))}
      </div>
    </div>
  );
};

export default Inventory;
