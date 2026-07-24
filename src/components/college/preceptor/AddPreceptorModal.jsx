import React, { useState } from 'react';
import { X, User, Camera, Eye, EyeOff, Save, ChevronDown, UserPlus } from 'lucide-react';
import { useDatabase } from '../../../context/DatabaseContext';
import './AddPreceptorModal.css';

const AddPreceptorModal = ({ isOpen, onClose }) => {
  const { addUser } = useDatabase();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [photoPreview, setPhotoPreview] = useState(null);

  const [formData, setFormData] = useState({
    preceptorId: 'PRE011',
    fullName: '',
    gender: 'Male',
    dateOfBirth: '1985-06-15',
    qualification: 'Pharm.D',
    designation: 'Assistant Professor',
    department: 'Pharmacy Practice',
    email: '',
    mobileNumber: '',
    password: '',
    confirmPassword: '',
    status: 'Active'
  });

  const handleAutoCapitalizeChange = (e) => {
    const { name, value } = e.target;
    
    // Auto capitalize each word
    const capitalizedValue = value
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
      
    setFormData(prev => ({
      ...prev,
      [name]: capitalizedValue
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPhotoPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setError('');
    if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill out all required fields.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const newUser = {
      id: formData.preceptorId,
      name: formData.fullName,
      email: formData.email,
      phone: formData.mobileNumber,
      role: 'preceptor',
      password: formData.password,
      gender: formData.gender,
      dateOfBirth: formData.dateOfBirth,
      department: formData.department,
      designation: formData.designation,
      qualification: formData.qualification,
      status: formData.status
    };

    try {
      addUser(newUser);
      alert('Preceptor added successfully.');
      onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleReset = () => {
    setFormData({
      preceptorId: 'PRE011',
      fullName: '',
      gender: 'Male',
      dateOfBirth: '',
      qualification: 'Pharm.D',
      designation: 'Assistant Professor',
      department: 'Pharmacy Practice',
      email: '',
      mobileNumber: '',
      password: '',
      confirmPassword: '',
      status: 'Active'
    });
    setPhotoPreview(null);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="preceptor-modal" onClick={e => e.stopPropagation()}>
        
        {/* Header */}
        <div className="modal-header">
          <div className="modal-title-group">
            <UserPlus size={32} className="modal-title-icon" />
            <div className="modal-title-text">
              <h2>Add Preceptor</h2>
              <p>Enter preceptor details to register</p>
            </div>
          </div>
          <button className="close-button" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">
          
          {error && (
            <div style={{ backgroundColor: '#fee2e2', color: '#dc2626', padding: '10px', borderRadius: '6px', marginBottom: '1rem', fontSize: '0.9rem' }}>
              {error}
            </div>
          )}

          <div className="form-fields-container">
            <div className="form-grid">
              
              <div className="form-group full-width">
                <label>Preceptor ID <span className="required-asterisk">*</span></label>
                <input 
                  type="text" 
                  className="form-control" 
                  name="preceptorId"
                  value={formData.preceptorId}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group full-width">
                <label>Full Name <span className="required-asterisk">*</span></label>
                <input 
                  type="text" 
                  className="form-control"
                  name="fullName"
                  placeholder="e.g. T. Sri Ram"
                  value={formData.fullName}
                  onChange={handleAutoCapitalizeChange}
                />
              </div>

              <div className="form-group">
                <label>Gender <span className="required-asterisk">*</span></label>
                <div className="form-control-wrapper">
                  <select 
                    className="form-control"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  <ChevronDown size={16} className="select-arrow" />
                </div>
              </div>

              <div className="form-group">
                <label>Date of Birth <span className="required-asterisk">*</span></label>
                <input 
                  type="date" 
                  className="form-control"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Qualification <span className="required-asterisk">*</span></label>
                <div className="form-control-wrapper">
                  <select 
                    className="form-control"
                    name="qualification"
                    value={formData.qualification}
                    onChange={handleChange}
                  >
                    <option value="Pharm.D">Pharm.D</option>
                    <option value="M.Pharm">M.Pharm</option>
                    <option value="M.Pharm, Ph.D">M.Pharm, Ph.D</option>
                    <option value="Pharm.D, Ph.D">Pharm.D, Ph.D</option>
                    <option value="Other">Other</option>
                  </select>
                  <ChevronDown size={16} className="select-arrow" />
                </div>
              </div>

              <div className="form-group">
                <label>Designation <span className="required-asterisk">*</span></label>
                <div className="form-control-wrapper">
                  <select 
                    className="form-control"
                    name="designation"
                    value={formData.designation}
                    onChange={handleChange}
                  >
                    <option value="Professor">Professor</option>
                    <option value="Associate Professor">Associate Professor</option>
                    <option value="Assistant Professor">Assistant Professor</option>
                  </select>
                  <ChevronDown size={16} className="select-arrow" />
                </div>
              </div>

              <div className="form-group">
                <label>Department <span className="required-asterisk">*</span></label>
                <div className="form-control-wrapper">
                  <select 
                    className="form-control"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                  >
                    <option value="Pharmacy Practice">Pharmacy Practice</option>
                    <option value="Pharmacology">Pharmacology</option>
                  </select>
                  <ChevronDown size={16} className="select-arrow" />
                </div>
              </div>

              <div className="form-group">
                <label>Email <span className="required-asterisk">*</span></label>
                <input 
                  type="email" 
                  className="form-control"
                  name="email"
                  placeholder="e.g. name@pharmdverse.edu.in"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Mobile Number <span className="required-asterisk">*</span></label>
                <input 
                  type="tel" 
                  className="form-control"
                  name="mobileNumber"
                  placeholder="e.g. 9876543210"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>User Name <span className="required-asterisk">*</span></label>
                <input 
                  type="text" 
                  className="form-control read-only" 
                  value={formData.preceptorId} 
                  readOnly 
                />
                <span className="field-hint">User name will be same as Preceptor ID</span>
              </div>

              <div className="form-group">
                <label>Password <span className="required-asterisk">*</span></label>
                <div className="form-control-wrapper">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    className="form-control"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <button 
                    type="button" 
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label>Confirm Password <span className="required-asterisk">*</span></label>
                <div className="form-control-wrapper">
                  <input 
                    type={showConfirmPassword ? "text" : "password"} 
                    className="form-control"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  <button 
                    type="button" 
                    className="password-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label>Status <span className="required-asterisk">*</span></label>
                <div className="form-control-wrapper">
                  <select 
                    className="form-control"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                  <ChevronDown size={16} className="select-arrow" />
                </div>
              </div>

            </div>
          </div>

          <div className="photo-upload-section">
            <span className="photo-upload-label">Profile Photo</span>
            <div className="photo-preview-box">
              {photoPreview ? (
                <img src={photoPreview} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />
              ) : (
                <User size={120} className="photo-placeholder-icon" strokeWidth={1} />
              )}
              <button 
                className="photo-upload-btn" 
                aria-label="Upload photo"
                onClick={() => document.getElementById('preceptor-photo-upload').click()}
              >
                <Camera size={18} />
              </button>
            </div>
            <span className="photo-hint">JPG, PNG (Max. 2MB)</span>
            <input 
              type="file" 
              id="preceptor-photo-upload" 
              accept=".jpg,.jpeg,.png" 
              style={{ display: 'none' }} 
              onChange={handlePhotoUpload} 
            />
          </div>

        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button className="btn-reset" onClick={handleReset}>Reset</button>
          <button className="btn-save" onClick={handleSave}>
            <Save size={18} /> Save
          </button>
        </div>

      </div>
    </div>
  );
};

export default AddPreceptorModal;
