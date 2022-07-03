import React, { useContext, useState } from "react";
import "./NewMedicine.css";
import { RedButton, SectionName } from "../../../../Components/Components";
import { useForm } from "react-hook-form";
import Assets from "../../../../../Assets/Assets";
import { dataFlowContext } from "../../../../Pharmacy";

const NewMedicine = () => {
  const { groupsList, groupNames } = useContext(dataFlowContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [openModal, setOpenModal] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [errorModal, setErrorModal] = useState(false);
  const [numberError, setNumberError] = useState(false);

  const onSubmit = (data) => {
    const submittingGroup = groupsList.find(
      (group) => group.groupName === data.groupName
    );
    delete data.groupName;
    data.medicineGroup = {
      groupId: submittingGroup.groupId,
    };
    fetch(`${process.env.REACT_APP_API_ROOT_URL}/addMedicine`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.text())
      .then((message) => {
        handleSuccess(message);
      })
      .catch(() => handlePostErrors());
  };
  const title = {
    main: "Add New Medicine",
    sub: "*All fields are mandatory, except mentioned as (optional).",
    complex: "level2",
    source1: "Inventory",
    source2: "List of medicines",
  };
  const buttonData = {
    color: "#01a768",
    text: "OK",
    icon: null,
  };
  const buttonData2 = {
    color: "#f0483e",
    text: "OK",
    icon: null,
  };

  const handlePostErrors = () => {
    setErrorModal(true);
  };
  const handleSuccess = (message) => {
    setConfirmationMessage(message);
    setOpenModal(true);
  };

  return (
    <>
      {openModal === true || errorModal === true ? (
        <div className="Medicine__info-overlay" />
      ) : null}
      <div className="padding-around">
        <SectionName title={title} />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="medicineaddform flex__container-v "
        >
          <div className="flex__container space-between medicineName">
            <label htmlFor="medicineName">
              <p className="p__poppins">Medicine Name</p>
              <input {...register("medicineName", { required: true })} />
              {errors.medicineName && (
                <p className="input-error">Medicine name is required.</p>
              )}
            </label>
            <label htmlFor="medicineId">
              <p className="p__poppins">Medicine Id</p>
              <input {...register("medicineId")} />
            </label>
          </div>
          <div className="flex__container space-between medicineGroup">
            <label htmlFor="medicineGroup">
              <p className="p__poppins">Medicine Group</p>
              <select
                name="selectFormMedicineGroup"
                id="selectFormMedicineGroup"
                className="p__poppins"
                {...register("groupName", { required: true })}
              >
                <option value="" defaultValue hidden>
                  -Select Group-
                </option>
                {groupNames.map((group, index) => {
                  return (
                    <option value={group} key={index}>
                      {group}
                    </option>
                  );
                })}
              </select>
              {errors.groupName && (
                <p className="input-error"> Please select a group.</p>
              )}
            </label>
            <label htmlFor="medicineQuantity">
              <p className="p__poppins">Quantity in Number</p>
              <input {...register("inStock", { valueAsNumber: true })} />
              {numberError === true ? <p>Please enter a number</p> : null}
            </label>
          </div>
          <label htmlFor="howtouse" className="howtouse">
            <p className="p__poppins">How to Use</p>
            <textarea {...register("howToUse")} />
          </label>
          <label htmlFor="sideEffects" className="sideeffects">
            <p className="p__poppins">Side Effects</p>
            <textarea {...register("sideEffects")} />
          </label>

          <input type="submit" id="submitnewmedicine" />
          {openModal === true ? (
            <div className="Success__modal flex__container-v">
              <img src={Assets.Success} alt="Success" />
              <p>Successfully {confirmationMessage}</p>
              <div
                onClick={() => {
                  setOpenModal(false);
                }}
              >
                <RedButton buttonData={buttonData} />
              </div>
            </div>
          ) : null}
          {errorModal === true ? (
            <div className="Success__modal flex__container-v">
              <img src={Assets.Errorsuccess} alt="Danger Icon" />
              <p>An error occurred.</p>
              <div
                onClick={() => {
                  setErrorModal(false);
                }}
              >
                <RedButton buttonData={buttonData2} />
              </div>
            </div>
          ) : null}
        </form>
      </div>
    </>
  );
};

export default NewMedicine;
