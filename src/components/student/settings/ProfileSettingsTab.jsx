import React, { useState, useRef, useEffect } from 'react';
import { useDatabase } from '../../../context/DatabaseContext';

const ProfileSettingsTab = ({ user }) => {
  const { updateUser } = useDatabase();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    email: user?.email || '',
    mobile: user?.phone || user?.mobileNumber || user?.mobile || '',
    profilePhoto: user?.profilePhoto || null,
  });
  
  const [initialData, setInitialData] = useState({ ...formData });
  const [errors, setErrors] = useState({});
  const [isDirty, setIsDirty] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    setIsDirty(
      formData.email !== initialData.email ||
      formData.mobile !== initialData.mobile ||
      formData.profilePhoto !== initialData.profilePhoto
    );
  }, [formData, initialData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'mobile' && value !== '' && !/^\d+$/.test(value)) return;
    
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
    setIsSuccess(false);
  };

  const validate = () => {
    const newErrors = {};
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (formData.mobile && formData.mobile.length < 10) {
      newErrors.mobile = 'Mobile number must be at least 10 digits';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    
    updateUser(user.id, {
      ...user,
      email: formData.email,
      mobileNumber: formData.mobile, // Updating mobileNumber standardizes it
      profilePhoto: formData.profilePhoto
    });
    
    setInitialData({ ...formData });
    setIsDirty(false);
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 3000);
  };

  const handleReset = () => {
    setFormData({ ...initialData });
    setErrors({});
    setIsSuccess(false);
  };

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, photo: 'File size must be less than 2MB' }));
      return;
    }

    if (!['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {
      setErrors(prev => ({ ...prev, photo: 'Only JPG, JPEG, and PNG are allowed' }));
      return;
    }

    setErrors(prev => ({ ...prev, photo: null }));
    const reader = new FileReader();
    reader.onload = (event) => {
      setFormData(prev => ({ ...prev, profilePhoto: event.target.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    setFormData(prev => ({ ...prev, profilePhoto: null }));
  };

  const initials = user.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U';

  return (
    <div>
      <div className="settings-section-header">
        <h2 className="settings-section-title">Profile Settings</h2>
        <p className="settings-section-desc">Manage your profile photograph, email address, and mobile number.</p>
      </div>

      <div className="photo-upload-container">
        <div className="photo-preview">
          {formData.profilePhoto ? (
            <img src={formData.profilePhoto} alt="Profile" />
          ) : (
            initials
          )}
        </div>
        <div className="photo-actions">
          <div className="photo-action-buttons">
            <input 
              type="file" 
              ref={fileInputRef} 
              style={{ display: 'none' }} 
              accept="image/jpeg, image/jpg, image/png"
              onChange={handleFileChange}
            />
            <button className="btn-upload" onClick={handleFileClick}>
              {formData.profilePhoto ? 'Replace Photo' : 'Upload New Photo'}
            </button>
            {formData.profilePhoto && (
              <button className="btn-remove" onClick={handleRemovePhoto}>Remove Photo</button>
            )}
          </div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Accepts JPG, JPEG, PNG. Max size: 2MB.
          </span>
          {errors.photo && <span className="error-message">{errors.photo}</span>}
        </div>
      </div>

      <div className="settings-form-row">
        <div className="settings-form-group">
          <label className="settings-form-label">Email Address</label>
          <input 
            type="email" 
            name="email"
            className="settings-form-input" 
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleInputChange}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        <div className="settings-form-group">
          <label className="settings-form-label">Mobile Number</label>
          <input 
            type="text" 
            name="mobile"
            className="settings-form-input" 
            placeholder="Enter 10 digit mobile number"
            value={formData.mobile}
            onChange={handleInputChange}
          />
          {errors.mobile && <span className="error-message">{errors.mobile}</span>}
        </div>
      </div>

      <div className="settings-actions" style={{ alignItems: 'center' }}>
        <button className="settings-btn-save" disabled={!isDirty} onClick={handleSave}>
          Save Changes
        </button>
        <button className="settings-btn-cancel" disabled={!isDirty} onClick={handleReset}>
          Reset Changes
        </button>
        {isSuccess && <span style={{ color: 'var(--color-accent)', fontWeight: 500, marginLeft: '1rem' }}>Settings saved successfully!</span>}
      </div>
    </div>
  );
};

export default ProfileSettingsTab;
