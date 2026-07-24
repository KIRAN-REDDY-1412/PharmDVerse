import React, { useState } from 'react';
import { X, Save, Pencil, ChevronDown } from 'lucide-react';
import '../preceptor/AddPreceptorModal.css'; // Reusing base modal styles
import '../student/AddStudentModal.css';   // Reusing section grid styles

const EditProfileModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: 'Admin User',
    email: 'admin@pharmdverse.edu.in',
    mobileNumber: '9876543210',
    dateOfBirth: '1985-06-15',
    gender: 'Male',
    address: '123 College Road, Campus, City',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    alert('Profile updated successfully!');
    onClose();
  };

  const handleReset = () => {
    setFormData({
      fullName: 'Admin User',
      email: 'admin@pharmdverse.edu.in',
      mobileNumber: '9876543210',
      dateOfBirth: '1985-06-15',
      gender: 'Male',
      address: '123 College Road, Campus, City',
    });
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="student-modal" onClick={e => e.stopPropagation()} style={{ maxWidth: '800px' }}>
        
        {/* Header */}
        <div className="modal-header">
          <div className="modal-title-group">
            <Pencil size={32} className="modal-title-icon" />
            <div className="modal-title-text">
              <h2>Edit Profile</h2>
              <p>Update your personal information</p>
            </div>
          </div>
          <button className="close-button" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">
          <div className="form-main">

            {/* ── Read-Only Information ── */}
            <div className="form-section">
              <div className="section-heading">
                <span className="section-icon">🔒</span> Account Details (Read-Only)
              </div>
              <div className="section-grid">
                <div className="form-group">
                  <label>Employee ID</label>
                  <input type="text" className="form-control read-only" value="EMP-CA-001" readOnly />
                </div>
                <div className="form-group">
                  <label>Username</label>
                  <input type="text" className="form-control read-only" value="admin123" readOnly />
                </div>
                <div className="form-group">
                  <label>Role</label>
                  <input type="text" className="form-control read-only" value="College Admin" readOnly />
                </div>
                <div className="form-group">
                  <label>Department</label>
                  <input type="text" className="form-control read-only" value="Administration" readOnly />
                </div>
                <div className="form-group full-width">
                  <label>Designation</label>
                  <input type="text" className="form-control read-only" value="Principal" readOnly />
                </div>
              </div>
            </div>

            {/* ── Editable Information ── */}
            <div className="form-section">
              <div className="section-heading">
                <span className="section-icon">✏️</span> Personal Details
              </div>
              <div className="section-grid">
                <div className="form-group full-width">
                  <label>Full Name</label>
                  <input type="text" className="form-control" name="fullName" value={formData.fullName} onChange={handleChange} />
                </div>

                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} />
                </div>

                <div className="form-group">
                  <label>Mobile Number</label>
                  <input type="tel" className="form-control" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} />
                </div>

                <div className="form-group">
                  <label>Date of Birth</label>
                  <input type="date" className="form-control" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} />
                </div>

                <div className="form-group">
                  <label>Gender</label>
                  <div className="form-control-wrapper">
                    <select className="form-control" name="gender" value={formData.gender} onChange={handleChange}>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                    <ChevronDown size={16} className="select-arrow" />
                  </div>
                </div>

                <div className="form-group full-width">
                  <label>Address</label>
                  <textarea className="form-control" name="address" rows={2} value={formData.address} onChange={handleChange} style={{ resize: 'vertical' }} />
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button className="btn-reset" onClick={handleReset}>Reset</button>
          <button className="btn-save" onClick={handleSave}><Save size={18} /> Save Changes</button>
        </div>

      </div>
    </div>
  );
};

export default EditProfileModal;
