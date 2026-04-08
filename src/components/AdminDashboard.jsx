import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [studentData, setStudentData] = useState([]);
  const [suggestion, setSuggestion] = useState("");
  const [selectedUser, setSelectedUser] = useState("");

  const [programs, setPrograms] = useState([]);
  const [newProgram, setNewProgram] = useState({
    name: "",
    duration: "",
    price: "",
    description: "",
  });

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalWorkouts: 0,
    totalCalories: 0,
  });

  /* ================= LOAD DATA ================= */
useEffect(() => {
  // ✅ GET USERS FROM LOCALSTORAGE
  const users = JSON.parse(localStorage.getItem("users")) || [];

  let workoutsCount = 0;
  let caloriesSum = 0;

  const collectedStudents = [];

  users.forEach((user) => {
    const key = user.username;

    const workouts =
      JSON.parse(localStorage.getItem(`workouts_${key}`)) || [];

    const wellness =
      JSON.parse(localStorage.getItem(`wellness_${key}`)) || [];

    workoutsCount += workouts.length;

    workouts.forEach((w) => {
      caloriesSum += Number(w.calories || 0);
    });

    collectedStudents.push({
      username: user.username,
      email: user.email,
      workouts,
      wellness,
    });
  });

  setStudentData(
    collectedStudents.sort((a, b) => b.workouts.length - a.workouts.length)
  );

  setStats({
    totalUsers: users.length,
    totalWorkouts: workoutsCount,
    totalCalories: caloriesSum,
  });

  const savedPrograms =
    JSON.parse(localStorage.getItem("wellnessPrograms")) || [];
  setPrograms(savedPrograms);
}, []);

  /* ================= ADD PROGRAM ================= */
  const handleAddProgram = () => {
    if (!newProgram.name || !newProgram.price) {
      alert("Fill required fields");
      return;
    }

    const updatedPrograms = [...programs, newProgram];
    setPrograms(updatedPrograms);
    localStorage.setItem("wellnessPrograms", JSON.stringify(updatedPrograms));

    setNewProgram({
      name: "",
      duration: "",
      price: "",
      description: "",
    });

    alert("Program added!");
  };

  /* ================= SEND SUGGESTION ================= */
  const handleSendSuggestion = () => {
    if (!suggestion.trim() || !selectedUser) {
      alert("Please select a user and enter a suggestion.");
      return;
    }
    localStorage.setItem(`suggestion_${selectedUser}`, suggestion);
    alert("Suggestion sent to selected user!");
    setSuggestion("");
    setSelectedUser("");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 px-4 py-10">
      <div className="mx-auto max-w-7xl space-y-10">
        <header className="rounded-[2rem] border border-white/10 bg-slate-900/90 p-8 shadow-[0_40px_120px_rgba(15,23,42,0.65)] backdrop-blur-xl">
          <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-cyan-300/80">Admin Dashboard</p>
              <h1 className="mt-4 text-5xl font-semibold tracking-tight text-white sm:text-6xl">
                Fitness Control Center
              </h1>
              <p className="mt-4 max-w-3xl text-base leading-8 text-slate-400">
                Manage student activity, workout logs, and wellness programs in one clean admin view.
              </p>
            </div>
            <div className="rounded-[1.75rem] border border-cyan-500/20 bg-slate-950/80 p-5 text-right shadow-xl">
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/80">Current stats</p>
              <p className="mt-3 text-3xl font-semibold text-white">{stats.totalWorkouts}</p>
              <p className="text-sm text-slate-400">workouts tracked</p>
            </div>
          </div>
        </header>

        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-[2rem] border border-white/10 bg-slate-900/90 p-6 shadow-[0_30px_90px_rgba(15,23,42,0.35)]">
            <p className="text-xs uppercase tracking-[0.28em] text-cyan-300/80">Students</p>
            <p className="mt-4 text-4xl font-semibold text-white">{stats.totalUsers}</p>
            <p className="mt-2 text-sm text-slate-400">Active members</p>
          </div>
          <div className="rounded-[2rem] bg-gradient-to-br from-sky-500 to-indigo-600 p-6 shadow-[0_30px_90px_rgba(56,189,248,0.3)] text-white">
            <p className="text-xs uppercase tracking-[0.28em] text-cyan-100">Workouts</p>
            <p className="mt-4 text-4xl font-semibold">{stats.totalWorkouts}</p>
            <p className="mt-2 text-sm text-cyan-100/90">Sessions logged</p>
          </div>
          <div className="rounded-[2rem] bg-gradient-to-br from-emerald-500 to-teal-600 p-6 shadow-[0_30px_90px_rgba(16,185,129,0.3)] text-white">
            <p className="text-xs uppercase tracking-[0.28em] text-emerald-100">Calories</p>
            <p className="mt-4 text-4xl font-semibold">{stats.totalCalories}</p>
            <p className="mt-2 text-sm text-emerald-100/90">Total burn</p>
          </div>
          <div className="rounded-[2rem] border border-violet-500/20 bg-slate-900/90 p-6 shadow-[0_30px_90px_rgba(168,85,247,0.2)]">
            <p className="text-xs uppercase tracking-[0.28em] text-violet-300/80">Programs</p>
            <p className="mt-4 text-4xl font-semibold text-white">{programs.length}</p>
            <p className="mt-2 text-sm text-slate-400">Wellness plans</p>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.6fr_0.9fr]">
          <div className="rounded-[2rem] border border-white/10 bg-slate-900/90 p-6 shadow-[0_35px_120px_rgba(15,23,42,0.45)] backdrop-blur-xl">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-white">Student Activity</h2>
                <p className="mt-2 text-sm text-slate-400">View workouts logged, enrolled programs, and user details.</p>
              </div>
              <span className="inline-flex items-center rounded-full bg-cyan-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200 ring-1 ring-cyan-300/20">
                {studentData.length} tracked
              </span>
            </div>

            <div className="mt-6 overflow-x-auto rounded-[1.5rem] border border-slate-800 bg-slate-950">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-slate-900 text-slate-300">
                  <tr>
                    <th className="px-5 py-4 uppercase tracking-[0.1em]">Username</th>
                    <th className="px-5 py-4 uppercase tracking-[0.1em]">Email</th>
                    <th className="px-5 py-4 uppercase tracking-[0.1em]">Workouts</th>
                    <th className="px-5 py-4 uppercase tracking-[0.1em]">Programs</th>
                  </tr>
                </thead>
                <tbody>
                  {studentData.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-5 py-10 text-center text-slate-500">
                        No student activity available.
                      </td>
                    </tr>
                  ) : (
                    studentData.map((s, i) => (
                      <tr key={i} className="border-t border-slate-800 hover:bg-slate-900/80 transition-colors duration-200">
                        <td className="px-5 py-4 text-slate-100">{s.username}</td>
                        <td className="px-5 py-4 text-slate-100">{s.email}</td>
                        <td className="px-5 py-4 text-cyan-200">{s.workouts.length}</td>
                        <td className="px-5 py-4 text-violet-200">{s.wellness.length}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="mt-6 grid gap-4">
              {studentData.length > 0 && studentData.map((s, i) => (
                <div key={i} className="rounded-[1.75rem] border border-slate-800 bg-slate-950/90 p-5 shadow-[0_25px_90px_rgba(15,23,42,0.25)]">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-white">{s.username}</h3>
                      <p className="text-sm text-slate-400">{s.email}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">{s.workouts.length} workouts</span>
                      <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">{s.wellness.length} programs</span>
                    </div>
                  </div>

                  <div className="mt-4 grid gap-4 lg:grid-cols-2">
                    <div className="rounded-[1.5rem] border border-cyan-500/10 bg-slate-900/90 p-4">
                      <p className="text-xs uppercase tracking-[0.22em] text-cyan-300">Recent workouts</p>
                      {s.workouts.length === 0 ? (
                        <p className="mt-3 text-sm text-slate-500">No workouts logged.</p>
                      ) : (
                        <div className="mt-3 space-y-3">
                          {s.workouts.slice(-3).map((w, idx) => (
                            <div key={idx} className="rounded-3xl border border-slate-800 bg-slate-950/95 p-3">
                              <p className="text-sm font-semibold text-white">{w.name || w.workoutName || "Workout"}</p>
                              <p className="mt-1 text-xs text-slate-500">Dur: {w.duration || "N/A"} • Cal: {w.calories || "0"}</p>
                              {w.date && <p className="text-xs text-slate-500">{w.date}</p>}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="rounded-[1.5rem] border border-violet-500/10 bg-slate-900/90 p-4">
                      <p className="text-xs uppercase tracking-[0.22em] text-violet-300">Enrolled programs</p>
                      {s.wellness.length === 0 ? (
                        <p className="mt-3 text-sm text-slate-500">No programs enrolled.</p>
                      ) : (
                        <div className="mt-3 space-y-2">
                          {s.wellness.map((p, idx) => (
                            <div key={idx} className="rounded-3xl bg-slate-950/95 p-3 border border-slate-800 text-sm text-slate-300">
                              {p.name || "Unnamed Program"}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[2rem] border border-white/10 bg-slate-900/90 p-6 shadow-[0_35px_120px_rgba(15,23,42,0.45)] backdrop-blur-xl">
              <h2 className="text-2xl font-semibold text-white">Add Wellness Program</h2>
              <p className="mt-2 text-sm text-slate-400">Create a new program for students.</p>
              <div className="mt-6 space-y-4">
                <label className="block text-sm font-medium text-slate-300">Name *</label>
                <input
                  type="text"
                  placeholder="Program name"
                  value={newProgram.name}
                  onChange={(e) => setNewProgram({ ...newProgram, name: e.target.value })}
                  className="w-full rounded-3xl border border-slate-800 bg-slate-950/90 px-4 py-3 text-sm text-white outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30"
                />
                <label className="block text-sm font-medium text-slate-300">Duration</label>
                <input
                  type="text"
                  placeholder="e.g. 4 weeks"
                  value={newProgram.duration}
                  onChange={(e) => setNewProgram({ ...newProgram, duration: e.target.value })}
                  className="w-full rounded-3xl border border-slate-800 bg-slate-950/90 px-4 py-3 text-sm text-white outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30"
                />
                <label className="block text-sm font-medium text-slate-300">Price *</label>
                <input
                  type="number"
                  placeholder="Enter price"
                  value={newProgram.price}
                  onChange={(e) => setNewProgram({ ...newProgram, price: e.target.value })}
                  className="w-full rounded-3xl border border-slate-800 bg-slate-950/90 px-4 py-3 text-sm text-white outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30"
                />
                <label className="block text-sm font-medium text-slate-300">Description</label>
                <textarea
                  placeholder="Brief description"
                  value={newProgram.description}
                  onChange={(e) => setNewProgram({ ...newProgram, description: e.target.value })}
                  rows={3}
                  className="w-full rounded-3xl border border-slate-800 bg-slate-950/90 px-4 py-3 text-sm text-white outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30"
                />
              </div>
              <button
                onClick={handleAddProgram}
                className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-300"
              >
                Add Program
              </button>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 p-6 shadow-[0_35px_120px_rgba(168,85,247,0.18)] backdrop-blur-xl">
              <h2 className="text-2xl font-semibold text-white">Send Suggestion</h2>
              <p className="mt-2 text-sm text-slate-400">Send a personalized suggestion to a specific user.</p>
              <div className="mt-6 space-y-4">
                <label className="block text-sm font-medium text-slate-300">Select User *</label>
                <select
                  value={selectedUser}
                  onChange={(e) => setSelectedUser(e.target.value)}
                  className="w-full rounded-3xl border border-slate-800 bg-slate-950/90 px-4 py-3 text-sm text-white outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30"
                >
                  <option value="">Choose a user...</option>
                  {studentData.map((user, index) => (
                    <option key={index} value={user.username}>
                      {user.username} ({user.email})
                    </option>
                  ))}
                </select>
                <label className="block text-sm font-medium text-slate-300">Suggestion *</label>
                <textarea
                  value={suggestion}
                  onChange={(e) => setSuggestion(e.target.value)}
                  placeholder="Type your suggestion..."
                  rows={5}
                  className="w-full rounded-[1.5rem] border border-slate-800 bg-slate-950/90 px-4 py-4 text-sm text-white outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30"
                />
              </div>
              <button
                onClick={handleSendSuggestion}
                className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-300"
              >
                Send Suggestion
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;