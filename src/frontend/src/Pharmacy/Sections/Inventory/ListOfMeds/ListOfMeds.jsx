import React, { useContext } from "react";
import "./ListOfMeds.css";
import { SectionName } from "../../../Components/Components";
import { dataFlowContext } from "../../../Pharmacy";

const ListOfMeds = () => {
  const incomingData = useContext(dataFlowContext);
  const title = {
    main: "List of medicines",
    sub: "List of medicines available for sales",
    complex: "level1",
    source: "Inventory",
    meds: incomingData.currentAvailableMeds,
  };

  return (
    <div className="Inventory__container">
      <SectionName title={title} />
    </div>
  );
};

export default ListOfMeds;
