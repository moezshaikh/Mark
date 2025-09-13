// src/components/ChatInterface.jsx
import '../styles/AI.css';
import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Mic } from 'lucide-react';
import { saveEvent } from "../utils/calendarStorage.js";

export default function ChatInterface() {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'ai', content: "Hello! I'm Mark AI, your personal assistant. How can I help you today?", timestamp: new Date(), status: 'read' },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const recognitionRef = useRef(null);

  // Speech recognition setup
  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = "en-US";

    recognitionRef.current.onresult = (event) => {
      let transcript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      setNewMessage(transcript); // Show live transcript in input
    };

    recognitionRef.current.onend = () => {
      setIsListening(false); // stop animation
    };
  }, []);

  // Scroll chat to bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [messages]);

  // Mic click handler
  const handleMicClick = () => {
    if (!recognitionRef.current) {
      alert("Speech Recognition not supported in this browser.");
      return;
    }
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const handleAttachClick = () => fileInputRef.current.click();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const fileMsg = {
      id: Date.now(),
      sender: 'user',
      content: `📎 ${file.name} attached`,
      timestamp: new Date(),
      status: 'sent',
      file,
    };
    setMessages(prev => [...prev, fileMsg]);
  };

  // Calendar command detection
  const tryHandleCalendar = (text) => {
    if (!text.toLowerCase().includes("meeting")) return null;
    let timeMatch = text.match(/(\d{1,2})(?::(\d{2}))?\s*(am|pm)?/i);
    let hour = 16;
    let minute = "00";
    if (timeMatch) {
      hour = parseInt(timeMatch[1]);
      if (timeMatch[2]) minute = timeMatch[2];
      if (timeMatch[3]) {
        if (timeMatch[3].toLowerCase() === "pm" && hour < 12) hour += 12;
        if (timeMatch[3].toLowerCase() === "am" && hour === 12) hour = 0;
      }
    }
    const formattedTime = `${String(hour).padStart(2, "0")}:${minute}`;
    const date = new Date();
    date.setDate(date.getDate() + 1);
    const formattedDate = date.toISOString().split("T")[0];
    const newEvent = { id: Date.now(), title: "Meeting", date: formattedDate, time: formattedTime };
    saveEvent(newEvent);
    return `✅ I’ve added your meeting on ${formattedDate} at ${formattedTime} to the calendar.`;
  };

  // Send message
  const handleSendMessage = async (textOverride = null) => {
    const finalMsg = textOverride || newMessage;
    if (!finalMsg.trim()) return;

    const userMsg = { id: Date.now(), sender: 'user', content: finalMsg, timestamp: new Date(), status: 'sent' };
    setMessages(prev => [...prev, userMsg]);
    setNewMessage('');

    const calendarReply = tryHandleCalendar(finalMsg);
    if (calendarReply) {
      setMessages(prev => [...prev, { id: Date.now()+1, sender: 'ai', content: calendarReply, timestamp: new Date(), status: 'read' }]);
      return;
    }

    const typingId = Date.now() + 2;
    setMessages(prev => [...prev, { id: typingId, sender: 'ai', content: "__typing__", timestamp: new Date(), status: 'typing' }]);

    try {
      const response = await fetch("http://localhost:5000/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: finalMsg, conversation: messages })
      });
      const data = await response.json();
      setMessages(prev => prev.map(msg => msg.id === typingId ? { ...msg, content: data.reply, status: 'read' } : msg));
    } catch (error) {
      console.error("Error fetching AI reply:", error);
      setMessages(prev => prev.map(msg => msg.id === typingId ? { ...msg, content: "⚠️ Sorry, something went wrong.", status: 'read' } : msg));
    }
  };

  return (
    <div className="chat-container">
      {/* Messages */}
      <div className="chat-messages">
        {messages.map(msg => (
          <div key={msg.id} className={`message-row ${msg.sender}`}>
            {msg.sender === 'ai' && <div className="avatar small">M</div>}
            <div className={`message-bubble ${msg.sender}`}>
              {msg.content === "__typing__" ? (
                <div className="typing-dots"><span></span><span></span><span></span></div>
              ) : <p>{msg.content}</p>}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef}></div>
      </div>

      {/* Input */}
      <div className="chat-input">
        <div className={`mic-waveform ${isListening ? "active" : ""}`}>
          <span></span><span></span><span></span><span></span><span></span>
        </div>

        <button className={`icon-btn mic-btn ${isListening ? "listening" : ""}`} onClick={handleMicClick}>
          <Mic size={22} stroke="#000000ff" />
        </button>

        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
        />

        <button className="send-btn1" onClick={() => handleSendMessage()}>
          <Send size={20} />
        </button>

        <input type="file" ref={fileInputRef} style={{ display: "none" }} onChange={handleFileChange} />
        <button className="icon-btn" onClick={handleAttachClick}>
          <Paperclip size={22} stroke="#000000ff" />
        </button>
      </div>
    </div>
  );
}
