import React, { useContext } from "react";
import "./ListOfMeds.css";
import { SectionName, RedButton } from "../../../Components/Components";
import { dataFlowContext } from "../../../Pharmacy";
import Assets from "../../../../Assets/Assets";

const ListOfMeds = () => {
  const incomingData = useContext(dataFlowContext);
  const title = {
    main: "List of medicines",
    sub: "List of medicines available for sales",
    complex: "level1",
    source: "Inventory",
    meds: incomingData.currentAvailableMeds,
  };

  const buttonData = {
    color: "#F0483E",
    text: "Add New Item",
    icon: Assets.Plus,
  };

  return (
    <div className="Inventory__container">
      <div className="Inventory__container-top flex__container">
        <SectionName title={title} />
        <RedButton buttonData={buttonData} />
      </div>
      <div className="Inventory__container-mid flex__container">
        <div
          className="Topbar__input flex__container"
          id="SearchMedicineInventoryContainer"
        >
          <input
            type="search"
            name="SearchMedicineInventory"
            id="SearchMedicineInventory"
            placeholder="Search Medicine Inventory.."
            className="p__poppins"
          />
          <img src={Assets.Search} alt="Search Icon" />
        </div>
        <div className="SearchMed flex__container">
          <img src={Assets.Filter} alt="Filter Icon" />
          <select
            name="selectmedgroup"
            id="selectmedgroup"
            className="p__poppins"
          >
            <option value="" defaultValue hidden>
              -Select Group-
            </option>
            <option value="Group1">Group1</option>
            <option value="Group2">Group2</option>
            <option value="Group3">Group3</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ListOfMeds;
