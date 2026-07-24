import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Building2, Upload, Save, Image as ImageIcon } from 'lucide-react';
import CollegeAdminLayout from '../../components/college/CollegeAdminLayout';
import './SettingsPage.css';

const CollegeInformation = () => {
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem('erp_college_info');
    if (saved) return JSON.parse(saved);
    return {
      collegeName: 'Global Institute of Pharmacy',
      address: '123 University Avenue, Knowledge Park, Education City - 500001',
      contactNumber: '+91 9876543210',
      email: 'contact@globalpharmacy.edu.in'
    };
  });
  
  const [logoPreview, setLogoPreview] = useState(() => localStorage.getItem('erp_college_logo') || null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setLogoPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    localStorage.setItem('erp_college_info', JSON.stringify(formData));
    if (logoPreview) localStorage.setItem('erp_college_logo', logoPreview);
    alert('College Information saved successfully!');
  };

  const handleReset = () => {
    setFormData({
      collegeName: 'Global Institute of Pharmacy',
      address: '123 University Avenue, Knowledge Park, Education City - 500001',
      contactNumber: '+91 9876543210',
      email: 'contact@globalpharmacy.edu.in'
    });
    setLogoPreview(null);
  };

  return (
    <CollegeAdminLayout>
      <div className="settings-page-container">
        
        <div className="page-header">
          <h1 className="page-title">College Information</h1>
          <div className="breadcrumbs">
            <Link to="/college-admin/dashboard" className="breadcrumb-link">Dashboard</Link>
            <span className="breadcrumb-separator">&gt;</span>
            <Link to="/college-admin/settings" className="breadcrumb-link">Settings</Link>
            <span className="breadcrumb-separator">&gt;</span>
            <span>College Information</span>
          </div>
        </div>

        <div className="settings-card">
          <h2 className="settings-section-title">
            <Building2 size={20} className="text-blue" />
            General Details
          </h2>

          <div className="settings-form-grid">
            
            <div className="form-group full-width">
              <label>College Logo</label>
              <div className="logo-upload-container">
                <div className="logo-preview">
                  {logoPreview ? (
                    <img src={logoPreview} alt="College Logo" />
                  ) : (
                    <ImageIcon size={40} style={{ color: 'var(--text-secondary)', opacity: 0.3 }} />
                  )}
                </div>
                <div className="logo-upload-actions">
                  <button 
                    className="btn-save" 
                    style={{ backgroundColor: 'var(--bg-surface-alt)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                    onClick={() => document.getElementById('college-logo-upload').click()}
                  >
                    <Upload size={16} /> Upload New Logo
                  </button>
                  <p>Recommended size: 256x256px (JPG or PNG)</p>
                  <input type="file" id="college-logo-upload" accept=".jpg,.jpeg,.png" style={{ display: 'none' }} onChange={handleLogoUpload} />
                </div>
              </div>
            </div>

            <div className="form-group full-width">
              <label>College Name</label>
              <input type="text" className="form-control" name="collegeName" value={formData.collegeName} onChange={handleChange} />
            </div>

            <div className="form-group full-width">
              <label>College Address</label>
              <textarea className="form-control" name="address" rows={3} value={formData.address} onChange={handleChange} style={{ resize: 'vertical' }} />
            </div>

            <div className="form-group">
              <label>Contact Number</label>
              <input type="tel" className="form-control" name="contactNumber" value={formData.contactNumber} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} />
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

export default CollegeInformation;
