import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { 
  Plus, Link as LinkIcon, RefreshCw, AlertTriangle,
  Building2, CreditCard, Activity, XOctagon,
  Calendar, DollarSign, Users, PieChart
} from 'lucide-react';
import './SubscriptionDashboard.css';

const SubscriptionDashboard = () => {
  const navigate = useNavigate();

  return (
    <AdminLayout>
      <div className="sub-dashboard-container">
        
        <div className="sub-dash-header">
          <div>
            <h1 className="sub-dash-title">Subscription Dashboard</h1>
            <p className="sub-dash-subtitle">Enterprise revenue, billing, and license overview.</p>
          </div>
          <button className="btn btn-secondary" onClick={() => navigate('/super-admin/subscriptions/list')}>
            View All Subscriptions
          </button>
        </div>

        <div className="quick-actions-bar">
          <button className="qa-btn" onClick={() => navigate('/super-admin/subscriptions/plans/create')}>
            <Plus size={18} /> Create Plan
          </button>
          <button className="qa-btn" onClick={() => navigate('/super-admin/subscriptions/assign')}>
            <LinkIcon size={18} /> Assign Plan
          </button>
          <button className="qa-btn" onClick={() => navigate('/super-admin/subscriptions/list')}>
            <RefreshCw size={18} /> Renew Plan
          </button>
          <button className="qa-btn" onClick={() => navigate('/super-admin/subscriptions/alerts')}>
            <AlertTriangle size={18} /> View Expiring Plans
          </button>
        </div>

        <div className="sub-kpi-grid">
          <div className="kpi-card">
            <div className="kpi-header">
              <span className="kpi-title">Total Colleges</span>
              <div className="kpi-icon blue"><Building2 size={16} /></div>
            </div>
            <div className="kpi-value">156</div>
            <div className="kpi-subtext" style={{ color: '#10b981' }}>+4 this month</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-header">
              <span className="kpi-title">Active Subscriptions</span>
              <div className="kpi-icon green"><CheckCircle size={16} /></div>
            </div>
            <div className="kpi-value">142</div>
            <div className="kpi-subtext">Across all tiers</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-header">
              <span className="kpi-title">Trial Plans</span>
              <div className="kpi-icon purple"><Activity size={16} /></div>
            </div>
            <div className="kpi-value">8</div>
            <div className="kpi-subtext">Awaiting conversion</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-header">
              <span className="kpi-title">Expired Plans</span>
              <div className="kpi-icon danger"><XOctagon size={16} /></div>
            </div>
            <div className="kpi-value">6</div>
            <div className="kpi-subtext" style={{ color: '#ef4444' }}>Require action</div>
          </div>
          
          <div className="kpi-card">
            <div className="kpi-header">
              <span className="kpi-title">Renewals Due (30d)</span>
              <div className="kpi-header">
                <div className="kpi-icon warning"><Calendar size={16} /></div>
              </div>
            </div>
            <div className="kpi-value">12</div>
            <div className="kpi-subtext">Est. value: $145,000</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-header">
              <span className="kpi-title">Monthly Revenue</span>
              <div className="kpi-icon green"><DollarSign size={16} /></div>
            </div>
            <div className="kpi-value">$2.4M</div>
            <div className="kpi-subtext" style={{ color: '#10b981' }}>+12% MRR Growth</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-header">
              <span className="kpi-title">Total Licenses</span>
              <div className="kpi-icon blue"><Users size={16} /></div>
            </div>
            <div className="kpi-value">145K</div>
            <div className="kpi-subtext">Active student seats</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-header">
              <span className="kpi-title">License Utilization</span>
              <div className="kpi-icon purple"><PieChart size={16} /></div>
            </div>
            <div className="kpi-value">84%</div>
            <div className="kpi-subtext">Average network usage</div>
          </div>
        </div>

        <div className="charts-grid">
          {/* Subscription Distribution */}
          <div className="chart-card">
            <h3 className="chart-title">Subscription Distribution</h3>
            <div className="mock-pie-container">
              <div className="mock-pie plan-dist"></div>
              <div className="pie-legend">
                <div className="legend-item">
                  <div className="legend-color" style={{ backgroundColor: '#8b5cf6' }}></div>
                  <span>Enterprise (40%)</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color" style={{ backgroundColor: '#3b82f6' }}></div>
                  <span>Professional (35%)</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color" style={{ backgroundColor: '#10b981' }}></div>
                  <span>Basic (15%)</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color" style={{ backgroundColor: '#64748b' }}></div>
                  <span>Trial (10%)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Monthly Revenue */}
          <div className="chart-card">
            <h3 className="chart-title">Monthly Revenue (MRR)</h3>
            <div className="mock-bar-chart">
              {[60, 65, 75, 70, 85, 95].map((val, i) => (
                <div key={i} className="mock-bar" style={{ height: `${val}%`, backgroundColor: '#10b981' }}>
                  <span className="mock-bar-label">M{i+1}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Renewal Trends */}
          <div className="chart-card">
            <h3 className="chart-title">Upcoming Renewals by Month</h3>
            <div className="mock-bar-chart">
              {[20, 15, 30, 45, 25, 40].map((val, i) => (
                <div key={i} className="mock-bar" style={{ height: `${val}%`, backgroundColor: '#f59e0b' }}>
                  <span className="mock-bar-label">M{i+1}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Plan Usage */}
          <div className="chart-card">
            <h3 className="chart-title">Total Student Licenses by Plan</h3>
            <div className="mock-bar-chart">
              {[95, 75, 40, 15].map((val, i) => {
                const labels = ['Enterprise', 'Professional', 'Basic', 'Trial'];
                return (
                  <div key={i} className="mock-bar" style={{ height: `${val}%`, backgroundColor: '#3b82f6' }}>
                    <span className="mock-bar-label" style={{ fontSize: '0.65rem' }}>{labels[i]}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

      </div>
    </AdminLayout>
  );
};

// Simple stub for CheckCircle since it wasn't imported in lucide list above, adding directly for completeness
const CheckCircle = ({ size }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
);

export default SubscriptionDashboard;
