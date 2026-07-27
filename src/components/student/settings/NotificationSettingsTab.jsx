import React, { useState, useEffect } from 'react';
import { useDatabase } from '../../../context/DatabaseContext';

const NotificationSettingsTab = ({ user }) => {
  const { updateUser } = useDatabase();
  const [preferences, setPreferences] = useState({
    clinicalCase: user?.notificationPreferences?.clinicalCase ?? true,
    caseReturned: user?.notificationPreferences?.caseReturned ?? true,
    caseApproved: user?.notificationPreferences?.caseApproved ?? true,
    preceptorComments: user?.notificationPreferences?.preceptorComments ?? true,
    systemAnnouncements: user?.notificationPreferences?.systemAnnouncements ?? true,
  });

  const [initialPreferences, setInitialPreferences] = useState({ ...preferences });
  const [isDirty, setIsDirty] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    setIsDirty(
      preferences.clinicalCase !== initialPreferences.clinicalCase ||
      preferences.caseReturned !== initialPreferences.caseReturned ||
      preferences.caseApproved !== initialPreferences.caseApproved ||
      preferences.preceptorComments !== initialPreferences.preceptorComments ||
      preferences.systemAnnouncements !== initialPreferences.systemAnnouncements
    );
  }, [preferences, initialPreferences]);

  const handleToggle = (key) => {
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
    setIsSuccess(false);
  };

  const handleSave = () => {
    updateUser(user.id, {
      ...user,
      notificationPreferences: preferences
    });
    setInitialPreferences({ ...preferences });
    setIsDirty(false);
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 3000);
  };

  const handleReset = () => {
    setPreferences({ ...initialPreferences });
    setIsSuccess(false);
  };

  return (
    <div>
      <div className="settings-section-header">
        <h2 className="settings-section-title">Notification Settings</h2>
        <p className="settings-section-desc">Manage what events you want to be notified about.</p>
      </div>

      <div style={{ maxWidth: '600px' }}>
        <div className="notification-toggle-row">
          <div className="notification-info">
            <h4>Clinical Case Notifications</h4>
            <p>Receive updates when you create or submit a clinical case.</p>
          </div>
          <label className="toggle-switch">
            <input 
              type="checkbox" 
              checked={preferences.clinicalCase} 
              onChange={() => handleToggle('clinicalCase')}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>

        <div className="notification-toggle-row">
          <div className="notification-info">
            <h4>Case Returned Notifications</h4>
            <p>Get notified when your preceptor returns a case for correction.</p>
          </div>
          <label className="toggle-switch">
            <input 
              type="checkbox" 
              checked={preferences.caseReturned} 
              onChange={() => handleToggle('caseReturned')}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>

        <div className="notification-toggle-row">
          <div className="notification-info">
            <h4>Case Approved Notifications</h4>
            <p>Get notified when your clinical case has been approved.</p>
          </div>
          <label className="toggle-switch">
            <input 
              type="checkbox" 
              checked={preferences.caseApproved} 
              onChange={() => handleToggle('caseApproved')}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>

        <div className="notification-toggle-row">
          <div className="notification-info">
            <h4>Preceptor Comments</h4>
            <p>Receive alerts when a preceptor leaves feedback on your case forms.</p>
          </div>
          <label className="toggle-switch">
            <input 
              type="checkbox" 
              checked={preferences.preceptorComments} 
              onChange={() => handleToggle('preceptorComments')}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>

        <div className="notification-toggle-row">
          <div className="notification-info">
            <h4>System Announcements</h4>
            <p>Important updates regarding the PharmDVerse platform.</p>
          </div>
          <label className="toggle-switch">
            <input 
              type="checkbox" 
              checked={preferences.systemAnnouncements} 
              onChange={() => handleToggle('systemAnnouncements')}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>
      </div>

      <div className="settings-actions" style={{ alignItems: 'center' }}>
        <button className="settings-btn-save" disabled={!isDirty} onClick={handleSave}>
          Save Preferences
        </button>
        <button className="settings-btn-cancel" disabled={!isDirty} onClick={handleReset}>
          Reset
        </button>
        {isSuccess && <span style={{ color: 'var(--color-accent)', fontWeight: 500, marginLeft: '1rem' }}>Preferences saved successfully!</span>}
      </div>
    </div>
  );
};

export default NotificationSettingsTab;
