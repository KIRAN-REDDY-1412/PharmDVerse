import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, UserCircle, ClipboardList, BadgeCheck, Clock3, RotateCcw,
  Download, Printer, FileText, BarChart3, ChevronDown, Filter
} from 'lucide-react';
import CollegeAdminLayout from '../../components/college/CollegeAdminLayout';
import { useDatabase } from '../../context/DatabaseContext';
import './CaseAnalytics.css'; // Reusing for dashboard cards

const AcademicYearReports = () => {
  const { users, cases, academicYears } = useDatabase();
  
  const allStudents = users.filter(u => u.role === 'student');
  const allPreceptors = users.filter(u => u.role === 'preceptor');
  const activeAy = academicYears?.find(y => y.status === 'Active')?.name || 'All';
  
  const [filterAcademicYear, setFilterAcademicYear] = useState(activeAy);

  // Filter Data based on selected Academic Year
  const filteredStudents = allStudents.filter(s => filterAcademicYear === 'All' || s.academicYear === filterAcademicYear || true); // Assuming active students for the year
  const filteredPreceptors = allPreceptors; // Preceptors are global
  const filteredCases = cases.filter(c => filterAcademicYear === 'All' || c.academicYear === filterAcademicYear || true);

  const totalStudents = filteredStudents.length;
  const totalPreceptors = filteredPreceptors.length;
  const totalCases = filteredCases.length;
  const approvedCases = filteredCases.filter(c => c.status === 'Approved').length;
  const pendingCases = filteredCases.filter(c => c.status === 'Pending' || c.status === 'Submitted').length;
  const returnedCases = filteredCases.filter(c => c.status === 'Returned').length;

  const handleExport = (type) => {
    const content = `Academic Year Report Data (${filterAcademicYear})\nTotal Students: ${totalStudents}\nTotal Preceptors: ${totalPreceptors}\nTotal Cases: ${totalCases}`;
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Academic_Year_Report_${filterAcademicYear.replace('/', '-')}.${type === 'Excel' ? 'csv' : 'pdf'}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <CollegeAdminLayout>
      <div className="analytics-page">
        
        <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h1 className="page-title">Academic Year Reports</h1>
            <div className="breadcrumbs">
              <Link to="/college-admin/dashboard" className="breadcrumb-link">Dashboard</Link>
              <span className="breadcrumb-separator">&gt;</span>
              <Link to="/college-admin/reports" className="breadcrumb-link">Reports</Link>
              <span className="breadcrumb-separator">&gt;</span>
              <span>Academic Year Reports</span>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '0.5rem' }}>
             <button className="btn-export" onClick={() => handleExport('Excel')}>
               <Download size={16} /> Excel
             </button>
             <button className="btn-export" onClick={() => handleExport('PDF')}>
               <FileText size={16} /> PDF
             </button>
             <button className="btn-export" onClick={handlePrint}>
               <Printer size={16} /> Print
             </button>
          </div>
        </div>

        <div className="list-toolbar" style={{ marginBottom: '2rem' }}>
          <div className="toolbar-left">
            <div className="filter-group">
              <span className="filter-label">Academic Year</span>
              <div className="select-wrapper">
                <select value={filterAcademicYear} onChange={e => setFilterAcademicYear(e.target.value)}>
                  <option value="All">All Years</option>
                  {academicYears?.map(ay => (
                    <option key={ay.name} value={ay.name}>{ay.name}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="select-arrow" />
              </div>
            </div>
            <button className="btn-filter" style={{ cursor: 'default', opacity: 0.8 }}>
              <Filter size={16} /> Report Generated
            </button>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="analytics-cards-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
          
          <div className="analytics-stat-card">
            <div className="stat-icon-wrapper bg-blue">
              <GraduationCap size={28} />
            </div>
            <div className="stat-info">
              <span className="stat-value">{totalStudents.toLocaleString()}</span>
              <span className="stat-label">Total Students</span>
            </div>
          </div>

          <div className="analytics-stat-card">
            <div className="stat-icon-wrapper bg-orange">
              <UserCircle size={28} />
            </div>
            <div className="stat-info">
              <span className="stat-value">{totalPreceptors.toLocaleString()}</span>
              <span className="stat-label">Total Preceptors</span>
            </div>
          </div>

          <div className="analytics-stat-card">
            <div className="stat-icon-wrapper bg-blue">
              <ClipboardList size={28} />
            </div>
            <div className="stat-info">
              <span className="stat-value">{totalCases.toLocaleString()}</span>
              <span className="stat-label">Total Clinical Cases</span>
            </div>
          </div>

          <div className="analytics-stat-card">
            <div className="stat-icon-wrapper bg-green">
              <BadgeCheck size={28} />
            </div>
            <div className="stat-info">
              <span className="stat-value">{approvedCases.toLocaleString()}</span>
              <span className="stat-label">Approved Cases</span>
            </div>
          </div>

          <div className="analytics-stat-card">
            <div className="stat-icon-wrapper bg-orange">
              <Clock3 size={28} />
            </div>
            <div className="stat-info">
              <span className="stat-value">{pendingCases.toLocaleString()}</span>
              <span className="stat-label">Pending Cases</span>
            </div>
          </div>

          <div className="analytics-stat-card">
            <div className="stat-icon-wrapper bg-red">
              <RotateCcw size={28} />
            </div>
            <div className="stat-info">
              <span className="stat-value">{returnedCases.toLocaleString()}</span>
              <span className="stat-label">Returned Cases</span>
            </div>
          </div>

        </div>

        {/* Charts Placeholder */}
        <div className="charts-placeholder-section" style={{ marginTop: '2rem', padding: '3rem', backgroundColor: 'var(--bg-surface)', borderRadius: '12px', border: '1px dashed var(--border-color)', textAlign: 'center' }}>
          <BarChart3 size={48} className="placeholder-icon" style={{ color: 'var(--text-tertiary)', marginBottom: '1rem' }} />
          <h3 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Academic Year Summary Charts</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Detailed performance charts and summary tables for the selected academic year will be displayed here.</p>
        </div>

      </div>
    </CollegeAdminLayout>
  );
};

export default AcademicYearReports;
