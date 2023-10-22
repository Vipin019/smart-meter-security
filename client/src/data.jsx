import React, { useState, useEffect } from "react";

const Data = () => {
  const [updatedData, setUpdatedData] = useState({
    current: 0,
    voltage: 0,
  });
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");

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
      <h2>Smart Meter Reading</h2>
      {updatedData && (
        <div>
          Current: {updatedData.current} and Voltage: {updatedData.voltage}
        </div>
      )}
    </div>
  );
};

export default Data;
