import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Save, ChevronDown } from 'lucide-react';
import PreceptorLayout from '../../components/preceptor/PreceptorLayout';
import '../college/SettingsPage.css';

const PreceptorSecuritySettings = () => {
  const [formData, setFormData] = useState({
    minPasswordLength: 8,
    strongPassword: true,
    sessionTimeout: '30 mins',
    forcePasswordChange: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleSave = () => {
    // Alert removed per role-based restrictions
  };

  const handleReset = () => {
    setFormData({
      minPasswordLength: 8,
      strongPassword: true,
      sessionTimeout: '30 mins',
      forcePasswordChange: false
    });
  };

  return (
    <PreceptorLayout>
      <div className="settings-page-container">
        
        <div className="page-header">
          <h1 className="page-title">Security Settings</h1>
          <div className="breadcrumbs">
            <Link to="/preceptor/dashboard" className="breadcrumb-link">Dashboard</Link>
            <span className="breadcrumb-separator">&gt;</span>
            <Link to="/preceptor/settings" className="breadcrumb-link">Settings</Link>
            <span className="breadcrumb-separator">&gt;</span>
            <span>Security Settings</span>
          </div>
        </div>

        <div className="settings-card">
          <h2 className="settings-section-title">
            <ShieldCheck size={20} className="text-red" />
            System Security
          </h2>

          <div className="settings-form-grid" style={{ marginBottom: '2.5rem' }}>
            
            <div className="form-group">
              <label>Minimum Password Length</label>
              <input type="number" className="form-control" name="minPasswordLength" value={formData.minPasswordLength} onChange={handleChange} min={6} max={32} />
            </div>

            <div className="form-group">
              <label>Session Timeout</label>
              <div className="form-control-wrapper" style={{ position: 'relative' }}>
                <select className="form-control" name="sessionTimeout" value={formData.sessionTimeout} onChange={handleChange}>
                  <option value="15 mins">15 Minutes</option>
                  <option value="30 mins">30 Minutes</option>
                  <option value="1 hour">1 Hour</option>
                  <option value="2 hours">2 Hours</option>
                </select>
                <ChevronDown size={16} style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--text-secondary)' }} />
              </div>
            </div>

          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Strong Password Policy</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Require uppercase, lowercase, numbers, and special characters.</p>
              </div>
              <div className="toggle-container" style={{ margin: 0 }}>
                <label className="toggle-switch">
                  <input type="checkbox" name="strongPassword" checked={formData.strongPassword} onChange={handleChange} />
                  <span className="toggle-slider"></span>
                </label>
                <span className={`toggle-label ${formData.strongPassword ? 'active-label' : 'inactive-label'}`} style={{ width: '60px' }}>
                  {formData.strongPassword ? 'Enabled' : 'Disabled'}
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Force Password Change</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Require users to change passwords every 90 days.</p>
              </div>
              <div className="toggle-container" style={{ margin: 0 }}>
                <label className="toggle-switch">
                  <input type="checkbox" name="forcePasswordChange" checked={formData.forcePasswordChange} onChange={handleChange} />
                  <span className="toggle-slider"></span>
                </label>
                <span className={`toggle-label ${formData.forcePasswordChange ? 'active-label' : 'inactive-label'}`} style={{ width: '60px' }}>
                  {formData.forcePasswordChange ? 'Enabled' : 'Disabled'}
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
    </PreceptorLayout>
  );
};

export default PreceptorSecuritySettings;
