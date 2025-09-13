import '../styles/Project.css';
import React, { useState, useEffect } from 'react';
import { 
  Github, Linkedin, Instagram, Download, ExternalLink, Calendar, Award, 
  Code, Brain, Zap, Users, Shuffle, MapPin, Briefcase, CheckCircle2, Edit 
} from 'lucide-react';
import noorImg from "../Assets/n.png";
import sukoonImg from "../Assets/s.png";
import lafzImg from "../Assets/l.png";

const Portfolio = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const skills = [
    { name: 'React & Next.js', level: 90 },
    { name: 'Node.js & Express', level: 85 },
    { name: 'Python & AI/ML', level: 88 },
    { name: 'Database Design', level: 82 },
    { name: 'Cloud Computing', level: 80 },
    { name: 'DevOps & CI/CD', level: 75 }
  ];

  const experiences = [
    {
      year: '2024',
      role: 'Full Stack Developer Intern',
      company: 'Tech Innovation Labs',
      description: 'Developed scalable web applications using React and Node.js, implemented AI-driven features.'
    },
    {
      year: '2023',
      role: 'AI Research Assistant',
      company: 'University Research Center',
      description: 'Conducted research on machine learning algorithms, published findings in academic journals.'
    },
    {
      year: '2022',
      role: 'Frontend Developer',
      company: 'StartupXYZ',
      description: 'Created responsive user interfaces, optimized performance, and enhanced user experience.'
    }
  ];

  const initialFacts = [
    { label: "Location", value: " Maharashtra" },
    { label: "Experience", value: "2+ Years" },
    { label: "Focus", value: "Full Stack & AI" },
    { label: "Availability", value: "Open for Opportunities" }
  ];

  const [facts, setFacts] = useState(initialFacts);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editValue, setEditValue] = useState("");

  function shuffleFacts() {
    const arr = [...facts];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    setFacts(arr);
  }

  function handleEdit(index, value) {
    setEditingIndex(index);
    setEditValue(value);
  }

  function saveEdit(index) {
    const updatedFacts = [...facts];
    updatedFacts[index].value = editValue;
    setFacts(updatedFacts);
    setEditingIndex(null);
  }

  return (
    <div className="portfolio">
      {/* Hero Section */}
      <section className="hero-section">
  <div className="hero-background"></div>
  <div className={`hero-content ${isVisible ? 'visible' : ''}`}>
    <h1 className="hero-title">Moez</h1>
    <p className="hero-subtitle">
      IT Engineering Student • Full Stack Developer • AI Enthusiast • Creative Technologist
    </p>

    {/* Quick Access Links */}
    <div className="hero-links">
      <a href="#about" className="hero-link">About</a>
      <a href="#Education" className="hero-link">Education & Certificates</a>
      <a href="#Projects" className="hero-link">Projects</a>
      <a href="#Skills" className="hero-link">Skills</a>
      <a href="#contact" className="hero-link">Contact</a>
    </div>
  </div>
</section>


{/* About Me Section */}
<section id="about" className="section alternate linked-edu-cert">
  <div className="container">
    <header className="section-header">
          <h2 className="section-title">About Me</h2>
        </header>
        <div className="grid-layout">
          {/* Left: About Text */}
          <div className="about-card">
            <p className="about-text">
              I'm a passionate IT Engineering student with a deep love for technology and innovation.
              My journey began with curiosity about how things work, and it has evolved into a mission
              to create solutions that matter.
            </p>
            <p className="about-text mt">
              I specialize in full-stack development and AI technologies, always seeking to push
              boundaries and explore new possibilities. When I'm not coding, you'll find me learning
              about emerging technologies or working on creative projects.
            </p>

            <div className="tags">
              <span className="tag"><Code size={18}/> Full Stack Development</span>
              <span className="tag"><Brain size={18}/> AI & Machine Learning</span>
              <span className="tag"><Zap size={18}/> Innovation</span>
            </div>
          </div>

          {/* Right: Quick Facts */}
          <aside className="facts-card">
            <div className="facts-header">
              <h3 className="facts-title">Quick Facts</h3>
              <button onClick={shuffleFacts} className="btn">
                <Shuffle size={16}/> Shuffle
              </button>
            </div>

            <ul className="facts-list">
              {facts.map((fact, idx) => {
                const Icon = fact.icon || CheckCircle2;
                return (
                  <li key={idx} className={`fact-item ${fact.highlight ? "highlight" : ""}`}>
                    <div className="fact-info">
                      <Icon size={16} className="icon" />
                      <span className="fact-label">{fact.label}</span>
                    </div>

                    {editingIndex === idx ? (
                      <div className="edit-section">
                        <input
                          type="text"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          className="edit-input"
                        />
                        <button onClick={() => saveEdit(idx)} className="btn save-btn">Save</button>
                      </div>
                    ) : (
                      <div className="fact-actions">
                        <span className="fact-value">{fact.value}</span>
                        <button onClick={() => handleEdit(idx, fact.value)} className="btn edit-btn">
                          <Edit size={14}/>
                        </button>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </aside>
        </div>
      </div>
    </section>

       {/* Education & Certifications - LinkedIn Style */}
<section id="Education"className="section alternate linked-edu-cert">
  <div className="container">
    <h2 className="section-title">Education & Certifications</h2>

    <div className="edu-cert-timeline">

      {/* Education */}
      <div className="timeline-card">
        <div className="timeline-dot blue"></div>
        <div className="timeline-content">
          <h4>Bachelor of Engineering - IT</h4>
          <p className="institution">SANDIP INSTITUTE OF TECHNOLOGY AND REASEARCH CENTER</p>
          <p className="duration">2021 - 2025 | CGPA: 8.5/10</p>
        </div>
      </div>

      <div className="timeline-card">
        <div className="timeline-dot purple"></div>
        <div className="timeline-content">
          <h4>Higher Secondary Education</h4>
          <p className="institution">R.B.N.B COLLEGE</p>
          <p className="duration">2019 - 2021 | 92%</p>
        </div>
      </div>

      {/* Certifications */}
      <div className="timeline-card">
        <div className="timeline-dot yellow"></div>
        <div className="timeline-content">
          <h4>Certifications & Courses</h4>
          <ul className="cert-list">
            <li>AWS Cloud Practitioner</li>
            <li>Google AI/ML Certificate</li>
            <li>Meta React Developer</li>
            <li>MongoDB Database Administrator</li>
            <li>Docker & Kubernetes Fundamentals</li>
          </ul>
        </div>
      </div>

    </div>
  </div>
</section>


      {/* Experience Timeline */}
      <section id ="Experience"className="section">
        <div className="container timeline-container">
          <h2 className="section-title">Experience Timeline</h2>
          <div className="timeline">
            <div className="timeline-line"></div>
            {experiences.map((exp, index) => (
              <div key={index} className={`timeline-item ${index % 2 === 0 ? 'right' : 'left'}`}>
                <div className="timeline-content">
                  <div className="timeline-year">
                    <Calendar className="calendar-icon" size={16} />
                    <span>{exp.year}</span>
                  </div>
                  <h3 className="timeline-role">{exp.role}</h3>
                  <p className="timeline-company">{exp.company}</p>
                  <p className="timeline-description">{exp.description}</p>
                </div>
                <div className="timeline-dot"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
<section id ="Projects"className="section alternate">
  <div className="container">
    <h2 className="section-title">Featured Projects</h2>
    <div className="projects-grid">

      {/* Noor */}
<div className="project-card">
  <img 
    src={noorImg}  
    alt="Noor Project" 
    className="project-image" 
  />
  <div className="project-details">
    <h3 className="project-title">Noor</h3>
    <p className="project-description">
      An Islamic calligraphy-inspired art website blending AI and creativity. 
    </p>
    <p className="project-description">
  Noor provides users with a space to explore, appreciate, and generate 
  elegant calligraphic art forms.  
</p>
    <div className="project-tech">
      <span className="tech-tag">React</span>
      <span className="tech-tag">CSS</span>
      <span className="tech-tag">Tailwind</span>
    </div>
    {/* ✅ Consistent links wrapper */}
    <div className="project-links">
      <a 
        href="https://noor-jtay.vercel.app/" 
        target="_blank" 
        rel="noopener noreferrer"
        className="project-link"
      >
        Demo
      </a>
      <a href="#" target="_blank" rel="noopener noreferrer" className="project-link">
        GitHub
      </a>
      <a 
        href="https://www.linkedin.com/posts/moez-shaikh_reactjs-frontenddevelopment-uiux-activity-7361799116974137344-rQC6?utm_source=share&utm_medium=member_desktop&rcm=ACoAAD8_IdkB6Ly20KuYMfPb4FeaZyNIdyd_eFM" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="project-link"
      >
        LinkedIn
      </a>
    </div>
  </div>
</div>


      {/* Sukoon */}
      <div className="project-card">
        <img 
          src={sukoonImg} 
          alt="Sukoon Project" 
          className="project-image" 
        />
        <div className="project-details">
          <h3 className="project-title">Sukoon</h3>
          <p className="project-description">
            An  AI-powered mental health checker that detects stress, 
            depression, or emotional struggles through text, writing, or speech. 
            A free tool that works like a supportive digital therapist.
          </p>
          <div className="project-tech">
            <span className="tech-tag">React</span>
            <span className="tech-tag">Python</span>
            <span className="tech-tag">AI</span>
          </div>
          <div className="project-links">
  <a href="https://sukoon-frontend.vercel.app/" target="_blank" rel="noopener noreferrer"className="project-link">Demo</a>
  <a href="#" target="_blank" rel="noopener noreferrer" className="project-link">GitHub</a>
<a 
  href="https://www.linkedin.com/posts/moez-shaikh_mentalhealthmatters-reactjs-nodejs-activity-7348643773444190210-LBOx?utm_source=share&utm_medium=member_desktop&rcm=ACoAAD8_IdkB6Ly20KuYMfPb4FeaZyNIdyd_eFM" 
  target="_blank" 
  rel="noopener noreferrer" 
  className="project-link"
>
  LinkedIn
</a>
</div>

        </div>
      </div>

      {/* Lafz */}
      <div className="project-card">
        <img 
          src={lafzImg} 
          alt="Lafz Project" 
          className="project-image" 
        />
        <div className="project-details">
          <h3 className="project-title">Lafz</h3>
          <p className="project-description">
            A poetry-sharing platform built in React that showcases Urdu shayari 
            (written in Roman script). Includes search, trending poets, and genre-based 
            navigation for a smooth reading experience.
          </p>
          <div className="project-tech">
            <span className="tech-tag">React</span>
            <span className="tech-tag">JavaScript</span>
            <span className="tech-tag">Custom CSS</span>
          </div>
          <div className="project-links">
            <a href="#" target="_blank" className="project-link">Demo</a>
            <a href="#" target="_blank" className="project-link">GitHub</a>
            <a href="#" target="_blank" className="project-link">LinkedIn</a>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>

{/* Skills & Expertise */}
<section id ="Skills"className="section alternate">
  <div className="container">
    <h2 className="section-title">Skills & Expertise</h2>
    <div className="skills-grid">

      {/* Technical Skills */}
      <div className="skills-column card">
        <h3 className="skills-subtitle black">Technical Skills</h3>
        <div className="skills-list">
          {skills.slice(0, 5).map((skill, index) => (
            <div key={index} className="skill-item">
              {skill.name}
            </div>
          ))}

          {skills.length > 5 && (
            <details className="skill-dropdown">
              <summary>Show More</summary>
              <div className="skills-list-dropdown">
                {skills.slice(5).map((skill, index) => (
                  <div key={index} className="skill-item">
                    {skill.name}
                  </div>
                ))}
              </div>
            </details>
          )}
        </div>
      </div>

      {/* Core Competencies */}
      <div className="competencies-column card">
        <h3 className="skills-subtitle blue">Core Competencies</h3>
        <div className="competencies-grid">
          {[
            'Problem Solving',
            'Team Leadership',
            'Project Management',
            'Agile Development',
            'System Design',
            'Code Review',
            'Mentoring',
            'Innovation',
          ].map((competency, index) => (
            <div key={index} className="competency-item">
              {competency}
            </div>
          ))}
        </div>
      </div>

    </div>
  </div>
</section>


      {/* Footer */}
<footer className="footer" id="contact">
  <div className="container">
    <h3 className="footer-title">Let's Connect</h3>

    <p className="footer-description">
      Always open for discussing new opportunities, interesting projects, or just having a chat about technology and innovation.
    </p>

    <div className="footer-social">
      <a
        href="https://www.linkedin.com/in/moez-shaikh"
        target="_blank"
        rel="noopener noreferrer"
        className="footer-social-link linkedin"
      >
        <Linkedin size={24} />
      </a>

      <a
        href="https://github.com/moezshaikh"
        target="_blank"
        rel="noopener noreferrer"
        className="footer-social-link github"
      >
        <Github size={24} />
      </a>

      <a
        href="https://www.instagram.com/moez.skh_"
        target="_blank"
        rel="noopener noreferrer"
        className="footer-social-link instagram"
      >
        <Instagram size={24} />
      </a>
    </div>

    <p className="footer-copyright">
      © 2025{" "}
      <a
        href="https://www.linkedin.com/in/moez-shaikh"
        target="_blank"
        rel="noopener noreferrer"
        className="footer-link"
      >
        Moez Shaikh
      </a>
      . Crafted with passion and purpose.
    </p>
  </div>
</footer>

    </div>
  );
};

export default Portfolio;