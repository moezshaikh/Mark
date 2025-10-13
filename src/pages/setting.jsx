
import "../styles/setting.css";
// AccountSettings.jsx
import React, { useState } from "react";
import {
  User,
  Globe,
  HelpCircle,
  LogOut,
  Shield,
  FileText,
  Palette,
  ChevronRight,
} from "lucide-react";


export default function AccountSettings() {
  const [selectedLanguage] = useState("English");

  const handleSignOut = () => {
    alert("Signing out...");
  };

  const settingsSections = [
    {
      title: "Account",
      items: [
        { icon: User, label: "Personalization", action: () => console.log("Personalization"), hasArrow: true },
        { icon: Globe, label: "Language", value: selectedLanguage, hasArrow: true },
      ],
    },
    {
      title: "Support",
      items: [
        { icon: HelpCircle, label: "Help & Support", action: () => console.log("Help"), hasArrow: true },
      ],
    },
    {
      title: "Legal",
      items: [
        { icon: FileText, label: "Terms of Service", action: () => console.log("Terms"), hasArrow: true },
        { icon: Shield, label: "Privacy Policy", action: () => console.log("Privacy"), hasArrow: true },
      ],
    },
    {
      title: "Session",
      items: [
        { icon: LogOut, label: "Sign Out", action: handleSignOut, hasArrow: false, danger: true },
      ],
    },
  ];

  return (
    <div className="settings-container">
      <div className="settings-content">
        <header className="settings-header">
          <h1 className="settings-title">Settings</h1>
          <p className="settings-subtitle">Manage your account preferences</p>
        </header>

        {settingsSections.map((section, idx) => (
          <section key={idx} className="settings-section">
            <h2 className="settings-section-title">{section.title}</h2>
            <div className="settings-card">
              {section.items.map((item, itemIdx) => (
                <button
                  key={itemIdx}
                  onClick={item.action}
                  className={`settings-item ${item.danger ? "danger" : ""} ${
                    itemIdx !== section.items.length - 1 ? "bordered" : ""
                  }`}
                >
                  <div className="settings-left">
                    <item.icon size={20} className="settings-icon" />
                    <span className="settings-label">{item.label}</span>
                  </div>
                  <div className="settings-right">
                    {item.value && <span className="settings-value">{item.value}</span>}
                    {item.hasArrow && <ChevronRight size={18} className="settings-chevron" />}
                  </div>
                </button>
              ))}
            </div>
          </section>
        ))}

        <footer className="settings-footer">
          <p className="settings-footer-text">Version 1.0.0</p>
        </footer>
      </div>
    </div>
  );
}
