import React from 'react';
import './UserProfileView.css';

const UserProfileView = ({ user }) => {

  if (!user) return <div style={{ padding: '2rem' }}>Loading profile...</div>;

  // Get initials for avatar
  const initials = user.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U';

  const renderStudentFields = () => (
    <>
      <h3 className="profile-section-title">Academic Information</h3>
      <div className="detail-group">
        <span className="detail-label">Roll Number</span>
        <span className="detail-value">{user.id}</span>
      </div>
      <div className="detail-group">
        <span className="detail-label">Course</span>
        <span className="detail-value">{user.course || '-'}</span>
      </div>
      <div className="detail-group">
        <span className="detail-label">Branch</span>
        <span className="detail-value">{user.branch || '-'}</span>
      </div>
      <div className="detail-group">
        <span className="detail-label">Current Year</span>
        <span className="detail-value">{user.year || '-'}</span>
      </div>
      <div className="detail-group">
        <span className="detail-label">Batch</span>
        <span className="detail-value">{user.batch || '-'}</span>
      </div>
      <div className="detail-group">
        <span className="detail-label">Academic Year</span>
        <span className="detail-value">{user.academicYear || '-'}</span>
      </div>

      <h3 className="profile-section-title">Account Information</h3>
      <div className="detail-group">
        <span className="detail-label">Username</span>
        <span className="detail-value">{user.id}</span>
      </div>
      <div className="detail-group">
        <span className="detail-label">Registration Date</span>
        <span className="detail-value">{user.registrationDate || 'Aug 15, 2023'}</span>
      </div>
      <div className="detail-group">
        <span className="detail-label">Last Login Date</span>
        <span className="detail-value">{user.lastLoginDate || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
      </div>
      <div className="detail-group">
        <span className="detail-label">Last Login Time</span>
        <span className="detail-value">{user.lastLoginTime || new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
      </div>
      <div className="detail-group">
        <span className="detail-label">Account Status</span>
        <span className="detail-value status-badge" style={{ backgroundColor: user.status === 'Inactive' ? '#fef2f2' : '#f0fdf4', color: user.status === 'Inactive' ? '#991b1b' : '#166534', border: `1px solid ${user.status === 'Inactive' ? '#fecaca' : '#bbf7d0'}`, width: 'fit-content', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 600 }}>{user.status || 'Active'}</span>
      </div>
    </>
  );

  const renderOtherRoleFields = () => (
    <>
      <div className="detail-group">
        <span className="detail-label">User ID</span>
        <span className="detail-value">{user.id}</span>
      </div>

      {user.email && (
        <div className="detail-group">
          <span className="detail-label">Email Address</span>
          <span className="detail-value">{user.email}</span>
        </div>
      )}

      {(user.phone || user.mobileNumber || user.mobile) && (
        <div className="detail-group">
          <span className="detail-label">Mobile Number</span>
          <span className="detail-value">{user.phone || user.mobileNumber || user.mobile}</span>
        </div>
      )}

      {user.gender && (
        <div className="detail-group">
          <span className="detail-label">Gender</span>
          <span className="detail-value">{user.gender}</span>
        </div>
      )}

      {user.department && (
        <div className="detail-group">
          <span className="detail-label">Department</span>
          <span className="detail-value">{user.department}</span>
        </div>
      )}

      {user.status && (
        <div className="detail-group">
          <span className="detail-label">Account Status</span>
          <span className="detail-value status-badge">{user.status}</span>
        </div>
      )}

      {user.role === 'admin' && user.designation && (
        <div className="detail-group">
          <span className="detail-label">Designation</span>
          <span className="detail-value">{user.designation}</span>
        </div>
      )}

      {user.role === 'preceptor' && (
        <>
          {user.qualification && (
            <div className="detail-group">
              <span className="detail-label">Qualification</span>
              <span className="detail-value">{user.qualification}</span>
            </div>
          )}
          {user.designation && (
            <div className="detail-group">
              <span className="detail-label">Designation</span>
              <span className="detail-value">{user.designation}</span>
            </div>
          )}
          {user.specialization && (
            <div className="detail-group">
              <span className="detail-label">Specialization</span>
              <span className="detail-value">{user.specialization}</span>
            </div>
          )}
        </>
      )}
    </>
  );

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
            <h2 style={{ marginBottom: user.role === 'student' ? '0.5rem' : '0' }}>{user.name || user.fullName}</h2>
            {user.role === 'student' ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                <div><strong>Roll Number:</strong> {user.id}</div>
                <div><strong>Username:</strong> {user.id}</div>
                <div>
                  <strong>Course:</strong> {user.course || '-'} &nbsp;|&nbsp; 
                  <strong>Branch:</strong> {user.branch || '-'} &nbsp;|&nbsp; 
                  <strong>Current Year:</strong> {user.year || '-'}
                </div>
                <div style={{ marginTop: '0.25rem' }}>
                   <span className="status-badge" style={{ backgroundColor: user.status === 'Inactive' ? '#fef2f2' : '#f0fdf4', color: user.status === 'Inactive' ? '#991b1b' : '#166534', border: `1px solid ${user.status === 'Inactive' ? '#fecaca' : '#bbf7d0'}`, padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 600 }}>
                     {user.status || 'Active'}
                   </span>
                </div>
              </div>
            ) : (
              <p>{user.role === 'admin' ? 'College Admin' : user.role === 'preceptor' ? 'Preceptor' : 'Student'}{user.department && user.role !== 'student' ? ` • ${user.department}` : ''}</p>
            )}
          </div>
        </div>
      </div>

      <div className="profile-details-grid">
        {user.role === 'student' ? renderStudentFields() : renderOtherRoleFields()}
      </div>
    </div>
  );
};

export default UserProfileView;
