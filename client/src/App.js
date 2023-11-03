// import logo from "./logo.svg";
import "./App.css";
import Notification from "./Notification";
import Data from "./data";
import React, { useState } from "react";
import Navbar from "./navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  // const [currentRole, setCurrentRole] = useState("user");

  // const handleRoleSelection = (role) => {
  //   setCurrentRole(role);
  // };

  return (
    <>
      <Router>
        <Navbar />
        <div className="App">
          <Routes>
            <Route exact path="/user" element={<Data />} />
            <Route exact path="/admin" element={<Notification />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
