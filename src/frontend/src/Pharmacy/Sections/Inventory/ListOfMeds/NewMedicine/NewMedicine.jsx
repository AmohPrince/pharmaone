import React, { useContext, useState } from "react";
import "./NewMedicine.css";
import { RedButton, SectionName } from "../../../../Components/Components";
import { useForm } from "react-hook-form";
import Assets from "../../../../../Assets/Assets";
import { dataFlowContext } from "../../../../Pharmacy";

const NewMedicine = () => {
  const incomingData = useContext(dataFlowContext);
  const groupNames = incomingData.groupNames;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [openModal, setOpenModal] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [errorModal, setErrorModal] = useState(false);
  const [numberError, setNumberError] = useState(false);

  //Submit new medicine to the server.
  const onSubmit = (data) => {
    // console.log(data);
    // if (data.inStock == NaN) {
    //   setNumberError(true);
    // } else {
    //   console.log(data);
    // }
    fetch("http://localhost:8080/addMedicine", {
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
        <div className="Medicine__info-overlay"></div>
      ) : null}
      <div className="Inventory__container">
        <SectionName title={title} />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="medicineaddform flex__container-v "
        >
          <div className="flex__container">
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
          <div className="flex__container medicineGroup">
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
                {groupNames.map((group) => {
                  return (
                    <option value={group} key={group.id}>
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
