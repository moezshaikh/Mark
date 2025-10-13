import React, { useState, useRef, useEffect } from "react";
import { Send, Paperclip } from "lucide-react";
import { saveEvent } from "../utils/calendarStorage";
import "../styles/AI.css";

export default function ChatInterface() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "ai",
      content:
        "Hello! I'm Mark AI, your personal assistant. How can I help you today?",
      timestamp: new Date(),
      status: "read",
    },
  ]);

  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const BACKEND_URL = "http://localhost:5000";

  // Auto-scroll chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
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
    setMessages((prev) => [...prev, fileMsg]);
  };

  const handleSendMessage = async () => {
    const finalMsg = newMessage.trim();
    if (!finalMsg) return;

    const userMsg = {
      id: Date.now(),
      sender: "user",
      content: finalMsg,
      timestamp: new Date(),
      status: "sent",
    };
    setMessages((prev) => [...prev, userMsg]);
    setNewMessage("");

    const typingId = Date.now() + 1;
    setMessages((prev) => [
      ...prev,
      {
        id: typingId,
        sender: "ai",
        content: "__typing__",
        timestamp: new Date(),
        status: "typing",
      },
    ]);

    try {
      const response = await fetch(`${BACKEND_URL}/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: finalMsg }),
      });

      const data = await response.json();
      let aiContent = data.response;

      // If AI returns structured event info
      if (data.event) {
        const eventId = Date.now() + Math.floor(Math.random() * 1000); // unique id

        const newEvent = {
          id: eventId,
          title: data.event.title,
          date: new Date(data.event.date).toISOString().split("T")[0], // YYYY-MM-DD
          time: data.event.time || "",
        };

        saveEvent(newEvent);

        // 🔹 Trigger custom event for same-tab Calendar update
        window.dispatchEvent(new CustomEvent("calendarUpdated"));

        aiContent = `✅ Scheduled "${newEvent.title}" on ${newEvent.date} at ${newEvent.time}.`;
      }

      // Replace typing bubble with AI response
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === typingId
            ? { ...msg, content: aiContent, status: "read" }
            : msg
        )
      );
    } catch (err) {
      console.error("Error fetching AI reply:", err);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === typingId
            ? {
                ...msg,
                content: `⚠️ Something went wrong: ${err.message}`,
                status: "read",
              }
            : msg
        )
      );
    }
  };

  return (
    <div className="chat-calendar-container">
      <div className="chat-container">
        <div className="chat-messages">
          {messages.map((msg) => (
            <div key={msg.id} className={`message-row ${msg.sender}`}>
              {msg.sender === "ai" && <div className="avatar small">M</div>}
              <div className={`message-bubble ${msg.sender}`}>
                {msg.content === "__typing__" ? (
                  <div className="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                ) : (
                  <p>{msg.content}</p>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef}></div>
        </div>

        <div className="chat-input">
          <button className="icon-btn" onClick={handleAttachClick}>
            <Paperclip size={22} stroke="#000000ff" />
          </button>
          <input
            type="text"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <button className="send-btn1" onClick={handleSendMessage}>
            <Send size={20} />
          </button>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </div>
      </div>
    </div>
  );
}
