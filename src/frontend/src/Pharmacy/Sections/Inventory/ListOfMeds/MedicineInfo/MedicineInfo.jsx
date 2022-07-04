import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { dataFlowContext } from "../../../../Pharmacy";
import { SectionName, RedButton } from "../../../../Components/Components";
import Assets from "../../../../../Assets/Assets";
import "./MedicineInfo.css";
import { useForm } from "react-hook-form";
import { useUpdateLogger } from "../../../../Utilities/Updatelogger";
/**
 * This component takes a param from the url that i will use to fetch data
 * from the server
 * For now i might have to hard code the data.
 * @returns
 */

const MedicineInfo = () => {
  let params = useParams();
  let { getSpecificMedicineWithId, setOverlay, setLoading } =
    useContext(dataFlowContext);

  const [medicineName, setMedicineName] = useState(" ");
  const fetchMedicineName = () => {
    const data = getSpecificMedicineWithId(params.medicineId);
    setMedicineName(data.medicineName);
  };

  const [medicineData, setMedicineData] = useState([]);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const { register, handleSubmit } = useForm();

  let navigate = useNavigate();

  useUpdateLogger(medicineData);

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

  const showEditModal = () => {
    setEditModal(true);
    setOverlay(true);
  };
  const closeEditModal = () => {
    setEditModal(false);
    setOverlay(false);
  };

  const showDeleteModal = () => {
    setDeleteModal(true);
    setOverlay(true);
  };
  const closeDeleteModal = () => {
    setDeleteModal(false);
    setOverlay(false);
  };

  const fetchMedicineData = () => {
    setLoading(true);
    fetch(
      `${process.env.REACT_APP_API_ROOT_URL}/getsinglemedicine/${params.medicineId}`
    )
      .then((res) => res.json())
      .then((data) => {
        setMedicineData(data);
        setLoading(false);
      });
  };

  //Put
  const onUpdate = (data) => {
    console.log(data);
    closeEditModal();
    setLoading(true);
    fetch(
      `${process.env.REACT_APP_API_ROOT_URL}/modifymedicine/${data.medicineId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((res) => res.text())
      .then((message) => {
        console.log(message);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //Delete
  const onDelete = () => {
    const editingId = params.medicineId;
    const editingObject = {
      medicineId: editingId,
    };
    closeDeleteModal();
    setLoading(true);
    fetch(
      `${process.env.REACT_APP_API_ROOT_URL}/deletemedicine/${params.medicineId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editingObject),
      }
    )
      .then((res) => res.text())
      .then((message) => {
        console.log(message);
        setLoading(false);
        navigate("/inventory/listofmedicines");
      });
  };

  useEffect(() => {
    fetchMedicineData();
    fetchMedicineName();
  }, []);

  return (
    <>
      <div className="padding-around Medicine__info-container ">
        <div className="Medicine__info-top ">
          <div className="flex">
            <SectionName title={title} />
            <div className="editmedicinebutton" onClick={showEditModal}>
              <RedButton buttonData={buttonData} />
            </div>
          </div>
          <div
            className="Topbar__input flex"
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
          <div className="flex">
            <div className="Medicine__data Medicine__data-a ">
              <div className="Medicine__data-title">
                <p>Medicine</p>
              </div>
              <div className="medicnedatasplitter" />
              <div className="Medicine__data-body flex">
                <div className="Medicine__data-section">
                  <p>{medicineData.medicineId}</p>
                  <p>Medicine ID</p>
                </div>
                <div className="Medicine__data-section">
                  {medicineData.medicineGroup === undefined ? (
                    <p> </p>
                  ) : (
                    <p>{medicineData.medicineGroup.groupName}</p>
                  )}
                  <p>Medicine Group</p>
                </div>
              </div>
            </div>
            <div className="Medicine__data Medicine__data-a">
              <div className="Medicine__data-title flex">
                <p>Inventory in Qty</p>
                <Link
                  to="/medicinesupplier"
                  className="flex"
                  style={{ textDecoration: "none" }}
                >
                  <p className="p__poppins sendStockRequest">
                    Send Stock Request
                  </p>
                  <img src={Assets.DirectionArrows} alt="Direction Arrows" />
                </Link>
              </div>
              <div className="medicnedatasplitter" />
              <div className="Medicine__data-body flex">
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
          {deleteModal && (
            <div className="deletemodal">
              <form onSubmit={handleSubmit(onDelete)}>
                <div className="deletemodal__container flex-v">
                  <img
                    src={Assets.Close}
                    alt="Close Icon"
                    onClick={closeDeleteModal}
                  />
                  <img src={Assets.Danger} alt="Danger" />
                  <p>Are you sure you want to delete {medicineName} ?</p>
                  <div className="choices flex__container">
                    <input type="submit" value="Yes, Delete" />
                    <p
                      onClick={() => {
                        setDeleteModal(false);
                        setOverlay(false);
                      }}
                    >
                      Cancel
                    </p>
                  </div>
                </div>
              </form>
            </div>
          )}
          <div onClick={showDeleteModal}>
            <RedButton buttonData={buttonData2} />
          </div>
        </div>
        {editModal && (
          <div className="edit__modal">
            <div className="edit__modal-header flex">
              <p>Edit {medicineName}</p>
              <img
                src={Assets.Close}
                alt="Close button"
                onClick={closeEditModal}
              />
            </div>
            <div className="edit__modal-input flex-v">
              <form onSubmit={handleSubmit(onUpdate)}>
                <div>
                  <div className="flex medicineIdnGroup">
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
                        defaultValue={
                          medicineData.medicineGroup === undefined
                            ? ""
                            : medicineData.medicineGroup.groupName
                        }
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
        )}
      </div>
    </>
  );
};

export default MedicineInfo;
