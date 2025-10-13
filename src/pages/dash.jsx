import React, { useState, useEffect, useRef } from "react";
import "../styles/dash.css";

export default function ChatInterface() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [started, setStarted] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setStarted(true);

    // Simulated AI response
    setTimeout(() => {
      const aiMessage = {
        sender: "ai",
        text: `You said: "${userMessage.text}". Nice!`,
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 800);
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        {!started && (
          <div className="greeting">
            <div className="ai-avatar">M</div>
            <div className="greeting-text">Hello! How can I help you today?</div>
          </div>
        )}

        <div className="messages-area">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${msg.sender === "user" ? "user" : "ai"}`}
            >
              {msg.sender === "ai" && <div className="ai-avatar small">M</div>}
              <div className="text">{msg.text}</div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        <div className={`input-bar ${started ? "bottom" : "center"}`}>
          <div className="ai-avatar small">M</div>
          <input
            type="text"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button onClick={handleSend}>Send</button>
        </div>
      </div>
    </div>
  );
}
