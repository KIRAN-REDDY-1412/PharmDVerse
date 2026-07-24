import React from 'react';
import { Link } from 'react-router-dom';
import CollegeAdminLayout from '../../components/college/CollegeAdminLayout';
import UserProfileView from '../../components/shared/profile/UserProfileView';
import { useAuth } from '../../context/AuthContext';
import { useDatabase } from '../../context/DatabaseContext';

const MyProfileManagement = () => {
  const { currentUser } = useAuth();
  const { users } = useDatabase();
  const user = users.find(u => u.id === currentUser?.id);

  return (
    <CollegeAdminLayout>
      <div className="view-profile-page" style={{ padding: '1.5rem 2rem 2rem', minHeight: '100%' }}>
        
        <div className="page-header" style={{ marginBottom: '2rem' }}>
          <h1 className="page-title" style={{ fontSize: '1.75rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>My Profile</h1>
          <div className="breadcrumbs" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            <Link to="/college-admin/dashboard" className="breadcrumb-link" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>Dashboard</Link>
            <span className="breadcrumb-separator">&gt;</span>
            <span>My Profile</span>
          </div>
        </div>

        <UserProfileView user={user} />

      </div>
    </CollegeAdminLayout>
  );
};

export default MyProfileManagement;
