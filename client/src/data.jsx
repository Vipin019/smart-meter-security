import React from "react";
import MeterCard from "./meterCard";

const Data = ({ updatedData }) => {
  return (
    <div>
      <h1>
        <u>Smart Meter Real Time Data</u>
      </h1>
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
