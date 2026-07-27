import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ClipboardList, BadgeCheck, Clock3, RotateCcw, ChevronRight, Home } from 'lucide-react';
import PreceptorLayout from '../../components/preceptor/PreceptorLayout';
import { useDatabase } from '../../context/DatabaseContext';
import { useAuth } from '../../context/AuthContext';
import '../college/PreceptorManagement.css';

const ClinicalCasesHub = () => {
  const navigate = useNavigate();
  const { getPreceptorAssignedCases } = useDatabase();
  const { currentUser } = useAuth();

  const cases = currentUser ? getPreceptorAssignedCases(currentUser.id) : [];
  
  const totalCases = cases.filter(c => c.status !== 'Draft').length;
  const underReviewCases = cases.filter(c => ['Submitted', 'Assigned to Preceptor', 'Resubmitted', 'Under Review', 'Pending'].includes(c.status)).length;
  const returnedCases = cases.filter(c => c.status === 'Returned').length;
  const approvedCases = cases.filter(c => c.status === 'Approved').length;

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
              <span className="action-title">Total Cases ({totalCases})</span>
              <span className="action-subtitle">View all clinical cases submitted by students</span>
            </div>
            <ChevronRight className="action-arrow" size={20} />
          </div>

          <div className="action-card" onClick={() => navigate('/preceptor/cases/list?status=under-review')}>
            <div className="action-icon-wrapper orange">
              <Clock3 size={32} />
            </div>
            <div className="action-details">
              <span className="action-title">Cases Under Review ({underReviewCases})</span>
              <span className="action-subtitle">Review cases waiting for your approval</span>
            </div>
            <ChevronRight className="action-arrow" size={20} />
          </div>

          <div className="action-card" onClick={() => navigate('/preceptor/cases/list?status=returned')}>
            <div className="action-icon-wrapper red">
              <RotateCcw size={32} />
            </div>
            <div className="action-details">
              <span className="action-title">Returned Cases ({returnedCases})</span>
              <span className="action-subtitle">View cases returned to students for revision</span>
            </div>
            <ChevronRight className="action-arrow" size={20} />
          </div>

          <div className="action-card" onClick={() => navigate('/preceptor/cases/list?status=approved')}>
            <div className="action-icon-wrapper green">
              <BadgeCheck size={32} />
            </div>
            <div className="action-details">
              <span className="action-title">Approved Cases ({approvedCases})</span>
              <span className="action-subtitle">View clinical cases that have been approved</span>
            </div>
            <ChevronRight className="action-arrow" size={20} />
          </div>
        </div>
      </div>
    </PreceptorLayout>
  );
};

export default ClinicalCasesHub;
