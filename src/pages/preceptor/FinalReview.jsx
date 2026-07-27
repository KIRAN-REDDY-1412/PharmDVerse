import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, AlertTriangle, Clock, FileText, CheckSquare, XSquare, Send, CornerUpLeft, ShieldCheck } from 'lucide-react';
import PreceptorLayout from '../../components/preceptor/PreceptorLayout';
import { useDatabase } from '../../context/DatabaseContext';
import { useAuth } from '../../context/AuthContext';
import '../college/PreceptorManagement.css'; // Make sure this matches existing UI styles

const FORMS_METADATA = [
  { key: 'patientProfile', label: 'Patient Profile', mandatory: true },
  { key: 'patientCounselling', label: 'Patient Counselling', mandatory: false },
  { key: 'drugInformation', label: 'Drug Information Request', mandatory: false },
  { key: 'pharmacistIntervention', label: 'Pharmacist Intervention', mandatory: false },
  { key: 'adr', label: 'Adverse Drug Reaction (ADR)', mandatory: false }
];

const FinalReview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cases, users, updateCaseStatus } = useDatabase();
  const { currentUser } = useAuth();
  
  const existingCase = id ? cases.find(c => c.id === id) : null;
  const student = existingCase ? users.find(u => u.id === existingCase.rollNo) : null;

  const [overallComments, setOverallComments] = useState('');

  // Pre-fill overall comments if returning to this page
  useEffect(() => {
    if (existingCase && existingCase.overallRemarks) {
      setOverallComments(existingCase.overallRemarks);
    }
  }, [existingCase]);

  if (!existingCase) {
    return <PreceptorLayout><div>Case not found</div></PreceptorLayout>;
  }

  // Helper functions
  const isFormSubmitted = (formKey) => {
    if (formKey === 'patientProfile') return true;
    if (!existingCase || !existingCase.forms || !existingCase.forms[formKey]) return false;
    const status = existingCase.forms[formKey].status;
    return !['Incomplete', 'Not Started', 'Not Applicable', 'Draft', undefined, null].includes(status);
  };

  const getRawStatus = (formKey) => {
    if (!existingCase || !existingCase.forms || !existingCase.forms[formKey]) return 'Incomplete';
    const status = existingCase.forms[formKey].status;
    if (status === 'Approved' || status === 'Reviewed') return 'Reviewed';
    if (status === 'Returned') return 'Returned';
    if (status === 'Submitted' || status === 'Under Review' || status === 'Pending') return 'Under Review';
    if (status === 'Draft') return 'Incomplete';
    return 'Incomplete';
  };

  const getPatientData = (forms) => {
    if (!forms || !forms.patientProfile || !forms.patientProfile.data) {
      return { patientName: 'N/A', department: 'N/A', diagnosis: 'N/A', age: 'N/A', gender: 'N/A' };
    }
    const data = forms.patientProfile.data;
    return {
      patientName: data.patientName || data.name || data.patientInitials || 'N/A',
      department: data.department || data.ward || 'N/A',
      diagnosis: data.finalDiagnosis || data.diagnosis || 'N/A',
      age: data.age || 'N/A',
      gender: data.gender || 'N/A'
    };
  };

  const pData = getPatientData(existingCase.forms);

  // Compute submitted forms and validation state
  const submittedForms = FORMS_METADATA.filter(f => isFormSubmitted(f.key));
  const pendingForms = submittedForms.filter(f => {
    const status = getRawStatus(f.key);
    return status !== 'Reviewed';
  });

  const patientProfileReviewed = getRawStatus('patientProfile') === 'Reviewed';
  const allSubmittedReviewed = pendingForms.length === 0;
  const commentsEntered = overallComments.trim().length > 0;
  
  const canApprove = patientProfileReviewed && allSubmittedReviewed && commentsEntered;

  const handleApprove = () => {
    if (!canApprove) return;
    if (window.confirm('Are you sure you want to approve this case? It will be locked from further student editing.')) {
      updateCaseStatus(existingCase.id, 'Approved', overallComments);
      navigate('/preceptor/cases/list');
    }
  };

  const handleReturn = () => {
    if (window.confirm('Are you sure you want to return this case for corrections?')) {
      updateCaseStatus(existingCase.id, 'Returned', overallComments);
      navigate('/preceptor/cases/list');
    }
  };

  return (
    <PreceptorLayout>
      <div className="preceptor-page">
        <div className="page-header" style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h1 className="page-title">Final Review & Case Decision</h1>
            <div className="breadcrumbs" style={{ marginTop: '0.5rem' }}>
              <Link to="/preceptor/dashboard" className="breadcrumb-link">Dashboard</Link>
              <span className="breadcrumb-separator">&gt;</span>
              <Link to="/preceptor/cases/list" className="breadcrumb-link">Clinical Cases</Link>
              <span className="breadcrumb-separator">&gt;</span>
              <Link to={`/preceptor/cases/view/${id}`} className="breadcrumb-link">Case Details</Link>
              <span className="breadcrumb-separator">&gt;</span>
              <span>Final Review</span>
            </div>
          </div>
          <div>
            <Link to={`/preceptor/cases/view/${id}`} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
              <ArrowLeft size={16} /> Back to Case Details
            </Link>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem', marginBottom: '2rem', alignItems: 'start' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Case Summary Card */}
            <div style={{ backgroundColor: 'var(--bg-surface)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                <FileText size={18} style={{ display: 'inline', verticalAlign: 'text-bottom', marginRight: '0.5rem', color: 'var(--color-primary)' }} />
                Case Summary
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }}>
                <div><div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Case ID</div><div style={{ fontWeight: 600 }}>{existingCase.id}</div></div>
                <div><div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Student Name</div><div style={{ fontWeight: 600 }}>{existingCase.studentName || student?.name || 'N/A'}</div></div>
                <div><div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Roll Number</div><div style={{ fontWeight: 600 }}>{existingCase.rollNo || 'N/A'}</div></div>
                <div><div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Patient Name</div><div style={{ fontWeight: 600 }}>{pData.patientName}</div></div>
                <div><div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Age / Gender</div><div style={{ fontWeight: 600 }}>{pData.age} / {pData.gender}</div></div>
                <div><div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Department / Ward</div><div style={{ fontWeight: 600 }}>{pData.department}</div></div>
                <div style={{ gridColumn: 'span 2' }}><div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Final Diagnosis</div><div style={{ fontWeight: 600 }}>{existingCase.diagnosis || pData.diagnosis || 'N/A'}</div></div>
                <div><div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Submission Date</div><div style={{ fontWeight: 600 }}>{existingCase.submittedDate ? new Date(existingCase.submittedDate).toLocaleDateString() : '-'}</div></div>
              </div>
            </div>

            {/* Documentation Summary Card */}
            <div style={{ backgroundColor: 'var(--bg-surface)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                <CheckSquare size={18} style={{ display: 'inline', verticalAlign: 'text-bottom', marginRight: '0.5rem', color: 'var(--color-primary)' }} />
                Documentation Summary
              </h2>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                    <th style={{ textAlign: 'left', padding: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Module</th>
                    <th style={{ textAlign: 'left', padding: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Review Status</th>
                    <th style={{ textAlign: 'center', padding: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Comments Left</th>
                  </tr>
                </thead>
                <tbody>
                  {submittedForms.map(form => {
                    const status = getRawStatus(form.key);
                    const hasComments = existingCase.forms && existingCase.forms[form.key] && existingCase.forms[form.key].preceptorComments && existingCase.forms[form.key].preceptorComments.trim().length > 0;
                    
                    let statusColor = 'var(--text-secondary)';
                    let statusBg = 'var(--bg-main)';
                    if (status === 'Reviewed') { statusColor = '#166534'; statusBg = '#f0fdf4'; }
                    else if (status === 'Returned') { statusColor = '#991b1b'; statusBg = '#fef2f2'; }
                    else if (status === 'Under Review') { statusColor = '#8f6b00'; statusBg = '#fff8e1'; }

                    return (
                      <tr key={form.key} style={{ borderBottom: '1px solid var(--border-color)' }}>
                        <td style={{ padding: '0.75rem', fontWeight: 500, color: 'var(--text-primary)' }}>
                          {form.label} {form.mandatory && <span style={{ color: '#dc2626' }}>*</span>}
                        </td>
                        <td style={{ padding: '0.75rem' }}>
                          <span style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', borderRadius: '4px', backgroundColor: statusBg, color: statusColor, fontWeight: 700, textTransform: 'uppercase' }}>
                            {status}
                          </span>
                        </td>
                        <td style={{ padding: '0.75rem', textAlign: 'center' }}>
                          {hasComments ? <span style={{ color: '#059669', fontWeight: 600 }}>Yes</span> : <span style={{ color: 'var(--text-secondary)' }}>No</span>}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Overall Review Comments */}
            <div style={{ backgroundColor: 'var(--bg-surface)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Overall Review Comments</h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>Please provide a final summary of your review.</p>
              <textarea 
                value={overallComments}
                onChange={(e) => setOverallComments(e.target.value)}
                placeholder="Enter final remarks for this clinical case here..."
                style={{
                  width: '100%',
                  minHeight: '120px',
                  padding: '1rem',
                  borderRadius: '8px',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'var(--bg-main)',
                  color: 'var(--text-primary)',
                  resize: 'vertical',
                  fontSize: '0.95rem'
                }}
              />
            </div>
            
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* Review Checklist Card */}
            <div style={{ backgroundColor: 'var(--bg-surface)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                <ShieldCheck size={18} style={{ display: 'inline', verticalAlign: 'text-bottom', marginRight: '0.5rem', color: 'var(--color-primary)' }} />
                Pre-Approval Validation
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  {patientProfileReviewed ? <CheckCircle2 size={18} color="#166534" /> : <XSquare size={18} color="#991b1b" />}
                  <span style={{ color: patientProfileReviewed ? '#166534' : '#991b1b', fontWeight: patientProfileReviewed ? 500 : 600 }}>Patient Profile Reviewed</span>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  {allSubmittedReviewed ? <CheckCircle2 size={18} color="#166534" /> : <XSquare size={18} color="#991b1b" />}
                  <span style={{ color: allSubmittedReviewed ? '#166534' : '#991b1b', fontWeight: allSubmittedReviewed ? 500 : 600 }}>All Submitted Modules Reviewed</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  {commentsEntered ? <CheckCircle2 size={18} color="#166534" /> : <XSquare size={18} color="#991b1b" />}
                  <span style={{ color: commentsEntered ? '#166534' : '#991b1b', fontWeight: commentsEntered ? 500 : 600 }}>Overall Remarks Entered</span>
                </div>

              </div>

              {!canApprove && (
                <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', display: 'flex', gap: '0.75rem' }}>
                  <AlertTriangle size={20} color="#991b1b" style={{ flexShrink: 0 }} />
                  <div style={{ fontSize: '0.85rem', color: '#991b1b' }}>
                    <strong style={{ display: 'block', marginBottom: '0.25rem' }}>Action Required</strong>
                    You cannot approve this case until all validation checks above are completed. However, you can still return it to the student.
                  </div>
                </div>
              )}
            </div>

            {/* Final Decision Panel */}
            <div style={{ backgroundColor: 'var(--bg-surface)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                Final Decision
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <button 
                  onClick={handleReturn}
                  style={{ width: '100%', padding: '0.85rem', borderRadius: '8px', border: '1px solid #fecaca', backgroundColor: '#fef2f2', color: '#991b1b', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', cursor: 'pointer', transition: 'all 0.2s' }}
                >
                  <CornerUpLeft size={18} /> Return Case
                </button>
                <button 
                  onClick={handleApprove}
                  disabled={!canApprove}
                  style={{ 
                    width: '100%', 
                    padding: '0.85rem', 
                    borderRadius: '8px', 
                    border: canApprove ? '1px solid #059669' : '1px solid var(--border-color)', 
                    backgroundColor: canApprove ? '#10b981' : 'var(--bg-main)', 
                    color: canApprove ? '#ffffff' : 'var(--text-secondary)', 
                    fontWeight: 600, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    gap: '0.5rem', 
                    cursor: canApprove ? 'pointer' : 'not-allowed', 
                    transition: 'all 0.2s',
                    opacity: canApprove ? 1 : 0.6
                  }}
                >
                  <Send size={18} /> Approve Case
                </button>
              </div>
            </div>

            {/* Audit Trail Card */}
            {existingCase && existingCase.history && existingCase.history.length > 0 && (
              <div style={{ backgroundColor: 'var(--bg-surface)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                <h2 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                  <Clock size={18} style={{ display: 'inline', verticalAlign: 'text-bottom', marginRight: '0.5rem', color: 'var(--color-primary)' }} />
                  Audit Trail
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '300px', overflowY: 'auto' }} className="custom-scrollbar">
                  {[...existingCase.history].reverse().map((entry, index) => (
                    <div key={index} style={{ borderLeft: '2px solid var(--border-color)', paddingLeft: '1rem', position: 'relative' }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--border-color)', position: 'absolute', left: '-5px', top: '5px' }}></div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>{entry.action}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                        By {entry.user} on {new Date(entry.date).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
          </div>
        </div>

      </div>
    </PreceptorLayout>
  );
};

export default FinalReview;
