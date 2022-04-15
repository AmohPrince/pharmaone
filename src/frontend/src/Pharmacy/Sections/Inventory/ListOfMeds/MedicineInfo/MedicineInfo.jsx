import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { dataFlowContext } from "../../../../Pharmacy";

const MedicineInfo = () => {
  let params = useParams();
  let incomingData = useContext(dataFlowContext);

  const data = incomingData.getSpecificMedicineWithId(params.medicineId);

  return <div>MedicineId: {params.medicineId}</div>;
};

export default MedicineInfo;
