import React, { useContext } from "react";
import "./ListOfMeds.css";
import { SectionName, RedButton } from "../../../Components/Components";
import { dataFlowContext } from "../../../Pharmacy";
import Assets from "../../../../Assets/Assets";
import SingleMedicine from "./SingleMedicine/SingleMedicine";
/**
 * This component will have some form of fetch that will pull data
 * i thinl useeffect
 * @returns List of medicine
 */

const ListOfMeds = () => {
  const incomingData = useContext(dataFlowContext);
  const medicineList = incomingData.mockListOfMedicines;

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
      <div className="Inventory__container-bottom">
        <div className="Inventory__container-titles flex__container">
          <div>
            <p className="p__poppins">Medicine Name</p>
            <img src={Assets.TopBottomArrows} alt="Arrows" />
          </div>
          <div>
            <p className="p__poppins">Medicine ID</p>
            <img src={Assets.TopBottomArrows} alt="Arrows" />
          </div>
          <div>
            <p className="p__poppins">Group Name</p>
            <img src={Assets.TopBottomArrows} alt="Arrows" />
          </div>
          <div>
            <p className="p__poppins">Stock in Qty</p>
            <img src={Assets.TopBottomArrows} alt="Arrows" />
          </div>
          <div>
            <p className="p__poppins">Action</p>
          </div>
        </div>
        {medicineList.map((data) => {
          return <SingleMedicine data={data} key={data.medicineId} />;
        })}
      </div>
      <div className="listofmeds__footer flex__container">
        <p className="p__poppins">
          Showing 1 - 8 results of {incomingData.currentAvailableMeds}
        </p>
        <div className="listofmeds__footer-pageswitch flex__container">
          <img src={Assets.PageSwitcherLeft} alt="Change Page" />
          <select name="pageswitch" id="pageswitch" className="p__poppins">
            <option value="Jan2022">Page 1</option>
            <option value="Feb2022">Page 2</option>
            <option value="Mar2022">Page 3</option>
          </select>
          <img src={Assets.PageSwitcher} alt="Change Page" />
        </div>
      </div>
    </div>
  );
};

export default ListOfMeds;
