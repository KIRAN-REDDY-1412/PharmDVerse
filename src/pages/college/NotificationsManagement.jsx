import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Inbox, Send, Bell, Megaphone, Users, Clock, 
  Search, Filter, ChevronDown, Trash2, Eye, 
  AlertTriangle, Info
} from 'lucide-react';
import CollegeAdminLayout from '../../components/college/CollegeAdminLayout';
import SendNotificationModal from '../../components/college/notifications/SendNotificationModal';
import '../college/PreceptorManagement.css'; 
import '../college/PreceptorList.css'; // Leverage standard grid CSS

const mockNotifications = [
  { id: 'NOT-1001', type: 'Announcement', target: 'All Students', subject: 'Diwali Holidays', date: '2026-10-25T10:00:00Z', status: 'Active', priority: 'Info', readCount: 142 },
  { id: 'NOT-1002', type: 'System', target: 'Preceptor: PR-2023', subject: 'New Case Submitted', date: '2026-10-24T14:30:00Z', status: 'Delivered', priority: 'Normal', readCount: 1 },
  { id: 'NOT-1003', type: 'Announcement', target: 'Batch 2024', subject: 'Thesis Submission Deadline', date: '2026-10-20T09:00:00Z', status: 'Active', priority: 'Urgent', readCount: 85 },
  { id: 'NOT-1004', type: 'Announcement', target: 'All Preceptors', subject: 'Quarterly Review Meeting', date: '2026-09-15T08:00:00Z', status: 'Expired', priority: 'Warning', readCount: 24 }
];

const NotificationsManagement = () => {
  const [isSendModalOpen, setIsSendModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('All');

  const filteredHistory = useMemo(() => {
    return mockNotifications.filter(n => {
      const matchSearch = !searchQuery || n.subject.toLowerCase().includes(searchQuery.toLowerCase()) || n.target.toLowerCase().includes(searchQuery.toLowerCase());
      const matchType = filterType === 'All' || n.type === filterType;
      return matchSearch && matchType;
    });
  }, [searchQuery, filterType]);

  return (
    <CollegeAdminLayout>
      <div className="list-page-container">
        
        {/* Header */}
        <div className="list-page-header">
          <div className="header-left">
            <h1 className="page-title">Notification Dispatcher</h1>
            <div className="breadcrumbs">
              <Link to="/college-admin/dashboard" className="breadcrumb-link">Dashboard</Link>
              <span className="breadcrumb-separator">&gt;</span>
              <span>Notifications</span>
            </div>
          </div>
          <div className="header-right">
            <button className="btn-primary" onClick={() => setIsSendModalOpen(true)}>
              <Send size={18} /> New Broadcast
            </button>
          </div>
        </div>

        {/* KPIs */}
        <div className="quick-stats-grid" style={{ marginTop: '1.5rem' }}>
          <div className="stat-card" style={{ borderColor: 'var(--color-primary)' }}>
            <div className="stat-icon total"><Megaphone size={24} /></div>
            <div className="stat-details">
              <span className="stat-value">12</span>
              <span className="stat-label">Active Announcements</span>
            </div>
          </div>
          <div className="stat-card" style={{ borderColor: 'var(--color-success)' }}>
            <div className="stat-icon active"><Bell size={24} /></div>
            <div className="stat-details">
              <span className="stat-value">1,402</span>
              <span className="stat-label">Total Broadcasts Sent</span>
            </div>
          </div>
          <div className="stat-card" style={{ borderColor: 'var(--color-warning)' }}>
            <div className="stat-icon warning"><Users size={24} /></div>
            <div className="stat-details">
              <span className="stat-value">86%</span>
              <span className="stat-label">Average Read Rate</span>
            </div>
          </div>
        </div>

        {/* Dispatch History Grid */}
        <div style={{ marginTop: '2.5rem' }}>
          <h2 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Dispatch Ledger</h2>
          
          <div className="list-toolbar" style={{ marginBottom: '1rem' }}>
            <div className="toolbar-left" style={{ flexWrap: 'wrap' }}>
              <div className="search-box">
                <Search size={18} className="search-icon" />
                <input 
                  type="text" 
                  placeholder="Search broadcasts..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="filter-group" style={{ margin: 0 }}>
                <div className="select-wrapper">
                  <select value={filterType} onChange={e => setFilterType(e.target.value)}>
                    <option value="All">All Types</option>
                    <option value="Announcement">Manual Announcements</option>
                    <option value="System">System Automated</option>
                  </select>
                  <ChevronDown size={14} className="select-arrow" />
                </div>
              </div>
            </div>
          </div>

          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Target Audience</th>
                  <th>Type</th>
                  <th>Subject</th>
                  <th>Dispatch Date</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredHistory.map((row) => (
                  <tr key={row.id}>
                    <td><span style={{ fontWeight: 600 }}>{row.target}</span></td>
                    <td>
                      <span className={`status-pill ${row.type === 'System' ? 'status-pending' : 'status-active'}`} style={{ backgroundColor: row.type === 'System' ? '#f3f4f6' : '#e0e7ff', color: row.type === 'System' ? '#4b5563' : '#3730a3' }}>
                        {row.type}
                      </span>
                    </td>
                    <td>{row.subject}</td>
                    <td>{new Date(row.date).toLocaleDateString()} {new Date(row.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: row.priority === 'Urgent' ? 'var(--color-danger)' : row.priority === 'Warning' ? 'var(--color-warning)' : 'var(--color-primary)' }}>
                        {row.priority === 'Urgent' && <AlertTriangle size={14} />}
                        {row.priority === 'Info' && <Info size={14} />}
                        <span style={{ fontSize: '0.85rem' }}>{row.priority}</span>
                      </div>
                    </td>
                    <td>
                      <span className={`status-pill ${row.status === 'Active' ? 'status-active' : row.status === 'Expired' ? 'status-returned' : 'status-pending'}`}>
                        {row.status}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button className="action-btn" title="View Analytics">
                          <Eye size={16} />
                        </button>
                        <button className="action-btn delete-btn" title="Revoke">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>

      </div>

      <SendNotificationModal isOpen={isSendModalOpen} onClose={() => setIsSendModalOpen(false)} />

    </CollegeAdminLayout>
  );
};

export default NotificationsManagement;
