import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, Save, Send, User, AlertCircle, FileText, Activity, CheckCircle2, ShieldAlert, FileWarning, HelpCircle, UserPlus, Plus, Trash2 } from 'lucide-react';
import StudentLayout from '../../components/student/StudentLayout';
import { useDatabase } from '../../context/DatabaseContext';
import './PatientProfileForm.css';

const ADRForm = () => {
  const navigate = useNavigate();
  const { submitCase, saveDraftCase } = useDatabase();
  
  // Section Navigation
  const [activeSection, setActiveSection] = useState(1);
  const sections = [
    { id: 1, title: 'Patient Information', icon: <User size={18} /> },
    { id: 2, title: 'Adverse Reaction Details', icon: <AlertTriangle size={18} /> },
    { id: 3, title: 'Suspected Medications', icon: <Pill size={18} /> },
    { id: 4, title: 'Action & Outcome', icon: <Activity size={18} /> },
    { id: 5, title: 'Review & Submit', icon: <CheckCircle2 size={18} /> }
  ];

  const handleNext = () => { if (activeSection < sections.length) setActiveSection(prev => prev + 1); };
  const handlePrev = () => { if (activeSection > 1) setActiveSection(prev => prev - 1); };

  // Form State
  const [formData, setFormData] = useState({
    // Patient Auto-fetched
    patientInitials: '',
    age: '',
    gender: '',
    weight: '',
    ipNumber: '',
    medicalHistory: '',
    
    // ADR Details
    reactionStartDate: '',
    reactionStopDate: '',
    reactionDescription: '',
    investigations: '',

    // Suspected Medications (Dynamic)
    suspectedMeds: [
      { id: 1, name: '', batch: '', expiry: '', dose: '', route: '', freq: '', dateStarted: '', dateStopped: '', indication: '', causality: '' }
    ],

    // Action & Rechallenge Matrix
    actionTaken: [
      { id: 1, action: 'Drug withdrawn', applied: false, reappeared: '' },
      { id: 2, action: 'Dose increased', applied: false, reappeared: '' },
      { id: 3, action: 'Dose reduced', applied: false, reappeared: '' },
      { id: 4, action: 'Dose not changed', applied: false, reappeared: '' },
      { id: 5, action: 'Not applicable', applied: false, reappeared: '' },
      { id: 6, action: 'Unknown', applied: false, reappeared: '' }
    ],

    // Concomitant Medications
    concomitantMeds: [
      { id: 1, name: '', dose: '', route: '', freq: '', dateStarted: '', dateStopped: '', indication: '' }
    ],

    // Seriousness & Outcome
    seriousness: 'No',
    seriousnessType: {
      death: false,
      lifeThreatening: false,
      hospitalization: false,
      disability: false,
      congenitalAnomaly: false,
      otherMedicallyImportant: false
    },
    deathDate: '',
    outcome: '',
    additionalInfo: ''
  });

  // Mock Auto-fetch effect
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      patientInitials: 'T.R.R.', // Derived from T.Sri Rami Reddy
      age: '45',
      gender: 'Male',
      weight: '75',
      ipNumber: '1234567890',
      medicalHistory: 'Type 2 Diabetes Mellitus with Hypertension'
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
      if (name.startsWith('serious_')) {
        const key = name.replace('serious_', '');
        setFormData(prev => ({
          ...prev,
          seriousnessType: { ...prev.seriousnessType, [key]: checked }
        }));
      } else {
        setFormData(prev => ({ ...prev, [name]: checked }));
      }
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
  const addSuspectedRow = () => {
    setFormData(prev => ({
      ...prev,
      suspectedMeds: [...prev.suspectedMeds, { id: Date.now(), name: '', batch: '', expiry: '', dose: '', route: '', freq: '', dateStarted: '', dateStopped: '', indication: '', causality: '' }]
    }));
  };

  const removeSuspectedRow = (id) => {
    setFormData(prev => ({
      ...prev,
      suspectedMeds: prev.suspectedMeds.filter(p => p.id !== id)
    }));
  };

  const handleSuspectedChange = (id, field, value) => {
    if (field === 'name' || field === 'indication') value = formatTitleCaseLive(value);
    setFormData(prev => ({
      ...prev,
      suspectedMeds: prev.suspectedMeds.map(p => p.id === id ? { ...p, [field]: value } : p)
    }));
  };

  const addConcomitantRow = () => {
    setFormData(prev => ({
      ...prev,
      concomitantMeds: [...prev.concomitantMeds, { id: Date.now(), name: '', dose: '', route: '', freq: '', dateStarted: '', dateStopped: '', indication: '' }]
    }));
  };

  const removeConcomitantRow = (id) => {
    setFormData(prev => ({
      ...prev,
      concomitantMeds: prev.concomitantMeds.filter(p => p.id !== id)
    }));
  };

  const handleConcomitantChange = (id, field, value) => {
    if (field === 'name' || field === 'indication') value = formatTitleCaseLive(value);
    setFormData(prev => ({
      ...prev,
      concomitantMeds: prev.concomitantMeds.map(p => p.id === id ? { ...p, [field]: value } : p)
    }));
  };

  const handleActionMatrix = (id, field, value) => {
    setFormData(prev => ({
      ...prev,
      actionTaken: prev.actionTaken.map(a => a.id === id ? { ...a, [field]: value } : a)
    }));
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    submitCase({
      docType: 'Adverse Drug Reaction',
      patientName: formData.patientInitials || 'Unknown',
      age: formData.age || 'Unknown',
      gender: formData.gender || 'Unknown',
      diagnosis: formData.reactionDescription || 'Not specified',
      hospital: 'City General Hospital',
      department: 'N/A',
      ...formData
    });
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/student/cases/submitted');
    }, 500);
  };

  const handleSaveDraft = () => {
    saveDraftCase({
      docType: 'Adverse Drug Reaction',
      patientName: formData.patientInitials || 'Unknown',
      age: formData.age || 'Unknown',
      gender: formData.gender || 'Unknown',
      diagnosis: formData.reactionDescription || 'Not specified',
      hospital: 'City General Hospital',
      department: 'N/A',
      ...formData
    });
    alert("Draft saved successfully!");
  };

  return (
    <StudentLayout>
      <div className="preceptor-page">
        {/* Header */}
        <div className="page-header" style={{ marginBottom: '1rem' }}>
          <div>
            <h1 className="page-title">Adverse Drug Reaction Reporting</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.25rem' }}>Internal ERP ADR Tracker (Modified from PvPI layout)</p>
            <div className="breadcrumbs" style={{ marginTop: '0.5rem' }}>
              <Link to="/student/dashboard" className="breadcrumb-link">Dashboard</Link>
              <span className="breadcrumb-separator">&gt;</span>
              <Link to="/student/new-case" className="breadcrumb-link">New Case</Link>
              <span className="breadcrumb-separator">&gt;</span>
              <span>ADR Form</span>
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
              {activeSection !== sections.length && (
                <button 
                  className="btn-submit" 
                  style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
                  onClick={() => setActiveSection(activeSection + 1)}
                >
                  Next Section <ChevronRight size={16} />
                </button>
              )}
            </div>

            <div className="workspace-content-body">
              {/* SECTION 1: Patient Information */}
              {activeSection === 1 && (
              <div className="form-section">
                <div className="info-banner" style={{ backgroundColor: 'var(--bg-main)', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', borderLeft: '4px solid var(--color-blue)' }}>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Basic patient metrics are auto-fetched from the Master Patient Profile.</p>
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">Patient Initials</label>
                    <input type="text" className="form-input" style={{ backgroundColor: 'var(--bg-main)', cursor: 'not-allowed' }} value={formData.patientInitials} readOnly />
                  </div>
                  <div className="form-group">
                    <label className="form-label">IPD No / CR No.</label>
                    <input type="text" className="form-input" style={{ backgroundColor: 'var(--bg-main)', cursor: 'not-allowed' }} value={formData.ipNumber} readOnly />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Age / Gender</label>
                    <input type="text" className="form-input" style={{ backgroundColor: 'var(--bg-main)', cursor: 'not-allowed' }} value={`${formData.age} / ${formData.gender}`} readOnly />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Weight (Kg)</label>
                    <input type="text" className="form-input" style={{ backgroundColor: 'var(--bg-main)', cursor: 'not-allowed' }} value={formData.weight} readOnly />
                  </div>
                </div>

                <div className="form-group" style={{ marginTop: '1.5rem' }}>
                  <label className="form-label">Relevant medical / medication history</label>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>(e.g. allergies, pregnancy, addiction, hepatic, renal dysfunction etc.)</p>
                  <textarea className="form-textarea" style={{ backgroundColor: 'var(--bg-main)', cursor: 'not-allowed', height: '80px' }} value={formData.medicalHistory} readOnly></textarea>
                </div>
              </div>
            )}

            {/* SECTION 2: Adverse Reaction Details */}
            {activeSection === 2 && (
              <div className="form-section">
                
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">Event / Reaction Start Date</label>
                    <input type="date" className="form-input" name="reactionStartDate" value={formData.reactionStartDate} onChange={handleInputChange} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Event / Reaction Stop Date</label>
                    <input type="date" className="form-input" name="reactionStopDate" value={formData.reactionStopDate} onChange={handleInputChange} />
                  </div>
                </div>

                <div className="form-group" style={{ marginTop: '1.5rem' }}>
                  <label className="form-label">Describe Event/Reaction management with details, if any</label>
                  <textarea className="form-textarea large-textarea" name="reactionDescription" value={formData.reactionDescription} onChange={handleInputChange} onBlur={handleBlur} placeholder="Detail the ADR progression and clinical management..."></textarea>
                </div>

                <div className="form-group" style={{ marginTop: '1.5rem' }}>
                  <label className="form-label">Relevant investigations with dates</label>
                  <textarea className="form-textarea" name="investigations" value={formData.investigations} onChange={handleInputChange} onBlur={handleBlur} placeholder="List laboratory parameters or imaging confirming the ADR..."></textarea>
                </div>
              </div>
            )}

            {/* SECTION 3: Suspected Medications */}
            {activeSection === 3 && (
              <div className="form-section">
                
                <div className="form-group">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <label className="form-label" style={{ margin: 0 }}>Suspected Medication(s)</label>
                    <button className="btn-secondary" onClick={addSuspectedRow} style={{ padding: '0.4rem 0.75rem', fontSize: '0.85rem' }}>
                      <Plus size={14} /> Add Drug
                    </button>
                  </div>
                  
                  <div className="dynamic-table-container" style={{ overflowX: 'auto' }}>
                    <table className="dynamic-table" style={{ minWidth: '800px' }}>
                      <thead>
                        <tr>
                          <th style={{ width: '40px' }}>S.No</th>
                          <th>Name (Brand/Generic)</th>
                          <th style={{ width: '100px' }}>Batch No.</th>
                          <th style={{ width: '100px' }}>Expiry</th>
                          <th style={{ width: '80px' }}>Dose</th>
                          <th style={{ width: '80px' }}>Route</th>
                          <th style={{ width: '80px' }}>Freq</th>
                          <th style={{ width: '100px' }}>Start Date</th>
                          <th style={{ width: '100px' }}>Stop Date</th>
                          <th>Indication</th>
                          <th style={{ width: '40px' }}>Act</th>
                        </tr>
                      </thead>
                      <tbody>
                        {formData.suspectedMeds.map((p, index) => (
                          <tr key={p.id}>
                            <td style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>{index + 1}</td>
                            <td><input type="text" className="table-input" value={p.name} onChange={(e) => handleSuspectedChange(p.id, 'name', e.target.value)} /></td>
                            <td><input type="text" className="table-input" value={p.batch} onChange={(e) => handleSuspectedChange(p.id, 'batch', e.target.value)} /></td>
                            <td><input type="text" className="table-input" value={p.expiry} onChange={(e) => handleSuspectedChange(p.id, 'expiry', e.target.value)} /></td>
                            <td><input type="text" className="table-input" value={p.dose} onChange={(e) => handleSuspectedChange(p.id, 'dose', e.target.value)} /></td>
                            <td><input type="text" className="table-input" value={p.route} onChange={(e) => handleSuspectedChange(p.id, 'route', e.target.value)} /></td>
                            <td><input type="text" className="table-input" value={p.freq} onChange={(e) => handleSuspectedChange(p.id, 'freq', e.target.value)} /></td>
                            <td><input type="date" className="table-input" value={p.dateStarted} onChange={(e) => handleSuspectedChange(p.id, 'dateStarted', e.target.value)} /></td>
                            <td><input type="date" className="table-input" value={p.dateStopped} onChange={(e) => handleSuspectedChange(p.id, 'dateStopped', e.target.value)} /></td>
                            <td><input type="text" className="table-input" value={p.indication} onChange={(e) => handleSuspectedChange(p.id, 'indication', e.target.value)} /></td>
                            <td style={{ textAlign: 'center' }}>
                              {formData.suspectedMeds.length > 1 && (
                                <button className="table-action-btn delete" onClick={() => removeSuspectedRow(p.id)}>
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

                <div className="form-group" style={{ marginTop: '3rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <label className="form-label" style={{ margin: 0 }}>Concomitant medical product (Exclude those used to treat reaction)</label>
                    <button className="btn-secondary" onClick={addConcomitantRow} style={{ padding: '0.4rem 0.75rem', fontSize: '0.85rem' }}>
                      <Plus size={14} /> Add Concomitant
                    </button>
                  </div>
                  
                  <div className="dynamic-table-container" style={{ overflowX: 'auto' }}>
                    <table className="dynamic-table" style={{ minWidth: '700px' }}>
                      <thead>
                        <tr>
                          <th style={{ width: '40px' }}>S.No</th>
                          <th>Name (Brand/Generic)</th>
                          <th style={{ width: '80px' }}>Dose</th>
                          <th style={{ width: '80px' }}>Route</th>
                          <th style={{ width: '80px' }}>Freq</th>
                          <th style={{ width: '100px' }}>Start Date</th>
                          <th style={{ width: '100px' }}>Stop Date</th>
                          <th>Indication</th>
                          <th style={{ width: '40px' }}>Act</th>
                        </tr>
                      </thead>
                      <tbody>
                        {formData.concomitantMeds.map((p, index) => (
                          <tr key={p.id}>
                            <td style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>{index + 1}</td>
                            <td><input type="text" className="table-input" value={p.name} onChange={(e) => handleConcomitantChange(p.id, 'name', e.target.value)} /></td>
                            <td><input type="text" className="table-input" value={p.dose} onChange={(e) => handleConcomitantChange(p.id, 'dose', e.target.value)} /></td>
                            <td><input type="text" className="table-input" value={p.route} onChange={(e) => handleConcomitantChange(p.id, 'route', e.target.value)} /></td>
                            <td><input type="text" className="table-input" value={p.freq} onChange={(e) => handleConcomitantChange(p.id, 'freq', e.target.value)} /></td>
                            <td><input type="date" className="table-input" value={p.dateStarted} onChange={(e) => handleConcomitantChange(p.id, 'dateStarted', e.target.value)} /></td>
                            <td><input type="date" className="table-input" value={p.dateStopped} onChange={(e) => handleConcomitantChange(p.id, 'dateStopped', e.target.value)} /></td>
                            <td><input type="text" className="table-input" value={p.indication} onChange={(e) => handleConcomitantChange(p.id, 'indication', e.target.value)} /></td>
                            <td style={{ textAlign: 'center' }}>
                              <button className="table-action-btn delete" onClick={() => removeConcomitantRow(p.id)}>
                                <Trash2 size={16} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            )}

            {/* SECTION 4: Action & Outcome */}
            {activeSection === 4 && (
              <div className="form-section">
                
                <div className="form-group" style={{ marginBottom: '2rem' }}>
                  <label className="form-label" style={{ marginBottom: '1rem', display: 'block' }}>Action taken after reaction & Rechallenge Matrix</label>
                  <div className="dynamic-table-container">
                    <table className="dynamic-table">
                      <thead>
                        <tr>
                          <th>Action Taken</th>
                          <th style={{ width: '100px', textAlign: 'center' }}>Applied</th>
                          <th colSpan="3" style={{ textAlign: 'center' }}>Reaction reappeared after reintroduction?</th>
                        </tr>
                        <tr>
                          <th></th>
                          <th></th>
                          <th style={{ width: '80px', textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Yes</th>
                          <th style={{ width: '80px', textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>No</th>
                          <th style={{ width: '100px', textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Unknown</th>
                        </tr>
                      </thead>
                      <tbody>
                        {formData.actionTaken.map((a) => (
                          <tr key={a.id}>
                            <td style={{ fontWeight: 500 }}>{a.action}</td>
                            <td style={{ textAlign: 'center' }}>
                              <input type="checkbox" checked={a.applied} onChange={(e) => handleActionMatrix(a.id, 'applied', e.target.checked)} style={{ width: '18px', height: '18px', cursor: 'pointer' }} />
                            </td>
                            <td style={{ textAlign: 'center', backgroundColor: a.applied ? 'transparent' : 'var(--bg-main)' }}>
                              <input type="radio" name={`reappear_${a.id}`} value="Yes" checked={a.reappeared === 'Yes'} onChange={(e) => handleActionMatrix(a.id, 'reappeared', e.target.value)} disabled={!a.applied} style={{ width: '16px', height: '16px' }} />
                            </td>
                            <td style={{ textAlign: 'center', backgroundColor: a.applied ? 'transparent' : 'var(--bg-main)' }}>
                              <input type="radio" name={`reappear_${a.id}`} value="No" checked={a.reappeared === 'No'} onChange={(e) => handleActionMatrix(a.id, 'reappeared', e.target.value)} disabled={!a.applied} style={{ width: '16px', height: '16px' }} />
                            </td>
                            <td style={{ textAlign: 'center', backgroundColor: a.applied ? 'transparent' : 'var(--bg-main)' }}>
                              <input type="radio" name={`reappear_${a.id}`} value="Unknown" checked={a.reappeared === 'Unknown'} onChange={(e) => handleActionMatrix(a.id, 'reappeared', e.target.value)} disabled={!a.applied} style={{ width: '16px', height: '16px' }} />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: '2rem', backgroundColor: 'var(--bg-main)', padding: '1.5rem', borderRadius: '8px' }}>
                  <label className="form-label">Seriousness of the reaction</label>
                  <div style={{ display: 'flex', gap: '2rem', marginTop: '0.5rem', marginBottom: '1.5rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                      <input type="radio" name="seriousness" value="No" checked={formData.seriousness === 'No'} onChange={handleInputChange} style={{ width: '18px', height: '18px' }} /> No
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                      <input type="radio" name="seriousness" value="Yes" checked={formData.seriousness === 'Yes'} onChange={handleInputChange} style={{ width: '18px', height: '18px' }} /> Yes (Select below)
                    </label>
                  </div>
                  
                  {formData.seriousness === 'Yes' && (
                    <div className="form-grid-3">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                          <input type="checkbox" name="serious_death" checked={formData.seriousnessType.death} onChange={handleInputChange} /> Death
                        </label>
                        {formData.seriousnessType.death && (
                          <input type="date" className="form-input" name="deathDate" value={formData.deathDate} onChange={handleInputChange} style={{ padding: '0.2rem', fontSize: '0.8rem' }} />
                        )}
                      </div>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                        <input type="checkbox" name="serious_lifeThreatening" checked={formData.seriousnessType.lifeThreatening} onChange={handleInputChange} /> Life threatening
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                        <input type="checkbox" name="serious_hospitalization" checked={formData.seriousnessType.hospitalization} onChange={handleInputChange} /> Hospitalization-Initial/Prolonged
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                        <input type="checkbox" name="serious_disability" checked={formData.seriousnessType.disability} onChange={handleInputChange} /> Disability
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                        <input type="checkbox" name="serious_congenitalAnomaly" checked={formData.seriousnessType.congenitalAnomaly} onChange={handleInputChange} /> Congenital-anomaly
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                        <input type="checkbox" name="serious_otherMedicallyImportant" checked={formData.seriousnessType.otherMedicallyImportant} onChange={handleInputChange} /> Other Medically important
                      </label>
                    </div>
                  )}
                </div>

                <div className="form-grid" style={{ marginBottom: '1.5rem' }}>
                  <div className="form-group">
                    <label className="form-label">Outcome</label>
                    <div className="form-grid-3" style={{ marginTop: '0.5rem' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                        <input type="radio" name="outcome" value="Recovered" checked={formData.outcome === 'Recovered'} onChange={handleInputChange} /> Recovered
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                        <input type="radio" name="outcome" value="Recovering" checked={formData.outcome === 'Recovering'} onChange={handleInputChange} /> Recovering
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                        <input type="radio" name="outcome" value="Not Recovered" checked={formData.outcome === 'Not Recovered'} onChange={handleInputChange} /> Not Recovered
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                        <input type="radio" name="outcome" value="Fatal" checked={formData.outcome === 'Fatal'} onChange={handleInputChange} /> Fatal
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                        <input type="radio" name="outcome" value="Recovered with sequelae" checked={formData.outcome === 'Recovered with sequelae'} onChange={handleInputChange} /> Recovered with sequelae
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                        <input type="radio" name="outcome" value="Unknown" checked={formData.outcome === 'Unknown'} onChange={handleInputChange} /> Unknown
                      </label>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Additional Information</label>
                  <textarea className="form-textarea" name="additionalInfo" value={formData.additionalInfo} onChange={handleInputChange} onBlur={handleBlur} placeholder="Any other relevant clinical observations..."></textarea>
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
                  <div className="review-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem' }}>
                    {Object.entries(formData).map(([key, value]) => {
                      if (typeof value === 'object' && value !== null) return null; // Skip complex arrays in summary
                      if (key.includes('serious_')) {
                        if (value !== true) return null; // Only show checked items for long checklists
                      }
                      
                      const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()).trim();
                      const displayValue = value === true ? 'Yes' : value === false ? 'No' : value || '-';
                      
                      return (
                        <div key={key} className="review-item">
                          <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>{label}</span>
                          <span style={{ display: 'block', fontWeight: 500, color: value ? 'var(--text-main)' : 'var(--text-secondary)' }}>
                            {displayValue}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                <div className="workspace-actions">
                  <button className="btn-draft" onClick={handleSaveDraft}><Save size={18} /> Save Draft</button>
                  <button className="btn-submit" onClick={handleSubmit} disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : <><Send size={18} /> Submit Report</>}
                  </button>
                </div>
              </div>
            )}

            </div> {/* End workspace-content-body */}
          </div>
        </div>
      </div>
    </StudentLayout>
  );
};

export default ADRForm;
