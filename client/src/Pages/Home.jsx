import React, { useEffect, useState } from "react";
import "./home.css";
import SmartMeter from "../smart-meter.png";
import audioFile from "../smart meter.mp3";
import Navbar from "../navbar";

const Home = ({
  updatedData,
  updatedNotification,
  power,
  homeIndicator1,
  connectAndThreat,
  load,
  lcd,
}) => {
  const [dispData, setDispData] = useState("");
  const [count, setCount] = useState(0);

  const [i, setI] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      if (updatedData?.vrms != 0) {
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
      } else {
        setDispData("");
      }
      setCount(count + 1);
    }, 1500);

    //Clearing the interval
    return () => clearInterval(interval);
  }, [count]);
  return (
    <div className="home">
      {/* <div className="home__heading"> */}
      {/* <h1>SMART ENERGY METER</h1> */}
      <Navbar left={"Admin"} mid={"SMART ENERGY METER"} right={"User"} />
      {/* </div> */}
      <img src={SmartMeter} alt="Smart Meter"></img>
      <div className={lcd}>
        <h6>{dispData}</h6>
      </div>
      <div className="home__indicator">
        {/* power indicator */}
        <div className="home__indicator__1--1">
          <div className={homeIndicator1}>
            <small className="home__indicator--1" id={power}></small>
          </div>
        </div>
        {/* connection estiblished and no threat */}
        <small className="home__indicator--2" id={connectAndThreat}></small>
        {/* load appplied */}
        <small className="home__indicator--3" id={load}></small>
      </div>
      {updatedNotification && (
        <audio autoPlay loop>
          <source src={audioFile} type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
      )}
    </div>
  );
};

export default Home;
