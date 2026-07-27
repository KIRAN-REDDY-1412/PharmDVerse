import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  UserCircle, Lock, Shield, Settings2, Activity, 
  Camera, Trash2, Mail, Phone, Calendar, Save,
  CheckCircle, AlertTriangle, MonitorSmartphone, XCircle
} from 'lucide-react';
import CollegeAdminLayout from '../../components/college/CollegeAdminLayout';
import { useAuth } from '../../context/AuthContext';
import { useDatabase } from '../../context/DatabaseContext';

const TABS = [
  { id: 'personal', label: 'Personal Information', icon: <UserCircle size={18} /> },
  { id: 'account', label: 'Account Information', icon: <Shield size={18} /> },
  { id: 'password', label: 'Change Password', icon: <Lock size={18} /> },
  { id: 'security', label: 'Security & Sessions', icon: <MonitorSmartphone size={18} /> },
  { id: 'preferences', label: 'Preferences', icon: <Settings2 size={18} /> },
  { id: 'activity', label: 'Activity Timeline', icon: <Activity size={18} /> },
];

const mockSessions = [
  { id: 1, device: 'Chrome on Windows', ip: '192.168.1.105', location: 'New York, USA', current: true, lastActive: 'Just now' },
  { id: 2, device: 'Safari on iPhone', ip: '10.0.0.45', location: 'New York, USA', current: false, lastActive: '2 days ago' }
];

const mockActivity = [
  { id: 1, action: 'Updated Mobile Number', date: '2026-10-25 14:30' },
  { id: 2, action: 'Changed Password', date: '2026-08-12 09:15' },
  { id: 3, action: 'Revoked iPhone Session', date: '2026-08-10 18:45' }
];

const MyProfileManagement = () => {
  const { currentUser } = useAuth();
  const { users } = useDatabase();
  const user = users.find(u => u.id === currentUser?.id) || {};

  const [activeTab, setActiveTab] = useState('personal');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  
  // Password State
  const [pwdState, setPwdState] = useState({ current: '', new: '', confirm: '' });

  const handleInputChange = (e) => {
    setHasUnsavedChanges(true);
  };

  const handlePwdChange = (e) => {
    setPwdState(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setHasUnsavedChanges(true);
  };

  const handleSave = () => {
    alert('Profile modifications securely saved and audited.');
    setHasUnsavedChanges(false);
    setPwdState({ current: '', new: '', confirm: '' });
  };

  const revokeSession = (id) => {
    alert(`Session ${id} forcefully revoked. The device has been logged out.`);
  };

  const getPasswordStrength = () => {
    const len = pwdState.new.length;
    if (len === 0) return { width: '0%', color: 'transparent' };
    if (len < 6) return { width: '33%', color: 'var(--color-danger)' };
    if (len < 10) return { width: '66%', color: 'var(--color-warning)' };
    return { width: '100%', color: 'var(--color-success)' };
  };

  const renderCanvas = () => {
    switch (activeTab) {
      case 'personal':
        return (
          <div className="form-section animation-fade-in">
            <h2 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>Personal Information</h2>
            <div className="form-grid">
              <div className="form-group">
                <label>Mobile Number</label>
                <div style={{ position: 'relative' }}>
                  <Phone size={16} style={{ position: 'absolute', left: '10px', top: '12px', color: 'var(--text-muted)' }} />
                  <input type="text" defaultValue="+1 (555) 123-4567" onChange={handleInputChange} style={{ paddingLeft: '2.5rem' }} />
                </div>
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <div style={{ position: 'relative' }}>
                  <Mail size={16} style={{ position: 'absolute', left: '10px', top: '12px', color: 'var(--text-muted)' }} />
                  <input type="email" defaultValue={user.email} onChange={handleInputChange} style={{ paddingLeft: '2.5rem' }} />
                </div>
              </div>
              <div className="form-group">
                <label>Date of Birth</label>
                <input type="date" defaultValue="1980-05-15" onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label>Gender</label>
                <div className="select-wrapper">
                  <select defaultValue="male" onChange={handleInputChange}>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );
      case 'account':
        return (
          <div className="form-section animation-fade-in">
            <h2 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>Account Core (Read Only)</h2>
            <div className="form-grid">
              <div className="form-group">
                <label>Username</label>
                <input type="text" value={user.username || 'admin_user'} readOnly style={{ background: 'var(--bg-surface-alt)', color: 'var(--text-muted)' }} />
              </div>
              <div className="form-group">
                <label>Employee ID</label>
                <input type="text" value="EMP-1001" readOnly style={{ background: 'var(--bg-surface-alt)', color: 'var(--text-muted)' }} />
              </div>
              <div className="form-group">
                <label>System Role</label>
                <input type="text" value="College Admin" readOnly style={{ background: 'var(--bg-surface-alt)', color: 'var(--text-muted)' }} />
              </div>
              <div className="form-group">
                <label>Account Status</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem', background: '#ecfdf5', color: '#059669', border: '1px solid #a7f3d0', borderRadius: '8px', fontWeight: 600 }}>
                  <CheckCircle size={18} /> Active
                </div>
              </div>
            </div>
          </div>
        );
      case 'password':
        const strength = getPasswordStrength();
        return (
          <div className="form-section animation-fade-in">
            <h2 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>Change Password</h2>
            <div className="form-grid" style={{ gridTemplateColumns: '1fr', maxWidth: '400px' }}>
              <div className="form-group">
                <label>Current Password</label>
                <input type="password" name="current" value={pwdState.current} onChange={handlePwdChange} placeholder="Enter current password..." />
              </div>
              <div className="form-group" style={{ marginTop: '1rem' }}>
                <label>New Password</label>
                <input type="password" name="new" value={pwdState.new} onChange={handlePwdChange} placeholder="Enter new password..." />
                <div style={{ width: '100%', height: '6px', background: 'var(--bg-surface-alt)', borderRadius: '4px', marginTop: '0.5rem', overflow: 'hidden' }}>
                  <div style={{ width: strength.width, height: '100%', background: strength.color, transition: 'all 0.3s' }} />
                </div>
              </div>
              <div className="form-group">
                <label>Confirm New Password</label>
                <input type="password" name="confirm" value={pwdState.confirm} onChange={handlePwdChange} placeholder="Verify new password..." />
              </div>
            </div>
          </div>
        );
      case 'security':
        return (
          <div className="form-section animation-fade-in">
            <h2 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>Security & Sessions</h2>
            
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1rem', marginBottom: '1rem', color: 'var(--text-secondary)' }}>Active Sessions</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {mockSessions.map(session => (
                  <div key={session.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', border: '1px solid var(--border-color)', borderRadius: '8px', background: session.current ? '#f0fdf4' : 'var(--bg-surface)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <MonitorSmartphone size={24} style={{ color: session.current ? '#16a34a' : 'var(--text-muted)' }} />
                      <div>
                        <div style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          {session.device} 
                          {session.current && <span style={{ fontSize: '0.7rem', background: '#16a34a', color: 'white', padding: '2px 6px', borderRadius: '4px' }}>This Device</span>}
                        </div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                          {session.ip} • {session.location} • Last active: {session.lastActive}
                        </div>
                      </div>
                    </div>
                    {!session.current && (
                      <button onClick={() => revokeSession(session.id)} className="btn-secondary" style={{ color: 'var(--color-danger)', border: '1px solid var(--color-danger)', background: 'white' }}>
                        <XCircle size={16} /> Revoke
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div style={{ padding: '1rem', background: '#fef2f2', border: '1px solid #f87171', borderRadius: '8px' }}>
              <h3 style={{ color: '#991b1b', fontSize: '1rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Lock size={18} /> Two-Factor Authentication (2FA)</h3>
              <p style={{ color: '#7f1d1d', fontSize: '0.85rem' }}>Enhance your account security by requiring a secondary verification code on login.</p>
              <button className="btn-secondary" style={{ marginTop: '1rem', background: 'white', color: '#991b1b', border: '1px solid #f87171' }}>Set Up 2FA</button>
            </div>
          </div>
        );
      case 'preferences':
        return (
          <div className="form-section animation-fade-in">
            <h2 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>Platform Preferences</h2>
            <div className="form-grid">
              <div className="form-group">
                <label>Theme</label>
                <div className="select-wrapper">
                  <select defaultValue="light" onChange={handleInputChange}>
                    <option value="light">Light Mode</option>
                    <option value="dark">Dark Mode</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Time Zone</label>
                <div className="select-wrapper">
                  <select defaultValue="ist" onChange={handleInputChange}>
                    <option value="ist">India Standard Time (IST)</option>
                    <option value="est">Eastern Standard Time (EST)</option>
                    <option value="pst">Pacific Standard Time (PST)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );
      case 'activity':
        return (
          <div className="form-section animation-fade-in">
            <h2 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>Personal Audit Log</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {mockActivity.map(act => (
                <div key={act.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>
                  <div style={{ padding: '8px', background: 'var(--bg-surface-alt)', borderRadius: '50%' }}>
                    <Activity size={16} color="var(--color-primary)" />
                  </div>
                  <div>
                    <div style={{ fontWeight: 600 }}>{act.action}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{act.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      default: return null;
    }
  };

  return (
    <CollegeAdminLayout>
      <div className="list-page-container" style={{ padding: '0', display: 'flex', flexDirection: 'column', height: 'calc(100vh - 70px)' }}>
        
        {/* Header */}
        <div className="list-page-header" style={{ padding: '1.5rem' }}>
          <div className="header-left">
            <h1 className="page-title">My Profile</h1>
            <div className="breadcrumbs">
              <Link to="/college-admin/dashboard" className="breadcrumb-link">Dashboard</Link>
              <span className="breadcrumb-separator">&gt;</span>
              <span>My Profile</span>
            </div>
          </div>
        </div>

        {/* Master Layout */}
        <div style={{ display: 'flex', flex: 1, overflow: 'hidden', borderTop: '1px solid var(--border-color)' }}>
          
          {/* Left Pane: Identity Card */}
          <div style={{ width: '320px', background: 'var(--bg-surface-alt)', borderRight: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', padding: '1.5rem' }}>
            
            {/* Photo & Core Info */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '2rem' }}>
              <div style={{ 
                  position: 'relative', width: '120px', height: '120px', borderRadius: '50%', 
                  background: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'white', fontSize: '3rem', fontWeight: 700, marginBottom: '1rem', overflow: 'hidden',
                  cursor: 'pointer', border: '4px solid var(--bg-surface)'
                }}
                className="profile-photo-container"
              >
                {user.name ? user.name.charAt(0).toUpperCase() : 'A'}
                {/* Hover Overlay */}
                <div className="photo-overlay" style={{
                  position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)', 
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  opacity: 0, transition: 'opacity 0.2s'
                }}>
                  <Camera size={24} style={{ marginBottom: '0.5rem' }} />
                  <span style={{ fontSize: '0.7rem', fontWeight: 600 }}>Update</span>
                </div>
              </div>
              <style>{`
                .profile-photo-container:hover .photo-overlay { opacity: 1 !important; }
              `}</style>
              
              <h2 style={{ fontSize: '1.2rem', fontWeight: 700, textAlign: 'center', marginBottom: '0.25rem' }}>{user.name || 'System Administrator'}</h2>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '0.25rem' }}>College Admin</div>
              <div style={{ fontSize: '0.8rem', background: 'var(--border-color)', padding: '2px 8px', borderRadius: '12px', color: 'var(--text-muted)' }}>EMP-1001</div>
            </div>

            {/* Navigation Menu */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', flex: 1 }}>
              {TABS.map(tab => (
                <button 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{ 
                    display: 'flex', alignItems: 'center', gap: '0.75rem', width: '100%', 
                    padding: '0.85rem 1rem', border: 'none', borderRadius: '8px',
                    background: activeTab === tab.id ? 'var(--color-primary)' : 'transparent',
                    color: activeTab === tab.id ? 'white' : 'var(--text-secondary)',
                    fontWeight: activeTab === tab.id ? 600 : 500, textAlign: 'left', cursor: 'pointer',
                    transition: 'all 0.1s'
                  }}
                >
                  {tab.icon}
                  <span style={{ fontSize: '0.9rem' }}>{tab.label}</span>
                </button>
              ))}
            </div>

          </div>

          {/* Right Pane: Configuration Canvas */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative', background: 'var(--bg-surface)' }}>
            
            <div style={{ flex: 1, overflowY: 'auto', padding: '3rem 4rem' }}>
              {renderCanvas()}
            </div>

            {/* Sticky Save Footer */}
            <div style={{ 
              position: 'absolute', bottom: 0, left: 0, right: 0, 
              padding: '1rem 2rem', background: 'var(--bg-surface)', borderTop: '1px solid var(--border-color)',
              display: 'flex', justifyContent: 'flex-end', gap: '1rem',
              transform: hasUnsavedChanges ? 'translateY(0)' : 'translateY(100%)',
              transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: '0 -4px 12px rgba(0,0,0,0.05)'
            }}>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', color: 'var(--color-warning)', fontSize: '0.9rem', fontWeight: 600 }}>
                <AlertTriangle size={16} style={{ marginRight: '0.5rem' }} /> You have unsaved profile changes
              </div>
              <button className="btn-secondary" onClick={() => { setHasUnsavedChanges(false); setPwdState({ current: '', new: '', confirm: '' }); }}>
                Cancel
              </button>
              <button className="btn-primary" onClick={handleSave}>
                <Save size={16} /> Save Changes
              </button>
            </div>

          </div>
        </div>

      </div>
    </CollegeAdminLayout>
  );
};

export default MyProfileManagement;
