// src/pages/Calendar.jsx
import React, { useState, useEffect } from "react";
import { saveEvent, getEvents } from "../utils/calendarStorage";
import "../styles/calendar.css";

export default function Calendar() {
  const [events, setEvents] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showPopup, setShowPopup] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [newEvent, setNewEvent] = useState({ title: "", time: "" });

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // 🔹 Load events from localStorage and refresh on updates
  useEffect(() => {
    const loadEvents = () => setEvents(getEvents());

    loadEvents(); // initial load
    window.addEventListener("storage", loadEvents);
    window.addEventListener("calendarUpdated", loadEvents);

    return () => {
      window.removeEventListener("storage", loadEvents);
      window.removeEventListener("calendarUpdated", loadEvents);
    };
  }, []);

  // 🔹 Month structure
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const calendarDays = [];
  for (let i = 0; i < firstDayOfMonth; i++) calendarDays.push(null);
  for (let d = 1; d <= daysInMonth; d++) calendarDays.push(d);

  // 🔹 Filter events for a day
  const getEventsForDate = (day) => {
    if (!day) return [];
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;
    return events.filter((ev) => ev.date === dateStr);
  };

  // 🔹 Day click → show popup
  const handleDayClick = (day) => {
    if (!day) return;
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;
    setSelectedDate(dateStr);
    setShowPopup(true);
  };

  // 🔹 Add new event manually
  const handleAddEvent = (e) => {
    e.preventDefault();
    if (!newEvent.title || !selectedDate) return;

    const event = {
      id: Date.now() + Math.floor(Math.random() * 1000),
      title: newEvent.title,
      date: selectedDate,
      time: newEvent.time || "",
    };

    saveEvent(event); // saves in localStorage + triggers calendarUpdated
    setEvents(getEvents()); // refresh
    setNewEvent({ title: "", time: "" });
    setShowPopup(false);
  };

  // 🔹 Delete event
  const handleDeleteEvent = (id) => {
    const updated = events.filter((ev) => ev.id !== id);
    localStorage.setItem("calendarEvents", JSON.stringify(updated));
    setEvents(updated);
    window.dispatchEvent(new Event("calendarUpdated"));
  };

  // 🔹 Month navigation
  const handlePrevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const handleNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  return (
    <div className="calendar-container">
      <div className="calendar-page-header">
        <h1 className="calendar-title">Calendar</h1>
      </div>

      <div className="calendar-header">
        <button onClick={handlePrevMonth}>⬅ Prev</button>
        <h2>
          {currentDate.toLocaleString("default", { month: "long" })} {year}
        </h2>
        <button onClick={handleNextMonth}>Next ➡</button>
      </div>

      <div className="calendar-grid">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="calendar-day-header">
            {day}
          </div>
        ))}

        {calendarDays.map((day, idx) => (
          <div
            key={idx}
            className={`calendar-day ${!day ? "empty" : ""} ${
              day === new Date().getDate() &&
              month === new Date().getMonth() &&
              year === new Date().getFullYear()
                ? "today"
                : ""
            }`}
            onClick={() => handleDayClick(day)}
          >
            {day && <div className="day-number">{day}</div>}
            {day &&
              getEventsForDate(day).map((ev) => (
                <div key={ev.id} className="event">
                  <span>
                    {ev.title} {ev.time && `@ ${ev.time}`}
                  </span>
                  <button
                    className="delete-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteEvent(ev.id);
                    }}
                  >
                    ✕
                  </button>
                </div>
              ))}
          </div>
        ))}
      </div>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>Add Event on {selectedDate}</h3>
            <form onSubmit={handleAddEvent}>
              <input
                type="text"
                placeholder="Event title"
                value={newEvent.title}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, title: e.target.value })
                }
                required
              />
              <input
                type="time"
                value={newEvent.time}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, time: e.target.value })
                }
              />
              <div className="popup-actions">
                <button type="submit">Save</button>
                <button
                  type="button"
                  onClick={() => setShowPopup(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
