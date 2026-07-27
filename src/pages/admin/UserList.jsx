import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { 
  Search, Filter, MoreVertical, Shield, Download,
  CheckCircle, AlertTriangle, XOctagon, User, Mail,
  Eye, Edit, Key, Lock, FileText, Activity
} from 'lucide-react';
import './UserManagement.css';
import './SubscriptionList.css'; // Reuse table CSS

const MOCK_USERS = [
  {
    id: 'USR-26-901',
    name: 'Dr. Sarah Jenkins',
    role: 'Super Admin',
    college: 'PharmDVerse Core',
    department: 'System Administration',
    email: 'sarah.j@pharmdverse.com',
    mobile: '+1 (555) 019-2831',
    status: 'Active',
    lastLogin: 'Today, 08:30 AM',
    created: '2024-01-10'
  },
  {
    id: 'USR-26-102',
    name: 'Michael Chang',
    role: 'College Admin',
    college: 'University of Texas Pharmacy',
    department: 'Administration',
    email: 'm.chang@utexas.edu',
    mobile: '+1 (555) 112-9904',
    status: 'Active',
    lastLogin: 'Yesterday, 04:15 PM',
    created: '2024-03-15'
  },
  {
    id: 'USR-26-833',
    name: 'Dr. Emily Roberts',
    role: 'Preceptor',
    college: 'Boston Healthcare College',
    department: 'Clinical Practice',
    email: 'e.roberts@bhc.edu',
    mobile: '+1 (555) 993-2211',
    status: 'Suspended',
    lastLogin: '2026-06-12 10:00 AM',
    created: '2025-08-20'
  },
  {
    id: 'USR-26-441',
    name: 'David Smith',
    role: 'Student',
    college: 'Midwest Pharmacy Academy',
    department: 'PharmD Year 4',
    email: 'd.smith@mpa.edu',
    mobile: '+1 (555) 441-8822',
    status: 'Locked',
    lastLogin: '2026-07-25 09:12 AM',
    created: '2025-09-01'
  }
];

const getRoleBadge = (role) => {
  const c = role === 'Super Admin' ? 'super-admin' : 
            role === 'College Admin' ? 'college-admin' : 
            role === 'Preceptor' ? 'preceptor' : 'student';
  return <span className={`role-badge ${c}`}>{role}</span>;
};

const getStatusDisplay = (status) => {
  if (status === 'Active') return <div className="status-indicator"><div className="status-dot active"></div>Active</div>;
  if (status === 'Suspended') return <div className="status-indicator"><div className="status-dot suspended"></div>Suspended</div>;
  if (status === 'Locked') return <div className="status-indicator"><div className="status-dot suspended" style={{backgroundColor: '#f59e0b'}}></div>Locked (Auth)</div>;
  return <div className="status-indicator"><div className="status-dot inactive"></div>{status}</div>;
};

const UserList = () => {
  const navigate = useNavigate();
  const [actionMenuOpen, setActionMenuOpen] = useState(null);

  return (
    <AdminLayout>
      <div className="user-mgmt-container">
        
        <div className="user-mgmt-header">
          <div>
            <h1 className="user-mgmt-title">User Directory</h1>
            <p className="user-mgmt-subtitle">Search, filter, and manage all cross-tenant users.</p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button className="btn btn-secondary"><Download size={18} /> Export List</button>
          </div>
        </div>

        <div className="toolbar" style={{ flexWrap: 'wrap' }}>
          <div className="search-box">
            <Search size={18} color="var(--text-secondary)" />
            <input type="text" placeholder="Search by name, ID, email, or mobile..." />
          </div>
          <div className="filters" style={{ flexWrap: 'wrap' }}>
            <select className="form-select" style={{ padding: '8px 12px', fontSize: '0.85rem' }} defaultValue="">
              <option value="" disabled>Role</option>
              <option value="sa">Super Admin</option>
              <option value="ca">College Admin</option>
              <option value="pr">Preceptor</option>
              <option value="st">Student</option>
            </select>
            <select className="form-select" style={{ padding: '8px 12px', fontSize: '0.85rem' }} defaultValue="">
              <option value="" disabled>Status</option>
              <option value="active">Active</option>
              <option value="suspended">Suspended</option>
              <option value="locked">Locked</option>
            </select>
            <select className="form-select" style={{ padding: '8px 12px', fontSize: '0.85rem' }} defaultValue="">
              <option value="" disabled>College</option>
              <option value="c1">University of Texas</option>
            </select>
            <button className="filter-btn"><Filter size={16}/> More Filters</button>
          </div>
        </div>

        <div className="data-grid-container" style={{ overflowX: 'auto' }}>
          <table className="enterprise-table" style={{ width: '100%', minWidth: '1400px' }}>
            <thead>
              <tr>
                <th>Profile & ID</th>
                <th>Role & College</th>
                <th>Contact Info</th>
                <th>Status & Last Login</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_USERS.map((user) => (
                <tr key={user.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div className="user-avatar-placeholder">{user.name.charAt(0)}</div>
                      <div>
                        <div style={{ fontWeight: 600 }}>{user.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontFamily: 'monospace' }}>{user.id}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div>{getRoleBadge(user.role)}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>{user.college}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{user.department}</div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}>
                      <Mail size={12} color="var(--text-secondary)"/> {user.email}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', marginTop: '4px' }}>
                      <User size={12} color="var(--text-secondary)"/> {user.mobile}
                    </div>
                  </td>
                  <td>
                    <div style={{ marginBottom: '4px' }}>{getStatusDisplay(user.status)}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Login: {user.lastLogin}</div>
                  </td>
                  <td style={{ fontSize: '0.85rem' }}>{user.created}</td>
                  <td style={{ position: 'relative' }}>
                    <button className="icon-btn-small" onClick={() => setActionMenuOpen(actionMenuOpen === user.id ? null : user.id)}>
                      <MoreVertical size={18} />
                    </button>
                    
                    {actionMenuOpen === user.id && (
                      <div style={{ position: 'absolute', right: '30px', top: '10px', backgroundColor: 'var(--surface-color)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '8px', zIndex: 10, boxShadow: '0 4px 12px rgba(0,0,0,0.15)', display: 'flex', flexDirection: 'column', gap: '4px', minWidth: '180px' }}>
                        <button className="btn btn-secondary w-full" style={{ justifyContent: 'flex-start', padding: '6px 12px' }} onClick={() => navigate(`/super-admin/users/view/${user.id}`)}><Eye size={14}/> View Profile</button>
                        <button className="btn btn-secondary w-full" style={{ justifyContent: 'flex-start', padding: '6px 12px' }} onClick={() => navigate(`/super-admin/users/edit/${user.id}`)}><Edit size={14}/> Edit Details</button>
                        <button className="btn btn-secondary w-full" style={{ justifyContent: 'flex-start', padding: '6px 12px' }}><Key size={14}/> Reset Password</button>
                        <button className="btn btn-secondary w-full" style={{ justifyContent: 'flex-start', padding: '6px 12px' }}><Activity size={14}/> Activity Log</button>
                        
                        <div style={{ height: '1px', backgroundColor: 'var(--border-color)', margin: '4px 0' }}></div>
                        
                        {user.status === 'Locked' && (
                          <button className="btn btn-secondary w-full" style={{ justifyContent: 'flex-start', padding: '6px 12px', color: '#3b82f6' }}><Lock size={14}/> Unlock Account</button>
                        )}
                        {user.status === 'Active' ? (
                          <button className="btn btn-danger w-full" style={{ justifyContent: 'flex-start', padding: '6px 12px' }}><XOctagon size={14}/> Suspend</button>
                        ) : (
                          <button className="btn btn-success w-full" style={{ justifyContent: 'flex-start', padding: '6px 12px', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}><CheckCircle size={14}/> Activate</button>
                        )}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default UserList;
