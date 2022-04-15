import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { dataFlowContext } from "../../../../Pharmacy";
import { SectionName, RedButton } from "../../../../Components/Components";
import Assets from "../../../../../Assets/Assets";
import "./MedicineInfo.css";

const MedicineInfo = () => {
  let params = useParams();
  let incomingData = useContext(dataFlowContext);
  const data = incomingData.getSpecificMedicineWithId(params.medicineId);

  const title = {
    main: data.medicineName,
    sub: "List of medicines available for sales",
    complex: "level2",
    source1: "Inventory",
    source2: "List of medicines",
  };

  const buttonData = {
    color: "#03A9F5",
    icon: Assets.Pen,
    text: "Edit Details",
  };

  return (
    <div className="Inventory__container ">
      <div className="Medicine__info-top flex__container">
        <SectionName title={title} />
        <RedButton buttonData={buttonData} />
      </div>
    </div>
  );
};

export default MedicineInfo;
