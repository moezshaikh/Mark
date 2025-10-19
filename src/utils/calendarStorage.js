// src/utils/calendarStorage.js

export const getEvents = () => {
  const saved = localStorage.getItem("calendarEvents");
  return saved ? JSON.parse(saved) : [];
};

export const saveEvent = (event) => {
  const events = getEvents();
  events.push(event);
  localStorage.setItem("calendarEvents", JSON.stringify(events));

  // Trigger real-time update for Calendar
  window.dispatchEvent(new Event("calendarUpdated"));
};
