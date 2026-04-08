import React, { useState, useEffect } from "react";

const MentalWellness = () => {
  const [mood, setMood] = useState("");
  const [history, setHistory] = useState([]);

  const userEmail = localStorage.getItem("userEmail");

  const messages = {
    happy: "Great! Keep maintaining your healthy habits 😊",
    neutral: "Take short breaks and stay hydrated.",
    sad: "Try meditation or talk to someone you trust ❤️",
  };

  // ✅ Load previous mood history
  useEffect(() => {
    if (userEmail) {
      const savedMoods =
        JSON.parse(localStorage.getItem(`moods_${userEmail}`)) || [];
      setHistory(savedMoods);
    }
  }, [userEmail]);

  // ✅ Save mood
  const saveMood = (selectedMood) => {
    setMood(selectedMood);

    const newEntry = {
      mood: selectedMood,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
    };

    const updatedHistory = [...history, newEntry];

    setHistory(updatedHistory);

    localStorage.setItem(
      `moods_${userEmail}`,
      JSON.stringify(updatedHistory)
    );
  };

  return (
    <div className="dashboard-card">
      <h2>Mental Wellness Support 🧠</h2>

      <p>How are you feeling today?</p>

      <div style={{ fontSize: "2rem", marginBottom: "20px" }}>
        <button onClick={() => saveMood("happy")}>😊</button>
        <button onClick={() => saveMood("neutral")}>😐</button>
        <button onClick={() => saveMood("sad")}>😔</button>
      </div>

      {mood && <h3>{messages[mood]}</h3>}

      {/* Mood History Section */}
      <div style={{ marginTop: "30px", textAlign: "left" }}>
        <h3>Your Mood History 📅</h3>

        {history.length === 0 ? (
          <p>No mood records yet.</p>
        ) : (
          <ul>
            {history.map((entry, index) => (
              <li key={index}>
                {entry.date} ({entry.time}) — {entry.mood}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MentalWellness;