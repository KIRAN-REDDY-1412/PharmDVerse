import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, BellRing, Palette, Clock, Lock, 
  Eye, EyeOff, Save, CheckCircle2, LogOut, MonitorSmartphone 
} from 'lucide-react';
import PreceptorLayout from '../../components/preceptor/PreceptorLayout';
import { useAuth } from '../../context/AuthContext';
import { useDatabase } from '../../context/DatabaseContext';
import { useTheme } from '../../context/ThemeContext';

const PreceptorSettingsHub = () => {
  const [activeTab, setActiveTab] = useState('security');
  const { currentUser, logout } = useAuth();
  const { users, resetUserPassword } = useDatabase();
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const user = users.find(u => u.id === currentUser?.id) || {};

  // Security State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [securityMessage, setSecurityMessage] = useState({ text: '', type: '' });

  // Notification State (Mock preferences for UI)
  const [notifyNewCase, setNotifyNewCase] = useState(true);
  const [notifyReturned, setNotifyReturned] = useState(true);
  const [notifyResubmitted, setNotifyResubmitted] = useState(true);
  const [notifyApproved, setNotifyApproved] = useState(true);

  // Security Handlers
  const getPasswordStrength = (pass) => {
    if (!pass) return { label: '', color: 'transparent' };
    if (pass.length < 6) return { label: 'Weak', color: '#dc2626' };
    if (pass.length >= 8 && /[A-Z]/.test(pass) && /[0-9]/.test(pass)) return { label: 'Strong', color: '#16a34a' };
    return { label: 'Medium', color: '#d97706' };
  };

  const handlePasswordChange = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      setSecurityMessage({ text: 'All fields are required.', type: 'error' });
      return;
    }
    if (user.password && currentPassword !== user.password) {
      setSecurityMessage({ text: 'Current password is incorrect.', type: 'error' });
      return;
    }
    if (newPassword !== confirmPassword) {
      setSecurityMessage({ text: 'New passwords do not match.', type: 'error' });
      return;
    }
    if (newPassword.length < 6) {
      setSecurityMessage({ text: 'Password must be at least 6 characters.', type: 'error' });
      return;
    }

    try {
      resetUserPassword(user.id, newPassword);
      setSecurityMessage({ text: 'Password updated successfully.', type: 'success' });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setSecurityMessage({ text: '', type: '' }), 3000);
    } catch (err) {
      setSecurityMessage({ text: 'An error occurred.', type: 'error' });
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/preceptor-login');
  };

  // Styles
  const tabStyle = (isActive) => ({
    display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem',
    cursor: 'pointer', borderRadius: '8px', transition: 'all 0.2s',
    backgroundColor: isActive ? 'rgba(11, 87, 208, 0.08)' : 'transparent',
    color: isActive ? 'var(--color-primary)' : 'var(--text-secondary)',
    fontWeight: isActive ? 600 : 500,
    borderLeft: isActive ? '4px solid var(--color-primary)' : '4px solid transparent'
  });

  const cardStyle = {
    backgroundColor: 'var(--bg-surface)',
    borderRadius: '12px',
    border: '1px solid var(--border-color)',
    padding: '2rem',
    boxShadow: '0 2px 12px rgba(0,0,0,0.02)'
  };

  const inputGroupStyle = { display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.25rem' };
  const labelStyle = { fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' };
  const inputStyle = { padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-main)', color: 'var(--text-primary)', fontSize: '0.95rem' };

  return (
    <PreceptorLayout>
      <div className="preceptor-page" style={{ paddingBottom: '3rem' }}>
        
        <div className="page-header" style={{ marginBottom: '2rem' }}>
          <h1 className="page-title">Settings</h1>
          <div className="breadcrumbs" style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            <Link to="/preceptor/dashboard" className="breadcrumb-link" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>Dashboard</Link>
            <span className="breadcrumb-separator">&gt;</span>
            <span>Settings</span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '2rem', alignItems: 'start' }}>
          
          {/* Navigation Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', backgroundColor: 'var(--bg-surface)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <div onClick={() => setActiveTab('security')} style={tabStyle(activeTab === 'security')}>
              <ShieldCheck size={20} /> Security Settings
            </div>
            <div onClick={() => setActiveTab('notifications')} style={tabStyle(activeTab === 'notifications')}>
              <BellRing size={20} /> Notification Settings
            </div>
            <div onClick={() => setActiveTab('appearance')} style={tabStyle(activeTab === 'appearance')}>
              <Palette size={20} /> Appearance
            </div>
            <div onClick={() => setActiveTab('session')} style={tabStyle(activeTab === 'session')}>
              <Clock size={20} /> Session Settings
            </div>
            <div onClick={() => setActiveTab('privacy')} style={tabStyle(activeTab === 'privacy')}>
              <Lock size={20} /> Privacy
            </div>
          </div>

          {/* Content Area */}
          <div>
            
            {/* 1. Security Settings */}
            {activeTab === 'security' && (
              <div style={cardStyle}>
                <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <ShieldCheck color="var(--color-primary)" /> Change Password
                </h2>
                
                <div style={{ maxWidth: '500px' }}>
                  <div style={inputGroupStyle}>
                    <label style={labelStyle}>Current Password</label>
                    <div style={{ position: 'relative' }}>
                      <input 
                        type={showPassword ? "text" : "password"} 
                        value={currentPassword} 
                        onChange={e => setCurrentPassword(e.target.value)} 
                        style={{ ...inputStyle, width: '100%' }} 
                      />
                      <button onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}>
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  <div style={inputGroupStyle}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <label style={labelStyle}>New Password</label>
                      {newPassword && (
                        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: getPasswordStrength(newPassword).color }}>
                          {getPasswordStrength(newPassword).label}
                        </span>
                      )}
                    </div>
                    <input 
                      type={showPassword ? "text" : "password"} 
                      value={newPassword} 
                      onChange={e => setNewPassword(e.target.value)} 
                      style={{ ...inputStyle, width: '100%', borderColor: newPassword ? getPasswordStrength(newPassword).color : 'var(--border-color)' }} 
                    />
                  </div>

                  <div style={inputGroupStyle}>
                    <label style={labelStyle}>Confirm New Password</label>
                    <input 
                      type={showPassword ? "text" : "password"} 
                      value={confirmPassword} 
                      onChange={e => setConfirmPassword(e.target.value)} 
                      style={{ ...inputStyle, width: '100%' }} 
                    />
                  </div>

                  {securityMessage.text && (
                    <div style={{ padding: '0.75rem', borderRadius: '6px', marginBottom: '1rem', fontSize: '0.9rem', backgroundColor: securityMessage.type === 'error' ? '#fef2f2' : '#f0fdf4', color: securityMessage.type === 'error' ? '#991b1b' : '#166534', border: `1px solid ${securityMessage.type === 'error' ? '#fecaca' : '#bbf7d0'}` }}>
                      {securityMessage.text}
                    </div>
                  )}

                  <button onClick={handlePasswordChange} style={{ padding: '0.75rem 1.5rem', backgroundColor: 'var(--color-primary)', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Save size={18} /> Update Password
                  </button>
                </div>
              </div>
            )}

            {/* 2. Notification Settings */}
            {activeTab === 'notifications' && (
              <div style={cardStyle}>
                <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <BellRing color="var(--color-primary)" /> Application Notifications
                </h2>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: '600px' }}>
                  
                  {/* Active Toggles */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>
                    <div>
                      <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>New Clinical Cases</div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Notify me when a student submits a new case.</div>
                    </div>
                    <label className="switch">
                      <input type="checkbox" checked={notifyNewCase} onChange={() => setNotifyNewCase(!notifyNewCase)} />
                      <span className="slider round"></span>
                    </label>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>
                    <div>
                      <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Returned Cases</div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Notify me when a case is successfully returned to a student.</div>
                    </div>
                    <label className="switch">
                      <input type="checkbox" checked={notifyReturned} onChange={() => setNotifyReturned(!notifyReturned)} />
                      <span className="slider round"></span>
                    </label>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>
                    <div>
                      <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Resubmitted Cases</div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Notify me when a student corrects and resubmits a case.</div>
                    </div>
                    <label className="switch">
                      <input type="checkbox" checked={notifyResubmitted} onChange={() => setNotifyResubmitted(!notifyResubmitted)} />
                      <span className="slider round"></span>
                    </label>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>
                    <div>
                      <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Approved Cases</div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Notify me when a case is officially approved.</div>
                    </div>
                    <label className="switch">
                      <input type="checkbox" checked={notifyApproved} onChange={() => setNotifyApproved(!notifyApproved)} />
                      <span className="slider round"></span>
                    </label>
                  </div>

                  {/* Future Toggles */}
                  <h3 style={{ fontSize: '1rem', margin: '1rem 0 0.5rem', color: 'var(--text-primary)' }}>External Notifications (Coming Soon)</h3>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1rem', opacity: 0.5 }}>
                    <div>
                      <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Email Notifications</div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Receive daily summaries via email.</div>
                    </div>
                    <label className="switch">
                      <input type="checkbox" disabled />
                      <span className="slider round"></span>
                    </label>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', opacity: 0.5 }}>
                    <div>
                      <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Push Notifications</div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Receive alerts on your mobile device.</div>
                    </div>
                    <label className="switch">
                      <input type="checkbox" disabled />
                      <span className="slider round"></span>
                    </label>
                  </div>

                </div>
              </div>
            )}

            {/* 3. Appearance */}
            {activeTab === 'appearance' && (
              <div style={cardStyle}>
                <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Palette color="var(--color-primary)" /> Theme & Appearance
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', maxWidth: '600px' }}>
                  
                  <div 
                    onClick={() => !isDarkMode && toggleTheme()}
                    style={{ padding: '1.5rem', borderRadius: '8px', border: `2px solid ${!isDarkMode ? 'var(--color-primary)' : 'var(--border-color)'}`, backgroundColor: '#ffffff', cursor: 'pointer', textAlign: 'center', color: '#1e293b' }}
                  >
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#f1f5f9', margin: '0 auto 1rem' }}></div>
                    <div style={{ fontWeight: 600 }}>Light Mode</div>
                  </div>

                  <div 
                    onClick={() => isDarkMode && toggleTheme()}
                    style={{ padding: '1.5rem', borderRadius: '8px', border: `2px solid ${isDarkMode ? 'var(--color-primary)' : '#334155'}`, backgroundColor: '#0f172a', cursor: 'pointer', textAlign: 'center', color: '#f8fafc' }}
                  >
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#1e293b', margin: '0 auto 1rem' }}></div>
                    <div style={{ fontWeight: 600 }}>Dark Mode</div>
                  </div>

                  <div 
                    style={{ padding: '1.5rem', borderRadius: '8px', border: '2px solid var(--border-color)', backgroundColor: 'var(--bg-surface)', cursor: 'not-allowed', textAlign: 'center', opacity: 0.5 }}
                  >
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #f8fafc 50%, #0f172a 50%)', margin: '0 auto 1rem' }}></div>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>System Default</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>(Future Version)</div>
                  </div>

                </div>
              </div>
            )}

            {/* 4. Session Settings */}
            {activeTab === 'session' && (
              <div style={cardStyle}>
                <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Clock color="var(--color-primary)" /> Session Management
                </h2>
                
                <div style={{ maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', backgroundColor: 'rgba(11, 87, 208, 0.05)', borderRadius: '8px', border: '1px solid var(--color-primary)' }}>
                    <MonitorSmartphone size={32} color="var(--color-primary)" />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Current Active Session</div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Started: {user.lastLoginTime || 'Just now'} on {user.lastLoginDate || new Date().toLocaleDateString()}</div>
                    </div>
                    <CheckCircle2 color="#16a34a" />
                  </div>

                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <button onClick={handleLogout} style={{ padding: '0.75rem 1.5rem', backgroundColor: '#dc2626', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <LogOut size={18} /> Logout Current Session
                    </button>
                    <button disabled style={{ padding: '0.75rem 1.5rem', backgroundColor: 'var(--bg-main)', color: 'var(--text-secondary)', border: '1px solid var(--border-color)', borderRadius: '6px', fontWeight: 600, cursor: 'not-allowed', display: 'flex', alignItems: 'center', gap: '0.5rem', opacity: 0.7 }}>
                      <LogOut size={18} /> Logout All Devices
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* 5. Privacy */}
            {activeTab === 'privacy' && (
              <div style={cardStyle}>
                <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Lock color="var(--color-primary)" /> Privacy & Data
                </h2>
                
                <div style={{ maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  
                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Account Status</div>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', borderRadius: '6px', backgroundColor: user.status === 'Inactive' ? '#fef2f2' : '#f0fdf4', color: user.status === 'Inactive' ? '#991b1b' : '#166534', border: `1px solid ${user.status === 'Inactive' ? '#fecaca' : '#bbf7d0'}`, fontWeight: 600 }}>
                      {user.status === 'Inactive' ? <Lock size={16} /> : <ShieldCheck size={16} />}
                      {user.status || 'Active'}
                    </div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                      Only active accounts can access assigned clinical cases. Contact the College Admin if your status needs review.
                    </p>
                  </div>

                  <div style={{ padding: '1rem', backgroundColor: 'var(--bg-main)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Privacy Notice</div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                      Your personal and professional data is managed securely by PharmDVerse Medical College. 
                      Preceptors are only granted access to students and clinical cases assigned directly to them. 
                      All review actions and documentation approvals are strictly audited. You cannot permanently delete account history.
                    </p>
                  </div>

                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </PreceptorLayout>
  );
};

export default PreceptorSettingsHub;
