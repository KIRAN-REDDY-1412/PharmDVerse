import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Save, Send, User, MessageSquare, AlertCircle, FileText, CheckCircle2, ShieldAlert, AlertTriangle } from 'lucide-react';
import StudentLayout from '../student/StudentLayout';
import CollegeAdminLayout from '../college/CollegeAdminLayout';
import AdminLayout from '../admin/AdminLayout';
import { useDatabase } from '../../context/DatabaseContext';
import '../../pages/college/PreceptorManagement.css';
import './PatientProfileForm.css';

const DrugInformationRequestForm = ({ role = 'student' }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cases, submitCase, saveDraftCase, updateFormStatus } = useDatabase();

  const isAdmin = role === 'admin';
  const isPreceptor = role === 'preceptor';
  const isSuperAdmin = role === 'superadmin';
  const Layout = (isPreceptor || isAdmin || isSuperAdmin) ? React.Fragment : StudentLayout;
  const existingCase = id ? cases.find(c => c.id === id) : null;
  const isLocked = isPreceptor || isAdmin || isSuperAdmin || (existingCase && ['Approved', 'Submitted', 'Under Review'].includes(existingCase.status));
  const isReturned = existingCase && existingCase.status === 'Returned';
  
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

  const formStatus = existingCase?.forms?.drugInformation?.status || 'Pending';
  const [preceptorComments, setPreceptorComments] = useState(existingCase?.forms?.drugInformation?.comments || '');
  
  // Section Navigation
  const [activeSection, setActiveSection] = useState(1);
  const sections = [
    { id: 1, title: 'Enquirer Details', icon: <User size={18} /> },
    { id: 2, title: 'Request Context', icon: <MessageSquare size={18} /> },
    { id: 3, title: 'Patient Details', icon: <AlertCircle size={18} /> },
    { id: 4, title: 'Reply & References', icon: <FileText size={18} /> },
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
    // Enquirer details
    date: new Date().toISOString().split('T')[0],
    time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: "numeric", minute: "numeric"}),
    enquirerName: '',
    designation: '',
    phoneNo: '',
    unitWard: '',
    professionalStatus: '',
    professionalStatusOthers: '',

    // Request context
    modeOfRequest: '',
    answerNeeded: '',
    answerNeededOthers: '',
    detailsOfEnquiry: '',
    questionCategory: '',
    purposeOfEnquiry: '',
    purposeOfEnquiryOthers: '',

    // Auto-fetched (Read Only)
    patientAge: '',
    patientSex: '',
    patientWeight: '',
    patientAllergies: '',
    currentMedicalProblem: '',

    // Patient specifics
    pregnancyLactation: '',
    pregnancyLactationDetails: '',
    otherImportantInvestigations: '',
    drugTherapy: '',

    // Reply & References
    answerGiven: '',
    answerGivenOthers: '',
    reasonForDelay: '',
    modeOfReply: '',
    informationProvided: '',
    
    // References
    refTextBook: '',
    refJournals: '',
    refMicromedex: false,
    refClinirex: false,
    refIdis: false,
    refWebsite: '',
    refOthers: ''
  });

  // Mock Auto-fetch effect
  useEffect(() => {
    // In a real app, this would fetch from the active master Patient Profile record
    setFormData(prev => ({
      ...prev,
      patientAge: '45',
      patientSex: 'Male',
      patientWeight: '75',
      patientAllergies: 'None reported',
      currentMedicalProblem: 'Admitted with fever and severe cough.'
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
      setFormData(prev => ({ ...prev, [name]: checked }));
      return;
    }

    // Apply live formatting while typing
    if (type === 'textarea') {
      value = formatSentenceCaseLive(value);
    } else if (type === 'text' && name !== 'phoneNo' && name !== 'patientAge' && name !== 'patientWeight') {
      value = formatTitleCaseLive(value);
    }

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name, value, type } = e.target;
    if (type === 'textarea' || type === 'text') {
      setFormData(prev => ({ ...prev, [name]: value.trim() }));
    }
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    submitCase({
      docType: 'Drug Information Request',
      patientName: formData.enquirerName || 'Enquirer',
      age: formData.patientAge || 'Unknown',
      gender: formData.patientSex || 'Unknown',
      diagnosis: formData.currentMedicalProblem || 'Not specified',
      hospital: 'City General Hospital',
      department: formData.unitWard,
      ...formData
    });
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/student/cases/submitted');
    }, 500);
  };

  const handleSaveDraft = () => {
    saveDraftCase({
      docType: 'Drug Information Request',
      patientName: formData.enquirerName || 'Enquirer',
      age: formData.patientAge || 'Unknown',
      gender: formData.patientSex || 'Unknown',
      diagnosis: formData.currentMedicalProblem || 'Not specified',
      hospital: 'City General Hospital',
      department: formData.unitWard,
      ...formData
    });
    alert("Draft saved successfully!");
  };

  return (
    <Layout>

      <div className="preceptor-page">
        {/* Header */}
        <div className="page-header" style={{ marginBottom: '1rem' }}>
          <div>
            <h1 className="page-title">Drug Information Request Form</h1>
            <div className="breadcrumbs" style={{ marginTop: '0.5rem' }}>
              <Link to={dashboardPath} className="breadcrumb-link">Dashboard</Link>
              <span className="breadcrumb-separator">&gt;</span>
              <Link to={backPath} className="breadcrumb-link">{backText}</Link>
              <span className="breadcrumb-separator">&gt;</span>
              <span>Drug Info Request</span>
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
              {/* SECTION 1: Enquirer Details */}
              {activeSection === 1 && (
              <div className="form-section">
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">Date</label>
                    <input type="date" className="form-input" name="date" value={formData.date} onChange={handleInputChange} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Time</label>
                    <input type="time" className="form-input" name="time" value={formData.time} onChange={handleInputChange} />
                  </div>
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">Name of the Enquirer</label>
                    <input type="text" className="form-input" name="enquirerName" value={formData.enquirerName} onChange={handleInputChange} onBlur={handleBlur} placeholder="e.g. Dr. Sarah Lee" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Designation</label>
                    <input type="text" className="form-input" name="designation" value={formData.designation} onChange={handleInputChange} onBlur={handleBlur} placeholder="e.g. Senior Resident" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone NO</label>
                    <input type="text" className="form-input" name="phoneNo" value={formData.phoneNo} onChange={handleInputChange} onBlur={handleBlur} placeholder="e.g. 9876543210" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Unit/Ward</label>
                    <input type="text" className="form-input" name="unitWard" value={formData.unitWard} onChange={handleInputChange} onBlur={handleBlur} placeholder="e.g. ICU" />
                  </div>
                </div>

                <div className="form-group" style={{ marginTop: '1.5rem' }}>
                  <label className="form-label">Professional Status</label>
                  <div className="form-grid-3" style={{ marginTop: '0.5rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                      <input type="radio" name="professionalStatus" value="Physician" checked={formData.professionalStatus === 'Physician'} onChange={handleInputChange} />
                      Physician
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                      <input type="radio" name="professionalStatus" value="Surgeon" checked={formData.professionalStatus === 'Surgeon'} onChange={handleInputChange} />
                      Surgeon
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                      <input type="radio" name="professionalStatus" value="Resident" checked={formData.professionalStatus === 'Resident'} onChange={handleInputChange} />
                      Resident
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                      <input type="radio" name="professionalStatus" value="Interns" checked={formData.professionalStatus === 'Interns'} onChange={handleInputChange} />
                      Interns
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                      <input type="radio" name="professionalStatus" value="Pharmacist" checked={formData.professionalStatus === 'Pharmacist'} onChange={handleInputChange} />
                      Pharmacist
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                      <input type="radio" name="professionalStatus" value="Nurse" checked={formData.professionalStatus === 'Nurse'} onChange={handleInputChange} />
                      Nurse
                    </label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', gridColumn: '1 / -1' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                        <input type="radio" name="professionalStatus" value="Others" checked={formData.professionalStatus === 'Others'} onChange={handleInputChange} />
                        Others
                      </label>
                      {formData.professionalStatus === 'Others' && (
                        <input type="text" className="form-input" name="professionalStatusOthers" value={formData.professionalStatusOthers} onChange={handleInputChange} onBlur={handleBlur} placeholder="Specify..." style={{ flex: 1, marginLeft: '1rem', maxWidth: '300px' }} />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SECTION 2: Request Context */}
            {activeSection === 2 && (
              <div className="form-section">
                
                <div className="form-group">
                  <label className="form-label">Mode of Request</label>
                  <div style={{ display: 'flex', gap: '2rem', marginTop: '0.5rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                      <input type="radio" name="modeOfRequest" value="Direct" checked={formData.modeOfRequest === 'Direct'} onChange={handleInputChange} style={{ width: '18px', height: '18px' }} />
                      Direct
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                      <input type="radio" name="modeOfRequest" value="Ward rounds" checked={formData.modeOfRequest === 'Ward rounds'} onChange={handleInputChange} style={{ width: '18px', height: '18px' }} />
                      Ward rounds
                    </label>
                  </div>
                </div>

                <div className="form-group" style={{ marginTop: '1.5rem' }}>
                  <label className="form-label">Answer Needed</label>
                  <div className="form-grid" style={{ marginTop: '0.5rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                      <input type="radio" name="answerNeeded" value="Immediately" checked={formData.answerNeeded === 'Immediately'} onChange={handleInputChange} />
                      Immediately
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                      <input type="radio" name="answerNeeded" value="Within 2-4hrs" checked={formData.answerNeeded === 'Within 2-4hrs'} onChange={handleInputChange} />
                      Within 2-4hrs
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                      <input type="radio" name="answerNeeded" value="Within 1-2 days" checked={formData.answerNeeded === 'Within 1-2 days'} onChange={handleInputChange} />
                      Within 1-2 days
                    </label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                        <input type="radio" name="answerNeeded" value="Others" checked={formData.answerNeeded === 'Others'} onChange={handleInputChange} />
                        Others
                      </label>
                      {formData.answerNeeded === 'Others' && (
                        <input type="text" className="form-input" name="answerNeededOthers" value={formData.answerNeededOthers} onChange={handleInputChange} onBlur={handleBlur} placeholder="Specify..." style={{ flex: 1 }} />
                      )}
                    </div>
                  </div>
                </div>

                <div className="form-group" style={{ marginTop: '1.5rem' }}>
                  <label className="form-label">Details of Enquiry</label>
                  <textarea className="form-textarea large-textarea" name="detailsOfEnquiry" value={formData.detailsOfEnquiry} onChange={handleInputChange} onBlur={handleBlur} placeholder="Enter full details of the enquiry here..."></textarea>
                </div>

                <div className="form-group">
                  <label className="form-label">Question Category</label>
                  <input type="text" className="form-input" name="questionCategory" value={formData.questionCategory} onChange={handleInputChange} onBlur={handleBlur} placeholder="e.g. Dosage, Adverse Effect, Interaction, etc." />
                </div>

                <div className="form-group" style={{ marginTop: '1.5rem' }}>
                  <label className="form-label">Purpose of enquiry</label>
                  <div className="form-grid-3" style={{ marginTop: '0.5rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                      <input type="radio" name="purposeOfEnquiry" value="Update knowledge" checked={formData.purposeOfEnquiry === 'Update knowledge'} onChange={handleInputChange} />
                      Update knowledge
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                      <input type="radio" name="purposeOfEnquiry" value="Better patient care" checked={formData.purposeOfEnquiry === 'Better patient care'} onChange={handleInputChange} />
                      Better patient care
                    </label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                        <input type="radio" name="purposeOfEnquiry" value="Others" checked={formData.purposeOfEnquiry === 'Others'} onChange={handleInputChange} />
                        Others
                      </label>
                      {formData.purposeOfEnquiry === 'Others' && (
                        <input type="text" className="form-input" name="purposeOfEnquiryOthers" value={formData.purposeOfEnquiryOthers} onChange={handleInputChange} onBlur={handleBlur} style={{ flex: 1 }} />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SECTION 3: Patient Details */}
            {activeSection === 3 && (
              <div className="form-section">
                <div className="info-banner" style={{ backgroundColor: 'var(--bg-main)', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', borderLeft: '4px solid var(--color-blue)' }}>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Basic patient metrics are auto-fetched from the Master Patient Profile.</p>
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">Age</label>
                    <input type="text" className="form-input" style={{ backgroundColor: 'var(--bg-main)', cursor: 'not-allowed' }} value={formData.patientAge} readOnly />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Sex</label>
                    <input type="text" className="form-input" style={{ backgroundColor: 'var(--bg-main)', cursor: 'not-allowed' }} value={formData.patientSex} readOnly />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Weight (Kgs)</label>
                    <input type="text" className="form-input" style={{ backgroundColor: 'var(--bg-main)', cursor: 'not-allowed' }} value={formData.patientWeight} readOnly />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Allergies</label>
                    <input type="text" className="form-input" style={{ backgroundColor: 'var(--bg-main)', cursor: 'not-allowed', color: 'var(--color-red)' }} value={formData.patientAllergies} readOnly />
                  </div>
                </div>

                <div className="form-group" style={{ marginTop: '1.5rem' }}>
                  <label className="form-label">Current medical problem</label>
                  <textarea className="form-textarea" style={{ backgroundColor: 'var(--bg-main)', cursor: 'not-allowed', height: '80px' }} value={formData.currentMedicalProblem} readOnly></textarea>
                </div>

                <div className="form-group" style={{ marginTop: '1.5rem' }}>
                  <label className="form-label">Pregnancy/ lactation?</label>
                  <div style={{ display: 'flex', gap: '2rem', marginTop: '0.5rem', marginBottom: '0.5rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                      <input type="radio" name="pregnancyLactation" value="Yes" checked={formData.pregnancyLactation === 'Yes'} onChange={handleInputChange} />
                      Yes
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                      <input type="radio" name="pregnancyLactation" value="No" checked={formData.pregnancyLactation === 'No'} onChange={handleInputChange} />
                      No
                    </label>
                  </div>
                  {formData.pregnancyLactation === 'Yes' && (
                    <input type="text" className="form-input" name="pregnancyLactationDetails" value={formData.pregnancyLactationDetails} onChange={handleInputChange} onBlur={handleBlur} placeholder="If yes, give details..." />
                  )}
                </div>

                <div className="form-group" style={{ marginTop: '1.5rem' }}>
                  <label className="form-label">Other important investigations</label>
                  <textarea className="form-textarea" name="otherImportantInvestigations" value={formData.otherImportantInvestigations} onChange={handleInputChange} onBlur={handleBlur}></textarea>
                </div>

                <div className="form-group">
                  <label className="form-label">Drug therapy</label>
                  <textarea className="form-textarea" name="drugTherapy" value={formData.drugTherapy} onChange={handleInputChange} onBlur={handleBlur}></textarea>
                </div>
              </div>
            )}

            {/* SECTION 4: Reply & References */}
            {activeSection === 4 && (
              <div className="form-section">
                
                <div className="form-group">
                  <label className="form-label">Answer given</label>
                  <div className="form-grid" style={{ marginTop: '0.5rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                      <input type="radio" name="answerGiven" value="Immediately" checked={formData.answerGiven === 'Immediately'} onChange={handleInputChange} />
                      Immediately
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                      <input type="radio" name="answerGiven" value="Within 2-4hrs" checked={formData.answerGiven === 'Within 2-4hrs'} onChange={handleInputChange} />
                      Within 2-4hrs
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                      <input type="radio" name="answerGiven" value="Within 1-2 days" checked={formData.answerGiven === 'Within 1-2 days'} onChange={handleInputChange} />
                      Within 1-2 days
                    </label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                        <input type="radio" name="answerGiven" value="Others" checked={formData.answerGiven === 'Others'} onChange={handleInputChange} />
                        Others
                      </label>
                      {formData.answerGiven === 'Others' && (
                        <input type="text" className="form-input" name="answerGivenOthers" value={formData.answerGivenOthers} onChange={handleInputChange} onBlur={handleBlur} style={{ flex: 1 }} />
                      )}
                    </div>
                  </div>
                </div>

                <div className="form-group" style={{ marginTop: '1.5rem' }}>
                  <label className="form-label">Reason for Delay (If any)</label>
                  <input type="text" className="form-input" name="reasonForDelay" value={formData.reasonForDelay} onChange={handleInputChange} onBlur={handleBlur} />
                </div>

                <div className="form-group" style={{ marginTop: '1.5rem' }}>
                  <label className="form-label">Mode of Reply</label>
                  <div className="form-grid" style={{ marginTop: '0.5rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                      <input type="radio" name="modeOfReply" value="Written" checked={formData.modeOfReply === 'Written'} onChange={handleInputChange} />
                      Written
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                      <input type="radio" name="modeOfReply" value="Verbal" checked={formData.modeOfReply === 'Verbal'} onChange={handleInputChange} />
                      Verbal
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                      <input type="radio" name="modeOfReply" value="Both" checked={formData.modeOfReply === 'Both'} onChange={handleInputChange} />
                      Both
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                      <input type="radio" name="modeOfReply" value="Printed literature" checked={formData.modeOfReply === 'Printed literature'} onChange={handleInputChange} />
                      Printed literature
                    </label>
                  </div>
                </div>

                <div className="form-group" style={{ marginTop: '1.5rem' }}>
                  <label className="form-label">Information provided</label>
                  <textarea className="form-textarea large-textarea" name="informationProvided" value={formData.informationProvided} onChange={handleInputChange} onBlur={handleBlur} style={{ minHeight: '200px' }}></textarea>
                </div>

                <div className="form-group" style={{ marginTop: '2rem', backgroundColor: 'var(--bg-main)', padding: '1.5rem', borderRadius: '8px' }}>
                  <label className="form-label" style={{ marginBottom: '1rem', display: 'block', fontSize: '1.1rem' }}>References</label>
                  
                  <div className="form-grid" style={{ marginBottom: '1rem' }}>
                    <div className="form-group">
                      <label className="form-label" style={{ fontSize: '0.9rem' }}>Text book (mention):</label>
                      <input type="text" className="form-input" name="refTextBook" value={formData.refTextBook} onChange={handleInputChange} onBlur={handleBlur} />
                    </div>
                    <div className="form-group">
                      <label className="form-label" style={{ fontSize: '0.9rem' }}>Journals (mention):</label>
                      <input type="text" className="form-input" name="refJournals" value={formData.refJournals} onChange={handleInputChange} onBlur={handleBlur} />
                    </div>
                  </div>

                  <div className="form-grid-3" style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                      <input type="checkbox" name="refMicromedex" checked={formData.refMicromedex} onChange={handleInputChange} />
                      Micromedex
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                      <input type="checkbox" name="refClinirex" checked={formData.refClinirex} onChange={handleInputChange} />
                      Clinirex
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                      <input type="checkbox" name="refIdis" checked={formData.refIdis} onChange={handleInputChange} />
                      IDIS
                    </label>
                  </div>

                  <div className="form-grid">
                    <div className="form-group">
                      <label className="form-label" style={{ fontSize: '0.9rem' }}>Website:</label>
                      <input type="text" className="form-input" name="refWebsite" value={formData.refWebsite} onChange={handleInputChange} onBlur={handleBlur} />
                    </div>
                    <div className="form-group">
                      <label className="form-label" style={{ fontSize: '0.9rem' }}>Others (specify):</label>
                      <input type="text" className="form-input" name="refOthers" value={formData.refOthers} onChange={handleInputChange} onBlur={handleBlur} />
                    </div>
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
                    <h4 style={{ fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Enquirer Details</h4>
                    <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid var(--border-color)' }}>
                      <thead>
                        <tr style={{ backgroundColor: 'var(--bg-surface)' }}>
                          <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid var(--border-color)', width: '30%', color: 'var(--text-secondary)' }}>Field</th>
                          <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>Entered Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr><td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>Date / Time</td><td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>{formData.date} / {formData.time}</td></tr>
                        <tr><td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>Enquirer Name</td><td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>{formData.enquirerName || '-'}</td></tr>
                        <tr><td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>Designation</td><td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>{formData.designation || '-'}</td></tr>
                        <tr><td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>Phone NO</td><td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>{formData.phoneNo || '-'}</td></tr>
                        <tr><td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>Unit/Ward</td><td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>{formData.unitWard || '-'}</td></tr>
                        <tr><td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>Professional Status</td><td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>{formData.professionalStatus || '-'} {formData.professionalStatus === 'Others' ? `(${formData.professionalStatusOthers})` : ''}</td></tr>
                      </tbody>
                    </table>
                  </div>

                  <div style={{ marginBottom: '2rem' }}>
                    <h4 style={{ fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Request Context</h4>
                    <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid var(--border-color)' }}>
                      <thead>
                        <tr style={{ backgroundColor: 'var(--bg-surface)' }}>
                          <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid var(--border-color)', width: '30%', color: 'var(--text-secondary)' }}>Field</th>
                          <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>Entered Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr><td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>Mode of Request</td><td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>{formData.modeOfRequest || '-'}</td></tr>
                        <tr><td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>Answer Needed</td><td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>{formData.answerNeeded || '-'} {formData.answerNeeded === 'Others' ? `(${formData.answerNeededOthers})` : ''}</td></tr>
                        <tr><td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>Details of Enquiry</td><td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>{formData.detailsOfEnquiry || '-'}</td></tr>
                        <tr><td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>Question Category</td><td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>{formData.questionCategory || '-'}</td></tr>
                        <tr><td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>Purpose of Enquiry</td><td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>{formData.purposeOfEnquiry || '-'} {formData.purposeOfEnquiry === 'Others' ? `(${formData.purposeOfEnquiryOthers})` : ''}</td></tr>
                      </tbody>
                    </table>
                  </div>

                  <div style={{ marginBottom: '2rem' }}>
                    <h4 style={{ fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Reply & References</h4>
                    <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid var(--border-color)' }}>
                      <thead>
                        <tr style={{ backgroundColor: 'var(--bg-surface)' }}>
                          <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid var(--border-color)', width: '30%', color: 'var(--text-secondary)' }}>Field</th>
                          <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr><td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>Answer Given</td><td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>{formData.answerGiven || '-'} {formData.answerGiven === 'Others' ? `(${formData.answerGivenOthers})` : ''}</td></tr>
                        <tr><td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>Mode of Reply</td><td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>{formData.modeOfReply || '-'}</td></tr>
                        <tr><td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>Information Provided</td><td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>{formData.informationProvided || '-'}</td></tr>
                      </tbody>
                    </table>
                  </div>

                </div>
                
                <div className="workspace-actions">
                  <button className="btn-draft" onClick={handleSaveDraft}><Save size={18} /> Save Draft</button>
                  <button className="btn-submit" onClick={handleSubmit} disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : <><Send size={18} /> Submit Request</>}
                  </button>
                </div>
              </div>
            )}
              </fieldset>
            </div> {/* End workspace-content-body */}
        </div> {/* End workspace-content */}
      </div>
      </div>
    </Layout>
  );
};

export default DrugInformationRequestForm;
