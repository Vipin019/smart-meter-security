import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import Data from "./data";

const Notification = () => {
  const [socket, setSocket] = useState(null);
  const [updatedData, setUpdatedData] = useState(null);

  useEffect(() => {
    const socket = socketIOClient("http://localhost:8080");
    setSocket(socket);

    socket.on("updated_data", (data) => {
      console.log(data);
      setUpdatedData(data);
    });

    return () => {
      socket.disconnect();
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
