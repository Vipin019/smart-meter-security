import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";

const Notification = () => {
  const [updatedData, setUpdatedData] = useState(null);
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8081");

    socket.onopen = function () {
      console.log("Connection is open");
    };

    socket.onmessage = function (event) {
      const jsonData = JSON.parse(event.data);
      setUpdatedData(jsonData);
    };

    return () => {
      socket.close();
    };
  }, []);

  return (
    <div className="notification-container">
      <div className="data-container">
        <Data/>
      </div>
      <div  className="notification-box">
        <h1  className="notification-heading">Notification Page - Centralized server for Monitoring Team</h1>
        {updatedData && <div className="notification-message">Notification Received: {updatedData.message}</div>}
      </div>
    </div>
  );
};

export default Notification;
