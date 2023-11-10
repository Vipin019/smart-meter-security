import React from "react";
import MeterCard from "./meterCard";
import Navbar from "./navbar";

const Data = ({ updatedData }) => {
  return (
    <div>
      <Navbar />
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
