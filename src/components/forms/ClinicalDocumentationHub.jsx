import React, { useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { User, MessageSquare, Pill, Activity, AlertTriangle, ChevronRight, ArrowLeft, CheckCircle, ShieldCheck, Download } from 'lucide-react';
import StudentLayout from '../student/StudentLayout';
import PreceptorLayout from '../preceptor/PreceptorLayout';
import CollegeAdminLayout from '../college/CollegeAdminLayout';
import AdminLayout from '../admin/AdminLayout';
import { useDatabase } from '../../context/DatabaseContext';
import { useAuth } from '../../context/AuthContext';
import { exportClinicalCasePDF } from '../../utils/ExportEngine';
import '../../pages/college/PreceptorManagement.css'; // Inheriting exact styles

const ClinicalDocumentationHub = ({ role = 'student' }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cases, users, colleges, markCaseUnderReview } = useDatabase();
  const { currentUser } = useAuth();

  // Role authorization for PDF Export
  const canExportThisCase = (existingCase) => {
    if (!existingCase || !currentUser) return false;
    if (currentUser.role === 'superadmin' || currentUser.role === 'admin' || currentUser.role === 'preceptor') return true;
    if (currentUser.role === 'student') {
      // Condition 11.A: Student can ONLY export their OWN clinical cases
      return existingCase.studentId === currentUser.id || existingCase.rollNo === currentUser.id;
    }
    return false;
  };
  
  const isPreceptor = role === 'preceptor';
  const isAdmin = role === 'admin';
  const isSuperAdmin = role === 'superadmin';
  const Layout = isPreceptor ? PreceptorLayout : (isSuperAdmin ? AdminLayout : (isAdmin ? CollegeAdminLayout : StudentLayout));

  const existingCase = id ? cases.find(c => c.id === id) : null;
  const student = existingCase ? users.find(u => u.id === existingCase.rollNo) : null;

  useEffect(() => {
    // If Preceptor, immediately mark under review if it's Assigned to Preceptor, Submitted, or Resubmitted
    if (isPreceptor && existingCase && ['Submitted', 'Assigned to Preceptor', 'Resubmitted'].includes(existingCase.status)) {
      markCaseUnderReview(existingCase.id);
    }
  }, [isPreceptor, existingCase, markCaseUnderReview]);

  // Determine base paths based on role
  let basePath = '/student/new-case';
  let backPath = '/student/cases';
  let title = 'New Clinical Case';
  
  if (id) {
    if (isPreceptor) {
      basePath = `/preceptor/cases/view/${id}`;
      backPath = '/preceptor/cases/list';
      title = `Clinical Case Details: ${id}`;
    } else if (isSuperAdmin) {
      basePath = `/super-admin/cases/view/${id}`;
      backPath = '/super-admin/cases';
      title = `View Case: ${id}`;
    } else if (isAdmin) {
      basePath = `/college-admin/cases/view/${id}`;
      backPath = '/college-admin/cases/list';
      title = `View Case: ${id}`;
    } else {
      basePath = `/student/cases/view/${id}`;
      backPath = '/student/library';
      title = `View Case: ${id}`;
    }
  }

  // Preceptor case extraction helpers
  const getPatientData = (forms) => {
    if (!forms || !forms.patientProfile || !forms.patientProfile.data) {
      return { patientName: 'N/A', department: 'N/A', diagnosis: 'N/A' };
    }
    const data = forms.patientProfile.data;
    return {
      patientName: data.patientName || data.name || data.patientInitials || 'N/A',
      department: data.department || data.ward || 'N/A',
      diagnosis: data.finalDiagnosis || data.diagnosis || 'N/A'
    };
  };

  const pData = existingCase ? getPatientData(existingCase.forms) : { patientName: 'N/A', department: 'N/A' };

  // Helper to determine status if it exists and map to exact requested nomenclature
  const getRawStatus = (formKey) => {
    if (!existingCase || !existingCase.forms || !existingCase.forms[formKey]) return 'Incomplete';
    const status = existingCase.forms[formKey].status;
    if (status === 'Approved') return isPreceptor ? 'Reviewed' : 'Completed';
    if (status === 'Returned') return 'Returned';
    if (status === 'Submitted' || status === 'Under Review' || status === 'Assigned to Preceptor' || status === 'Resubmitted') return isPreceptor ? 'Pending Review' : 'Completed';
    if (status === 'Reviewed') return 'Reviewed';
    return 'Incomplete';
  };

  const isFormSubmitted = (formKey) => {
    if (formKey === 'patientProfile') return true;
    if (!existingCase || !existingCase.forms || !existingCase.forms[formKey]) return false;
    const status = existingCase.forms[formKey].status;
    return !['Incomplete', 'Not Started', 'Not Applicable', 'Draft', undefined, null].includes(status);
  };

  const getStatusBadge = (statusStr) => {
    let color = 'var(--text-secondary)';
    let bg = 'var(--bg-main)';

    if (statusStr === 'Completed' || statusStr === 'Reviewed') {
      color = '#166534'; bg = '#f0fdf4';
    } else if (statusStr === 'Returned') {
      color = '#991b1b'; bg = '#fef2f2';
    } else if (statusStr === 'Pending Review') {
      color = '#8f6b00'; bg = '#fff8e1';
    }

    return (
      <span style={{ fontSize: '0.7rem', padding: '0.25rem 0.5rem', borderRadius: '4px', backgroundColor: bg, color: color, fontWeight: 700, textTransform: 'uppercase', marginLeft: '0.5rem' }}>
        {statusStr}
      </span>
    );
  };

  const getCaseStatusColor = (status) => {
    if (status === 'Approved') return { bg: '#f0fdf4', text: '#166534' };
    if (status === 'Returned') return { bg: '#fef2f2', text: '#991b1b' };
    if (status === 'Under Review' || status === 'Pending') return { bg: '#fff8e1', text: '#8f6b00' };
    return { bg: 'var(--bg-main)', text: 'var(--text-secondary)' };
  };

  return (
    <Layout>
      <div className="preceptor-page">
        <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h1 className="page-title">{isPreceptor ? 'Clinical Case Details' : title}</h1>
            <div className="breadcrumbs" style={{ marginTop: '0.5rem' }}>
              <Link to={isPreceptor ? "/preceptor/dashboard" : "/student/dashboard"} className="breadcrumb-link">Dashboard</Link>
              <span className="breadcrumb-separator">&gt;</span>
              <Link to={backPath} className="breadcrumb-link">Clinical Cases</Link>
              <span className="breadcrumb-separator">&gt;</span>
              <span>{isPreceptor ? 'Case Details' : (id ? 'View Case' : 'New Case')}</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {existingCase && canExportThisCase(existingCase) && (
              <button 
                className="btn-primary" 
                onClick={() => {
                  const col = colleges?.find(c => c.id === currentUser?.collegeId) || { name: 'PharmDVerse College of Pharmacy', logo: 'PDV' };
                  exportClinicalCasePDF(existingCase, col, currentUser);
                }}
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}
              >
                <Download size={16} /> Export Case PDF
              </button>
            )}
            <Link to={backPath} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
              <ArrowLeft size={16} /> Back
            </Link>
          </div>
        </div>

        {/* PRECEPTOR CASE HEADER */}
        {isPreceptor && existingCase && (
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
            {/* Case Summary Card */}
            <div style={{ backgroundColor: 'var(--bg-surface)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-color)', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <h2 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)' }}>Case Summary</h2>
                <span style={{ 
                  padding: '0.35rem 0.75rem', 
                  borderRadius: '6px', 
                  backgroundColor: getCaseStatusColor(existingCase.status === 'Pending' ? 'Under Review' : existingCase.status).bg, 
                  color: getCaseStatusColor(existingCase.status === 'Pending' ? 'Under Review' : existingCase.status).text, 
                  fontWeight: 700, 
                  fontSize: '0.85rem',
                  textTransform: 'uppercase'
                }}>
                  {existingCase.status === 'Pending' ? 'Under Review' : existingCase.status}
                </span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.25rem' }}>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Case ID</div>
                  <div style={{ fontWeight: 600 }}>{existingCase.id}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Student Name</div>
                  <div style={{ fontWeight: 600 }}>{existingCase.studentName || student?.name || student?.fullName || 'N/A'}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Roll Number</div>
                  <div style={{ fontWeight: 600 }}>{existingCase.rollNo || 'N/A'}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Patient Name</div>
                  <div style={{ fontWeight: 600 }}>{pData.patientName}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Final Diagnosis</div>
                  <div style={{ fontWeight: 600 }}>{existingCase.diagnosis || pData.diagnosis || 'N/A'}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Department / Ward</div>
                  <div style={{ fontWeight: 600 }}>{pData.department}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Date of Submission</div>
                  <div style={{ fontWeight: 600 }}>{existingCase.submittedDate || existingCase.date ? new Date(existingCase.submittedDate || existingCase.date).toLocaleDateString() : '-'}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Last Updated</div>
                  <div style={{ fontWeight: 600 }}>{existingCase.lastUpdated || existingCase.submittedDate || existingCase.date ? new Date(existingCase.lastUpdated || existingCase.submittedDate || existingCase.date).toLocaleDateString() : '-'}</div>
                </div>
              </div>
            </div>

            {/* Overall Case Progress Card */}
            <div style={{ backgroundColor: 'var(--bg-surface)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-color)', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1rem' }}>Overall Case Progress</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Patient Profile</span>
                  <div style={{ flex: 1, borderBottom: '1px dotted var(--border-color)', margin: '0 10px' }}></div>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: getRawStatus('patientProfile') === 'Incomplete' ? 'var(--text-secondary)' : 'var(--text-primary)' }}>{getRawStatus('patientProfile')}</span>
                </div>
                {((!isPreceptor && !isAdmin && !isSuperAdmin) || isFormSubmitted('patientCounselling')) && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Patient Counselling</span>
                    <div style={{ flex: 1, borderBottom: '1px dotted var(--border-color)', margin: '0 10px' }}></div>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: getRawStatus('patientCounselling') === 'Incomplete' ? 'var(--text-secondary)' : 'var(--text-primary)' }}>{getRawStatus('patientCounselling')}</span>
                  </div>
                )}
                {((!isPreceptor && !isAdmin && !isSuperAdmin) || isFormSubmitted('drugInformation')) && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Drug Information</span>
                    <div style={{ flex: 1, borderBottom: '1px dotted var(--border-color)', margin: '0 10px' }}></div>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: getRawStatus('drugInformation') === 'Incomplete' ? 'var(--text-secondary)' : 'var(--text-primary)' }}>{getRawStatus('drugInformation')}</span>
                  </div>
                )}
                {((!isPreceptor && !isAdmin && !isSuperAdmin) || isFormSubmitted('pharmacistIntervention')) && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Pharmacist Intervention</span>
                    <div style={{ flex: 1, borderBottom: '1px dotted var(--border-color)', margin: '0 10px' }}></div>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: getRawStatus('pharmacistIntervention') === 'Incomplete' ? 'var(--text-secondary)' : 'var(--text-primary)' }}>{getRawStatus('pharmacistIntervention')}</span>
                  </div>
                )}
                {((!isPreceptor && !isAdmin && !isSuperAdmin) || isFormSubmitted('adr')) && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>ADR</span>
                    <div style={{ flex: 1, borderBottom: '1px dotted var(--border-color)', margin: '0 10px' }}></div>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: getRawStatus('adr') === 'Incomplete' ? 'var(--text-secondary)' : 'var(--text-primary)' }}>{getRawStatus('adr')}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* STUDENT STATUS HEADER */}
        {existingCase && !isPreceptor && !isAdmin && !isSuperAdmin && (
          <div style={{ marginBottom: '2rem', padding: '1rem', backgroundColor: 'var(--bg-surface)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Status:</span>
              <span style={{ fontSize: '0.85rem', padding: '0.25rem 0.5rem', borderRadius: '4px', backgroundColor: getCaseStatusColor(existingCase.status).bg, color: getCaseStatusColor(existingCase.status).text, fontWeight: 700, textTransform: 'uppercase' }}>
                {['Submitted', 'Assigned to Preceptor', 'Resubmitted'].includes(existingCase.status) ? 'Awaiting Preceptor Review' : existingCase.status}
              </span>
              {existingCase.status === 'Returned' && existingCase.overallRemarks && (
                <span style={{ fontSize: '0.85rem', color: '#991b1b', marginLeft: '0.5rem' }}>- Preceptor Remarks: {existingCase.overallRemarks}</span>
              )}
            </div>
          </div>
        )}

        <div style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)' }}>Documentation Navigation</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '0.25rem' }}>
            Select a section to {isPreceptor ? 'review submitted information in read-only mode' : 'view or edit documentation'}.
          </p>
        </div>

        <div className="preceptor-actions-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))' }}>
          
          <Link to={`${basePath}/patient-profile`} className="action-card">
            <div className="action-icon-wrapper blue" style={{ position: 'relative' }}>
              <User size={32} />
            </div>
            <div className="action-details" style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
              <span className="action-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span>Patient Profile Form {getStatusBadge(getRawStatus('patientProfile'))}</span>
              </span>
              <span className="action-subtitle">Complete patient documentation.</span>
            </div>
            <ChevronRight size={20} color="var(--text-secondary)" style={{ marginLeft: 'auto' }} />
          </Link>

          {((!isPreceptor && !isAdmin && !isSuperAdmin) || isFormSubmitted('patientCounselling')) && (
            <Link to={`${basePath}/patient-counselling`} className="action-card">
              <div className="action-icon-wrapper green">
                <MessageSquare size={32} />
              </div>
              <div className="action-details" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <span className="action-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>Patient Counselling Form {getStatusBadge(getRawStatus('patientCounselling'))}</span>
                </span>
                <span className="action-subtitle">Document patient counselling.</span>
              </div>
              <ChevronRight size={20} color="var(--text-secondary)" style={{ marginLeft: 'auto' }} />
            </Link>
          )}

          {((!isPreceptor && !isAdmin && !isSuperAdmin) || isFormSubmitted('drugInformation')) && (
            <Link to={`${basePath}/drug-information`} className="action-card">
              <div className="action-icon-wrapper purple">
                <Pill size={32} />
              </div>
              <div className="action-details" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <span className="action-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>Drug Information Request Form {getStatusBadge(getRawStatus('drugInformation'))}</span>
                </span>
                <span className="action-subtitle">Document drug information requests.</span>
              </div>
              <ChevronRight size={20} color="var(--text-secondary)" style={{ marginLeft: 'auto' }} />
            </Link>
          )}

          {((!isPreceptor && !isAdmin && !isSuperAdmin) || isFormSubmitted('pharmacistIntervention')) && (
            <Link to={`${basePath}/pharmacist-intervention`} className="action-card">
              <div className="action-icon-wrapper orange">
                <Activity size={32} />
              </div>
              <div className="action-details" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <span className="action-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>Pharmacist Intervention Form {getStatusBadge(getRawStatus('pharmacistIntervention'))}</span>
                </span>
                <span className="action-subtitle">Document pharmacist interventions.</span>
              </div>
              <ChevronRight size={20} color="var(--text-secondary)" style={{ marginLeft: 'auto' }} />
            </Link>
          )}

          {((!isPreceptor && !isAdmin && !isSuperAdmin) || isFormSubmitted('adr')) && (
            <Link to={`${basePath}/adr-reporting`} className="action-card">
              <div className="action-icon-wrapper red">
                <AlertTriangle size={32} />
              </div>
              <div className="action-details" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <span className="action-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>Adverse Drug Reaction Form {getStatusBadge(getRawStatus('adr'))}</span>
                </span>
                <span className="action-subtitle">Document adverse drug reactions.</span>
              </div>
              <ChevronRight size={20} color="var(--text-secondary)" style={{ marginLeft: 'auto' }} />
            </Link>
          )}

        </div>

        {/* PROCEED TO FINAL REVIEW BUTTON (PRECEPTOR ONLY) */}
        {isPreceptor && existingCase && existingCase.status !== 'Approved' && existingCase.status !== 'Returned' && (
          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
            <Link 
              to={`${basePath}/final-review`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                backgroundColor: 'var(--color-primary)',
                color: '#ffffff',
                padding: '0.85rem 1.5rem',
                borderRadius: '8px',
                fontWeight: 600,
                textDecoration: 'none',
                boxShadow: '0 4px 6px -1px rgba(11, 87, 208, 0.2)',
                transition: 'all 0.2s ease',
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <ShieldCheck size={20} />
              Proceed to Final Review
            </Link>
          </div>
        )}

        {/* Case History Timeline */}
        {existingCase && existingCase.history && existingCase.history.length > 0 && (
          <div style={{ marginTop: isPreceptor ? '2rem' : '3rem', padding: '1.5rem', backgroundColor: 'var(--bg-surface)', borderRadius: '12px', border: '1px solid var(--border-color)', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
            <h2 className="page-title" style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>Case History</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {existingCase.history.map((entry, index) => (
                <div key={index} style={{ display: 'flex', gap: '1.5rem', alignItems: 'stretch' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '20px' }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'var(--color-blue)', marginTop: '0.35rem', zIndex: 2 }}></div>
                    {index !== existingCase.history.length - 1 && (
                      <div style={{ width: '2px', flex: 1, backgroundColor: 'var(--border-color)', margin: '4px 0', minHeight: '30px' }}></div>
                    )}
                  </div>
                  <div style={{ paddingBottom: index !== existingCase.history.length - 1 ? '1.5rem' : '0', flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                      <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{entry.action}</span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', backgroundColor: 'var(--bg-main)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                        {new Date(entry.date).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                      By: <span style={{ fontWeight: 500 }}>{entry.user}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ClinicalDocumentationHub;
