import React from 'react';
import { Search, Bell, Moon, Sun, User } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { useDatabase } from '../../context/DatabaseContext';
import { Link } from 'react-router-dom';
import '../college/CollegeHeader.css';

const StudentHeader = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { currentUser } = useAuth();
  const { notifications } = useDatabase();

  const unreadCount = currentUser ? notifications.filter(n => n.recipientId === currentUser.id && n.status === 'Unread').length : 0;

  return (
    <header className="college-header">
      
      {/* Top Row: Admin Label & College Name */}
      <div className="header-top-row">
        <span className="header-admin-label">STUDENT PORTAL</span>
        <span className="header-brand-title">PharmDVerse Medical College</span>
      </div>

      {/* Bottom Row: Search & Actions */}
      <div className="header-bottom-row">
        <div className="header-search">
          <Search className="search-icon" size={16} />
          <input 
            type="text" 
            placeholder="Search for students, cases, preceptors..." 
            aria-label="Search"
          />
        </div>

        <div className="header-actions">
          <Link to="/student/notifications" className="header-action-btn" aria-label="Notifications" style={{ marginRight: '1rem', textDecoration: 'none' }}>
            <Bell size={22} strokeWidth={1.5} />
            {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
          </Link>

          <div style={{ width: '1px', height: '24px', backgroundColor: 'var(--border-color)', marginRight: '1rem' }}></div>

          <div className="theme-toggle-container">
            <Sun size={16} color="var(--text-secondary)" />
            <div className="theme-switch" onClick={toggleTheme}>
              <div className="theme-switch-knob"></div>
            </div>
            <Moon size={16} color="var(--text-secondary)" />
          </div>

          {currentUser?.profilePhoto ? (
            <img src={currentUser.profilePhoto} alt="Profile" className="header-profile-photo" />
          ) : (
            <div className="header-profile-photo" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--bg-surface-alt)' }}>
              <User size={20} color="var(--text-secondary)" />
            </div>
          )}
        </div>
      </div>
      
    </header>
  );
};

export default StudentHeader;
