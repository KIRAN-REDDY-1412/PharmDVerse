import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { 
  Users, UserCheck, UserX, Shield, 
  ArrowUpRight, List, Download, Activity,
  GraduationCap, Stethoscope, Building
} from 'lucide-react';
import './UserManagement.css';
import './SubscriptionDashboard.css'; // Reusing some chart styles

const UserDashboard = () => {
  const navigate = useNavigate();

  return (
    <AdminLayout>
      <div className="user-mgmt-container">
        
        <div className="user-mgmt-header">
          <div>
            <h1 className="user-mgmt-title">User Management Dashboard</h1>
            <p className="user-mgmt-subtitle">Platform-wide overview of all roles and active sessions.</p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button className="btn btn-secondary" onClick={() => navigate('/super-admin/users/list')}>
              <List size={18} /> User Directory
            </button>
            <button className="btn btn-primary">
              <Download size={18} /> Export Global Directory
            </button>
          </div>
        </div>

        <div className="kpi-grid">
          <div className="kpi-card">
            <div className="kpi-header">
              <span className="kpi-title">Total Platform Users</span>
              <div className="kpi-icon blue"><Users size={16} /></div>
            </div>
            <div className="kpi-value">124,592</div>
            <div className="kpi-subtext" style={{ color: '#10b981' }}><ArrowUpRight size={12} style={{display:'inline'}}/> +2.4% this month</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-header">
              <span className="kpi-title">Active Students</span>
              <div className="kpi-icon green"><GraduationCap size={16} /></div>
            </div>
            <div className="kpi-value">112,040</div>
            <div className="kpi-subtext">Across 142 colleges</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-header">
              <span className="kpi-title">Active Preceptors</span>
              <div className="kpi-icon purple"><Stethoscope size={16} /></div>
            </div>
            <div className="kpi-value">12,105</div>
            <div className="kpi-subtext">Ratio: ~1:9 (Preceptor to Student)</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-header">
              <span className="kpi-title">College Administrators</span>
              <div className="kpi-icon warning"><Building size={16} /></div>
            </div>
            <div className="kpi-value">426</div>
            <div className="kpi-subtext">Avg 3 admins per college</div>
          </div>
        </div>

        <div className="charts-grid">
          <div className="chart-card">
            <h3 className="chart-title">User Growth Trend (2026)</h3>
            <div className="mock-bar-chart" style={{ height: '250px' }}>
              {[30, 45, 40, 60, 75, 80, 95].map((val, i) => (
                <div key={i} className="mock-bar" style={{ height: `${val}%`, backgroundColor: 'var(--primary-color)' }}>
                  <span className="mock-bar-label">Month {i+1}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="chart-card">
            <h3 className="chart-title">Role Distribution</h3>
            <div className="mock-pie-container" style={{ height: '250px' }}>
              <div className="mock-pie" style={{ 
                background: 'conic-gradient(#10b981 0% 85%, #3b82f6 85% 95%, #8b5cf6 95% 99%, #ef4444 99% 100%)' 
              }}></div>
            </div>
            <div className="pie-legend" style={{ marginTop: '24px' }}>
              <div className="legend-item"><div className="legend-color" style={{backgroundColor: '#10b981'}}></div> Students (85%)</div>
              <div className="legend-item"><div className="legend-color" style={{backgroundColor: '#3b82f6'}}></div> Preceptors (10%)</div>
              <div className="legend-item"><div className="legend-color" style={{backgroundColor: '#8b5cf6'}}></div> College Admins (4%)</div>
              <div className="legend-item"><div className="legend-color" style={{backgroundColor: '#ef4444'}}></div> Super Admins (1%)</div>
            </div>
          </div>
        </div>

        <div className="kpi-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
           <div className="kpi-card" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div className="kpi-icon green" style={{ width: '48px', height: '48px' }}><UserCheck size={24} /></div>
              <div>
                <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>120,442</div>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Currently Active Users</div>
              </div>
           </div>
           <div className="kpi-card" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div className="kpi-icon warning" style={{ width: '48px', height: '48px' }}><Activity size={24} /></div>
              <div>
                <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>3,150</div>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Inactive (&gt;30 Days)</div>
              </div>
           </div>
           <div className="kpi-card" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div className="kpi-icon danger" style={{ width: '48px', height: '48px' }}><UserX size={24} /></div>
              <div>
                <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>21</div>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Suspended / Locked</div>
              </div>
           </div>
        </div>

      </div>
    </AdminLayout>
  );
};

export default UserDashboard;
