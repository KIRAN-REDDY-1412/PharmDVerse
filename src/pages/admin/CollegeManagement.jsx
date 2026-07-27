import React, { useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useNavigate } from 'react-router-dom';
import { useDatabase } from '../../context/DatabaseContext';
import { 
  Building2, Search, Filter, Plus, MoreVertical, 
  CheckCircle, AlertTriangle, Clock, Users, Database, 
  Download, FileText, Check, X, HelpCircle, ArrowRight
} from 'lucide-react';
import './CollegeManagement.css';

const CollegeManagement = () => {
  const navigate = useNavigate();
  const { colleges, registrationRequests, reviewRegistrationRequest } = useDatabase();
  const [activeTab, setActiveTab] = useState('registered'); // 'registered' | 'requests'
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReq, setSelectedReq] = useState(null);
  const [modalMode, setModalMode] = useState(null); // 'approve' | 'reject' | 'info'
  const [modalNotes, setModalNotes] = useState('');

  const filteredColleges = (colleges || []).filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (c.domain && c.domain.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredRequests = (registrationRequests || []).filter(r =>
    r.collegeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleActionClick = (req, mode) => {
    setSelectedReq(req);
    setModalMode(mode);
    setModalNotes('');
  };

  const handleModalSubmit = () => {
    if (!selectedReq || !modalMode) return;

    let actionStatus = 'Pending';
    if (modalMode === 'approve') actionStatus = 'Approved';
    if (modalMode === 'reject') actionStatus = 'Rejected';
    if (modalMode === 'info') actionStatus = 'Info Requested';

    const approvedCollege = reviewRegistrationRequest(selectedReq.id, actionStatus, modalNotes);

    setModalMode(null);
    setSelectedReq(null);

    if (modalMode === 'approve' && approvedCollege) {
      // Proceed immediately to Subscription Assignment
      navigate(`/super-admin/subscriptions/assign?collegeId=${approvedCollege.id}`);
    }
  };

  const getStatusBadge = (status) => {
    switch(status?.toLowerCase()) {
      case 'active':
        return <span className="status-badge success"><CheckCircle size={14} /> Active</span>;
      case 'expired':
      case 'suspended':
        return <span className="status-badge danger"><AlertTriangle size={14} /> {status}</span>;
      case 'pending_subscription':
        return <span className="status-badge warning"><Clock size={14} /> Pending Subscription</span>;
      default:
        return <span className="status-badge neutral">{status || 'Registered'}</span>;
    }
  };

  return (
    <AdminLayout>
      <div className="college-management-container">
        
        {/* Header */}
        <div className="command-header">
          <div>
            <h1 className="page-title">College Management</h1>
            <p className="page-subtitle">Manage registered pharmacy colleges, registration requests, and institutional provisioning.</p>
          </div>
          <div className="header-actions">
            <button className="btn btn-secondary"><Download size={18} /> Export List</button>
            <button className="btn btn-primary" onClick={() => navigate('/super-admin/colleges/add')}>
              <Plus size={18} /> Register New College (Method B)
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div style={{ display: 'flex', gap: '12px', borderBottom: '1px solid var(--border-color)', marginBottom: '20px' }}>
          <button 
            onClick={() => setActiveTab('registered')}
            style={{
              padding: '12px 20px',
              fontWeight: 600,
              border: 'none',
              borderBottom: activeTab === 'registered' ? '3px solid var(--primary-color)' : '3px solid transparent',
              background: 'none',
              color: activeTab === 'registered' ? 'var(--primary-color)' : 'var(--text-secondary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <Building2 size={18} />
            Registered Colleges ({colleges?.length || 0})
          </button>

          <button 
            onClick={() => setActiveTab('requests')}
            style={{
              padding: '12px 20px',
              fontWeight: 600,
              border: 'none',
              borderBottom: activeTab === 'requests' ? '3px solid var(--primary-color)' : '3px solid transparent',
              background: 'none',
              color: activeTab === 'requests' ? 'var(--primary-color)' : 'var(--text-secondary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <FileText size={18} />
            Registration Requests ({registrationRequests?.filter(r => r.status === 'Pending').length || 0} Pending)
          </button>
        </div>

        {/* Toolbar */}
        <div className="toolbar">
          <div className="search-box">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder={activeTab === 'registered' ? "Search by college name, ID, or domain..." : "Search requests by college name, contact, or email..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* TAB 1: Registered Colleges */}
        {activeTab === 'registered' && (
          <div className="data-grid-container">
            <table className="enterprise-table">
              <thead>
                <tr>
                  <th>College Details</th>
                  <th>Status</th>
                  <th>Subscription</th>
                  <th>Users</th>
                  <th>Storage</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredColleges.map((college) => (
                  <tr key={college.id} onClick={() => navigate(`/super-admin/colleges/view/${college.id}`)} className="clickable-row">
                    <td>
                      <div className="college-cell-info">
                        <div className="college-logo">{college.logo}</div>
                        <div>
                          <div className="college-name">{college.name}</div>
                          <div className="college-domain">URL: pharmdverse.com/{college.slug}</div>
                        </div>
                      </div>
                    </td>
                    <td>{getStatusBadge(college.status)}</td>
                    <td>
                      <div className="plan-name">{college.plan || 'N/A'}</div>
                      <div className="renewal-date">Expires: {college.expiryDate || 'Unassigned'}</div>
                    </td>
                    <td>
                      <div className="user-counts">
                        <span><Users size={14} /> {college.students || 0} Students</span>
                      </div>
                    </td>
                    <td>
                      <div className="storage-info">
                        <Database size={14} /> {college.storageUsed || '0 GB'} / {college.storageLimit || '100 GB'}
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button 
                          className="btn btn-secondary" 
                          style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                          onClick={(e) => { e.stopPropagation(); navigate(`/super-admin/subscriptions/assign?collegeId=${college.id}`); }}
                        >
                          Subscription
                        </button>
                        <button 
                          className="icon-btn-small" 
                          onClick={(e) => { e.stopPropagation(); navigate(`/super-admin/colleges/view/${college.id}`); }}
                        >
                          <MoreVertical size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 2: Registration Requests (Method A) */}
        {activeTab === 'requests' && (
          <div className="data-grid-container">
            <table className="enterprise-table">
              <thead>
                <tr>
                  <th>Request ID / College</th>
                  <th>Contact Details</th>
                  <th>Location</th>
                  <th>Requested Plan</th>
                  <th>Submitted Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.map((req) => (
                  <tr key={req.id}>
                    <td>
                      <div>
                        <div style={{ fontWeight: 600, color: 'var(--text-color)' }}>{req.collegeName}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{req.id}</div>
                      </div>
                    </td>
                    <td>
                      <div style={{ fontSize: '0.875rem', fontWeight: 500 }}>{req.contactPerson}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{req.email} • {req.phone}</div>
                    </td>
                    <td>{req.city}, {req.state}</td>
                    <td>
                      <span className="plan-name">{req.requestedPlan || 'Professional'}</span>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>~{req.estimatedStudents} students</div>
                    </td>
                    <td>{new Date(req.submittedDate).toLocaleDateString()}</td>
                    <td>
                      <span className={`status-badge ${req.status === 'Approved' ? 'success' : req.status === 'Rejected' ? 'danger' : 'warning'}`}>
                        {req.status}
                      </span>
                    </td>
                    <td>
                      {req.status === 'Pending' ? (
                        <div style={{ display: 'flex', gap: '6px' }}>
                          <button 
                            className="btn btn-primary" 
                            style={{ padding: '6px 10px', fontSize: '0.75rem', backgroundColor: '#16a34a' }}
                            onClick={() => handleActionClick(req, 'approve')}
                            title="Approve & Assign Subscription"
                          >
                            <Check size={14} /> Approve
                          </button>
                          <button 
                            className="btn btn-secondary" 
                            style={{ padding: '6px 10px', fontSize: '0.75rem' }}
                            onClick={() => handleActionClick(req, 'info')}
                            title="Request Info"
                          >
                            <HelpCircle size={14} /> Info
                          </button>
                          <button 
                            className="btn btn-danger" 
                            style={{ padding: '6px 10px', fontSize: '0.75rem' }}
                            onClick={() => handleActionClick(req, 'reject')}
                            title="Reject Request"
                          >
                            <X size={14} /> Reject
                          </button>
                        </div>
                      ) : (
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                          {req.status === 'Approved' ? 'Approved -> Subscription' : req.status}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Modal for Approve / Reject / Request Info */}
        {modalMode && selectedReq && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ backgroundColor: 'var(--surface-color)', padding: '24px', borderRadius: '12px', maxWidth: '500px', width: '100%', border: '1px solid var(--border-color)' }}>
              <h3 style={{ margin: '0 0 16px 0', fontSize: '1.25rem', color: 'var(--text-color)' }}>
                {modalMode === 'approve' && 'Approve Registration Request'}
                {modalMode === 'reject' && 'Reject Registration Request'}
                {modalMode === 'info' && 'Request Additional Information'}
              </h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '16px', fontSize: '0.875rem' }}>
                Institution: <strong>{selectedReq.collegeName}</strong><br />
                Contact: {selectedReq.contactPerson} ({selectedReq.email})
              </p>

              {modalMode === 'approve' && (
                <div style={{ padding: '12px', backgroundColor: '#f0fdf4', borderRadius: '8px', color: '#166534', fontSize: '0.85rem', marginBottom: '16px' }}>
                  Approving will accept this college registration and navigate directly to Subscription Assignment.
                </div>
              )}

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '6px' }}>
                  {modalMode === 'approve' ? 'Approval Notes / Instructions' : modalMode === 'reject' ? 'Rejection Reason' : 'Specific Details Requested'}
                </label>
                <textarea 
                  rows={4}
                  style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-main)', color: 'var(--text-color)' }}
                  placeholder="Enter remarks for the college applicant..."
                  value={modalNotes}
                  onChange={(e) => setModalNotes(e.target.value)}
                />
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <button className="btn btn-secondary" onClick={() => setModalMode(null)}>Cancel</button>
                <button 
                  className={`btn ${modalMode === 'approve' ? 'btn-primary' : modalMode === 'reject' ? 'btn-danger' : 'btn-secondary'}`}
                  onClick={handleModalSubmit}
                >
                  {modalMode === 'approve' ? 'Approve & Proceed to Subscription' : modalMode === 'reject' ? 'Confirm Rejection' : 'Send Information Request'}
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </AdminLayout>
  );
};

export default CollegeManagement;
