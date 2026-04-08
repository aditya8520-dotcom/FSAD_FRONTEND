import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import Login from './components/Login';
import Register from './components/Register';
import MFAVerify from './components/MFAVerify';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/AdminDashboard';
import WorkoutLogger from './components/WorkoutLogger';
import CalorieCalculator from './components/CalorieCalculator';
import StepsCalculator from './components/StepsCalculator';
import HealthResources from './components/HealthResources';
import MentalWellness from './components/MentalWellness';
import NutritionGuide from './components/NutritionGuide';
import WellnessPrograms from './components/WellnessPrograms';
import WeeklyProgressChart from './components/WeeklyProgressChart';

import { Outlet } from "react-router-dom";

/* ================= PRIVATE ROUTE ================= */
const PrivateRoute = ({ children, requiredRole }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const userRole = localStorage.getItem("userRole");

  if (!isLoggedIn) return <Navigate to="/login" replace />;

  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

/* ================= MAIN LAYOUT ================= */
const MainLayout = ({ isLoggedIn, setIsLoggedIn }) => {
  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <div style={{ marginTop: "80px" }}>
        <Outlet />
      </div>
    </>
  );
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  useEffect(() => {
    const checkLoginStatus = () => {
      setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
    };

    window.addEventListener("storage", checkLoginStatus);
    return () => window.removeEventListener("storage", checkLoginStatus);
  }, []);

  return (
    <Router>
      <Routes>

        {/* PUBLIC */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/mfa" element={<MFAVerify setIsLoggedIn={setIsLoggedIn} />} />

        {/* STUDENT ROUTES WITH COMMON LAYOUT */}
        <Route
          element={
            <PrivateRoute requiredRole="student">
              <MainLayout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            </PrivateRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/workout-logger" element={<WorkoutLogger />} />
          <Route path="/calorie-calculator" element={<CalorieCalculator />} />
          <Route path="/steps-tracker" element={<StepsCalculator />} />
          <Route path="/health-resources" element={<HealthResources />} />
          <Route path="/mental-wellness" element={<MentalWellness />} />
          <Route path="/nutrition-guide" element={<NutritionGuide />} />
          <Route path="/wellness-programs" element={<WellnessPrograms />} />
          <Route path="/progress-chart" element={<WeeklyProgressChart />} />
        </Route>

        {/* ADMIN */}
        <Route
          path="/admin"
          element={
            <PrivateRoute requiredRole="admin">
              <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
              <AdminDashboard />
            </PrivateRoute>
          }
        />

      </Routes>
    </Router>
  );
}

export default App;