import React, { useState, useEffect } from "react";

const WellnessPrograms = () => {
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [programs, setPrograms] = useState([]);
  const [joinedPrograms, setJoinedPrograms] = useState([]);

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail") || localStorage.getItem("username");
    if (!userEmail) return;

    const saved =
      JSON.parse(localStorage.getItem(`wellness_${userEmail}`) || "[]") || [];
    setJoinedPrograms(saved);
  }, []);

  const handleJoinProgram = (program) => {
    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) {
      alert("Unable to join program: user email not found.");
      return;
    }

    const existing =
      JSON.parse(localStorage.getItem(`wellness_${userEmail}`)) || [];

    const alreadyJoined = existing.some((item) => item.name === program.name);
    if (alreadyJoined) {
      alert("Program already joined.");
      setSelectedProgram(program);
      return;
    }

    const updated = [...existing, program];
    localStorage.setItem(`wellness_${userEmail}`, JSON.stringify(updated));
    setSelectedProgram(program);
    setJoinedPrograms(updated);
    alert("Program joined!");
  };

  // ✅ DEFAULT PROGRAMS
  const defaultPrograms = [
    {
      name: "Yoga Challenge",
      duration: "21 Days",
      price: 499,
      description:
        "Improve flexibility, posture and reduce daily stress through guided yoga sessions.",
    },
    {
      name: "Meditation Program",
      duration: "14 Days",
      price: 299,
      description:
        "Practice mindfulness and mental relaxation for better emotional balance.",
    },
    {
      name: "30-Day Fitness Challenge",
      duration: "30 Days",
      price: 699,
      description:
        "Build workout consistency and stamina with structured exercises.",
    },
  ];

  // ✅ LOAD ADMIN PROGRAMS
  useEffect(() => {
    const savedPrograms =
      JSON.parse(localStorage.getItem("wellnessPrograms")) || [];

    // merge default + admin programs
    setPrograms([...defaultPrograms, ...savedPrograms]);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Wellness Programs 🌿</h2>

      {/* PROGRAM CARDS */}
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {programs.map((program, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "20px",
              width: "300px",
              background: "#fff",
            }}
          >
            <h3>{program.name}</h3>
            <p>{program.description}</p>
            <p><b>Duration:</b> {program.duration}</p>
            <p><b>Price:</b> ₹{program.price}</p>

            <button
              onClick={() => handleJoinProgram(program)}
              style={{
                marginTop: "10px",
                padding: "10px",
                background: "#0ea5e9",
                color: "white",
                border: "none",
                borderRadius: "5px",
              }}
            >
              Join Program
            </button>
          </div>
        ))}
      </div>

      {joinedPrograms.length > 0 && (
        <div style={{ marginTop: "30px" }}>
          <h3 style={{ marginBottom: "12px", color: "#0f172a" }}>
            Your Joined Programs
          </h3>
          <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
            {joinedPrograms.map((program, index) => (
              <div
                key={index}
                style={{
                  border: "1px solid #d1d5db",
                  borderRadius: "12px",
                  padding: "16px",
                  width: "260px",
                  background: "#f8fafc",
                }}
              >
                <h4 style={{ marginBottom: "8px" }}>{program.name}</h4>
                <p style={{ marginBottom: "6px", fontSize: "14px" }}>
                  Duration: {program.duration}
                </p>
                <p style={{ fontSize: "14px" }}>
                  Price: ₹{program.price}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PAYMENT SECTION */}
      {selectedProgram && (
        <div
          style={{
            marginTop: "40px",
            padding: "20px",
            border: "2px solid #0ea5e9",
            borderRadius: "10px",
            textAlign: "center",
            background: "#f0f9ff",
          }}
        >
          <h2>Payment</h2>

          <h3>{selectedProgram.name}</h3>
          <p><b>Duration:</b> {selectedProgram.duration}</p>
          <p><b>Price:</b> ₹{selectedProgram.price}</p>

          {/* QR CODE */}
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=yourupi@upi&pn=FitWell&am=${selectedProgram.price}`}
            alt="QR Code"
          />

          <p>Scan & Pay using UPI</p>

          <button
            onClick={() => setSelectedProgram(null)}
            style={{
              marginTop: "10px",
              padding: "8px",
              background: "red",
              color: "white",
              border: "none",
              borderRadius: "5px",
            }}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default WellnessPrograms;