import React, { useContext, useEffect, useState } from "react";
import "./Groups.css";
import { RedButton, SectionName } from "../../../Components/Components";
import { dataFlowContext } from "../../../Pharmacy";
import Assets from "../../../../Assets/Assets";
import SingleGroup from "./SingleGroups/SingleGroup";
import { Link } from "react-router-dom";

const Groups = () => {
  const incomingData = useContext(dataFlowContext);
  const groupList = incomingData.groupsList;
  const { noOfGroups } = useContext(dataFlowContext);

  const [filteredGroupsList, setFilteredGroupsList] = useState([]);

  useEffect(() => {
    setFilteredGroupsList(groupList);
  }, []);

  const title = {
    main: "Medicine Groups",
    sub: "List of medicines groups",
    complex: "level1",
    source: "Inventory",
    meds: noOfGroups,
  };
  const buttonData = {
    color: "#F0483E",
    text: "Add New Group",
    icon: Assets.Plus,
  };

  const searchOnInputChange = (e) => {
    const searchValue = e.target.value.toLowerCase();
    const filteredList = groupList.filter((group) =>
      group.groupName.toLowerCase().includes(searchValue)
    );
    setFilteredGroupsList(filteredList);
  };

  return (
    <div className="Inventory__container ">
      <div className="Group__container-top flex__container">
        <SectionName title={title} />
        <Link
          to="/inventory/medicinegroups/addnewgroup"
          style={{ textDecoration: "none" }}
        >
          <RedButton buttonData={buttonData} />
        </Link>
      </div>
      <div className="search">
        <input
          type="search"
          name="SearchMedicineGroups"
          placeholder="Search Medicine Groups..."
          onChange={searchOnInputChange}
        />
        <img src={Assets.Search} alt="Search Icon" />
      </div>
      <div className="Group__container">
        <div className="Group__container-titles flex__container">
          <div>
            <p className="p__poppins">Group Name</p>
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
        <div className="titleseparator" />
        {filteredGroupsList.map((data, index) => (
          <SingleGroup data={data} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Groups;
