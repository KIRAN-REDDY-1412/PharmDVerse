import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BellRing, UserCircle, KeyRound, Image as ImageIcon, Palette, ShieldCheck, Lock } from 'lucide-react';
import PreceptorLayout from '../../components/preceptor/PreceptorLayout';
import EditProfileModal from '../../components/shared/profile/EditProfileModal';
import ChangePasswordModal from '../../components/shared/profile/ChangePasswordModal';
import ProfilePhotoModal from '../../components/college/profile/ProfilePhotoModal';
import { useAuth } from '../../context/AuthContext';
import { useDatabase } from '../../context/DatabaseContext';
import { useTheme } from '../../context/ThemeContext';
import '../college/PreceptorManagement.css';

const PreceptorSettingsHub = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);

  const { currentUser } = useAuth();
  const { users } = useDatabase();
  const user = users.find(u => u.id === currentUser?.id);
  const { toggleTheme } = useTheme();

  return (
    <PreceptorLayout>
      <div className="preceptor-page">
        <div className="breadcrumb">
          <Link to="/preceptor/dashboard">Dashboard</Link>
          <span> / </span>
          <span className="current">Settings</span>
        </div>

        <div className="page-header">
          <div className="header-title">
            <h1>Settings</h1>
            <p className="subtitle">Manage your portal preferences and configurations.</p>
          </div>
        </div>

        <div className="preceptor-actions-grid">
          {/* Profile Management Actions */}
          <div className="action-card" onClick={() => setIsEditModalOpen(true)} style={{ cursor: 'pointer' }}>
            <div className="action-icon-wrapper blue">
              <UserCircle size={32} />
            </div>
            <div className="action-details">
              <span className="action-title">Edit Profile</span>
              <span className="action-subtitle">Update personal & contact details</span>
            </div>
          </div>

          <div className="action-card" onClick={() => setIsPhotoModalOpen(true)} style={{ cursor: 'pointer' }}>
            <div className="action-icon-wrapper purple">
              <ImageIcon size={32} />
            </div>
            <div className="action-details">
              <span className="action-title">Change Profile Photo</span>
              <span className="action-subtitle">Upload or update display picture</span>
            </div>
          </div>

          <div className="action-card" onClick={() => setIsPasswordModalOpen(true)} style={{ cursor: 'pointer' }}>
            <div className="action-icon-wrapper orange">
              <KeyRound size={32} />
            </div>
            <div className="action-details">
              <span className="action-title">Change Password</span>
              <span className="action-subtitle">Update account password securely</span>
            </div>
          </div>

          <div className="action-card" onClick={toggleTheme} style={{ cursor: 'pointer' }}>
            <div className="action-icon-wrapper green">
              <Palette size={32} />
            </div>
            <div className="action-details">
              <span className="action-title">Theme Settings</span>
              <span className="action-subtitle">Toggle Light / Dark mode</span>
            </div>
          </div>
          
          <Link to="/preceptor/settings/notifications" className="action-card">
            <div className="action-icon-wrapper blue">
              <BellRing size={32} />
            </div>
            <div className="action-details">
              <span className="action-title">Notification Settings</span>
              <span className="action-subtitle">Manage notification preferences</span>
            </div>
          </Link>

        </div>
      </div>

      <EditProfileModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} user={user} />
      <ChangePasswordModal isOpen={isPasswordModalOpen} onClose={() => setIsPasswordModalOpen(false)} user={user} />
      <ProfilePhotoModal isOpen={isPhotoModalOpen} onClose={() => setIsPhotoModalOpen(false)} user={user} />
    </PreceptorLayout>
  );
};

export default PreceptorSettingsHub;
