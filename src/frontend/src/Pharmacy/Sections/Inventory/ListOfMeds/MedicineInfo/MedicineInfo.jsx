import React from "react";
import { useParams } from "react-router-dom";

const MedicineInfo = () => {
  let params = useParams();

  return <div>MedicineId: {params.medicineId}</div>;
};

export default MedicineInfo;
