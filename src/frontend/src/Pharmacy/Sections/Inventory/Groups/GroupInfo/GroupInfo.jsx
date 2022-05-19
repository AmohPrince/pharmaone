import React, { useContext, useState, useEffect } from "react";
import "./GroupInfo.css";
import { RedButton, SectionName } from "../../../../Components/Components";
import { useParams } from "react-router-dom";
import { dataFlowContext } from "../../../../Pharmacy";
import Assets from "../../../../../Assets/Assets";
import SingleMedicineInGroup from "../SingleMedicineInGroup/SingleMedicineInGroup";
import { Searchbar } from "../../../../Components/Components";
import { useForm } from "react-hook-form";

const GroupInfo = () => {
  const [modalState, setModalState] = useState(false);
  const [groupOverlay, setGroupOverlay] = useState(false);
  let params = useParams();
  const incomingData = useContext(dataFlowContext);
  const data = incomingData.getSpecificGroupWithName(params.groupName);
  const [successConfirmation, setSuccessConfirmation] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const { handleSubmit } = useForm();
  const [groupMedicines, setGroupMedicines] = useState([]);
  const [deleteMessage, setDeleteMessage] = useState(" ");
  const [noOfMedicine, setNoOfMedicine] = useState(0);
  const [deleteFromGroup, setDeleteFromGroup] = useState(false);
  const [medicineToBeRemovedFromGroup, setMedicineToBeRemovedFromGroup] =
    useState("");

  useEffect(() => {
    fetchNoOfMedicinesInGroup();
  }, []);
  const fetchNoOfMedicinesInGroup = () => {
    fetch(`http://localhost:8080/getnumberofmedicineingroup/${data.groupId}`)
      .then((res) => res.json())
      .then((resBody) => setNoOfMedicine(resBody));
  };

  const title = {
    main: `${data.groupName}(${noOfMedicine})`,
    sub: "Detailed view of a medicine group.",
    complex: "level2",
    source1: "Inventory",
    source2: "Medicine Groups",
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
    fetch(`http://localhost:8080/getbygroupid/${data.groupId}`)
      .then((res) => {
        return res.json();
      })
      .then((resBody) => setGroupMedicines(resBody));
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

  const handleModal = () => {
    setModalState((prevState) => !prevState);
    setGroupOverlay((prevState) => !prevState);
  };
  const handleAddToGroup = () => {
    setSuccessConfirmation((prevState) => !prevState);
    setTimeout(() => {
      setSuccessConfirmation((prevState) => !prevState);
    }, 3000);
  };
  const handleDeleteGroup = () => {
    setDeleteModal((prevState) => !prevState);
    setGroupOverlay((prevState) => !prevState);
  };
  const onDelete = () => {
    fetch(`http://localhost:8080/deletegroup/${data.groupId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.text())
      .then((resBody) => setDeleteMessage(resBody));
    setDeleteModal((prevState) => !prevState);
    setGroupOverlay((prevState) => !prevState);

    setTimeout(() => {
      setDeleteMessage(" ");
    }, 2000);
  };

  const handleDeleteFromGroup = (medicineName) => {
    setGroupOverlay((prevState) => !prevState);
    setMedicineToBeRemovedFromGroup(medicineName);
    setDeleteFromGroup((prevState) => !prevState);
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
        <div
          className="Searchbar flex__container"
          id="SearchMedicineInventoryContainer"
        >
          <input
            type="search"
            name={searchBarData.name}
            id={searchBarData.name}
            placeholder={searchBarData.placeholder}
            className="p__poppins"
            onChange={searchMedicines}
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
              <p className="p__poppins">In Stock</p>
              <img src={Assets.TopBottomArrows} alt="Arrows" />
            </div>
            <div>
              <p className="p__poppins">Action</p>
            </div>
          </div>
          <div className="splitter" />
          {groupMedicines.map((data) => {
            return (
              <SingleMedicineInGroup
                data={data}
                key={data.medicineName}
                handleDeleteFromGroup={handleDeleteFromGroup}
              />
            );
          })}
        </div>
        <div>
          <div onClick={handleDeleteGroup} className="test">
            <RedButton buttonData={buttonData2} />
          </div>
          {deleteModal === true ? (
            <div className="deleteModal-wrapper">
              <div className="deleteGroupModal flex__container-v">
                <img
                  src={Assets.Close}
                  alt="Close"
                  onClick={handleDeleteGroup}
                />
                <p>Are you sure you want to delete group {data.groupName} ?</p>
                <div className="deleteGroup__choices flex__container">
                  <form onSubmit={handleSubmit(onDelete)}>
                    <input type="submit" value="Yes" />
                  </form>
                  <p className="cancel" onClick={handleDeleteGroup}>
                    Cancel
                  </p>
                </div>
              </div>
            </div>
          ) : null}
        </div>
        {deleteFromGroup === true ? (
          <div className="deleteModal-wrapper">
            <div className="deleteGroupModal flex__container-v">
              <img
                src={Assets.Close}
                alt="Close"
                onClick={handleDeleteFromGroup}
              />
              <p>
                Are you sure you want to remove {medicineToBeRemovedFromGroup}{" "}
                from group {data.groupName} ?
              </p>
              <div className="deleteGroup__choices flex__container">
                <form>
                  <input type="submit" value="Yes" />
                </form>
                <p className="cancel" onClick={handleDeleteFromGroup}>
                  Cancel
                </p>
              </div>
            </div>
          </div>
        ) : null}

        {deleteMessage !== " " ? (
          <div className="deleteMessage flex__container">
            <img src={Assets.Tick} alt="Tick" />
            <p>{deleteMessage}</p>
          </div>
        ) : null}

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
              <div className="modal__button-wrapper" onClick={handleAddToGroup}>
                <RedButton buttonData={buttonData3} />
              </div>
              <div className="closemodal" onClick={handleModal}>
                <img src={Assets.Close} alt="Close" />
              </div>
            </div>
          </div>
        ) : null}
        {successConfirmation === true ? (
          <div className="successConfirmation  flex__container">
            <img src={Assets.Tick} alt="tick" />
            <p className="p__poppins">Medicine Added to Group</p>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default GroupInfo;
