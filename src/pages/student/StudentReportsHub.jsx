import React from 'react';
import { Link } from 'react-router-dom';
import { ClipboardList, ChevronRight, FileText, GraduationCap } from 'lucide-react';
import StudentLayout from '../../components/student/StudentLayout';
import '../college/PreceptorManagement.css';

const StudentReportsHub = () => {
  return (
    <StudentLayout>
      <div className="preceptor-page">
        <div className="page-header">
          <div className="breadcrumbs">
            <Link to="/student/dashboard">Dashboard</Link>
            <ChevronRight size={16} />
            <span>Reports</span>
          </div>
          <h1>Reports Hub</h1>
          <p className="page-subtitle">Access student and clinical case reports.</p>
        </div>

        <div className="preceptor-actions-grid">
          <Link to="/student/reports/academic" className="action-card">
            <div className="action-icon-wrapper blue">
              <GraduationCap size={32} />
            </div>
            <div className="action-details">
              <span className="action-title">My Academic Reports</span>
              <span className="action-subtitle">View and download your academic and clinical posting reports.</span>
            </div>
          </Link>

          <Link to="/student/reports/cases" className="action-card">
            <div className="action-icon-wrapper green">
              <FileText size={32} />
            </div>
            <div className="action-details">
              <span className="action-title">Clinical Case Reports</span>
              <span className="action-subtitle">View and download all clinical documentation reports submitted.</span>
            </div>
          </Link>
        </div>
      </div>
    </StudentLayout>
  );
};

export default StudentReportsHub;
