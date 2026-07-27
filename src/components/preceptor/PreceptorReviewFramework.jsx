import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useLocation, Outlet } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight, CheckCircle2, AlertTriangle, Clock, CircleDot, Circle, Download } from 'lucide-react';
import AdminLayout from '../admin/AdminLayout';
import CollegeAdminLayout from '../college/CollegeAdminLayout';
import PreceptorLayout from './PreceptorLayout';
import { useDatabase } from '../../context/DatabaseContext';
import { useAuth } from '../../context/AuthContext';
import { exportClinicalCasePDF } from '../../utils/ExportEngine';
import '../../pages/college/PreceptorManagement.css';

const FORMS_SEQUENCE = [
  { key: 'patientProfile', path: 'patient-profile', label: 'Patient Profile' },
  { key: 'patientCounselling', path: 'patient-counselling', label: 'Patient Counselling' },
  { key: 'drugInformation', path: 'drug-information', label: 'Drug Information Request' },
  { key: 'pharmacistIntervention', path: 'pharmacist-intervention', label: 'Pharmacist Intervention' },
  { key: 'adr', path: 'adr-reporting', label: 'ADR' }
];

const PreceptorReviewFramework = ({ role = 'preceptor' }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { cases, users, markCaseUnderReview, updateFormStatus } = useDatabase();
  const { currentUser } = useAuth();
  const sidebarNavRef = useRef(null);
  const contentScrollRef = useRef(null);
  
  const isPreceptor = role === 'preceptor';
  const isAdmin = role === 'admin';
  const isSuperAdmin = role === 'superadmin';
  const Layout = isPreceptor ? PreceptorLayout : (isSuperAdmin ? AdminLayout : CollegeAdminLayout);
  
  const basePath = isSuperAdmin ? '/super-admin/cases' : (isAdmin ? '/college-admin/cases' : '/preceptor/cases');

  const existingCase = id ? cases.find(c => c.id === id) : null;
  const student = existingCase ? users.find(u => u.id === existingCase.rollNo) : null;

  const isFormSubmitted = (formKey) => {
    if (formKey === 'patientProfile') return true;
    if (!existingCase || !existingCase.forms || !existingCase.forms[formKey]) return false;
    const status = existingCase.forms[formKey].status;
    return !['Incomplete', 'Not Started', 'Not Applicable', 'Draft', undefined, null].includes(status);
  };

  const activeSequence = FORMS_SEQUENCE.filter(f => isFormSubmitted(f.key));

  // Determine which form we are currently viewing
  const currentPathSegment = location.pathname.split('/').pop();
  const currentFormIndex = activeSequence.findIndex(f => f.path === currentPathSegment);
  const currentForm = currentFormIndex !== -1 ? activeSequence[currentFormIndex] : activeSequence[0];

  const [reviewComments, setReviewComments] = useState('');

  useEffect(() => {
    if (existingCase && ['Submitted', 'Assigned to Preceptor', 'Resubmitted'].includes(existingCase.status)) {
      markCaseUnderReview(existingCase.id);
    }
  }, [existingCase, markCaseUnderReview]);

  // Auto-scroll the sidebar to keep the active section item visible
  useEffect(() => {
    if (sidebarNavRef.current) {
      const activeItem = sidebarNavRef.current.querySelector('[data-active="true"]');
      if (activeItem) {
        activeItem.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    }
  }, [currentFormIndex]);

  // Scroll content area to top whenever the section changes
  useEffect(() => {
    if (contentScrollRef.current) {
      contentScrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.pathname]);

  // Load existing comments when switching forms
  useEffect(() => {
    if (existingCase && existingCase.forms && existingCase.forms[currentForm.key]) {
      setReviewComments(existingCase.forms[currentForm.key].preceptorComments || '');
    } else {
      setReviewComments('');
    }
  }, [existingCase, currentForm.key]);

  // Auto-save comments before unmounting or navigating
  const saveCurrentComments = () => {
    if (!isPreceptor) return; // Only Preceptor can save comments
    if (existingCase && existingCase.forms && existingCase.forms[currentForm.key]) {
      let currentStatus = existingCase.forms[currentForm.key].status || 'Incomplete';
      // Automatically upgrade pending statuses to 'Reviewed' when navigating away
      if (['Submitted', 'Under Review', 'Pending', 'Assigned to Preceptor', 'Resubmitted'].includes(currentStatus)) {
        currentStatus = 'Reviewed';
      }
      updateFormStatus(existingCase.id, currentForm.key, currentStatus, reviewComments);
    }
  };

  const handleNext = () => {
    saveCurrentComments();
    if (currentFormIndex !== -1 && currentFormIndex < activeSequence.length - 1) {
      navigate(`${basePath}/view/${id}/${activeSequence[currentFormIndex + 1].path}`);
    } else if (isPreceptor) {
      // Reached the end, go to Final Review
      navigate(`${basePath}/view/${id}/final-review`);
    } else {
      // Admin/SuperAdmin reached end
      navigate(`${basePath}/view/${id}`);
    }
  };

  const handlePrevious = () => {
    saveCurrentComments();
    if (currentFormIndex > 0) {
      navigate(`${basePath}/view/${id}/${activeSequence[currentFormIndex - 1].path}`);
    } else {
      navigate(`${basePath}/view/${id}`);
    }
  };

  if (!existingCase) {
    return (
      <Layout>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1rem' }}>Case Not Found</h2>
          <p style={{ color: 'var(--text-secondary)' }}>The requested clinical case could not be found or you do not have permission to view it.</p>
          <button 
            onClick={() => navigate(-1)} 
            style={{ 
              marginTop: '1.5rem', 
              padding: '0.75rem 1.5rem', 
              backgroundColor: 'var(--color-primary)', 
              color: 'white', 
              border: 'none', 
              borderRadius: '8px', 
              cursor: 'pointer',
              fontWeight: 600
            }}
          >
            Go Back
          </button>
        </div>
      </Layout>
    );
  }

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

  const pData = getPatientData(existingCase.forms);

  const getRawStatus = (formKey) => {
    if (!existingCase || !existingCase.forms || !existingCase.forms[formKey]) return 'Incomplete';
    const status = existingCase.forms[formKey].status;
    if (status === 'Reviewed') return 'Reviewed';
    if (status === 'Returned') return 'Returned';
    if (status === 'Submitted' || status === 'Under Review' || status === 'Pending' || status === 'Assigned to Preceptor' || status === 'Resubmitted') return 'Pending Review';
    return 'Incomplete';
  };

  const totalModules = activeSequence.length;
  const reviewedModules = activeSequence.filter(f => getRawStatus(f.key) === 'Reviewed').length;
  const progressPercent = totalModules > 0 ? Math.round((reviewedModules / totalModules) * 100) : 0;

  const getStatusBadge = (statusStr) => {
    let color = 'var(--text-secondary)';
    let bg = 'var(--bg-main)';

    if (statusStr === 'Completed' || statusStr === 'Reviewed') {
      color = '#166534'; bg = '#f0fdf4';
    } else if (statusStr === 'Returned') {
      color = '#991b1b'; bg = '#fef2f2';
    } else if (statusStr === 'Under Review') {
      color = '#8f6b00'; bg = '#fff8e1';
    } else if (statusStr === 'Not Started') {
      color = 'var(--text-secondary)'; bg = 'var(--border-color)';
    }

    return (
      <span style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', borderRadius: '4px', backgroundColor: bg, color: color, fontWeight: 700, textTransform: 'uppercase' }}>
        {statusStr}
      </span>
    );
  };

  return (
    <Layout>
      <div className="preceptor-page">
        <div className="page-header" style={{ marginBottom: '1rem' }}>
          <div>
            <h1 className="page-title">Clinical Documentation Review</h1>
            <div className="breadcrumbs" style={{ marginTop: '0.5rem' }}>
              <span onClick={() => { saveCurrentComments(); navigate(isSuperAdmin ? '/super-admin/dashboard' : (isAdmin ? '/college-admin/dashboard' : '/preceptor/dashboard')); }} className="breadcrumb-link" style={{ cursor: 'pointer' }}>Dashboard</span>
              <span className="breadcrumb-separator">&gt;</span>
              <span onClick={() => { saveCurrentComments(); navigate(isAdmin ? '/college-admin/cases/list' : `${basePath}`); }} className="breadcrumb-link" style={{ cursor: 'pointer' }}>Clinical Cases</span>
              <span className="breadcrumb-separator">&gt;</span>
              <span onClick={() => { saveCurrentComments(); navigate(`${basePath}/view/${id}`); }} className="breadcrumb-link" style={{ cursor: 'pointer' }}>Case Details</span>
              <span className="breadcrumb-separator">&gt;</span>
              <span>Review Framework</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {existingCase && (
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
            <button onClick={() => { saveCurrentComments(); navigate(`${basePath}/view/${id}`); }} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ArrowLeft size={16} /> Back to Case Details
            </button>
          </div>
        </div>

        {/* FIXED CASE HEADER */}
        <div style={{ backgroundColor: 'var(--bg-surface)', padding: '1rem 1.5rem', borderRadius: '8px', border: '1px solid var(--border-color)', marginBottom: '1.5rem', display: 'flex', flexWrap: 'wrap', gap: '1.5rem', alignItems: 'center', position: 'sticky', top: '1rem', zIndex: 100 }}>
          <div style={{ flex: '1 1 150px' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Case ID</div>
            <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{existingCase.id}</div>
          </div>
          <div style={{ flex: '1 1 150px' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Student Name</div>
            <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{existingCase.studentName || student?.name || 'N/A'}</div>
          </div>
          <div style={{ flex: '1 1 150px' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Roll Number</div>
            <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{existingCase.rollNo || 'N/A'}</div>
          </div>
          <div style={{ flex: '1 1 150px' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Patient Name</div>
            <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{pData.patientName}</div>
          </div>
          <div style={{ flex: '1 1 150px' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Final Diagnosis</div>
            <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{existingCase.diagnosis || pData.diagnosis || 'N/A'}</div>
          </div>
          <div style={{ flex: '1 1 150px' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Current Status</div>
            <div style={{ fontWeight: 600 }}>{getStatusBadge(existingCase.status === 'Pending' ? 'Under Review' : existingCase.status)}</div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
          
          {/* NAVIGATION SIDEBAR */}
          <div style={{ width: '280px', flexShrink: 0, backgroundColor: 'var(--bg-surface)', borderRadius: '8px', border: '1px solid var(--border-color)', overflow: 'hidden', position: 'sticky', top: '120px', alignSelf: 'flex-start' }}>
            <div style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)', backgroundColor: 'var(--bg-main)' }}>
              <h3 style={{ fontSize: '0.9rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)', textTransform: 'uppercase' }}>Case Summary</h3>
            </div>
            <div ref={sidebarNavRef} style={{ display: 'flex', flexDirection: 'column', maxHeight: '400px', overflowY: 'auto' }}>
              {activeSequence.map((form, idx) => {
                const isActive = currentFormIndex === idx;
                const status = getRawStatus(form.key);
                return (
                  <div 
                    key={form.key}
                    data-active={isActive ? 'true' : 'false'}
                    onClick={() => { saveCurrentComments(); navigate(`${basePath}/view/${id}/${form.path}`); }}
                    style={{ 
                      padding: '1rem', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'space-between',
                      borderBottom: idx !== activeSequence.length - 1 ? '1px solid var(--border-color)' : 'none',
                      backgroundColor: isActive ? 'rgba(11, 87, 208, 0.05)' : 'transparent',
                      borderLeft: isActive ? '4px solid var(--color-primary)' : '4px solid transparent',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      {isActive ? <CircleDot size={16} color="var(--color-primary)" /> :
                       status === 'Reviewed' ? <CheckCircle2 size={16} color="#166534" /> : 
                       status === 'Returned' ? <AlertTriangle size={16} color="#991b1b" /> : 
                       <Circle size={16} color="var(--text-secondary)" />}
                      <span style={{ fontSize: '0.9rem', fontWeight: isActive ? 600 : 500, color: isActive ? 'var(--color-primary)' : 'var(--text-primary)' }}>
                        {form.label}
                      </span>
                    </div>
                    <span style={{ fontSize: '0.7rem', color: isActive ? 'var(--color-primary)' : 'var(--text-secondary)' }}>
                      {isActive ? 'Currently Reviewing' : status}
                    </span>
                  </div>
                );
              })}
            </div>
            
            {/* PROGRESS SUMMARY */}
            <div style={{ padding: '1rem', borderTop: '1px solid var(--border-color)', backgroundColor: 'var(--bg-main)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Review Progress</span>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>{progressPercent}%</span>
              </div>
              <div style={{ width: '100%', height: '6px', backgroundColor: 'var(--border-color)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: `${progressPercent}%`, height: '100%', backgroundColor: 'var(--color-primary)', transition: 'width 0.3s ease' }}></div>
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.5rem', textAlign: 'center' }}>
                {reviewedModules} of {totalModules} Modules Reviewed
              </div>
            </div>
          </div>

          {/* MAIN CONTENT AREA */}
          <div ref={contentScrollRef} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1.5rem', minWidth: 0, overflowY: 'auto' }}>
            
            {/* Header for current section */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--bg-surface)', padding: '1rem 1.5rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>{currentForm.label}</h2>
              {getStatusBadge(getRawStatus(currentForm.key))}
            </div>

            {/* Read-Only Form Injection — pointerEvents removed so Next/Prev Section buttons work */}
            <div style={{ backgroundColor: 'var(--bg-surface)', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--border-color)', opacity: 0.97 }}>
              <div style={{ marginBottom: '1rem', padding: '0.75rem', backgroundColor: '#eff6ff', borderRadius: '6px', border: '1px solid #bfdbfe', color: '#1e40af', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={16} /> Viewing in read-only mode. Form inputs are locked. Navigation controls are active.
              </div>
              <Outlet />
            </div>

            {isPreceptor && (
              <div style={{ backgroundColor: 'var(--bg-surface)', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>Section Review Comments</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                  Enter comments specific to the {currentForm.label}. These comments are saved automatically when navigating.
                </p>
                <textarea 
                  value={reviewComments}
                  onChange={(e) => setReviewComments(e.target.value)}
                  onBlur={saveCurrentComments}
                  placeholder={`Type review comments for ${currentForm.label} here...`}
                  style={{
                    width: '100%',
                    minHeight: '120px',
                    padding: '1rem',
                    borderRadius: '8px',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'var(--bg-main)',
                    color: 'var(--text-primary)',
                    fontFamily: 'inherit',
                    fontSize: '0.95rem',
                    resize: 'vertical'
                  }}
                />
              </div>
            )}

            {/* PREVIOUS / NEXT NAVIGATION */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 0' }}>
              <button 
                onClick={handlePrevious}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.5rem',
                  padding: '0.75rem 1.5rem', borderRadius: '8px',
                  backgroundColor: 'var(--bg-surface)', color: 'var(--text-primary)',
                  fontWeight: 600, border: '1px solid var(--border-color)', cursor: 'pointer', transition: 'all 0.2s'
                }}
              >
                <ChevronLeft size={18} /> Previous
              </button>
              
              <button 
                onClick={handleNext}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.5rem',
                  padding: '0.75rem 1.5rem', borderRadius: '8px',
                  backgroundColor: 'var(--color-primary)', color: 'white',
                  fontWeight: 600, border: 'none', cursor: 'pointer', transition: 'all 0.2s'
                }}
              >
                {currentFormIndex === FORMS_SEQUENCE.length - 1 ? (isPreceptor ? 'Complete Review' : 'Back to Case Summary') : 'Next Section'} <ChevronRight size={18} />
              </button>
            </div>

          </div>

        </div>
      </div>
    </Layout>
  );
};

export default PreceptorReviewFramework;
