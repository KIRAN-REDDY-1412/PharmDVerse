import React from 'react';
import { Users, GraduationCap, ClipboardList, BadgeCheck, Clock3, RotateCcw, Calendar, BookOpen, ArrowRight , User, MessageSquare, Pill, Activity, AlertTriangle, AlertCircle, Clock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import CollegeAdminLayout from '../../components/college/CollegeAdminLayout';
import { useDatabase } from '../../context/DatabaseContext';
import './Dashboard.css';

const CollegeAdminDashboard = () => {
  const { users, cases, academicYears } = useDatabase();
  const navigate = useNavigate();

  const activeYear = academicYears?.find(y => y.status === 'Active')?.name || 'N/A';

  const preceptors = users.filter(u => u.role === 'preceptor');
  const students = users.filter(u => u.role === 'student');

  const totalPreceptors = preceptors.length;
  const totalStudents = students.length;
  const totalCases = cases.length;
  const approvedCases = cases.filter(c => c.status === 'Approved').length;
  const pendingCases = cases.filter(c => c.status === 'Pending' || c.status === 'Submitted').length;
  const returnedCases = cases.filter(c => c.status === 'Returned').length;

  // Derived Action Required Stats
  const unassignedStudents = students.filter(s => !s.assignedPreceptorId).length;
  const inactiveStudents = students.filter(s => s.status === 'Inactive').length;
  const inactivePreceptors = preceptors.filter(p => p.status === 'Inactive').length;
  
  // Mock Recent Activities
  const recentActivities = [
    { id: 1, title: 'New Student Registered', desc: 'John Doe (Y26PHD0301) was added to the system.', time: '10 mins ago', type: 'student' },
    { id: 2, title: 'Clinical Case Submitted', desc: 'Jane Smith submitted a new Patient Counseling case.', time: '1 hour ago', type: 'case' },
    { id: 3, title: 'Clinical Case Returned', desc: 'Dr. Sarah Jenkins returned Case #CAS-2025-001 for revision.', time: '3 hours ago', type: 'case' },
    { id: 4, title: 'Student Assigned to Preceptor', desc: 'Michael Chen was assigned to Dr. Michael Chen.', time: '1 day ago', type: 'assignment' }
  ];

  return (
    <CollegeAdminLayout>
      <div style={{ padding: '1rem 0 2rem 0' }}>
        <div className="dashboard-container">
          
          {/* Welcome Banner */}
          <div className="welcome-banner">
            <div className="welcome-content">
              <h1 className="welcome-title">Welcome, College Administrator!</h1>
              <p className="welcome-subtitle">Manage students, preceptors, assignments and clinical activities from one centralized dashboard.</p>
            </div>
            <div className="welcome-info">
              <div className="info-block">
                <Calendar className="info-icon" size={24} />
                <div className="info-text">
                  <span className="info-date">{new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                  <span className="info-day">{new Date().toLocaleDateString('en-GB', { weekday: 'long' })}</span>
                </div>
              </div>
              <div className="info-block">
                <BookOpen className="info-icon" size={24} />
                <div className="info-text">
                  <span className="info-date">Academic Year</span>
                  <span className="info-day">{activeYear}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Primary Stat Cards */}
          <div className="primary-cards-grid">
            <div className="dashboard-card" onClick={() => navigate('/college-admin/preceptors/list')} style={{ cursor: 'pointer' }}>
              <div className="primary-card-content">
                <div className="card-icon-wrapper icon-blue">
                  <Users size={32} />
                </div>
                <div className="card-stats">
                  <span className="card-title">Total Preceptors</span>
                  <span className="card-value">{totalPreceptors.toLocaleString()}</span>
                </div>
              </div>
              <Link to="/college-admin/preceptors/list" className="card-link link-blue" onClick={e => e.stopPropagation()}>
                View all preceptors <ArrowRight size={14} />
              </Link>
            </div>

            <div className="dashboard-card" onClick={() => navigate('/college-admin/students/list')} style={{ cursor: 'pointer' }}>
              <div className="primary-card-content">
                <div className="card-icon-wrapper icon-green">
                  <GraduationCap size={32} />
                </div>
                <div className="card-stats">
                  <span className="card-title">Total Students</span>
                  <span className="card-value">{totalStudents.toLocaleString()}</span>
                </div>
              </div>
              <Link to="/college-admin/students/list" className="card-link link-green" onClick={e => e.stopPropagation()}>
                View all students <ArrowRight size={14} />
              </Link>
            </div>

            <div className="dashboard-card" onClick={() => navigate('/college-admin/cases/list')} style={{ cursor: 'pointer' }}>
              <div className="primary-card-content">
                <div className="card-icon-wrapper secondary icon-purple">
                  <ClipboardList size={32} />
                </div>
                <div className="card-stats">
                  <span className="card-title">Total Clinical Cases</span>
                  <span className="card-value">{totalCases.toLocaleString()}</span>
                </div>
              </div>
              <Link to="/college-admin/cases/list" className="card-link link-purple" onClick={e => e.stopPropagation()}>
                View all cases <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Secondary Stat Cards */}
          <div className="secondary-cards-grid">
            <div className="dashboard-card" onClick={() => navigate('/college-admin/cases/list', { state: { filterStatus: 'Pending' } })} style={{ cursor: 'pointer' }}>
              <div className="secondary-card-content">
                <div className="card-icon-wrapper secondary icon-orange">
                  <Clock3 size={24} />
                </div>
                <div className="card-stats">
                  <span className="card-title">Cases Under Review</span>
                  <span className="card-value">{pendingCases.toLocaleString()}</span>
                </div>
              </div>
              <Link to="/college-admin/cases/list" state={{ filterStatus: 'Pending' }} className="card-link link-orange" onClick={e => e.stopPropagation()}>
                View cases under review <ArrowRight size={14} />
              </Link>
            </div>

            <div className="dashboard-card" onClick={() => navigate('/college-admin/cases/list', { state: { filterStatus: 'Approved' } })} style={{ cursor: 'pointer' }}>
              <div className="secondary-card-content">
                <div className="card-icon-wrapper secondary icon-green">
                  <BadgeCheck size={24} />
                </div>
                <div className="card-stats">
                  <span className="card-title">Approved Cases</span>
                  <span className="card-value">{approvedCases.toLocaleString()}</span>
                </div>
              </div>
              <Link to="/college-admin/cases/list" state={{ filterStatus: 'Approved' }} className="card-link link-green" onClick={e => e.stopPropagation()}>
                View all approved cases <ArrowRight size={14} />
              </Link>
            </div>

            <div className="dashboard-card" onClick={() => navigate('/college-admin/cases/list', { state: { filterStatus: 'Returned' } })} style={{ cursor: 'pointer' }}>
              <div className="secondary-card-content">
                <div className="card-icon-wrapper secondary icon-red">
                  <RotateCcw size={24} />
                </div>
                <div className="card-stats">
                  <span className="card-title">Returned Cases</span>
                  <span className="card-value">{returnedCases.toLocaleString()}</span>
                </div>
              </div>
              <Link to="/college-admin/cases/list" state={{ filterStatus: 'Returned' }} className="card-link link-red" onClick={e => e.stopPropagation()}>
                View returned cases <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Action Required */}
          <div style={{ marginTop: '1rem', backgroundColor: 'var(--bg-surface)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-color)', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
            <h2 style={{ fontSize: '1.15rem', color: 'var(--text-primary)', marginBottom: '1.25rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <AlertCircle size={20} style={{ color: 'var(--color-danger)' }} /> Action Required
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {unassignedStudents > 0 && (
                <div onClick={() => navigate('/college-admin/assign-students/list')} style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', backgroundColor: 'var(--bg-surface-alt)', borderRadius: '8px', cursor: 'pointer', borderLeft: '4px solid var(--color-warning)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)', color: 'var(--color-warning)', padding: '0.5rem', borderRadius: '50%' }}><User size={18} /></div>
                    <div>
                      <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)' }}>Students Without Assigned Preceptor</h4>
                      <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Assign preceptors to enable clinical documentation</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ fontWeight: 600, color: 'var(--color-warning)' }}>{unassignedStudents} Pending</span>
                    <ArrowRight size={16} style={{ color: 'var(--text-secondary)' }} />
                  </div>
                </div>
              )}

              {inactiveStudents > 0 && (
                <div onClick={() => navigate('/college-admin/students/list', { state: { filterStatus: 'Inactive' } })} style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', backgroundColor: 'var(--bg-surface-alt)', borderRadius: '8px', cursor: 'pointer', borderLeft: '4px solid var(--color-danger)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'var(--color-danger)', padding: '0.5rem', borderRadius: '50%' }}><GraduationCap size={18} /></div>
                    <div>
                      <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)' }}>Inactive Students</h4>
                      <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Review and activate student accounts</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ fontWeight: 600, color: 'var(--color-danger)' }}>{inactiveStudents} Accounts</span>
                    <ArrowRight size={16} style={{ color: 'var(--text-secondary)' }} />
                  </div>
                </div>
              )}

              {inactivePreceptors > 0 && (
                <div onClick={() => navigate('/college-admin/preceptors/list', { state: { filterStatus: 'Inactive' } })} style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', backgroundColor: 'var(--bg-surface-alt)', borderRadius: '8px', cursor: 'pointer', borderLeft: '4px solid var(--color-danger)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'var(--color-danger)', padding: '0.5rem', borderRadius: '50%' }}><Users size={18} /></div>
                    <div>
                      <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)' }}>Inactive Preceptors</h4>
                      <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Review and activate preceptor accounts</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ fontWeight: 600, color: 'var(--color-danger)' }}>{inactivePreceptors} Accounts</span>
                    <ArrowRight size={16} style={{ color: 'var(--text-secondary)' }} />
                  </div>
                </div>
              )}

              {unassignedStudents === 0 && inactiveStudents === 0 && inactivePreceptors === 0 && (
                <div style={{ padding: '1.5rem', textAlign: 'center', color: 'var(--text-secondary)', fontStyle: 'italic', backgroundColor: 'var(--bg-surface-alt)', borderRadius: '8px' }}>
                  No pending operational tasks require attention at this time.
                </div>
              )}
            </div>
          </div>

          {/* Recent Activities */}
          <div style={{ marginTop: '1rem', backgroundColor: 'var(--bg-surface)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-color)', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
            <h2 style={{ fontSize: '1.15rem', color: 'var(--text-primary)', marginBottom: '1.25rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Clock size={20} style={{ color: 'var(--color-primary)' }} /> Recent Activities
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {recentActivities.map(activity => (
                <div key={activity.id} style={{ display: 'flex', gap: '1rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>
                  <div style={{ marginTop: '0.25rem', color: 'var(--color-primary)' }}>
                    {activity.type === 'case' && <ClipboardList size={16} />}
                    {activity.type === 'student' && <User size={16} />}
                    {activity.type === 'assignment' && <User size={16} />}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h5 style={{ margin: '0 0 0.25rem 0', fontSize: '0.9rem', color: 'var(--text-primary)' }}>{activity.title}</h5>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{activity.desc}</p>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', whiteSpace: 'nowrap' }}>
                    {activity.time}
                  </div>
                </div>
              ))}
            </div>
          </div>


          {/* Charts Grid */}
          <div className="charts-grid" style={{ marginTop: '1rem' }}>
            {/* Pie Chart Placeholder */}
            <div className="chart-card">
              <h3 className="chart-title">Clinical Cases by Status</h3>
              <div className="pie-chart-container">
                <div className="pie-chart"></div>
                <div className="chart-legend">
                  <div className="legend-item">
                    <div className="legend-color green"></div>
                    <span>Approved</span>
                    <span className="legend-value">{approvedCases} ({(approvedCases/totalCases*100 || 0).toFixed(1)}%)</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-color orange"></div>
                    <span>Pending</span>
                    <span className="legend-value">{pendingCases} ({(pendingCases/totalCases*100 || 0).toFixed(1)}%)</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-color red"></div>
                    <span>Returned</span>
                    <span className="legend-value">{returnedCases} ({(returnedCases/totalCases*100 || 0).toFixed(1)}%)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bar Chart Placeholder */}
            <div className="chart-card">
              <h3 className="chart-title">Monthly Case Submissions</h3>
              <div className="bar-chart-container">
                <div className="y-axis">
                  <span>125</span>
                  <span>100</span>
                  <span>75</span>
                  <span>50</span>
                  <span>25</span>
                  <span>0</span>
                </div>
                
                <div className="bar-column">
                  <div className="bar" style={{ height: '40%' }}></div>
                  <span className="x-label">Dec '24</span>
                </div>
                <div className="bar-column">
                  <div className="bar" style={{ height: '52%' }}></div>
                  <span className="x-label">Jan '25</span>
                </div>
                <div className="bar-column">
                  <div className="bar" style={{ height: '60%' }}></div>
                  <span className="x-label">Feb '25</span>
                </div>
                <div className="bar-column">
                  <div className="bar" style={{ height: '72%' }}></div>
                  <span className="x-label">Mar '25</span>
                </div>
                <div className="bar-column">
                  <div className="bar" style={{ height: '84%' }}></div>
                  <span className="x-label">Apr '25</span>
                </div>
                <div className="bar-column">
                  <div className="bar" style={{ height: '95%' }}></div>
                  <span className="x-label">May '25</span>
                </div>
              </div>
            </div>

          </div>

          {/* Clinical Documentation Statistics */}
          <div style={{ marginTop: '2rem', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.15rem', color: 'var(--text-primary)', marginBottom: '1.25rem', fontWeight: 600 }}>Documentation Type Statistics</h2>
            <div className="secondary-cards-grid" style={{ gridTemplateColumns: 'repeat(5, 1fr)' }}>
              <div className="dashboard-card">
                <div className="secondary-card-content">
                  <div className="card-icon-wrapper secondary icon-blue">
                    <User size={24} />
                  </div>
                  <div className="card-stats">
                    <span className="card-title" style={{ fontSize: '0.8rem' }}>Patient Profile Forms</span>
                    <span className="card-value">1,245</span>
                  </div>
                </div>
              </div>

              <div className="dashboard-card">
                <div className="secondary-card-content">
                  <div className="card-icon-wrapper secondary icon-green">
                    <MessageSquare size={24} />
                  </div>
                  <div className="card-stats">
                    <span className="card-title" style={{ fontSize: '0.8rem' }}>Patient Counselling</span>
                    <span className="card-value">892</span>
                  </div>
                </div>
              </div>

              <div className="dashboard-card">
                <div className="secondary-card-content">
                  <div className="card-icon-wrapper secondary icon-purple">
                    <Pill size={24} />
                  </div>
                  <div className="card-stats">
                    <span className="card-title" style={{ fontSize: '0.8rem' }}>Drug Info Requests</span>
                    <span className="card-value">430</span>
                  </div>
                </div>
              </div>

              <div className="dashboard-card">
                <div className="secondary-card-content">
                  <div className="card-icon-wrapper secondary icon-orange">
                    <Activity size={24} />
                  </div>
                  <div className="card-stats">
                    <span className="card-title" style={{ fontSize: '0.8rem' }}>Pharmacist Intervention</span>
                    <span className="card-value">275</span>
                  </div>
                </div>
              </div>

              <div className="dashboard-card">
                <div className="secondary-card-content">
                  <div className="card-icon-wrapper secondary icon-red">
                    <AlertTriangle size={24} />
                  </div>
                  <div className="card-stats">
                    <span className="card-title" style={{ fontSize: '0.8rem' }}>Adverse Drug Reactions</span>
                    <span className="card-value">85</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </CollegeAdminLayout>
  );
};

export default CollegeAdminDashboard;
