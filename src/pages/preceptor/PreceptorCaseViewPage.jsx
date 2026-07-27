import React, { useState } from 'react';
import { useParams, useNavigate, Link, useSearchParams } from 'react-router-dom';
import PreceptorLayout from '../../components/preceptor/PreceptorLayout';
import FormReviewCard from '../../components/preceptor/FormReviewCard';
import CaseHistoryTimeline from '../../components/shared/CaseHistoryTimeline';
import { useDatabase } from '../../context/DatabaseContext';
import { ArrowLeft, User, Activity, AlertTriangle, CheckCircle } from 'lucide-react';
import './PreceptorCaseViewPage.css';

const getOverallStatusBadge = (status) => {
  switch (status) {
    case 'Approved':
      return <span className="status-badge status-approved">{status}</span>;
    case 'Returned':
      return <span className="status-badge status-returned">{status}</span>;
    case 'Pending':
      return <span className="status-badge status-pending">{status}</span>;
    default:
      return <span className="status-badge">{status || 'Unknown'}</span>;
  }
};

const PreceptorCaseViewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode') || 'view';
  const isViewMode = mode === 'view';

  const { cases, updateCaseStatus, updateFormStatus } = useDatabase();
  
  const caseData = cases.find(c => c.id === id);

  const [globalRemarks, setGlobalRemarks] = useState(caseData?.overallRemarks || '');

  if (!caseData) {
    return (
      <PreceptorLayout>
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <h2>Case Not Found</h2>
          <button className="btn-secondary" onClick={() => navigate('/preceptor/cases')} style={{ marginTop: '1rem' }}>
            Back to Case List
          </button>
        </div>
      </PreceptorLayout>
    );
  }

  const handleFormAction = (formKey, action, payload) => {
    switch(action) {
      case 'approve':
        updateFormStatus(id, formKey, 'Approved');
        break;
      case 'return':
        updateFormStatus(id, formKey, 'Returned');
        break;
      case 'comment':
        // Here payload is the comment string
        updateFormStatus(id, formKey, caseData.forms[formKey].status, payload);
        break;
      default:
        break;
    }
  };

  const handleApproveCase = () => {
    updateCaseStatus(id, 'Approved', globalRemarks);
    navigate('/preceptor/cases');
  };

  const handleReturnCase = () => {
    if (!globalRemarks.trim()) {
      alert("Please provide overall remarks before returning the case.");
      return;
    }
    updateCaseStatus(id, 'Returned', globalRemarks);
    navigate('/preceptor/cases');
  };

  const forms = caseData.forms || {};

  return (
    <PreceptorLayout>
      <div className="list-page-container case-review-page">
        
        {/* Header */}
        <div className="list-page-header">
          <div className="header-left">
            <h1 className="page-title">Review Case: {caseData.id}</h1>
            <div className="breadcrumbs">
              <Link to="/preceptor/dashboard" className="breadcrumb-link">Dashboard</Link>
              <span className="breadcrumb-separator">&gt;</span>
              <Link to="/preceptor/cases" className="breadcrumb-link">Pending Cases</Link>
              <span className="breadcrumb-separator">&gt;</span>
              <span>Review Case</span>
            </div>
          </div>
          <div className="header-right">
            <button className="btn-secondary" onClick={() => navigate('/preceptor/cases')} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ArrowLeft size={16} /> Back to Inbox
            </button>
          </div>
        </div>

        <div className="case-content-layout">
          
          {/* LEFT COLUMN: Case Info & Forms */}
          <div className="case-main-column">

            {isViewMode && (
              <div style={{ backgroundColor: '#fff8e1', border: '1px solid #ffe082', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#8f6b00' }}>
                <AlertTriangle size={20} />
                <div>
                  <strong>Read-Only View Mode Active</strong>
                  <div style={{ fontSize: '0.9rem', marginTop: '0.25rem' }}>You are currently viewing this case in read-only mode, so all approval and return buttons are hidden. To approve or return forms, please go back to the Case List and click the <strong>Pencil (Review)</strong> icon instead of the Eye icon.</div>
                </div>
              </div>
            )}
            
            {/* Case Information Header Card */}
            <div className="case-info-card">
              <div className="case-info-header">
                <h2>{caseData.diagnosis || 'Clinical Case Documentation'}</h2>
                {getOverallStatusBadge(caseData.status)}
              </div>
              <h4 style={{marginTop: 0, marginBottom: '1rem', color: 'var(--text-secondary)'}}>Submission Details</h4>
              <div className="case-info-grid" style={{marginBottom: '2rem'}}>
                <div className="info-item">
                  <span className="info-label">Case ID</span>
                  <span className="info-value">{caseData.id}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Student</span>
                  <span className="info-value">{caseData.studentId} - Arun Kumar</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Roll Number</span>
                  <span className="info-value">{caseData.rollNo || '-'}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Date Submitted</span>
                  <span className="info-value">{new Date(caseData.submittedDate).toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute:'2-digit' })}</span>
                </div>
              </div>

              <h4 style={{marginTop: 0, marginBottom: '1rem', color: 'var(--text-secondary)', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem'}}>Patient Demographics</h4>
              <div className="case-info-grid">
                <div className="info-item">
                  <span className="info-label">Patient Name</span>
                  <span className="info-value">{caseData.patientName || '-'}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Age & Gender</span>
                  <span className="info-value">{caseData.age || '-'} yrs / {caseData.gender || '-'}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Hospital</span>
                  <span className="info-value">{caseData.hospital || '-'}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Department</span>
                  <span className="info-value">{caseData.department || '-'}</span>
                </div>
              </div>
            </div>

            <h2 className="section-heading">Clinical Documentation Forms</h2>
            
            {/* Form Review Cards */}
            <FormReviewCard 
              formName="Patient Profile Form" 
              formData={forms.patientProfile} 
              onAction={(action, payload) => handleFormAction('patientProfile', action, payload)} 
              isViewMode={isViewMode}
            />
            
            <FormReviewCard 
              formName="Patient Counselling Form" 
              formData={forms.patientCounselling} 
              onAction={(action, payload) => handleFormAction('patientCounselling', action, payload)} 
              isViewMode={isViewMode}
            />

            <FormReviewCard 
              formName="Drug Information Request Form" 
              formData={forms.drugInformation} 
              onAction={(action, payload) => handleFormAction('drugInformation', action, payload)} 
              isViewMode={isViewMode}
            />

            <FormReviewCard 
              formName="Pharmacist Intervention Form" 
              formData={forms.pharmacistIntervention} 
              onAction={(action, payload) => handleFormAction('pharmacistIntervention', action, payload)} 
              isViewMode={isViewMode}
            />

            <FormReviewCard 
              formName="Adverse Drug Reaction (ADR) Form" 
              formData={forms.adr} 
              onAction={(action, payload) => handleFormAction('adr', action, payload)} 
              isViewMode={isViewMode}
            />

            {/* Overall Case Actions */}
            {!isViewMode && (
              <div className="overall-actions-card">
              <h3 style={{marginTop: 0, marginBottom: '1rem', color: 'var(--text-primary)'}}>Overall Case Decision</h3>
              <textarea 
                className="global-remarks-textarea"
                placeholder="Enter overall remarks for the student regarding this case..."
                value={globalRemarks}
                onChange={(e) => setGlobalRemarks(e.target.value)}
              ></textarea>
              <div className="global-action-buttons">
                <button className="btn-action-large return" onClick={handleReturnCase}>
                  <AlertTriangle size={18} /> Return Clinical Case
                </button>
                <button className="btn-action-large approve" onClick={handleApproveCase}>
                  <CheckCircle size={18} /> Approve Clinical Case
                </button>
              </div>
              </div>
            )}

          </div>

          {/* RIGHT COLUMN: Timeline */}
          <div className="case-sidebar-column">
            <CaseHistoryTimeline history={caseData.history} />
          </div>

        </div>

      </div>
    </PreceptorLayout>
  );
};

export default PreceptorCaseViewPage;
