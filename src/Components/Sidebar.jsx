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
  Calendar,
  MessageSquare,
  UserCircle,
  Edit3,
  Grid
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/Sidebar.css";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(true);
  const [showProfile, setShowProfile] = useState(false);
  const isExpanded = !collapsed;

  // ✅ Hook must be inside the component
  const navigate = useNavigate();

  const NAV = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { label: "Projects", icon: FolderOpen, path: "/projects" },
    { label: "Inbox", icon: Award, path: "/inbox" },
  ];

  const QUICK_ACTIONS = [
    { label: "Search", icon: Search, action: "search" },
    { label: "Calendar", icon: Calendar, path: "/calendar" },
    { label: "Notes", icon: Edit3, path: "/notes" },
  ];

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
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
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
                  {isExpanded && <span className="nav-label">{item.label}</span>}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Recent Chats / Auth Prompt */}
      {isExpanded && (
        <div className="sidebar-section">
          <div className="section-header">
            <MessageSquare size={16} />
            <span>Recent Chats</span>
          </div>

          <div className="recent-chats">
            <div className="login-prompt">
              <p>
                Please <strong>login</strong> to see your recent chats.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="sidebar-section">
        {isExpanded && (
          <div className="section-header">
            <span>Quick Actions</span>
          </div>
        )}
        <div className="quick-actions">
          {QUICK_ACTIONS.map((action) => {
            const IconComponent = action.icon;
            if (action.path) {
              return (
                <NavLink
                  key={action.label}
                  to={action.path}
                  className="quick-action"
                  title={action.label}
                >
                  <IconComponent size={18} />
                  {isExpanded && <span>{action.label}</span>}
                </NavLink>
              );
            }
            return (
              <button
                key={action.label}
                className="quick-action"
                onClick={() => console.log(`Quick action: ${action.action}`)}
                title={action.label}
              >
                <IconComponent size={18} />
                {isExpanded && <span>{action.label}</span>}
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
            {isExpanded && (
              <div className="profile-info">
                <div className="profile-name">Moez</div>
                <div className="profile-email">moez@example.com</div>
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
                  <div className="profile-email">moez@example.com</div>
                </div>
              </div>
              <div className="dropdown-divider"></div>
              <div className="dropdown-actions">
                
                <button
  className="dropdown-action"
  onClick={() => navigate("/setting")}
>
  <Settings size={16} />
  <span>Account Settings</span>
</button>

                <button
                  className="dropdown-action"
                  onClick={() => console.log("Logout")}
                >
                  <LogOut size={16} />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Backdrop for Profile */}
      {showProfile && (
        <div
          className="profile-backdrop"
          onClick={() => setShowProfile(false)}
        />
      )}
    </aside>
  );
}
