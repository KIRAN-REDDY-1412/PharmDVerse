import React from 'react';

const AccountInfoTab = ({ user }) => {
  return (
    <div>
      <div className="settings-section-header">
        <h2 className="settings-section-title">Account Information</h2>
        <p className="settings-section-desc">View your system-generated account details. (Read Only)</p>
      </div>

      <div className="settings-form-row">
        <div className="settings-form-group">
          <label className="settings-form-label">Roll Number</label>
          <input 
            type="text" 
            className="settings-form-input" 
            value={user.id} 
            disabled 
          />
        </div>

        <div className="settings-form-group">
          <label className="settings-form-label">Username</label>
          <input 
            type="text" 
            className="settings-form-input" 
            value={user.id} 
            disabled 
          />
        </div>
      </div>

      <div className="settings-form-row">
        <div className="settings-form-group">
          <label className="settings-form-label">Registration Date</label>
          <input 
            type="text" 
            className="settings-form-input" 
            value={user.registrationDate || 'Aug 15, 2023'} 
            disabled 
          />
        </div>

        <div className="settings-form-group">
          <label className="settings-form-label">Account Status</label>
          <div style={{ marginTop: '0.25rem' }}>
            <span className="status-badge" style={{ 
              display: 'inline-block',
              backgroundColor: user.status === 'Inactive' ? '#fef2f2' : '#f0fdf4', 
              color: user.status === 'Inactive' ? '#991b1b' : '#166534', 
              border: `1px solid ${user.status === 'Inactive' ? '#fecaca' : '#bbf7d0'}`, 
              padding: '0.5rem 1rem', 
              borderRadius: '6px', 
              fontSize: '0.9rem', 
              fontWeight: 600 
            }}>
              {user.status || 'Active'}
            </span>
          </div>
        </div>
      </div>

      <div className="settings-form-row">
        <div className="settings-form-group">
          <label className="settings-form-label">Last Login Date</label>
          <input 
            type="text" 
            className="settings-form-input" 
            value={user.lastLoginDate || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} 
            disabled 
          />
        </div>

        <div className="settings-form-group">
          <label className="settings-form-label">Last Login Time</label>
          <input 
            type="text" 
            className="settings-form-input" 
            value={user.lastLoginTime || new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} 
            disabled 
          />
        </div>
      </div>
      
      <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: 'var(--bg-main)', borderLeft: '4px solid var(--color-primary)', borderRadius: '4px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
        <strong>Note:</strong> Academic information (such as Course, Branch, Year, etc.) is securely managed by the ERP system and cannot be edited here.
      </div>
    </div>
  );
};

export default AccountInfoTab;
