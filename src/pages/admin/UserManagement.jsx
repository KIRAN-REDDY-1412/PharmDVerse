import React, { useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { 
  Users, Search, Filter, MoreVertical, X, 
  CheckCircle, AlertTriangle, Shield, Download, 
  Activity, Lock, Key, Mail, Building, MapPin, 
  UserPlus, UserMinus, Monitor
} from 'lucide-react';
import './UserManagement.css'; 

// Mock Data
const MOCK_USERS = [
  {
    id: 'USR-901',
    name: 'Dr. Sarah Jenkins',
    email: 's.jenkins@utexas.edu',
    role: 'College Admin',
    college: 'University of Texas Pharmacy',
    status: 'Active',
    lastLogin: '2 mins ago',
    ip: '192.168.1.105',
    device: 'MacBook Pro - Safari',
    failedLogins: 0,
    parentAffiliation: null
  },
  {
    id: 'USR-802',
    name: 'Michael Chang',
    email: 'm.chang@bhc.edu',
    role: 'Preceptor',
    college: 'Boston Healthcare College',
    status: 'Active',
    lastLogin: '4 hours ago',
    ip: '10.0.0.45',
    device: 'Windows PC - Chrome',
    failedLogins: 0,
    parentAffiliation: 'Dr. Robert Hale (Admin)'
  },
  {
    id: 'USR-703',
    name: 'Emily Davis',
    email: 'edavis@student.seattle.edu',
    role: 'Student',
    college: 'Seattle Clinical Institute',
    status: 'Locked',
    lastLogin: '3 days ago',
    ip: '172.16.254.1',
    device: 'iPhone 13 - Safari',
    failedLogins: 5,
    parentAffiliation: 'Assigned to: Dr. Alan Smith (Preceptor)'
  },
  {
    id: 'USR-704',
    name: 'James Wilson',
    email: 'j.wilson@midwestpharm.org',
    role: 'Student',
    college: 'Midwest Pharmacy Academy',
    status: 'Suspended',
    lastLogin: '1 month ago',
    ip: '192.168.0.12',
    device: 'iPad Pro - Chrome',
    failedLogins: 0,
    parentAffiliation: 'Assigned to: Dr. Linda Ray (Preceptor)'
  }
];

const getStatusBadge = (status) => {
  switch(status.toLowerCase()) {
    case 'active':
      return <span className="status-badge success"><CheckCircle size={14} /> {status}</span>;
    case 'suspended':
      return <span className="status-badge danger"><AlertTriangle size={14} /> {status}</span>;
    case 'locked':
      return <span className="status-badge warning"><Lock size={14} /> {status}</span>;
    default:
      return <span className="status-badge neutral">{status}</span>;
  }
};

const getRoleBadge = (role) => {
  switch(role.toLowerCase()) {
    case 'college admin':
      return <span className="role-pill purple">{role}</span>;
    case 'preceptor':
      return <span className="role-pill blue">{role}</span>;
    case 'student':
      return <span className="role-pill slate">{role}</span>;
    default:
      return <span className="role-pill green">{role}</span>;
  }
}

const UserManagement = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <AdminLayout>
      <div className="user-management-container">
        
        {/* Command Header */}
        <div className="command-header">
          <div>
            <h1 className="page-title">User Management</h1>
            <p className="page-subtitle">Manage users, roles, and access permissions across all pharmacy institutions.</p>
          </div>
          <div className="header-actions">
            <button className="btn btn-secondary" onClick={() => window.location.href = '/super-admin/users/role-matrix'} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <Shield size={18} /> Role Permission Matrix
            </button>
            <button className="btn btn-secondary"><Download size={18} /> Export IAM Report</button>
          </div>
        </div>

        {/* Dashboard KPIs */}
        <div className="user-kpis-grid">
          <div className="kpi-card">
            <div className="kpi-icon blue"><Users size={24} /></div>
            <div className="kpi-content">
              <div className="kpi-value">46,250</div>
              <div className="kpi-label">Total Active Users</div>
            </div>
          </div>
          <div className="kpi-card">
            <div className="kpi-icon purple"><Shield size={24} /></div>
            <div className="kpi-content">
              <div className="kpi-value">142</div>
              <div className="kpi-label">College Admins</div>
            </div>
          </div>
          <div className="kpi-card">
            <div className="kpi-icon warning"><Lock size={24} /></div>
            <div className="kpi-content">
              <div className="kpi-value">18</div>
              <div className="kpi-label">Locked Accounts</div>
            </div>
          </div>
          <div className="kpi-card">
            <div className="kpi-icon danger"><AlertTriangle size={24} /></div>
            <div className="kpi-content">
              <div className="kpi-value">5</div>
              <div className="kpi-label">High-Risk Suspensions</div>
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="toolbar mt-4">
          <div className="search-box">
            <Search size={18} className="search-icon" />
            <input type="text" placeholder="Search by name, email, or College..." />
          </div>
          <div className="filters">
            <button className="filter-btn"><Filter size={18} /> Role: All</button>
            <button className="filter-btn"><Filter size={18} /> Status: All</button>
            <button className="filter-btn"><Filter size={18} /> College: All</button>
          </div>
        </div>

        {/* User Directory (Data Grid) */}
        <div className="data-grid-container">
          <table className="enterprise-table">
            <thead>
              <tr>
                <th>Identity</th>
                <th>Role</th>
                <th>Parent College</th>
                <th>Account Status</th>
                <th>Last Login</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_USERS.map((user) => (
                <tr key={user.id} onClick={() => setSelectedUser(user)} className="clickable-row">
                  <td>
                    <div className="user-cell-info">
                      <div className="user-avatar">{user.name.charAt(0)}</div>
                      <div>
                        <div className="user-name">{user.name}</div>
                        <div className="user-email">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>{getRoleBadge(user.role)}</td>
                  <td>
                    <div className="parent-college-name"><Building size={14}/> {user.college}</div>
                  </td>
                  <td>{getStatusBadge(user.status)}</td>
                  <td>
                    <div className="last-login-text">{user.lastLogin}</div>
                  </td>
                  <td>
                    <button className="icon-btn-small" onClick={(e) => { e.stopPropagation(); }}><MoreVertical size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      {/* Slide-out Identity Modal */}
      {selectedUser && (
        <>
          <div className="modal-backdrop" onClick={() => setSelectedUser(null)}></div>
          <div className="slide-out-modal">
            <div className="modal-header">
              <div className="user-cell-info">
                <div className="user-avatar large">{selectedUser.name.charAt(0)}</div>
                <div>
                  <h2 className="modal-title">{selectedUser.name}</h2>
                  <div className="modal-subtitle">ID: {selectedUser.id} • {getStatusBadge(selectedUser.status)}</div>
                </div>
              </div>
              <button className="close-btn" onClick={() => setSelectedUser(null)}>
                <X size={24} />
              </button>
            </div>

            <div className="modal-tabs">
              <button className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => setActiveTab('profile')}>Profile</button>
              <button className={`tab-btn ${activeTab === 'security' ? 'active' : ''}`} onClick={() => setActiveTab('security')}>Security & Access</button>
              <button className={`tab-btn ${activeTab === 'login_history' ? 'active' : ''}`} onClick={() => setActiveTab('login_history')}>Login History</button>
            </div>

            <div className="modal-body">
              {activeTab === 'profile' && (
                <div className="tab-content">
                  <div className="info-card">
                    <h3>Hierarchical Binding</h3>
                    <div className="info-grid mt-4">
                      <div className="info-item"><Building size={16}/> <strong>College:</strong> {selectedUser.college}</div>
                      <div className="info-item"><Shield size={16}/> <strong>Role:</strong> {getRoleBadge(selectedUser.role)}</div>
                      {selectedUser.parentAffiliation && (
                        <div className="info-item"><Users size={16}/> <strong>Affiliation:</strong> {selectedUser.parentAffiliation}</div>
                      )}
                    </div>
                  </div>

                  <div className="info-card mt-4">
                    <h3>Contact Information</h3>
                    <div className="info-grid mt-4">
                      <div className="info-item"><Mail size={16}/> {selectedUser.email}</div>
                      <div className="info-item"><MapPin size={16}/> Registered in US-East</div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'security' && (
                <div className="tab-content">
                  
                  {selectedUser.status === 'Locked' && (
                    <div className="warning-banner mb-4" style={{ background: 'rgba(245,158,11,0.1)', padding: '1rem', borderRadius: '8px', border: '1px solid #f59e0b' }}>
                      <h4 style={{ color: '#d97706', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}><Lock size={18}/> Account Automatically Locked</h4>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>This account was locked due to {selectedUser.failedLogins} consecutive failed login attempts. Verify user identity before unlocking.</p>
                      <button className="btn btn-primary mt-3"><Shield size={16}/> Unlock Account</button>
                    </div>
                  )}

                  <div className="info-card">
                    <h3>Access Controls</h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Execute global identity interventions.</p>
                    
                    <div className="action-list">
                      <button className="btn btn-secondary w-full justify-start mb-3"><Mail size={18}/> Send Password Reset Link</button>
                      <button className="btn btn-secondary w-full justify-start mb-3"><Key size={18}/> Force Password Change on Next Login</button>
                      <button className="btn btn-secondary w-full justify-start mb-3"><Monitor size={18}/> Invalidate All Active Sessions</button>
                    </div>
                  </div>
                  
                  {selectedUser.role === 'Preceptor' && (
                    <div className="warning-banner mt-4" style={{ background: 'rgba(239,68,68,0.1)', padding: '1rem', borderRadius: '8px', border: '1px solid #ef4444' }}>
                      <h4 style={{ color: '#ef4444', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}><AlertTriangle size={18}/> Cascading Suspension Risk</h4>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Suspending this Preceptor will temporarily orphan 12 assigned Students from case approvals until reassigned by the College Admin.</p>
                    </div>
                  )}

                  {selectedUser.status === 'Suspended' ? (
                     <button className="btn btn-success w-full mt-4 justify-center"><UserPlus size={18} /> Restore User Access</button>
                  ) : (
                     <button className="btn btn-danger w-full mt-4 justify-center"><UserMinus size={18} /> Suspend User Account</button>
                  )}
                </div>
              )}

              {activeTab === 'login_history' && (
                <div className="tab-content">
                  <div className="info-card">
                    <h3>Session Telemetry</h3>
                    <div className="audit-timeline mt-4">
                      <div className="audit-event">
                        <div className="event-icon"><Activity size={16} /></div>
                        <div className="event-details">
                          <div className="event-title">{selectedUser.status === 'Locked' ? 'Failed Login (Incorrect Password)' : 'Successful Login'}</div>
                          <div className="event-time">{selectedUser.lastLogin} • IP: {selectedUser.ip}</div>
                          <div className="event-time">Device: {selectedUser.device}</div>
                        </div>
                      </div>
                      <div className="audit-event">
                        <div className="event-icon"><Activity size={16} /></div>
                        <div className="event-details">
                          <div className="event-title">Successful Login</div>
                          <div className="event-time">3 days ago • IP: 192.168.1.105</div>
                          <div className="event-time">Device: MacBook Pro - Safari</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </AdminLayout>
  );
};

export default UserManagement;
