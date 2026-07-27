import React, { useState } from 'react';
import { Bell, CheckCircle2, Trash2, Mail, MailOpen, Info, CheckCircle, AlertTriangle, RefreshCw, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import StudentLayout from './StudentLayout';
import { useDatabase } from '../../context/DatabaseContext';
import { useAuth } from '../../context/AuthContext';
import './StudentNotifications.css';

const StudentNotifications = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { 
    notifications, 
    markNotificationRead, 
    markAllNotificationsRead, 
    deleteNotification, 
    deleteAllReadNotifications 
  } = useDatabase();

  const [activeFilter, setActiveFilter] = useState('All');

  const userNotifications = currentUser 
    ? notifications.filter(n => n.recipientId === currentUser.id).sort((a, b) => new Date(b.date) - new Date(a.date))
    : [];

  const filteredNotifications = userNotifications.filter(n => {
    if (activeFilter === 'Unread') return n.status === 'Unread';
    if (activeFilter === 'Read') return n.status === 'Read';
    if (activeFilter === 'System') return n.category === 'System';
    if (activeFilter === 'Clinical Cases') return n.category === 'Clinical Cases' || n.category === 'Returned Case';
    return true; // 'All'
  });

  const getIconForCategory = (category, title) => {
    if (category === 'Returned Case' || title?.includes('Returned')) return <AlertTriangle size={20} color="var(--color-red)" />;
    if (title?.includes('Approved')) return <CheckCircle size={20} color="var(--color-green)" />;
    if (category === 'System') return <Info size={20} color="var(--color-blue)" />;
    return <Bell size={20} color="var(--text-secondary)" />;
  };

  const handleNotificationClick = (notification) => {
    if (notification.status === 'Unread') {
      markNotificationRead(notification.id);
    }
    if (notification.actionLink) {
      navigate(notification.actionLink);
    }
  };

  return (
    <StudentLayout>
      <div className="notifications-page">
        <div className="notifications-header">
          <div>
            <h1 className="page-title">Notification Center</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
              Stay updated on your clinical cases, preceptor feedback, and system announcements.
            </p>
          </div>
          <div className="header-actions-group">
             <button className="btn-secondary" onClick={() => navigate(0)}><RefreshCw size={16} /> Refresh</button>
             <button className="btn-secondary" onClick={() => markAllNotificationsRead(currentUser.id)}><CheckCircle2 size={16} /> Mark All Read</button>
             <button className="btn-outline-danger" onClick={() => deleteAllReadNotifications(currentUser.id)}><Trash2 size={16} /> Clear Read</button>
          </div>
        </div>

        <div className="notifications-workspace">
          <div className="notifications-sidebar">
            <h3 className="sidebar-title">Filters</h3>
            <div className="filter-nav">
              {['All', 'Unread', 'Read', 'Clinical Cases', 'System'].map(filter => (
                <button 
                  key={filter} 
                  className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                  <span className="filter-badge">
                    {filter === 'All' && userNotifications.length}
                    {filter === 'Unread' && userNotifications.filter(n => n.status === 'Unread').length}
                    {filter === 'Read' && userNotifications.filter(n => n.status === 'Read').length}
                    {filter === 'Clinical Cases' && userNotifications.filter(n => n.category === 'Clinical Cases' || n.category === 'Returned Case').length}
                    {filter === 'System' && userNotifications.filter(n => n.category === 'System').length}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="notifications-list-container custom-scrollbar">
            {filteredNotifications.length === 0 ? (
              <div className="empty-state">
                <Bell size={48} color="var(--border-color)" style={{ marginBottom: '1rem' }} />
                <h3>No Notifications Found</h3>
                <p>You don't have any notifications matching this filter.</p>
              </div>
            ) : (
              <div className="notifications-list">
                {filteredNotifications.map(notification => {
                  const isUnread = notification.status === 'Unread';
                  return (
                    <div key={notification.id} className={`notification-card ${isUnread ? 'unread' : ''}`}>
                      <div className="notification-icon-wrapper">
                        {getIconForCategory(notification.category, notification.title)}
                      </div>
                      
                      <div className="notification-content">
                        <div className="notification-header-row">
                          <h4 className="notification-title">{notification.title}</h4>
                          <span className="notification-time">
                            {new Date(notification.date).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}
                          </span>
                        </div>
                        
                        <p className="notification-message">{notification.message}</p>
                        
                        <div className="notification-meta">
                           {notification.caseId && <span className="meta-badge case-badge">Case ID: {notification.caseId}</span>}
                           {notification.formKey && <span className="meta-badge form-badge">Form: {notification.formKey.replace(/([A-Z])/g, ' $1').trim()}</span>}
                           {notification.senderName && <span className="meta-badge sender-badge">From: {notification.senderName}</span>}
                        </div>
                        
                        <div className="notification-actions">
                           <button className="btn-primary-sm" onClick={() => handleNotificationClick(notification)}>
                             View Details
                           </button>
                           {isUnread && (
                             <button className="btn-icon-text" onClick={() => markNotificationRead(notification.id)}>
                               <MailOpen size={14} /> Mark Read
                             </button>
                           )}
                           <button className="btn-icon-text danger" onClick={() => deleteNotification(notification.id)}>
                             <XCircle size={14} /> Delete
                           </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </StudentLayout>
  );
};

export default StudentNotifications;
