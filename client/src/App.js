// import logo from "./logo.svg";
import "./App.css";
import Notification from "./Notification";
import Data from "./data";
import Home from "./Pages/Home";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [currentRole, setCurrentRole] = useState("user");
  const [updatedData, setUpdatedData] = useState({
    vrms: 0,
    irms: 0,
    apparentPower: 0,
    realPower: 0,
    kwh: 0,
  });
  const [updatedNotification, setUpdatedNotification] = useState(null);

  //role
  const handleRoleSelection = (role) => {
    setCurrentRole(role);
  };

  //data
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:81");

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

  //notification
  useEffect(() => {
    const socket = new WebSocket("ws://192.168.148.198:8080");

    socket.onopen = function () {
      console.log("Connection is open");
    };

    socket.onmessage = function (event) {
      const jsonData = JSON.parse(event.data);
      setUpdatedNotification(jsonData);
    };

    return () => {
      socket.close();
    };
  }, []);

  return (
    <>
      <Router>
        <div className="App">
          <Routes>
            <Route
              exact
              path="/"
              element={<Home updatedData={updatedData} />}
            />
            <Route
              exact
              path="/user"
              element={<Data updatedData={updatedData} />}
            />
            <Route
              exact
              path="/admin"
              element={
                <Notification
                  updatedNotification={updatedNotification}
                  updatedData={updatedData}
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
