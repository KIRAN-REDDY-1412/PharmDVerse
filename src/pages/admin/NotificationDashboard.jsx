import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { 
  Bell, Mail, MessageSquare, Megaphone, 
  Send, History, CheckCircle, AlertCircle, Clock
} from 'lucide-react';
import './NotificationsGlobal.css';

const NotificationDashboard = () => {
  const navigate = useNavigate();

  return (
    <AdminLayout>
      <div className="notify-container">
        
        <div className="notify-header">
          <div>
            <h1 className="notify-title">Communications Dashboard</h1>
            <p className="notify-subtitle">Manage global platform alerts, emails, and SMS distributions.</p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button className="btn btn-secondary" onClick={() => navigate('/super-admin/notifications/history')}>
              <History size={18} /> Delivery Ledger
            </button>
            <button className="btn btn-primary" onClick={() => navigate('/super-admin/notifications/create')}>
              <Send size={18} /> Compose Broadcast
            </button>
          </div>
        </div>

        <div className="notify-kpi-grid">
          <div className="notify-kpi-card">
             <span className="notify-kpi-title"><Send size={14} color="var(--primary-color)"/> Delivered (30d)</span>
             <span className="notify-kpi-value">124.5K</span>
          </div>
          <div className="notify-kpi-card">
             <span className="notify-kpi-title"><CheckCircle size={14} color="#10b981"/> Read Rate</span>
             <span className="notify-kpi-value">82%</span>
          </div>
          <div className="notify-kpi-card">
             <span className="notify-kpi-title"><Bell size={14} color="#f59e0b"/> Unread</span>
             <span className="notify-kpi-value">22.4K</span>
          </div>
          <div className="notify-kpi-card">
             <span className="notify-kpi-title"><Clock size={14} color="#3b82f6"/> Scheduled</span>
             <span className="notify-kpi-value">45</span>
          </div>
          <div className="notify-kpi-card">
             <span className="notify-kpi-title"><AlertCircle size={14} color="#ef4444"/> Failed</span>
             <span className="notify-kpi-value">1.2%</span>
          </div>
        </div>

        <div className="notify-layout-grid">
          <div className="notify-card">
            <h3 style={{ margin: '0 0 24px 0', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Clock size={18} color="var(--primary-color)"/> Recently Dispatched
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { title: 'System Maintenance Window', type: 'System', channel: 'Push + Email', date: 'Today, 08:00 AM', status: 'Delivered' },
                { title: 'New Clinical Guidelines 2026', type: 'Announcement', channel: 'Email', date: 'Yesterday, 02:00 PM', status: 'Delivered' },
                { title: 'Urgent: Subscription Overdue', type: 'Alert', channel: 'SMS + Push', date: 'Jul 24, 10:15 AM', status: 'Failed (3)' }
              ].map((msg, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '16px', borderBottom: '1px solid var(--border-color)' }}>
                  <div>
                    <div style={{ fontWeight: 600, marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {msg.title}
                      <span className={`notify-badge ${msg.type.toLowerCase()}`}>{msg.type}</span>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                      Channels: {msg.channel} • Sent: {msg.date}
                    </div>
                  </div>
                  <div style={{ color: msg.status.includes('Failed') ? '#ef4444' : '#10b981', fontSize: '0.85rem', fontWeight: 500 }}>
                    {msg.status}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="notify-card">
            <h3 style={{ margin: '0 0 24px 0', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
              Channel Health
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.85rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Mail size={14}/> SendGrid Email</span>
                  <span style={{ color: '#10b981' }}>Operational</span>
                </div>
                <div style={{ width: '100%', height: '6px', backgroundColor: 'var(--bg-color)', borderRadius: '3px' }}>
                  <div style={{ width: '100%', height: '100%', backgroundColor: '#10b981', borderRadius: '3px' }}></div>
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.85rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><MessageSquare size={14}/> Twilio SMS</span>
                  <span style={{ color: '#f59e0b' }}>Degraded (API Latency)</span>
                </div>
                <div style={{ width: '100%', height: '6px', backgroundColor: 'var(--bg-color)', borderRadius: '3px' }}>
                  <div style={{ width: '100%', height: '100%', backgroundColor: '#f59e0b', borderRadius: '3px' }}></div>
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.85rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Bell size={14}/> Firebase Push (FCM)</span>
                  <span style={{ color: '#10b981' }}>Operational</span>
                </div>
                <div style={{ width: '100%', height: '6px', backgroundColor: 'var(--bg-color)', borderRadius: '3px' }}>
                  <div style={{ width: '100%', height: '100%', backgroundColor: '#10b981', borderRadius: '3px' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </AdminLayout>
  );
};

export default NotificationDashboard;
