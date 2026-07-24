import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BellRing, Save } from 'lucide-react';
import CollegeAdminLayout from '../../components/college/CollegeAdminLayout';
import './SettingsPage.css';

const NotificationSettings = () => {
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('erp_admin_notification_settings');
    if (saved) return JSON.parse(saved);
    return {
      emailNotifs: true,
      systemNotifs: true,
      loginAlerts: false
    };
  });

  const handleToggle = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    localStorage.setItem('erp_admin_notification_settings', JSON.stringify(settings));
    alert('Notification Settings saved successfully!');
  };

  const handleReset = () => {
    setSettings({
      emailNotifs: true,
      systemNotifs: true,
      loginAlerts: false
    });
    localStorage.removeItem('erp_admin_notification_settings');
  };

  return (
    <CollegeAdminLayout>
      <div className="settings-page-container">
        
        <div className="page-header">
          <h1 className="page-title">Notification Settings</h1>
          <div className="breadcrumbs">
            <Link to="/college-admin/dashboard" className="breadcrumb-link">Dashboard</Link>
            <span className="breadcrumb-separator">&gt;</span>
            <Link to="/college-admin/settings" className="breadcrumb-link">Settings</Link>
            <span className="breadcrumb-separator">&gt;</span>
            <span>Notification Settings</span>
          </div>
        </div>

        <div className="settings-card">
          <h2 className="settings-section-title">
            <BellRing size={20} className="text-green" />
            Notification Preferences
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Email Notifications</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Receive important updates and reports via email.</p>
              </div>
              <div className="toggle-container" style={{ margin: 0 }}>
                <label className="toggle-switch">
                  <input type="checkbox" checked={settings.emailNotifs} onChange={() => handleToggle('emailNotifs')} />
                  <span className="toggle-slider"></span>
                </label>
                <span className={`toggle-label ${settings.emailNotifs ? 'active-label' : 'inactive-label'}`} style={{ width: '60px' }}>
                  {settings.emailNotifs ? 'Enabled' : 'Disabled'}
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>System Notifications</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Receive alerts within the PharmDVerse portal.</p>
              </div>
              <div className="toggle-container" style={{ margin: 0 }}>
                <label className="toggle-switch">
                  <input type="checkbox" checked={settings.systemNotifs} onChange={() => handleToggle('systemNotifs')} />
                  <span className="toggle-slider"></span>
                </label>
                <span className={`toggle-label ${settings.systemNotifs ? 'active-label' : 'inactive-label'}`} style={{ width: '60px' }}>
                  {settings.systemNotifs ? 'Enabled' : 'Disabled'}
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Login Alerts</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Get notified of new logins to your administrator account.</p>
              </div>
              <div className="toggle-container" style={{ margin: 0 }}>
                <label className="toggle-switch">
                  <input type="checkbox" checked={settings.loginAlerts} onChange={() => handleToggle('loginAlerts')} />
                  <span className="toggle-slider"></span>
                </label>
                <span className={`toggle-label ${settings.loginAlerts ? 'active-label' : 'inactive-label'}`} style={{ width: '60px' }}>
                  {settings.loginAlerts ? 'Enabled' : 'Disabled'}
                </span>
              </div>
            </div>

          </div>

          <div className="settings-footer">
            <button className="btn-cancel" onClick={() => window.history.back()}>Cancel</button>
            <button className="btn-reset" onClick={handleReset}>Reset</button>
            <button className="btn-save" onClick={handleSave}><Save size={18} /> Save Changes</button>
          </div>

        </div>

      </div>
    </CollegeAdminLayout>
  );
};

export default NotificationSettings;
