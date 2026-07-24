import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Inbox } from 'lucide-react';
import StudentLayout from '../../components/student/StudentLayout';
import '../college/PreceptorManagement.css';

const StudentNotificationsHub = () => {

  return (
    <StudentLayout>
      <div className="preceptor-page">
        <div className="page-header">
          <div className="breadcrumbs">
            <Link to="/student/dashboard">Dashboard</Link>
            <ChevronRight size={16} />
            <span>Notifications</span>
          </div>
          <h1>Notifications Hub</h1>
          <p className="page-subtitle">Manage your messages and notifications.</p>
        </div>

        <div className="preceptor-actions-grid">
          <Link to="/student/notifications/inbox" className="action-card">
            <div className="action-icon-wrapper blue">
              <Inbox size={32} />
            </div>
            <div className="action-details">
              <span className="action-title">Inbox</span>
              <span className="action-subtitle">View all notifications, messages, and workflow updates received from the integrated PharmDVerse system.</span>
            </div>
          </Link>
        </div>
      </div>
    </StudentLayout>
  );
};

export default StudentNotificationsHub;
