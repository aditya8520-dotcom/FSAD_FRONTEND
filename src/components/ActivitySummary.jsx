// src/components/ActivitySummary.jsx
import React from 'react';

const ActivitySummary = ({ steps, calories, activeHours }) => {
  return (
    <div className="activity-summary">
      <h2>Activity Summary</h2>
      <div className="summary-item">
        <h3>Steps</h3>
        <p>{steps}</p>
      </div>
      <div className="summary-item">
        <h3>Calories Burned</h3>
        <p>{calories} kcal</p>
      </div>
      <div className="summary-item">
        <h3>Active Hours</h3>
        <p>{activeHours} hours</p>
      </div>
    </div>
  );
};

export default ActivitySummary;
