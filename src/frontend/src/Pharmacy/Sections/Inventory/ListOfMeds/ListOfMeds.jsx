import React, { useContext, useEffect, useState } from "react";
import "./ListOfMeds.css";
import { SectionName, RedButton } from "../../../Components/Components";
import { dataFlowContext } from "../../../Pharmacy";
import Assets from "../../../../Assets/Assets";
import SingleMedicine from "./SingleMedicine/SingleMedicine";
import { Link } from "react-router-dom";
import { Spinner } from "../../../Components/Components";

/**
 * This component will have some form of fetch that will pull data
 * i thinl useeffect
 * @returns List of medicine
 */

const ListOfMeds = () => {
  const incomingData = useContext(dataFlowContext);
  const groupNames = incomingData.groupNames;
  const medicineList = incomingData.medicineList;
  const medicineListLength = medicineList.length;
  const [filteredMedicineList, setFilteredMedicineList] = useState([]);
  const [beginIndex, setBeginIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(8);
  const [buttonLeftDisabled, setButtonLeftDisabled] = useState(false);
  const [buttonRightDisabled, setButtonRightDisabled] = useState(false);

  useEffect(() => {
    filterMedicineList();
  }, [medicineListLength, beginIndex, endIndex]);

  useEffect(() => {
    handleDisablingButtons();
  }, [beginIndex, []]);

  const filterMedicineList = () => {
    setFilteredMedicineList(medicineList.slice(beginIndex, endIndex));
  };

  const switchPage = (direction) => {
    if (direction === "back") {
      setBeginIndex((prevIndex) => prevIndex - 8);
      setEndIndex((prevIndex) => prevIndex - 8);
    } else {
      setEndIndex((prevIndex) => prevIndex + 8);
      setBeginIndex((prevIndex) => prevIndex + 8);
    }
    handleDisablingButtons();
  };

  const handleDisablingButtons = () => {
    if (beginIndex <= 0) {
      setButtonLeftDisabled(true);
    }
    if (beginIndex > 0) {
      setButtonLeftDisabled(false);
    }
    if (endIndex >= medicineList.length) {
      setButtonRightDisabled(true);
    }
    if (endIndex < medicineList.length) {
      setButtonRightDisabled(false);
    }
  };

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
        <Link
          to="/Inventory/listofmeds/addnewmedicine"
          style={{ textDecoration: "none" }}
        >
          <RedButton buttonData={buttonData} />
        </Link>
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
          />
          <img src={Assets.Search} alt="Search Icon" />
        </div>
        <div className="SearchMed flex__container">
          <img src={Assets.Filter} alt="Filter Icon" />
          <select name="selectmedgroup" id="selectmedgroup">
            <option value="" defaultValue hidden>
              -Select Group-
            </option>
            {groupNames.map((group) => {
              return (
                <option value={group} key={group.id}>
                  {group}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className="Inventory__container-bottom">
        <div className="Inventory__container-titles flex__container">
          <div>
            <p>Medicine Name</p>
            <img src={Assets.TopBottomArrows} alt="Arrows" />
          </div>
          <div>
            <p>Medicine ID</p>
            <img src={Assets.TopBottomArrows} alt="Arrows" />
          </div>
          <div>
            <p>Group Name</p>
            <img src={Assets.TopBottomArrows} alt="Arrows" />
          </div>
          <div>
            <p>Stock in Qty</p>
            <img src={Assets.TopBottomArrows} alt="Arrows" />
          </div>
          <div>
            <p>Action</p>
          </div>
        </div>
        <div className="containersplitter" />
        <div className="Inventory__container-body">
          {medicineList.length === 0 ? (
            <Spinner context="spinner__wrapper" />
          ) : (
            filteredMedicineList.map((data) => {
              return <SingleMedicine data={data} key={data.medicineId} />;
            })
          )}
        </div>
      </div>
      <div className="listofmeds__footer flex__container">
        <p>
          Showing {beginIndex + 1} -{" "}
          {endIndex > medicineListLength ? medicineListLength : endIndex}{" "}
          results of {medicineListLength}
        </p>
        <div className="listofmeds__footer-pageswitch flex__container">
          <button
            onClick={() => switchPage("back")}
            disabled={buttonLeftDisabled}
          >
            {buttonLeftDisabled === true ? (
              <img src={Assets.PageSwitcherLeftDisabled} alt="Change Page" />
            ) : (
              <img src={Assets.PageSwitcherLeft} alt="Change Page" />
            )}
          </button>

          <select name="pageswitch" id="pageswitch">
            <option value="Jan2022">Page 1</option>
            <option value="Feb2022">Page 2</option>
            <option value="Mar2022">Page 3</option>
          </select>

          <button
            onClick={() => switchPage("front")}
            disabled={buttonRightDisabled}
          >
            {buttonRightDisabled === true ? (
              <img src={Assets.PageSwitcherRightDisabled} alt="Change Page" />
            ) : (
              <img src={Assets.PageSwitcher} alt="Change Page" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListOfMeds;
