import React  from 'react';

export const Card = ({ value }) => (
  <div key={value} className="pack-view__block">
    <div className="pack-view__square">
      <span>{ value === 0 ? '?' : value + 1}</span>
    </div>
  </div>
)
