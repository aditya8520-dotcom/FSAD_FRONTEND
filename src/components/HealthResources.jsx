import React, { useState } from "react";
import "./Dashboard.css";

const HealthResources = () => {
  const [selected, setSelected] = useState(null);

  /* ================= RESOURCE DATA ================= */

  const resources = {
    stress: {
      title: "Stress Management",
      description:
        "Stress management helps improve emotional balance, focus, and physical health. Learning coping techniques reduces anxiety and burnout.",

      tips: [
        "Practice deep breathing for 5 minutes daily",
        "Maintain a consistent sleep routine",
        "Avoid multitasking overload",
        "Take short mindful breaks"
      ],

      books: [
        "The Relaxation Response — Herbert Benson",
        "Why Zebras Don't Get Ulcers — Robert Sapolsky"
      ],

      links: [
        {
          name: "WHO Stress Management Guide",
          url: "https://www.who.int/publications/i/item/9789240003927",
        },
        {
          name: "Mindfulness Exercises",
          url: "https://www.mindful.org/meditation/mindfulness-getting-started/",
        },
      ],
    },

    sleep: {
      title: "Sleep Hygiene",
      description:
        "Good sleep improves memory, immunity, and emotional stability. Poor sleep is linked with stress and reduced academic performance.",

      tips: [
        "Sleep 7–8 hours daily",
        "Avoid phone usage before bed",
        "Keep room dark and cool",
        "Maintain fixed sleep timing"
      ],

      books: [
        "Why We Sleep — Matthew Walker",
        "The Sleep Solution — W. Chris Winter"
      ],

      links: [
        {
          name: "Sleep Foundation Guide",
          url: "https://www.sleepfoundation.org/",
        },
        {
          name: "CDC Sleep Tips",
          url: "https://www.cdc.gov/sleep/about_sleep/sleep_hygiene.html",
        },
      ],
    },

    hydration: {
      title: "Hydration",
      description:
        "Proper hydration supports brain function, digestion, and energy levels. Even mild dehydration affects concentration.",

      tips: [
        "Drink 2–3 liters water daily",
        "Carry a water bottle",
        "Drink water after workouts",
        "Limit sugary drinks"
      ],

      books: [
        "Your Body's Many Cries for Water — F. Batmanghelidj"
      ],

      links: [
        {
          name: "Harvard Hydration Guide",
          url: "https://www.health.harvard.edu/staying-healthy/how-much-water-should-you-drink",
        },
      ],
    },

    exercise: {
      title: "Exercise Tips",
      description:
        "Regular exercise improves cardiovascular health, mental well-being, and productivity.",

      tips: [
        "30 minutes activity daily",
        "Mix cardio + strength training",
        "Stretch before workouts",
        "Stay consistent not intense"
      ],

      books: [
        "Spark — John Ratey",
        "No Sweat — Michelle Segar"
      ],

      links: [
        {
          name: "WHO Physical Activity Guidelines",
          url: "https://www.who.int/news-room/fact-sheets/detail/physical-activity",
        },
      ],
    },

    nutrition: {
      title: "Healthy Eating",
      description:
        "Balanced nutrition fuels body and mind. Students need protein, fiber, and micronutrients for performance.",

      tips: [
        "Eat fruits daily",
        "Include protein every meal",
        "Reduce processed foods",
        "Maintain meal timing"
      ],

      books: [
        "How Not To Die — Dr. Michael Greger",
        "Eat to Beat Disease — William Li"
      ],

      links: [
        {
          name: "Harvard Healthy Plate",
          url: "https://www.hsph.harvard.edu/nutritionsource/healthy-eating-plate/",
        },
      ],
    },

    detox: {
      title: "Digital Detox",
      description:
        "Reducing screen exposure improves sleep quality, attention span, and emotional health.",

      tips: [
        "No screens 1 hour before sleep",
        "Use app timers",
        "Take offline breaks",
        "Practice outdoor activities"
      ],

      books: [
        "Digital Minimalism — Cal Newport"
      ],

      links: [
        {
          name: "Digital Wellness Guide",
          url: "https://www.apa.org/monitor/2020/04/nurtured-nature",
        },
      ],
    },
  };

  /* ================= UI ================= */

  const Card = ({ id, icon, title, text }) => (
    <div
      className="dashboard-card"
      style={{
        cursor: "pointer",
        padding: "25px",
        width: "300px",
        margin: "10px",
      }}
      onClick={() => setSelected(resources[id])}
    >
      <h2>{icon}</h2>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">

        <h1>Health Resources</h1>

        {/* ===== GRID ===== */}
        {!selected && (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <Card id="stress" icon="🧘" title="Stress Management" text="Manage anxiety and balance life." />
            <Card id="sleep" icon="😴" title="Sleep Hygiene" text="Improve sleep quality and recovery." />
            <Card id="hydration" icon="💧" title="Hydration" text="Maintain optimal body hydration." />
            <Card id="exercise" icon="🏃" title="Exercise Tips" text="Build healthy activity habits." />
            <Card id="nutrition" icon="🥗" title="Healthy Eating" text="Nutrition for better performance." />
            <Card id="detox" icon="📵" title="Digital Detox" text="Reduce screen dependency." />
          </div>
        )}

        {/* ===== DETAIL VIEW ===== */}
        {selected && (
          <div className="dashboard-widget" style={{ textAlign: "left" }}>
            <button
              onClick={() => setSelected(null)}
              style={{
                marginBottom: "15px",
                padding: "8px 14px",
                borderRadius: "8px",
                border: "none",
                background: "#00bcd4",
                color: "white",
                cursor: "pointer",
              }}
            >
              ← Back
            </button>

            <h2>{selected.title}</h2>
            <p>{selected.description}</p>

            <h3>✅ Practical Tips</h3>
            <ul>
              {selected.tips.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>

            <h3>📚 Recommended Books</h3>
            <ul>
              {selected.books.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>

            <h3>🔗 Learn More</h3>
            <ul>
              {selected.links.map((l, i) => (
                <li key={i}>
                  <a href={l.url} target="_blank" rel="noreferrer">
                    {l.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

      </div>
    </div>
  );
};

export default HealthResources;