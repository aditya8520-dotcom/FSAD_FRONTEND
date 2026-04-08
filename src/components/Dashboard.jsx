import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Dashboard.css";
import WorkoutLogger from "./WorkoutLogger";
import WeeklyProgressChart from "./WeeklyProgressChart";
import CalorieCalculator from "./CalorieCalculator";
import StepsCalculator from "./StepsCalculator";
import HealthResources from "./HealthResources";
import MentalWellness from "./MentalWellness";
import NutritionGuide from "./NutritionGuide";
import WellnessPrograms from "./WellnessPrograms";

const Dashboard = () => {
  const username = localStorage.getItem("username");
  const userRole = localStorage.getItem("userRole");

  // 🔒 Redirect if not logged in
  useEffect(() => {
    if (!username) {
      window.location.href = "/login";
    }
  }, [username]);

  const [workoutLogs, setWorkoutLogs] = useState([]);
  const [healthScore, setHealthScore] = useState(0);
  const [enrolledPrograms, setEnrolledPrograms] = useState([]);
  const [activeComponent, setActiveComponent] = useState("progress");
  const [mfaEnabled, setMfaEnabled] = useState(false);
  const [showMfaSetup, setShowMfaSetup] = useState(false);
  const [qrCode, setQrCode] = useState(null);
  const [mfaCode, setMfaCode] = useState("");
  const [mfaMessage, setMfaMessage] = useState("");
  const [mfaLoading, setMfaLoading] = useState(false);

  /* ================= LOAD DATA ================= */
  useEffect(() => {
    if (!username) return;

    const workouts = JSON.parse(localStorage.getItem(`workouts_${username}`)) || [];
    const moods = JSON.parse(localStorage.getItem(`moods_${username}`)) || [];

    setWorkoutLogs(workouts);
    calculateHealthScore(workouts, moods);
    
    checkMfaStatus();
  }, [username]);

  /* ================= CHECK MFA STATUS ================= */
  const checkMfaStatus = async () => {
    try {
      const res = await axios.get(`http://localhost:8081/api/auth/mfa-setup?username=${username}`);
      setMfaEnabled(res.data.mfaEnabled || false);
    } catch (error) {
      console.log("MFA status check: not yet configured");
    }
  };

  /* ================= FETCH MFA QR CODE ================= */
  const handleMfaSetup = async () => {
    setMfaLoading(true);
    setMfaMessage("");

    try {
      const res = await axios.get(`http://localhost:8081/api/auth/mfa-setup?username=${username}`);
      setQrCode(res.data.qrCodeImage);
      setShowMfaSetup(true);
      setMfaMessage(mfaEnabled ? "Regenerating MFA code..." : "Scan the QR code with Google Authenticator");
    } catch (error) {
      setMfaMessage(error.response?.data || "Failed to load QR code");
    } finally {
      setMfaLoading(false);
    }
  };

  /* ================= VERIFY MFA CODE ================= */
  const handleMfaVerify = async () => {
    if (!mfaCode || mfaCode.length !== 6) {
      setMfaMessage("Please enter a 6-digit code");
      return;
    }

    setMfaLoading(true);

    try {
      const res = await axios.post("http://localhost:8081/api/auth/verify-mfa", {
        username: username,
        otp: mfaCode
      });

      setMfaMessage("MFA enabled successfully!");
      setMfaEnabled(true);
      setShowMfaSetup(false);
      setMfaCode("");
      setQrCode(null);
    } catch (error) {
      setMfaMessage(error.response?.data || "Invalid code");
    } finally {
      setMfaLoading(false);
    }
  };

  /* ================= LOAD ENROLLED PROGRAMS ================= */
  useEffect(() => {
    if (!username) return;

    const enrolled = JSON.parse(localStorage.getItem(`wellness_${username}`)) || [];
    setEnrolledPrograms(enrolled);
  }, [username]);

  /* ================= HEALTH SCORE ================= */
  const calculateHealthScore = (workouts, moods) => {
    const workoutPoints = workouts.length * 10;
    const caloriesPoints =
      workouts.reduce((sum, w) => sum + (w.calories || 0), 0) / 50;
    const moodPoints = moods.length * 5;

    let score = workoutPoints + caloriesPoints + moodPoints;
    if (score > 100) score = 100;

    setHealthScore(Math.round(score));
  };

  /* ================= ADD WORKOUT ================= */
  const handleAddWorkout = (workouts) => {
    setWorkoutLogs(workouts);
    localStorage.setItem(`workouts_${username}`, JSON.stringify(workouts));

    const moods = JSON.parse(localStorage.getItem(`moods_${username}`)) || [];
    calculateHealthScore(workouts, moods);
  };

  /* ================= STATUS ================= */
  const getHealthStatus = () => {
    if (healthScore >= 80) return "Excellent";
    if (healthScore >= 50) return "Good";
    return "Needs Attention";
  };

  const totalCalories = workoutLogs.reduce(
    (sum, w) => sum + (w.calories || 0),
    0
  );

  const adminSuggestion = localStorage.getItem(`suggestion_${username}`);

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6 pt-24">

      <div className="max-w-6xl mx-auto space-y-6">

        {/* HEADER */}
        <div className="bg-white/90 backdrop-blur-lg border border-white/50 rounded-3xl p-8 shadow-2xl text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Welcome to FitWell Dashboard
          </h1>
          <p className="text-gray-600 text-lg">
            Hello, <span className="font-semibold text-blue-600">{username}</span>.
          </p>
          <p className="text-gray-500 mt-1">
            Your comprehensive health and wellness tracking platform
          </p>
        </div>

        {/* HEALTH SCORE & STATS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/90 backdrop-blur-lg rounded-3xl p-6 shadow-xl border border-white/50">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">❤️</span>
              <h3 className="text-xl font-semibold text-gray-800">Health Score</h3>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-blue-600 mb-2">{healthScore}/100</p>
              <p className="text-lg font-medium text-gray-600 mb-4">{getHealthStatus()}</p>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="bg-gradient-to-r from-green-400 to-blue-500 h-4 rounded-full transition-all duration-500"
                  style={{ width: `${healthScore}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-lg rounded-3xl p-6 shadow-xl border border-white/50">
            <div className="flex items-center gap-3 mb-4">
              <h3 className="text-xl font-semibold text-gray-800">Total Progress</h3>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-orange-600 mb-2">{totalCalories.toLocaleString()}</p>
              <p className="text-lg text-gray-600">Calories Burned</p>
              <p className="text-sm text-gray-500 mt-2">{workoutLogs.length} workouts logged</p>
            </div>
          </div>
        </div>

        {/* ADMIN MESSAGE */}
        {adminSuggestion && (
          <div className="bg-gradient-to-r from-yellow-100 to-orange-100 border border-yellow-300 rounded-3xl p-6 shadow-lg">
            <div className="flex items-start gap-3">
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">Admin Suggestion</h4>
                <p className="text-gray-700">{adminSuggestion}</p>
              </div>
            </div>
          </div>
        )}

        {/* MFA SETTINGS - HIDDEN FOR ADMIN */}
        {userRole !== 'admin' && (
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/50">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🔐</span>
              <h2 className="text-2xl font-bold text-gray-800">Security Settings</h2>
            </div>
            <div className={`px-4 py-2 rounded-full font-semibold ${mfaEnabled ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {mfaEnabled ? '✓ MFA Enabled' : '⚠ MFA Disabled'}
            </div>
          </div>

          {!mfaEnabled && (
            !showMfaSetup ? (
            <div className="flex flex-col gap-4">
              <p className="text-gray-600 mb-2">
                Multi-Factor Authentication adds an extra layer of security. Use Google Authenticator to scan the QR code.
              </p>
              <button
                onClick={handleMfaSetup}
                disabled={mfaLoading}
                className="self-start bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 disabled:opacity-50"
              >
                {mfaLoading ? 'Loading...' : 'Enable MFA'}
              </button>
            </div>
            ) : (
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
                {/* QR & verify code... unchanged */}
              </div>
            )
          )}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
              <div className="space-y-6">
                {/* QR CODE SECTION */}
                {qrCode && (
                  <div className="flex flex-col items-center">
                    <p className="text-sm text-gray-600 mb-3 font-medium">Scan with Google Authenticator:</p>
                    <img src={qrCode} alt="MFA QR Code" className="w-64 h-64 border-2 border-blue-300 rounded-lg p-2 bg-white" />
                  </div>
                )}

                {/* VERIFICATION CODE SECTION */}
                <div className="flex flex-col items-center gap-3">
                  <p className="text-sm text-gray-600 font-medium">Enter the 6-digit code:</p>
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="000000"
                    value={mfaCode}
                    onChange={(e) => setMfaCode(e.target.value.replace(/[^0-9]/g, ''))}
                    className="w-32 px-4 py-3 text-center text-2xl font-mono bg-white border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* MESSAGE */}
                {mfaMessage && (
                  <div className={`p-3 rounded-lg text-center text-sm font-medium ${
                    mfaMessage.includes('successfully') 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-amber-100 text-amber-700'
                  }`}>
                    {mfaMessage}
                  </div>
                )}

                {/* BUTTONS */}
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={handleMfaVerify}
                    disabled={mfaLoading || mfaCode.length !== 6}
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 disabled:opacity-50"
                  >
                    {mfaLoading ? 'Verifying...' : 'Verify & Enable'}
                  </button>
                  <button
                    onClick={() => {
                      setShowMfaSetup(false);
                      setMfaCode("");
                      setQrCode(null);
                      setMfaMessage("");
                    }}
                    className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )
        </div>
        )}
        {userRole === 'admin' && (
          <div className="bg-white/90 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/50">
            <div className="flex items-center justify-center gap-3">
              <span className="text-3xl">👑</span>
              <h2 className="text-2xl font-bold text-gray-800">Admin Security</h2>
            </div>
            <div className="text-center mt-6">
              <div className="px-6 py-3 rounded-full bg-emerald-100 text-emerald-700 font-semibold inline-block">
                ✓ Admin access - MFA not required
              </div>
              <p className="text-gray-600 mt-4 text-sm">
                Direct login enabled for administrative privileges.
              </p>
            </div>
          </div>
        )}

        {/* MY WELLNESS PROGRAMS */}
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/50">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">My Wellness Programs</h2>

          {enrolledPrograms.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 text-lg">You have not enrolled in any programs yet</p>
              <p className="text-gray-400 text-sm mt-2">Visit the Wellness Programs section to get started</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrolledPrograms.map((program, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{program.name}</h3>
                  <p className="text-gray-600 mb-3 leading-relaxed">{program.description}</p>
                  {program.duration && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-green-700">Duration:</span>
                      <span className="text-sm text-gray-600">{program.duration}</span>
                    </div>
                  )}
                  <div className="mt-4 flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-green-700">Enrolled</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* QUICK ACCESS BUTTONS */}
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/50">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Quick Access</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Progress Chart", id: "progress", icon: "📊" },
              { label: "Workout Logger", id: "workout", icon: "🏋️" },
              { label: "Calorie Calculator", id: "calorie", icon: "🍎" },
              { label: "Steps Tracker", id: "steps", icon: "👟" },
              { label: "Health Resources", id: "resources", icon: "📚" },
              { label: "Mental Wellness", id: "wellness", icon: "🧘" },
              { label: "Nutrition Guide", id: "nutrition", icon: "🥗" },
              { label: "Wellness Programs", id: "programs", icon: "💪" },
            ].map(({ label, id, icon }) => (
              <button
                key={id}
                onClick={() => setActiveComponent(id)}
                className={`p-4 rounded-xl transition-all duration-200 transform hover:scale-105 text-center group border ${
                  activeComponent === id
                    ? "bg-gradient-to-br from-blue-400 to-indigo-500 border-blue-600 text-white"
                    : "bg-gradient-to-br from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 border-blue-200 text-gray-700"
                }`}
              >
                <div className="text-3xl mb-2">{icon}</div>
                <p className={`text-sm font-medium ${activeComponent === id ? "text-white" : "group-hover:text-gray-900"}`}>{label}</p>
              </button>
            ))}
          </div>
        </div>

        {/* COMPONENT DISPLAY SECTION */}
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/50">
          {activeComponent === "progress" && <WeeklyProgressChart workoutLogs={workoutLogs} />}
          {activeComponent === "workout" && <WorkoutLogger onAddWorkout={handleAddWorkout} />}
          {activeComponent === "calorie" && <CalorieCalculator />}
          {activeComponent === "steps" && <StepsCalculator />}
          {activeComponent === "resources" && <HealthResources />}
          {activeComponent === "wellness" && <MentalWellness />}
          {activeComponent === "nutrition" && <NutritionGuide />}
          {activeComponent === "programs" && <WellnessPrograms />}
        </div>

      </div>
    </div>
  );
};

export default Dashboard;