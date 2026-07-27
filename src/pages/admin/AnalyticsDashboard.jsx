import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { 
  Building2, Users, FileText, CheckCircle, Clock, 
  XOctagon, Zap, CreditCard, DollarSign, Activity, 
  Download, Filter, TrendingUp
} from 'lucide-react';
import './AnalyticsDashboard.css';
import './UserManagement.css'; // Reuse KPI card styles

const AnalyticsDashboard = () => {
  const navigate = useNavigate();

  return (
    <AdminLayout>
      <div className="analytics-container">
        
        <div className="analytics-header">
          <div>
            <h1 className="analytics-title">Platform Analytics</h1>
            <p className="analytics-subtitle">Global intelligence and data trends across all modules.</p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button className="btn btn-secondary" onClick={() => navigate('/super-admin/analytics/reports')}>
              <FileText size={18} /> Report Generator
            </button>
            <button className="btn btn-primary">
              <Download size={18} /> Export Dashboard Data
            </button>
          </div>
        </div>

        {/* Global KPIs */}
        <div className="analytics-kpi-grid">
          <div className="kpi-card">
            <div className="kpi-header">
              <span className="kpi-title">Total Colleges</span>
              <div className="kpi-icon blue"><Building2 size={16} /></div>
            </div>
            <div className="kpi-value">142</div>
            <div className="kpi-subtext" style={{ color: '#10b981' }}>+4 this quarter</div>
          </div>
          
          <div className="kpi-card">
            <div className="kpi-header">
              <span className="kpi-title">Total Users</span>
              <div className="kpi-icon purple"><Users size={16} /></div>
            </div>
            <div className="kpi-value">124K</div>
            <div className="kpi-subtext" style={{ color: '#10b981' }}>+12% YoY</div>
          </div>

          <div className="kpi-card">
            <div className="kpi-header">
              <span className="kpi-title">Total Clinical Cases</span>
              <div className="kpi-icon green"><FileText size={16} /></div>
            </div>
            <div className="kpi-value">2.4M</div>
            <div className="kpi-subtext">Cumulative logged cases</div>
          </div>

          <div className="kpi-card">
            <div className="kpi-header">
              <span className="kpi-title">Platform Revenue (MRR)</span>
              <div className="kpi-icon warning"><DollarSign size={16} /></div>
            </div>
            <div className="kpi-value">$1.2M</div>
            <div className="kpi-subtext" style={{ color: '#10b981' }}>+5.2% this month</div>
          </div>
          
          <div className="kpi-card">
            <div className="kpi-header">
              <span className="kpi-title">Approved Cases</span>
              <div className="kpi-icon green"><CheckCircle size={16} /></div>
            </div>
            <div className="kpi-value">1.8M</div>
            <div className="kpi-subtext">75% approval rate</div>
          </div>
          
          <div className="kpi-card">
            <div className="kpi-header">
              <span className="kpi-title">Pending Reviews</span>
              <div className="kpi-icon warning"><Clock size={16} /></div>
            </div>
            <div className="kpi-value">45K</div>
            <div className="kpi-subtext">Avg Turnaround: 24h</div>
          </div>

          <div className="kpi-card">
            <div className="kpi-header">
              <span className="kpi-title">Rejected Cases</span>
              <div className="kpi-icon danger"><XOctagon size={16} /></div>
            </div>
            <div className="kpi-value">55K</div>
            <div className="kpi-subtext" style={{ color: '#ef4444' }}>Needs intervention</div>
          </div>

          <div className="kpi-card">
            <div className="kpi-header">
              <span className="kpi-title">AI Token Usage</span>
              <div className="kpi-icon purple"><Zap size={16} /></div>
            </div>
            <div className="kpi-value">12.5M</div>
            <div className="kpi-subtext">Tokens processed this month</div>
          </div>
        </div>

        <div className="analytics-chart-grid">
          
          {/* Revenue Analysis */}
          <div className="analytics-chart-card">
            <div className="chart-header">
              <h3 className="chart-title">Revenue Growth Trend</h3>
              <div className="chart-filters">
                <select><option>Year-to-Date</option><option>Last 12 Months</option></select>
              </div>
            </div>
            <div className="mock-area-chart" style={{ marginLeft: '40px' }}>
              <div className="y-axis-labels">
                <span>$2M</span><span>$1.5M</span><span>$1M</span><span>$0.5M</span><span>$0</span>
              </div>
              <div className="mock-area-fill"></div>
              <div className="x-axis-labels">
                <span>Jan</span><span>Mar</span><span>May</span><span>Jul</span><span>Sep</span><span>Nov</span>
              </div>
            </div>
          </div>

          {/* Clinical Case Trends */}
          <div className="analytics-chart-card">
            <div className="chart-header">
              <h3 className="chart-title">Clinical Case Submissions</h3>
              <div className="chart-filters">
                <select><option>Last 6 Months</option></select>
              </div>
            </div>
            <div className="mock-bar-chart" style={{ height: '200px' }}>
              {[45, 55, 48, 70, 65, 80].map((val, i) => (
                <div key={i} className="mock-bar" style={{ height: `${val}%`, backgroundColor: '#10b981' }}>
                  <span className="mock-bar-label">M{i+1}</span>
                </div>
              ))}
            </div>
          </div>

          {/* User Registration Trends */}
          <div className="analytics-chart-card">
            <div className="chart-header">
              <h3 className="chart-title">New User Registrations</h3>
              <div className="chart-filters">
                <select><option>Last 30 Days</option></select>
              </div>
            </div>
            <div className="mock-area-chart" style={{ marginLeft: '40px' }}>
               <div className="mock-area-fill" style={{ background: 'linear-gradient(180deg, rgba(245, 158, 11, 0.2) 0%, rgba(245, 158, 11, 0) 100%)', clipPath: 'polygon(0% 100%, 0% 80%, 25% 60%, 50% 90%, 75% 40%, 100% 20%, 100% 100%)' }}></div>
               <div className="x-axis-labels">
                <span>Week 1</span><span>Week 2</span><span>Week 3</span><span>Week 4</span>
              </div>
            </div>
          </div>

          {/* User Activity heatmap / generic visual */}
          <div className="analytics-chart-card">
            <div className="chart-header">
              <h3 className="chart-title">Platform Activity (Daily Logins)</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', height: '200px', justifyContent: 'center' }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                 <div style={{ width: '80px', fontSize: '0.875rem' }}>Students</div>
                 <div style={{ flex: 1, height: '12px', backgroundColor: 'var(--bg-color)', borderRadius: '6px' }}>
                   <div style={{ width: '85%', height: '100%', backgroundColor: '#10b981', borderRadius: '6px' }}></div>
                 </div>
               </div>
               <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                 <div style={{ width: '80px', fontSize: '0.875rem' }}>Preceptors</div>
                 <div style={{ flex: 1, height: '12px', backgroundColor: 'var(--bg-color)', borderRadius: '6px' }}>
                   <div style={{ width: '60%', height: '100%', backgroundColor: '#3b82f6', borderRadius: '6px' }}></div>
                 </div>
               </div>
               <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                 <div style={{ width: '80px', fontSize: '0.875rem' }}>Admins</div>
                 <div style={{ flex: 1, height: '12px', backgroundColor: 'var(--bg-color)', borderRadius: '6px' }}>
                   <div style={{ width: '30%', height: '100%', backgroundColor: '#8b5cf6', borderRadius: '6px' }}></div>
                 </div>
               </div>
            </div>
          </div>

        </div>

      </div>
    </AdminLayout>
  );
};

export default AnalyticsDashboard;
