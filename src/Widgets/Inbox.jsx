import React, { useState } from 'react';
import '../styles/Inbox.css';

export default function Messages() {
  const [activeTab, setActiveTab] = useState("Inbox");
  const [expanded, setExpanded] = useState(false); // Track if list is expanded

  const mails = [
    { id: 1, from: 'InternPe', subject: 'Internship Completion', time: '2d' },
    { id: 2, from: 'Hackathon', subject: 'Finalist Announcement', time: '7d' },
    { id: 3, from: 'OpenAI', subject: 'AI Newsletter', time: '1d' }, // extra for demo
    { id: 4, from: 'College', subject: 'Seminar Invite', time: '3d' },
  ];

  const chats = [
    { id: 1, from: 'Ayush', message: 'Bro project ho gaya?', time: '10:32 AM' },
    { id: 2, from: 'Lina', message: 'Meeting kab hai?', time: 'Yesterday' },
    { id: 3, from: 'Moez', message: 'Check the code.', time: 'Today' },
  ];

  const gmails = [
    { id: 1, from: 'Google Devs', subject: 'Hackathon Registration', time: '1d' },
    { id: 2, from: 'Amazon', subject: 'Your Order has Shipped', time: '3d' }
  ];

  const outlook = [
    { id: 1, from: 'Microsoft', subject: 'Azure Credits Update', time: '5d' },
    { id: 2, from: 'College', subject: 'Exam Timetable', time: '6d' }
  ];

  const getItems = () => {
    if (activeTab === "Inbox") return mails;
    if (activeTab === "WhatsApp") return chats;
    if (activeTab === "Gmail") return gmails;
    if (activeTab === "Outlook") return outlook;
    return [];
  };

  const renderItem = (item) => (
    <div className={activeTab === "WhatsApp" ? "chat" : "mail"} key={item.id}>
      <div>
        <div className="fw">{item.from}</div>
        <div className="muted">{activeTab === "WhatsApp" ? item.message : item.subject}</div>
      </div>
      <div className="muted">{item.time}</div>
    </div>
  );

  const itemsToShow = expanded ? getItems() : getItems().slice(0, 2); // show first 2 by default

  return (
    <div className="messages">
      <div className="panel-head">
        <div className="tabs">
          {["Inbox", "WhatsApp", "Gmail", "Outlook"].map(tab => (
            <button
              key={tab}
              className={activeTab === tab ? "tab active" : "tab"}
              onClick={() => { setActiveTab(tab); setExpanded(false); }} // collapse on tab change
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="messages-content">
        {itemsToShow.map(renderItem)}
      </div>

      {getItems().length > 2 && (
        <button className="view-more-btn" onClick={() => setExpanded(!expanded)}>
          {expanded ? "View Less" : "View More"}
        </button>
      )}
    </div>
  );
}
