import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PlusSquare, FileText, Send, RotateCcw, ChevronRight } from 'lucide-react';
import StudentLayout from '../../components/student/StudentLayout';
import '../college/PreceptorManagement.css';

const StudentCasesHub = () => {
  const navigate = useNavigate();

  return (
    <StudentLayout>
      <div className="preceptor-page">
        <div className="page-header">
          <div>
            <h1 className="page-title">Clinical Cases</h1>
            <div className="breadcrumbs">
              <Link to="/student/dashboard" className="breadcrumb-link">Dashboard</Link>
              <span className="breadcrumb-separator">&gt;</span>
              <span>Clinical Cases</span>
            </div>
          </div>
        </div>

        <div className="preceptor-actions-grid">
          <Link to="/student/cases/new" className="action-card">
            <div className="action-icon-wrapper blue">
              <PlusSquare size={32} />
            </div>
            <div className="action-details">
              <span className="action-title">New Clinical Case</span>
              <span className="action-subtitle">Create a new clinical case entry</span>
            </div>
          </Link>

          <Link to="/student/cases/drafts" className="action-card">
            <div className="action-icon-wrapper orange">
              <FileText size={32} />
            </div>
            <div className="action-details">
              <span className="action-title">Draft Cases</span>
              <span className="action-subtitle">View and edit saved draft cases</span>
            </div>
          </Link>

          <Link to="/student/cases/submitted" className="action-card">
            <div className="action-icon-wrapper green">
              <Send size={32} />
            </div>
            <div className="action-details">
              <span className="action-title">Submitted Cases</span>
              <span className="action-subtitle">View your submitted clinical cases</span>
            </div>
          </Link>

          <Link to="/student/cases/returned" className="action-card">
            <div className="action-icon-wrapper red">
              <RotateCcw size={32} />
            </div>
            <div className="action-details">
              <span className="action-title">Returned Cases</span>
              <span className="action-subtitle">View and resubmit returned cases</span>
            </div>
          </Link>
        </div>
      </div>
    </StudentLayout>
  );
};

export default StudentCasesHub;
