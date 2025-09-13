import { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Paperclip, Smile, Mic } from 'lucide-react';
import "../styles/AI.css";


export default function TaskPage() {
  const [activeTab, setActiveTab] = useState("All");

  const tasks = [
    { id: 1, title: "Finish report", status: "Pending" },
    { id: 2, title: "Team meeting", status: "Urgent" },
    { id: 3, title: "Code review", status: "Completed" },
    { id: 4, title: "Update dashboard", status: "Pending" },
    { id: 5, title: "Fix login bug", status: "Urgent" },
  ];

  const tabs = ["All", "Pending", "Urgent", "Completed"];

  const filteredTasks =
    activeTab === "All"
      ? tasks
      : tasks.filter((task) => task.status === activeTab);

  const countTasks = (status) =>
    status === "All"
      ? tasks.length
      : tasks.filter((task) => task.status === status).length;

  return (
    <div className="task-page">
      <h2 className="task-title">Tasks</h2>

      {/* Tabs with badge */}
      <div className="task-tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`tab-btn ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
            <span className="badge">{countTasks(tab)}</span>
          </button>
        ))}
      </div>

      {/* Task list */}
      <div className="task-list">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <div key={task.id} className={`task-card ${task.status.toLowerCase()}`}>
              {task.title}
            </div>
          ))
        ) : (
          <p className="no-task">No {activeTab.toLowerCase()} tasks</p>
        )}
      </div>
    </div>
  );
}
