import React from "react";
import Assets from "../../../../../../Assets/Assets";
import "./SearchItem.css";

const SearchItem = ({ medicineNames }) => {
  return (
    <div className="flex search-item space-between">
      <p>{medicineNames}</p>
      <img src={Assets.PlusTwo} alt="Plus" className="cursor" />
    </div>
  );
};

export default SearchItem;
