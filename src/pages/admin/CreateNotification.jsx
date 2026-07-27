import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { 
  ArrowLeft, Send, Mail, MessageSquare, Bell, 
  Calendar, Clock, Users, Building2
} from 'lucide-react';
import './NotificationsGlobal.css';

const CreateNotification = () => {
  const navigate = useNavigate();
  const [channels, setChannels] = useState({ push: true, email: false, sms: false });

  const toggleChannel = (ch) => setChannels(p => ({...p, [ch]: !p[ch]}));

  const handleSend = () => {
    alert('Notification queued for broadcast.');
    navigate('/super-admin/notifications/history');
  };

  return (
    <AdminLayout>
      <div className="notify-container" style={{ maxWidth: '900px' }}>
        
        <div className="notify-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button className="icon-btn-small" onClick={() => navigate('/super-admin/notifications')}>
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="notify-title">Compose Broadcast</h1>
              <p className="notify-subtitle">Create and dispatch alerts to the network.</p>
            </div>
          </div>
        </div>

        <div className="notify-card" style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '1.125rem', margin: '0 0 16px 0' }}>1. Select Channels</h2>
          <div className="notify-channel-group">
            <div className={`notify-channel-card ${channels.push ? 'selected' : ''}`} onClick={() => toggleChannel('push')}>
              <Bell size={24} />
              <span style={{ fontWeight: 500 }}>In-App Push</span>
            </div>
            <div className={`notify-channel-card ${channels.email ? 'selected' : ''}`} onClick={() => toggleChannel('email')}>
              <Mail size={24} />
              <span style={{ fontWeight: 500 }}>Email Blast</span>
            </div>
            <div className={`notify-channel-card ${channels.sms ? 'selected' : ''}`} onClick={() => toggleChannel('sms')}>
              <MessageSquare size={24} />
              <span style={{ fontWeight: 500 }}>SMS Text</span>
            </div>
          </div>

          <h2 style={{ fontSize: '1.125rem', margin: '0 0 16px 0', borderTop: '1px solid var(--border-color)', paddingTop: '24px' }}>2. Message Content</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ flex: 1 }}>
                <label className="form-label required">Message Title</label>
                <input type="text" className="form-input" placeholder="e.g., Scheduled Maintenance Downtime" />
              </div>
              <div style={{ width: '200px' }}>
                <label className="form-label required">Notification Type</label>
                <select className="form-select">
                  <option>System Alert</option>
                  <option>Announcement</option>
                  <option>Promotion / Marketing</option>
                </select>
              </div>
              <div style={{ width: '150px' }}>
                <label className="form-label required">Priority</label>
                <select className="form-select">
                  <option>Normal</option>
                  <option>High (Urgent)</option>
                </select>
              </div>
            </div>
            <div>
              <label className="form-label required">Message Body</label>
              <textarea className="form-textarea" rows={5} placeholder="Enter the content of your notification..."></textarea>
            </div>
          </div>

          <h2 style={{ fontSize: '1.125rem', margin: '0 0 16px 0', borderTop: '1px solid var(--border-color)', paddingTop: '24px' }}>3. Target Audience</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
             <div>
                <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Building2 size={14}/> Target Tenant</label>
                <select className="form-select">
                  <option>All Colleges (Global Broadcast)</option>
                  <option>University of Texas Pharmacy</option>
                  <option>Boston Healthcare College</option>
                </select>
             </div>
             <div>
                <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Users size={14}/> Target Roles</label>
                <select className="form-select">
                  <option>All Roles</option>
                  <option>College Admins Only</option>
                  <option>Preceptors Only</option>
                  <option>Students Only</option>
                </select>
             </div>
          </div>

          <h2 style={{ fontSize: '1.125rem', margin: '0 0 16px 0', borderTop: '1px solid var(--border-color)', paddingTop: '24px' }}>4. Scheduling</h2>
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input type="radio" name="schedule" defaultChecked /> Send Immediately
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input type="radio" name="schedule" /> Schedule for Later
            </label>
          </div>
          <div style={{ display: 'flex', gap: '16px', marginTop: '16px', opacity: 0.5, pointerEvents: 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Calendar size={16} color="var(--text-secondary)"/>
              <input type="date" className="form-input" />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Clock size={16} color="var(--text-secondary)"/>
              <input type="time" className="form-input" />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '32px', borderTop: '1px solid var(--border-color)', paddingTop: '24px' }}>
            <button className="btn btn-secondary">Save Draft</button>
            <button className="btn btn-primary" onClick={handleSend}><Send size={16}/> Dispatch Broadcast</button>
          </div>
        </div>

      </div>
    </AdminLayout>
  );
};

export default CreateNotification;
