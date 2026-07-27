import React, { useState, useEffect } from 'react';
import { KeyRound, Eye, EyeOff, X } from 'lucide-react';
import './AddPreceptorModal.css';

const ResetPreceptorPasswordModal = ({ isOpen, onClose, preceptor, onResetPassword }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setNewPassword('');
      setConfirmPassword('');
      setShowNewPassword(false);
      setShowConfirmPassword(false);
      setError('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const validatePassword = (password) => {
    if (password.length < 6) return false;
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    return hasLetter && hasNumber;
  };

  const getPasswordStrength = (password) => {
    if (password.length === 0) return { label: '', color: 'transparent' };
    if (!validatePassword(password)) return { label: 'Weak', color: '#ef4444' };
    if (password.length >= 8 && /[!@#$%^&*]/.test(password)) return { label: 'Strong', color: '#22c55e' };
    return { label: 'Medium', color: '#eab308' };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!validatePassword(newPassword)) {
      setError('Password must be at least 6 characters and contain at least one letter and one number.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    onResetPassword(preceptor?.id, newPassword);
    alert('Password reset successfully.');
    onClose();
  };

  const strength = getPasswordStrength(newPassword);

  return (
    <div className="modal-overlay">
      <div className="preceptor-modal" style={{ maxWidth: '450px' }}>
        <div className="modal-header">
          <div className="header-title">
            <div className="header-icon primary">
              <KeyRound size={20} />
            </div>
            <div>
              <h2>Reset Password</h2>
              <p className="subtitle">Reset password for {preceptor?.name}</p>
            </div>
          </div>
          <button className="close-button" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <form id="reset-password-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>New Password <span className="required">*</span></label>
              <div className="password-input-wrapper" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  required
                  style={{ width: '100%', paddingRight: '40px' }}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  style={{ position: 'absolute', right: '10px', background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280' }}
                >
                  {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              
              {newPassword.length > 0 && (
                <div className="password-strength" style={{ marginTop: '8px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ flex: 1, height: '4px', backgroundColor: '#e5e7eb', borderRadius: '2px', overflow: 'hidden' }}>
                    <div style={{ width: strength.label === 'Weak' ? '33%' : strength.label === 'Medium' ? '66%' : '100%', height: '100%', backgroundColor: strength.color, transition: 'all 0.3s' }}></div>
                  </div>
                  <span style={{ color: strength.color, fontWeight: '500' }}>{strength.label}</span>
                </div>
              )}
            </div>

            <div className="form-group">
              <label>Confirm New Password <span className="required">*</span></label>
              <div className="password-input-wrapper" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  required
                  style={{ width: '100%', paddingRight: '40px' }}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={{ position: 'absolute', right: '10px', background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280' }}
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && <div className="error-message" style={{ color: '#ef4444', fontSize: '14px', marginTop: '10px' }}>{error}</div>}
          </form>
        </div>

        <div className="modal-footer">
          <button type="button" className="btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" form="reset-password-form" className="btn-primary">
            Reset Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPreceptorPasswordModal;
