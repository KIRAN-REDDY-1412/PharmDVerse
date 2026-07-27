import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { 
  ArrowLeft, Search, Filter, MoreVertical, 
  Trash2, RotateCcw, CheckCircle, AlertTriangle
} from 'lucide-react';
import './SubscriptionList.css'; // Reuse data grid

const NotificationHistory = () => {
  const navigate = useNavigate();

  return (
    <AdminLayout>
      <div style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto', color: 'var(--text-color)' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
          <button className="icon-btn-small" onClick={() => navigate('/super-admin/notifications')}>
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="page-title" style={{ margin: '0 0 4px 0' }}>Delivery Ledger</h1>
            <p className="page-subtitle" style={{ margin: 0 }}>History of all platform communications.</p>
          </div>
        </div>

        <div className="toolbar">
          <div className="search-box">
            <Search size={18} color="var(--text-secondary)" />
            <input type="text" placeholder="Search message title or content..." />
          </div>
          <div className="filters">
            <input type="date" className="filter-btn" style={{ padding: '8px 12px' }}/>
            <button className="filter-btn"><Filter size={18} /> Channel</button>
            <button className="filter-btn"><Filter size={18} /> Status</button>
          </div>
        </div>

        <div className="data-grid-container">
          <table className="enterprise-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ padding: '16px', textAlign: 'left', borderBottom: '1px solid var(--border-color)' }}>Message Details</th>
                <th style={{ padding: '16px', textAlign: 'left', borderBottom: '1px solid var(--border-color)' }}>Audience</th>
                <th style={{ padding: '16px', textAlign: 'left', borderBottom: '1px solid var(--border-color)' }}>Channels</th>
                <th style={{ padding: '16px', textAlign: 'left', borderBottom: '1px solid var(--border-color)' }}>Timestamp</th>
                <th style={{ padding: '16px', textAlign: 'left', borderBottom: '1px solid var(--border-color)' }}>Status & Metrics</th>
                <th style={{ padding: '16px', textAlign: 'left', borderBottom: '1px solid var(--border-color)' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '16px', borderBottom: '1px solid var(--border-color)' }}>
                  <div style={{ fontWeight: 600 }}>System Maintenance Window</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>System Alert • High Priority</div>
                </td>
                <td style={{ padding: '16px', borderBottom: '1px solid var(--border-color)' }}>
                  <div>All Colleges</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>All Roles (~124k targets)</div>
                </td>
                <td style={{ padding: '16px', borderBottom: '1px solid var(--border-color)', fontSize: '0.875rem' }}>
                  Push, Email
                </td>
                <td style={{ padding: '16px', borderBottom: '1px solid var(--border-color)', fontSize: '0.875rem' }}>
                  Jul 26, 2026<br/><span style={{ color: 'var(--text-secondary)' }}>08:00 AM</span>
                </td>
                <td style={{ padding: '16px', borderBottom: '1px solid var(--border-color)' }}>
                  <span className="status-badge success"><CheckCircle size={12}/> Delivered</span>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>Open Rate: 84%</div>
                </td>
                <td style={{ padding: '16px', borderBottom: '1px solid var(--border-color)' }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button className="btn btn-secondary" style={{ padding: '6px' }} title="Resend"><RotateCcw size={14}/></button>
                    <button className="btn btn-danger" style={{ padding: '6px' }} title="Delete Record"><Trash2 size={14}/></button>
                  </div>
                </td>
              </tr>
              <tr>
                <td style={{ padding: '16px', borderBottom: '1px solid var(--border-color)' }}>
                  <div style={{ fontWeight: 600 }}>Urgent: Subscription Overdue</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Account Alert • High Priority</div>
                </td>
                <td style={{ padding: '16px', borderBottom: '1px solid var(--border-color)' }}>
                  <div>Atlanta Medical College</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>College Admins Only (3 targets)</div>
                </td>
                <td style={{ padding: '16px', borderBottom: '1px solid var(--border-color)', fontSize: '0.875rem' }}>
                  SMS, Push
                </td>
                <td style={{ padding: '16px', borderBottom: '1px solid var(--border-color)', fontSize: '0.875rem' }}>
                  Jul 24, 2026<br/><span style={{ color: 'var(--text-secondary)' }}>10:15 AM</span>
                </td>
                <td style={{ padding: '16px', borderBottom: '1px solid var(--border-color)' }}>
                  <span className="status-badge danger"><AlertTriangle size={12}/> Failed</span>
                  <div style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: '4px' }}>Twilio API Error</div>
                </td>
                <td style={{ padding: '16px', borderBottom: '1px solid var(--border-color)' }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button className="btn btn-secondary" style={{ padding: '6px' }} title="Retry"><RotateCcw size={14}/></button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </AdminLayout>
  );
};

export default NotificationHistory;
