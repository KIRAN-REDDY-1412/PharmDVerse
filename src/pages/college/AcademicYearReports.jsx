import React from 'react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, UserCircle, ClipboardList, BadgeCheck, Clock3, RotateCcw,
  Download, Printer, FileText, BarChart3
} from 'lucide-react';
import CollegeAdminLayout from '../../components/college/CollegeAdminLayout';
import './CaseAnalytics.css'; // Reusing for dashboard cards

const AcademicYearReports = () => {
  const handleExport = (type) => {
    const content = "Mock Academic Year Report Data\nTotal Students: 1245\nTotal Preceptors: 48\nTotal Cases: 3568";
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Academic_Year_Report.${type === 'Excel' ? 'csv' : 'pdf'}`;
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

        {/* Stat Cards */}
        <div className="analytics-cards-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
          
          <div className="analytics-stat-card">
            <div className="stat-icon-wrapper bg-blue">
              <GraduationCap size={28} />
            </div>
            <div className="stat-info">
              <span className="stat-value">1,245</span>
              <span className="stat-label">Total Students</span>
            </div>
          </div>

          <div className="analytics-stat-card">
            <div className="stat-icon-wrapper bg-orange">
              <UserCircle size={28} />
            </div>
            <div className="stat-info">
              <span className="stat-value">48</span>
              <span className="stat-label">Total Preceptors</span>
            </div>
          </div>

          <div className="analytics-stat-card">
            <div className="stat-icon-wrapper bg-blue">
              <ClipboardList size={28} />
            </div>
            <div className="stat-info">
              <span className="stat-value">3,568</span>
              <span className="stat-label">Total Clinical Cases</span>
            </div>
          </div>

          <div className="analytics-stat-card">
            <div className="stat-icon-wrapper bg-green">
              <BadgeCheck size={28} />
            </div>
            <div className="stat-info">
              <span className="stat-value">3,112</span>
              <span className="stat-label">Approved Cases</span>
            </div>
          </div>

          <div className="analytics-stat-card">
            <div className="stat-icon-wrapper bg-orange">
              <Clock3 size={28} />
            </div>
            <div className="stat-info">
              <span className="stat-value">358</span>
              <span className="stat-label">Pending Cases</span>
            </div>
          </div>

          <div className="analytics-stat-card">
            <div className="stat-icon-wrapper bg-red">
              <RotateCcw size={28} />
            </div>
            <div className="stat-info">
              <span className="stat-value">98</span>
              <span className="stat-label">Returned Cases</span>
            </div>
          </div>

        </div>

        {/* Charts Placeholder */}
        <div className="charts-placeholder-section">
          <BarChart3 size={64} className="placeholder-icon" />
          <h3>Academic Year Summary Charts</h3>
          <p>Detailed performance charts and summary tables will be displayed here.</p>
        </div>

      </div>
    </CollegeAdminLayout>
  );
};

export default AcademicYearReports;
