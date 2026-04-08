// import React from "react";
// import { Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   LineElement,
//   PointElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import "./WeeklyProgressChart.css";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   LineElement,
//   PointElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const WeeklyProgressChart = ({ workoutLogs }) => {
//   // Initialize an array to store calories for each day of the week (Sun-Sat)
//   const weeklyCalories = [0, 0, 0, 0, 0, 0, 0]; // Sunday-Saturday

//   // Process workout logs to calculate weekly calories
//   workoutLogs.forEach((workout) => {
//     const date = new Date(workout.date); // Assuming the workout data has a date field
//     const weekDay = date.getDay(); // Get day of the week (0 = Sunday, 6 = Saturday)

//     // Ensure calories is a number, fallback to 0 if not
//     const calories = parseFloat(workout.calories) || 0;

//     // Add calories to the corresponding day
//     weeklyCalories[weekDay] += calories;
//   });

//   // Prepare the chart data
//   const chartData = {
//     labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
//     datasets: [
//       {
//         label: "Total calories used",
//         data: weeklyCalories,
//         borderColor: "rgba(75, 192, 192, 1)",
//         backgroundColor: "rgba(75, 192, 192, 0.2)",
//         fill: true,
//       },
//     ],
//   };

//   return (
//     // <div>
//     //   <Line data={chartData} />
//     // </div>
//     <div className="weekly-progress-chart">
//       <h3>Weekly Calorie Burn</h3>
//       <Line data={chartData} />
//     </div>
//   );
// };

// export default WeeklyProgressChart;

import React from "react";
import { Bar } from "react-chartjs-2"; // Import Bar instead of Line
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement, // Import BarElement for Bar chart
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./WeeklyProgressChart.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement, // Register BarElement
  Title,
  Tooltip,
  Legend
);

const WeeklyProgressChart = ({ workoutLogs }) => {
  // Initialize an array to store calories for each day of the week (Sun-Sat)
  const weeklyCalories = [0, 0, 0, 0, 0, 0, 0]; // Sunday-Saturday

  // Process workout logs to calculate weekly calories
  workoutLogs.forEach((workout) => {
  if (!workout.date) return; // ✅ skip invalid

  const date = new Date(workout.date);

  if (isNaN(date)) return; // ✅ skip broken dates

  const weekDay = date.getDay();

  const calories = Number(workout.calories) || 0;

  weeklyCalories[weekDay] += calories;
});
  // Prepare the chart data
  const chartData = {
    labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [
      {
        label: "Total calories used",
        data: weeklyCalories,
        backgroundColor: "rgba(75, 192, 192, 0.6)", // Bar color
        borderColor: "rgba(75, 192, 192, 1)", // Border color for bars
        borderWidth: 1, // Optional: adds a border to bars
      },
    ],
  };

  return (
    <div className="weekly-progress-chart">
      <h3>Progress of the week</h3>
      <Bar data={chartData} /> {/* Use Bar instead of Line */}
    </div>
  );
};

export default WeeklyProgressChart;
