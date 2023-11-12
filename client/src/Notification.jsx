import React from "react";
import Data from "./data";
import Navbar from "./navbar";
import "./notification.css";
import UserInfoCard from "./Components/UserInfoCard";
import Warning from "./Components/Warning";

const Notification = ({
  updatedNotification,
  updatedData,
  warning,
  handleOnWarningChange,
  audioRef,
}) => {
  // sound will only be played only when it is permited by browser
  //setting>>privacy and security>>additional content setting>>sound>>add site for Allowed to play sound
  return (
    <>
      <Navbar left={"Home"} mid={"Centrilized System"} right={"User Mode"} />
      <div className="notification">
        <div className="notification-container">
          <UserInfoCard />
          <div className="notification-box">
            <h6 className="notification-heading">Connection And Security</h6>
            {!updatedNotification && (
              <>
                <p>Status: {"Connected and secure"}</p>
                <p>Warning: {"No warning found"}</p>
                <p>Problem: {"No Problem found"}</p>
                <p>Message From Meter: {"Hi, I am Fine."}</p>
                <p>Security Status: {"No vulnerability found"}</p>
                <p>Security Warning: {"No security warning"}</p>
              </>
            )}
            {updatedNotification && (
              <div className="notification-message">
                <p>Status: {"Connected but not secure"}</p>
                <p>Warning: {"Security warning found"}</p>
                <p>Problem: {"Security found"}</p>
                <p>
                  Message From Meter:{" "}
                  {"An External IP Address" +
                    updatedNotification?.message +
                    " Is Connected"}
                </p>
                <p>Security Status: {"Vulnerability found"}</p>
                <p>Security Warning: {"Trying to get the data"}</p>
                <p>External IP Address:{updatedNotification?.message}</p>
              </div>
            )}
          </div>
        </div>
        <div className="data-container">
          <Data updatedData={updatedData} url={"/admin"} />
        </div>
      </div>
      <div className="Home__warning">
        <Warning
          warning={warning}
          handleOnWarningChange={handleOnWarningChange}
          audioRef={audioRef}
        />
      </div>
    </>
  );
};

export default Notification;
