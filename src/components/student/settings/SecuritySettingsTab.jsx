import React, { useState } from 'react';
import { Eye, EyeOff, Check, X } from 'lucide-react';
import { useDatabase } from '../../../context/DatabaseContext';

const SecuritySettingsTab = ({ user }) => {
  const { updateUser } = useDatabase();

  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
    setIsSuccess(false);
  };

  const isDirty = formData.currentPassword || formData.newPassword || formData.confirmPassword;

  // Password requirements validation
  const hasMinLength = formData.newPassword.length >= 8;
  const hasUpper = /[A-Z]/.test(formData.newPassword);
  const hasLower = /[a-z]/.test(formData.newPassword);
  const hasNumber = /[0-9]/.test(formData.newPassword);
  const hasSpecial = /[^A-Za-z0-9]/.test(formData.newPassword);
  
  const strengthScore = [hasMinLength, hasUpper, hasLower, hasNumber, hasSpecial].filter(Boolean).length;
  let strengthClass = 'strength-weak';
  let strengthLabel = 'Weak';
  
  if (strengthScore >= 4) {
    strengthClass = 'strength-strong';
    strengthLabel = 'Strong';
  } else if (strengthScore >= 3) {
    strengthClass = 'strength-good';
    strengthLabel = 'Good';
  } else if (strengthScore >= 2) {
    strengthClass = 'strength-fair';
    strengthLabel = 'Fair';
  }

  const validate = () => {
    const newErrors = {};
    if (!formData.currentPassword) {
      newErrors.currentPassword = 'Required';
    } else if (formData.currentPassword !== user.password) {
      newErrors.currentPassword = 'Incorrect current password';
    }

    if (!formData.newPassword) {
      newErrors.newPassword = 'Required';
    } else if (strengthScore < 5) {
      newErrors.newPassword = 'Password does not meet all requirements';
    } else if (formData.newPassword === user.password) {
      newErrors.newPassword = 'New password cannot be the same as the previous password';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Required';
    } else if (formData.confirmPassword !== formData.newPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    
    updateUser(user.id, {
      ...user,
      password: formData.newPassword,
      lastPasswordChanged: new Date().toISOString()
    });
    
    setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 3000);
  };

  const handleReset = () => {
    setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setErrors({});
    setIsSuccess(false);
  };

  const lastChangedStr = user.lastPasswordChanged 
    ? new Date(user.lastPasswordChanged).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : 'Never';

  return (
    <div>
      <div className="settings-section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h2 className="settings-section-title">Security Settings</h2>
          <p className="settings-section-desc">Manage your account password and security preferences.</p>
        </div>
        <div style={{ textAlign: 'right', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          <div>Last Password Changed</div>
          <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{lastChangedStr}</div>
        </div>
      </div>

      <div className="settings-form-row">
        <div className="settings-form-group">
          <label className="settings-form-label">Current Password</label>
          <div style={{ position: 'relative' }}>
            <input 
              type={showCurrent ? "text" : "password"} 
              name="currentPassword"
              className="settings-form-input" 
              placeholder="Enter current password"
              value={formData.currentPassword}
              onChange={handleInputChange}
            />
            <button 
              type="button"
              onClick={() => setShowCurrent(!showCurrent)}
              style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
            >
              {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.currentPassword && <span className="error-message">{errors.currentPassword}</span>}
        </div>
      </div>

      <div className="settings-form-row">
        <div className="settings-form-group">
          <label className="settings-form-label">New Password</label>
          <div style={{ position: 'relative' }}>
            <input 
              type={showNew ? "text" : "password"} 
              name="newPassword"
              className="settings-form-input" 
              placeholder="Enter new password"
              value={formData.newPassword}
              onChange={handleInputChange}
            />
            <button 
              type="button"
              onClick={() => setShowNew(!showNew)}
              style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
            >
              {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {formData.newPassword && (
            <div className={`password-strength-meter ${strengthClass}`}>
              <div className="strength-bars">
                <div className="strength-bar"></div>
                <div className="strength-bar"></div>
                <div className="strength-bar"></div>
                <div className="strength-bar"></div>
              </div>
              <span className="strength-text">Password Strength: {strengthLabel}</span>
            </div>
          )}
          {errors.newPassword && <span className="error-message">{errors.newPassword}</span>}
        </div>

        <div className="settings-form-group">
          <label className="settings-form-label">Confirm New Password</label>
          <div style={{ position: 'relative' }}>
            <input 
              type={showConfirm ? "text" : "password"} 
              name="confirmPassword"
              className="settings-form-input" 
              placeholder="Confirm new password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
            />
            <button 
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
            >
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
        </div>
      </div>

      <div className="password-requirements">
        <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Password Requirements:</div>
        <div className={`req-item ${formData.newPassword ? (hasMinLength ? 'met' : 'unmet') : ''}`}>
          {hasMinLength ? <Check size={14} /> : <X size={14} />} Minimum 8 characters
        </div>
        <div className={`req-item ${formData.newPassword ? (hasUpper ? 'met' : 'unmet') : ''}`}>
          {hasUpper ? <Check size={14} /> : <X size={14} />} At least one uppercase letter
        </div>
        <div className={`req-item ${formData.newPassword ? (hasLower ? 'met' : 'unmet') : ''}`}>
          {hasLower ? <Check size={14} /> : <X size={14} />} At least one lowercase letter
        </div>
        <div className={`req-item ${formData.newPassword ? (hasNumber ? 'met' : 'unmet') : ''}`}>
          {hasNumber ? <Check size={14} /> : <X size={14} />} At least one number
        </div>
        <div className={`req-item ${formData.newPassword ? (hasSpecial ? 'met' : 'unmet') : ''}`}>
          {hasSpecial ? <Check size={14} /> : <X size={14} />} At least one special character
        </div>
      </div>

      <div className="settings-actions" style={{ alignItems: 'center' }}>
        <button className="settings-btn-save" disabled={!isDirty} onClick={handleSave}>
          Update Password
        </button>
        <button className="settings-btn-cancel" disabled={!isDirty} onClick={handleReset}>
          Cancel
        </button>
        {isSuccess && <span style={{ color: 'var(--color-accent)', fontWeight: 500, marginLeft: '1rem' }}>Password updated successfully!</span>}
      </div>
    </div>
  );
};

export default SecuritySettingsTab;
