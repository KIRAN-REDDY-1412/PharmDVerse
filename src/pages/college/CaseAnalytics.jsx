import React from 'react';
import { Link } from 'react-router-dom';
import { ClipboardList, Clock3, BadgeCheck, RotateCcw, BarChart3 } from 'lucide-react';
import CollegeAdminLayout from '../../components/college/CollegeAdminLayout';
import './CaseAnalytics.css';

const CaseAnalytics = () => {
  return (
    <CollegeAdminLayout>
      <div className="analytics-page">
        
        <div className="page-header">
          <h1 className="page-title">Case Analytics</h1>
          <div className="breadcrumbs">
            <Link to="/college-admin/dashboard" className="breadcrumb-link">Dashboard</Link>
            <span className="breadcrumb-separator">&gt;</span>
            <Link to="/college-admin/cases" className="breadcrumb-link">Clinical Case Management</Link>
            <span className="breadcrumb-separator">&gt;</span>
            <span>Case Analytics</span>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="analytics-cards-grid">
          
          <div className="analytics-stat-card">
            <div className="stat-icon-wrapper bg-blue">
              <ClipboardList size={28} />
            </div>
            <div className="stat-info">
              <span className="stat-value">568</span>
              <span className="stat-label">Total Clinical Cases</span>
            </div>
          </div>

          <div className="analytics-stat-card">
            <div className="stat-icon-wrapper bg-orange">
              <Clock3 size={28} />
            </div>
            <div className="stat-info">
              <span className="stat-value">158</span>
              <span className="stat-label">Pending Cases</span>
            </div>
          </div>

          <div className="analytics-stat-card">
            <div className="stat-icon-wrapper bg-green">
              <BadgeCheck size={28} />
            </div>
            <div className="stat-info">
              <span className="stat-value">312</span>
              <span className="stat-label">Approved Cases</span>
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
          <h3>Charts & Graphs Coming Soon</h3>
          <p>Detailed analytics visualizations will be added here after the Student Portal is completed.</p>
        </div>

      </div>
    </CollegeAdminLayout>
  );
};

export default CaseAnalytics;
