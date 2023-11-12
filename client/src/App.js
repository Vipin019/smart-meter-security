// import logo from "./logo.svg";
import "./App.css";
import Notification from "./Notification";
import Data from "./data";
import Home from "./Pages/Home";
import React, { useEffect, useRef, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [updatedData, setUpdatedData] = useState({
    vrms: 0.0,
    irms: 0.0,
    apparentPower: 0.0,
    realPower: 0.0,
    kwh: 0.0,
  });
  const [updatedNotification, setUpdatedNotification] = useState(null);

  //for LCD
  const [lcd, setLcd] = useState("home__display--off");

  // for indicators
  const [power, setPower] = useState("power--off");
  const [homeIndicator1, setHomeIndicator1] = useState(
    "home__indicator__1--off"
  );
  const [connectAndThreat, setConnectionAndThreat] = useState(
    "connectAndThreat--off"
  ); //ok-->connected, t-->threat,off-->not connected
  const [load, setLoad] = useState("load--off");

  // for warning
  const [warning, setWarning] = useState("warning-no");

  //sound
  const audioRef = useRef(null);

  //data
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:81");

    socket.onopen = function () {
      console.log("Connection is open");
      setConnectionAndThreat("connectAndThreat--ok");
    };

    socket.onmessage = function (event) {
      const jsonData = JSON.parse(event.data);
      setUpdatedData({
        vrms: jsonData.vrms.toFixed(2),
        irms: jsonData.irms.toFixed(2),
        apparentPower: jsonData.apparentPower.toFixed(2),
        realPower: jsonData.realPower.toFixed(2),
        kwh: jsonData.kwh.toFixed(2),
      });
      if (jsonData.vrms != 0.0) {
        setPower("power--on");
        setHomeIndicator1("home__indicator__1--on");
        setLcd("home__display--on");
      } else {
        setPower("power--off");
        setHomeIndicator1("home__indicator__1--off");
        setLcd("home__display--off");
      }
      if (jsonData.vrms === 0.0 || jsonData.irms === 0.0) {
        setLoad("load--off");
      } else {
        setLoad("load--on");
      }
    };

    return () => {
      socket.close();
      setConnectionAndThreat("connectAndThreat--off");
    };
  }, []);

  //notification
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");

    socket.onopen = function () {
      console.log("Connection is open");
    };

    socket.onmessage = function (event) {
      const jsonData = JSON.parse(event.data);
      setUpdatedNotification(jsonData);
      if (jsonData?.message === "True") {
        setConnectionAndThreat("connectAndThreat--t");
        if (warning === "warning-no") {
          setWarning("warning-yes");
          audioRef?.current?.play();
        }
      } else {
        setConnectionAndThreat("connectAndThreat--ok");
        setWarning("warning-no");
      }
    };

    return () => {
      socket.close();
    };
  }, []);

  //warning
  const handleOnWarningChange = (e) => {
    if (warning === "warning-yes") {
      setWarning("warning-cut");
      audioRef.current.pause();
    }
  };

  return (
    <>
      <Router>
        <div className="App">
          <Routes>
            <Route
              exact
              path="/"
              element={
                <Home
                  updatedData={updatedData}
                  updatedNotification={updatedNotification}
                  power={power}
                  homeIndicator1={homeIndicator1}
                  connectAndThreat={connectAndThreat}
                  load={load}
                  lcd={lcd}
                />
              }
            />
            <Route
              exact
              path="/user"
              element={<Data updatedData={updatedData} url={"/user"} />}
            />
            <Route
              exact
              path="/admin"
              element={
                <Notification
                  updatedNotification={updatedNotification}
                  updatedData={updatedData}
                  warning={warning}
                  handleOnWarningChange={handleOnWarningChange}
                  audioRef={audioRef}
                />
              }
            />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
