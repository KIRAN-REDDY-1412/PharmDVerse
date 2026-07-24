import React, { useState, useEffect } from 'react';
import { X, Save, Pencil, ChevronDown } from 'lucide-react';
import { useDatabase } from '../../../context/DatabaseContext';

const EditProfileModal = ({ isOpen, onClose, user }) => {
  const { updateUser } = useDatabase();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: 'Male',
    address: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        dateOfBirth: user.dateOfBirth || '',
        gender: user.gender || 'Male',
        address: user.address || '',
      });
    }
  }, [user, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    updateUser(user.id, formData);
    alert('Profile updated successfully!');
    onClose();
  };

  const handleReset = () => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        dateOfBirth: user.dateOfBirth || '',
        gender: user.gender || 'Male',
        address: user.address || '',
      });
    }
  };

  if (!isOpen || !user) return null;

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
                  <label>User ID</label>
                  <input type="text" className="form-control read-only" value={user.id} readOnly />
                </div>
                <div className="form-group">
                  <label>Role</label>
                  <input type="text" className="form-control read-only" value={user.role} readOnly />
                </div>
                <div className="form-group full-width">
                  <label>Department</label>
                  <input type="text" className="form-control read-only" value={user.department || 'General'} readOnly />
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
                  <input 
                    type="text" 
                    className={`form-control ${user.role === 'student' ? 'read-only' : ''}`} 
                    name="name" 
                    value={formData.name} 
                    onChange={user.role === 'student' ? undefined : handleChange}
                    readOnly={user.role === 'student'}
                  />
                </div>

                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} />
                </div>

                <div className="form-group">
                  <label>Mobile Number</label>
                  <input type="tel" className="form-control" name="phone" value={formData.phone} onChange={handleChange} />
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
