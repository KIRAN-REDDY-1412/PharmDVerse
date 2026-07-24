import React from 'react';
import { Link } from 'react-router-dom';
import { ClipboardList, BarChart3 } from 'lucide-react';
import CollegeAdminLayout from '../../components/college/CollegeAdminLayout';
import './PreceptorManagement.css';

const ClinicalCaseManagement = () => {
  return (
    <CollegeAdminLayout>
      <div className="preceptor-page">
        
        <div className="page-header">
          <h1 className="page-title">Clinical Case Management</h1>
          <div className="breadcrumbs">
            <Link to="/college-admin/dashboard" className="breadcrumb-link">Dashboard</Link>
            <span className="breadcrumb-separator">&gt;</span>
            <span>Clinical Case Management</span>
          </div>
        </div>

        <div className="preceptor-actions-grid">
          
          <Link to="/college-admin/case-list" className="action-card">
            <div className="action-icon-wrapper blue">
              <ClipboardList size={32} />
            </div>
            <div className="action-details">
              <span className="action-title">Case List</span>
              <span className="action-subtitle">View and monitor all clinical cases</span>
            </div>
          </Link>

          <Link to="/college-admin/case-analytics" className="action-card">
            <div className="action-icon-wrapper green">
              <BarChart3 size={32} />
            </div>
            <div className="action-details">
              <span className="action-title">Case Analytics</span>
              <span className="action-subtitle">View clinical case statistics</span>
            </div>
          </Link>

        </div>

      </div>
    </CollegeAdminLayout>
  );
};

export default ClinicalCaseManagement;
