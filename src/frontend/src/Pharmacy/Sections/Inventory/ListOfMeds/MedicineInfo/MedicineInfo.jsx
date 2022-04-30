import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { dataFlowContext } from "../../../../Pharmacy";
import {
  SectionName,
  RedButton,
  Spinner,
} from "../../../../Components/Components";
import Assets from "../../../../../Assets/Assets";
import "./MedicineInfo.css";
import { useForm } from "react-hook-form";

/**
 * This component takes a param from the url that i will use to fetch data
 * from the server
 * For now i might have to hard code the data.
 * @returns
 */

const MedicineInfo = () => {
  let params = useParams();
  let incomingData = useContext(dataFlowContext);
  const data = incomingData.getSpecificMedicineWithId(params.medicineId);
  const [medicineData, setMedicineData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [confrimationMessage, setConfrimationMessage] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const { register, handleSubmit } = useForm();

  const fetchMedicineData = () => {
    fetch(`http://localhost:8080/getsinglemedicine/${params.medicineId}`)
      .then((res) => res.json())
      .then((data) => setMedicineData(data));
  };
  const handleModal = (choice) => {
    if (choice === "open") {
      setModalOpen(true);
    } else {
      setModalOpen(false);
    }
  };

  //Put
  const onSubmit = (data) => {
    fetch(`http://localhost:8080/modifymedicine/${data.medicineidinput}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };

  //Delete
  const onDelete = () => {
    const editingId = params.medicineId;
    const editingObject = {
      medicineId: editingId,
    };
    fetch(`http://localhost:8080/deletemedicine/${params.medicineId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        // "Accept": "application/json",
      },
      body: JSON.stringify(editingObject),
    })
      .then((res) => res.text())
      .then((resBody) => setDeleteMessage(resBody));
    showDeleteConfirmationMessage();
  };

  const showDeleteConfirmationMessage = () => {
    setSpinner(true);
    setTimeout(() => {
      setSpinner(false);
      setConfrimationMessage(true);
    }, 1000);
  };

  useEffect(() => {
    fetchMedicineData();
  }, []);

  const title = {
    main: data.medicineName,
    sub: "List of medicines available for sales",
    complex: "level2",
    source1: "Inventory",
    source2: "List of medicines",
  };

  const buttonData = {
    color: "#03A9F5",
    icon: Assets.Pen,
    text: "Edit Details",
  };
  const buttonData2 = {
    delete: true,
    color: "#f0483e",
    text: "Delete Medicine",
    icon: Assets.Trash,
  };

  return (
    <>
      {modalOpen === true || deleteModal === true ? (
        <div className="Medicine__info-overlay"></div>
      ) : null}
      <div className="Inventory__container Medicine__info-container ">
        <div className="Medicine__info-top ">
          <div className="flex__container">
            <SectionName title={title} />
            <div
              className="editmedicinebutton"
              onClick={() => handleModal("open")}
            >
              <RedButton buttonData={buttonData} />
            </div>
          </div>
          <div
            className="Topbar__input flex__container"
            id="SearchMedicineInventoryContainer"
          >
            <input
              type="search"
              name="SearchMedicineDetails"
              id="SearchMedicineDetails"
              placeholder="Search in Medicine Details"
              className="p__poppins"
            />
            <img src={Assets.Search} alt="Search Icon" />
          </div>
        </div>
        <div className="Medicine__info-mid">
          <div className="flex__container">
            <div className="Medicine__data Medicine__data-a ">
              <div className="Medicine__data-title">
                <p className="p__poppins">Medicine</p>
              </div>
              <div className="medicnedatasplitter" />
              <div className="Medicine__data-body flex__container">
                <div className="Medicine__data-section">
                  <p className="p__poppins">{medicineData.medicineId}</p>
                  <p className="p__poppins">Medicine ID</p>
                </div>
                <div className="Medicine__data-section">
                  <p className="p__poppins">{medicineData.groupName}</p>
                  <p className="p__poppins">Medicine Group</p>
                </div>
              </div>
            </div>
            <div className="Medicine__data Medicine__data-a">
              <div className="Medicine__data-title flex__container">
                <p className="p__poppins">Inventory in Qty</p>
                <Link
                  to="/medicinesupplier"
                  className="flex__container"
                  style={{ textDecoration: "none" }}
                >
                  <p className="p__poppins">Send Stock Request</p>
                  <img src={Assets.DirectionArrows} alt="Direction Arrows" />
                </Link>
              </div>
              <div className="medicnedatasplitter" />
              <div className="Medicine__data-body flex__container">
                <div className="Medicine__data-section">
                  <p className="p__poppins">{medicineData.lifetimeSupply}</p>
                  <p className="p__poppins">Lifetime Supply</p>
                </div>
                <div className="Medicine__data-section">
                  <p className="p__poppins">{medicineData.lifetimeSales}</p>
                  <p className="p__poppins">Lifetime Sales</p>
                </div>
                <div className="Medicine__data-section">
                  <p className="p__poppins">{medicineData.inStock}</p>
                  <p className="p__poppins">Stock Left</p>
                </div>
              </div>
            </div>
          </div>

          <div className="Medicine__data Medicine__data-b">
            <div className="Medicine__data-title">
              <p className="p__poppins">How To Use</p>
            </div>
            <div className="medicnedatasplitter" />
            <div className="Medicine__data-description">
              <p className="p__poppins">
                {medicineData.howToUse === "" ? "Unset" : medicineData.howToUse}
              </p>
            </div>
          </div>
          <div className="Medicine__data Medicine__data-b">
            <div className="Medicine__data-title">
              <p className="p__poppins">Side Effects</p>
            </div>
            <div className="medicnedatasplitter" />
            <div className="Medicine__data-description">
              <p className="p__poppins">
                {medicineData.sideEffects === ""
                  ? "Unset"
                  : medicineData.sideEffects}
              </p>
            </div>
          </div>
        </div>
        <div className="deleteMedicine">
          {deleteModal === true ? (
            <div className="deletemodal">
              <form onSubmit={handleSubmit(onDelete)}>
                <div className="deletemodal__container flex__container-v">
                  <img
                    src={Assets.Close}
                    alt="Close Icon"
                    onClick={() => {
                      setDeleteModal(false);
                    }}
                  />
                  <img src={Assets.Danger} alt="Danger" />

                  {spinner === true ? (
                    <Spinner context="delete" />
                  ) : confrimationMessage === true ? (
                    <p className="deletemessage">{deleteMessage}</p>
                  ) : (
                    <p>Are you sure you want to delete {data.medicineName} ?</p>
                  )}
                  <div className="choices flex__container">
                    <input type="submit" value="Yes, Delete" />
                    <p
                      onClick={() => {
                        setDeleteModal(false);
                      }}
                    >
                      Cancel
                    </p>
                  </div>
                </div>
              </form>
            </div>
          ) : null}
          <div
            onClick={() => {
              setDeleteModal(true);
            }}
          >
            <RedButton buttonData={buttonData2} />
          </div>
        </div>
        {modalOpen === true ? (
          <div className="edit__modal">
            <div className="edit__modal-header flex__container">
              <p className="p__poppins">Edit {data.medicineName}</p>
              <img
                src={Assets.Close}
                alt="Close button"
                onClick={() => handleModal("close")}
              />
            </div>
            <div className="edit__modal-input flex__container-v">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <div>
                    <label htmlFor="medicineidinput">MedicineId</label>
                    <input
                      type="text"
                      id="medicineidinput"
                      className="medicineeditinput"
                      defaultValue={medicineData.medicineId}
                      {...register("medicineidinput")}
                    />
                  </div>
                  <div>
                    <label htmlFor="medicinegroupinput">Medicine Group</label>
                    <input
                      type="text"
                      id="medicinegroupinput"
                      className="medicineeditinput"
                      defaultValue={medicineData.groupName}
                      {...register("medicinegroupinput")}
                    />
                  </div>
                  <div>
                    <label htmlFor="medicinelifetimesupplyinput">
                      Lifetime Supply
                    </label>
                    <input
                      type="text"
                      id="medicinelifetimesupplyinput"
                      className="medicineeditinput"
                      defaultValue={medicineData.lifetimeSupply}
                      {...register("medicinelifetimesupplyinput")}
                    />
                  </div>
                  <div>
                    <label htmlFor="medicinelifetimesalesinput">
                      Lifetime Sales
                    </label>
                    <input
                      type="text"
                      id="medicinelifetimesalesinput"
                      className="medicineeditinput"
                      defaultValue={medicineData.lifetimeSales}
                      {...register("medicinelifetimesalesinput")}
                    />
                  </div>
                  <div>
                    <label htmlFor="medicinehowtouseinput">How To Use</label>
                    <textarea
                      type="text"
                      id="medicinehowtouseinput"
                      className="medicineeditinput"
                      defaultValue={medicineData.howToUse}
                      {...register("medicinehowtouseinput")}
                    />
                  </div>
                  <div>
                    <label htmlFor="medicinesideeffectsinput">
                      Side Effects
                    </label>
                    <textarea
                      type="text"
                      id="medicinesideeffectsinput"
                      className="medicineeditinput"
                      defaultValue={medicineData.sideEffects}
                      {...register("medicinesideeffectsinput")}
                    />
                  </div>
                  <input type="submit" value="Save Details" id="savebutton" />
                </div>
              </form>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default MedicineInfo;
