import React from "react";
import "./userInfoCard.css";

const UserInfoCard = () => {
  return (
    <div className="userInfo">
      <h6>User Information</h6>
      <p>User Name: {"Raman Kumar"}</p>
      <p>User ID: {"Raman123@"}</p>
      <p>Meter ID: {"djdfh54"}</p>
      <p>Current balance: {"Rs. 1200"}</p>
    </div>
  );
};

export default UserInfoCard;
