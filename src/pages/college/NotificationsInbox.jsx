import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, Filter, Eye, BadgeCheck, Trash2, ChevronDown, ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight
} from 'lucide-react';
import CollegeAdminLayout from '../../components/college/CollegeAdminLayout';
import ViewRecordModal from '../../components/college/shared/ViewRecordModal';
import ConfirmDeleteModal from '../../components/college/shared/ConfirmDeleteModal';
import './PreceptorList.css'; 

const MOCK_NOTIFICATIONS = [
  { id: 'NOTIF001', date: '2026-07-24T10:30:00', title: 'System Maintenance Scheduled', category: 'General Announcement', recipient: 'All Staff', status: 'Unread' },
  { id: 'NOTIF002', date: '2026-07-23T15:45:00', title: 'New Academic Calendar Released', category: 'Academic', recipient: 'All Students', status: 'Read' },
  { id: 'NOTIF003', date: '2026-07-22T09:15:00', title: 'Clinical Case Submission Deadline', category: 'Clinical Cases', recipient: 'Y25, Y26 Batch', status: 'Read' },
  { id: 'NOTIF004', date: '2026-07-20T14:00:00', title: 'Emergency Faculty Meeting', category: 'Meeting', recipient: 'All Preceptors', status: 'Unread' },
];

const NotificationsInbox = () => {
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const handleView = (row) => {
    setSelectedRecord(row);
    setIsViewModalOpen(true);
  };

  const handleMarkAsRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, status: 'Read' } : n));
  };

  const handleDeleteClick = (row) => {
    setSelectedRecord(row);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedRecord) {
      setNotifications(notifications.filter(n => n.id !== selectedRecord.id));
      setIsDeleteModalOpen(false);
      setSelectedRecord(null);
    }
  };

  const getStatusPill = (status) => {
    if (status === 'Unread') return <span className="status-pill status-pending">Unread</span>;
    return <span className="status-pill status-active">Read</span>;
  };

  return (
    <CollegeAdminLayout>
      <div className="list-page-container">
        
        {/* Header */}
        <div className="list-page-header">
          <div className="header-left">
            <h1 className="page-title">Inbox</h1>
            <div className="breadcrumbs">
              <Link to="/college-admin/dashboard" className="breadcrumb-link">Dashboard</Link>
              <span className="breadcrumb-separator">&gt;</span>
              <Link to="/college-admin/notifications" className="breadcrumb-link">Notifications</Link>
              <span className="breadcrumb-separator">&gt;</span>
              <span>Inbox</span>
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="list-toolbar">
          <div className="toolbar-left">
            <div className="search-box">
              <Search size={18} className="search-icon" />
              <input type="text" placeholder="Search notifications..." />
            </div>
            
            <div className="filter-group">
              <span className="filter-label">Filter</span>
              <div className="select-wrapper">
                <select>
                  <option>All</option>
                  <option>Unread</option>
                  <option>Read</option>
                </select>
                <ChevronDown size={14} className="select-arrow" />
              </div>
            </div>

            <div className="filter-group">
              <span className="filter-label">Date</span>
              <div className="select-wrapper">
                <select>
                  <option>All Time</option>
                  <option>Last 7 Days</option>
                  <option>Last 30 Days</option>
                </select>
                <ChevronDown size={14} className="select-arrow" />
              </div>
            </div>

            <button className="btn-filter">
              <Filter size={16} /> Filter
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Date & Time <span className="sort-icon">↕</span></th>
                <th>Notification Title</th>
                <th>Category</th>
                <th>Recipient</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {notifications.map((row) => (
                <tr key={row.id} style={{ fontWeight: row.status === 'Unread' ? '600' : 'normal' }}>
                  <td>{new Date(row.date).toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</td>
                  <td>{row.title}</td>
                  <td>{row.category}</td>
                  <td>{row.recipient}</td>
                  <td>{getStatusPill(row.status)}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="action-btn" title="View" onClick={() => handleView(row)}>
                        <Eye size={16} />
                      </button>
                      <button className="action-btn" title="Mark as Read" onClick={() => handleMarkAsRead(row.id)} disabled={row.status === 'Read'} style={{ opacity: row.status === 'Read' ? 0.4 : 1 }}>
                        <BadgeCheck size={16} />
                      </button>
                      <button className="action-btn delete" title="Delete" onClick={() => handleDeleteClick(row)}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="pagination-container">
            <div className="pagination-info">
              Showing 1 to {notifications.length} of {notifications.length} entries
            </div>
            <div className="pagination-controls">
              <div className="page-numbers">
                <button className="page-btn" disabled><ChevronsLeft size={16} /></button>
                <button className="page-btn" disabled><ChevronLeft size={16} /></button>
                <button className="page-btn active">1</button>
                <button className="page-btn" disabled><ChevronRight size={16} /></button>
                <button className="page-btn" disabled><ChevronsRight size={16} /></button>
              </div>
              <div className="rows-per-page">
                <div className="select-wrapper">
                  <select>
                    <option>10 / page</option>
                    <option>20 / page</option>
                    <option>50 / page</option>
                  </select>
                  <ChevronDown size={14} className="select-arrow" />
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <ViewRecordModal
        isOpen={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false);
          setSelectedRecord(null);
        }}
        title="Notification Details"
        fields={[
          { label: 'Date & Time', value: selectedRecord ? new Date(selectedRecord.date).toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '' },
          { label: 'Title', value: selectedRecord?.title, fullWidth: true },
          { label: 'Category', value: selectedRecord?.category },
          { label: 'Recipient', value: selectedRecord?.recipient },
          { label: 'Status', value: selectedRecord?.status, type: 'status', statusClass: selectedRecord?.status === 'Unread' ? 'status-pending' : 'status-active' },
        ]}
      />

      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedRecord(null);
        }}
        onConfirm={confirmDelete}
        title="Delete Notification"
        message={`Are you sure you want to delete the notification "${selectedRecord?.title}"? This action cannot be undone.`}
      />

    </CollegeAdminLayout>
  );
};

export default NotificationsInbox;
