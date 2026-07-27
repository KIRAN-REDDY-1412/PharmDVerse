import React, { useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { 
  User, Mail, Shield, Key, Camera, Bell, CheckCircle
} from 'lucide-react';
import './MyProfile.css';

const MyProfile = () => {
  const [formData, setFormData] = useState({
    firstName: 'System',
    lastName: 'Administrator',
    email: 'admin@pharmdverse.com',
    phone: '+1 (555) 019-2831'
  });
  
  const [mfaEnabled, setMfaEnabled] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    alert('Profile updated successfully.');
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    alert('Password updated. Please log in again next time.');
  };

  return (
    <AdminLayout>
      <div className="profile-container">
        
        <div className="profile-header">
          <div className="profile-avatar-large">
            SA
            <div className="avatar-edit-btn" title="Change Photo">
              <Camera size={16} />
            </div>
          </div>
          <div className="profile-header-info">
            <h1>{formData.firstName} {formData.lastName}</h1>
            <p><Shield size={16} color="var(--primary-color)"/> Platform Owner (Super Admin)</p>
          </div>
        </div>

        <div className="profile-grid">
          
          <div className="profile-card">
            <h2 className="profile-card-title"><User size={20} color="var(--primary-color)"/> Personal Information</h2>
            <form onSubmit={handleSave}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label className="form-label">First Name</label>
                  <input type="text" className="form-input" value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} />
                </div>
                <div>
                  <label className="form-label">Last Name</label>
                  <input type="text" className="form-input" value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} />
                </div>
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label className="form-label">Email Address</label>
                <div style={{ position: 'relative' }}>
                  <Mail size={16} color="var(--text-secondary)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input type="email" className="form-input" style={{ paddingLeft: '36px' }} value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                </div>
              </div>
              <div style={{ marginBottom: '24px' }}>
                <label className="form-label">Phone Number</label>
                <input type="text" className="form-input" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
              </div>
              <button type="submit" className="btn btn-primary">Save Changes</button>
            </form>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div className="profile-card">
              <h2 className="profile-card-title"><Key size={20} color="var(--primary-color)"/> Security Settings</h2>
              <form onSubmit={handlePasswordChange} style={{ marginBottom: '24px', paddingBottom: '24px', borderBottom: '1px solid var(--border-color)' }}>
                <div style={{ marginBottom: '16px' }}>
                  <label className="form-label">Current Password</label>
                  <input type="password" className="form-input" placeholder="••••••••" required />
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <label className="form-label">New Password</label>
                  <input type="password" className="form-input" placeholder="Enter new password" required />
                </div>
                <button type="submit" className="btn btn-secondary">Update Password</button>
              </form>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 600, marginBottom: '4px' }}>Two-Factor Authentication (2FA)</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Add an extra layer of security.</div>
                </div>
                <button 
                  className={`btn ${mfaEnabled ? 'btn-secondary' : 'btn-primary'}`}
                  onClick={() => setMfaEnabled(!mfaEnabled)}
                  style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  {mfaEnabled ? <><CheckCircle size={16} color="#10b981"/> Enabled</> : 'Enable 2FA'}
                </button>
              </div>
            </div>

            <div className="profile-card">
              <h2 className="profile-card-title"><Bell size={20} color="var(--primary-color)"/> Preferences</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                  <input type="checkbox" defaultChecked />
                  <span>Receive Weekly Analytics Summary</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                  <input type="checkbox" defaultChecked />
                  <span>Alert me on failed login attempts</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                  <input type="checkbox" />
                  <span>Opt-in to Beta Features</span>
                </label>
              </div>
            </div>
          </div>

        </div>

      </div>
    </AdminLayout>
  );
};

export default MyProfile;
