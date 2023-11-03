import React, { useState, useEffect, useRef } from "react";
import Data from "./data";
import audioFile from "../src/security-alarm-80493.mp3";

const Notification = () => {
  const audioRef = useRef(null);
  const [updatedData, setUpdatedData] = useState(null);

  useEffect(() => {
    const socket = new WebSocket("ws://192.168.9.152:8080");

    socket.onopen = function () {
      console.log("Connection is open");
    };

    socket.onmessage = function (event) {
      const jsonData = JSON.parse(event.data);
      setUpdatedData(jsonData);
      if (jsonData && updatedData && updatedData.message && audioRef && audioRef.current) {
        audioRef.current.play();
      } else if (audioRef && audioRef.current) {
        audioRef.current.pause();
      }
    };
    return () => {
      socket.close();
    };
  }, []);

  return (
    <div className="notification-container">
      <div className="notification-box">
        <h1 className="notification-heading">
          Notification Page - Centralized server for Monitoring Team
        </h1>
        {updatedData && (
          <div className="notification-message">
            Notification Received: {updatedData.message}
          </div>
        )}
        <audio ref={audioRef} loop>
          <source src={audioFile} type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
      </div>
      <div className="data-container">
        <Data />
      </div>
    </div>
  );
};

export default Notification;
