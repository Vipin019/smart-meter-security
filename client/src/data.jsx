import React from "react";
import MeterCard from "./meterCard";
import "./data.css";

const Data = ({ updatedData }) => {
  return (
    <div className="data">
      <h6>Smart Meter Real Time Data</h6>
      {updatedData && (
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
