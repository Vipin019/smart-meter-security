import React from "react";
import "./meterCard.css";

function MeterCard({ title, value }) {
  return (
    <div className="meter-card">
      <h2>{title}</h2>
      <p>{value}</p>
    </div>
  );
}

export default MeterCard;
