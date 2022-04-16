import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { dataFlowContext } from "../../../../Pharmacy";
import { SectionName, RedButton } from "../../../../Components/Components";
import Assets from "../../../../../Assets/Assets";
import "./MedicineInfo.css";

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
    color: "#F0483E",
    icon: Assets.Trash,
    text: "Delete Medicine",
    delete: true,
  };

  return (
    <div className="Inventory__container ">
      <div className="Medicine__info-top ">
        <div className="flex__container">
          <SectionName title={title} />
          <RedButton buttonData={buttonData} />
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
            <div className="splitter" />
            <div className="Medicine__data-body flex__container">
              <div className="Medicine__data-section">
                <p className="p__poppins">298</p>
                <p className="p__poppins">Medicine ID</p>
              </div>
              <div className="Medicine__data-section">
                <p className="p__poppins">24</p>
                <p className="p__poppins">Medicine Group</p>
              </div>
            </div>
          </div>
          <div className="Medicine__data Medicine__data-a">
            <div className="Medicine__data-title flex__container">
              <p className="p__poppins">Inventory in Qty</p>
              <Link to="/medicinesupplier" className="flex__container">
                <p className="p__poppins">Send Stock Request</p>
                <img src={Assets.DirectionArrows} alt="Direction Arrows" />
              </Link>
            </div>
            <div className="splitter" />
            <div className="Medicine__data-body flex__container">
              <div className="Medicine__data-section">
                <p className="p__poppins">298</p>
                <p className="p__poppins">Lifetime Supply</p>
              </div>
              <div className="Medicine__data-section">
                <p className="p__poppins">298</p>
                <p className="p__poppins">Lifetime Sales</p>
              </div>
              <div className="Medicine__data-section">
                <p className="p__poppins">08</p>
                <p className="p__poppins">Stock Left</p>
              </div>
            </div>
          </div>
        </div>

        <div className="Medicine__data Medicine__data-b">
          <div className="Medicine__data-title">
            <p className="p__poppins">How To Use</p>
          </div>
          <div className="splitter" />
          <div className="Medicine__data-description">
            <p className="p__poppins">
              Take this medication by mouth with or without food as directed by
              your doctor, usually once daily.
            </p>
          </div>
        </div>
        <div className="Medicine__data Medicine__data-b">
          <div className="Medicine__data-title">
            <p className="p__poppins">Side Effects</p>
          </div>
          <div className="splitter" />
          <div className="Medicine__data-description">
            <p className="p__poppins">
              Dizziness, lightheadedness, drowsiness, nausea, vomiting,
              tiredness, excess saliva/drooling, blurred vision, weight gain,
              constipation, headache, and trouble sleeping may occur. If any of
              these effects persist or worsen, consult your doctor.
            </p>
          </div>
        </div>
      </div>
      <div className="deleteMedicine">
        <RedButton buttonData={buttonData2} />
      </div>
    </div>
  );
};

export default MedicineInfo;
