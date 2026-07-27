import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  ClipboardList, BarChart3, Activity, 
  AlertTriangle, CheckCircle, Clock 
} from 'lucide-react';
import CollegeAdminLayout from '../../components/college/CollegeAdminLayout';
import { useDatabase } from '../../context/DatabaseContext';
import './PreceptorManagement.css';

const ClinicalCaseManagement = () => {
  const { cases } = useDatabase();

  // Dashboard KPIs
  const kpis = useMemo(() => {
    const total = cases.length;
    const pending = cases.filter(c => c.status === 'Pending').length;
    const approved = cases.filter(c => c.status === 'Approved').length;
    const returned = cases.filter(c => c.status === 'Returned').length;
    const draft = cases.filter(c => c.status === 'Draft').length;

    return { total, pending, approved, returned, draft };
  }, [cases]);

  // Recent Pending Cases
  const recentPending = useMemo(() => {
    return cases
      .filter(c => c.status === 'Pending')
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5);
  }, [cases]);

  return (
    <CollegeAdminLayout>
      <div className="list-page-container">
        
        <div className="list-page-header">
          <div className="header-left">
            <h1 className="page-title">Clinical Case Management</h1>
            <div className="breadcrumbs">
              <Link to="/college-admin/dashboard" className="breadcrumb-link">Dashboard</Link>
              <span className="breadcrumb-separator">&gt;</span>
              <span>Clinical Cases</span>
            </div>
          </div>
          <div className="header-right">
            <Link to="/college-admin/cases/list" className="btn-primary">
              <ClipboardList size={18} /> View Case List
            </Link>
          </div>
        </div>

        {/* Dashboard KPIs Grid */}
        <div className="quick-stats-grid" style={{ marginTop: '1.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
          <div className="stat-card" style={{ borderColor: 'var(--color-primary)' }}>
            <div className="stat-icon total"><Activity size={24} /></div>
            <div className="stat-details">
              <span className="stat-value">{kpis.total}</span>
              <span className="stat-label">Total Cases Processed</span>
            </div>
          </div>
          <div className="stat-card" style={{ borderColor: 'var(--color-warning)' }}>
            <div className="stat-icon warning"><Clock size={24} /></div>
            <div className="stat-details">
              <span className="stat-value">{kpis.pending}</span>
              <span className="stat-label">Pending Preceptor Review</span>
            </div>
          </div>
          <div className="stat-card" style={{ borderColor: 'var(--color-danger)' }}>
            <div className="stat-icon inactive"><AlertTriangle size={24} /></div>
            <div className="stat-details">
              <span className="stat-value">{kpis.returned}</span>
              <span className="stat-label">Returned for Correction</span>
            </div>
          </div>
          <div className="stat-card" style={{ borderColor: 'var(--color-success)' }}>
            <div className="stat-icon active"><CheckCircle size={24} /></div>
            <div className="stat-details">
              <span className="stat-value">{kpis.approved}</span>
              <span className="stat-label">Approved & Archived</span>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginTop: '2rem' }}>
          
          {/* Action Modules */}
          <div>
            <h2 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Case Modules</h2>
            <div className="preceptor-actions-grid" style={{ gridTemplateColumns: '1fr' }}>
              <Link to="/college-admin/cases/list" className="action-card">
                <div className="action-icon-wrapper blue">
                  <ClipboardList size={32} />
                </div>
                <div className="action-details">
                  <span className="action-title">Case Ledger</span>
                  <span className="action-subtitle">Advanced enterprise data grid of all clinical cases</span>
                </div>
              </Link>

              <Link to="/college-admin/cases/analytics" className="action-card">
                <div className="action-icon-wrapper green">
                  <BarChart3 size={32} />
                </div>
                <div className="action-details">
                  <span className="action-title">Clinical Analytics</span>
                  <span className="action-subtitle">View disease prevalence, student activity and review velocities</span>
                </div>
              </Link>
            </div>
          </div>

          {/* Attention Required / Activity Stream */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.1rem', color: 'var(--text-primary)' }}>Pending Priority Reviews</h2>
              <Link to="/college-admin/cases/list" state={{ filterStatus: 'Pending' }} style={{ fontSize: '0.85rem', color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 600 }}>View All</Link>
            </div>
            
            <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: '12px', overflow: 'hidden' }}>
              {recentPending.length === 0 ? (
                <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                  <CheckCircle size={32} style={{ marginBottom: '0.5rem', opacity: 0.5 }} />
                  <p>No cases are currently pending review.</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {recentPending.map(c => (
                    <div key={c.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.5rem', borderBottom: '1px solid var(--border-color)' }}>
                      <div>
                        <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{c.studentName}</div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Assigned to: {c.preceptor}</div>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.25rem' }}>
                        <span className="status-pill status-pending">{c.status}</span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{new Date(c.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </CollegeAdminLayout>
  );
};

export default ClinicalCaseManagement;
