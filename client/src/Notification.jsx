import React, { useEffect, useRef } from "react";
import Data from "./data";
import audioFile from "../src/security-alarm-80493.mp3";

const Notification = ({ updatedNotification, updatedData }) => {
  // sound will only be played only when it is permited by browser
  //setting>>privacy and security>>additional content setting>>sound>>add site for Allowed to play sound
  return (
    <div className="notification-container">
      <div className="data-container">
        <Data updatedData={updatedData} />
      </div>
      <div className="notification-box">
        <h1 className="notification-heading">
          Notification Page - Centralized server for Monitoring Team
        </h1>
        {updatedNotification && (
          <div className="notification-message">
            Notification Received: {updatedNotification.message}
            <audio autoPlay loop>
              <source src={audioFile} type="audio/mp3" />
              Your browser does not support the audio element.
            </audio>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notification;
