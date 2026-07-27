import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { 
  ArrowLeft, Bell, AlertTriangle, AlertOctagon, 
  Clock, Search, Filter, Mail, Ban, RefreshCw, Eye
} from 'lucide-react';
import './ExpiryAlerts.css';
import './SubscriptionList.css'; // For table styling

const MOCK_ALERTS = [
  {
    id: 'SUB-2024-112',
    college: 'Atlanta Medical College',
    plan: 'Basic',
    expiryDate: '2026-07-25',
    daysRemaining: -2,
    urgency: 'critical',
    contact: 'admin@amc.edu',
    status: 'Overdue (Grace Period)'
  },
  {
    id: 'SUB-2024-045',
    college: 'Boston Healthcare College',
    plan: 'Professional',
    expiryDate: '2026-08-03',
    daysRemaining: 7,
    urgency: 'high',
    contact: 'billing@bhc.edu',
    status: 'Expiring Soon'
  },
  {
    id: 'SUB-2024-089',
    college: 'Denver Pharmacy School',
    plan: 'Enterprise',
    expiryDate: '2026-08-10',
    daysRemaining: 14,
    urgency: 'medium',
    contact: 'finance@dps.edu',
    status: 'Active'
  }
];

const ExpiryAlerts = () => {
  const navigate = useNavigate();

  const handleRemind = (email) => {
    alert(`Renewal reminder dispatched to ${email}`);
  };

  return (
    <AdminLayout>
      <div className="alerts-container">
        
        <div className="alerts-header">
          <div className="alerts-title-area">
            <button className="icon-btn-small" onClick={() => navigate('/super-admin/subscriptions')}>
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="page-title">Expiry & Renewal Alerts</h1>
              <p className="page-subtitle">Monitor subscriptions approaching expiry or currently overdue.</p>
            </div>
          </div>
          <button className="btn btn-secondary"><Bell size={18} /> Configure Alert Settings</button>
        </div>

        <div className="alerts-summary-grid">
          <div className="alert-stat-card">
            <div className="alert-icon-box" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}>
              <AlertOctagon size={24} />
            </div>
            <div className="alert-stat-content">
              <span className="alert-stat-value">2</span>
              <span className="alert-stat-label">Overdue & Suspended</span>
            </div>
          </div>
          <div className="alert-stat-card">
            <div className="alert-icon-box" style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' }}>
              <AlertTriangle size={24} />
            </div>
            <div className="alert-stat-content">
              <span className="alert-stat-value">8</span>
              <span className="alert-stat-label">Expiring in &lt; 7 Days</span>
            </div>
          </div>
          <div className="alert-stat-card">
            <div className="alert-icon-box" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>
              <Clock size={24} />
            </div>
            <div className="alert-stat-content">
              <span className="alert-stat-value">12</span>
              <span className="alert-stat-label">Expiring in 30 Days</span>
            </div>
          </div>
          <div className="alert-stat-card">
            <div className="alert-icon-box" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
              <RefreshCw size={24} />
            </div>
            <div className="alert-stat-content">
              <span className="alert-stat-value">$142,000</span>
              <span className="alert-stat-label">Renewal Value at Risk</span>
            </div>
          </div>
        </div>

        <div className="toolbar">
          <div className="search-box">
            <Search size={18} color="var(--text-secondary)" />
            <input type="text" placeholder="Search alerts..." />
          </div>
          <div className="filters">
            <button className="filter-btn"><Filter size={18} /> Urgency: All</button>
          </div>
        </div>

        <div className="data-grid-container">
          <table className="enterprise-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ padding: '16px', borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>Tenant Details</th>
                <th style={{ padding: '16px', borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>Urgency</th>
                <th style={{ padding: '16px', borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>Expiry Timeline</th>
                <th style={{ padding: '16px', borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>Contact</th>
                <th style={{ padding: '16px', borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>Quick Actions</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_ALERTS.map((alert) => (
                <tr key={alert.id} className={alert.urgency === 'critical' ? 'overdue-row' : ''}>
                  <td style={{ padding: '16px', borderBottom: '1px solid var(--border-color)' }}>
                    <div style={{ fontWeight: 600 }}>{alert.college}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>{alert.plan} • {alert.id}</div>
                  </td>
                  <td style={{ padding: '16px', borderBottom: '1px solid var(--border-color)' }}>
                    {alert.urgency === 'critical' && <span className="urgency-badge critical"><AlertOctagon size={12}/> Overdue</span>}
                    {alert.urgency === 'high' && <span className="urgency-badge high"><AlertTriangle size={12}/> High Risk</span>}
                    {alert.urgency === 'medium' && <span className="urgency-badge medium"><Clock size={12}/> Approaching</span>}
                  </td>
                  <td style={{ padding: '16px', borderBottom: '1px solid var(--border-color)' }}>
                    <div style={{ fontWeight: 600, color: alert.urgency === 'critical' ? '#ef4444' : (alert.urgency === 'high' ? '#f59e0b' : 'var(--text-color)') }}>
                      {alert.daysRemaining < 0 ? `${Math.abs(alert.daysRemaining)} Days Overdue` : `${alert.daysRemaining} Days Left`}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>{alert.expiryDate}</div>
                  </td>
                  <td style={{ padding: '16px', borderBottom: '1px solid var(--border-color)', fontSize: '0.875rem' }}>
                    {alert.contact}
                  </td>
                  <td style={{ padding: '16px', borderBottom: '1px solid var(--border-color)' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button className="btn btn-secondary" style={{ padding: '6px 10px' }} onClick={() => handleRemind(alert.contact)} title="Send Email Reminder">
                        <Mail size={14} />
                      </button>
                      <button className="btn btn-primary" style={{ padding: '6px 10px' }} onClick={() => navigate(`/super-admin/subscriptions/renew/${alert.id}`)} title="Renew Now">
                        <RefreshCw size={14} />
                      </button>
                      {alert.urgency === 'critical' && (
                        <button className="btn btn-danger" style={{ padding: '6px 10px' }} title="Suspend Access">
                          <Ban size={14} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </AdminLayout>
  );
};

export default ExpiryAlerts;
