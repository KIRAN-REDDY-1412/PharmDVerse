import React, { useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { 
  CreditCard, Search, Filter, Plus, MoreVertical, 
  X, CheckCircle, AlertTriangle, Download, 
  Activity, Users, Database, Zap, Settings, ArrowUpRight
} from 'lucide-react';
import './SubscriptionManagement.css'; 

// Mock Data
const MOCK_SUBSCRIPTIONS = [
  {
    id: 'SUB-001',
    collegeName: 'University of Texas Pharmacy',
    plan: 'Enterprise',
    status: 'Paid',
    amount: '$25,000/yr',
    renewalDate: '2027-01-15',
    seatUtilization: '1,250 / Unlimited',
    features: ['AI Clinical Assistant', 'White Label Support', 'API Access', 'Custom Integrations']
  },
  {
    id: 'SUB-002',
    collegeName: 'Boston Healthcare College',
    plan: 'Professional',
    status: 'Pending',
    amount: '$12,000/yr',
    renewalDate: '2026-11-01',
    seatUtilization: '850 / 2,000',
    features: ['AI Clinical Assistant', 'Preceptor Approval Chains']
  },
  {
    id: 'SUB-003',
    collegeName: 'Seattle Clinical Institute',
    plan: 'Trial',
    status: 'Active',
    amount: '$0',
    renewalDate: '2026-08-30 (14 days left)',
    seatUtilization: '120 / 500',
    features: ['Standard Analysis']
  },
  {
    id: 'SUB-004',
    collegeName: 'Midwest Pharmacy Academy',
    plan: 'Professional',
    status: 'Overdue',
    amount: '$12,000/yr',
    renewalDate: '2026-05-15 (Past Due)',
    seatUtilization: '920 / 2,000',
    features: ['AI Clinical Assistant', 'Preceptor Approval Chains']
  }
];

const getStatusBadge = (status) => {
  switch(status.toLowerCase()) {
    case 'paid':
    case 'active':
      return <span className="status-badge success"><CheckCircle size={14} /> {status}</span>;
    case 'overdue':
    case 'cancelled':
      return <span className="status-badge danger"><AlertTriangle size={14} /> {status}</span>;
    case 'pending':
    case 'trial':
      return <span className="status-badge warning"><Activity size={14} /> {status}</span>;
    default:
      return <span className="status-badge neutral">{status}</span>;
  }
};

const getPlanBadge = (plan) => {
  switch(plan.toLowerCase()) {
    case 'enterprise':
      return <span className="plan-pill purple">{plan}</span>;
    case 'professional':
      return <span className="plan-pill blue">{plan}</span>;
    case 'basic':
    case 'standard':
      return <span className="plan-pill slate">{plan}</span>;
    default:
      return <span className="plan-pill green">{plan}</span>;
  }
}

const SubscriptionManagement = () => {
  const [selectedSub, setSelectedSub] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <AdminLayout>
      <div className="sub-management-container">
        
        {/* Command Header */}
        <div className="command-header">
          <div>
            <h1 className="page-title">Subscription & License Management</h1>
            <p className="page-subtitle">Manage billing, usage limits, and feature matrix.</p>
          </div>
          <div className="header-actions">
            <button className="btn btn-secondary"><Download size={18} /> Export Billing Data</button>
            <button className="btn btn-primary"><Plus size={18} /> Provision Custom Plan</button>
          </div>
        </div>

        {/* Dashboard KPIs */}
        <div className="sub-kpis-grid">
          <div className="kpi-card">
            <div className="kpi-icon blue"><CreditCard size={24} /></div>
            <div className="kpi-content">
              <div className="kpi-value">142</div>
              <div className="kpi-label">Total Active Subscriptions</div>
            </div>
          </div>
          <div className="kpi-card">
            <div className="kpi-icon green"><Activity size={24} /></div>
            <div className="kpi-content">
              <div className="kpi-value">8</div>
              <div className="kpi-label">Trial Colleges</div>
            </div>
          </div>
          <div className="kpi-card">
            <div className="kpi-icon warning"><AlertTriangle size={24} /></div>
            <div className="kpi-content">
              <div className="kpi-value">12</div>
              <div className="kpi-label">Expiring This Month</div>
            </div>
          </div>
          <div className="kpi-card">
            <div className="kpi-icon danger"><X size={24} /></div>
            <div className="kpi-content">
              <div className="kpi-value">4</div>
              <div className="kpi-label">Overdue / Expired Licenses</div>
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="toolbar mt-4">
          <div className="search-box">
            <Search size={18} className="search-icon" />
            <input type="text" placeholder="Search by college or Subscription ID..." />
          </div>
          <div className="filters">
            <button className="filter-btn"><Filter size={18} /> Plan: All</button>
            <button className="filter-btn"><Filter size={18} /> Status: All</button>
          </div>
        </div>

        {/* Subscription Ledger (Data Grid) */}
        <div className="data-grid-container">
          <table className="enterprise-table">
            <thead>
              <tr>
                <th>College & ID</th>
                <th>Plan Tier</th>
                <th>Payment Status</th>
                <th>Seat Utilization</th>
                <th>Renewal Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_SUBSCRIPTIONS.map((sub) => (
                <tr key={sub.id} onClick={() => setSelectedSub(sub)} className="clickable-row">
                  <td>
                    <div className="college-cell-info">
                      <div>
                        <div className="college-name">{sub.collegeName}</div>
                        <div className="college-domain" style={{ fontFamily: 'monospace' }}>{sub.id}</div>
                      </div>
                    </div>
                  </td>
                  <td>{getPlanBadge(sub.plan)}</td>
                  <td>{getStatusBadge(sub.status)}</td>
                  <td>
                    <div className="user-counts">
                      <span><Users size={14} /> {sub.seatUtilization}</span>
                    </div>
                  </td>
                  <td>
                    <div className="renewal-date" style={{ fontSize: '0.85rem' }}>{sub.renewalDate}</div>
                  </td>
                  <td>
                    <button className="icon-btn-small" onClick={(e) => { e.stopPropagation(); }}><MoreVertical size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      {/* Slide-out Configurator Modal */}
      {selectedSub && (
        <>
          <div className="modal-backdrop" onClick={() => setSelectedSub(null)}></div>
          <div className="slide-out-modal">
            <div className="modal-header">
              <div>
                <h2 className="modal-title">{selectedSub.collegeName}</h2>
                <div className="modal-subtitle">Sub ID: {selectedSub.id} • {getStatusBadge(selectedSub.status)}</div>
              </div>
              <button className="close-btn" onClick={() => setSelectedSub(null)}>
                <X size={24} />
              </button>
            </div>

            <div className="modal-tabs">
              <button className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>Overview</button>
              <button className={`tab-btn ${activeTab === 'limits' ? 'active' : ''}`} onClick={() => setActiveTab('limits')}>Usage Limits</button>
              <button className={`tab-btn ${activeTab === 'matrix' ? 'active' : ''}`} onClick={() => setActiveTab('matrix')}>Feature Matrix</button>
              <button className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`} onClick={() => setActiveTab('history')}>History & Audit</button>
            </div>

            <div className="modal-body">
              {activeTab === 'overview' && (
                <div className="tab-content">
                  <div className="info-card">
                    <h3>Current Plan</h3>
                    <div className="plan-display mt-2 mb-4">
                      {getPlanBadge(selectedSub.plan)}
                      <span className="plan-amount ml-4" style={{ fontSize: '1.25rem', fontWeight: 700 }}>{selectedSub.amount}</span>
                    </div>
                    <div className="info-grid">
                      <div className="info-item"><strong>Renewal Date:</strong> {selectedSub.renewalDate}</div>
                      <div className="info-item"><strong>Billing Cycle:</strong> Annual</div>
                    </div>
                    
                    <div className="action-grid mt-4" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <button className="btn btn-primary" style={{ display: 'flex', justifyContent: 'center' }}><ArrowUpRight size={18} /> Upgrade Plan</button>
                      <button className="btn btn-secondary" style={{ display: 'flex', justifyContent: 'center' }}>Downgrade Plan</button>
                    </div>
                  </div>

                  {selectedSub.status === 'Overdue' && (
                    <div className="warning-banner mt-4" style={{ background: 'rgba(239,68,68,0.1)', padding: '1rem', borderRadius: '8px', border: '1px solid #ef4444' }}>
                      <h4 style={{ color: '#ef4444', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}><AlertTriangle size={18}/> 7-Day Grace Period Active</h4>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>This college is currently overdue. They have read-only access but cannot add new cases. Grace period expires in 2 days.</p>
                    </div>
                  )}

                  <button className="btn btn-danger w-full mt-4" style={{ display: 'flex', justifyContent: 'center' }}>Cancel Subscription</button>
                </div>
              )}

              {activeTab === 'limits' && (
                <div className="tab-content">
                  <div className="info-card">
                    <h3>Usage Limits Configurator</h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Hard caps inherited from the base {selectedSub.plan} plan.</p>
                    
                    <div className="form-group mb-4">
                      <label>Maximum Students</label>
                      <input type="text" value={selectedSub.plan === 'Enterprise' ? 'Unlimited' : '2000'} readOnly className="form-input disabled" />
                    </div>
                    <div className="form-group mb-4">
                      <label>Maximum Preceptors</label>
                      <input type="text" value={selectedSub.plan === 'Enterprise' ? 'Unlimited' : '500'} readOnly className="form-input disabled" />
                    </div>
                    <div className="form-group mb-4">
                      <label>Storage Limit</label>
                      <input type="text" value={selectedSub.plan === 'Enterprise' ? 'Unlimited' : '250 GB'} readOnly className="form-input disabled" />
                    </div>
                    <div className="form-group mb-4">
                      <label>Monthly AI Analysis Limit (Tokens)</label>
                      <input type="text" value={selectedSub.plan === 'Enterprise' ? 'Unlimited' : '100,000'} readOnly className="form-input disabled" />
                    </div>

                    <button className="btn btn-secondary w-full"><Settings size={18}/> Override Base Limits</button>
                  </div>
                </div>
              )}

              {activeTab === 'matrix' && (
                <div className="tab-content">
                  <div className="info-card">
                    <h3>Feature Matrix</h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Toggle specific functionality for this tenant.</p>
                    
                    <div className="feature-list" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <div className="feature-toggle" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Zap size={16} color="#8b5cf6" /> AI Clinical Assistant</div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Automated SOAP analysis</div>
                        </div>
                        <input type="checkbox" defaultChecked={selectedSub.plan !== 'Trial'} />
                      </div>
                      <div className="feature-toggle" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Activity size={16} color="#3b82f6" /> Advanced Analytics</div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Custom reporting and dashboards</div>
                        </div>
                        <input type="checkbox" defaultChecked={selectedSub.plan !== 'Trial' && selectedSub.plan !== 'Standard'} />
                      </div>
                      <div className="feature-toggle" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Database size={16} color="#10b981" /> API Access</div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>REST API for external EHR integrations</div>
                        </div>
                        <input type="checkbox" defaultChecked={selectedSub.plan === 'Enterprise'} />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'history' && (
                <div className="tab-content">
                  <div className="info-card">
                    <h3>Subscription & Renewal Audit Log</h3>
                    <div className="audit-timeline mt-4">
                      <div className="audit-event">
                        <div className="event-icon"><CreditCard size={16} /></div>
                        <div className="event-details">
                          <div className="event-title">Subscription Renewal Failed</div>
                          <div className="event-time">5 days ago • System Auto-Trigger</div>
                        </div>
                      </div>
                      <div className="audit-event">
                        <div className="event-icon"><Activity size={16} /></div>
                        <div className="event-details">
                          <div className="event-title">7-Day Reminder Notification Sent</div>
                          <div className="event-time">12 days ago • System Auto-Trigger</div>
                        </div>
                      </div>
                      <div className="audit-event">
                        <div className="event-icon"><ArrowUpRight size={16} /></div>
                        <div className="event-details">
                          <div className="event-title">Upgraded from Professional to Enterprise</div>
                          <div className="event-time">1 year ago • Super Admin John</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </AdminLayout>
  );
};

export default SubscriptionManagement;
