import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { 
  Search, Filter, Plus, MoreVertical, 
  CheckCircle, AlertTriangle, Activity, 
  Users, Shield, Calendar, Download, Eye, Edit, Key, FileText
} from 'lucide-react';
import './SubscriptionList.css';

const MOCK_DATA = [
  {
    id: 'SUB-2024-001',
    college: 'University of Texas Pharmacy',
    plan: 'Enterprise',
    license: 'LIC-TX-9921',
    status: 'Active',
    start: '2024-01-15',
    end: '2027-01-15',
    daysRemaining: 902,
    students: { current: 1250, max: 'Unlimited' },
    preceptors: { current: 120, max: 'Unlimited' },
    features: { ai: true, reports: true, library: true }
  },
  {
    id: 'SUB-2024-045',
    college: 'Boston Healthcare College',
    plan: 'Professional',
    license: 'LIC-MA-8832',
    status: 'Expiring Soon',
    start: '2023-11-01',
    end: '2026-11-01',
    daysRemaining: 96,
    students: { current: 850, max: 2000 },
    preceptors: { current: 45, max: 100 },
    features: { ai: true, reports: true, library: false }
  },
  {
    id: 'SUB-2024-088',
    college: 'Midwest Pharmacy Academy',
    plan: 'Basic',
    license: 'LIC-OH-1102',
    status: 'Expired',
    start: '2023-05-15',
    end: '2026-05-15',
    daysRemaining: 0,
    students: { current: 920, max: 1000 },
    preceptors: { current: 30, max: 50 },
    features: { ai: false, reports: true, library: false }
  }
];

const getStatusBadge = (status) => {
  switch(status) {
    case 'Active': return <span className="status-badge success"><CheckCircle size={14} /> Active</span>;
    case 'Expired': return <span className="status-badge danger"><AlertTriangle size={14} /> Expired</span>;
    case 'Expiring Soon': return <span className="status-badge warning"><Activity size={14} /> Expiring Soon</span>;
    default: return <span className="status-badge">{status}</span>;
  }
};

const getPlanPill = (plan) => {
  switch(plan) {
    case 'Enterprise': return <span className="plan-pill purple">{plan}</span>;
    case 'Professional': return <span className="plan-pill blue">{plan}</span>;
    case 'Basic': return <span className="plan-pill slate">{plan}</span>;
    default: return <span className="plan-pill green">{plan}</span>;
  }
};

const SubscriptionList = () => {
  const navigate = useNavigate();
  const [actionMenuOpen, setActionMenuOpen] = useState(null);

  return (
    <AdminLayout>
      <div className="sub-list-container">
        
        <div className="sub-list-header">
          <div>
            <h1 className="sub-list-title">Subscriptions Master List</h1>
            <p className="sub-list-subtitle">Manage all college subscriptions, licenses, and renewals.</p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button className="btn btn-secondary"><Download size={18} /> Export List</button>
            <button className="btn btn-primary" onClick={() => navigate('/super-admin/subscriptions/plans/create')}>
              <Plus size={18} /> Create Plan
            </button>
          </div>
        </div>

        <div className="toolbar">
          <div className="search-box">
            <Search size={18} color="var(--text-secondary)" />
            <input type="text" placeholder="Search by ID, College, or License..." />
          </div>
          <div className="filters">
            <button className="filter-btn"><Filter size={18} /> Plan Tier</button>
            <button className="filter-btn"><Filter size={18} /> Status</button>
          </div>
        </div>

        <div className="data-grid-container" style={{ overflowX: 'auto' }}>
          <table className="enterprise-table" style={{ width: '100%', minWidth: '1200px' }}>
            <thead>
              <tr>
                <th>Subscription</th>
                <th>Plan & License</th>
                <th>Status & Duration</th>
                <th>Capacity (Students/Preceptors)</th>
                <th>Features</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_DATA.map((sub) => (
                <tr key={sub.id}>
                  <td>
                    <div style={{ fontWeight: 600 }}>{sub.college}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontFamily: 'monospace' }}>ID: {sub.id}</div>
                  </td>
                  <td>
                    <div>{getPlanPill(sub.plan)}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px', fontFamily: 'monospace' }}>{sub.license}</div>
                  </td>
                  <td>
                    <div style={{ marginBottom: '4px' }}>{getStatusBadge(sub.status)}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                      <Calendar size={12} style={{ display: 'inline', marginRight: '4px' }}/> 
                      {sub.end} ({sub.daysRemaining} days left)
                    </div>
                  </td>
                  <td>
                    <div className="usage-text">
                      <Users size={14} color="var(--text-secondary)"/>
                      <span>{sub.students.current} <span className="limit">/ {sub.students.max}</span></span>
                    </div>
                    <div className="usage-text" style={{ marginTop: '4px' }}>
                      <Shield size={14} color="var(--text-secondary)"/>
                      <span>{sub.preceptors.current} <span className="limit">/ {sub.preceptors.max}</span></span>
                    </div>
                  </td>
                  <td>
                    <div className="feature-tags">
                      <span className={`feature-tag ${sub.features.ai ? 'active' : ''}`}>AI</span>
                      <span className={`feature-tag ${sub.features.reports ? 'active' : ''}`}>Reports</span>
                      <span className={`feature-tag ${sub.features.library ? 'active' : ''}`}>Library</span>
                    </div>
                  </td>
                  <td style={{ position: 'relative' }}>
                    <button className="icon-btn-small" onClick={() => setActionMenuOpen(actionMenuOpen === sub.id ? null : sub.id)}>
                      <MoreVertical size={18} />
                    </button>
                    
                    {actionMenuOpen === sub.id && (
                      <div style={{ position: 'absolute', right: '30px', top: '10px', backgroundColor: 'var(--surface-color)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '8px', zIndex: 10, boxShadow: '0 4px 12px rgba(0,0,0,0.15)', display: 'flex', flexDirection: 'column', gap: '4px', minWidth: '180px' }}>
                        <button className="btn btn-secondary w-full" style={{ justifyContent: 'flex-start', padding: '6px 12px' }} onClick={() => navigate('/super-admin/subscriptions/usage')}><Eye size={14}/> View Usage</button>
                        <button className="btn btn-secondary w-full" style={{ justifyContent: 'flex-start', padding: '6px 12px' }} onClick={() => navigate('/super-admin/subscriptions/assign')}><Edit size={14}/> Change Plan</button>
                        <button className="btn btn-secondary w-full" style={{ justifyContent: 'flex-start', padding: '6px 12px' }} onClick={() => navigate(`/super-admin/subscriptions/renew/${sub.id}`)}><RefreshCw size={14}/> Renew Subscription</button>
                        <button className="btn btn-secondary w-full" style={{ justifyContent: 'flex-start', padding: '6px 12px' }} onClick={() => navigate('/super-admin/subscriptions/payments')}><FileText size={14}/> Payment History</button>
                        <button className="btn btn-secondary w-full" style={{ justifyContent: 'flex-start', padding: '6px 12px' }} onClick={() => navigate('/super-admin/subscriptions/licenses')}><Key size={14}/> License Details</button>
                        {sub.status !== 'Expired' ? (
                          <button className="btn btn-danger w-full" style={{ justifyContent: 'flex-start', padding: '6px 12px', marginTop: '4px' }}>Suspend</button>
                        ) : (
                          <button className="btn btn-success w-full" style={{ justifyContent: 'flex-start', padding: '6px 12px', marginTop: '4px', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>Activate</button>
                        )}
                      </div>
                    )}
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

export default SubscriptionList;
