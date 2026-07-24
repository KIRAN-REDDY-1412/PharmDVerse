import React from 'react';
import { Link } from 'react-router-dom';

const SuperAdminDashboard = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--bg-main)', color: 'var(--text-primary)' }}>
      <h1>Super Admin Dashboard (Development Stub)</h1>
      <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>Phase 3 implementation will go here.</p>
      <Link to="/" className="btn btn-secondary" style={{ marginTop: '2rem' }}>
        Back to Home
      </Link>
    </div>
  );
};

export default SuperAdminDashboard;
