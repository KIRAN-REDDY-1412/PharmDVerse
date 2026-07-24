import React from 'react';
import { Search, Bell, Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import '../college/CollegeHeader.css';

const PreceptorHeader = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <header className="college-header">
      
      <div className="header-top-row">
        <span className="header-admin-label">Preceptor Portal</span>
        <span className="header-brand-title">PharmDVerse Medical College</span>
      </div>

      <div className="header-bottom-row">
        <div className="header-search">
          <Search className="search-icon" size={16} />
          <input 
            type="text" 
            placeholder="Search for students, cases..." 
            aria-label="Search"
          />
        </div>

        <div className="header-actions">
          <button className="header-action-btn" aria-label="Notifications" style={{ marginRight: '1rem' }}>
            <Bell size={22} strokeWidth={1.5} />
            <span className="notification-badge">3</span>
          </button>

          <div style={{ width: '1px', height: '24px', backgroundColor: 'var(--border-color)', marginRight: '1rem' }}></div>

          <div className="theme-toggle-container">
            <Sun size={16} color="var(--text-secondary)" />
            <div className="theme-switch" onClick={toggleTheme}>
              <div className="theme-switch-knob"></div>
            </div>
            <Moon size={16} color="var(--text-secondary)" />
          </div>
        </div>
      </div>
      
    </header>
  );
};

export default PreceptorHeader;
