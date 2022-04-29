import React from "react";
import "./NewMedicine.css";
import { SectionName } from "../../../../Components/Components";
import { useForm } from "react-hook-form";

const NewMedicine = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    fetch("http://localhost:8080/addMedicine", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };
  const title = {
    main: "Add New Medicine",
    sub: "*All fields are mandatory, except mentioned as (optional).",
    complex: "level2",
    source1: "Inventory",
    source2: "List of medicines",
  };

  return (
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
              {...register("groupName")}
            >
              <option value="" defaultValue hidden>
                -Select Group-
              </option>
              <option value="Diabetes">Diabetes</option>
              <option value="General Medicine">General Medicine</option>
              <option value="Malaria">Malaria</option>
            </select>
          </label>
          <label htmlFor="medicineQuantity">
            <p className="p__poppins">Quantity in Number</p>
            <input {...register("inStock")} />
          </label>
        </div>
        <label htmlFor="howtouse" className="howtouse">
          <p className="p__poppins">How to Use</p>
          <input {...register("howToUse")} />
        </label>
        <label htmlFor="sideEffects" className="sideeffects">
          <p className="p__poppins">Side Efects</p>
          <input {...register("sideEffects")} />
        </label>
        <input type="submit" id="submitnewmedicine" />
      </form>
    </div>
  );
};

export default NewMedicine;
