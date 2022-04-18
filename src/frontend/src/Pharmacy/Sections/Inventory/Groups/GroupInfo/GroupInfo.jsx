import React, { useContext, useState, useEffect } from "react";
import "./GroupInfo.css";
import { RedButton, SectionName } from "../../../../Components/Components";
import { useParams } from "react-router-dom";
import { dataFlowContext } from "../../../../Pharmacy";
import Assets from "../../../../../Assets/Assets";
import SingleMedicineInGroup from "../SingleMedicineInGroup/SingleMedicineInGroup";
import { Searchbar } from "../../../../Components/Components";

const GroupInfo = () => {
  const [modalState, setModalState] = useState(false);
  const [groupOverlay, setGroupOverlay] = useState(true);
  let params = useParams();
  const incomingData = useContext(dataFlowContext);
  const data = incomingData.getSpecificGroupWithName(params.groupName);

  useEffect(() => {
    setGroupOverlay((prevState) => !prevState);
  }, [modalState]);

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

  const buttonData3 = {
    color: "#F0483E",
    text: "Add Medicine to Group",
    icon: Assets.Plus,
  };
  //for the main search
  const searchBarData = {
    name: "SearchForMedicine",
    placeholder: "Search for Medicine",
  };
  //for the modal search
  const searchBarData2 = {
    name: "modalSearchForMedicine",
    placeholder: "Enter Medicine Name or Medicine ID",
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

  const handleModal = () => {
    setModalState((prevState) => !prevState);
  };

  return (
    <>
      <div className={`Group__overlay ${groupOverlay}`}></div>
      <div className="Inventory__container Group__info">
        <div className="flex__container Group__info-top">
          <SectionName title={title} />
          <div className="group__info-modal" onClick={handleModal}>
            <RedButton buttonData={buttonData} />
          </div>
        </div>
        <Searchbar data={searchBarData} />
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
            return (
              <SingleMedicineInGroup data={data} key={data.medicineName} />
            );
          })}
        </div>

        <RedButton buttonData={buttonData2} />
        {modalState === true ? (
          <div className="modal__wrapper">
            <div className="modal">
              <div className="modal__title">
                <p className="p__poppins">Add Medicine</p>
              </div>
              <div className="modal__subtitle">
                <p className="p__poppins">Medicine</p>
                <Searchbar data={searchBarData2} />
              </div>
              <RedButton buttonData={buttonData3} />
              <div className="closemodal" onClick={handleModal}>
                <img src={Assets.Close} alt="Close" />
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default GroupInfo;
