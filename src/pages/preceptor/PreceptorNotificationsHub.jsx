import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, Send, ChevronRight, Inbox } from 'lucide-react';
import PreceptorLayout from '../../components/preceptor/PreceptorLayout';
import SendNotificationModal from '../../components/preceptor/SendNotificationModal';
import '../college/PreceptorManagement.css';

const PreceptorNotificationsHub = () => {
  const [isSendModalOpen, setIsSendModalOpen] = useState(false);

  return (
    <PreceptorLayout>
      <div className="preceptor-page">
        <div className="page-header">
          <div className="breadcrumbs">
            <Link to="/preceptor/dashboard">Dashboard</Link>
            <ChevronRight size={16} />
            <span>Notifications</span>
          </div>
          <h1>Notifications Hub</h1>
          <p className="page-subtitle">Manage your messages and notifications.</p>
        </div>

        <div className="preceptor-actions-grid">
          <Link to="/preceptor/notifications/inbox" className="action-card">
            <div className="action-icon-wrapper blue">
              <Inbox size={32} />
            </div>
            <div className="action-details">
              <span className="action-title">Inbox</span>
              <span className="action-subtitle">View your received messages and alerts.</span>
            </div>
          </Link>

          <div className="action-card" onClick={() => setIsSendModalOpen(true)} style={{ cursor: 'pointer' }}>
            <div className="action-icon-wrapper green">
              <Send size={32} />
            </div>
            <div className="action-details">
              <span className="action-title">Send Notification</span>
              <span className="action-subtitle">Send a message to your assigned students.</span>
            </div>
          </div>
        </div>

        <SendNotificationModal 
          isOpen={isSendModalOpen} 
          onClose={() => setIsSendModalOpen(false)} 
        />
      </div>
    </PreceptorLayout>
  );
};

export default PreceptorNotificationsHub;
