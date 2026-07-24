import React from 'react';
import './UserProfileView.css';

const UserProfileView = ({ user }) => {

  if (!user) return <div style={{ padding: '2rem' }}>Loading profile...</div>;

  // Get initials for avatar
  const initials = user.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U';

  const renderRoleSpecificFields = () => {
    switch (user.role) {
      case 'admin':
        return (
          <>
            <div className="detail-group">
              <span className="detail-label">Administrator ID</span>
              <span className="detail-value">{user.id}</span>
            </div>
            <div className="detail-group">
              <span className="detail-label">Designation</span>
              <span className="detail-value">{user.designation || 'Principal'}</span>
            </div>
          </>
        );
      case 'preceptor':
        return (
          <>
            <div className="detail-group">
              <span className="detail-label">Preceptor ID</span>
              <span className="detail-value">{user.id}</span>
            </div>
            <div className="detail-group">
              <span className="detail-label">Qualification</span>
              <span className="detail-value">{user.qualification || 'Pharm.D'}</span>
            </div>
            <div className="detail-group">
              <span className="detail-label">Designation</span>
              <span className="detail-value">{user.designation || 'Senior Preceptor'}</span>
            </div>
            <div className="detail-group">
              <span className="detail-label">Specialization</span>
              <span className="detail-value">{user.specialization || 'Clinical Pharmacy'}</span>
            </div>
          </>
        );
      case 'student':
        return (
          <>
            <div className="detail-group">
              <span className="detail-label">Roll Number</span>
              <span className="detail-value">{user.id}</span>
            </div>
            <div className="detail-group">
              <span className="detail-label">Course</span>
              <span className="detail-value">{user.course || 'Pharm.D'}</span>
            </div>
            <div className="detail-group">
              <span className="detail-label">Academic Year</span>
              <span className="detail-value">{user.academicYear || '5th Year'}</span>
            </div>
            <div className="detail-group">
              <span className="detail-label">Semester</span>
              <span className="detail-value">{user.semester || 'Semester 9'}</span>
            </div>
            <div className="detail-group">
              <span className="detail-label">Batch</span>
              <span className="detail-value">{user.batch || '2020-2026'}</span>
            </div>
            <div className="detail-group">
              <span className="detail-label">Assigned Preceptor</span>
              <span className="detail-value">{user.assignedPreceptor || 'Not Assigned'}</span>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="profile-card">
      <div className="profile-header-section">
        <div className="profile-user-info">
          <div className="profile-avatar-large">
            {user.profilePhoto ? (
              <img src={user.profilePhoto} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
            ) : (
              initials
            )}
          </div>
          <div className="profile-name-block">
            <h2>{user.name}</h2>
            <p>{user.role === 'admin' ? 'College Admin' : user.role === 'preceptor' ? 'Preceptor' : 'Student'} • {user.department || 'General'}</p>
          </div>
        </div>
      </div>

      <div className="profile-details-grid">
        
        <div className="detail-group">
          <span className="detail-label">User ID / Roll No</span>
          <span className="detail-value">{user.id}</span>
        </div>

        <div className="detail-group">
          <span className="detail-label">Email Address</span>
          <span className="detail-value">{user.email || 'Not provided'}</span>
        </div>

        <div className="detail-group">
          <span className="detail-label">Mobile Number</span>
          <span className="detail-value">{user.phone || 'Not provided'}</span>
        </div>

        <div className="detail-group">
          <span className="detail-label">Gender</span>
          <span className="detail-value">{user.gender || 'Not specified'}</span>
        </div>

        <div className="detail-group">
          <span className="detail-label">Department</span>
          <span className="detail-value">{user.department || 'General'}</span>
        </div>

        <div className="detail-group">
          <span className="detail-label">Account Status</span>
          <span className="detail-value status-badge">{user.status || 'Active'}</span>
        </div>

        <div className="detail-group">
          <span className="detail-label">Date of Birth</span>
          <span className="detail-value">{user.dateOfBirth || 'Not provided'}</span>
        </div>

        <div className="detail-group">
          <span className="detail-label">Address</span>
          <span className="detail-value">{user.address || 'Not provided'}</span>
        </div>

        <div className="detail-group">
          <span className="detail-label">Institution Name</span>
          <span className="detail-value">{user.institution || 'PharmDVerse Medical College'}</span>
        </div>

        {/* Role Specific Fields */}
        {renderRoleSpecificFields()}

      </div>
    </div>
  );
};

export default UserProfileView;
