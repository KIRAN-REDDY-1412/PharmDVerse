import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { 
  ArrowLeft, Edit, Key, Ban, UserCheck, Shield,
  Mail, Phone, Building2, MapPin, Calendar, Clock,
  LogIn, Activity, History
} from 'lucide-react';
import './ViewUser.css';

const MOCK_USER = {
  id: 'USR-26-102',
  firstName: 'Michael',
  lastName: 'Chang',
  role: 'College Admin',
  college: 'University of Texas Pharmacy',
  department: 'Administration',
  email: 'm.chang@utexas.edu',
  mobile: '+1 (555) 112-9904',
  gender: 'Male',
  status: 'Active',
  createdDate: '2024-03-15 09:00 AM',
  lastLogin: '2026-07-26 04:15 PM',
  address: 'Austin, TX, USA'
};

const ViewUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  
  const userId = id || MOCK_USER.id;

  return (
    <AdminLayout>
      <div className="view-user-container">
        
        <div style={{ marginBottom: '24px' }}>
          <button className="icon-btn-small" onClick={() => navigate('/super-admin/users/list')}>
            <ArrowLeft size={20} />
          </button>
        </div>

        <div className="profile-header-card">
          <div className="profile-info-group">
            <div className="profile-avatar-large">
              {MOCK_USER.firstName.charAt(0)}{MOCK_USER.lastName.charAt(0)}
            </div>
            <div className="profile-details">
              <h2>{MOCK_USER.firstName} {MOCK_USER.lastName}</h2>
              <div className="profile-badges">
                <span className="role-badge college-admin"><Shield size={12} style={{display:'inline', marginRight:'4px'}}/>{MOCK_USER.role}</span>
                <span className="status-badge success"><UserCheck size={12}/> {MOCK_USER.status}</span>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontFamily: 'monospace' }}>{userId}</span>
              </div>
            </div>
          </div>
          <div className="profile-actions">
            <button className="btn btn-secondary" onClick={() => navigate(`/super-admin/users/edit/${userId}`)}>
              <Edit size={16}/> Edit User
            </button>
            <button className="btn btn-secondary">
              <Key size={16}/> Reset Password
            </button>
            <button className="btn btn-danger">
              <Ban size={16}/> Suspend
            </button>
          </div>
        </div>

        <div className="profile-tabs">
          <button className={`profile-tab ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => setActiveTab('profile')}>User Profile</button>
          <button className={`profile-tab ${activeTab === 'login' ? 'active' : ''}`} onClick={() => setActiveTab('login')}>Login History</button>
          <button className={`profile-tab ${activeTab === 'activity' ? 'active' : ''}`} onClick={() => setActiveTab('activity')}>Activity & Audit</button>
        </div>

        {activeTab === 'profile' && (
          <>
            <div className="content-card">
              <h3 style={{ margin: '0 0 20px 0', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>Professional Information</h3>
              <div className="detail-grid">
                <div className="detail-group">
                  <span className="detail-label">Assigned College / Tenant</span>
                  <span className="detail-value" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Building2 size={16} color="var(--primary-color)"/> {MOCK_USER.college}
                  </span>
                </div>
                <div className="detail-group">
                  <span className="detail-label">Department</span>
                  <span className="detail-value">{MOCK_USER.department}</span>
                </div>
                <div className="detail-group">
                  <span className="detail-label">System Role</span>
                  <span className="detail-value">{MOCK_USER.role}</span>
                </div>
                <div className="detail-group">
                  <span className="detail-label">Account Created</span>
                  <span className="detail-value" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Calendar size={16} color="var(--text-secondary)"/> {MOCK_USER.createdDate}
                  </span>
                </div>
              </div>
            </div>

            <div className="content-card">
              <h3 style={{ margin: '0 0 20px 0', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>Contact & Personal Information</h3>
              <div className="detail-grid">
                <div className="detail-group">
                  <span className="detail-label">Email Address</span>
                  <span className="detail-value" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Mail size={16} color="var(--text-secondary)"/> {MOCK_USER.email}
                  </span>
                </div>
                <div className="detail-group">
                  <span className="detail-label">Mobile Number</span>
                  <span className="detail-value" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Phone size={16} color="var(--text-secondary)"/> {MOCK_USER.mobile}
                  </span>
                </div>
                <div className="detail-group">
                  <span className="detail-label">Gender</span>
                  <span className="detail-value">{MOCK_USER.gender}</span>
                </div>
                <div className="detail-group">
                  <span className="detail-label">Location / Address</span>
                  <span className="detail-value" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <MapPin size={16} color="var(--text-secondary)"/> {MOCK_USER.address}
                  </span>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'login' && (
          <div className="content-card">
            <h3 style={{ margin: '0 0 20px 0', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Clock size={18} color="var(--primary-color)"/> Recent Login Sessions
            </h3>
            <div className="timeline-list">
              {[
                { time: 'Jul 26, 2026 - 04:15 PM', ip: '192.168.1.105', device: 'Chrome on Windows 11', status: 'Success' },
                { time: 'Jul 25, 2026 - 09:30 AM', ip: '192.168.1.105', device: 'Chrome on Windows 11', status: 'Success' },
                { time: 'Jul 22, 2026 - 11:45 PM', ip: '10.0.0.52', device: 'Safari on iPhone', status: 'Failed (Invalid Password)' },
                { time: 'Jul 20, 2026 - 08:00 AM', ip: '192.168.1.105', device: 'Chrome on Windows 11', status: 'Success' }
              ].map((log, i) => (
                <div className="timeline-item" key={i}>
                  <div className="timeline-icon"><LogIn size={18} /></div>
                  <div className="timeline-content">
                    <div className="timeline-title" style={{ color: log.status.includes('Failed') ? '#ef4444' : 'var(--text-color)' }}>
                      Login {log.status}
                    </div>
                    <div className="timeline-meta">{log.time} • IP: {log.ip} • {log.device}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'activity' && (
          <div className="content-card">
            <h3 style={{ margin: '0 0 20px 0', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <History size={18} color="var(--primary-color)"/> Platform Activity Audit
            </h3>
            <div className="timeline-list">
              {[
                { time: 'Jul 26, 2026 - 04:30 PM', action: 'Created new Preceptor account', target: 'Dr. John Doe (USR-26-105)', module: 'User Management' },
                { time: 'Jul 25, 2026 - 10:15 AM', action: 'Updated Academic Settings', target: 'Semester 2 Configuration', module: 'Platform Settings' },
                { time: 'Jul 20, 2026 - 08:15 AM', action: 'Exported Student Roster', target: 'CSV Report', module: 'Reports' },
              ].map((log, i) => (
                <div className="timeline-item" key={i}>
                  <div className="timeline-icon" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>
                    <Activity size={18} />
                  </div>
                  <div className="timeline-content">
                    <div className="timeline-title">{log.action}</div>
                    <div className="timeline-meta">Target: <span style={{color: 'var(--text-color)'}}>{log.target}</span> • Module: {log.module}</div>
                    <div className="timeline-meta" style={{ marginTop: '4px' }}><Clock size={12} style={{display:'inline'}}/> {log.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </AdminLayout>
  );
};

export default ViewUser;
