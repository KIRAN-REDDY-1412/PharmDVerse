import React from 'react';
import { Link } from 'react-router-dom';
import { ClipboardList, ChevronRight, Users } from 'lucide-react';
import PreceptorLayout from '../../components/preceptor/PreceptorLayout';
import '../college/PreceptorManagement.css';

const AssignedStudentsHub = () => {
  return (
    <PreceptorLayout>
      <div className="preceptor-page">
        <div className="page-header">
          <div className="breadcrumbs">
            <Link to="/preceptor/dashboard">Dashboard</Link>
            <ChevronRight size={16} />
            <span>Assigned Students</span>
          </div>
          <h1>Assigned Students</h1>
          <p className="page-description">Manage and view your assigned students.</p>
        </div>

        <div className="preceptor-actions-grid">
          <Link to="/preceptor/students/list" className="action-card">
            <div className="action-icon-wrapper green">
              <Users size={32} />
            </div>
            <div className="action-details">
              <span className="action-title">Student List</span>
              <span className="action-subtitle">View assigned students</span>
            </div>
          </Link>
        </div>
      </div>
    </PreceptorLayout>
  );
};

export default AssignedStudentsHub;
