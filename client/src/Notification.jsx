import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";

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
    <div>
      <h2>Notification Page - Centralized server for Monitoring Team</h2>
      {updatedData && <div>Notification Received: {updatedData.message}</div>}
    </div>
  );
};

export default Notification;
