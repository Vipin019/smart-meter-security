import React, { useState, useEffect } from "react";
import MeterCard from "./meterCard";

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
      <h1>
        <u>Smart Meter Dashboard</u>
      </h1>
      {updatedData && (
        // contributed by Prince Kumar (20UEE05)
        <div className="meter-container">
          <MeterCard title="Voltage (V)" value={updatedData.vrms} />
          <MeterCard title="Current (A)" value={updatedData.irms} />
          <MeterCard title="Real Power (W)" value={updatedData.realPower} />
          <MeterCard
            title="Apparent Power (VA)"
            value={updatedData.apparentPower}
          />
          <MeterCard title="Energy Consume (KWh)" value={updatedData.kwh} />
        </div>
      )}
    </div>
  );
};

export default Data;
