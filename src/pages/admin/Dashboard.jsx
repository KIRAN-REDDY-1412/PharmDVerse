import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, Users, FileText, BrainCircuit, 
  DollarSign, Activity, CheckCircle, Clock, 
  AlertTriangle, ShieldCheck, ArrowUpRight, 
  Server, HardDrive
} from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';

const SuperAdminDashboard = () => {
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
            <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>142</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Total Registered Colleges</div>
          </div>

          <div style={{ background: 'var(--bg-surface)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div style={{ background: '#dcfce7', padding: '0.75rem', borderRadius: '8px', color: '#16a34a' }}><ShieldCheck size={24} /></div>
              <span style={{ fontSize: '0.8rem', color: '#16a34a', fontWeight: 600 }}>+3 this week</span>
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>138</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Active Colleges</div>
          </div>

          <div style={{ background: 'var(--bg-surface)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div style={{ background: '#fee2e2', padding: '0.75rem', borderRadius: '8px', color: '#dc2626' }}><AlertTriangle size={24} /></div>
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>4</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Inactive / Suspended</div>
          </div>

          <div style={{ background: 'var(--bg-surface)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div style={{ background: '#f3e8ff', padding: '0.75rem', borderRadius: '8px', color: '#9333ea' }}><Users size={24} /></div>
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>312</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Total College Admins</div>
          </div>

        </div>

        {/* Row 3: User & Case Aggregates */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
          
          <div style={{ background: 'var(--bg-surface)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <h3 style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>Platform Users</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div>
                <div style={{ fontSize: '1.75rem', fontWeight: 700 }}>45,210</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Total Students</div>
              </div>
              <div style={{ width: '1px', height: '40px', background: 'var(--border-color)' }}></div>
              <div>
                <div style={{ fontSize: '1.75rem', fontWeight: 700 }}>3,480</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Total Preceptors</div>
              </div>
            </div>
            <div style={{ width: '100%', height: '8px', borderRadius: '4px', display: 'flex', overflow: 'hidden' }}>
              <div style={{ width: '92%', background: '#3b82f6' }}></div>
              <div style={{ width: '8%', background: '#f59e0b' }}></div>
            </div>
          </div>

          <div style={{ background: 'var(--bg-surface)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-color)', gridColumn: 'span 2' }}>
            <h3 style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>Clinical Case Analytics (Global)</h3>
            <div style={{ display: 'flex', gap: '3rem' }}>
              <div>
                <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--color-primary)' }}>1.2M</div>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Total Cases Submitted</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1rem', flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '40px', color: '#16a34a', display: 'flex', alignItems: 'center', gap: '0.25rem' }}><CheckCircle size={16}/> 82%</div>
                  <div style={{ flex: 1, height: '8px', background: 'var(--bg-surface-alt)', borderRadius: '4px', overflow: 'hidden' }}><div style={{ width: '82%', height: '100%', background: '#16a34a' }}></div></div>
                  <div style={{ width: '80px', textAlign: 'right', fontSize: '0.85rem' }}>Approved</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '40px', color: '#f59e0b', display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Clock size={16}/> 18%</div>
                  <div style={{ flex: 1, height: '8px', background: 'var(--bg-surface-alt)', borderRadius: '4px', overflow: 'hidden' }}><div style={{ width: '18%', height: '100%', background: '#f59e0b' }}></div></div>
                  <div style={{ width: '80px', textAlign: 'right', fontSize: '0.85rem' }}>Pending</div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Row 4: Financial & AI Intelligence */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
          
          <div style={{ background: 'var(--bg-surface)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div>
                <h3 style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>Platform Revenue Summary</h3>
                <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '0.5rem' }}>$1,854,000 <span style={{ fontSize: '1rem', color: '#16a34a', fontWeight: 500 }}>MRR</span></div>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.8rem', padding: '4px 8px', background: 'var(--bg-surface-alt)', borderRadius: '12px' }}>Standard: 42</span>
                <span style={{ fontSize: '0.8rem', padding: '4px 8px', background: '#e0e7ff', color: '#4338ca', borderRadius: '12px' }}>Professional: 86</span>
                <span style={{ fontSize: '0.8rem', padding: '4px 8px', background: '#fae8ff', color: '#a21caf', borderRadius: '12px' }}>Enterprise: 14</span>
              </div>
            </div>
            {/* Mock Chart Area */}
            <div style={{ height: '150px', background: 'var(--bg-main)', borderRadius: '8px', position: 'relative', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%', background: 'linear-gradient(0deg, rgba(22,163,74,0.1) 0%, rgba(255,255,255,0) 100%)' }}></div>
              <svg viewBox="0 0 100 30" style={{ position: 'absolute', bottom: 0, width: '100%', height: '100%', stroke: '#16a34a', strokeWidth: 1.5, fill: 'none' }}>
                <path d="M0 25 L10 24 L20 22 L30 18 L40 19 L50 15 L60 12 L70 10 L80 8 L90 5 L100 2" />
              </svg>
            </div>
          </div>

          <div style={{ background: 'var(--bg-surface)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <h3 style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>AI Usage Summary</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Global SOAP generations vs monthly server limits.</p>
            
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
              <div style={{ position: 'relative', width: '120px', height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', background: 'conic-gradient(#8b5cf6 0% 75%, var(--bg-surface-alt) 75% 100%)' }}>
                <div style={{ position: 'absolute', inset: '10px', background: 'var(--bg-surface)', borderRadius: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <BrainCircuit color="#8b5cf6" size={24} style={{ marginBottom: '0.25rem' }} />
                  <span style={{ fontSize: '1.25rem', fontWeight: 700 }}>75%</span>
                </div>
              </div>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              <span>1.5M Used</span>
              <span>2.0M Limit</span>
            </div>
          </div>

        </div>

        {/* Row 5: Chronological Feeds */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          
          <div style={{ background: 'var(--bg-surface)', borderRadius: '12px', border: '1px solid var(--border-color)', overflow: 'hidden' }}>
            <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Recent College Registrations</h3>
              <Link to="/super-admin/colleges" style={{ fontSize: '0.85rem', color: 'var(--color-primary)', textDecoration: 'none' }}>View All</Link>
            </div>
            <div>
              {[
                { name: 'University of Texas Pharmacy', plan: 'Enterprise', date: '2 hours ago' },
                { name: 'Boston Healthcare College', plan: 'Professional', date: '5 hours ago' },
                { name: 'Seattle Clinical Institute', plan: 'Standard', date: '1 day ago' },
              ].map((college, i) => (
                <div key={i} style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{college.name}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{college.date}</div>
                  </div>
                  <span style={{ fontSize: '0.75rem', padding: '4px 8px', background: 'var(--bg-surface-alt)', borderRadius: '4px', fontWeight: 600 }}>{college.plan}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: 'var(--bg-surface)', borderRadius: '12px', border: '1px solid var(--border-color)', overflow: 'hidden' }}>
            <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-text)', margin: 0 }}>Upcoming Renewals</h2>
              <Link to="/super-admin/subscriptions" style={{ fontSize: '0.85rem', color: 'var(--color-primary)', textDecoration: 'none' }}>View All</Link>
            </div>
            <div>
              {[
                { action: 'Super Admin "John" exported global revenue CSV.', icon: <DollarSign size={16} color="#16a34a" /> },
                { action: 'System deployed PharmDVerse v2.4 successfully.', icon: <Activity size={16} color="#3b82f6" /> },
                { action: 'Database sync latency detected in US-East zone.', icon: <AlertTriangle size={16} color="#f59e0b" /> },
              ].map((alert, i) => (
                <div key={i} style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ background: 'var(--bg-surface-alt)', padding: '8px', borderRadius: '50%' }}>
                    {alert.icon}
                  </div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{alert.action}</div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </AdminLayout>
  );
};

export default SuperAdminDashboard;
