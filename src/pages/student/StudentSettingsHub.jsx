import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UserCircle, KeyRound, BellRing, Palette, Info } from 'lucide-react';
import StudentLayout from '../../components/student/StudentLayout';
import { useAuth } from '../../context/AuthContext';
import { useDatabase } from '../../context/DatabaseContext';

// Import newly created tab components
import ProfileSettingsTab from '../../components/student/settings/ProfileSettingsTab';
import SecuritySettingsTab from '../../components/student/settings/SecuritySettingsTab';
import NotificationSettingsTab from '../../components/student/settings/NotificationSettingsTab';
import AppearanceTab from '../../components/student/settings/AppearanceTab';
import AccountInfoTab from '../../components/student/settings/AccountInfoTab';

// Import styles
import '../college/PreceptorManagement.css';
import './StudentSettings.css';

const StudentSettingsHub = () => {
  const { currentUser } = useAuth();
  const { users } = useDatabase();
  const user = users.find(u => u.id === currentUser?.id);
  
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('profile');

  // Handle direct navigation to notification settings if coming from hub cards previously
  useEffect(() => {
    if (location.pathname.includes('/settings/notifications')) {
      setActiveTab('notifications');
    }
  }, [location]);

  if (!user) return <StudentLayout><div style={{ padding: '2rem' }}>Loading...</div></StudentLayout>;

  return (
    <StudentLayout>
      <div className="preceptor-page">
        <div className="breadcrumb">
          <Link to="/student/dashboard">Dashboard</Link>
          <span> / </span>
          <span className="current">Settings</span>
        </div>

        <div className="page-header" style={{ marginBottom: '1rem' }}>
          <div className="header-title">
            <h1>Settings</h1>
            <p className="subtitle">Manage your personal account preferences securely.</p>
          </div>
        </div>

        <div className="settings-container">
          {/* Sidebar Navigation */}
          <div className="settings-sidebar">
            <button 
              className={`settings-tab ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              <UserCircle size={20} />
              Profile Settings
            </button>
            <button 
              className={`settings-tab ${activeTab === 'security' ? 'active' : ''}`}
              onClick={() => setActiveTab('security')}
            >
              <KeyRound size={20} />
              Security Settings
            </button>
            <button 
              className={`settings-tab ${activeTab === 'notifications' ? 'active' : ''}`}
              onClick={() => setActiveTab('notifications')}
            >
              <BellRing size={20} />
              Notification Settings
            </button>
            <button 
              className={`settings-tab ${activeTab === 'appearance' ? 'active' : ''}`}
              onClick={() => setActiveTab('appearance')}
            >
              <Palette size={20} />
              Appearance
            </button>
            <button 
              className={`settings-tab ${activeTab === 'account' ? 'active' : ''}`}
              onClick={() => setActiveTab('account')}
            >
              <Info size={20} />
              Account Information
            </button>
          </div>

          {/* Main Content Area */}
          <div className="settings-content-area">
            {activeTab === 'profile' && <ProfileSettingsTab user={user} />}
            {activeTab === 'security' && <SecuritySettingsTab user={user} />}
            {activeTab === 'notifications' && <NotificationSettingsTab user={user} />}
            {activeTab === 'appearance' && <AppearanceTab />}
            {activeTab === 'account' && <AccountInfoTab user={user} />}
          </div>
        </div>
      </div>
    </StudentLayout>
  );
};

export default StudentSettingsHub;
