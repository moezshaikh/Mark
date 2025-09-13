import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Hero.css"; // import CSS file
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function HeroArrow() {
  const [clicked, setClicked] = useState(false);
  const navigate = useNavigate();

  const handleBegin = () => {
    setClicked(true); // trigger animation
    setTimeout(() => {
      navigate("/auth"); // ✅ navigate to Auth page
    }, 500); // wait for animation to finish
  };

  return (
    <div className="hero-container">
      <div className="hero-overlay">
        <h1 className="hero-title">Mark.</h1>

        <motion.div
          className="hero-arrow"
          onClick={handleBegin}
          animate={clicked ? { x: 800, opacity: 0 } : { x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <ArrowRight size={40} />
        </motion.div>
      </div>
    </div>
  );
}
