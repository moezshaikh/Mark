import React, { useState, useRef, useEffect } from "react";
import { Send, Paperclip } from "lucide-react";
import { saveEvent } from "../utils/calendarStorage";
import "../styles/AI.css";

export default function ChatInterface() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "ai",
      content: "Hello! I'm Mark AI, your personal assistant. How can I help you today?",
      timestamp: new Date(),
      status: "read",
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const suggestions = [
    "Schedule a meeting tomorrow at 3 PM",
    "Remind me to call Alex next Monday",
    "Add a task for 25 Oct at 5 PM",
    "Show my events for today",
    "Attach a file"
  ];

  // Animate cycling placeholder
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex(prev => (prev + 1) % suggestions.length);
    }, 3000); // change every 3 seconds
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleAttachClick = () => fileInputRef.current.click();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileMsg = {
      id: Date.now(),
      sender: "user",
      content: `📎 ${file.name} attached`,
      timestamp: new Date(),
      status: "sent",
      file,
    };
    setMessages(prev => [...prev, fileMsg]);
  };

  const parseDateTimeFromMessage = (msg) => {
    const lower = msg.toLowerCase();
    let date = new Date();
    let time = "";

    if (lower.includes("tomorrow")) date.setDate(date.getDate() + 1);

    const inDaysMatch = msg.match(/in (\d+) day/i);
    if (inDaysMatch) date.setDate(date.getDate() + parseInt(inDaysMatch[1]));

    const weekdays = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];
    const nextDayMatch = weekdays.find(day => lower.includes("next " + day));
    if (nextDayMatch) {
      const dayIndex = weekdays.indexOf(nextDayMatch);
      const diff = (dayIndex + 7 - date.getDay()) % 7 || 7;
      date.setDate(date.getDate() + diff);
    }

    const wordMatch = msg.match(
      /(\d{1,2})(st|nd|rd|th)?\s*(jan(uary)?|feb(ruary)?|mar(ch)?|apr(il)?|may|jun(e)?|jul(y)?|aug(ust)?|sep(t(ember)?)?|oct(ober)?|nov(ember)?|dec(ember)?)(\s*\d{4})?/i
    );
    if (wordMatch) {
      const monthNames = ["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"];
      const day = parseInt(wordMatch[1]);
      const month = monthNames.findIndex(m => wordMatch[0].toLowerCase().includes(m));
      const yearMatch = wordMatch[9] ? parseInt(wordMatch[9]) : new Date().getFullYear();
      if (month >= 0 && day) date = new Date(yearMatch, month, day);
    }

    const timeMatch = msg.match(/(\d{1,2})(:(\d{2}))?\s*(am|pm)?/i);
    if (timeMatch) {
      let h = parseInt(timeMatch[1]);
      const m = timeMatch[3] ? parseInt(timeMatch[3]) : 0;
      const ampm = timeMatch[4];
      if (ampm) {
        if (ampm.toLowerCase() === "pm" && h < 12) h += 12;
        if (ampm.toLowerCase() === "am" && h === 12) h = 0;
      }
      time = `${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}`;
    }

    return { date: date.toLocaleDateString("en-CA"), time };
  };

  const handleSendMessage = async () => {
    const finalMsg = newMessage.trim();
    if (!finalMsg) return;

    const userMsg = { id: Date.now(), sender: "user", content: finalMsg, timestamp: new Date(), status: "sent" };
    setMessages(prev => [...prev, userMsg]);
    setNewMessage("");

    const typingId = Date.now() + 1;
    setMessages(prev => [
      ...prev,
      { id: typingId, sender: "ai", content: "__typing__", timestamp: new Date(), status: "typing" },
    ]);

    try {
      const isTask = /\b(schedule|remind|meeting|appointment|add task)\b/i.test(finalMsg);
      if (isTask) {
        const { date, time } = parseDateTimeFromMessage(finalMsg);
        const newEvent = { id: Date.now() + Math.floor(Math.random() * 1000), title: finalMsg, date, time };
        saveEvent(newEvent);
        window.dispatchEvent(new Event("calendarUpdated"));
        const aiContent = `✅ Task scheduled: "${newEvent.title}" on ${date}${time ? " at " + time : ""}`;
        setMessages(prev => prev.map(msg => msg.id === typingId ? { ...msg, content: aiContent, status: "read" } : msg));
      } else {
        const BACKEND_URL = "https://mark-backend-ai.onrender.com"; // updated backend URL
const response = await fetch(`${BACKEND_URL}/ask`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ message: finalMsg }),
});
const data = await response.json();
setMessages(prev => prev.map(msg => msg.id === typingId ? { ...msg, content: data.response, status: "read" } : msg));

      }
    } catch (err) {
      setMessages(prev => prev.map(msg => msg.id === typingId ? { ...msg, content: `⚠️ Error: ${err.message}`, status: "read" } : msg));
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    } else if (e.key === "Tab") {
      e.preventDefault();
      setNewMessage(suggestions[placeholderIndex]);
    }
  };

  return (
    <div className="chat-calendar-container">
      <div className="chat-container">
        <div className="chat-messages">
          {messages.map(msg => (
            <div key={msg.id} className={`message-row ${msg.sender}`}>
              {msg.sender === "ai" && <div className="avatar small">M</div>}
              <div className={`message-bubble ${msg.sender}`}>
                {msg.content === "__typing__" ? <div className="typing-dots"><span></span><span></span><span></span></div> : <p>{msg.content}</p>}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef}></div>
        </div>

        <div className="chat-input" style={{ position: "relative" }}>
          <button className="icon-btn" onClick={handleAttachClick}><Paperclip size={22} /></button>
          <input
            type="text"
            placeholder={suggestions[placeholderIndex]}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className="send-btn1" onClick={handleSendMessage}><Send size={20} /></button>
          <input type="file" ref={fileInputRef} style={{ display: "none" }} onChange={handleFileChange} />
        </div>
      </div>
    </div>
  );
}
