import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";

const Data = () => {
  const [socket, setSocket] = useState(null);
  const [val, setVal] = useState(1);
  const [updatedData, setUpdatedData] = useState({
    current: 0,
    voltage: 0,
  });
  useEffect(() => {
    const socket = socketIOClient("http://localhost:8081");
    setSocket(socket);

    socket.on("updated_data", (data) => {
      setUpdatedData(data);
    });

    return () => {
      socket.disconnect();
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
