import React from 'react';
import { Link } from 'react-router-dom';
import { Users, ClipboardList, ChevronRight, FileText } from 'lucide-react';
import PreceptorLayout from '../../components/preceptor/PreceptorLayout';
import '../college/PreceptorManagement.css';

const PreceptorReportsHub = () => {
  return (
    <PreceptorLayout>
      <div className="preceptor-page">
        <div className="page-header">
          <div className="breadcrumbs">
            <Link to="/preceptor/dashboard">Dashboard</Link>
            <ChevronRight size={16} />
            <span>Reports</span>
          </div>
          <h1>Reports Hub</h1>
          <p className="page-subtitle">Access student and clinical case reports.</p>
        </div>

        <div className="preceptor-actions-grid">
          <Link to="/preceptor/reports/students" className="action-card">
            <div className="action-icon-wrapper blue">
              <Users size={32} />
            </div>
            <div className="action-details">
              <span className="action-title">Assigned Student Reports</span>
              <span className="action-subtitle">View and export reports of your assigned students.</span>
            </div>
          </Link>

          <Link to="/preceptor/reports/cases" className="action-card">
            <div className="action-icon-wrapper green">
              <FileText size={32} />
            </div>
            <div className="action-details">
              <span className="action-title">Clinical Case Reports</span>
              <span className="action-subtitle">View and export clinical case submission reports.</span>
            </div>
          </Link>
        </div>
      </div>
    </PreceptorLayout>
  );
};

export default PreceptorReportsHub;
