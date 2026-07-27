import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { 
  ArrowLeft, CreditCard, Shield, Users, Activity, 
  Download, RefreshCw, Power, ArrowUpCircle
} from 'lucide-react';
import './CollegeSubscription.css';

const MOCK_SUB = {
  plan: 'Enterprise',
  status: 'Active',
  type: 'Annual',
  start: 'Jan 15, 2024',
  end: 'Jan 15, 2027',
  daysRemaining: 902,
  studentsUsed: 1250,
  studentsMax: 2000,
  preceptorsUsed: 120,
  preceptorsMax: 150
};

const MOCK_HISTORY = [
  { id: 'INV-001', date: 'Jan 15, 2024', amount: '$12,500', status: 'Paid', plan: 'Enterprise (Annual)' },
  { id: 'INV-002', date: 'Jan 15, 2023', amount: '$8,500', status: 'Paid', plan: 'Professional (Annual)' }
];

const CollegeSubscription = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('history');

  const studentPercentage = (MOCK_SUB.studentsUsed / MOCK_SUB.studentsMax) * 100;
  const preceptorPercentage = (MOCK_SUB.preceptorsUsed / MOCK_SUB.preceptorsMax) * 100;

  return (
    <AdminLayout>
      <div className="subscription-container">
        
        <div className="sub-header">
          <div className="sub-title-area">
            <button className="icon-btn-small" onClick={() => navigate(`/super-admin/colleges/view/${id}`)}>
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="page-title">Subscription & License</h1>
              <p className="page-subtitle">University of Texas Pharmacy ({id})</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button className="btn btn-secondary"><Download size={16}/> License Cert.</button>
            <button className="btn btn-primary"><ArrowUpCircle size={16}/> Upgrade Plan</button>
          </div>
        </div>

        <div className="sub-kpi-grid">
          <div className="sub-kpi-card" style={{ backgroundColor: 'rgba(79, 70, 229, 0.05)', borderColor: 'rgba(79, 70, 229, 0.2)' }}>
            <div className="kpi-label"><CreditCard size={18} color="var(--primary-color)"/> Current Plan</div>
            <div className="kpi-value" style={{ color: 'var(--primary-color)' }}>{MOCK_SUB.plan}</div>
            <div className="kpi-sub">{MOCK_SUB.type} Billing</div>
          </div>
          
          <div className="sub-kpi-card">
            <div className="kpi-label"><Activity size={18}/> Status</div>
            <div className="kpi-value" style={{ color: '#10b981' }}>{MOCK_SUB.status}</div>
            <div className="kpi-sub">Expires: {MOCK_SUB.end} ({MOCK_SUB.daysRemaining} days)</div>
          </div>

          <div className="sub-kpi-card">
            <div className="kpi-label"><Users size={18}/> Student Usage</div>
            <div className="kpi-value">{MOCK_SUB.studentsUsed.toLocaleString()} <span style={{fontSize:'1rem', color:'var(--text-secondary)'}}>/ {MOCK_SUB.studentsMax}</span></div>
            <div className="kpi-progress">
              <div className={`kpi-progress-fill ${studentPercentage > 90 ? 'danger' : studentPercentage > 75 ? 'warning' : ''}`} style={{ width: `${studentPercentage}%` }}></div>
            </div>
          </div>

          <div className="sub-kpi-card">
            <div className="kpi-label"><Shield size={18}/> Preceptor Usage</div>
            <div className="kpi-value">{MOCK_SUB.preceptorsUsed.toLocaleString()} <span style={{fontSize:'1rem', color:'var(--text-secondary)'}}>/ {MOCK_SUB.preceptorsMax}</span></div>
            <div className="kpi-progress">
              <div className={`kpi-progress-fill ${preceptorPercentage > 90 ? 'danger' : preceptorPercentage > 75 ? 'warning' : ''}`} style={{ width: `${preceptorPercentage}%` }}></div>
            </div>
          </div>
        </div>

        <div className="tabs-container">
          <button className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`} onClick={() => setActiveTab('history')}>Payment History</button>
          <button className={`tab-btn ${activeTab === 'actions' ? 'active' : ''}`} onClick={() => setActiveTab('actions')}>Subscription Actions</button>
        </div>

        {activeTab === 'history' && (
          <div className="history-card">
            <table className="enterprise-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ padding: '16px', borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>Invoice #</th>
                  <th style={{ padding: '16px', borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>Date</th>
                  <th style={{ padding: '16px', borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>Plan</th>
                  <th style={{ padding: '16px', borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>Amount</th>
                  <th style={{ padding: '16px', borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>Status</th>
                  <th style={{ padding: '16px', borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_HISTORY.map(row => (
                  <tr key={row.id}>
                    <td style={{ padding: '16px', borderBottom: '1px solid var(--border-color)' }}>{row.id}</td>
                    <td style={{ padding: '16px', borderBottom: '1px solid var(--border-color)' }}>{row.date}</td>
                    <td style={{ padding: '16px', borderBottom: '1px solid var(--border-color)' }}>{row.plan}</td>
                    <td style={{ padding: '16px', borderBottom: '1px solid var(--border-color)' }}>{row.amount}</td>
                    <td style={{ padding: '16px', borderBottom: '1px solid var(--border-color)' }}><span className="status-badge active" style={{ display: 'inline-block' }}>{row.status}</span></td>
                    <td style={{ padding: '16px', borderBottom: '1px solid var(--border-color)' }}>
                      <button className="icon-btn-small"><Download size={16}/></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'actions' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
            <div className="sub-kpi-card">
              <h3><RefreshCw size={18} style={{marginRight: '8px'}}/> Force Renewal</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '16px' }}>Manually trigger a license renewal for this college regardless of the current expiry date.</p>
              <button className="btn btn-secondary w-full" onClick={() => alert('Renewal triggered')}>Process Renewal</button>
            </div>
            <div className="sub-kpi-card" style={{ borderColor: 'var(--danger-color)' }}>
              <h3 style={{ color: 'var(--danger-color)' }}><Power size={18} style={{marginRight: '8px'}}/> Suspend Subscription</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '16px' }}>Immediately block all access for students, preceptors, and admins of this college. Data will be preserved.</p>
              <button className="btn btn-danger w-full" onClick={() => alert('Subscription suspended')}>Suspend College</button>
            </div>
          </div>
        )}

      </div>
    </AdminLayout>
  );
};

export default CollegeSubscription;
