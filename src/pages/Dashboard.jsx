import React from 'react';
import { useNavigate } from "react-router-dom";

import ChatBot from '../pages/AI'; // 👈 Import the ChatBot
import '../styles/Dashboard.css';

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-layout">
      <div className="dashboard-main">

        {/* Main dashboard content */}
        <section className="content">
          
          {/* Left column with ChatBot */}
          <div className="left-col">
            <div className="panel">
              <ChatBot /> {/* 👈 New ChatBot UI */}
            </div>
          </div>
          

        </section>
      </div>
    </div>
  );
}
