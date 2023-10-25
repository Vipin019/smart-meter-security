import React, { useState, useEffect } from "react";

const Data = () => {
  const [updatedData, setUpdatedData] = useState({
    vrms: 0,
    irms: 0,
    apparentPower: 0,
    realPower: 0,
    kwh: 0,
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
          <p>Voltage: {updatedData.vrms} and Currrent: {updatedData.irms}</p>
          <p>Real Power: {updatedData.realPower} and Apparent Powet: {updatedData.apparentPower}  Kwh: {updatedData.kwh}</p>

        </div>
      )}
    </div>
  );
};

export default Data;

// import React, { useState, useEffect } from 'react';
// import WebSocket from 'react-websocket';

// function App() {
//   const [pinsData, setPinsData] = useState({pin1: 0, pin2: 0});

//   const handleData = (data) => {
//     // Data received from WebSocket
//     const jsonData = JSON.parse(data);
//     setPinsData(jsonData);
//   };

//   useEffect(() => {
//     // Connect to WebSocket
//     const ws = new WebSocket('ws://YOUR_ESP32_IP:81/'); // Replace with your ESP32 IP

//     return () => {
//       // Clean up WebSocket connection when component unmounts
//       ws.close();
//     };
//   }, []);

//   return (
//     <div className="App">
//       <h1>Pins Data</h1>
//       <p>Pin 1: {pinsData.pin1}</p>
//       <p>Pin 2: {pinsData.pin2}</p>
//     </div>
//   );
// }

// export default App;
