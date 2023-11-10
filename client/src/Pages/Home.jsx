import React from "react";
import "./home.css";
import SmartMeter from "../smart-meter.png";

const Home = ({ updatedData }) => {
  return (
    <div className="home">
      <div className="home__heading">
        <h1>SMART ENERGY METER</h1>
      </div>
      <img src={SmartMeter} alt="Smart Meter"></img>
      <div className="home__display">
        <h6>DISPLAY</h6>
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
