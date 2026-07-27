import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, Users, FileText, BrainCircuit, 
  DollarSign, Activity, CheckCircle, Clock, 
  AlertTriangle, ShieldCheck, ArrowUpRight, 
  Server, HardDrive
} from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useDatabase } from '../../context/DatabaseContext';

const SuperAdminDashboard = () => {
  const { colleges = [], users = [], cases = [] } = useDatabase();

  const totalColleges = colleges.length;
  const activeColleges = colleges.filter(c => c.status === 'Active' || c.status === 'APPROVED' || c.status === 'ACTIVE').length;
  const inactiveColleges = colleges.filter(c => c.status === 'Suspended' || c.status === 'SUSPENDED' || c.status === 'Inactive').length;
  const totalCollegeAdmins = users.filter(u => u.role === 'admin' || u.role === 'college_admin').length;
  const totalStudents = users.filter(u => u.role === 'student').length;
  const totalPreceptors = users.filter(u => u.role === 'preceptor').length;
  const totalCases = cases.length;
  const approvedCases = cases.filter(c => c.overallStatus === 'APPROVED' || c.status === 'Approved').length;
  const pendingCases = cases.filter(c => c.overallStatus === 'UNDER_REVIEW' || c.status === 'Submitted' || c.status === 'Under Review').length;

  return (
    <AdminLayout>
      <div style={{ padding: '2rem' }}>
        
        {/* Row 1: Platform Health & Welcome */}
        <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem', alignItems: 'stretch' }}>
          <div style={{ flex: '1', background: 'var(--color-primary)', color: 'white', padding: '2rem', borderRadius: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.5rem' }}>Global Command Center</h1>
            <p style={{ opacity: 0.9 }}>Welcome back, System Admin. Here is the aggregate view of the PharmDVerse platform.</p>
          </div>
          
          <div style={{ width: '400px', background: 'var(--bg-surface)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>Platform Health</h3>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#16a34a', fontSize: '0.85rem', fontWeight: 600, background: '#dcfce7', padding: '4px 8px', borderRadius: '12px' }}>
                <CheckCircle size={14} /> Operational
              </span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Server size={14} /> API Latency</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 600 }}>42ms</div>
              </div>
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}><HardDrive size={14} /> DB Load</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 600 }}>18%</div>
              </div>
            </div>
          </div>
        </div>

        {/* Row 2: Global Topline KPIs */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
          
          <div style={{ background: 'var(--bg-surface)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div style={{ background: '#eff6ff', padding: '0.75rem', borderRadius: '8px', color: '#3b82f6' }}><Building2 size={24} /></div>
              <ArrowUpRight size={20} color="#16a34a" />
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>{totalColleges}</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Total Registered Colleges</div>
          </div>

          <div style={{ background: 'var(--bg-surface)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div style={{ background: '#dcfce7', padding: '0.75rem', borderRadius: '8px', color: '#16a34a' }}><ShieldCheck size={24} /></div>
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>{activeColleges}</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Active Colleges</div>
          </div>

          <div style={{ background: 'var(--bg-surface)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div style={{ background: '#fee2e2', padding: '0.75rem', borderRadius: '8px', color: '#dc2626' }}><AlertTriangle size={24} /></div>
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>{inactiveColleges}</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Inactive / Suspended</div>
          </div>

          <div style={{ background: 'var(--bg-surface)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div style={{ background: '#f3e8ff', padding: '0.75rem', borderRadius: '8px', color: '#9333ea' }}><Users size={24} /></div>
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>{totalCollegeAdmins}</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Total College Admins</div>
          </div>

        </div>

        {/* Row 3: User & Case Aggregates */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
          
          <div style={{ background: 'var(--bg-surface)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <h3 style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>Platform Users</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div>
                <div style={{ fontSize: '1.75rem', fontWeight: 700 }}>{totalStudents}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Total Students</div>
              </div>
              <div style={{ width: '1px', height: '40px', background: 'var(--border-color)' }}></div>
              <div>
                <div style={{ fontSize: '1.75rem', fontWeight: 700 }}>{totalPreceptors}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Total Preceptors</div>
              </div>
            </div>
          </div>

          <div style={{ background: 'var(--bg-surface)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <h3 style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>Clinical Case Analytics</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div>
                <div style={{ fontSize: '1.75rem', fontWeight: 700 }}>{totalCases}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Total Cases Submitted</div>
              </div>
              <div style={{ width: '1px', height: '40px', background: 'var(--border-color)' }}></div>
              <div>
                <div style={{ fontSize: '1.75rem', fontWeight: 700 }}>{approvedCases}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Approved ({pendingCases} Pending)</div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </AdminLayout>
  );
};

export default SuperAdminDashboard;
