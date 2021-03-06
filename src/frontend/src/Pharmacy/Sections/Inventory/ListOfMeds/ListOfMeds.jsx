import React, { useContext, useEffect, useState } from "react";
import "./ListOfMeds.css";
import { SectionName, RedButton } from "../../../Components/Components";
import { dataFlowContext } from "../../../Pharmacy";
import Assets from "../../../../Assets/Assets";
import SingleMedicine from "./SingleMedicine/SingleMedicine";
import { Link } from "react-router-dom";

/**
 * This component will have some form of fetch that will pull data
 * i think use effect
 * @returns List of medicine
 */

const ListOfMeds = () => {
  const { groupNames, medicineList } = useContext(dataFlowContext);
  const [filteredMedicineList, setFilteredMedicineList] = useState([]);
  const [beginIndex, setBeginIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(6);
  const [buttonLeftDisabled, setButtonLeftDisabled] = useState(false);
  const [buttonRightDisabled, setButtonRightDisabled] = useState(false);

  const title = {
    main: "List of medicines",
    sub: "List of medicines available for sales",
    complex: "level1",
    source: "Inventory",
    meds: medicineList.length,
  };

  useEffect(() => {
    filterMedicineList();
  }, [[], beginIndex, endIndex]);

  useEffect(() => {
    handleDisablingButtons();
  }, [beginIndex, []]);

  const filterMedicineList = () => {
    setFilteredMedicineList(medicineList.slice(beginIndex, endIndex));
  };

  const [selectedGroupValue, setSelectedGroupValue] = useState();

  const filterOnSelectChange = () => {
    if (selectedGroupValue === undefined) {
      return null;
    } else {
      console.log(medicineList);
      const filteredGroupMedicineList = medicineList.filter((medicine) => {
        if (medicine.medicineGroup === null) {
          return;
        } else {
          return medicine.medicineGroup.groupName === selectedGroupValue;
        }
      });
      setFilteredMedicineList(filteredGroupMedicineList);
    }
  };

  useEffect(() => {
    filterOnSelectChange();
  }, [selectedGroupValue]);

  const filterOnSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    const visibleMedicines = medicineList.filter((medicine) =>
      medicine.medicineName.toLowerCase().includes(searchValue)
    );
    setFilteredMedicineList(visibleMedicines);
  };

  const switchPage = (direction) => {
    if (direction === "back") {
      setBeginIndex((prevIndex) => prevIndex - 6);
      setEndIndex((prevIndex) => prevIndex - 6);
    } else {
      setEndIndex((prevIndex) => prevIndex + 6);
      setBeginIndex((prevIndex) => prevIndex + 6);
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

  const buttonData = {
    color: "#F0483E",
    text: "Add New Item",
    icon: Assets.Plus,
  };

  const handleSort = (sortBy) => {
    const compareFunction = (a, b) => {
      if (a[sortBy] < b[sortBy]) {
        return -1;
      }
      if (a[sortBy] > b[sortBy]) {
        return 1;
      }
      return 0;
    };
    setFilteredMedicineList((prevFilteredMedicineList) => {
      const copyOfPrevFilteredMedicineList = [...prevFilteredMedicineList];
      copyOfPrevFilteredMedicineList.sort(compareFunction);
      return copyOfPrevFilteredMedicineList;
    });
  };

  return (
    <div className="list-of-medicine padding-around flex-v">
      <div className="Inventory__container-top flex">
        <SectionName title={title} />
        <Link
          to="/Inventory/listofmeds/addnewmedicine"
          style={{ textDecoration: "none" }}
        >
          <RedButton buttonData={buttonData} />
        </Link>
      </div>
      <div className="Inventory__container-mid flex">
        <div className="search">
          <input
            type="search"
            name="SearchMedicineInventory"
            className="search-input"
            placeholder="Search Medicine Inventory.."
            onChange={(e) => {
              filterOnSearch(e);
            }}
          />
          <img src={Assets.Search} alt="Search Icon" />
        </div>
        <div className="SearchMed flex">
          <img src={Assets.Filter} alt="Filter Icon" />
          <select
            name="selectmedgroup"
            id="selectmedgroup"
            value={selectedGroupValue}
            onChange={(e) => {
              setSelectedGroupValue(e.target.value);
            }}
          >
            <option hidden>-Select Group-</option>
            {groupNames.map((group, index) => {
              return (
                <option value={group} key={index}>
                  {group}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className="Inventory__container-bottom">
        <div className="Inventory__container-titles flex">
          <div
            onClick={() => {
              handleSort("medicineName");
            }}
          >
            <p>Medicine Name</p>
            <img src={Assets.TopBottomArrows} alt="Arrows" />
          </div>
          <div
            onClick={() => {
              handleSort("medicineId");
            }}
          >
            <p>Medicine ID</p>
            <img src={Assets.TopBottomArrows} alt="Arrows" />
          </div>
          <div
            onClick={() => {
              handleSort("groupName");
            }}
          >
            <p>Group Name</p>
            <img src={Assets.TopBottomArrows} alt="Arrows" />
          </div>
          <div
            onClick={() => {
              handleSort("inStock");
            }}
          >
            <p>Stock in Qty</p>
            <img src={Assets.TopBottomArrows} alt="Arrows" />
          </div>
          <div>
            <p>Action</p>
          </div>
        </div>
        <div className="containersplitter" />
        <div className="Inventory__container-body">
          {filteredMedicineList.map((data) => (
            <SingleMedicine data={data} key={data.medicineId} />
          ))}
        </div>
      </div>
      <div className="listofmeds__footer flex">
        <p>
          Showing {beginIndex + 1} - {beginIndex + 6} results of{" "}
          {medicineList.length}
        </p>
        <div className="listofmeds__footer-pageswitch flex">
          <button
            onClick={() => switchPage("back")}
            disabled={buttonLeftDisabled}
          >
            {buttonLeftDisabled ? (
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
            {buttonRightDisabled ? (
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
