import React, { useState } from "react";
import "./warning.css";
import { IoWarningOutline } from "react-icons/io5";
import audioFile from "../../src/security-alarm-80493.mp3";

const Warning = ({ warning, handleOnWarningChange, audioRef }) => {
  //   warning-yes --> There is warning, warning-no --> No warning, warning-cut --> warning cut

  return (
    <div className={warning}>
      <p className="warning__close" onClick={handleOnWarningChange}>
        X
      </p>
      <div className="warning__main">
        <IoWarningOutline className="warning__icon" />
        <small>Threat Found!</small>
        <h6 onClick={handleOnWarningChange}>Show Details</h6>
      </div>
      <audio ref={audioRef} loop>
        <source src={audioFile} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default Warning;
