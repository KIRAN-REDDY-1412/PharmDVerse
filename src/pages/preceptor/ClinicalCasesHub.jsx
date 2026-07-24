import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ClipboardList, BadgeCheck, Clock3, RotateCcw, ChevronRight, Home } from 'lucide-react';
import PreceptorLayout from '../../components/preceptor/PreceptorLayout';
import '../college/PreceptorManagement.css';

const ClinicalCasesHub = () => {
  const navigate = useNavigate();

  return (
    <PreceptorLayout>
      <div className="preceptor-page">
        <div className="page-header">
          <div>
            <h1 className="page-title">Clinical Cases</h1>
            <div className="breadcrumb">
              <Link to="/preceptor/dashboard" className="breadcrumb-link">
                <Home className="breadcrumb-icon" size={16} />
              </Link>
              <ChevronRight className="breadcrumb-separator" size={16} />
              <span className="breadcrumb-current">Clinical Cases</span>
            </div>
          </div>
        </div>

        <div className="preceptor-actions-grid">
          <div className="action-card" onClick={() => navigate('/preceptor/cases/list')}>
            <div className="action-icon-wrapper purple">
              <ClipboardList size={32} />
            </div>
            <div className="action-details">
              <span className="action-title">Total Cases (45)</span>
              <span className="action-subtitle">View all clinical cases submitted by students</span>
            </div>
            <ChevronRight className="action-arrow" size={20} />
          </div>

          <div className="action-card" onClick={() => navigate('/preceptor/cases/list?status=approved')}>
            <div className="action-icon-wrapper green">
              <BadgeCheck size={32} />
            </div>
            <div className="action-details">
              <span className="action-title">Approved Cases (28)</span>
              <span className="action-subtitle">View clinical cases that have been approved</span>
            </div>
            <ChevronRight className="action-arrow" size={20} />
          </div>

          <div className="action-card" onClick={() => navigate('/preceptor/cases/list?status=pending')}>
            <div className="action-icon-wrapper orange">
              <Clock3 size={32} />
            </div>
            <div className="action-details">
              <span className="action-title">Pending Cases (12)</span>
              <span className="action-subtitle">Review cases waiting for your approval</span>
            </div>
            <ChevronRight className="action-arrow" size={20} />
          </div>

          <div className="action-card" onClick={() => navigate('/preceptor/cases/list?status=returned')}>
            <div className="action-icon-wrapper red">
              <RotateCcw size={32} />
            </div>
            <div className="action-details">
              <span className="action-title">Returned Cases (5)</span>
              <span className="action-subtitle">View cases returned to students for revision</span>
            </div>
            <ChevronRight className="action-arrow" size={20} />
          </div>
        </div>
      </div>
    </PreceptorLayout>
  );
};

export default ClinicalCasesHub;
