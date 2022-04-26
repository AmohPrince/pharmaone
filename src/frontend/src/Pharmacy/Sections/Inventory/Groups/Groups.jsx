import React, { useContext } from "react";
import "./Groups.css";
import { RedButton, SectionName } from "../../../Components/Components";
import { dataFlowContext } from "../../../Pharmacy";
import Assets from "../../../../Assets/Assets";
import SingleGroup from "./SingleGroups/SingleGroup";

const Groups = () => {
  const incomingData = useContext(dataFlowContext);

  const title = {
    main: "Medicine Groups",
    sub: "List of medicines groups",
    complex: "level1",
    source: "Inventory",
    meds: incomingData.currentMedicineGroups,
  };
  const buttonData = {
    color: "#F0483E",
    text: "Add New Group",
    icon: Assets.Plus,
  };

  return (
    <div className="Inventory__container">
      <div className="Group__container-top flex__container">
        <SectionName title={title} />
        <RedButton buttonData={buttonData} />
      </div>
      <div
        className="Topbar__input flex__container"
        id="SearchMedicineInventoryContainer"
      >
        <input
          type="search"
          name="SearchMedicineGroups"
          id="SearchMedicineGroups"
          placeholder="Search Medicine Groups"
          className="p__poppins"
        />
        <img src={Assets.Search} alt="Search Icon" />
      </div>
      <div className="Group__container">
        <div className="Group__container-titles flex__container">
          <div>
            <p className="p__poppins">Group Name</p>
            <img src={Assets.TopBottomArrows} alt="Arrows" />
          </div>
          <div>
            <p className="p__poppins">No Of Medicines</p>
            <img src={Assets.TopBottomArrows} alt="Arrows" />
          </div>
          <div>
            <p className="p__poppins">Action</p>
          </div>
        </div>
        <div className="titleseparator" />
        {incomingData.groupsList.map((data) => (
          <SingleGroup data={data} key={data.groupName} />
        ))}
      </div>
    </div>
  );
};

export default Groups;
