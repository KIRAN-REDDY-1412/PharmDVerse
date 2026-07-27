import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, Filter, Eye, BadgeCheck, Trash2, ChevronDown, ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight
} from 'lucide-react';
import StudentLayout from '../../components/student/StudentLayout';
import ViewRecordModal from '../../components/college/shared/ViewRecordModal';
import ConfirmDeleteModal from '../../components/college/shared/ConfirmDeleteModal';
import { useDatabase } from '../../context/DatabaseContext';
import { useAuth } from '../../context/AuthContext';

const StudentInbox = () => {
  const { getUserNotifications, markNotificationRead } = useDatabase();
  const { currentUser } = useAuth();
  
  // Use state only for the view/delete modal logic. The actual list comes from context.
  const notifications = currentUser ? getUserNotifications(currentUser.id) : [];
  
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const handleView = (row) => {
    setSelectedRecord([
      { label: 'Date & Time', value: new Date(row.date).toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) },
      { label: 'Sender', value: `${row.sender} (${row.role})` },
      { label: 'Category', value: row.category },
      { label: 'Subject', value: row.title },
      { label: 'Status', value: row.status, type: 'status' }
    ]);
    setIsViewModalOpen(true);
    
    // Auto mark as read on view
    if (row.status === 'Unread') {
      handleMarkAsRead(row.id);
    }
  };

  const handleMarkAsRead = (id) => {
    markNotificationRead(id);
  };

  const handleDeleteClick = (row) => {
    // Need a compatible object for the delete modal, reusing the raw row or transforming to display array if needed
    setSelectedRecord(row);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedRecord) {
      // In a real DB we would dispatch a delete action to context.
      // For now, we just close the modal.
      setIsDeleteModalOpen(false);
      setSelectedRecord(null);
    }
  };

  const getStatusPill = (status) => {
    if (status === 'Unread') return <span className="status-pill status-pending">Unread</span>;
    return <span className="status-pill status-active">Read</span>;
  };

  return (
    <StudentLayout>
      <div className="list-page-container animate-fade-in">
        
        {/* Header */}
        <div className="list-page-header">
          <div className="header-left">
            <h1 className="page-title">Inbox</h1>
            <div className="breadcrumbs">
              <Link to="/student/dashboard" className="breadcrumb-link">Dashboard</Link>
              <span className="breadcrumb-separator">&gt;</span>
              <Link to="/student/notifications" className="breadcrumb-link">Notifications</Link>
              <span className="breadcrumb-separator">&gt;</span>
              <span>Inbox</span>
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="list-toolbar">
          <div className="toolbar-left" style={{ flexWrap: 'wrap' }}>
            <div className="search-box">
              <Search size={18} className="search-icon" />
              <input type="text" placeholder="Search notifications..." />
            </div>
            
            <div className="filter-group">
              <span className="filter-label">Sender</span>
              <div className="select-wrapper">
                <select>
                  <option>All</option>
                  <option>Preceptor</option>
                  <option>College Admin</option>
                  <option>Principal</option>
                  <option>HOD</option>
                  <option>System</option>
                </select>
                <ChevronDown size={14} className="select-arrow" />
              </div>
            </div>

            <div className="filter-group">
              <span className="filter-label">Category</span>
              <div className="select-wrapper">
                <select>
                  <option>All Categories</option>
                  <option>Clinical Cases</option>
                  <option>Returned Case</option>
                  <option>Academic</option>
                  <option>Examination</option>
                  <option>College Circular</option>
                  <option>Reminder</option>
                  <option>System Alert</option>
                  <option>General</option>
                </select>
                <ChevronDown size={14} className="select-arrow" />
              </div>
            </div>

            <div className="filter-group">
              <span className="filter-label">Status</span>
              <div className="select-wrapper">
                <select>
                  <option>All</option>
                  <option>Unread</option>
                  <option>Read</option>
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
                <th>Sender</th>
                <th>Subject</th>
                <th>Category</th>
                <th>Status</th>
                <th style={{ textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {notifications.map((row) => (
                <tr key={row.id} style={{ fontWeight: row.status === 'Unread' ? '600' : 'normal', backgroundColor: row.status === 'Unread' ? 'rgba(0, 86, 179, 0.02)' : 'transparent' }}>
                  <td>{new Date(row.date).toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</td>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontWeight: 500, color: 'var(--text-main)' }}>{row.sender}</span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{row.role}</span>
                    </div>
                  </td>
                  <td>{row.title}</td>
                  <td>{row.category}</td>
                  <td>{getStatusPill(row.status)}</td>
                  <td>
                    <div className="action-buttons" style={{ justifyContent: 'center' }}>
                      <button className="action-btn" title="View Notification" onClick={() => handleView(row)}>
                        <Eye size={16} />
                      </button>
                      <button className="action-btn" title="Mark as Read" onClick={() => handleMarkAsRead(row.id)} disabled={row.status === 'Read'} style={{ opacity: row.status === 'Read' ? 0.4 : 1 }}>
                        <BadgeCheck size={16} />
                      </button>
                      <button className="action-btn delete" title="Delete Notification" onClick={() => handleDeleteClick(row)}>
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
            </div>
          </div>
        </div>

        {/* View Modal */}
        <ViewRecordModal 
          isOpen={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
          title="Notification Details"
          data={selectedRecord}
        />

        {/* Delete Modal */}
        <ConfirmDeleteModal 
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={confirmDelete}
          title="Delete Notification"
          message={`Are you sure you want to delete this notification from ${selectedRecord?.sender}?`}
          itemName={selectedRecord?.title}
        />
        
      </div>
    </StudentLayout>
  );
};

export default StudentInbox;
