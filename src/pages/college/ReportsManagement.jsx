import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, UserCircle, ClipboardList, Calendar, 
  FileSpreadsheet, UserRoundSearch, FileText, CalendarRange,
  BarChart, Activity, CheckCircle, Clock, ChevronDown
} from 'lucide-react';
import CollegeAdminLayout from '../../components/college/CollegeAdminLayout';
import { useDatabase } from '../../context/DatabaseContext';
import './PreceptorManagement.css'; // Inheriting grid CSS

const ReportsManagement = () => {
  const { cases, users, academicYears } = useDatabase();

  const kpis = useMemo(() => {
    const totalCases = cases.length;
    const activePreceptors = users.filter(u => u.role === 'preceptor').length;
    const totalStudents = users.filter(u => u.role === 'student').length;
    
    // Average Approval Velocity (Mocked metric for UI representation, in reality derived from date diffs)
    const avgVelocity = cases.filter(c => c.status === 'Approved').length > 0 ? '2.4 Days' : 'N/A';

    return { totalCases, activePreceptors, totalStudents, avgVelocity };
  }, [cases, users]);

  return (
    <CollegeAdminLayout>
      <div className="list-page-container">
        
        {/* Header & Global Filters */}
        <div className="list-page-header">
          <div className="header-left">
            <h1 className="page-title">Reports & Analytics</h1>
            <div className="breadcrumbs">
              <Link to="/college-admin/dashboard" className="breadcrumb-link">Dashboard</Link>
              <span className="breadcrumb-separator">&gt;</span>
              <span>Reports</span>
            </div>
          </div>
          <div className="header-right">
            <div className="search-box" style={{ width: '250px' }}>
              <Calendar size={18} className="search-icon" />
              <div className="select-wrapper" style={{ width: '100%', border: 'none', padding: 0 }}>
                <select style={{ border: 'none', background: 'transparent', padding: '0.4rem 1.5rem', outline: 'none' }}>
                  <option>Current Academic Year</option>
                  <option>Last 30 Days</option>
                  <option>Last 90 Days</option>
                  <option>All Time</option>
                </select>
                <ChevronDown size={14} className="select-arrow" style={{ right: '0.5rem' }} />
              </div>
            </div>
          </div>
        </div>

        {/* KPI Ribbon */}
        <div className="quick-stats-grid" style={{ marginTop: '1.5rem', gridTemplateColumns: 'repeat(4, 1fr)' }}>
          <div className="stat-card">
            <div className="stat-icon total"><FileText size={24} /></div>
            <div className="stat-details">
              <span className="stat-value">{kpis.totalCases}</span>
              <span className="stat-label">Total Cases Submitted</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon active"><UserRoundSearch size={24} /></div>
            <div className="stat-details">
              <span className="stat-value">{kpis.activePreceptors}</span>
              <span className="stat-label">Active Preceptors</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ color: '#4f46e5', backgroundColor: '#e0e7ff' }}><GraduationCap size={24} /></div>
            <div className="stat-details">
              <span className="stat-value">{kpis.totalStudents}</span>
              <span className="stat-label">Total Students Enrolled</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon warning"><Activity size={24} /></div>
            <div className="stat-details">
              <span className="stat-value">{kpis.avgVelocity}</span>
              <span className="stat-label">Avg Case Approval Time</span>
            </div>
          </div>
        </div>

        <h2 style={{ fontSize: '1.1rem', marginTop: '2.5rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Report Directory</h2>

        <div className="preceptor-actions-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          
          <Link to="/college-admin/reports/students" className="action-card">
            <div className="action-icon-wrapper blue">
              <FileSpreadsheet size={32} />
            </div>
            <div className="action-details">
              <span className="action-title">Student Reports</span>
              <span className="action-subtitle">Analyze academic progression, case submissions, and performance</span>
            </div>
          </Link>

          <Link to="/college-admin/reports/preceptors" className="action-card">
            <div className="action-icon-wrapper orange">
              <UserRoundSearch size={32} />
            </div>
            <div className="action-details">
              <span className="action-title">Preceptor Workload</span>
              <span className="action-subtitle">Monitor preceptor bandwidth, case distributions, and review times</span>
            </div>
          </Link>
          
          <Link to="/college-admin/reports/cases" className="action-card" style={{ border: '1px solid var(--color-primary)' }}>
            <div className="action-icon-wrapper green">
              <BarChart size={32} />
            </div>
            <div className="action-details">
              <span className="action-title">Clinical Case Reports</span>
              <span className="action-subtitle">Enterprise ledger of all clinical cases, statuses, and bottlenecks</span>
            </div>
          </Link>

          <Link to="/college-admin/reports/academic-year" className="action-card">
            <div className="action-icon-wrapper red">
              <CalendarRange size={32} />
            </div>
            <div className="action-details">
              <span className="action-title">Academic Summaries</span>
              <span className="action-subtitle">End-of-year comprehensive reports for institutional compliance</span>
            </div>
          </Link>

        </div>

      </div>
    </CollegeAdminLayout>
  );
};

export default ReportsManagement;
