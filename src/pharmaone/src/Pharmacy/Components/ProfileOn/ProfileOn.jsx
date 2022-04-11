import React from "react";
import "./ProfileOn.css";
import Assets from "../../../Assets/Assets";

/*This Component will contain links to profile section and log out page 
using react router to render them components
*/

const ProfileOn = () => {
  return (
    <div className="Profile__on flex__container-v">
      <div className=" section Myprofile flex__container">
        <img src={Assets.Profile} alt="Profile icon" />
        <p className="p__poppins">My Profile</p>
      </div>
      <div />
      <div className=" section Logout flex__container">
        <img src={Assets.Logout} alt="Log Out" />
        <p className="p__poppins">Logout</p>
      </div>
    </div>
  );
};

export default ProfileOn;
