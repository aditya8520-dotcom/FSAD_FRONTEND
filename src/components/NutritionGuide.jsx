import React, { useState } from "react";

const NutritionGuide = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState(null);

  const calculateBMI = () => {
    const h = height / 100;
    const result = weight / (h * h);
    setBmi(result.toFixed(2));
  };

  return (
    <div className="dashboard-card">
      <h2>Nutrition Advice</h2>

      <input
        placeholder="Weight (kg)"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
      />

      <input
        placeholder="Height (cm)"
        value={height}
        onChange={(e) => setHeight(e.target.value)}
      />

      <button onClick={calculateBMI}>Calculate BMI</button>

      {bmi && (
        <h3>
          Your BMI: {bmi}
          <br />
          Eat balanced meals with protein, fruits, and vegetables.
        </h3>
      )}
    </div>
  );
};

export default NutritionGuide;