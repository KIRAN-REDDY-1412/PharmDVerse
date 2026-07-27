import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Save, Send, UserCheck, Stethoscope, AlertCircle, FileText, CheckCircle2 } from 'lucide-react';
import StudentLayout from '../student/StudentLayout';
import CollegeAdminLayout from '../college/CollegeAdminLayout';
import AdminLayout from '../admin/AdminLayout';
import { useDatabase } from '../../context/DatabaseContext';
import '../../pages/college/PreceptorManagement.css';
import './PatientProfileForm.css';

const PatientCounsellingForm = ({ role = 'student' }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { cases, submitCase, saveDraftCase, updateFormStatus } = useDatabase();

  const isAdmin = role === 'admin';
  const isPreceptor = role === 'preceptor';
  const isSuperAdmin = role === 'superadmin';
  const Layout = (isPreceptor || isAdmin || isSuperAdmin) ? React.Fragment : StudentLayout;
  
  const existingCase = id ? cases.find(c => c.id === id) : null;
  const isLocked = isPreceptor || isAdmin || isSuperAdmin || (existingCase && ['Approved', 'Submitted', 'Under Review'].includes(existingCase.status));
  
  let dashboardPath = '/student/dashboard';
  let backPath = '/student/new-case';
  let backText = 'New Case';

  if (isPreceptor) {
    dashboardPath = '/preceptor/dashboard';
    backPath = `/preceptor/cases/view/${id}`;
    backText = 'Review Case';
  } else if (isSuperAdmin) {
    dashboardPath = '/super-admin/dashboard';
    backPath = `/super-admin/cases/view/${id}`;
    backText = 'View Case';
  } else if (isAdmin) {
    dashboardPath = '/college-admin/dashboard';
    backPath = `/college-admin/cases/view/${id}`;
    backText = 'View Case';
  } else if (id) {
    backPath = `/student/cases/view/${id}`;
    backText = 'View Case';
  }

  const formStatus = existingCase?.forms?.patientCounselling?.status || 'Pending';
  const [preceptorComments, setPreceptorComments] = useState(existingCase?.forms?.patientCounselling?.comments || '');
  const isReturned = existingCase && existingCase.status === 'Returned';
  
  // Section Navigation
  const [activeSection, setActiveSection] = useState(1);
  const sections = [
    { id: 1, title: 'Patient Information', icon: <UserCheck size={18} /> },
    { id: 2, title: 'Clinical Context', icon: <Stethoscope size={18} /> },
    { id: 3, title: 'Counselling Details', icon: <FileText size={18} /> },
    { id: 4, title: 'Barriers & Outcomes', icon: <AlertCircle size={18} /> },
    { id: 5, title: 'Review & Submit', icon: <CheckCircle2 size={18} /> }
  ];

  const handleNext = () => { if (activeSection < sections.length) setActiveSection(prev => prev + 1); };
  const handlePrev = () => { if (activeSection > 1) setActiveSection(prev => prev - 1); };

  // Scroll content to top when section changes
  const contentBodyRef = useRef(null);
  useEffect(() => {
    if (contentBodyRef.current) {
      contentBodyRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [activeSection]);

  // Form State
  const [formData, setFormData] = useState({
    // Auto-fetched (Read Only)
    patientName: '',
    age: '',
    gender: '',
    ipNumber: '',
    ward: '',
    allergies: '',

    // Form specific
    date: new Date().toISOString().split('T')[0],
    time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: "numeric", minute: "numeric"}),
    patientType: '',
    backgroundCollected: '',
    diseaseCounselled: '',
    medicationsCounselled: '',

    // Points covered (checkboxes)
    pointsNamePurpose: false,
    pointsDosage: false,
    pointsMissedDose: false,
    pointsSideEffects: false,
    pointsInteractions: false,
    pointsPrecautions: false,
    pointsStorage: false,
    pointsBenefits: false,
    pointsLifestyle: false,

    // Barriers
    barriersInvolved: '',
    barriersSpecify: '',
    barriersOvercome: '',
    
    // Time & Target
    timeTaken: '',
    providedTo: '',
    representativeReason: {
      unconscious: false,
      hearing: false,
      language: false,
      pediatric: false,
      others: false,
      othersSpecify: ''
    },

    // Resources & Outcome
    counsellingAids: '',
    materialProvided: '',
    understandingAscertained: ''
  });

  // Mock Auto-fetch effect
  useEffect(() => {
    // In a real app, this would fetch the master Patient Profile record from context or API
    setFormData(prev => ({
      ...prev,
      patientName: 'T.Sri Rami Reddy',
      age: '45',
      gender: 'Male',
      ipNumber: '1234567890',
      ward: 'General Ward',
      allergies: 'None reported'
    }));
  }, []);

  // Formatting Engines
  const formatTitleCaseLive = (str) => {
    if (typeof str !== 'string' || !str) return str;
    const connectors = new Set(['of', 'on', 'in', 'to', 'for', 'and', 'or', 'with', 'by', 'at', 'from', 'into', 'over', 'under', 'between', 'after', 'before', 'through', 'via', 'per', 'vs']);
    const cleaned = str.replace(/[ \t]{2,}/g, ' ');
    return cleaned.split(' ').map((word, index) => {
      if (word.length === 0) return word;
      const lower = word.toLowerCase();
      if (index !== 0 && connectors.has(lower)) {
        return lower;
      }
      return lower.replace(/(^\w|[.'-]\w)/g, m => m.toUpperCase());
    }).join(' ');
  };

  const formatSentenceCaseLive = (str) => {
    if (typeof str !== 'string' || !str) return str;
    const cleaned = str.replace(/[ \t]{2,}/g, ' ');
    return cleaned.replace(/(^|[\n.!?]\s+)([a-z])/g, (match, separator, char) => {
      return separator + char.toUpperCase();
    });
  };

  const handleInputChange = (e) => {
    let { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      if (name.startsWith('rep_')) {
        const key = name.replace('rep_', '');
        setFormData(prev => ({
          ...prev,
          representativeReason: { ...prev.representativeReason, [key]: checked }
        }));
      } else {
        setFormData(prev => ({ ...prev, [name]: checked }));
      }
      return;
    }

    // Apply live formatting while typing
    if (type === 'textarea') {
      value = formatSentenceCaseLive(value);
    } else if (type === 'text' && !name.includes('rep_') && name !== 'ipNumber' && name !== 'age') {
      value = formatTitleCaseLive(value);
    }

    if (name === 'rep_othersSpecify') {
      setFormData(prev => ({
        ...prev,
        representativeReason: { ...prev.representativeReason, othersSpecify: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleBlur = (e) => {
    const { name, value, type } = e.target;
    if (type === 'textarea' || type === 'text') {
      if (name === 'rep_othersSpecify') {
        setFormData(prev => ({
          ...prev,
          representativeReason: { ...prev.representativeReason, othersSpecify: value.trim() }
        }));
      } else {
        setFormData(prev => ({ ...prev, [name]: value.trim() }));
      }
    }
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (isPreceptor) return;
    setIsSubmitting(true);
    submitCase({ docType: 'Patient Counselling', ...formData });
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/student/cases/submitted');
    }, 500);
  };

  const handleSaveDraft = () => {
    if (isPreceptor) return;
    saveDraftCase({ docType: 'Patient Counselling', ...formData });
    alert("Draft saved successfully!");
  };

  return (
    <Layout>

      <div className="preceptor-page">
        {/* Header */}
        <div className="page-header" style={{ marginBottom: '1rem' }}>
          <div>
            <h1 className="page-title">Patient Counselling Form</h1>
            <div className="breadcrumbs" style={{ marginTop: '0.5rem' }}>
              <Link to={dashboardPath} className="breadcrumb-link">Dashboard</Link>
              <span className="breadcrumb-separator">&gt;</span>
              <Link to={backPath} className="breadcrumb-link">{backText}</Link>
              <span className="breadcrumb-separator">&gt;</span>
              <span>Patient Counselling</span>
            </div>
          </div>
        </div>

        {/* Workspace */}
        <div className="patient-profile-workspace">
          {/* Sidebar */}
          <div className="workspace-sidebar">
            <div className="workspace-sidebar-header">
              <h2 className="workspace-sidebar-title">Sections</h2>
            </div>
            <div className="workspace-nav">
              {sections.map((section) => (
                <button
                  key={section.id}
                  className={`workspace-nav-item ${activeSection === section.id ? 'active' : ''}`}
                  onClick={() => setActiveSection(section.id)}
                >
                  {section.icon}
                  {section.title}
                  {activeSection > section.id && <CheckCircle2 size={16} color="var(--color-green)" style={{ marginLeft: 'auto' }} />}
                </button>
              ))}
            </div>
          </div>

          {/* Main Content Area */}
          <div className="workspace-content">
            <div className="workspace-content-header">
              <h1 className="workspace-content-title">{sections.find(s => s.id === activeSection)?.title}</h1>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                {activeSection > 1 && (
                  <button 
                    className="btn-secondary" 
                    style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                    onClick={handlePrev}
                  >
                    <ChevronLeft size={16} /> Previous
                  </button>
                )}
                {activeSection !== sections.length && (
                  <button 
                    className="btn-submit" 
                    style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                    onClick={handleNext}
                  >
                    Next Section <ChevronRight size={16} />
                  </button>
                )}
              </div>
            </div>

            <div ref={contentBodyRef} className="workspace-content-body">
              <fieldset disabled={isLocked} style={{ border: 'none', padding: 0, margin: 0 }}>
              {/* SECTION 1: Patient Information (Auto-fetched mostly) */}
              {activeSection === 1 && (
              <div className="form-section">
                <div className="info-banner" style={{ backgroundColor: 'var(--bg-main)', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', borderLeft: '4px solid var(--color-blue)' }}>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Patient demographics are automatically fetched from the Master Patient Profile.</p>
                </div>
                
                <div className="form-row">
                  <div className="form-group" style={{ flex: 1, minWidth: '150px' }}>
                    <label className="form-label">Date</label>
                    <input type="date" className="form-input" name="date" value={formData.date} onChange={handleInputChange} />
                  </div>
                  <div className="form-group" style={{ flex: 1, minWidth: '150px' }}>
                    <label className="form-label">Time</label>
                    <input type="time" className="form-input" name="time" value={formData.time} onChange={handleInputChange} />
                  </div>
                  <div className="form-group" style={{ flex: 1.5, minWidth: '200px' }}>
                    <label className="form-label">Type of Patient</label>
                    <select className="form-select" name="patientType" value={formData.patientType} onChange={handleInputChange}>
                      <option value="">Select</option>
                      <option value="Inpatient">Inpatient</option>
                      <option value="Outpatient">Outpatient</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group" style={{ flex: 2, minWidth: '200px' }}>
                    <label className="form-label">Patient Name</label>
                    <input type="text" className="form-input" style={{ backgroundColor: 'var(--bg-main)', cursor: 'not-allowed' }} value={formData.patientName} readOnly />
                  </div>
                  <div className="form-group" style={{ flex: 1, minWidth: '100px' }}>
                    <label className="form-label">Age / Gender</label>
                    <input type="text" className="form-input" style={{ backgroundColor: 'var(--bg-main)', cursor: 'not-allowed' }} value={`${formData.age} / ${formData.gender}`} readOnly />
                  </div>
                  <div className="form-group" style={{ flex: 1.5, minWidth: '150px' }}>
                    <label className="form-label">IPD No / CR No.</label>
                    <input type="text" className="form-input" style={{ backgroundColor: 'var(--bg-main)', cursor: 'not-allowed' }} value={formData.ipNumber} readOnly />
                  </div>
                  <div className="form-group" style={{ flex: 1, minWidth: '150px' }}>
                    <label className="form-label">Unit / Ward</label>
                    <input type="text" className="form-input" style={{ backgroundColor: 'var(--bg-main)', cursor: 'not-allowed' }} value={formData.ward} readOnly />
                  </div>
                </div>
              </div>
            )}

            {/* SECTION 2: Clinical Context */}
            {activeSection === 2 && (
              <div className="form-section">
                <div className="form-group">
                  <label className="form-label">Known Allergies (Auto-fetched)</label>
                  <input type="text" className="form-input" style={{ backgroundColor: 'var(--bg-main)', cursor: 'not-allowed', color: 'var(--color-red)', fontWeight: 500 }} value={formData.allergies} readOnly />
                </div>
                
                <div className="form-group" style={{ marginTop: '1.5rem' }}>
                  <label className="form-label">Other patient's specific background information collected?</label>
                  <div style={{ display: 'flex', gap: '2rem', marginTop: '0.5rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                      <input type="radio" name="backgroundCollected" value="Yes" checked={formData.backgroundCollected === 'Yes'} onChange={handleInputChange} style={{ width: '18px', height: '18px' }} />
                      Yes
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                      <input type="radio" name="backgroundCollected" value="No" checked={formData.backgroundCollected === 'No'} onChange={handleInputChange} style={{ width: '18px', height: '18px' }} />
                      No
                    </label>
                  </div>
                </div>

                <div className="form-group" style={{ marginTop: '1.5rem' }}>
                  <label className="form-label">Disease Counselled</label>
                  <textarea className="form-textarea" name="diseaseCounselled" value={formData.diseaseCounselled} onChange={handleInputChange} onBlur={handleBlur} placeholder="e.g. Hypertension management"></textarea>
                </div>

                <div className="form-group">
                  <label className="form-label">Medications Counselled</label>
                  <textarea className="form-textarea" name="medicationsCounselled" value={formData.medicationsCounselled} onChange={handleInputChange} onBlur={handleBlur} placeholder="e.g. Amlodipine 5mg OD"></textarea>
                </div>
              </div>
            )}

            {/* SECTION 3: Counselling Details */}
            {activeSection === 3 && (
              <div className="form-section">
                <label className="form-label" style={{ marginBottom: '1rem', display: 'block' }}>Points covered during counselling session (Check all that apply)</label>
                <div className="form-row" style={{ backgroundColor: 'var(--bg-main)', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer' }}>
                      <input type="checkbox" name="pointsNamePurpose" checked={formData.pointsNamePurpose} onChange={handleInputChange} style={{ width: '18px', height: '18px', marginTop: '2px' }} />
                      <span>Name and purpose of medication</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer' }}>
                      <input type="checkbox" name="pointsDosage" checked={formData.pointsDosage} onChange={handleInputChange} style={{ width: '18px', height: '18px', marginTop: '2px' }} />
                      <span>Dosage regimen</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer' }}>
                      <input type="checkbox" name="pointsMissedDose" checked={formData.pointsMissedDose} onChange={handleInputChange} style={{ width: '18px', height: '18px', marginTop: '2px' }} />
                      <span>Advice on missed dose</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer' }}>
                      <input type="checkbox" name="pointsSideEffects" checked={formData.pointsSideEffects} onChange={handleInputChange} style={{ width: '18px', height: '18px', marginTop: '2px' }} />
                      <span>Potential side effects</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer' }}>
                      <input type="checkbox" name="pointsInteractions" checked={formData.pointsInteractions} onChange={handleInputChange} style={{ width: '18px', height: '18px', marginTop: '2px' }} />
                      <span>Significant interactions (Drug/Food/Disease)</span>
                    </label>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer' }}>
                      <input type="checkbox" name="pointsPrecautions" checked={formData.pointsPrecautions} onChange={handleInputChange} style={{ width: '18px', height: '18px', marginTop: '2px' }} />
                      <span>Precautions to be taken</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer' }}>
                      <input type="checkbox" name="pointsStorage" checked={formData.pointsStorage} onChange={handleInputChange} style={{ width: '18px', height: '18px', marginTop: '2px' }} />
                      <span>Storage recommendations</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer' }}>
                      <input type="checkbox" name="pointsBenefits" checked={formData.pointsBenefits} onChange={handleInputChange} style={{ width: '18px', height: '18px', marginTop: '2px' }} />
                      <span>Benefits of completing course</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer' }}>
                      <input type="checkbox" name="pointsLifestyle" checked={formData.pointsLifestyle} onChange={handleInputChange} style={{ width: '18px', height: '18px', marginTop: '2px' }} />
                      <span>Life style modifications</span>
                    </label>
                  </div>
                </div>

                <div className="form-group" style={{ marginTop: '2rem' }}>
                  <label className="form-label">Counselling provided to</label>
                  <div style={{ display: 'flex', gap: '2rem', marginTop: '0.5rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                      <input type="radio" name="providedTo" value="Patient" checked={formData.providedTo === 'Patient'} onChange={handleInputChange} style={{ width: '18px', height: '18px' }} />
                      Patient
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                      <input type="radio" name="providedTo" value="Representative" checked={formData.providedTo === 'Representative'} onChange={handleInputChange} style={{ width: '18px', height: '18px' }} />
                      Patient Representative
                    </label>
                  </div>
                </div>

                {formData.providedTo === 'Representative' && (
                  <div className="form-group" style={{ backgroundColor: 'var(--bg-main)', padding: '1.5rem', borderRadius: '8px', marginTop: '1rem', borderLeft: '4px solid var(--color-purple)' }}>
                    <label className="form-label" style={{ marginBottom: '1rem', display: 'block' }}>If patient's representative, give reason:</label>
                    <div className="form-row">
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                        <input type="checkbox" name="rep_unconscious" checked={formData.representativeReason.unconscious} onChange={handleInputChange} />
                        Patient is unconscious
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                        <input type="checkbox" name="rep_hearing" checked={formData.representativeReason.hearing} onChange={handleInputChange} />
                        Hearing problem
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                        <input type="checkbox" name="rep_language" checked={formData.representativeReason.language} onChange={handleInputChange} />
                        Language problem
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                        <input type="checkbox" name="rep_pediatric" checked={formData.representativeReason.pediatric} onChange={handleInputChange} />
                        Pediatric patient
                      </label>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', gridColumn: '1 / -1' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                          <input type="checkbox" name="rep_others" checked={formData.representativeReason.others} onChange={handleInputChange} />
                          Others
                        </label>
                        {formData.representativeReason.others && (
                          <input type="text" className="form-input" name="rep_othersSpecify" value={formData.representativeReason.othersSpecify} onChange={handleInputChange} onBlur={handleBlur} placeholder="Please specify..." style={{ flex: 1, marginLeft: '1rem' }} />
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* SECTION 4: Barriers & Outcomes */}
            {activeSection === 4 && (
              <div className="form-section">
                
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Any major barriers involved?</label>
                    <div style={{ display: 'flex', gap: '2rem', marginTop: '0.5rem' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                        <input type="radio" name="barriersInvolved" value="Yes" checked={formData.barriersInvolved === 'Yes'} onChange={handleInputChange} style={{ width: '18px', height: '18px' }} />
                        Yes
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                        <input type="radio" name="barriersInvolved" value="No" checked={formData.barriersInvolved === 'No'} onChange={handleInputChange} style={{ width: '18px', height: '18px' }} />
                        No
                      </label>
                    </div>
                  </div>
                </div>

                {formData.barriersInvolved === 'Yes' && (
                  <div style={{ backgroundColor: 'var(--bg-main)', padding: '1.5rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
                    <div className="form-group">
                      <label className="form-label">If Yes, Specify</label>
                      <input type="text" className="form-input" name="barriersSpecify" value={formData.barriersSpecify} onChange={handleInputChange} onBlur={handleBlur} placeholder="e.g. Language barrier" />
                    </div>
                    <div className="form-group" style={{ marginTop: '1rem' }}>
                      <label className="form-label">Whether barrier was rightly overcome?</label>
                      <div style={{ display: 'flex', gap: '2rem', marginTop: '0.5rem' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                          <input type="radio" name="barriersOvercome" value="Yes" checked={formData.barriersOvercome === 'Yes'} onChange={handleInputChange} />
                          Yes
                        </label>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                          <input type="radio" name="barriersOvercome" value="No" checked={formData.barriersOvercome === 'No'} onChange={handleInputChange} />
                          No
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                <div className="form-group" style={{ marginTop: '1.5rem' }}>
                  <label className="form-label">Time taken for counselling</label>
                  <div className="form-row" style={{ marginTop: '0.5rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                      <input type="radio" name="timeTaken" value="Less than 10 min" checked={formData.timeTaken === 'Less than 10 min'} onChange={handleInputChange} style={{ width: '18px', height: '18px' }} />
                      Less than 10 min.
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                      <input type="radio" name="timeTaken" value="10 to 20 min" checked={formData.timeTaken === '10 to 20 min'} onChange={handleInputChange} style={{ width: '18px', height: '18px' }} />
                      10 to 20 min.
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                      <input type="radio" name="timeTaken" value="More than 20 min" checked={formData.timeTaken === 'More than 20 min'} onChange={handleInputChange} style={{ width: '18px', height: '18px' }} />
                      More than 20 min.
                    </label>
                  </div>
                </div>

                <div className="form-group" style={{ marginTop: '2rem' }}>
                  <label className="form-label">Counselling aids used</label>
                  <input type="text" className="form-input" name="counsellingAids" value={formData.counsellingAids} onChange={handleInputChange} onBlur={handleBlur} placeholder="e.g. Pictograms" />
                </div>

                <div className="form-group">
                  <label className="form-label">Counselling material provided</label>
                  <input type="text" className="form-input" name="materialProvided" value={formData.materialProvided} onChange={handleInputChange} onBlur={handleBlur} placeholder="e.g. Dietary chart" />
                </div>

                <div className="form-group" style={{ marginTop: '2rem' }}>
                  <label className="form-label">Understanding of the patient ascertained?</label>
                  <div style={{ display: 'flex', gap: '2rem', marginTop: '0.5rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                      <input type="radio" name="understandingAscertained" value="Yes" checked={formData.understandingAscertained === 'Yes'} onChange={handleInputChange} style={{ width: '18px', height: '18px' }} />
                      Yes
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                      <input type="radio" name="understandingAscertained" value="No" checked={formData.understandingAscertained === 'No'} onChange={handleInputChange} style={{ width: '18px', height: '18px' }} />
                      No
                    </label>
                  </div>
                </div>

              </div>
            )}

            {/* SECTION 5: Review & Submit */}
            {activeSection === 5 && (
              <div className="form-section">
                <div className="info-banner" style={{ backgroundColor: 'var(--bg-main)', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', borderLeft: '4px solid var(--color-blue)' }}>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Please review all entered information before final submission.</p>
                </div>
                
                <div className="review-section" style={{ backgroundColor: 'var(--bg-main)', padding: '1.5rem', borderRadius: '8px' }}>
                  <h3 className="review-section-title" style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>Documentation Summary</h3>
                  
                  <div style={{ marginBottom: '2rem' }}>
                    <h4 style={{ fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Counselling Details</h4>
                    <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid var(--border-color)' }}>
                      <thead>
                        <tr style={{ backgroundColor: 'var(--bg-surface)' }}>
                          <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid var(--border-color)', width: '30%', color: 'var(--text-secondary)' }}>Field</th>
                          <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>Entered Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr><td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>Date / Time</td><td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>{formData.date} / {formData.time}</td></tr>
                        <tr><td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>Patient Type</td><td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>{formData.patientType || '-'}</td></tr>
                        <tr><td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>Disease Counselled</td><td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>{formData.diseaseCounselled || '-'}</td></tr>
                        <tr><td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>Medications Counselled</td><td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>{formData.medicationsCounselled || '-'}</td></tr>
                        <tr><td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>Time Taken</td><td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>{formData.timeTaken || '-'}</td></tr>
                        <tr><td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>Barriers Involved</td><td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>{formData.barriersInvolved || '-'}</td></tr>
                        {formData.barriersInvolved === 'Yes' && (
                          <>
                            <tr><td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>Barrier Details</td><td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>{formData.barriersSpecify || '-'}</td></tr>
                            <tr><td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>Barrier Overcome</td><td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>{formData.barriersOvercome || '-'}</td></tr>
                          </>
                        )}
                        <tr><td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>Provided To</td><td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>{formData.providedTo || '-'}</td></tr>
                      </tbody>
                    </table>
                  </div>

                </div>
                
                <div className="workspace-actions">
                  <button className="btn-draft" onClick={handleSaveDraft}><Save size={18} /> Save Draft</button>
                  <button className="btn-submit" onClick={handleSubmit} disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : <><Send size={18} /> Submit to Preceptor</>}
                  </button>
                </div>
              </div>
            )}

              </fieldset>
            </div> {/* End workspace-content-body */}
          <div className="case-content-header" style={{ marginLeft: '1.5rem', marginTop: '1.5rem', marginRight: '1.5rem' }}>
            {isPreceptor && (
              <div style={{ backgroundColor: '#fff8e1', border: '1px solid #ffe082', padding: '0.5rem 1rem', borderRadius: '4px', fontSize: '0.85rem', color: '#8f6b00', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <AlertCircle size={16} /> Read-Only Mode (Student Data)
              </div>
            )}
          </div>

        </div> {/* End workspace-content */}
      </div>
      </div>
    </Layout>
  );
};

export default PatientCounsellingForm;
