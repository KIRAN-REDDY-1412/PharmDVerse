import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { 
  ArrowLeft, Search, Users, Shield, Database, 
  Zap, FileText, Download, Building2
} from 'lucide-react';
import './UsageMonitoring.css';

const UsageMonitoring = () => {
  const navigate = useNavigate();
  const [selectedCollege, setSelectedCollege] = useState('all');

  return (
    <AdminLayout>
      <div className="usage-container">
        
        <div className="usage-header">
          <div className="usage-title-area">
            <button className="icon-btn-small" onClick={() => navigate('/super-admin/subscriptions')}>
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="page-title">Usage Monitoring</h1>
              <p className="page-subtitle">Track resource utilization against plan caps.</p>
            </div>
          </div>
          <button className="btn btn-secondary"><Download size={18} /> Export Usage Report</button>
        </div>

        <div className="usage-filters">
          <div className="search-box" style={{ flex: 1, margin: 0 }}>
            <Building2 size={18} color="var(--text-secondary)" />
            <select 
              style={{ background: 'none', border: 'none', color: 'var(--text-color)', marginLeft: '8px', width: '100%', outline: 'none' }}
              value={selectedCollege}
              onChange={(e) => setSelectedCollege(e.target.value)}
            >
              <option value="all">-- All Network Aggregated --</option>
              <option value="c1">University of Texas Pharmacy (COL-001)</option>
              <option value="c2">Boston Healthcare College (COL-045)</option>
            </select>
          </div>
          <select className="form-select" style={{ width: '200px' }}>
            <option>Current Billing Cycle</option>
            <option>Previous Month</option>
            <option>All Time</option>
          </select>
        </div>

        {/* Dynamic Display based on selection. Mocking the display for "all" or "c1" */}
        
        <div className="usage-grid">
          
          {/* Students */}
          <div className="usage-card">
            <div className="usage-card-header">
              <h3 className="usage-card-title"><Users size={20} color="var(--primary-color)"/> Student Licenses</h3>
            </div>
            <div className="usage-metrics">
              <div className="metric-row">
                <span className="metric-label">Current Students</span>
                <span className="metric-value">1,250</span>
              </div>
              <div className="metric-row">
                <span className="metric-label">Maximum Allowed</span>
                <span className="metric-value">2,000</span>
              </div>
              <div className="metric-row">
                <span className="metric-label" style={{ color: '#10b981' }}>Remaining Capacity</span>
                <span className="metric-value" style={{ color: '#10b981' }}>750</span>
              </div>
            </div>
            <div className="usage-progress-container">
              <div className="usage-progress-header">
                <span>Utilization</span>
                <span>62.5%</span>
              </div>
              <div className="usage-progress-bar">
                <div className="usage-progress-fill" style={{ width: '62.5%' }}></div>
              </div>
            </div>
          </div>

          {/* Preceptors */}
          <div className="usage-card">
            <div className="usage-card-header">
              <h3 className="usage-card-title"><Shield size={20} color="var(--primary-color)"/> Preceptor Licenses</h3>
            </div>
            <div className="usage-metrics">
              <div className="metric-row">
                <span className="metric-label">Current Preceptors</span>
                <span className="metric-value">142</span>
              </div>
              <div className="metric-row">
                <span className="metric-label">Maximum Allowed</span>
                <span className="metric-value">150</span>
              </div>
              <div className="metric-row">
                <span className="metric-label" style={{ color: '#f59e0b' }}>Remaining Capacity</span>
                <span className="metric-value" style={{ color: '#f59e0b' }}>8</span>
              </div>
            </div>
            <div className="usage-progress-container">
              <div className="usage-progress-header">
                <span>Utilization</span>
                <span>94.6%</span>
              </div>
              <div className="usage-progress-bar">
                <div className="usage-progress-fill warning" style={{ width: '94.6%' }}></div>
              </div>
            </div>
          </div>

          {/* Storage */}
          <div className="usage-card">
            <div className="usage-card-header">
              <h3 className="usage-card-title"><Database size={20} color="var(--primary-color)"/> Document Storage</h3>
            </div>
            <div className="usage-metrics">
              <div className="metric-row">
                <span className="metric-label">Storage Used</span>
                <span className="metric-value">48.2 GB</span>
              </div>
              <div className="metric-row">
                <span className="metric-label">Total Allocated</span>
                <span className="metric-value">50.0 GB</span>
              </div>
              <div className="metric-row">
                <span className="metric-label" style={{ color: '#ef4444' }}>Remaining Capacity</span>
                <span className="metric-value" style={{ color: '#ef4444' }}>1.8 GB</span>
              </div>
            </div>
            <div className="usage-progress-container">
              <div className="usage-progress-header">
                <span>Utilization</span>
                <span>96.4%</span>
              </div>
              <div className="usage-progress-bar">
                <div className="usage-progress-fill danger" style={{ width: '96.4%' }}></div>
              </div>
            </div>
          </div>

          {/* AI Usage */}
          <div className="usage-card">
            <div className="usage-card-header">
              <h3 className="usage-card-title"><Zap size={20} color="var(--primary-color)"/> AI Analysis (Tokens)</h3>
            </div>
            <div className="usage-metrics">
              <div className="metric-row">
                <span className="metric-label">Tokens Used</span>
                <span className="metric-value">85,200</span>
              </div>
              <div className="metric-row">
                <span className="metric-label">Monthly Quota</span>
                <span className="metric-value">100,000</span>
              </div>
              <div className="metric-row">
                <span className="metric-label" style={{ color: '#10b981' }}>Remaining Capacity</span>
                <span className="metric-value" style={{ color: '#10b981' }}>14,800</span>
              </div>
            </div>
            <div className="usage-progress-container">
              <div className="usage-progress-header">
                <span>Utilization (Resets in 4 days)</span>
                <span>85.2%</span>
              </div>
              <div className="usage-progress-bar">
                <div className="usage-progress-fill warning" style={{ width: '85.2%' }}></div>
              </div>
            </div>
          </div>

          {/* Clinical Cases */}
          <div className="usage-card">
            <div className="usage-card-header">
              <h3 className="usage-card-title"><FileText size={20} color="var(--primary-color)"/> Clinical Cases</h3>
            </div>
            <div className="usage-metrics">
              <div className="metric-row">
                <span className="metric-label">Total Logged Cases</span>
                <span className="metric-value">45,200</span>
              </div>
              <div className="metric-row">
                <span className="metric-label">Cases This Month</span>
                <span className="metric-value">3,140</span>
              </div>
              <div className="metric-row">
                <span className="metric-label">Daily Average</span>
                <span className="metric-value">124 / day</span>
              </div>
            </div>
            <div style={{ marginTop: '24px', fontSize: '0.875rem', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
              No hard limits applied to clinical cases per Enterprise policy.
            </div>
          </div>

          {/* Reports */}
          <div className="usage-card">
            <div className="usage-card-header">
              <h3 className="usage-card-title"><FileText size={20} color="var(--primary-color)"/> Reports Generated</h3>
            </div>
            <div className="usage-metrics">
              <div className="metric-row">
                <span className="metric-label">PDF Exports</span>
                <span className="metric-value">1,402</span>
              </div>
              <div className="metric-row">
                <span className="metric-label">Excel / CSV Exports</span>
                <span className="metric-value">845</span>
              </div>
              <div className="metric-row">
                <span className="metric-label">Total Bandwidth</span>
                <span className="metric-value">14.2 GB</span>
              </div>
            </div>
            <div style={{ marginTop: '24px', fontSize: '0.875rem', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
              Unlimited report generation enabled.
            </div>
          </div>

        </div>
      </div>
    </AdminLayout>
  );
};

export default UsageMonitoring;
