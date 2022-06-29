import React, { useState } from "react";
import { useContext } from "react";
import Assets from "../../../../../Assets/Assets";
import { dataFlowContext } from "../../../../Pharmacy";
import "./SingleMedicineInGroup.css";

const SingleMedicineInGroup = ({ data }) => {
  const [removeFromGroup, setRemoveFromGroup] = useState(false);
  const { setOverlay, modals, setModals } = useContext(dataFlowContext);

  const handleRemovingFromGroupModal = () => {
    setRemoveFromGroup((prevState) => !prevState);
    setOverlay((prevState) => !prevState);
    setModals((prevState) => !prevState);
  };

  return (
    <>
      <div className="flex__container Singlemedicinegroup">
        <p className="p__poppins">{data.medicineName}</p>
        <p className="p__poppins">{data.inStock}</p>
        <div className="flex__container" onClick={handleRemovingFromGroupModal}>
          <img src={Assets.Trash} alt="Dustbin Icon" />
          <p className="p__poppins">Remove From Group</p>
        </div>
      </div>
      <div className="divider" />
      {removeFromGroup && modals && (
        <div className="remove-from-group flex-v">
          <img
            src={Assets.Close}
            alt="Close"
            onClick={handleRemovingFromGroupModal}
            className="cursor"
          />
          <p className="confirmation-text">
            Are you sure you want to remove {data.medicineName} from group{" "}
            {data.medicineGroup.groupName} ?
          </p>
          <div className="flex space-between">
            <input type="submit" value="Yes" />
            <p className="cancel cursor" onClick={handleRemovingFromGroupModal}>
              Cancel
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleMedicineInGroup;
