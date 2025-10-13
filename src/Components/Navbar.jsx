import '../styles/Navbar.css';
import React, { useState, useEffect } from 'react';
import { Share2, MoreVertical, HelpCircle, Settings, LogOut,Trash  } from 'lucide-react';


const Navbar = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown')) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'MyApp',
          text: 'Check out this amazing app!',
          url: window.location.href
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        // You could add a toast notification here
        console.log('Link copied to clipboard!');
      }
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setShowDropdown(!showDropdown);
  };

  const handleMenuClick = (action) => {
    setShowDropdown(false);
    // Handle different menu actions
    switch(action) {
      case 'help':
        console.log('Help clicked');
        break;
      case 'settings':
        console.log('Settings clicked');
        break;
      case 'logout':
        console.log('Logout clicked');
        break;
      default:
        break;
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="logo">
          <h1></h1>
        </div>
      </div>
      
      <div className="navbar-right">
        <div className="time-display">
          <div className="time">{formatTime(currentTime)}</div>
          <div className="date">{formatDate(currentTime)}</div>
        </div>
        
        <button className="share-btn" onClick={handleShare} aria-label="Share">
          <Share2 size={18} />
          <span>Share</span>
        </button>
        
        <div className="dropdown">
          <button 
            className="menu-btn" 
            onClick={toggleDropdown}
            aria-label="Menu"
            aria-expanded={showDropdown}
          >
            <MoreVertical size={18} />
          </button>
          
          <div className={`dropdown-menu ${showDropdown ? 'show' : ''}`}>
            <button 
              className="dropdown-item" 
              onClick={() => handleMenuClick('help')}
            >
              <HelpCircle size={16} />
              <span>Help</span>
            </button>
            <button 
              className="dropdown-item" 
              onClick={() => handleMenuClick('settings')}
            >
              <Settings size={16} />
              <span>Settings</span>
            </button>
            <hr className="dropdown-divider" />
            <button 
              className="dropdown-item danger" 
              onClick={() => handleMenuClick('logout')}
            >
              <Trash size={16} />
              <span>Trash</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;