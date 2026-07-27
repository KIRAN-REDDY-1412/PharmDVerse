import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Save, Send, User, AlertCircle, FileText, FileSearch, HelpCircle, Activity, Lightbulb, CheckCircle2, MessageSquare, Plus, Trash2, AlertTriangle } from 'lucide-react';
import StudentLayout from '../student/StudentLayout';
import CollegeAdminLayout from '../college/CollegeAdminLayout';
import AdminLayout from '../admin/AdminLayout';
import { useDatabase } from '../../context/DatabaseContext';
import '../../pages/college/PreceptorManagement.css';
import './PatientProfileForm.css';

const PharmacistInterventionForm = ({ role = 'student' }) => {
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

  const formStatus = existingCase?.forms?.pharmacistIntervention?.status || 'Pending';
  const [preceptorComments, setPreceptorComments] = useState(existingCase?.forms?.pharmacistIntervention?.comments || '');
  const isReturned = existingCase && existingCase.status === 'Returned';
  
  // Section Navigation
  const [activeSection, setActiveSection] = useState(1);
  const sections = [
    { id: 1, title: 'Patient & Prescription', icon: <User size={18} /> },
    { id: 2, title: 'Problem Identification', icon: <AlertCircle size={18} /> },
    { id: 3, title: 'Action & Recommendations', icon: <Activity size={18} /> },
    { id: 4, title: 'Outcome & Follow-up', icon: <FileText size={18} /> },
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
    // Patient Auto-fetched
    patientName: '',
    age: '',
    sex: '',
    ipNumber: '',
    ward: '',
    
    // Intervention details
    dateOfIntervention: new Date().toISOString().split('T')[0],
    presentDiagnosis: '',

    // Prescription details (dynamic table)
    prescriptions: [
      { id: 1, name: '', doseFreq: '' }
    ],

    // Prescription Problem checkboxes
    probAllergy: false,
    probPriorADR: false,
    probContraindication: false,
    probInteraction: false,
    probUnnecessary: false,
    probWrongDrug: false,
    probIncomplete: false,
    probDuplication: false,
    probExcessiveDuration: false,
    probHighDose: false,
    probLowDose: false,
    probOthers: false,
    probOthersSpecify: '',

    // Description
    descriptionOfProblem: '',

    // Action Taken checkboxes
    actionPrescriber: false,
    actionNurse: false,
    actionReference: false,
    actionPatient: false,
    actionRepresentative: false,
    actionOthers: false,
    actionOthersSpecify: '',

    // Recommendations - Change checkboxes
    recDrug: false,
    recDose: false,
    recDuration: false,
    recFormRoute: false,
    recSchedule: false,
    recOthers: false,
    recOthersSpecify: '',

    // Follow-up & Discussion
    backgroundCollected: '',
    discussedWithPhysician: '',
    suggestionsMadeTime: '',
    suggestionAccepted: '',
    suggestionChanged: '',
    reasonIfNotChanged: '',

    // Outcome & Significance
    significance: '',
    outcome: '',
    references: '',
    followUp: ''
  });

  // Mock Auto-fetch effect
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      patientName: 'T.Sri Rami Reddy',
      age: '45',
      sex: 'Male',
      ipNumber: '1234567890',
      ward: 'General Ward',
      presentDiagnosis: 'Type 2 Diabetes Mellitus with Hypertension'
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

    if (type === 'textarea') {
      value = formatSentenceCaseLive(value);
    } else if (type === 'text' && !name.includes('Specify') && name !== 'ipNumber') {
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

  // Dynamic Table Handlers
  const addPrescriptionRow = () => {
    setFormData(prev => ({
      ...prev,
      prescriptions: [...prev.prescriptions, { id: Date.now(), name: '', doseFreq: '' }]
    }));
  };

  const removePrescriptionRow = (id) => {
    setFormData(prev => ({
      ...prev,
      prescriptions: prev.prescriptions.filter(p => p.id !== id)
    }));
  };

  const handlePrescriptionChange = (id, field, value) => {
    // Only format title case for name
    if (field === 'name') value = formatTitleCaseLive(value);
    setFormData(prev => ({
      ...prev,
      prescriptions: prev.prescriptions.map(p => p.id === id ? { ...p, [field]: value } : p)
    }));
  };

  const handlePrescriptionBlur = (id, field, value) => {
    setFormData(prev => ({
      ...prev,
      prescriptions: prev.prescriptions.map(p => p.id === id ? { ...p, [field]: value.trim() } : p)
    }));
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (isPreceptor) return;
    setIsSubmitting(true);
    submitCase({ docType: 'Pharmacist Intervention', ...formData });
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/student/cases/submitted');
    }, 500);
  };

  const handleSaveDraft = () => {
    if (isPreceptor) return;
    saveDraftCase({ docType: 'Pharmacist Intervention', ...formData });
    alert("Draft saved successfully!");
  };

  return (
    <Layout>

      <div className="preceptor-page">
        {/* Header */}
        <div className="page-header" style={{ marginBottom: '1rem' }}>
          <div>
            <h1 className="page-title">Pharmacist Intervention Form</h1>
            <div className="breadcrumbs" style={{ marginTop: '0.5rem' }}>
              <Link to={dashboardPath} className="breadcrumb-link">Dashboard</Link>
              <span className="breadcrumb-separator">&gt;</span>
              <Link to={backPath} className="breadcrumb-link">{backText}</Link>
              <span className="breadcrumb-separator">&gt;</span>
              <span>Pharmacist Intervention</span>
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
                  <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Basic patient metrics are auto-fetched from the Master Patient Profile.</p>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Date of intervention</label>
                    <input type="date" className="form-input" name="dateOfIntervention" value={formData.dateOfIntervention} onChange={handleInputChange} />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group" style={{ flex: 2, minWidth: '200px' }}>
                    <label className="form-label">Patient Name</label>
                    <input type="text" className="form-input" style={{ backgroundColor: 'var(--bg-main)', cursor: 'not-allowed' }} value={formData.patientName} readOnly />
                  </div>
                  <div className="form-group" style={{ flex: 1, minWidth: '100px' }}>
                    <label className="form-label">Age / Sex</label>
                    <input type="text" className="form-input" style={{ backgroundColor: 'var(--bg-main)', cursor: 'not-allowed' }} value={`${formData.age} / ${formData.sex}`} readOnly />
                  </div>
                  <div className="form-group" style={{ flex: 1.5, minWidth: '150px' }}>
                    <label className="form-label">IP / OP No</label>
                    <input type="text" className="form-input" style={{ backgroundColor: 'var(--bg-main)', cursor: 'not-allowed' }} value={formData.ipNumber} readOnly />
                  </div>
                  <div className="form-group" style={{ flex: 1, minWidth: '150px' }}>
                    <label className="form-label">Ward / Unit</label>
                    <input type="text" className="form-input" style={{ backgroundColor: 'var(--bg-main)', cursor: 'not-allowed' }} value={formData.ward} readOnly />
                  </div>
                </div>

                <div className="form-group" style={{ marginTop: '1.5rem' }}>
                  <label className="form-label">Present Diagnosis</label>
                  <textarea className="form-textarea" style={{ backgroundColor: 'var(--bg-main)', cursor: 'not-allowed', height: '80px' }} value={formData.presentDiagnosis} readOnly></textarea>
                </div>

                <div className="form-group" style={{ marginTop: '2rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <label className="form-label" style={{ margin: 0 }}>Prescription Details</label>
                    <button className="btn-secondary" onClick={addPrescriptionRow} style={{ padding: '0.4rem 0.75rem', fontSize: '0.85rem' }}>
                      <Plus size={14} /> Add Row
                    </button>
                  </div>
                  
                  <div className="dynamic-table-container">
                    <table className="dynamic-table">
                      <thead>
                        <tr>
                          <th style={{ width: '60px', textAlign: 'center' }}>S.No</th>
                          <th>Name of the drug</th>
                          <th>Dose & Frequency</th>
                          <th style={{ width: '60px', textAlign: 'center' }}>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {formData.prescriptions.map((p, index) => (
                          <tr key={p.id}>
                            <td style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>{index + 1}</td>
                            <td>
                              <input 
                                type="text" 
                                className="table-input" 
                                value={p.name} 
                                onChange={(e) => handlePrescriptionChange(p.id, 'name', e.target.value)}
                                onBlur={(e) => handlePrescriptionBlur(p.id, 'name', e.target.value)}
                                placeholder="Drug name"
                              />
                            </td>
                            <td>
                              <input 
                                type="text" 
                                className="table-input" 
                                value={p.doseFreq} 
                                onChange={(e) => handlePrescriptionChange(p.id, 'doseFreq', e.target.value)}
                                onBlur={(e) => handlePrescriptionBlur(p.id, 'doseFreq', e.target.value)}
                                placeholder="e.g. 500mg BD"
                              />
                            </td>
                            <td style={{ textAlign: 'center' }}>
                              {formData.prescriptions.length > 1 && (
                                <button className="table-action-btn delete" onClick={() => removePrescriptionRow(p.id)} title="Remove row">
                                  <Trash2 size={16} />
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* SECTION 2: Problem Identification */}
            {activeSection === 2 && (
              <div className="form-section">
                <label className="form-label" style={{ marginBottom: '1rem', display: 'block' }}>Prescription problem (check all that apply)</label>
                <div className="form-row" style={{ backgroundColor: 'var(--bg-main)', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer' }}>
                      <input type="checkbox" name="probAllergy" checked={formData.probAllergy} onChange={handleInputChange} style={{ width: '18px', height: '18px', marginTop: '2px' }} />
                      <span>Allergy</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer' }}>
                      <input type="checkbox" name="probPriorADR" checked={formData.probPriorADR} onChange={handleInputChange} style={{ width: '18px', height: '18px', marginTop: '2px' }} />
                      <span>Prior ADR</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer' }}>
                      <input type="checkbox" name="probContraindication" checked={formData.probContraindication} onChange={handleInputChange} style={{ width: '18px', height: '18px', marginTop: '2px' }} />
                      <span>Contraindication</span>
                    </label>
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer' }}>
                      <input type="checkbox" name="probInteraction" checked={formData.probInteraction} onChange={handleInputChange} style={{ width: '18px', height: '18px', marginTop: '2px' }} />
                      <span>Drug Interaction</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer' }}>
                      <input type="checkbox" name="probUnnecessary" checked={formData.probUnnecessary} onChange={handleInputChange} style={{ width: '18px', height: '18px', marginTop: '2px' }} />
                      <span>Unnecessary Drug</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer' }}>
                      <input type="checkbox" name="probWrongDrug" checked={formData.probWrongDrug} onChange={handleInputChange} style={{ width: '18px', height: '18px', marginTop: '2px' }} />
                      <span>Wrong Drug</span>
                    </label>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer' }}>
                      <input type="checkbox" name="probIncomplete" checked={formData.probIncomplete} onChange={handleInputChange} style={{ width: '18px', height: '18px', marginTop: '2px' }} />
                      <span>Incomplete Rx</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer' }}>
                      <input type="checkbox" name="probDuplication" checked={formData.probDuplication} onChange={handleInputChange} style={{ width: '18px', height: '18px', marginTop: '2px' }} />
                      <span>Duplication</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer' }}>
                      <input type="checkbox" name="probExcessiveDuration" checked={formData.probExcessiveDuration} onChange={handleInputChange} style={{ width: '18px', height: '18px', marginTop: '2px' }} />
                      <span>Excessive Duration</span>
                    </label>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer' }}>
                      <input type="checkbox" name="probHighDose" checked={formData.probHighDose} onChange={handleInputChange} style={{ width: '18px', height: '18px', marginTop: '2px' }} />
                      <span>High Dose</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer' }}>
                      <input type="checkbox" name="probLowDose" checked={formData.probLowDose} onChange={handleInputChange} style={{ width: '18px', height: '18px', marginTop: '2px' }} />
                      <span>Low Dose</span>
                    </label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer' }}>
                        <input type="checkbox" name="probOthers" checked={formData.probOthers} onChange={handleInputChange} style={{ width: '18px', height: '18px', marginTop: '2px' }} />
                        <span>Others</span>
                      </label>
                      {formData.probOthers && (
                        <input type="text" className="form-input" name="probOthersSpecify" value={formData.probOthersSpecify} onChange={handleInputChange} onBlur={handleBlur} placeholder="Specify..." style={{ flex: 1, padding: '0.25rem 0.5rem' }} />
                      )}
                    </div>
                  </div>
                </div>

                <div className="form-group" style={{ marginTop: '2rem' }}>
                  <label className="form-label">Description of problem</label>
                  <textarea className="form-textarea large-textarea" name="descriptionOfProblem" value={formData.descriptionOfProblem} onChange={handleInputChange} onBlur={handleBlur} placeholder="Detail the identified prescription problem here..."></textarea>
                </div>
              </div>
            )}

            {/* SECTION 3: Action & Recommendations */}
            {activeSection === 3 && (
              <div className="form-section">
                
                <div className="form-group">
                  <label className="form-label" style={{ marginBottom: '1rem', display: 'block' }}>Action Taken (check all that apply)</label>
                  <div className="form-row" style={{ backgroundColor: 'var(--bg-main)', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer' }}>
                        <input type="checkbox" name="actionPrescriber" checked={formData.actionPrescriber} onChange={handleInputChange} style={{ width: '18px', height: '18px', marginTop: '2px' }} />
                        <span>Discussion with prescriber</span>
                      </label>
                      <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer' }}>
                        <input type="checkbox" name="actionNurse" checked={formData.actionNurse} onChange={handleInputChange} style={{ width: '18px', height: '18px', marginTop: '2px' }} />
                        <span>Discussion with nurse</span>
                      </label>
                      <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer' }}>
                        <input type="checkbox" name="actionReference" checked={formData.actionReference} onChange={handleInputChange} style={{ width: '18px', height: '18px', marginTop: '2px' }} />
                        <span>Drug information reference consulted</span>
                      </label>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer' }}>
                        <input type="checkbox" name="actionPatient" checked={formData.actionPatient} onChange={handleInputChange} style={{ width: '18px', height: '18px', marginTop: '2px' }} />
                        <span>Discussion with patient</span>
                      </label>
                      <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer' }}>
                        <input type="checkbox" name="actionRepresentative" checked={formData.actionRepresentative} onChange={handleInputChange} style={{ width: '18px', height: '18px', marginTop: '2px' }} />
                        <span>Discussion with patient representative</span>
                      </label>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer' }}>
                          <input type="checkbox" name="actionOthers" checked={formData.actionOthers} onChange={handleInputChange} style={{ width: '18px', height: '18px', marginTop: '2px' }} />
                          <span>Others</span>
                        </label>
                        {formData.actionOthers && (
                          <input type="text" className="form-input" name="actionOthersSpecify" value={formData.actionOthersSpecify} onChange={handleInputChange} onBlur={handleBlur} placeholder="Specify..." style={{ flex: 1, padding: '0.25rem 0.5rem' }} />
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="form-group" style={{ marginTop: '2rem' }}>
                  <label className="form-label" style={{ marginBottom: '1rem', display: 'block' }}>Recommendations for Change (check all that apply)</label>
                  <div className="form-row" style={{ backgroundColor: 'var(--bg-main)', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                      <input type="checkbox" name="recDrug" checked={formData.recDrug} onChange={handleInputChange} style={{ width: '18px', height: '18px' }} />
                      Drug
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                      <input type="checkbox" name="recDose" checked={formData.recDose} onChange={handleInputChange} style={{ width: '18px', height: '18px' }} />
                      Dose
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                      <input type="checkbox" name="recDuration" checked={formData.recDuration} onChange={handleInputChange} style={{ width: '18px', height: '18px' }} />
                      Duration
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                      <input type="checkbox" name="recFormRoute" checked={formData.recFormRoute} onChange={handleInputChange} style={{ width: '18px', height: '18px' }} />
                      Form/Route
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                      <input type="checkbox" name="recSchedule" checked={formData.recSchedule} onChange={handleInputChange} style={{ width: '18px', height: '18px' }} />
                      Schedule
                    </label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                        <input type="checkbox" name="recOthers" checked={formData.recOthers} onChange={handleInputChange} style={{ width: '18px', height: '18px' }} />
                        Others
                      </label>
                      {formData.recOthers && (
                        <input type="text" className="form-input" name="recOthersSpecify" value={formData.recOthersSpecify} onChange={handleInputChange} onBlur={handleBlur} placeholder="Specify..." style={{ flex: 1, padding: '0.25rem 0.5rem' }} />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SECTION 4: Outcome & Follow-up */}
            {activeSection === 4 && (
              <div className="form-section">
                
                <div className="form-row" style={{ marginBottom: '1.5rem' }}>
                  <div className="form-group">
                    <label className="form-label">Specific background information collected?</label>
                    <div style={{ display: 'flex', gap: '2rem', marginTop: '0.5rem' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                        <input type="radio" name="backgroundCollected" value="YES" checked={formData.backgroundCollected === 'YES'} onChange={handleInputChange} /> YES
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                        <input type="radio" name="backgroundCollected" value="NO" checked={formData.backgroundCollected === 'NO'} onChange={handleInputChange} /> NO
                      </label>
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Problem identified discussed with physician?</label>
                    <div style={{ display: 'flex', gap: '2rem', marginTop: '0.5rem' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                        <input type="radio" name="discussedWithPhysician" value="YES" checked={formData.discussedWithPhysician === 'YES'} onChange={handleInputChange} /> YES
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                        <input type="radio" name="discussedWithPhysician" value="NO" checked={formData.discussedWithPhysician === 'NO'} onChange={handleInputChange} /> NO
                      </label>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Suggestions made at appropriate time?</label>
                    <div style={{ display: 'flex', gap: '2rem', marginTop: '0.5rem' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                        <input type="radio" name="suggestionsMadeTime" value="YES" checked={formData.suggestionsMadeTime === 'YES'} onChange={handleInputChange} /> YES
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                        <input type="radio" name="suggestionsMadeTime" value="NO" checked={formData.suggestionsMadeTime === 'NO'} onChange={handleInputChange} /> NO
                      </label>
                    </div>
                  </div>
                </div>

                <div className="form-row" style={{ marginBottom: '1.5rem', backgroundColor: 'var(--bg-main)', padding: '1.5rem', borderRadius: '8px' }}>
                  <div className="form-group">
                    <label className="form-label">Recommendation Accepted?</label>
                    <div style={{ display: 'flex', gap: '2rem', marginTop: '0.5rem' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                        <input type="radio" name="suggestionAccepted" value="YES" checked={formData.suggestionAccepted === 'YES'} onChange={handleInputChange} /> YES
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                        <input type="radio" name="suggestionAccepted" value="NO" checked={formData.suggestionAccepted === 'NO'} onChange={handleInputChange} /> NO
                      </label>
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Prescription Changed?</label>
                    <div style={{ display: 'flex', gap: '2rem', marginTop: '0.5rem' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                        <input type="radio" name="suggestionChanged" value="YES" checked={formData.suggestionChanged === 'YES'} onChange={handleInputChange} /> YES
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                        <input type="radio" name="suggestionChanged" value="NO" checked={formData.suggestionChanged === 'NO'} onChange={handleInputChange} /> NO
                      </label>
                    </div>
                  </div>

                  {(formData.suggestionAccepted === 'NO' || formData.suggestionChanged === 'NO') && (
                    <div className="form-group" style={{ gridColumn: '1 / -1', marginTop: '1rem' }}>
                      <label className="form-label">If no, give reason(s):</label>
                      <input type="text" className="form-input" name="reasonIfNotChanged" value={formData.reasonIfNotChanged} onChange={handleInputChange} onBlur={handleBlur} />
                    </div>
                  )}
                </div>

                <div className="form-row" style={{ marginBottom: '1.5rem' }}>
                  <div className="form-group">
                    <label className="form-label">Significance of intervention</label>
                    <div style={{ display: 'flex', gap: '2rem', marginTop: '0.5rem' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                        <input type="radio" name="significance" value="Minor" checked={formData.significance === 'Minor'} onChange={handleInputChange} /> Minor
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                        <input type="radio" name="significance" value="Moderate" checked={formData.significance === 'Moderate'} onChange={handleInputChange} /> Moderate
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                        <input type="radio" name="significance" value="Major" checked={formData.significance === 'Major'} onChange={handleInputChange} /> Major
                      </label>
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Outcome</label>
                    <div style={{ display: 'flex', gap: '2rem', marginTop: '0.5rem' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                        <input type="radio" name="outcome" value="Positive" checked={formData.outcome === 'Positive'} onChange={handleInputChange} /> Positive
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                        <input type="radio" name="outcome" value="Negative" checked={formData.outcome === 'Negative'} onChange={handleInputChange} /> Negative
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                        <input type="radio" name="outcome" value="No change" checked={formData.outcome === 'No change'} onChange={handleInputChange} /> No change
                      </label>
                    </div>
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                  <label className="form-label">References</label>
                  <textarea className="form-textarea" name="references" value={formData.references} onChange={handleInputChange} onBlur={handleBlur}></textarea>
                </div>

                <div className="form-group">
                  <label className="form-label">Follow up</label>
                  <textarea className="form-textarea" name="followUp" value={formData.followUp} onChange={handleInputChange} onBlur={handleBlur}></textarea>
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
                    <h4 style={{ fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Intervention Details</h4>
                    <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid var(--border-color)' }}>
                      <thead>
                        <tr style={{ backgroundColor: 'var(--bg-surface)' }}>
                          <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid var(--border-color)', width: '30%', color: 'var(--text-secondary)' }}>Field</th>
                          <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>Entered Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr><td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>Date of Intervention</td><td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>{formData.dateOfIntervention}</td></tr>
                        <tr><td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>Description of Problem</td><td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>{formData.descriptionOfProblem || '-'}</td></tr>
                        <tr><td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>Background Collected</td><td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>{formData.backgroundCollected || '-'}</td></tr>
                        <tr><td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>Discussed with Physician</td><td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>{formData.discussedWithPhysician || '-'}</td></tr>
                        <tr><td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>Suggestions Made Time</td><td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>{formData.suggestionsMadeTime || '-'}</td></tr>
                        <tr><td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>Suggestion Accepted</td><td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>{formData.suggestionAccepted || '-'}</td></tr>
                        <tr><td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>Suggestion Changed</td><td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>{formData.suggestionChanged || '-'}</td></tr>
                        {(formData.suggestionAccepted === 'NO' || formData.suggestionChanged === 'NO') && (
                           <tr><td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>Reason if Not Changed</td><td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>{formData.reasonIfNotChanged || '-'}</td></tr>
                        )}
                        <tr><td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>Significance</td><td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>{formData.significance || '-'}</td></tr>
                        <tr><td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>Outcome</td><td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>{formData.outcome || '-'}</td></tr>
                      </tbody>
                    </table>
                  </div>

                </div>
                
                <div className="workspace-actions">
                  <button className="btn-draft" onClick={handleSaveDraft}><Save size={18} /> Save Draft</button>
                  <button className="btn-submit" onClick={handleSubmit} disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : <><Send size={18} /> Submit Intervention</>}
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
          
          </div>

        </div> {/* End workspace-content */}
      </div>
    </Layout>
  );
};

export default PharmacistInterventionForm;
