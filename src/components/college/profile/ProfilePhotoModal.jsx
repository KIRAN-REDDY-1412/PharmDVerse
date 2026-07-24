import React, { useState, useEffect } from 'react';
import { X, Image as ImageIcon, Upload, Trash2, Camera, Save } from 'lucide-react';
import { useDatabase } from '../../../context/DatabaseContext';
import '../preceptor/AddPreceptorModal.css';
import '../student/AddStudentModal.css';

const ProfilePhotoModal = ({ isOpen, onClose, user }) => {
  const { updateUser } = useDatabase();
  const [photoPreview, setPhotoPreview] = useState(null);

  useEffect(() => {
    if (user?.profilePhoto) {
      setPhotoPreview(user.profilePhoto);
    } else {
      setPhotoPreview(null);
    }
  }, [user, isOpen]);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!validTypes.includes(file.type)) {
      alert('Please upload a JPG, JPEG, or PNG file.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5 MB.');
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => setPhotoPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleRemove = () => {
    setPhotoPreview(null);
  };

  const handleSave = () => {
    if (user) {
      updateUser(user.id, { profilePhoto: photoPreview });
    }
    alert('Profile photo updated successfully!');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="student-modal" onClick={e => e.stopPropagation()} style={{ maxWidth: '450px' }}>
        
        {/* Header */}
        <div className="modal-header">
          <div className="modal-title-group">
            <ImageIcon size={32} className="modal-title-icon" />
            <div className="modal-title-text">
              <h2>Profile Photo</h2>
              <p>Update your display picture</p>
            </div>
          </div>
          <button className="close-button" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
          
          <div className="student-photo-box" style={{ width: '200px', height: '200px', borderRadius: '50%', margin: '0 auto' }}>
            {photoPreview ? (
              <img src={photoPreview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
            ) : (
              <Camera size={64} style={{ color: 'var(--text-secondary)', opacity: 0.4 }} strokeWidth={1} />
            )}
          </div>
          
          <p className="photo-formats" style={{ fontSize: '0.85rem' }}>Supported formats: JPG, PNG. Max size: 5 MB.</p>
          
          <div style={{ display: 'flex', gap: '1rem', width: '100%' }}>
            <button 
              className="btn-reset" 
              style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
              onClick={handleRemove}
              disabled={!photoPreview}
            >
              <Trash2 size={16} /> Remove
            </button>
            <button 
              className="btn-save" 
              style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', backgroundColor: 'var(--color-primary)' }}
              onClick={() => document.getElementById('profile-photo-upload').click()}
            >
              <Upload size={16} /> Upload New
            </button>
            <input type="file" id="profile-photo-upload" accept=".jpg,.jpeg,.png" style={{ display: 'none' }} onChange={handlePhotoUpload} />
          </div>

        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button className="btn-save" onClick={handleSave}><Save size={18} /> Save Photo</button>
        </div>

      </div>
    </div>
  );
};

export default ProfilePhotoModal;
