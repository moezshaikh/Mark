// src/utils/calendarStorage.js

// Save a new event to localStorage
export function saveEvent(event) {
  const events = JSON.parse(localStorage.getItem("calendarEvents")) || [];
  events.push(event);
  localStorage.setItem("calendarEvents", JSON.stringify(events));
}

// Get all events
export function getEvents() {
  return JSON.parse(localStorage.getItem("calendarEvents")) || [];
}

// Remove an event by ID
export function deleteEvent(eventId) {
  const events = JSON.parse(localStorage.getItem("calendarEvents")) || [];
  const updated = events.filter(e => e.id !== eventId);
  localStorage.setItem("calendarEvents", JSON.stringify(updated));
}
