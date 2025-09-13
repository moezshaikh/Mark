import React, { useState, useEffect } from "react";
import "../styles/widgets.css";

const PersonalDashboard = () => {
  /* -------------------- STATES -------------------- */
  const [time, setTime] = useState(1500); // 25 min Pomodoro
  const [isRunning, setIsRunning] = useState(false);

  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");

  const [habits, setHabits] = useState([
    { name: "Read", done: false },
    { name: "Exercise", done: false },
    { name: "Code", done: false },
  ]);

  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const [quote, setQuote] = useState(
    "Stay positive, work hard, make it happen."
  );
  const [weather, setWeather] = useState("Sunny, 30°C");

  const [workHours] = useState({ today: 6 }); // Example work hours
  const [skills] = useState([
    { name: "React", progress: 75 },
    { name: "Node.js", progress: 65 },
    { name: "Python", progress: 85 },
  ]);
  // Example news headlines
const newsList = [
  "📢 New AI features launching this week!",
  "🌍 Climate summit focuses on renewable energy goals.",
  "💻 Tech companies collaborate on open-source projects.",
  "🚀 Space mission successfully deploys satellite.",
  "📱 Latest smartphone update improves battery life."
];

// Pick a new item daily
const todayIndex = new Date().getDate() % newsList.length;
const dailyNews = newsList[todayIndex];


  /* -------------------- RANDOM GRID SIZES -------------------- */
/* -------------------- FIXED GRID SIZES -------------------- */
const widgetSizes = [
  "item-wide",   // Pomodoro
  "",            // Notes (if you add later)
  "item-tall",   // Habits
  "",            // Empty slot (if any)
  "",            // Learning Progress
  "item-wide",   // Daily Attendance
  "",            // Tasks (if added)
  "item-tall",   // Quote of the Day
  "",            // Meditation
  "",            // Weather
  "",            // Relax
  "",            // News
  "",            // Placeholder
  "",            // AI Suggestions
  "item-wide",   // Quick Actions
];


  /* -------------------- EFFECTS -------------------- */
  useEffect(() => {
    let timer;
    if (isRunning && time > 0) {
      timer = setInterval(() => setTime((prev) => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, time]);

  /* -------------------- HELPERS -------------------- */
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const shuffleQuote = () => {
    const quotes = [
      "Push yourself, no one else is going to do it for you.",
      "Great things never come from comfort zones.",
      "Dream it. Wish it. Do it.",
    ];
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  };

  const addNote = () => {
    if (newNote.trim()) {
      setNotes([...notes, newNote]);
      setNewNote("");
    }
  };

  const toggleHabit = (index) => {
    const updated = [...habits];
    updated[index].done = !updated[index].done;
    setHabits(updated);
  };

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { text: newTask, done: false }]);
      setNewTask("");
    }
  };

  const toggleTask = (index) => {
    const updated = [...tasks];
    updated[index].done = !updated[index].done;
    setTasks(updated);
  };

  const getCurrentDate = () =>
    new Date().toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });

  /* -------------------- RENDER -------------------- */
  return (
    <div className="dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div className="header-content">
          <div className="header-title">
            <h1>Widgets</h1>
          </div>
        </div>
      </div>

      {/* Dashboard Grid */}
      <div className="dashboard-grid">
        {/* Pomodoro Timer */}
        <div className={`widget pomodoro-widget ${widgetSizes[0]}`}>
          <h3>Pomodoro</h3>
          <p className="timer">{formatTime(time)}</p>
          <button onClick={() => setIsRunning(!isRunning)}>
            {isRunning ? "Pause" : "Start"}
          </button>
          <button onClick={() => setTime(1500)}>Reset</button>
        </div>


        {/* Habit Tracker */}
        <div className={`widget habits-widget ${widgetSizes[2]}`}>
          <h3>Habits</h3>
          {habits.map((habit, idx) => (
            <label key={idx}>
              <input
                type="checkbox"
                checked={habit.done}
                onChange={() => toggleHabit(idx)}
              />
              {habit.name}
            </label>
          ))}
        </div>


        {/* Learning Progress */}
<div className={`widget learning-widget ${widgetSizes[4]}`}>
  <h3>Learning Progress</h3>
  <ul>
    {skills.map((skill, idx) => (
      <li key={idx}>
        <span>{skill.name} - {skill.progress}%</span>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${skill.progress}%` }}
          ></div>
        </div>
      </li>
    ))}
  </ul>
</div>

{/* Footer Stats */}
      <div className="dashboard-footer">
        <div className="stat-card">
          <div className="stat-value">{tasks.filter((t) => t.done).length}</div>
          <div className="stat-label">Tasks Completed</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{habits.filter((h) => h.done).length}</div>
          <div className="stat-label">Habits Done</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{workHours.today}h</div>
          <div className="stat-label">Hours Worked</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">
            {Math.round(
              skills.reduce((acc, skill) => acc + skill.progress, 0) /
                skills.length
            )}
            %
          </div>
          <div className="stat-label">Avg Progress</div>
        </div>
      </div>
      
        {/* Daily Attendance (GitHub style) */}
<div className={`widget projects-widget ${widgetSizes[5]}`}>
  <h3>Daily Attendance</h3>
  <div className="attendance-grid">
    {Array.from({ length: 30 }).map((_, idx) => {
      // Random attendance values (0 = absent, 1-4 = levels of presence)
      const value = Math.floor(Math.random() * 5);
      return (
        <div
          key={idx}
          className={`attendance-cell level-${value}`}
          title={`Day ${idx + 1}: ${value > 0 ? "Present" : "Absent"}`}
        ></div>
      );
    })}
  </div>
  <p className="legend">⬜ Absent | 🟩 Low | 🟩🟩 Medium | 🟩🟩🟩 High</p>
</div>

        {/* Quote of the Day */}
<div className={`widget quote-widget ${widgetSizes[7]}`}>
  <h3>✨ Quote of the Day</h3>
  <blockquote className="quote-text">
    “{quote}”
  </blockquote>
  <button className="quote-btn" onClick={shuffleQuote}>
    🔄 New Quote
  </button>
</div>


        {/* Meditation Timer */}
<div className={`widget meditation-widget ${widgetSizes[8]}`}>
  <h3>🧘 Meditation</h3>
  <p className="meditation-text">Take 5 minutes to relax and breathe.</p>
  <button className="meditation-btn">Start 5 min</button>
</div>


        {/* Weather */}
<div className={`widget weather-widget ${widgetSizes[9]}`}>
  <h3>🌤️ Weather</h3>
  <div className="weather-info">
    <span className="weather-icon">☀️</span>
    <p className="weather-text">{weather}</p>
  </div>
</div>


        {/* Quick Relax */}
<div className={`widget relax-widget ${widgetSizes[10]}`}>
  <h3>🌿 Quick Relax</h3>
  <p className="relax-text">Take a short break and refresh your mind.</p>
  <button className="relax-btn">🎶 Play Calm Music</button>
</div>


        {/* News/Updates */}
<div className={`widget news-widget ${widgetSizes[11]}`}>
  <h3>📰 News & Updates</h3>
  <p className="news-text">{dailyNews}</p>
</div>


        {/* AI Suggestions */}
<div className={`widget ai-suggestions-widget ${widgetSizes[13]}`}>
  <h3>🤖 AI Suggestions</h3>
  <ul className="suggestions-list">
    <li>📚 Take a 5-min break after Pomodoro.</li>
    <li>💡 Schedule coding tasks in the morning.</li>
    <li>🎯 Start a React side project.</li>
  </ul>
</div>



      
    </div>
    </div>
  );
};

export default PersonalDashboard;
