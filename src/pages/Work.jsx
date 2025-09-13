import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import "../styles/Work.css"; // Import custom CSS

const THEME = {
  maroon: "#6b0f0f",
  maroonDark: "#420808",
  gold: "#ffd166",
  goldDark: "#ffb84d",
};

const sampleProjects = [
  { id: "p1", title: "Noor — Calligraphy Gallery", status: "In Progress", deadline: "2025-09-10", progress: 62 },
  { id: "p2", title: "PrivyCheck — Privacy Checker", status: "Planning", deadline: "2025-10-01", progress: 12 },
  { id: "p3", title: "Sukoon — Mental Health AI", status: "Review", deadline: "2025-08-30", progress: 84 },
];

export default function MarkWorkspace() {
  const [projects, setProjects] = useState(sampleProjects);

  return (
    <div className="workspace">
      <div className="projects">
        <h2>Projects</h2>
        <div className="project-grid">
          {projects.map((p) => (
            <motion.div key={p.id} whileHover={{ scale: 1.02 }} className="project-card">
              <h3>{p.title}</h3>
              <p>Status: {p.status}</p>
              <p>Deadline: {new Date(p.deadline).toLocaleDateString()}</p>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${p.progress}%` }}></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
