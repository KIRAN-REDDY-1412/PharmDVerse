import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { 
  ArrowLeft, Search, Filter, Plus, MoreVertical, 
  X, CheckCircle, AlertTriangle, Key, Mail
} from 'lucide-react';
import './ManageCollegeAdmins.css';

const MOCK_ADMINS = [
  {
    id: 'EMP-001',
    name: 'Dr. Sarah Jenkins',
    designation: 'IT Director',
    email: 's.jenkins@utexas.edu',
    mobile: '+1 (512) 555-0201',
    status: 'active',
    isPrimary: true,
    lastLogin: '2026-07-27 10:15 AM'
  },
  {
    id: 'EMP-045',
    name: 'James Wilson',
    designation: 'System Administrator',
    email: 'j.wilson@utexas.edu',
    mobile: '+1 (512) 555-0888',
    status: 'active',
    isPrimary: false,
    lastLogin: '2026-07-26 04:30 PM'
  },
  {
    id: 'EMP-082',
    name: 'Emily Davis',
    designation: 'Clinical Coordinator',
    email: 'e.davis@utexas.edu',
    mobile: '+1 (512) 555-0992',
    status: 'inactive',
    isPrimary: false,
    lastLogin: '2026-06-15 09:00 AM'
  }
];

const ManageCollegeAdmins = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [admins, setAdmins] = useState(MOCK_ADMINS);
  const [showAddModal, setShowAddModal] = useState(false);
  const [actionMenuOpen, setActionMenuOpen] = useState(null);

  const handleDelete = (admin) => {
    if (admin.isPrimary) {
      alert('Cannot delete the Primary Administrator. Reassign the primary role first.');
      return;
    }
    if(window.confirm(`Are you sure you want to deactivate ${admin.name}?`)) {
      alert(`${admin.name} has been deactivated. Audit log generated.`);
    }
    setActionMenuOpen(null);
  };

  const handleResetPassword = (admin) => {
    if(window.confirm(`Send password reset email to ${admin.email}?`)) {
      alert(`Password reset link sent to ${admin.email}`);
    }
    setActionMenuOpen(null);
  };

  return (
    <AdminLayout>
      <div className="manage-admins-container">
        
        <div className="admins-header">
          <div className="admins-title-area">
            <button className="icon-btn-small" onClick={() => navigate(`/super-admin/colleges/view/${id}`)}>
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="page-title">Manage College Administrators</h1>
              <p className="page-subtitle">University of Texas Pharmacy ({id})</p>
            </div>
          </div>
          <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
            <Plus size={18} /> Add Administrator
          </button>
        </div>

        <div className="toolbar">
          <div className="search-box">
            <Search size={18} color="var(--text-secondary)" />
            <input type="text" placeholder="Search administrators..." />
          </div>
          <div className="filters">
            <button className="filter-btn"><Filter size={18} /> Status: All</button>
            <button className="filter-btn"><Filter size={18} /> Role: All</button>
          </div>
        </div>

        <div className="data-grid-container">
          <table className="enterprise-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th>Administrator</th>
                <th>Contact</th>
                <th>Role</th>
                <th>Status</th>
                <th>Last Login</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin) => (
                <tr key={admin.id}>
                  <td>
                    <div className="admin-cell-info">
                      <div className="admin-avatar">{admin.name.charAt(0)}</div>
                      <div>
                        <div className="admin-name">{admin.name}</div>
                        <div className="admin-email">{admin.designation} • {admin.id}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="admin-email">{admin.email}</div>
                    <div className="admin-email">{admin.mobile}</div>
                  </td>
                  <td>
                    {admin.isPrimary ? (
                      <span className="role-badge primary">Primary Admin</span>
                    ) : (
                      <span className="role-badge">Sub-Admin</span>
                    )}
                  </td>
                  <td>
                    {admin.status === 'active' ? (
                      <span className="status-badge active"><CheckCircle size={14}/> Active</span>
                    ) : (
                      <span className="status-badge danger"><AlertTriangle size={14}/> Inactive</span>
                    )}
                  </td>
                  <td style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                    {admin.lastLogin}
                  </td>
                  <td style={{ position: 'relative' }}>
                    <button className="icon-btn-small" onClick={() => setActionMenuOpen(actionMenuOpen === admin.id ? null : admin.id)}>
                      <MoreVertical size={18} />
                    </button>
                    
                    {/* Inline Action Dropdown (Mocked) */}
                    {actionMenuOpen === admin.id && (
                      <div style={{ position: 'absolute', right: '30px', top: '10px', backgroundColor: 'var(--surface-color)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '8px', zIndex: 10, boxShadow: '0 4px 6px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', gap: '4px', minWidth: '200px' }}>
                        <button className="btn btn-secondary w-full" style={{ justifyContent: 'flex-start' }}><Search size={14}/> View Activity</button>
                        <button className="btn btn-secondary w-full" style={{ justifyContent: 'flex-start' }} onClick={() => handleResetPassword(admin)}><Key size={14}/> Reset Password</button>
                        <button className="btn btn-secondary w-full" style={{ justifyContent: 'flex-start' }}><Mail size={14}/> Resend Welcome Email</button>
                        {!admin.isPrimary && (
                          <button className="btn btn-secondary w-full" style={{ justifyContent: 'flex-start' }}><CheckCircle size={14}/> Make Primary</button>
                        )}
                        <button className="btn btn-danger w-full" style={{ justifyContent: 'flex-start', marginTop: '8px' }} onClick={() => handleDelete(admin)}>
                          {admin.status === 'active' ? 'Deactivate Account' : 'Activate Account'}
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      {showAddModal && (
        <>
          <div className="modal-backdrop" onClick={() => setShowAddModal(false)}></div>
          <div className="modal" style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1000 }}>
            <div className="modal-header">
              <h2 className="modal-title">Add Administrator</h2>
              <button className="icon-btn-small" onClick={() => setShowAddModal(false)}><X size={20}/></button>
            </div>
            <div className="form-group" style={{ marginBottom: '16px' }}>
              <label className="form-label required">Employee ID</label>
              <input type="text" className="form-input" />
            </div>
            <div className="form-group" style={{ marginBottom: '16px' }}>
              <label className="form-label required">Full Name</label>
              <input type="text" className="form-input" />
            </div>
            <div className="form-group" style={{ marginBottom: '16px' }}>
              <label className="form-label required">Email</label>
              <input type="email" className="form-input" />
            </div>
            <div className="form-group" style={{ marginBottom: '24px' }}>
              <label className="form-label">Designation</label>
              <input type="text" className="form-input" />
            </div>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button className="btn btn-secondary" onClick={() => setShowAddModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={() => { alert('Administrator added!'); setShowAddModal(false); }}>Add Admin</button>
            </div>
          </div>
        </>
      )}

    </AdminLayout>
  );
};

export default ManageCollegeAdmins;
