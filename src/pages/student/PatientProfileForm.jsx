import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, Save, Send, Plus, Trash2, CheckCircle2, FlaskConical, Droplets, Activity, Heart, ActivitySquare, TestTube2, TestTube, ActivityIcon } from 'lucide-react';
import StudentLayout from '../../components/student/StudentLayout';
import { useDatabase } from '../../context/DatabaseContext';
import './PatientProfileForm.css';

const SECTIONS = [
  { id: 1, title: 'Patient Information', mandatory: true },
  { id: 2, title: 'Chief Complaints', mandatory: false },
  { id: 3, title: 'Past Medical History', mandatory: false },
  { id: 4, title: 'Past Medication History', mandatory: false },
  { id: 5, title: 'Family Medical History', mandatory: false },
  { id: 6, title: 'Social History', mandatory: false },
  { id: 7, title: 'Allergies', mandatory: false },
  { id: 8, title: 'Physical Examination', mandatory: false },
  { id: 9, title: 'Vital Signs', mandatory: false },
  { id: 10, title: 'Laboratory Investigations', mandatory: false },
  { id: 11, title: 'Other Investigations', mandatory: false },
  { id: 12, title: 'Final Diagnosis', mandatory: false },
  { id: 13, title: 'Drugs Prescribed', mandatory: false },
  { id: 14, title: 'Discharge Summary', mandatory: false },
  { id: 15, title: 'Review & Submit', mandatory: false }
];

const LAB_CATEGORIES = [
  {
    id: 'haematological',
    name: 'Haematological Patterns',
    icon: <Droplets size={24} />,
    parameters: [
      { name: 'Hb', range: '11-16.5', unit: '%' },
      { name: 'RBC', range: '3.8-5.8', unit: 'cells/mm' },
      { name: 'WBC', range: '4000-10000', unit: 'cells/mm' },
      { name: 'DLC', range: '-', unit: '-' },
      { name: 'Neutrophils', range: '40-70', unit: '%' },
      { name: 'Lymphocytes', range: '15-30', unit: '%' },
      { name: 'Esinophils', range: '1-6', unit: '%' },
      { name: 'Monocytes', range: '2-10', unit: '%' },
      { name: 'MCH', range: '27-32', unit: 'pg/cell' },
      { name: 'MCHC', range: '31-35', unit: 'gm%' },
      { name: 'MCV', range: '49-80', unit: 'fl' },
      { name: 'ESR Males', range: '0-10', unit: 'mm1st hr' },
      { name: 'ESR Females', range: '0-12', unit: 'mm1st hr' },
      { name: 'Platelets', range: '1.5-4', unit: 'lakhs/cell' },
      { name: 'PCV', range: '35-40', unit: '%' },
      { name: 'CT', range: '-', unit: '-' },
      { name: 'BT', range: '-', unit: '-' },
      { name: 'PT', range: '-', unit: '-' },
      { name: 'APTT', range: '-', unit: '-' }
    ]
  },
  {
    id: 'urine',
    name: 'Urine Analysis',
    icon: <FlaskConical size={24} />,
    parameters: [
      { name: 'Color', range: '-', unit: '-' },
      { name: 'Specific gravity', range: '1.010-1.030', unit: '-' },
      { name: 'Ph', range: '5.0-8.0', unit: '-' },
      { name: 'Sugar', range: '-', unit: '-' },
      { name: 'Blood', range: '-', unit: '-' },
      { name: 'Pus cells', range: '1-5', unit: '/hpf' },
      { name: 'RBC', range: '-', unit: '-' },
      { name: 'Ketone bodies', range: '-', unit: '-' },
      { name: 'Epi. Cells', range: '1-5', unit: 'hpf' },
      { name: 'Proteins', range: '-', unit: '-' },
      { name: 'Bile salts/pigments', range: '-', unit: '-' },
      { name: 'Glucose', range: '-', unit: '-' },
      { name: 'Transparency', range: '-', unit: '-' },
      { name: 'Crystals', range: '-', unit: '-' }
    ]
  },
  {
    id: 'blood_glucose',
    name: 'Blood Glucose',
    icon: <TestTube size={24} />,
    parameters: [
      { name: 'FBS', range: '70-100', unit: 'mg/dl' },
      { name: 'RBS', range: '70-140', unit: 'mg/dl' },
      { name: 'PPBS', range: '110-160', unit: 'mg/dl' }
    ]
  },
  {
    id: 'electrolytes',
    name: 'Electrolytes',
    icon: <Activity size={24} />,
    parameters: [
      { name: 'Na', range: '135-145', unit: 'meq/l' },
      { name: 'K', range: '3.5-5.5', unit: 'meq/l' },
      { name: 'Chlorides', range: '98-107', unit: 'meq/l' },
      { name: 'Mg', range: '1.6-2.8', unit: 'mg/dl' },
      { name: 'Sr.Ca', range: '8.4-10.8', unit: 'mg/dl' }
    ]
  },
  {
    id: 'cardiac',
    name: 'Cardiac Function Tests',
    icon: <Heart size={24} />,
    parameters: [
      { name: 'CPK', range: '-', unit: '-' },
      { name: 'CPK-MB', range: '0-24', unit: 'IU/L' },
      { name: 'LDH', range: '-', unit: '-' }
    ]
  },
  {
    id: 'liver',
    name: 'Liver Functions Test',
    icon: <ActivitySquare size={24} />,
    parameters: [
      { name: 'Bili (T)', range: '0.5-1.1', unit: 'mg/dl' },
      { name: 'Bili (D)', range: '0-0.6', unit: 'mg/dl' },
      { name: 'Bili (ID)', range: '0-0.4', unit: 'mg/dl' },
      { name: 'SGOT(AST)', range: '6-38', unit: 'u/l' },
      { name: 'SGPT(ALT)', range: '6-38', unit: 'u/l' },
      { name: 'Alk. Phos', range: '36-142', unit: 'mu/ml' },
      { name: 'Globulin', range: '-', unit: '-' },
      { name: 'Albumin', range: '-', unit: '-' }
    ]
  },
  {
    id: 'renal',
    name: 'Renal Function Tests',
    icon: <TestTube2 size={24} />,
    parameters: [
      { name: 'Urea', range: '3-8', unit: 'mg%' },
      { name: 'S.Cr Males', range: '0.6-1.1', unit: 'mg%' },
      { name: 'S.Cr Females', range: '0.5-0.9', unit: 'mg%' },
      { name: 'Uric acid', range: '2.6-7.2', unit: 'mg%' }
    ]
  },
  {
    id: 'lipid',
    name: 'Lipid Profile Tests',
    icon: <Droplets size={24} />,
    parameters: [
      { name: 'Total Chol', range: '130-250', unit: 'mg/dl' },
      { name: 'HDL', range: '30-70', unit: 'mg/dl' },
      { name: 'LDL', range: '60-170', unit: 'mg/dl' },
      { name: 'VLDL', range: '5-40', unit: 'mg/dl' },
      { name: 'TG', range: 'upto 170', unit: 'mg/dl' }
    ]
  },
  {
    id: 'thyroid',
    name: 'Thyroid Function Tests',
    icon: <ActivityIcon size={24} />,
    parameters: [
      { name: 'TSH', range: '0.5-4', unit: 'mIU/L' },
      { name: 'Free tT4', range: '0.8-1.8', unit: 'ng/dL in adults' },
      { name: 'Total T3', range: '80-180', unit: 'ng/dL' }
    ]
  }
];

const PatientProfileForm = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(1);
  const [activeLabCategory, setActiveLabCategory] = useState(LAB_CATEGORIES[0].id);

  const { submitCase, saveDraftCase } = useDatabase();
  const [errors, setErrors] = useState({});

  // Consolidated Form State
  const [formData, setFormData] = useState({
    // Section 1
    patientName: '', age: '', gender: '', ipNumber: '', mrNumber: '',
    height: '', weight: '', bmi: '', ward: '', department: '',
    doa: '', doc: '', dod: '', physician: '',
    
    // Sections 2-5
    chiefComplaints: '', pastMedicalHistory: '',
    pastMedicationHistory: '', familyMedicalHistory: '',
    
    // Section 6
    smoker: '', smokerPacks: '', smokerDuration: '',
    alcoholic: '', alcoholicAmount: '', alcoholicDuration: '',
    maritalStatus: '',
    
    // Section 7
    foodAllergy: '', drugAllergy: '',
    
    // Section 8
    cyanosis: '', icterus: '', pallor: '', cvs: '', rs: '', gi: '', cns: '',
    
    // Section 9
    vitalSigns: [{ date: '', temp: '', bp: '', pr: '', rr: '', spo2: '' }],
    
    // Section 10
    laboratory: {},
    
    // Section 11 & 12
    otherInvestigations: '', finalDiagnosis: '',
    
    // Section 13
    drugsPrescribed: [{ sNo: '1', tradeName: '', genericName: '', roa: '', dose: '', frq: '', startDate: '', stopDate: '' }],
    
    // Section 14
    dischargeSummary: ''
  });

  // Calculate BMI automatically
  useEffect(() => {
    if (formData.height && formData.weight) {
      const hInMeters = parseFloat(formData.height) / 100;
      const w = parseFloat(formData.weight);
      if (hInMeters > 0 && w > 0) {
        const bmiCalc = (w / (hInMeters * hInMeters)).toFixed(2);
        setFormData(prev => ({ ...prev, bmi: bmiCalc }));
      }
    }
  }, [formData.height, formData.weight]);

  const formatTitleCaseLive = (str) => {
    if (typeof str !== 'string' || !str) return str;
    const connectors = new Set(['of', 'on', 'in', 'to', 'for', 'and', 'or', 'with', 'by', 'at', 'from', 'into', 'over', 'under', 'between', 'after', 'before', 'through', 'via', 'per', 'vs']);
    // Replace multiple spaces but DO NOT trim so user can type spaces
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
    // Replace multiple spaces but keep newlines
    const cleaned = str.replace(/[ \t]{2,}/g, ' ');
    return cleaned.replace(/(^|[\n.!?]\s+)([a-z])/g, (match, separator, char) => {
      return separator + char.toUpperCase();
    });
  };

  const handleInputChange = (e) => {
    let { name, value, type } = e.target;
    if (name === 'ipNumber') {
      if (!/^\d*$/.test(value)) return;
    }
    
    // Apply live formatting while typing
    if (type === 'textarea') {
      value = formatSentenceCaseLive(value);
    } else if (type === 'text' && name !== 'ipNumber' && name !== 'mrNumber') {
      value = formatTitleCaseLive(value);
    }

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name, value, type } = e.target;
    
    if (!name || name === 'ipNumber' || name === 'mrNumber') {
      return;
    }

    // Only apply trimming on blur so we don't break spacebar while typing
    if (type === 'textarea') {
      setFormData(prev => ({ ...prev, [name]: value.trim() }));
    } else if (type === 'text') {
      setFormData(prev => ({ ...prev, [name]: value.trim() }));
    }
  };

  useEffect(() => {
    const newErrors = { ...errors };
    
    if (formData.ipNumber && !/^\d{10}$/.test(formData.ipNumber)) {
      newErrors.ipNumber = "IP Number Must Contain Exactly 10 Digits.";
    } else {
      delete newErrors.ipNumber;
    }

    const doa = formData.doa ? new Date(formData.doa) : null;
    const dod = formData.dod ? new Date(formData.dod) : null;
    const doc = formData.doc ? new Date(formData.doc) : null;

    delete newErrors.doa;
    delete newErrors.dod;
    delete newErrors.doc;

    if (dod && doa && dod < doa) {
      newErrors.dod = "Date of Discharge Cannot Be Earlier Than Date of Admission.";
    }
    if (doc && doa && doc < doa) {
      newErrors.doc = "Date of Case Collection Cannot Be Earlier Than Date of Admission.";
    }
    if (doc && dod && doc < dod) {
      newErrors.doc = "Date of Case Collection Cannot Be Earlier Than Date of Discharge.";
    }

    setErrors(newErrors);
  }, [formData.ipNumber, formData.doa, formData.dod, formData.doc]);

  const handleLabChange = (category, parameter, value) => {
    setFormData(prev => ({
      ...prev,
      laboratory: {
        ...prev.laboratory,
        [category]: {
          ...(prev.laboratory[category] || {}),
          [parameter]: value
        }
      }
    }));
  };

  const handleVitalChange = (index, field, value) => {
    const newVitals = [...formData.vitalSigns];
    newVitals[index][field] = value;
    setFormData(prev => ({ ...prev, vitalSigns: newVitals }));
  };

  const addVitalRow = () => {
    setFormData(prev => ({
      ...prev,
      vitalSigns: [...prev.vitalSigns, { date: '', temp: '', bp: '', pr: '', rr: '', spo2: '' }]
    }));
  };

  const removeVitalRow = (index) => {
    if (formData.vitalSigns.length > 1) {
      const newVitals = [...formData.vitalSigns];
      newVitals.splice(index, 1);
      setFormData(prev => ({ ...prev, vitalSigns: newVitals }));
    }
  };

  const handleDrugChange = (index, field, value) => {
    const newDrugs = [...formData.drugsPrescribed];
    newDrugs[index][field] = value;
    setFormData(prev => ({ ...prev, drugsPrescribed: newDrugs }));
  };

  const addDrugRow = () => {
    setFormData(prev => ({
      ...prev,
      drugsPrescribed: [...prev.drugsPrescribed, { sNo: String(prev.drugsPrescribed.length + 1), tradeName: '', genericName: '', roa: '', dose: '', frq: '', startDate: '', stopDate: '' }]
    }));
  };

  const removeDrugRow = (index) => {
    if (formData.drugsPrescribed.length > 1) {
      const newDrugs = [...formData.drugsPrescribed];
      newDrugs.splice(index, 1);
      // Re-index
      newDrugs.forEach((d, i) => d.sNo = String(i + 1));
      setFormData(prev => ({ ...prev, drugsPrescribed: newDrugs }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(errors).length > 0) {
      alert("Please resolve validation errors before continuing.");
      return;
    }
    if (!formData.patientName || !formData.age || !formData.ipNumber || !formData.doa || !formData.dod || !formData.doc) {
      alert("Please fill out all mandatory Patient Information fields and Dates before submitting.");
      setActiveSection(1);
      return;
    }
    
    // Dispatch to global database
    submitCase({
      docType: 'Patient Profile',
      patientName: formData.patientName,
      age: formData.age,
      gender: formData.gender,
      diagnosis: formData.finalDiagnosis || 'Not specified',
      hospital: 'City General Hospital', // Default for now
      department: formData.ward,
      ...formData
    });

    navigate('/student/cases/submitted');
  };

  const handleSaveDraft = () => {
    if (Object.keys(errors).length > 0) {
      alert("Please resolve validation errors before saving.");
      return;
    }
    saveDraftCase({
      docType: 'Patient Profile',
      patientName: formData.patientName,
      age: formData.age,
      gender: formData.gender,
      diagnosis: formData.finalDiagnosis || 'Not specified',
      hospital: 'City General Hospital',
      department: formData.ward,
      ...formData
    });
    alert("Draft saved successfully!");
  };

  return (
    <StudentLayout>
      <div className="patient-profile-workspace animate-fade-in">
        
        {/* Left Sidebar Navigation */}
        <div className="workspace-sidebar">
          <div className="workspace-sidebar-header">
            <h2 className="workspace-sidebar-title">Sections</h2>
          </div>
          <div className="workspace-nav">
            {SECTIONS.map((section) => (
              <button 
                key={section.id} 
                className={`workspace-nav-item ${activeSection === section.id ? 'active' : ''}`}
                onClick={() => setActiveSection(section.id)}
              >
                {section.title}
                {section.mandatory ? (
                  <span className="workspace-nav-badge mandatory-badge">Required</span>
                ) : (
                  <span className="workspace-nav-badge">Optional</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="workspace-content">
          <div className="workspace-content-header">
            <h1 className="workspace-content-title">
              {SECTIONS.find(s => s.id === activeSection)?.title}
            </h1>
            {activeSection !== 15 && (
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
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">Patient Name <span style={{color: 'red'}}>*</span></label>
                    <input type="text" className="form-input" name="patientName" value={formData.patientName} onChange={handleInputChange} onBlur={handleBlur} placeholder="Enter name" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Age / Sex <span style={{color: 'red'}}>*</span></label>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <input type="number" className="form-input" style={{flex: 1}} name="age" value={formData.age} onChange={handleInputChange} placeholder="Age" />
                      <select className="form-select" style={{flex: 1}} name="gender" value={formData.gender} onChange={handleInputChange}>
                        <option value="">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">I.P No <span style={{color: 'red'}}>*</span></label>
                    <input type="text" className="form-input" style={{ borderColor: errors.ipNumber ? 'red' : undefined }} name="ipNumber" value={formData.ipNumber} onChange={handleInputChange} placeholder="Exactly 10 digits" maxLength={10} />
                    {errors.ipNumber && <span style={{ color: 'red', fontSize: '0.75rem', marginTop: '0.25rem' }}>{errors.ipNumber}</span>}
                  </div>
                  <div className="form-group">
                    <label className="form-label">MR Number</label>
                    <input type="text" className="form-input" name="mrNumber" value={formData.mrNumber} onChange={handleInputChange} onBlur={handleBlur} placeholder="MR Number" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Height (cm)</label>
                    <input type="number" className="form-input" name="height" value={formData.height} onChange={handleInputChange} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Weight (kg)</label>
                    <input type="number" className="form-input" name="weight" value={formData.weight} onChange={handleInputChange} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">BMI</label>
                    <input type="text" className="form-input" name="bmi" value={formData.bmi} readOnly />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Ward</label>
                    <input type="text" className="form-input" name="ward" value={formData.ward} onChange={handleInputChange} onBlur={handleBlur} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Department</label>
                    <input type="text" className="form-input" name="department" value={formData.department} onChange={handleInputChange} onBlur={handleBlur} />
                  </div>
                </div>

                <div className="form-grid-3">
                  <div className="form-group">
                    <label className="form-label">Date of Admission (DOA) <span style={{color: 'red'}}>*</span></label>
                    <input type="date" className="form-input" style={{ borderColor: errors.doa ? 'red' : undefined }} name="doa" value={formData.doa} onChange={handleInputChange} max={formData.dod || formData.doc || undefined} />
                    {errors.doa && <span style={{ color: 'red', fontSize: '0.75rem', marginTop: '0.25rem' }}>{errors.doa}</span>}
                  </div>
                  <div className="form-group">
                    <label className="form-label">Date of Discharge (DOD) <span style={{color: 'red'}}>*</span></label>
                    <input type="date" className="form-input" style={{ borderColor: errors.dod ? 'red' : undefined }} name="dod" value={formData.dod} onChange={handleInputChange} min={formData.doa || undefined} max={formData.doc || undefined} />
                    {errors.dod && <span style={{ color: 'red', fontSize: '0.75rem', marginTop: '0.25rem' }}>{errors.dod}</span>}
                  </div>
                  <div className="form-group">
                    <label className="form-label">Date of Case Collection (DOC) <span style={{color: 'red'}}>*</span></label>
                    <input type="date" className="form-input" style={{ borderColor: errors.doc ? 'red' : undefined }} name="doc" value={formData.doc} onChange={handleInputChange} min={formData.dod || formData.doa || undefined} />
                    {errors.doc && <span style={{ color: 'red', fontSize: '0.75rem', marginTop: '0.25rem' }}>{errors.doc}</span>}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Treating Physician</label>
                  <input type="text" className="form-input" name="physician" value={formData.physician} onChange={handleInputChange} onBlur={handleBlur} placeholder="Dr. Name" />
                </div>
              </div>
            )}

            {/* SECTIONS 2-5: Text Areas */}
            {activeSection === 2 && (
              <div className="form-section">
                <div className="form-group">
                  <label className="form-label">Chief Complaints <span className="form-label optional">(Optional)</span></label>
                  <textarea className="form-textarea large-textarea" name="chiefComplaints" value={formData.chiefComplaints} onChange={handleInputChange} onBlur={handleBlur}></textarea>
                </div>
              </div>
            )}
            
            {activeSection === 3 && (
              <div className="form-section">
                <div className="form-group">
                  <label className="form-label">Past Medical History <span className="form-label optional">(Optional)</span></label>
                  <textarea className="form-textarea large-textarea" name="pastMedicalHistory" value={formData.pastMedicalHistory} onChange={handleInputChange} onBlur={handleBlur}></textarea>
                </div>
              </div>
            )}

            {activeSection === 4 && (
              <div className="form-section">
                <div className="form-group">
                  <label className="form-label">Past Medication History <span className="form-label optional">(Optional)</span></label>
                  <textarea className="form-textarea large-textarea" name="pastMedicationHistory" value={formData.pastMedicationHistory} onChange={handleInputChange} onBlur={handleBlur}></textarea>
                </div>
              </div>
            )}

            {activeSection === 5 && (
              <div className="form-section">
                <div className="form-group">
                  <label className="form-label">Family Medical History <span className="form-label optional">(Optional)</span></label>
                  <textarea className="form-textarea large-textarea" name="familyMedicalHistory" value={formData.familyMedicalHistory} onChange={handleInputChange} onBlur={handleBlur}></textarea>
                </div>
              </div>
            )}

            {/* SECTION 6: Social History */}
            {activeSection === 6 && (
              <div className="form-section">
                <p style={{color: 'var(--text-secondary)', marginBottom: '1rem'}}>Complete only if applicable.</p>
                <div className="form-grid">
                  <div className="form-group" style={{ backgroundColor: 'var(--bg-main)', padding: '1.5rem', borderRadius: '8px' }}>
                    <label className="form-label">Smoker</label>
                    <select className="form-select" style={{marginBottom: '1rem'}} name="smoker" value={formData.smoker} onChange={handleInputChange}>
                      <option value="">Select</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                    <label className="form-label">Pack/day</label>
                    <input type="text" className="form-input" style={{marginBottom: '1rem'}} name="smokerPacks" value={formData.smokerPacks} onChange={handleInputChange} onBlur={handleBlur} />
                    <label className="form-label">Duration</label>
                    <input type="text" className="form-input" name="smokerDuration" value={formData.smokerDuration} onChange={handleInputChange} onBlur={handleBlur} />
                  </div>
                  <div className="form-group" style={{ backgroundColor: 'var(--bg-main)', padding: '1.5rem', borderRadius: '8px' }}>
                    <label className="form-label">Alcoholic</label>
                    <select className="form-select" style={{marginBottom: '1rem'}} name="alcoholic" value={formData.alcoholic} onChange={handleInputChange}>
                      <option value="">Select</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                    <label className="form-label">Amount/day</label>
                    <input type="text" className="form-input" style={{marginBottom: '1rem'}} name="alcoholicAmount" value={formData.alcoholicAmount} onChange={handleInputChange} onBlur={handleBlur} />
                    <label className="form-label">Duration</label>
                    <input type="text" className="form-input" name="alcoholicDuration" value={formData.alcoholicDuration} onChange={handleInputChange} onBlur={handleBlur} />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Marital Status</label>
                  <select className="form-select" style={{ maxWidth: '300px' }} name="maritalStatus" value={formData.maritalStatus} onChange={handleInputChange}>
                    <option value="">Select</option>
                    <option value="Single">Single</option>
                    <option value="Married">Married</option>
                    <option value="Divorced">Divorced</option>
                    <option value="Widowed">Widowed</option>
                  </select>
                </div>
              </div>
            )}

            {/* SECTION 7: Allergies */}
            {activeSection === 7 && (
              <div className="form-section">
                <div className="form-group">
                  <label className="form-label">Food Allergy <span className="form-label optional">(Optional)</span></label>
                  <textarea className="form-textarea" name="foodAllergy" value={formData.foodAllergy} onChange={handleInputChange} onBlur={handleBlur}></textarea>
                </div>
                <div className="form-group">
                  <label className="form-label">Drug Allergy <span className="form-label optional">(Optional)</span></label>
                  <textarea className="form-textarea" name="drugAllergy" value={formData.drugAllergy} onChange={handleInputChange} onBlur={handleBlur}></textarea>
                </div>
              </div>
            )}

            {/* SECTION 8: Physical Examination */}
            {activeSection === 8 && (
              <div className="form-section">
                <p style={{color: 'var(--text-secondary)', marginBottom: '1rem'}}>Complete only if applicable.</p>
                <div className="form-grid-3" style={{ marginBottom: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Cyanosis</label>
                    <input type="text" className="form-input" name="cyanosis" value={formData.cyanosis} onChange={handleInputChange} onBlur={handleBlur} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Icterus</label>
                    <input type="text" className="form-input" name="icterus" value={formData.icterus} onChange={handleInputChange} onBlur={handleBlur} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Pallor</label>
                    <input type="text" className="form-input" name="pallor" value={formData.pallor} onChange={handleInputChange} onBlur={handleBlur} />
                  </div>
                </div>
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">CVS</label>
                    <input type="text" className="form-input" name="cvs" value={formData.cvs} onChange={handleInputChange} onBlur={handleBlur} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">GI</label>
                    <input type="text" className="form-input" name="gi" value={formData.gi} onChange={handleInputChange} onBlur={handleBlur} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">RS</label>
                    <input type="text" className="form-input" name="rs" value={formData.rs} onChange={handleInputChange} onBlur={handleBlur} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">CNS</label>
                    <input type="text" className="form-input" name="cns" value={formData.cns} onChange={handleInputChange} onBlur={handleBlur} />
                  </div>
                </div>
              </div>
            )}

            {/* SECTION 9: Vital Signs */}
            {activeSection === 9 && (
              <div className="form-section">
                <p style={{color: 'var(--text-secondary)', marginBottom: '1rem'}}>Add unlimited observation rows.</p>
                <div className="dynamic-table-container">
                  <table className="dynamic-table">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>TEMP [°F]</th>
                        <th>BP [mmHg]</th>
                        <th>PR [bpm]</th>
                        <th>RR [cpm]</th>
                        <th>SPO₂ [%]</th>
                        <th style={{width: '50px'}}></th>
                      </tr>
                    </thead>
                    <tbody>
                      {formData.vitalSigns.map((row, index) => (
                        <tr key={index}>
                          <td><input type="date" className="table-input" value={row.date} onChange={(e) => handleVitalChange(index, 'date', e.target.value)} /></td>
                          <td><input type="text" className="table-input" value={row.temp} onChange={(e) => handleVitalChange(index, 'temp', e.target.value)} /></td>
                          <td><input type="text" className="table-input" value={row.bp} onChange={(e) => handleVitalChange(index, 'bp', e.target.value)} /></td>
                          <td><input type="text" className="table-input" value={row.pr} onChange={(e) => handleVitalChange(index, 'pr', e.target.value)} /></td>
                          <td><input type="text" className="table-input" value={row.rr} onChange={(e) => handleVitalChange(index, 'rr', e.target.value)} /></td>
                          <td><input type="text" className="table-input" value={row.spo2} onChange={(e) => handleVitalChange(index, 'spo2', e.target.value)} /></td>
                          <td>
                            <button className="btn-remove-row" onClick={() => removeVitalRow(index)}><Trash2 size={16} /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div>
                  <button className="btn-add-row" onClick={addVitalRow}><Plus size={16} /> Add Observation</button>
                </div>
              </div>
            )}

            {/* SECTION 10: Laboratory Investigations */}
            {activeSection === 10 && (
              <div className="form-section">
                {!activeLabCategory ? (
                  <>
                    <p style={{color: 'var(--text-secondary)', marginBottom: '1rem'}}>Select a category to enter laboratory parameters.</p>
                    <div className="lab-categories-grid">
                      {LAB_CATEGORIES.map(category => (
                        <button 
                          key={category.id} 
                          className="lab-category-btn"
                          onClick={() => setActiveLabCategory(category.id)}
                        >
                          {category.icon}
                          {category.name}
                        </button>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <button 
                      onClick={() => setActiveLabCategory(null)}
                      style={{ background: 'none', border: 'none', color: '#3b82f6', cursor: 'pointer', fontWeight: 600, padding: 0, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                    >
                      &lt; Back to Categories
                    </button>
                    <div style={{ backgroundColor: 'var(--bg-main)', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                      <h3 style={{ marginTop: 0, marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
                        {LAB_CATEGORIES.find(c => c.id === activeLabCategory)?.name}
                      </h3>
                      
                      <div className="lab-parameter-grid">
                        <div className="lab-parameter-header">Parameter / Date</div>
                        <div className="lab-parameter-header">Reference Range</div>
                        <div className="lab-parameter-header">Unit</div>
                        <div className="lab-parameter-header">Patient Value</div>
                      </div>

                      {LAB_CATEGORIES.find(c => c.id === activeLabCategory)?.parameters.map(param => (
                        <div className="lab-parameter-grid" key={param.name}>
                          <div className="lab-parameter-name">{param.name}</div>
                          <div className="lab-parameter-range">{param.range}</div>
                          <div className="lab-parameter-unit">{param.unit}</div>
                          <div>
                            <input 
                              type="text" 
                              className="table-input" 
                              placeholder="Enter value"
                              value={formData.laboratory[activeLabCategory]?.[param.name] || ''}
                              onChange={(e) => handleLabChange(activeLabCategory, param.name, e.target.value)}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}

            {/* SECTIONS 11-12: Other Investigations & Diagnosis */}
            {activeSection === 11 && (
              <div className="form-section">
                <div className="form-group">
                  <label className="form-label">Other Investigations <span className="form-label optional">(Optional)</span></label>
                  <textarea className="form-textarea large-textarea" name="otherInvestigations" value={formData.otherInvestigations} onChange={handleInputChange} onBlur={handleBlur}></textarea>
                </div>
              </div>
            )}

            {activeSection === 12 && (
              <div className="form-section">
                <div className="form-group">
                  <label className="form-label">Final Diagnosis <span className="form-label optional">(Optional)</span></label>
                  <textarea className="form-textarea large-textarea" name="finalDiagnosis" value={formData.finalDiagnosis} onChange={handleInputChange} onBlur={handleBlur}></textarea>
                </div>
              </div>
            )}

            {/* SECTION 13: Drugs Prescribed */}
            {activeSection === 13 && (
              <div className="form-section">
                <p style={{color: 'var(--text-secondary)', marginBottom: '1rem'}}>Add unlimited medicine rows.</p>
                <div className="dynamic-table-container">
                  <table className="dynamic-table">
                    <thead>
                      <tr>
                        <th style={{width: '60px'}}>S.no</th>
                        <th>Trade Name</th>
                        <th>Generic Name</th>
                        <th>R.O.A</th>
                        <th>Dose</th>
                        <th>FRQ</th>
                        <th>Start Date</th>
                        <th>Stop Date</th>
                        <th style={{width: '40px'}}></th>
                      </tr>
                    </thead>
                    <tbody>
                      {formData.drugsPrescribed.map((row, index) => (
                        <tr key={index}>
                          <td style={{ verticalAlign: 'middle', fontWeight: 600, color: 'var(--text-secondary)' }}>{row.sNo}</td>
                          <td><input type="text" className="table-input" value={row.tradeName} onChange={(e) => handleDrugChange(index, 'tradeName', e.target.value)} /></td>
                          <td><input type="text" className="table-input" value={row.genericName} onChange={(e) => handleDrugChange(index, 'genericName', e.target.value)} /></td>
                          <td><input type="text" className="table-input" value={row.roa} onChange={(e) => handleDrugChange(index, 'roa', e.target.value)} /></td>
                          <td><input type="text" className="table-input" value={row.dose} onChange={(e) => handleDrugChange(index, 'dose', e.target.value)} /></td>
                          <td><input type="text" className="table-input" value={row.frq} onChange={(e) => handleDrugChange(index, 'frq', e.target.value)} /></td>
                          <td><input type="date" className="table-input" value={row.startDate} onChange={(e) => handleDrugChange(index, 'startDate', e.target.value)} /></td>
                          <td><input type="date" className="table-input" value={row.stopDate} onChange={(e) => handleDrugChange(index, 'stopDate', e.target.value)} /></td>
                          <td>
                            <button className="btn-remove-row" onClick={() => removeDrugRow(index)}><Trash2 size={16} /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div>
                  <button className="btn-add-row" onClick={addDrugRow}><Plus size={16} /> Add Medicine</button>
                </div>
              </div>
            )}

            {/* SECTION 14: Discharge Summary */}
            {activeSection === 14 && (
              <div className="form-section">
                <div className="form-group">
                  <label className="form-label">Discharge Summary <span className="form-label optional">(Optional)</span></label>
                  <textarea className="form-textarea large-textarea" name="dischargeSummary" value={formData.dischargeSummary} onChange={handleInputChange} onBlur={handleBlur}></textarea>
                </div>
              </div>
            )}

            {/* SECTION 15: Review & Submit */}
            {activeSection === 15 && (
              <div className="form-section">
                <div className="info-banner" style={{ backgroundColor: 'var(--bg-main)', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', borderLeft: '4px solid var(--color-blue)' }}>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Please review all entered information before final submission.</p>
                </div>
                
                <div className="review-section" style={{ backgroundColor: 'var(--bg-main)', padding: '1.5rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
                  <h3 className="review-section-title" style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>Documentation Summary</h3>
                  <div className="review-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem' }}>
                    {Object.entries(formData).map(([key, value]) => {
                      if (typeof value === 'object' && value !== null) return null; // Skip complex arrays in summary
                      
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
                  <button className="btn-submit" onClick={handleSubmit}><Send size={18} /> Submit to Preceptor</button>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </StudentLayout>
  );
};

export default PatientProfileForm;
