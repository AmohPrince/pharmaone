import React from "react";
import "./Configuration.css";
import { SectionName } from "../../Components/Components";
import Assets from "../../../Assets/Assets";

const Configuration = () => {
  const title = {
    main: "Configurations",
    sub: "Configure your pharmacy application.",
  };
  return (
    <div className="Inventory__container">
      <SectionName title={title} />
      <div className="Configuration__mid flex__container">
        <div className="Configuration__branding Configuration__container ">
          <div className="Configuration__container-top flex__container">
            <p className="p__poppins">Branding</p>
            <img src={Assets.PenBlue} alt="Edit" />
          </div>
          <div className="Configuration__container-splitter" />
          <div className="Configuration__container-bottom flex__container">
            <div className="Container__bottom-left">
              <p className="p__poppins">Enter Name</p>
              <p className="p__poppins">Pharmacy Name</p>
            </div>
            <div className="Container__bottom-right">
              <p className="p__poppins">PH349TY228</p>
              <p className="p__poppins">Pharmacy ID</p>
            </div>
          </div>
        </div>
        <div className="Configuration__Owner Configuration__container ">
          <div className="Configuration__container-top flex__container">
            <p className="p__poppins">Owner</p>
            <img src={Assets.PenBlue} alt="Edit" />
          </div>
          <div className="Configuration__container-splitter" />
          <div className="Configuration__container-bottom flex__container">
            <div className="Container__bottom-left">
              <p className="p__poppins">Enter Name</p>
              <p className="p__poppins">Owner Name</p>
            </div>
            <div className="Container__bottom-right">
              <p className="p__poppins">user@mail.com</p>
              <p className="p__poppins">Email ID</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Configuration;
