import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Building2, BookOpen, BellRing, ShieldCheck, DatabaseBackup, GraduationCap, UserCircle, KeyRound, Image as ImageIcon, Palette, Lock } from 'lucide-react';
import CollegeAdminLayout from '../../components/college/CollegeAdminLayout';
import EditProfileModal from '../../components/shared/profile/EditProfileModal';
import ChangePasswordModal from '../../components/shared/profile/ChangePasswordModal';
import ProfilePhotoModal from '../../components/college/profile/ProfilePhotoModal';
import { useAuth } from '../../context/AuthContext';
import { useDatabase } from '../../context/DatabaseContext';
import { useTheme } from '../../context/ThemeContext';
import '../college/PreceptorManagement.css'; 

const SettingsManagement = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);

  const { currentUser } = useAuth();
  const { users } = useDatabase();
  const user = users.find(u => u.id === currentUser?.id);
  const { toggleTheme } = useTheme();
  return (
    <CollegeAdminLayout>
      <div className="preceptor-page">
        
        <div className="page-header">
          <h1 className="page-title">Settings</h1>
          <div className="breadcrumbs">
            <Link to="/college-admin/dashboard" className="breadcrumb-link">Dashboard</Link>
            <span className="breadcrumb-separator">&gt;</span>
            <span>Settings</span>
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

          {/* Existing Admin Actions */}
          <Link to="/college-admin/settings/college-info" className="action-card">
            <div className="action-icon-wrapper blue">
              <Building2 size={32} />
            </div>
            <div className="action-details">
              <span className="action-title">College Information</span>
              <span className="action-subtitle">Manage college details</span>
            </div>
          </Link>

          <Link to="/college-admin/settings/academic" className="action-card">
            <div className="action-icon-wrapper orange">
              <GraduationCap size={32} />
            </div>
            <div className="action-details">
              <span className="action-title">Academic Settings</span>
              <span className="action-subtitle">Manage academic configuration</span>
            </div>
          </Link>
          
          <Link to="/college-admin/settings/notifications" className="action-card">
            <div className="action-icon-wrapper green">
              <BellRing size={32} />
            </div>
            <div className="action-details">
              <span className="action-title">Notification Settings</span>
              <span className="action-subtitle">Manage notification preferences</span>
            </div>
          </Link>

          <Link to="/college-admin/settings/security" className="action-card">
            <div className="action-icon-wrapper red">
              <ShieldCheck size={32} />
            </div>
            <div className="action-details">
              <span className="action-title">Security Settings</span>
              <span className="action-subtitle">Manage system security</span>
            </div>
          </Link>

          <div className="action-card" style={{ opacity: 0.7, cursor: 'not-allowed' }}>
            <div className="action-icon-wrapper red">
              <Lock size={32} />
            </div>
            <div className="action-details">
              <span className="action-title">Privacy Settings</span>
              <span className="action-subtitle">Coming Soon</span>
            </div>
          </div>

          <Link to="/college-admin/settings/backup" className="action-card">
            <div className="action-icon-wrapper blue">
              <DatabaseBackup size={32} />
            </div>
            <div className="action-details">
              <span className="action-title">Backup & Restore</span>
              <span className="action-subtitle">Manage database backup and recovery</span>
            </div>
          </Link>

        </div>

      </div>

      <EditProfileModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} user={user} />
      <ChangePasswordModal isOpen={isPasswordModalOpen} onClose={() => setIsPasswordModalOpen(false)} user={user} />
      <ProfilePhotoModal isOpen={isPhotoModalOpen} onClose={() => setIsPhotoModalOpen(false)} user={user} />
      
    </CollegeAdminLayout>
  );
};

export default SettingsManagement;
