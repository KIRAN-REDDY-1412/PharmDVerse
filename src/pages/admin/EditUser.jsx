import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { ArrowLeft, Save, RotateCcw, User, Shield, Building2 } from 'lucide-react';
import './ViewUser.css';
import './UserManagement.css';
import './CreateSubscriptionPlan.css'; // For common form styling

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: 'Michael',
    lastName: 'Chang',
    role: 'College Admin',
    college: 'University of Texas Pharmacy',
    department: 'Administration',
    email: 'm.chang@utexas.edu',
    mobile: '+1 (555) 112-9904',
    gender: 'Male',
    status: 'Active',
    address: 'Austin, TX, USA'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    alert('User profile updated successfully.');
    navigate('/super-admin/users/list');
  };

  return (
    <AdminLayout>
      <div className="create-plan-container">
        
        <div className="plan-header">
          <div className="plan-title-area">
            <button className="icon-btn-small" onClick={() => navigate('/super-admin/users/list')}>
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="page-title">Edit User Profile</h1>
              <p className="page-subtitle">Modifying user: {id || 'USR-26-102'}</p>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h2 className="section-title"><User size={20} color="var(--primary-color)"/> Personal Details</h2>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label required">First Name</label>
              <input type="text" className="form-input" name="firstName" value={formData.firstName} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label className="form-label required">Last Name</label>
              <input type="text" className="form-input" name="lastName" value={formData.lastName} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label className="form-label required">Email Address</label>
              <input type="email" className="form-input" name="email" value={formData.email} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label className="form-label required">Mobile Number</label>
              <input type="text" className="form-input" name="mobile" value={formData.mobile} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Gender</label>
              <select className="form-select" name="gender" value={formData.gender} onChange={handleInputChange}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Address</label>
              <input type="text" className="form-input" name="address" value={formData.address} onChange={handleInputChange} />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h2 className="section-title"><Building2 size={20} color="var(--primary-color)"/> Professional Assignment</h2>
          <div className="form-grid">
            <div className="form-group full-width">
              <label className="form-label required">Assigned College (Tenant)</label>
              <select className="form-select w-full" name="college" value={formData.college} onChange={handleInputChange}>
                <option value="PharmDVerse Core">PharmDVerse Core (Global)</option>
                <option value="University of Texas Pharmacy">University of Texas Pharmacy</option>
                <option value="Boston Healthcare College">Boston Healthcare College</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label required">Role</label>
              <select className="form-select" name="role" value={formData.role} onChange={handleInputChange}>
                <option value="Super Admin">Super Admin</option>
                <option value="College Admin">College Admin</option>
                <option value="Preceptor">Preceptor</option>
                <option value="Student">Student</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Department</label>
              <input type="text" className="form-input" name="department" value={formData.department} onChange={handleInputChange} />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h2 className="section-title"><Shield size={20} color="var(--primary-color)"/> Account Status</h2>
          <div className="form-grid">
            <div className="form-group full-width">
              <label className="form-label required">Status</label>
              <select className="form-select" name="status" value={formData.status} onChange={handleInputChange}>
                <option value="Active">Active (Normal Access)</option>
                <option value="Suspended">Suspended (Access Revoked)</option>
                <option value="Locked">Locked (Failed Auth Attempts)</option>
              </select>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '8px' }}>
                Note: Changing a user's role or status will invalidate their current session and force them to log in again.
              </p>
            </div>
          </div>
        </div>

      </div>

      <div className="sticky-footer">
        <div className="footer-left">
          <button className="btn btn-secondary" onClick={() => navigate('/super-admin/users/list')}>Cancel</button>
        </div>
        <div className="footer-right">
          <button className="btn btn-primary" onClick={handleSave}><Save size={16} /> Save Changes</button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default EditUser;
