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
    <div>
      <h2>Notification Page - Centralized server for Monitoring Team</h2>
      {updatedData && <div>Notification Received: {updatedData.message}</div>}
    </div>
  );
};

export default Notification;

// const [socket, setSocket] = useState(null);
// const [updatedData, setUpdatedData] = useState(null);

// useEffect(() => {
//   const socket = socketIOClient("ws://localhost:8080");
//   setSocket(socket);

//   socket.on("updated_data", (data) => {
//     console.log(data);
//     setUpdatedData(data);
//   });

//   return () => {
//     socket.disconnect();
//   };
// }, []);
