// App.jsx
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";

// Pages
import Dashboard from "./pages/Dashboard";
import Calendar from "./pages/calendar";
import Project from "./pages/Projects";
import Auth from "./pages/Auth";
import Hero from "./pages/hero";
import Inbox from "./pages/Inbox";
import Notes from "./pages/Notes";
import AI from "./pages/AI";
import Widgets from "./pages/Widgets";
import Setting from "./pages/setting";

function Layout() {
  const location = useLocation();
// Hide Navbar & Sidebar on multiple routes
const hideNavAndSidebar = ["/", "/auth"].includes(location.pathname.toLowerCase());

  // 🔹 Remove "no-transition" after first render
  useEffect(() => {
    const timer = setTimeout(() => {
      document.body.classList.remove("no-transition");
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {!hideNavAndSidebar && <Navbar />}

      <div className="app-container">
        {!hideNavAndSidebar && <Sidebar />}

        <div className="main-content">
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />} />
            
            <Route path="/projects" element={<Project />} />
            <Route path="/inbox" element={<Inbox />} />
            <Route path="/setting" element={<Setting />} />
            <Route path="/ai" element={<AI />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/widgets" element={<Widgets/>} />

          </Routes>
        </div>
      </div>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <Layout />   {/* ✅ Now Layout is *inside* Router */}
    </Router>
  );
}
