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

  const [medicineName, setMedicineName] = useState(" ");

  const fetchMedicineName = () => {
    const data = incomingData.getSpecificMedicineWithId(params.medicineId);
    setMedicineName(data.medicineName);
  };

  const [medicineData, setMedicineData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState(" ");
  const [deleteModal, setDeleteModal] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [editMessage, setEditMessage] = useState(" ");
  const [editConfirmationModal, setEditConfirmationModal] = useState(false);
  const [errorEditConfirmationModal, setErrorEditConfirmationModal] =
    useState(false);
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
    setSpinner(true);
    fetch(`http://localhost:8080/modifymedicine/${data.medicineId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.text())
      .then((message) => {
        setEditMessage(message);
        showEditConfirmationMessage("success");
      })
      .catch(() => {
        showEditConfirmationMessage("error");
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
      setConfirmationMessage(true);
    }, 1000);
  };

  const showEditConfirmationMessage = (message) => {
    if (message === "success") {
      setSpinner(false);
      setEditConfirmationModal(true);

      setTimeout(() => {
        setEditConfirmationModal(false);
      }, 2000);
    }
    if (message === "error") {
      setSpinner(false);
      setErrorEditConfirmationModal(true);

      setTimeout(() => {
        setErrorEditConfirmationModal(false);
      }, 2000);
    }
  };

  useEffect(() => {
    fetchMedicineData();
    fetchMedicineName();
  }, []);

  const title = {
    main: medicineName,
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
            />
            <img src={Assets.Search} alt="Search Icon" />
          </div>
        </div>
        <div className="Medicine__info-mid">
          <div className="flex__container">
            <div className="Medicine__data Medicine__data-a ">
              <div className="Medicine__data-title">
                <p>Medicine</p>
              </div>
              <div className="medicnedatasplitter" />
              <div className="Medicine__data-body flex__container">
                <div className="Medicine__data-section">
                  <p>{medicineData.medicineId}</p>
                  <p>Medicine ID</p>
                </div>
                <div className="Medicine__data-section">
                  <p>{medicineData.groupName}</p>
                  <p>Medicine Group</p>
                </div>
              </div>
            </div>
            <div className="Medicine__data Medicine__data-a">
              <div className="Medicine__data-title flex__container">
                <p>Inventory in Qty</p>
                <Link
                  to="/medicinesupplier"
                  className="flex__container"
                  style={{ textDecoration: "none" }}
                >
                  <p className="p__poppins sendStockRequest">
                    Send Stock Request
                  </p>
                  <img src={Assets.DirectionArrows} alt="Direction Arrows" />
                </Link>
              </div>
              <div className="medicnedatasplitter" />
              <div className="Medicine__data-body flex__container">
                <div className="Medicine__data-section">
                  <p>{medicineData.lifetimeSupply}</p>
                  <p>Lifetime Supply</p>
                </div>
                <div className="Medicine__data-section">
                  <p>{medicineData.lifetimeSales}</p>
                  <p>Lifetime Sales</p>
                </div>
                <div className="Medicine__data-section">
                  <p>{medicineData.inStock}</p>
                  <p>Stock Left</p>
                </div>
              </div>
            </div>
          </div>

          <div className="Medicine__data Medicine__data-b">
            <div className="Medicine__data-title">
              <p>How To Use</p>
            </div>
            <div className="medicnedatasplitter" />
            <div className="Medicine__data-description">
              <p>
                {medicineData.howToUse === "" ? "Unset" : medicineData.howToUse}
              </p>
            </div>
          </div>
          <div className="Medicine__data Medicine__data-b">
            <div className="Medicine__data-title">
              <p>Side Effects</p>
            </div>
            <div className="medicnedatasplitter" />
            <div className="Medicine__data-description">
              <p>
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
                  ) : confirmationMessage === true ? (
                    <p className="deletemessage">{deleteMessage}</p>
                  ) : (
                    <p>Are you sure you want to delete {medicineName} ?</p>
                  )}
                  {confirmationMessage === true ? (
                    <Link
                      to="/inventory/listofmeds"
                      style={{ textDecoration: "none" }}
                    >
                      <p
                        className="confirmbutton"
                        onClick={() => {
                          setDeleteModal(false);
                        }}
                      >
                        Cool
                      </p>
                    </Link>
                  ) : (
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
                  )}
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
              <p>Edit {medicineName}</p>
              <img
                src={Assets.Close}
                alt="Close button"
                onClick={() => handleModal("close")}
              />
            </div>
            <div className="edit__modal-input flex__container-v">
              <div className="loadingSpinner">
                {spinner === true ? <Spinner /> : null}
              </div>
              {editConfirmationModal === true ? (
                <div className="editConfirmed flex__container-v">
                  <img src={Assets.TickRound} alt="Success" />
                </div>
              ) : null}
              {errorEditConfirmationModal === true ? (
                <div className="editConfirmed flex__container-v">
                  <img src={Assets.CloudError} alt="Error" />
                </div>
              ) : null}
              <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <div className="flex__container medicineIdnGroup">
                    <input
                      type="text"
                      id="invincibleName"
                      defaultValue={medicineData.medicineName}
                      {...register("medicineName")}
                    />
                    <div>
                      <label htmlFor="medicineidinput">MedicineId</label>
                      <input
                        type="text"
                        id="medicineidinput"
                        className="medicineeditinput"
                        defaultValue={medicineData.medicineId}
                        {...register("medicineId")}
                      />
                    </div>
                    <div>
                      <label htmlFor="medicinegroupinput">Medicine Group</label>
                      <input
                        type="text"
                        id="medicinegroupinput"
                        className="medicineeditinput"
                        defaultValue={medicineData.groupName}
                        {...register("groupName")}
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
                        {...register("lifetimeSupply")}
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
                        {...register("lifetimeSales")}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="medicinehowtouseinput">How To Use</label>
                    <textarea
                      type="text"
                      id="medicinehowtouseinput"
                      className="medicineeditinput"
                      defaultValue={medicineData.howToUse}
                      {...register("howToUse")}
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
                      {...register("sideEffects")}
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
