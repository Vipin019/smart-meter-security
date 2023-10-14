import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";

const SocketClient = () => {
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
      <h2>Socket.io Client</h2>
      {updatedData && <div>Received updated data: {updatedData.message}</div>}
    </div>
  );
};

export default SocketClient;
