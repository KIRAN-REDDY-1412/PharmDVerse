import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { 
  ArrowLeft, Users, Activity, FileText, Download,
  TrendingUp, TrendingDown, Calendar, CheckCircle
} from 'lucide-react';
import './CollegeAnalytics.css';

const CollegeAnalytics = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <AdminLayout>
      <div className="college-analytics-container">
        
        <div className="analytics-header">
          <div className="analytics-title-area">
            <button className="icon-btn-small" onClick={() => navigate(`/super-admin/colleges/view/${id}`)}>
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="page-title">College Analytics</h1>
              <p className="page-subtitle">University of Texas Pharmacy ({id})</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button className="btn btn-secondary"><Download size={16}/> Export PDF</button>
            <button className="btn btn-secondary"><Download size={16}/> Export CSV</button>
          </div>
        </div>

        <div className="analytics-filters">
          <select className="form-select" style={{ flex: 1 }}>
            <option>All Academic Years</option>
            <option>2026-2027</option>
            <option>2025-2026</option>
          </select>
          <select className="form-select" style={{ flex: 1 }}>
            <option>All Departments</option>
            <option>Clinical Pharmacy</option>
            <option>Pharmaceutics</option>
          </select>
          <div className="search-box" style={{ flex: 2, margin: 0 }}>
            <Calendar size={18} color="var(--text-secondary)" />
            <input type="text" placeholder="Jan 1, 2026 - Jul 27, 2026" style={{ background: 'none', border: 'none', color: 'var(--text-color)', marginLeft: '8px', outline: 'none' }} />
          </div>
        </div>

        <div className="analytics-kpi-grid">
          <div className="kpi-card">
            <div className="kpi-title"><Users size={16} color="var(--primary-color)"/> Total Students</div>
            <div className="kpi-value">1,250</div>
            <div className="kpi-trend up"><TrendingUp size={14}/> +12% this year</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-title"><Activity size={16} color="var(--primary-color)"/> Today's Logins</div>
            <div className="kpi-value">428</div>
            <div className="kpi-trend up"><TrendingUp size={14}/> +5% vs yesterday</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-title"><FileText size={16} color="var(--primary-color)"/> Total Cases Logged</div>
            <div className="kpi-value">45,200</div>
            <div className="kpi-trend up"><TrendingUp size={14}/> +24% this month</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-title"><CheckCircle size={16} color="var(--success-color)"/> Approval Rate</div>
            <div className="kpi-value">98.2%</div>
            <div className="kpi-trend down"><TrendingDown size={14}/> -0.5% vs last month</div>
          </div>
        </div>

        <div className="charts-grid">
          <div className="chart-card">
            <h3 className="chart-title">Clinical Case Growth (Last 6 Months)</h3>
            <div className="mock-bar-chart">
              {[45, 60, 75, 50, 90, 110].map((val, i) => (
                <div key={i} className="mock-bar" style={{ height: `${val}%` }}>
                  <span className="mock-bar-value">{val * 10}</span>
                  <span className="mock-bar-label">M{i+1}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="chart-card">
            <h3 className="chart-title">Case Status Distribution</h3>
            <div className="mock-pie-container">
              <div className="mock-pie"></div>
              <div className="pie-legend">
                <div className="legend-item">
                  <div className="legend-color" style={{ backgroundColor: '#10b981' }}></div>
                  <span>Approved (60%)</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color" style={{ backgroundColor: '#3b82f6' }}></div>
                  <span>Pending (25%)</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color" style={{ backgroundColor: '#ef4444' }}></div>
                  <span>Rejected (15%)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </AdminLayout>
  );
};

export default CollegeAnalytics;
