import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, UserCircle, ClipboardList, Calendar, FileSpreadsheet, UserRoundSearch, FileText, CalendarRange } from 'lucide-react';
import CollegeAdminLayout from '../../components/college/CollegeAdminLayout';
import './PreceptorManagement.css'; // Reusing the same grid layout CSS

const ReportsManagement = () => {
  return (
    <CollegeAdminLayout>
      <div className="preceptor-page">
        
        <div className="page-header">
          <h1 className="page-title">Reports</h1>
          <div className="breadcrumbs">
            <Link to="/college-admin/dashboard" className="breadcrumb-link">Dashboard</Link>
            <span className="breadcrumb-separator">&gt;</span>
            <span>Reports</span>
          </div>
        </div>

        <div className="preceptor-actions-grid">
          
          <Link to="/college-admin/reports/students" className="action-card">
            <div className="action-icon-wrapper blue">
              <FileSpreadsheet size={32} />
            </div>
            <div className="action-details">
              <span className="action-title">Student Reports</span>
              <span className="action-subtitle">Generate and view student reports</span>
            </div>
          </Link>

          <Link to="/college-admin/reports/preceptors" className="action-card">
            <div className="action-icon-wrapper orange">
              <UserRoundSearch size={32} />
            </div>
            <div className="action-details">
              <span className="action-title">Preceptor Reports</span>
              <span className="action-subtitle">Generate and view preceptor reports</span>
            </div>
          </Link>
          
          <Link to="/college-admin/reports/cases" className="action-card">
            <div className="action-icon-wrapper green">
              <FileText size={32} />
            </div>
            <div className="action-details">
              <span className="action-title">Clinical Case Reports</span>
              <span className="action-subtitle">Generate and view clinical case reports</span>
            </div>
          </Link>

          <Link to="/college-admin/reports/academic-year" className="action-card">
            <div className="action-icon-wrapper red">
              <CalendarRange size={32} />
            </div>
            <div className="action-details">
              <span className="action-title">Academic Year Reports</span>
              <span className="action-subtitle">Generate annual academic summary reports</span>
            </div>
          </Link>

        </div>

      </div>
    </CollegeAdminLayout>
  );
};

export default ReportsManagement;
