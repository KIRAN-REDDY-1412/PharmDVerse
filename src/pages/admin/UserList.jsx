import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { useDatabase } from '../../context/DatabaseContext';
import { exportToExcel, exportToPDF, exportToCSV } from '../../utils/ExportEngine';
import { 
  Search, Filter, MoreVertical, Shield, Download,
  CheckCircle, AlertTriangle, XOctagon, User, Mail,
  Eye, Edit, Key, Lock, FileText, Activity, ChevronLeft, ChevronRight,
  ArrowUpDown
} from 'lucide-react';
import './UserManagement.css';
import './SubscriptionList.css';

const getRoleBadge = (role) => {
  const r = (role || '').toLowerCase();
  const c = r.includes('superadmin') || r.includes('super admin') ? 'super-admin' : 
            r.includes('admin') ? 'college-admin' : 
            r.includes('preceptor') ? 'preceptor' : 'student';
  return <span className={`role-badge ${c}`}>{role}</span>;
};

const getStatusDisplay = (status) => {
  if (status === 'Active') return <div className="status-indicator"><div className="status-dot active"></div>Active</div>;
  if (status === 'Suspended' || status === 'Inactive') return <div className="status-indicator"><div className="status-dot suspended"></div>{status}</div>;
  if (status === 'Locked') return <div className="status-indicator"><div className="status-dot suspended" style={{backgroundColor: '#f59e0b'}}></div>Locked</div>;
  return <div className="status-indicator"><div className="status-dot active"></div>{status || 'Active'}</div>;
};

const UserList = () => {
  const navigate = useNavigate();
  const { users, colleges, updateUser, deleteUser, resetUserPassword } = useDatabase();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [collegeFilter, setCollegeFilter] = useState('');
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [actionMenuOpen, setActionMenuOpen] = useState(null);

  // Combine db users with sample presentation users
  const allUsersList = users || [];

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredUsers = allUsersList.filter(user => {
    const matchesSearch = (
      (user.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.id || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.email || '').toLowerCase().includes(searchTerm.toLowerCase())
    );
    const matchesRole = !roleFilter || (user.role || '').toLowerCase().includes(roleFilter.toLowerCase());
    const matchesStatus = !statusFilter || (user.status || '').toLowerCase() === statusFilter.toLowerCase();
    const matchesCollege = !collegeFilter || (user.collegeId === collegeFilter || (user.college || '').toLowerCase().includes(collegeFilter.toLowerCase()));

    return matchesSearch && matchesRole && matchesStatus && matchesCollege;
  });

  // Sort
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    let valA = a[sortField] || '';
    let valB = b[sortField] || '';
    if (typeof valA === 'string') valA = valA.toLowerCase();
    if (typeof valB === 'string') valB = valB.toLowerCase();

    if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
    if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  // Pagination Calculations
  const totalPages = Math.ceil(sortedUsers.length / pageSize) || 1;
  const paginatedUsers = sortedUsers.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleExport = (format) => {
    const cols = [
      { label: 'User ID', key: 'id' },
      { label: 'Name', key: 'name' },
      { label: 'Role', key: 'role' },
      { label: 'Email', key: 'email' },
      { label: 'Mobile', key: 'phone' },
      { label: 'College ID', key: 'collegeId' },
      { label: 'Status', key: 'status' }
    ];

    const exportData = sortedUsers.map(u => ({ ...u, phone: u.phone || u.mobile || '-' }));

    if (format === 'excel') {
      exportToExcel({ title: 'User Directory Export', collegeName: 'PharmDVerse ERP Platform', logoText: 'PDV', generatedBy: 'Super Admin', academicYear: '2026-2027', columns: cols, data: exportData, filename: 'User_Directory' });
    } else if (format === 'pdf') {
      exportToPDF({ title: 'User Directory Export', collegeName: 'PharmDVerse ERP Platform', logoText: 'PDV', generatedBy: 'Super Admin', academicYear: '2026-2027', columns: cols, data: exportData, filename: 'User_Directory' });
    } else {
      exportToCSV({ title: 'User Directory Export', collegeName: 'PharmDVerse ERP Platform', logoText: 'PDV', generatedBy: 'Super Admin', academicYear: '2026-2027', columns: cols, data: exportData, filename: 'User_Directory' });
    }
  };

  const handleToggleUserStatus = (userId, currentStatus) => {
    const newStatus = currentStatus === 'Active' ? 'Suspended' : 'Active';
    updateUser(userId, { status: newStatus });
    setActionMenuOpen(null);
  };

  const handleResetPassword = (userId) => {
    const newPass = resetUserPassword(userId);
    alert(`Password reset successfully for ${userId}. New password: ${newPass || 'Password@123'}`);
    setActionMenuOpen(null);
  };

  return (
    <AdminLayout>
      <div className="user-mgmt-container">
        
        <div className="user-mgmt-header">
          <div>
            <h1 className="user-mgmt-title">User Directory</h1>
            <p className="user-mgmt-subtitle">Search, filter, and manage all cross-tenant users with enterprise RBAC.</p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="btn btn-secondary" onClick={() => handleExport('excel')}><Download size={16} /> Excel</button>
            <button className="btn btn-secondary" onClick={() => handleExport('pdf')}><FileText size={16} /> PDF</button>
            <button className="btn btn-secondary" onClick={() => handleExport('csv')}><Download size={16} /> CSV</button>
          </div>
        </div>

        {/* Toolbar */}
        <div className="toolbar" style={{ flexWrap: 'wrap', gap: '12px' }}>
          <div className="search-box">
            <Search size={18} color="var(--text-secondary)" />
            <input 
              type="text" 
              placeholder="Search by name, ID, email, or phone..." 
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            />
          </div>

          <div className="filters" style={{ flexWrap: 'wrap', gap: '8px' }}>
            <select 
              className="form-select" 
              style={{ padding: '8px 12px', fontSize: '0.85rem' }} 
              value={roleFilter}
              onChange={(e) => { setRoleFilter(e.target.value); setCurrentPage(1); }}
            >
              <option value="">All Roles</option>
              <option value="superadmin">Super Admin</option>
              <option value="admin">College Admin</option>
              <option value="preceptor">Preceptor</option>
              <option value="student">Student</option>
            </select>

            <select 
              className="form-select" 
              style={{ padding: '8px 12px', fontSize: '0.85rem' }} 
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
            >
              <option value="">All Statuses</option>
              <option value="active">Active</option>
              <option value="suspended">Suspended</option>
              <option value="inactive">Inactive</option>
            </select>

            <select 
              className="form-select" 
              style={{ padding: '8px 12px', fontSize: '0.85rem' }} 
              value={collegeFilter}
              onChange={(e) => { setCollegeFilter(e.target.value); setCurrentPage(1); }}
            >
              <option value="">All Institutions</option>
              {(colleges || []).map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>

            {(searchTerm || roleFilter || statusFilter || collegeFilter) && (
              <button 
                className="btn btn-secondary" 
                onClick={() => { setSearchTerm(''); setRoleFilter(''); setStatusFilter(''); setCollegeFilter(''); setCurrentPage(1); }}
                style={{ fontSize: '0.8rem', padding: '6px 12px' }}
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Data Table */}
        <div className="data-grid-container" style={{ overflowX: 'auto' }}>
          <table className="enterprise-table" style={{ width: '100%', minWidth: '1100px' }}>
            <thead>
              <tr>
                <th onClick={() => handleSort('name')} style={{ cursor: 'pointer' }}>
                  User Details <ArrowUpDown size={12} />
                </th>
                <th onClick={() => handleSort('role')} style={{ cursor: 'pointer' }}>
                  Role & College <ArrowUpDown size={12} />
                </th>
                <th>Contact Info</th>
                <th onClick={() => handleSort('status')} style={{ cursor: 'pointer' }}>
                  Status <ArrowUpDown size={12} />
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
                    <User size={40} style={{ opacity: 0.4, marginBottom: '0.5rem' }} />
                    <div style={{ fontWeight: 600, fontSize: '1rem' }}>No Users Found</div>
                    <div style={{ fontSize: '0.85rem', marginTop: '4px' }}>Try adjusting your search criteria or filters.</div>
                  </td>
                </tr>
              ) : (
                paginatedUsers.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div className="user-avatar-placeholder">{(user.name || 'U').charAt(0)}</div>
                        <div>
                          <div style={{ fontWeight: 600 }}>{user.name}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontFamily: 'monospace' }}>{user.id}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div>{getRoleBadge(user.role)}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                        {user.collegeId ? (colleges.find(c => c.id === user.collegeId)?.name || user.collegeId) : (user.college || 'PharmDVerse Core')}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{user.department || user.course || ''}</div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}>
                        <Mail size={12} color="var(--text-secondary)"/> {user.email || 'N/A'}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', marginTop: '4px' }}>
                        <User size={12} color="var(--text-secondary)"/> {user.phone || user.mobile || 'N/A'}
                      </div>
                    </td>
                    <td>
                      <div style={{ marginBottom: '4px' }}>{getStatusDisplay(user.status || 'Active')}</div>
                    </td>
                    <td style={{ position: 'relative' }}>
                      <button className="icon-btn-small" onClick={() => setActionMenuOpen(actionMenuOpen === user.id ? null : user.id)}>
                        <MoreVertical size={18} />
                      </button>
                      
                      {actionMenuOpen === user.id && (
                        <div style={{ position: 'absolute', right: '30px', top: '10px', backgroundColor: 'var(--surface-color)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '8px', zIndex: 100, boxShadow: '0 4px 12px rgba(0,0,0,0.15)', display: 'flex', flexDirection: 'column', gap: '4px', minWidth: '180px' }}>
                          <button className="btn btn-secondary w-full" style={{ justifyContent: 'flex-start', padding: '6px 12px' }} onClick={() => navigate(`/super-admin/users/view/${user.id}`)}><Eye size={14}/> View Profile</button>
                          <button className="btn btn-secondary w-full" style={{ justifyContent: 'flex-start', padding: '6px 12px' }} onClick={() => navigate(`/super-admin/users/edit/${user.id}`)}><Edit size={14}/> Edit Details</button>
                          <button className="btn btn-secondary w-full" style={{ justifyContent: 'flex-start', padding: '6px 12px' }} onClick={() => handleResetPassword(user.id)}><Key size={14}/> Reset Password</button>
                          
                          <div style={{ height: '1px', backgroundColor: 'var(--border-color)', margin: '4px 0' }}></div>
                          
                          <button 
                            className="btn btn-secondary w-full" 
                            style={{ justifyContent: 'flex-start', padding: '6px 12px', color: user.status === 'Active' ? '#ef4444' : '#10b981' }}
                            onClick={() => handleToggleUserStatus(user.id, user.status || 'Active')}
                          >
                            {user.status === 'Active' ? <><XOctagon size={14}/> Suspend</> : <><CheckCircle size={14}/> Activate</>}
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', padding: '12px 16px', backgroundColor: 'var(--surface-color)', borderRadius: '8px', border: '1px solid var(--border-color)', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Showing {filteredUsers.length > 0 ? (currentPage - 1) * pageSize + 1 : 0} to {Math.min(currentPage * pageSize, filteredUsers.length)} of {filteredUsers.length} Users
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <select className="form-select" style={{ padding: '4px 8px', fontSize: '0.85rem' }} value={pageSize} onChange={(e) => { setPageSize(Number(e.target.value)); setCurrentPage(1); }}>
              <option value={5}>5 per page</option>
              <option value={10}>10 per page</option>
              <option value={20}>20 per page</option>
              <option value={50}>50 per page</option>
            </select>

            <div style={{ display: 'flex', gap: '4px' }}>
              <button className="btn btn-secondary" disabled={currentPage === 1} onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} style={{ padding: '4px 10px' }}>
                <ChevronLeft size={16} />
              </button>
              <span style={{ padding: '6px 12px', fontSize: '0.85rem', fontWeight: 600 }}>Page {currentPage} of {totalPages}</span>
              <button className="btn btn-secondary" disabled={currentPage >= totalPages} onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} style={{ padding: '4px 10px' }}>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

      </div>
    </AdminLayout>
  );
};

export default UserList;
