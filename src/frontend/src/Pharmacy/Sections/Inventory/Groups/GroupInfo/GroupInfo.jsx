import React, { useContext, useState, useEffect } from "react";
import "./GroupInfo.css";
import { RedButton, SectionName } from "../../../../Components/Components";
import { useParams } from "react-router-dom";
import { dataFlowContext } from "../../../../Pharmacy";
import Assets from "../../../../../Assets/Assets";
import SingleMedicineInGroup from "../SingleMedicineInGroup/SingleMedicineInGroup";
import { Searchbar } from "../../../../Components/Components";

const GroupInfo = () => {
  const { setOverlay, getSpecificGroupWithName, setModals, modals } =
    useContext(dataFlowContext);

  let params = useParams();
  const data = getSpecificGroupWithName(params.groupName);

  const [addToGroupModal, setAddToGroupModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [groupMedicines, setGroupMedicines] = useState([]);
  const [noOfMedicine, setNoOfMedicine] = useState(0);

  const title = {
    main: `${data.groupName}(${noOfMedicine})`,
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

  useEffect(() => {
    fetchNoOfMedicinesInGroup();
  }, []);

  const fetchNoOfMedicinesInGroup = () => {
    fetch(
      `${process.env.REACT_APP_API_ROOT_URL}/getnumberofmedicineingroup/${data.groupId}`
    )
      .then((res) => res.json())
      .then((resBody) => setNoOfMedicine(resBody));
  };

  useEffect(() => {
    fetchMedicineInGroup();
  }, []);

  const searchMedicines = (e) => {
    if (e.target.value === "") {
      fetchMedicineInGroup();
    } else {
      const filteredMedicine = groupMedicines.filter((medicine) =>
        medicine.medicineName
          .toLowerCase()
          .includes(e.target.value.toLowerCase())
      );
      setGroupMedicines(filteredMedicine);
    }
  };

  const fetchMedicineInGroup = () => {
    fetch(`${process.env.REACT_APP_API_ROOT_URL}/getbygroupid/${data.groupId}`)
      .then((res) => {
        return res.json();
      })
      .then((resBody) => setGroupMedicines(resBody));
  };

  const closeDeleteModal = () => {
    setDeleteModal(false);
    setModals(false);
    setOverlay(false);
  };

  const openDeleteModal = () => {
    setDeleteModal(true);
    setModals(true);
    setOverlay(true);
  };

  const openAddToGroupModal = () => {
    setAddToGroupModal(true);
    setOverlay(true);
    setModals(true);
  };

  const closeAddToGroupModal = () => {
    setAddToGroupModal(false);
    setOverlay(false);
    setModals(false);
  };

  const addMedicineToGroup = () => {
    console.log("Added medicine to group!");
  };

  const deleteGroup = () => {
    fetch(`${process.env.REACT_APP_API_ROOT_URL}/deletegroup/${data.groupId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.text())
      .then((response) => console.log(response));
  };

  const changeMedicineGroup = (medicineId, groupIdToChangeTo) => {
    return fetch(
      `${process.env.REACT_APP_API_ROOT_URL}/changeMedicineGroup/${medicineId}/${groupIdToChangeTo}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.text())
      .then((response) => console.log(response));
  };

  const removeMedicinesFromGroup = async () => {
    let unSetGroupId = 24;
    for (const medicine of groupMedicines) {
      await changeMedicineGroup(medicine.medicineId, unSetGroupId);
    }
    deleteGroup();
  };

  return (
    <div className="padding-around Group__info">
      <div className="flex Group__info-top">
        <SectionName title={title} />
        <div className="group__info-modal" onClick={openAddToGroupModal}>
          <RedButton buttonData={buttonData} />
        </div>
      </div>
      <div className="Searchbar flex" id="SearchMedicineInventoryContainer">
        <input
          type="search"
          name={searchBarData.name}
          id={searchBarData.name}
          placeholder={searchBarData.placeholder}
          onChange={searchMedicines}
        />
        <img src={Assets.Search} alt="Search Icon" />
      </div>
      <div>
        <div className="Group__container-titles flex">
          <div>
            <p>Medicine Name</p>
            <img src={Assets.TopBottomArrows} alt="Arrows" />
          </div>
          <div>
            <p>In Stock</p>
            <img src={Assets.TopBottomArrows} alt="Arrows" />
          </div>
          <div>
            <p>Action</p>
          </div>
        </div>
        <div className="splitter" />
        {groupMedicines.length === 0 ? (
          <p className="empty-group">No medicines available in group :(</p>
        ) : (
          groupMedicines.map((data) => {
            return (
              <SingleMedicineInGroup data={data} key={data.medicineName} />
            );
          })
        )}
      </div>
      <div>
        <div onClick={openDeleteModal} className="open-delete-modal-button">
          <RedButton buttonData={buttonData2} />
        </div>
        {deleteModal && modals && (
          <div className="deleteGroupModal flex-v">
            <img src={Assets.Close} alt="Close" onClick={closeDeleteModal} />
            <p>Are you sure you want to delete group {data.groupName} ?</p>
            <div className="deleteGroup__choices flex">
              <input
                type="submit"
                value="Yes"
                onClick={removeMedicinesFromGroup}
              />
              <p className="cancel cursor" onClick={closeDeleteModal}>
                Cancel
              </p>
            </div>
          </div>
        )}
      </div>

      {addToGroupModal && modals && (
        <div className="modal">
          <div className="modal__title">
            <p>Add Medicine</p>
          </div>
          <div className="modal__subtitle">
            <p>Medicine</p>
            <Searchbar data={searchBarData2} />
          </div>
          <div className="modal__button-wrapper" onClick={addMedicineToGroup}>
            <RedButton buttonData={buttonData3} />
          </div>
          <div className="closemodal" onClick={closeAddToGroupModal}>
            <img src={Assets.Close} alt="Close" />
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupInfo;
