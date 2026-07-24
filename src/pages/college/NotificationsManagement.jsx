import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Inbox, Send } from 'lucide-react';
import CollegeAdminLayout from '../../components/college/CollegeAdminLayout';
import SendNotificationModal from '../../components/college/notifications/SendNotificationModal';
import '../college/PreceptorManagement.css'; 

const NotificationsManagement = () => {
  const [isSendModalOpen, setIsSendModalOpen] = useState(false);

  return (
    <CollegeAdminLayout>
      <div className="preceptor-page">
        
        <div className="page-header">
          <h1 className="page-title">Notifications</h1>
          <div className="breadcrumbs">
            <Link to="/college-admin/dashboard" className="breadcrumb-link">Dashboard</Link>
            <span className="breadcrumb-separator">&gt;</span>
            <span>Notifications</span>
          </div>
        </div>

        <div className="preceptor-actions-grid">
          
          <Link to="/college-admin/notifications/inbox" className="action-card">
            <div className="action-icon-wrapper blue">
              <Inbox size={32} />
            </div>
            <div className="action-details">
              <span className="action-title">Inbox</span>
              <span className="action-subtitle">View all received notifications</span>
            </div>
          </Link>

          <div className="action-card" onClick={() => setIsSendModalOpen(true)} style={{ cursor: 'pointer' }}>
            <div className="action-icon-wrapper green">
              <Send size={32} />
            </div>
            <div className="action-details">
              <span className="action-title">Send Notification</span>
              <span className="action-subtitle">Create and send announcements</span>
            </div>
          </div>

        </div>

      </div>

      <SendNotificationModal isOpen={isSendModalOpen} onClose={() => setIsSendModalOpen(false)} />

    </CollegeAdminLayout>
  );
};

export default NotificationsManagement;
