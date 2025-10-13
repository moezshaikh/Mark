// MarkAuthPage.jsx
import "../styles/auth.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BookMarked,
  Star,
  Bookmark,
  FolderOpen,
  Search,
  Share2,
} from "lucide-react";
import profile from "../Assets/profile.mp4";
import whatsapp from "../Assets/whatsapp.mp4";
import note from "../Assets/note.mp4";
import inbox from "../Assets/inbox.mp4";
import demo from "../Assets/demo.mp4";


export default function MarkAuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    remember: false,
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleGuestLogin = () => {
    navigate("/dashboard");
  };
  
  const handleScroll = (e) => {
  e.preventDefault(); // prevent default jump
  const section = document.getElementById("feature-section");
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
};


  return (
    
    <div className="auth-page">
      {/* Hero Section */}
      <section id="auth">
      <div className="auth-hero">
        {/* Left Side */}
        <div className="auth-left">
          <div className="auth-card">
            
            <h2 className="auth-subtitle">
              {isLogin ? "Welcome Back" : "Get Started"}
            </h2>
            <p className="auth-description">
              {isLogin
                ? "Log in to access Mark."
                : "Create an account to start Mark-ing."}
            </p>

            <div className="auth-form">
              {!isLogin && (
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                  />
                </div>
              )}

              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                />
              </div>

              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                />
              </div>

              {isLogin && (
                <div className="form-remember">
                  <label>
                    <input
                      type="checkbox"
                      name="remember"
                      checked={formData.remember}
                      onChange={handleChange}
                    />
                    Remember me
                  </label>
                  <button className="forgot-password">Forgot password?</button>
                </div>
              )}

              <button onClick={handleSubmit} className="auth-btn">
                {isLogin ? "Log In" : "Sign Up"}
              </button>
            </div>

            <div className="auth-switch">
              <p>
                {isLogin
                  ? "Don't have an account? "
                  : "Already have an account? "}
                <button onClick={() => setIsLogin(!isLogin)}>
                  {isLogin ? "Sign Up" : "Log In"}
                </button>
              </p>
            </div>

            <div className="guest-option">
  <button className="guest-btn" onClick={handleGuestLogin}>
    Continue as Guest
  </button>
</div>

          </div>
        </div>

        {/* Right Side */}
<div className="auth-right">
  <div className="auth-quote">
    <div className="auth-tagline">
      <span className="word">Don’t</span>
      <span className="word">just</span>
      <span className="word">note</span>
      <span className="word">it,</span>
      <strong className="word">Mark</strong>
      <strong className="word">It.</strong>
    </div>
  </div>

  

</div>


      </div>
</section>
      {/* Sections */}
      <section className="feature-section gray">
        <div className="feature-container">
          <section className="feature-section">
            <div className="feature-video blue">
              <video className="feature-media" controls autoPlay loop muted>
                <source src={demo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

            <div className="feature-text">
              <h2>See Mark AI in Action</h2>
              <p>
                Just type your question, idea, or task whether it's about
                business, productivity, or creativity and Mark responds
                instantly with smart, actionable insights.
              </p>
            </div>
          </section>
        </div>
      </section>

      <section className="feature-section white reverse">
        <div className="feature-container">
          <div className="feature-image dark">
            <video className="feature-media" controls autoPlay loop muted>
              <source src={inbox} type="video/mp4" />
            </video>
          </div>

          <div className="feature-text">
            <h2>Stay Effortlessly Organized</h2>
<p>
  With Mark AI, Gmail, Outlook, and WhatsApp come together in one place. Manage messages, schedule tasks, and stay on top of everything effortlessly. Your day, perfectly organized.
</p>

          </div>
        </div>
      </section>

      <section className="feature-section gray">
        <div className="feature-container">
          <div className="feature-image dark">
            <video className="feature-media" controls autoPlay loop muted>
          <source src={profile} type="video/mp4" />
            </video>

          </div>

          <div className="feature-text">
            <h2>Find Anything Instantly</h2>
            <p>
              Keep all your professional content from documents and resumes to
              your skills and work profile  perfectly organized in one secure
              place.
               Mark lets you find and share it effortlessly whenever
              needed.
            </p>
          </div>
        </div>
      </section>


      <section className="feature-section white reverse">
        <div className="feature-container">
          <div className="feature-image blue">
            <video className="feature-media" controls autoPlay loop muted>
        <source src={note} type="video/mp4" />
      </video>
          </div>

          <div className="feature-text">
            <h2>Smart Notes, Smarter Ideas</h2>
            <p>
              Capture thoughts, meeting points, or creative ideas instantly.
              Mark AI helps you organize notes with tags, reminders, and AI
              summaries, so nothing important ever slips away.
            </p>
          </div>
        </div>
      </section>

      <footer className="footer-cta" id="guest">
  <h2>Ready to Start Marking?</h2>
  <p>
    Join thousands of users who have transformed the way they organize and
    remember important information.
  </p>

  {/* Hero link button to jump to #auth */}
  <a href="#auth">
    <button>Get Started for Free</button>
  </a>

  <div className="cta-attribution">
    —{" "}
    <a
      href="https://www.linkedin.com/in/moez-shaikh/"
      target="_blank"
      rel="noopener noreferrer"
    >
      by Moez Shaikh
    </a>
  </div>
</footer>

    </div>
  );
}
