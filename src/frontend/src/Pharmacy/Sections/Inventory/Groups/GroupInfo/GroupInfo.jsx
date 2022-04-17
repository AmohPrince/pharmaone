import React, { useContext } from "react";
import "./GroupInfo.css";
import { RedButton, SectionName } from "../../../../Components/Components";
import { useParams } from "react-router-dom";
import { dataFlowContext } from "../../../../Pharmacy";
import Assets from "../../../../../Assets/Assets";
import SingleMedicine from "../../ListOfMeds/SingleMedicine/SingleMedicine";
import SingleMedicineInGroup from "../SingleMedicineInGroup/SingleMedicineInGroup";

const GroupInfo = () => {
  let params = useParams();
  const incomingData = useContext(dataFlowContext);
  const data = incomingData.getSpecificGroupWithName(params.groupName);

  const title = {
    main: `${data.groupName}(${data.noOfMedicine})`,
    sub: "Detailed view of a medicine group.",
    complex: "level2",
    source1: "Inventory",
    source2: "Medicine Groups",
  };

  const buttonData = {
    color: "#F0483E",
    text: "Add Medicine",
    icon: Assets.Plus,
  };
  const buttonData2 = {
    color: "#F0483E",
    icon: Assets.Trash,
    text: "Delete Group",
    delete: true,
  };

  const mockGroupMedicines = [
    {
      medicineName: "Augmentin 625 Duo Tablet",
      noOfMedicines: 22,
    },
    {
      medicineName: "Azithral 500 Tablet",
      noOfMedicines: 8,
    },
  ];

  return (
    <div className="Inventory__container Group__info">
      <div className="flex__container Group__info-top">
        <SectionName title={title} />
        <RedButton buttonData={buttonData} />
      </div>
      <div
        className="Topbar__input flex__container"
        id="SearchMedicineInventoryContainer"
      >
        <input
          type="search"
          name="SearchForMedicine"
          id="SearchForMedicine"
          placeholder="Search for Medicine"
          className="p__poppins"
        />
        <img src={Assets.Search} alt="Search Icon" />
      </div>
      <div>
        <div className="Group__container-titles flex__container">
          <div>
            <p className="p__poppins">Medicine Name</p>
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
        <div className="splitter" />
        {mockGroupMedicines.map((data) => {
          return <SingleMedicineInGroup data={data} />;
        })}
      </div>
      <RedButton buttonData={buttonData2} />
    </div>
  );
};

export default GroupInfo;
