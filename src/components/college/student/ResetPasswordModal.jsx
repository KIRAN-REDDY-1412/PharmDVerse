import React, { useState, useEffect } from 'react';
import { KeyRound, Eye, EyeOff, X } from 'lucide-react';
import '../preceptor/AddPreceptorModal.css';
import './AddStudentModal.css';

const ResetPasswordModal = ({ isOpen, onClose, student, onResetPassword }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      setNewPassword('');
      setConfirmPassword('');
      setShowNewPassword(false);
      setShowConfirmPassword(false);
      setErrors({});
    }
  }, [isOpen]);

  if (!isOpen || !student) return null;

  const getStrength = (password) => {
    if (!password) return { level: 0, text: '', color: '' };
    if (password.length < 8) return { level: 1, text: 'Weak', color: '#ef4444' };
    
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[^a-zA-Z\d]/.test(password);

    if (hasLetter && hasNumber && hasSpecial) {
      return { level: 3, text: 'Strong', color: '#10b981' };
    }
    if (hasLetter && hasNumber) {
      return { level: 2, text: 'Medium', color: '#f59e0b' };
    }
    return { level: 1, text: 'Weak', color: '#ef4444' };
  };

  const strength = getStrength(newPassword);

  const validateForm = () => {
    const newErrors = {};
    if (!newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (newPassword.length < 6) {
      newErrors.newPassword = 'Password must be at least 6 characters';
    } else if (!/[a-zA-Z]/.test(newPassword) || !/\d/.test(newPassword)) {
      newErrors.newPassword = 'Password must contain at least one letter and one number';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Confirm new password is required';
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (onResetPassword) {
        onResetPassword(student.id, newPassword);
      }
      alert('Password reset successfully.');
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="student-modal" onClick={e => e.stopPropagation()} style={{ maxWidth: '450px', width: '90vw' }}>
        <div className="modal-header">
          <div className="modal-title-group">
            <KeyRound size={24} className="modal-title-icon" />
            <div className="modal-title-text">
              <h2>Reset Password</h2>
              <p>Reset password for {student.name}</p>
            </div>
          </div>
          <button className="close-button" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body" style={{ flexDirection: 'column', gap: '1.25rem' }}>
            <div className="form-group">
              <label>New Password *</label>
              <div className="form-control-wrapper">
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  className="form-control"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.newPassword && (
                <span className="field-error">{errors.newPassword}</span>
              )}
              {newPassword && (
                <div>
                  <div style={{ height: '4px', borderRadius: '2px', backgroundColor: 'var(--bg-surface-alt)', marginTop: '0.35rem' }}>
                    <div style={{ 
                      height: '100%', 
                      borderRadius: '2px', 
                      width: `${(strength.level / 3) * 100}%`, 
                      backgroundColor: strength.color, 
                      transition: 'width 0.3s' 
                    }}></div>
                  </div>
                  <div style={{ fontSize: '0.72rem', marginTop: '0.2rem', color: strength.color }}>
                    {strength.text}
                  </div>
                </div>
              )}
            </div>

            <div className="form-group">
              <label>Confirm New Password *</label>
              <div className="form-control-wrapper">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  className="form-control"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <span className="field-error">{errors.confirmPassword}</span>
              )}
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-save" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <KeyRound size={16} />
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordModal;
