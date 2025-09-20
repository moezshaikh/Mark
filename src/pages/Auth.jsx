import "../styles/auth.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";  // 👈 for navigation

const AuthPage = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(0);
  const [prevFeature, setPrevFeature] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const features = [
    { title: "Welcome to Mark", description: "Your intelligent productivity companion designed to streamline your workflow and boost efficiency." },
    { title: "AI Assistant", description: "Get AI help to optimize workflow. " },
    { title: "AI Notes", description: "Capture, organize, and enhance your thoughts with intelligent suggestions." },
    { title: "Smart Calendar", description: "Organize your schedule effortlessly." },
    { title: "Task Tracking", description: "Track your tasks and projects intelligently." },
    { title: "Inbox", description: "Unified communication hub with smart filtering." },
    { title: "Projects", description: "Store and manage your Projects, Skills, and information seamlessly." },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setPrevFeature(currentFeature);
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [currentFeature, features.length]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleGoogleLogin = () => {
    console.log("Google login clicked");
  };

  const handleGuestLogin = () => {
    navigate("/dashboard"); // 👈 fixed: goes to dashboard
  };

  // ✅ make sure return is inside the function
  return (
    <div className="auth-container">
      {/* Left Panel - Auth Form */}
      <div className="auth-panel">
        <div className="auth-content">
          <div className="logo-section">
            <h1 className="logo">m</h1>
            <p className="tagline">Your intelligent productivity companion</p>
          </div>

          <div className="form-container">
            

            <div className="alt-actions">
              <button onClick={handleGoogleLogin} className="btn-google">
                Continue with Google
              </button>

              <div className="divider">
              <span>or</span>
            </div>


              <button onClick={handleGuestLogin} className="btn-guest">
                Continue as Guest
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Right Panel - Feature Showcase */}
      <div className="feature-panel">
        <div className="feature-background">
          <div className="abstract-shape shape-1"></div>
          <div className="abstract-shape shape-2"></div>
          <div className="abstract-shape shape-3"></div>
        </div>

        <div className="feature-content">
          <div className="feature-showcase">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`feature-item 
                  ${index === currentFeature ? "active" : ""} 
                  ${index === prevFeature ? "exit" : ""}`}
              >
                <div className="feature-card">
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-description">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="feature-indicators">
            {features.map((_, index) => (
              <div
                key={index}
                className={`indicator ${
                  index === currentFeature ? "active" : ""
                }`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
