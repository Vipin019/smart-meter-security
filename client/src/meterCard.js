// created by Prince Kumar (20UEE058)

import React from 'react';

function MeterCard({ title, value }) {
  return (
    <div className="meter-card">
      <h2>{title}</h2>
      <p>{value}</p>
    </div>
  );
}

export default MeterCard;
