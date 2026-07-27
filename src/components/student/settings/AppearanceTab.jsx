import React from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';

const AppearanceTab = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div>
      <div className="settings-section-header">
        <h2 className="settings-section-title">Appearance</h2>
        <p className="settings-section-desc">Customize how the Student Portal looks on your device.</p>
      </div>

      <div className="theme-options">
        <div 
          className={`theme-card ${theme === 'light' ? 'active' : ''}`}
          onClick={() => { if (theme !== 'light') toggleTheme(); }}
        >
          <div className="theme-icon-wrapper">
            <Sun size={24} />
          </div>
          <span className="theme-title">Light Mode</span>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Clean and bright.</p>
        </div>

        <div 
          className={`theme-card ${theme === 'dark' ? 'active' : ''}`}
          onClick={() => { if (theme !== 'dark') toggleTheme(); }}
        >
          <div className="theme-icon-wrapper">
            <Moon size={24} />
          </div>
          <span className="theme-title">Dark Mode</span>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Easy on the eyes.</p>
        </div>

        <div 
          className="theme-card"
          onClick={() => alert("System default syncing will be implemented in future updates.")}
        >
          <div className="theme-icon-wrapper">
            <Monitor size={24} />
          </div>
          <span className="theme-title">System Default</span>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Syncs with OS.</p>
        </div>
      </div>
    </div>
  );
};

export default AppearanceTab;
