import React, { useEffect, useState } from "react";
import "./home.css";
import SmartMeter from "../smart-meter.png";

const Home = ({ updatedData }) => {
  const [dispData, setDispData] = useState("DIAPLAY");
  const [count, setCount] = useState(0);
  const [i, setI] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      if (i === 0) {
        setDispData("Vrms: " + updatedData.vrms + "V");
        setI(i + 1);
      } else if (i === 1) {
        setDispData("Irms: " + updatedData.irms + "A");
        setI(i + 1);
      } else if (i === 2) {
        setDispData("A P: " + updatedData.apparentPower + "VA");
        setI(i + 1);
      } else if (i === 3) {
        setDispData("R P: " + updatedData.realPower + "W");
        setI(i + 1);
      } else if (i === 4) {
        setDispData("KWh: " + updatedData.kwh + "kwh");
        setI(i + 1);
      } else {
        setI(0);
      }
      setCount(count + 1);
    }, 1000);

    //Clearing the interval
    return () => clearInterval(interval);
  }, [count]);
  return (
    <div className="home">
      <div className="home__heading">
        <h1>SMART ENERGY METER</h1>
      </div>
      <img src={SmartMeter} alt="Smart Meter"></img>
      <div className="home__display">
        <h6>{dispData}</h6>
      </div>
      <div className="home__indicator">
        <small className="home__indicator--1"></small>
        <small className="home__indicator--2"></small>
        <small className="home__indicator--3"></small>
      </div>
    </div>
  );
};

export default Home;
