import React, { useState } from 'react';
import { X, Save, KeyRound, Eye, EyeOff } from 'lucide-react';
import '../preceptor/AddPreceptorModal.css'; // Reusing base modal styles
import '../student/AddStudentModal.css';   // Reusing section grid styles

const ChangePasswordModal = ({ isOpen, onClose }) => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const handleSave = () => {
    const newErrors = {};
    if (!formData.currentPassword) newErrors.currentPassword = 'Required';
    
    if (!formData.newPassword) {
      newErrors.newPassword = 'Required';
    } else if (!validatePassword(formData.newPassword)) {
      newErrors.newPassword = 'Password must be at least 8 characters, include an uppercase, lowercase, number, and special character.';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Required';
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    alert('Password updated successfully!');
    handleReset();
    onClose();
  };

  const handleReset = () => {
    setFormData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
    setErrors({});
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="student-modal" onClick={e => e.stopPropagation()} style={{ maxWidth: '500px' }}>
        
        {/* Header */}
        <div className="modal-header">
          <div className="modal-title-group">
            <KeyRound size={32} className="modal-title-icon" />
            <div className="modal-title-text">
              <h2>Change Password</h2>
              <p>Update your account security</p>
            </div>
          </div>
          <button className="close-button" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">
          <div className="form-main">
            <div className="section-grid" style={{ gridTemplateColumns: '1fr' }}>
              
              <div className="form-group">
                <label>Current Password <span className="required-asterisk">*</span></label>
                <div className="form-control-wrapper">
                  <input 
                    type={showCurrentPassword ? "text" : "password"} 
                    className={`form-control ${errors.currentPassword ? 'error' : ''}`} 
                    name="currentPassword" 
                    value={formData.currentPassword} 
                    onChange={handleChange} 
                  />
                  <button type="button" className="password-toggle" onClick={() => setShowCurrentPassword(!showCurrentPassword)}>
                    {showCurrentPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                  </button>
                </div>
                {errors.currentPassword && <span className="field-error">{errors.currentPassword}</span>}
              </div>

              <div className="form-group">
                <label>New Password <span className="required-asterisk">*</span></label>
                <div className="form-control-wrapper">
                  <input 
                    type={showNewPassword ? "text" : "password"} 
                    className={`form-control ${errors.newPassword ? 'error' : ''}`} 
                    name="newPassword" 
                    value={formData.newPassword} 
                    onChange={handleChange} 
                  />
                  <button type="button" className="password-toggle" onClick={() => setShowNewPassword(!showNewPassword)}>
                    {showNewPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                  </button>
                </div>
                {errors.newPassword && <span className="field-error">{errors.newPassword}</span>}
              </div>

              <div className="form-group">
                <label>Confirm New Password <span className="required-asterisk">*</span></label>
                <div className="form-control-wrapper">
                  <input 
                    type={showConfirmPassword ? "text" : "password"} 
                    className={`form-control ${errors.confirmPassword ? 'error' : ''}`} 
                    name="confirmPassword" 
                    value={formData.confirmPassword} 
                    onChange={handleChange} 
                  />
                  <button type="button" className="password-toggle" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                    {showConfirmPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                  </button>
                </div>
                {errors.confirmPassword && <span className="field-error">{errors.confirmPassword}</span>}
              </div>

            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button className="btn-reset" onClick={handleReset}>Reset</button>
          <button className="btn-save" onClick={handleSave}><Save size={18} /> Update Password</button>
        </div>

      </div>
    </div>
  );
};

export default ChangePasswordModal;
