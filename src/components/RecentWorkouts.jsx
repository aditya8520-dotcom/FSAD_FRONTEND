// src/components/RecentWorkouts.jsx
import React from 'react';

const RecentWorkouts = ({ workouts }) => {
  return (
    <div className="recent-workouts">
      <h2>Recent Workouts</h2>
      <ul>
        {workouts.map((workout, index) => (
          <li key={index}>
            <h3>{workout.type}</h3>
            <p>{workout.duration} minutes</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentWorkouts;
