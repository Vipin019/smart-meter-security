import React from "react";
import MeterCard from "./meterCard";
import "./data.css";
import Navbar from "./navbar";
import UserInfoCard from "./Components/UserInfoCard";

const Data = ({ updatedData, url }) => {
  return (
    <>
      {url === "/admin" ? (
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
      ) : (
        <>
          <Navbar left={"Home"} mid={"My Smart Meter"} right={"Admin Mode"} />
          <div className="data__main">
            <div className="data__main--userInfo">
              <UserInfoCard />
            </div>
            <div className="data">
              <h6>Smart Meter Real Time Data</h6>
              {updatedData && (
                <div className="meter-container" id="data__container">
                  <MeterCard title="Voltage (V)" value={updatedData.vrms} />
                  <MeterCard title="Current (A)" value={updatedData.irms} />
                  <MeterCard
                    title="Real Power (W)"
                    value={updatedData.realPower}
                  />
                  <MeterCard
                    title="Apparent Power (VA)"
                    value={updatedData.apparentPower}
                  />
                  <MeterCard
                    title="Energy Consume (KWh)"
                    value={updatedData.kwh}
                  />
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Data;
