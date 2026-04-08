import React, { useState } from "react";
import "./WorkoutLogger.css";

const WorkoutLogger = ({ onAddWorkout }) => {
  const [workout, setWorkout] = useState({
    name: "",
    duration: "",
    calories: "",
    date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWorkout((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

const handleSubmit = (e) => {
  e.preventDefault();

  if (workout.name && workout.duration && workout.calories && workout.date) {
    const username = localStorage.getItem("username");
    
    if (!username) {
      alert("User not logged in properly. Please login again.");
      return;
    }

    // ✅ Fix data types before saving
    const workoutToSave = {
      ...workout,
      calories: Number(workout.calories),
      duration: Number(workout.duration),
      date: new Date(workout.date).toISOString()
    };

    const existingWorkouts = JSON.parse(localStorage.getItem(`workouts_${username}`)) || [];
    const updatedWorkouts = [...existingWorkouts, workoutToSave];

    localStorage.setItem(`workouts_${username}`, JSON.stringify(updatedWorkouts));

    // ✅ Pass full workouts array to parent (Dashboard)
    if (onAddWorkout) onAddWorkout(updatedWorkouts);

    // reset form
    setWorkout({
      name: "",
      duration: "",
      calories: "",
      date: "",
    });

    alert("Workout logged successfully!");
  } else {
    alert("Please fill all fields");
  }
};

  return (
    <div className="workout-logger">
      <h3>Enter Workout Details</h3>

      <form onSubmit={handleSubmit} className="workout-form">

        <div style={{ display: "flex", gap: "10px" }}>
          <div>
            <label>Workout Name:</label>
            <input
              type="text"
              name="name"
              value={workout.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Duration:</label>
            <input
              type="number"
              name="duration"
              value={workout.duration}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
          <div>
            <label>Calories:</label>
            <input
              type="number"
              name="calories"
              value={workout.calories}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Date:</label>
            <input
              type="date"
              name="date"
              value={workout.date}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <button type="submit" style={{ marginTop: "15px" }}>
          Log Workout
        </button>
      </form>
    </div>
  );
};

export default WorkoutLogger;