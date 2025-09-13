// src/Components/Sidebar.jsx
import React, { useState } from "react";
import {
  LayoutDashboard,
  FolderOpen,
  Award,
  User,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Search,
  Calendar,  // Changed from 'Calender' to 'Calendar'
  HelpCircle,
  MessageSquare,
  Clock,
  UserCircle,
  Edit3,
  Trash2,
  Grid
} from "lucide-react";
import { NavLink } from "react-router-dom";
import '../styles/Sidebar.css';
const NAV = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { label: "Projects", icon: FolderOpen, path: "/projects" },
  { label: "Inbox", icon: Award, path: "/inbox" },
];

const QUICK_ACTIONS = [
  { label: "Search", icon: Search, action: "search" },
  { label: "Calendar", icon: Calendar, path: "/calendar" },
  { label: "Notes", icon: Edit3, path: "/notes" },
  { label: "Widgets", icon: Grid, path: "/widgets" }, // 👈 Added Widgets
];



const RECENT_CHATS = [
  { id: 1, title: "Project Planning", timestamp: "2h ago", unread: 2 },
  { id: 2, title: "Team Meeting", timestamp: "4h ago", unread: 0 },
  { id: 3, title: "Design Review", timestamp: "1d ago", unread: 1 },
  { id: 4, title: "Client Feedback", timestamp: "2d ago", unread: 0 },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const handleQuickAction = (action) => {
    console.log(`Quick action: ${action}`);
    // Add your action handlers here
  };

  const handleChatClick = (chatId) => {
    console.log(`Open chat: ${chatId}`);
    // Navigate to chat
  };

  const handleProfileAction = (action) => {
    console.log(`Profile action: ${action}`);
    setShowProfile(false);
    // Add profile action handlers
  };

  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      {/* Header */}
      <div className="sidebar-header">
  <div className="sidebar-logo">
    <button
      className="collapse-btn"
      onClick={() => setCollapsed(!collapsed)}
      title={collapsed ? "Expand" : "Collapse"}
    >
      {collapsed ? (
        <div className="logo-icon">m</div>  // acts like ChevronRight
      ) : (
        <ChevronLeft size={16} />           // expanded state
      )}
    </button>
  </div>
</div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        <ul className="nav-list">
          {NAV.map((item) => {
            const IconComponent = item.icon;
            return (
              <li key={item.label}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => 
                    `nav-item ${isActive ? "active" : ""}`
                  }
                  title={collapsed ? item.label : ""}
                >
                  <div className="nav-icon">
                    <IconComponent size={20} />
                  </div>
                  {!collapsed && (
                    <span className="nav-label">{item.label}</span>
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Recent Chats */}
      {!collapsed && (
        <div className="sidebar-section">
          <div className="section-header">
            <MessageSquare size={16} />
            <span>Recent Chats</span>
          </div>
          <div className="recent-chats">
            {RECENT_CHATS.map((chat) => (
              <div
                key={chat.id}
                className="chat-item"
                onClick={() => handleChatClick(chat.id)}
              >
                <div className="chat-content">
                  <div className="chat-title">{chat.title}</div>
                  <div className="chat-timestamp">
                    <Clock size={12} />
                    {chat.timestamp}
                  </div>
                </div>
                {chat.unread > 0 && (
                  <div className="unread-badge">{chat.unread}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Actions */}
<div className="sidebar-section">
  {!collapsed && (
    <div className="section-header">
      <span>Quick Actions</span>
    </div>
  )}
  <div className="quick-actions">
    {QUICK_ACTIONS.map((action) => {
      const IconComponent = action.icon;

      // If it has a path, use NavLink
      if (action.path) {
        return (
          <NavLink
            key={action.label}
            to={action.path}
            className="quick-action"
            title={action.label}
          >
            <IconComponent size={18} />
            {!collapsed && <span>{action.label}</span>}
          </NavLink>
        );
      }

      // Otherwise fall back to button
      return (
        <button
          key={action.label}
          className="quick-action"
          onClick={() => handleQuickAction(action.action)}
          title={action.label}
        >
          <IconComponent size={18} />
          {!collapsed && <span>{action.label}</span>}
        </button>
      );
    })}
  </div>
</div>


      {/* User Profile Footer */}
      <div className="sidebar-footer">
        <div className="user-profile">
          <button
            className="profile-trigger"
            onClick={() => setShowProfile(!showProfile)}
            title="User Profile"
          >
            <div className="profile-avatar">
              <UserCircle size={32} />
            </div>
            {!collapsed && (
              <div className="profile-info">
                <div className="profile-name">Moez</div>
                <div className="profile-email">Moez@example.com</div>
              </div>
            )}
          </button>

          {/* Profile Dropdown */}
          {showProfile && (
            <div className="profile-dropdown">
              <div className="dropdown-header">
                <div className="dropdown-avatar">
                  <UserCircle size={40} />
                </div>
                <div className="dropdown-info">
                  <div className="profile-name">Moez</div>
                <div className="profile-email">Moez@example.com</div>
                </div>
              </div>
              <div className="dropdown-divider"></div>
              <div className="dropdown-actions">
                <button
                  className="dropdown-action"
                  onClick={() => handleProfileAction('profile')}
                >
                  <User size={16} />
                  <span>Profile</span>
                </button>
                <button
                  className="dropdown-action"
                  onClick={() => handleProfileAction('settings')}
                >
                  <Settings size={16} />
                  <span>Account Settings</span>
                </button>
                <button
                  className="dropdown-action"
                  onClick={() => handleProfileAction('logout')}
                >
                  <LogOut size={16} />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Backdrop for mobile */}
      {showProfile && <div className="profile-backdrop" onClick={() => setShowProfile(false)} />}
    </aside>
  );
}