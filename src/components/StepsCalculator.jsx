import React, { useState } from "react";
import "./StepsCalculator.css";

const StepsCalculator = () => {
  const [steps, setSteps] = useState("");
  const [weight, setWeight] = useState("");
  const [caloriesBurned, setCaloriesBurned] = useState(null);

  const calculateCalories = () => {
    const stepsNum = parseFloat(steps);
    const weightNum = parseFloat(weight);

    if (!stepsNum || !weightNum) {
      setCaloriesBurned(null);
      return;
    }

    // Rough estimate: 0.04 kcal/step for 70kg, scaled by weight
    const calories = stepsNum * 0.04 * (weightNum / 70);
    setCaloriesBurned(calories);
  };

  return (
    <div className="steps-calculator">
      <h2>Convert your steps to calorie</h2>
      <div className="form">
        <label>
          Steps:
          <input
            type="number"
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
          />
        </label>
        <label>
          Weight (kg):
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </label>
        <button onClick={calculateCalories}>Calculate</button>
      </div>
      {caloriesBurned !== null && (
        <p>
          <strong>Estimated Calories Burned:</strong>{" "}
          {caloriesBurned.toFixed(2)} kcal
        </p>
      )}
    </div>
  );
};

export default StepsCalculator;
