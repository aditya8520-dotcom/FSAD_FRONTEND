import React, { useState } from 'react';
import './CalorieCalculator.css';

const CalorieCalculator = () => {
  const [formData, setFormData] = useState({
    age: '', gender: 'male', weight: '', height: '', activityLevel: 'sedentary',
  });
  const [results, setResults] = useState({ bmr: null, tdee: null, weightLossCalories: null });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const calculateBMR = () => {
    const { age, gender, weight, height, activityLevel } = formData;
    const weightNum = parseFloat(weight), heightNum = parseFloat(height), ageNum = parseFloat(age);

    // BMR Calculation: Harris-Benedict Equation
    let bmr = gender === 'male'
      ? 10 * weightNum + 6.25 * heightNum - 5 * ageNum + 5
      : 10 * weightNum + 6.25 * heightNum - 5 * ageNum - 161;

    // Activity Level Multipliers
    const activityMap = {
      sedentary: 1.2,
      lightlyActive: 1.375,
      moderatelyActive: 1.55,
      veryActive: 1.725,
      extraActive: 1.9,
    };

    // Total Daily Energy Expenditure (TDEE)
    const tdee = bmr * activityMap[activityLevel];

    // Weight loss calories = TDEE - 500 (500-calorie deficit)
    const weightLossCalories = tdee - 500;

    setResults({ bmr, tdee, weightLossCalories });
  };

  return (
    <div className="calorie-calculator">
      <h2>Calorie Calculator</h2>
      <div className="calculator-form">
        {['age', 'weight', 'height'].map((field) => (
          <label key={field}>{field.charAt(0).toUpperCase() + field.slice(1)}:
            <input type="number" name={field} value={formData[field]} onChange={handleChange} required />
          </label>
        ))}
        <label>Gender:
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="male">Male</option><option value="female">Female</option>
          </select>
        </label>
        <label>Activity Level:
          <select name="activityLevel" value={formData.activityLevel} onChange={handleChange}>
            <option value="sedentary">Sedentary</option>
            <option value="lightlyActive">Lightly Active</option>
            <option value="moderatelyActive">Moderately Active</option>
            <option value="veryActive">Very Active</option>
            <option value="extraActive">Extra Active</option>
          </select>
        </label>
        <button onClick={calculateBMR}>Calculate</button>
      </div>

      {results.bmr && (
        <div className="calorie-results">
          <p><strong>BMR:</strong> {results.bmr.toFixed(2)} kcal/day</p>
          <p><strong>TDEE (Total Daily Energy Expenditure):</strong> {results.tdee.toFixed(2)} kcal/day</p>
          <p><strong>Weight Loss Calories (500-calorie deficit):</strong> {results.weightLossCalories.toFixed(2)} kcal/day</p>
        </div>
      )}
    </div>
  );
};

export default CalorieCalculator;
