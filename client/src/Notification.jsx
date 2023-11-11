import React from "react";
import Data from "./data";
import audioFile from "../src/security-alarm-80493.mp3";
import Navbar from "./navbar";
import "./notification.css";

const Notification = ({ updatedNotification, updatedData }) => {
  // sound will only be played only when it is permited by browser
  //setting>>privacy and security>>additional content setting>>sound>>add site for Allowed to play sound
  return (
    <>
      <Navbar left={"Home"} mid={"Centrilized System"} right={"All Users"} />
      <div className="notification">
        <div className="notification-container">
          <div className="userInfo">
            <h6>User Information</h6>
            <p>User Name: {"Raman Kumar"}</p>
            <p>User ID: {"Raman123@"}</p>
            <p>Meter ID: {"djdfh54"}</p>
            <p>Current balance: {"Rs. 1200"}</p>
          </div>
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
                <audio autoPlay loop>
                  <source src={audioFile} type="audio/mp3" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            )}
          </div>
        </div>
        <div className="data-container">
          <Data updatedData={updatedData} />
        </div>
      </div>
    </>
  );
};

export default Notification;
