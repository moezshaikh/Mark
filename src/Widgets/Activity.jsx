// File: src/components/Activity.jsx
import React from 'react';
import '../styles/activity.css';

export default function Activity() {
  const acts = [
    { text: 'Pushed code to PrivyCheck repo', time: '2h ago' },
    { text: 'Updated Sukoon README', time: '5h ago' },
    { text: 'Completed UI mockup for Noor', time: '1d ago' },
    { text: 'Reviewed pull request #42', time: '2d ago' },
    { text: 'Added new features to Dashboard', time: '3d ago' },
    { text: 'Fixed bug in authentication module', time: '4d ago' },
  ];

  return (
    <div className="activity-list">
      {acts.map((a, i) => (
        <div key={i} className="activity-item">
          <span className="activity-icon">📌</span>
          <div className="activity-content">
            <div className="activity-text">{a.text}</div>
            <div className="activity-time">{a.time}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
