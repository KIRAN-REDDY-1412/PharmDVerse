import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Save, Send, Plus, Trash2, CheckCircle2, FlaskConical, Droplets, Activity, Heart, ActivitySquare, TestTube2, TestTube, ActivityIcon, AlertTriangle, ArrowUp, ArrowDown, Check, ArrowLeft, ShieldAlert, Printer, FileText } from 'lucide-react';
import StudentLayout from '../student/StudentLayout';
import CollegeAdminLayout from '../college/CollegeAdminLayout';
import AdminLayout from '../admin/AdminLayout';
import { useDatabase } from '../../context/DatabaseContext';
import { MOCK_CASES } from '../../data/mockData';
import '../../pages/college/PreceptorManagement.css';
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

const PatientProfileForm = ({ role = 'student' }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { cases, submitCase, saveDraftCase, updateFormStatus } = useDatabase();

  const isAdmin = role === 'admin';
  const isPreceptor = role === 'preceptor';
  const isSuperAdmin = role === 'superadmin';
  const Layout = (isPreceptor || isAdmin || isSuperAdmin) ? React.Fragment : StudentLayout;
  const existingCase = id ? cases.find(c => c.id === id) || MOCK_CASES.find(c => c.id === id) : null;
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
  
  const formStatus = existingCase?.forms?.patientProfile?.status || 'Pending';
  const [preceptorComments, setPreceptorComments] = useState(existingCase?.forms?.patientProfile?.comments || '');
  
  const [activeSection, setActiveSection] = useState(1);
  const [activeLabCategory, setActiveLabCategory] = useState(LAB_CATEGORIES[0].id);
  const [errors, setErrors] = useState({});

  // Scroll content to top when section changes
  const contentBodyRef = useRef(null);
  useEffect(() => {
    if (contentBodyRef.current) {
      contentBodyRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [activeSection]);

  // Initialize with existing data if available
  const [formData, setFormData] = useState({
    dateOfAdmission: existingCase?.dateOfAdmission || '',
    dateOfDischarge: existingCase?.dateOfDischarge || '',
    patientName: existingCase?.patientName || '',
    age: existingCase?.age || '',
    gender: existingCase?.gender || '',
    height: existingCase?.height || '',
    weight: existingCase?.weight || '',
    bmi: existingCase?.bmi || '',
    hospital: existingCase?.hospital || '',
    department: existingCase?.department || '',
    ward: existingCase?.ward || '',
    ipNumber: existingCase?.ipNumber || '',
    mrNumber: existingCase?.mrNumber || '',
    doc: existingCase?.doc || '',
    physician: existingCase?.physician || '',
    
    chiefComplaints: existingCase?.chiefComplaints || '',
    pastMedicalHistory: existingCase?.pastMedicalHistory || '',
    pastMedicationHistory: existingCase?.pastMedicationHistory || '',
    familyMedicalHistory: existingCase?.familyMedicalHistory || '',
    
    smoker: existingCase?.smoker || '', smokerPacks: existingCase?.smokerPacks || '', smokerDuration: existingCase?.smokerDuration || '',
    alcoholic: existingCase?.alcoholic || '', alcoholicAmount: existingCase?.alcoholicAmount || '', alcoholicDuration: existingCase?.alcoholicDuration || '',
    maritalStatus: existingCase?.maritalStatus || '',
    
    foodAllergy: existingCase?.foodAllergy || '', drugAllergy: existingCase?.drugAllergy || '',
    
    cyanosis: existingCase?.cyanosis || '', icterus: existingCase?.icterus || '', pallor: existingCase?.pallor || '', cvs: existingCase?.cvs || '', rs: existingCase?.rs || '', gi: existingCase?.gi || '', cns: existingCase?.cns || '',
    
    vitalSigns: existingCase?.vitalSigns || [{ date: '', temp: '', bp: '', pr: '', rr: '', spo2: '' }],
    laboratory: existingCase?.laboratory || {},
    otherInvestigations: existingCase?.otherInvestigations || '',
    finalDiagnosis: existingCase?.finalDiagnosis || '',
    
    drugsPrescribed: existingCase?.drugsPrescribed || [{ sNo: '1', tradeName: '', genericName: '', roa: '', dose: '', frq: '', startDate: '', stopDate: '', duration: '' }],
    dischargeSummary: existingCase?.dischargeSummary || ''
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

  const handleBlur = (e) => {
    if (isLocked) return;
    const { name, value } = e.target;
    if (typeof value === 'string') {
      setFormData(prev => ({ ...prev, [name]: value.trim() }));
    }
  };

  const handleInputChange = (e) => {
    if (isLocked) return;
    let { name, value, type } = e.target;
    if (name === 'ipNumber') {
      if (!/^\d*$/.test(value)) return;
    }
    
    if (type === 'textarea') {
      value = formatSentenceCaseLive(value);
    } else if (type === 'text' && name !== 'ipNumber' && name !== 'mrNumber') {
      value = formatTitleCaseLive(value);
    }

    let newValue = value;

    if (name === 'age' || name === 'height' || name === 'weight' || name === 'pulse' || name === 'rr' || name === 'smokerPacks' || name === 'alcoholicAmount') {
      if (parseFloat(newValue) < 0) return; 
    }
    
    setFormData(prev => {
      const newForm = { ...prev, [name]: newValue };
      
      if (name === 'height' || name === 'weight') {
        const h = parseFloat(newForm.height);
        const w = parseFloat(newForm.weight);
        if (h > 0 && w > 0) {
          newForm.bmi = (w / ((h / 100) ** 2)).toFixed(2);
        } else {
          newForm.bmi = '';
        }
      }
      return newForm;
    });

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  useEffect(() => {
    const newErrors = { ...errors };
    if (formData.ipNumber && !/^\d{10}$/.test(formData.ipNumber)) {
      newErrors.ipNumber = "IP Number Must Contain Exactly 10 Digits.";
    } else {
      delete newErrors.ipNumber;
    }
    setErrors(newErrors);
  }, [formData.ipNumber]);

  const handleLabChange = (category, parameter, value) => {
    if (isLocked) return;
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
    if (isLocked) return;
    const newVitals = [...formData.vitalSigns];
    newVitals[index][field] = value;
    setFormData(prev => ({ ...prev, vitalSigns: newVitals }));
  };

  const addVitalRow = () => {
    if (isLocked) return;
    setFormData(prev => ({
      ...prev,
      vitalSigns: [...prev.vitalSigns, { date: '', temp: '', bp: '', pr: '', rr: '', spo2: '' }]
    }));
  };

  const removeVitalRow = (index) => {
    if (isLocked || formData.vitalSigns.length <= 1) return;
    const newVitals = [...formData.vitalSigns];
    newVitals.splice(index, 1);
    setFormData(prev => ({ ...prev, vitalSigns: newVitals }));
  };

  const handleDrugChange = (index, field, value) => {
    if (isLocked) return;
    const newDrugs = [...formData.drugsPrescribed];
    newDrugs[index][field] = value;
    
    // Auto-calculate duration
    if (field === 'startDate' || field === 'stopDate') {
      const start = newDrugs[index].startDate;
      const stop = newDrugs[index].stopDate;
      if (start && stop) {
        const startD = new Date(start);
        const stopD = new Date(stop);
        if (stopD >= startD) {
          const diffTime = Math.abs(stopD - startD);
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 to include both days
          newDrugs[index].duration = `${diffDays} Day${diffDays > 1 ? 's' : ''}`;
        } else {
          newDrugs[index].duration = 'Error';
        }
      } else {
        newDrugs[index].duration = '';
      }
    }
    
    setFormData(prev => ({ ...prev, drugsPrescribed: newDrugs }));
  };

  const getLabStatus = (value, range) => {
    if (!value || range === '-') return null;
    
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return null;

    if (range.includes('-')) {
      const parts = range.split('-');
      if (parts.length === 2) {
        const min = parseFloat(parts[0]);
        const max = parseFloat(parts[1]);
        if (!isNaN(min) && !isNaN(max)) {
          if (numValue < min) return 'LOW';
          if (numValue > max) return 'HIGH';
          return 'NORMAL';
        }
      }
    }
    
    if (range.startsWith('<')) {
      const max = parseFloat(range.substring(1));
      if (!isNaN(max)) {
        if (numValue > max) return 'HIGH';
        return 'NORMAL';
      }
    }

    if (range.startsWith('>')) {
      const min = parseFloat(range.substring(1));
      if (!isNaN(min)) {
        if (numValue < min) return 'LOW';
        return 'NORMAL';
      }
    }

    return null;
  };

  const getDynamicMaxLen = (range) => {
    if (!range || range === '-') return 20; // Text-based qualitative tests
    
    // Extract all numbers (including decimals) from the range string
    const numbers = range.match(/\d+(\.\d+)?/g);
    if (!numbers) return 7; // Fallback

    let maxDigits = 0;
    numbers.forEach(numStr => {
      if (numStr.length > maxDigits) {
        maxDigits = numStr.length;
      }
    });

    // Add exactly 2 characters of buffer to the longest number in the range.
    // E.g. If range is "0-12" (max length 2), allow 4 digits so they can type "15.5".
    // If range is "4000-10000" (max length 5), allow 7 digits.
    return maxDigits + 2;
  };

  const addDrugRow = () => {
    if (isLocked) return;
    setFormData(prev => ({
      ...prev,
      drugsPrescribed: [...prev.drugsPrescribed, { sNo: String(prev.drugsPrescribed.length + 1), tradeName: '', genericName: '', roa: '', dose: '', frq: '', startDate: '', stopDate: '', duration: '' }]
    }));
  };

  const removeDrugRow = (index) => {
    if (isLocked || formData.drugsPrescribed.length <= 1) return;
    const newDrugs = [...formData.drugsPrescribed];
    newDrugs.splice(index, 1);
    newDrugs.forEach((d, i) => d.sNo = String(i + 1));
    setFormData(prev => ({ ...prev, drugsPrescribed: newDrugs }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLocked) return;
    submitCase({ ...formData, docType: 'Patient Profile' });
    navigate('/student/cases/submitted');
  };

  const handleSaveDraft = () => {
    if (isLocked) return;
    saveDraftCase({ ...formData, docType: 'Patient Profile' });
    alert("Draft saved successfully!");
  };

  const currentSectionInfo = SECTIONS.find(s => s.id === activeSection) || SECTIONS[0];
  const activeSectionTitle = currentSectionInfo.title;
  const activeSectionIcon = <FileText size={18} />;

  return (
    <Layout>
      <div className="preceptor-page">
        <div className="patient-profile-workspace animate-fade-in">
        
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

        <div className="workspace-content">
          <div className="workspace-content-header">
            <h1 className="workspace-content-title">
              {SECTIONS.find(s => s.id === activeSection)?.title}
            </h1>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              {activeSection > 1 && (
                <button 
                  className="btn-secondary" 
                  style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                  onClick={() => setActiveSection(activeSection - 1)}
                >
                  <ChevronLeft size={16} /> Previous
                </button>
              )}
              {activeSection !== 15 && (
                <button 
                  className="btn-submit" 
                  style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                  onClick={() => setActiveSection(activeSection + 1)}
                >
                  Next Section <ChevronRight size={16} />
                </button>
              )}
            </div>
          </div>
          <div ref={contentBodyRef} className="workspace-content-body custom-scrollbar">
            <div className="breadcrumbs" style={{ marginTop: '0.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              <Link to={dashboardPath} className="breadcrumb-link" style={{ textDecoration: 'none', color: 'var(--color-primary)' }}>Dashboard</Link>
              <span className="breadcrumb-separator">&gt;</span>
              <Link to={backPath} className="breadcrumb-link" style={{ textDecoration: 'none', color: 'var(--color-primary)' }}>{backText}</Link>
              <span className="breadcrumb-separator">&gt;</span>
              <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>Patient Profile</span>
            </div>

            {isReturned && (
              <div style={{ backgroundColor: '#fff0f0', borderLeft: '4px solid #ef4444', padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem' }}>
                <h3 style={{ color: '#dc2626', margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <AlertTriangle size={18} /> Returned by Preceptor
                </h3>
                <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                  <strong>Remarks:</strong> "{existingCase.remarks || existingCase.returnComments || 'Please revise and resubmit.'}"
                </p>
              </div>
            )}
            
            {activeSection === 1 && (
              <div className="form-section">
                <div className="form-row">
                  <div className="form-group" style={{ flex: 2.5, minWidth: '200px' }}>
                    <label className="form-label">Patient Name <span style={{color: 'red'}}>*</span></label>
                    <input type="text" className="form-input" name="patientName" value={formData.patientName} onChange={handleInputChange} onBlur={handleBlur} placeholder="Enter name" />
                  </div>
                  <div className="form-group" style={{ flex: 0.8, minWidth: '80px' }}>
                    <label className="form-label">Age <span style={{color: 'red'}}>*</span></label>
                    <input type="number" className="form-input" name="age" value={formData.age} onChange={handleInputChange} placeholder="Age" />
                  </div>
                  <div className="form-group" style={{ flex: 1.2, minWidth: '100px' }}>
                    <label className="form-label">Sex <span style={{color: 'red'}}>*</span></label>
                    <select className="form-select" name="gender" value={formData.gender} onChange={handleInputChange}>
                      <option value="">Select</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="form-group" style={{ flex: 1.5, minWidth: '150px' }}>
                    <label className="form-label">I.P No <span style={{color: 'red'}}>*</span></label>
                    <input type="text" className="form-input" style={{ borderColor: errors.ipNumber ? 'red' : undefined }} name="ipNumber" value={formData.ipNumber} onChange={handleInputChange} placeholder="Exactly 10 digits" maxLength={10} />
                    {errors.ipNumber && <span style={{ color: 'red', fontSize: '0.75rem', marginTop: '0.25rem' }}>{errors.ipNumber}</span>}
                  </div>
                  <div className="form-group" style={{ flex: 1.5, minWidth: '150px' }}>
                    <label className="form-label">MR Number</label>
                    <input type="text" className="form-input" name="mrNumber" value={formData.mrNumber} onChange={handleInputChange} onBlur={handleBlur} placeholder="MR Number" />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group" style={{ flex: 1, minWidth: '120px' }}>
                    <label className="form-label">Height (cm)</label>
                    <input type="number" className="form-input" name="height" value={formData.height} onChange={handleInputChange} placeholder="e.g. 170" />
                  </div>
                  <div className="form-group" style={{ flex: 1, minWidth: '120px' }}>
                    <label className="form-label">Weight (kg)</label>
                    <input type="number" className="form-input" name="weight" value={formData.weight} onChange={handleInputChange} placeholder="e.g. 65" />
                  </div>
                  <div className="form-group" style={{ flex: 1, minWidth: '120px' }}>
                    <label className="form-label">BMI</label>
                    <input type="text" className="form-input" name="bmi" value={formData.bmi} readOnly placeholder="Auto" style={{backgroundColor: 'var(--bg-main)'}} />
                  </div>
                  <div className="form-group" style={{ flex: 1, minWidth: '120px' }}>
                    <label className="form-label">Department</label>
                    <input type="text" className="form-input" name="department" value={formData.department} onChange={handleInputChange} onBlur={handleBlur} placeholder="e.g. General Medicine" />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group" style={{ flex: 1, minWidth: '200px' }}>
                    <label className="form-label">Date of Admission (DOA) <span style={{color: 'red'}}>*</span></label>
                    <input type="date" className="form-input" style={{ borderColor: errors.doa ? 'red' : undefined }} name="doa" value={formData.doa} onChange={handleInputChange} max={formData.dod || formData.doc || undefined} />
                    {errors.doa && <span style={{ color: 'red', fontSize: '0.75rem', marginTop: '0.25rem' }}>{errors.doa}</span>}
                  </div>
                  <div className="form-group" style={{ flex: 1, minWidth: '200px' }}>
                    <label className="form-label">Date of Discharge (DOD) <span style={{color: 'red'}}>*</span></label>
                    <input type="date" className="form-input" style={{ borderColor: errors.dod ? 'red' : undefined }} name="dod" value={formData.dod} onChange={handleInputChange} min={formData.doa || undefined} max={formData.doc || undefined} />
                    {errors.dod && <span style={{ color: 'red', fontSize: '0.75rem', marginTop: '0.25rem' }}>{errors.dod}</span>}
                  </div>
                  <div className="form-group" style={{ flex: 1, minWidth: '200px' }}>
                    <label className="form-label">Date of Case Collection (DOC) <span style={{color: 'red'}}>*</span></label>
                    <input type="date" className="form-input" style={{ borderColor: errors.doc ? 'red' : undefined }} name="doc" value={formData.doc} onChange={handleInputChange} min={formData.dod || formData.doa || undefined} />
                    {errors.doc && <span style={{ color: 'red', fontSize: '0.75rem', marginTop: '0.25rem' }}>{errors.doc}</span>}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group" style={{ flex: 1 }}>
                    <label className="form-label">Treating Physician</label>
                    <input type="text" className="form-input" name="physician" value={formData.physician} onChange={handleInputChange} onBlur={handleBlur} placeholder="Dr. Name" />
                  </div>
                </div>
              </div>
            )}

            {/* SECTIONS 2-5: Text Areas */}
            {activeSection === 2 && (
              <div className="form-section">
                <div className="form-group">
                  <label className="form-label">Chief Complaints <span className="form-label optional">(Optional)</span></label>
                  <textarea className="form-textarea large-textarea" name="chiefComplaints" value={formData.chiefComplaints} onChange={handleInputChange} onBlur={handleBlur} placeholder="e.g. Fever for 3 days"></textarea>
                </div>
              </div>
            )}
            
            {activeSection === 3 && (
              <div className="form-section">
                <div className="form-group">
                  <label className="form-label">Past Medical History <span className="form-label optional">(Optional)</span></label>
                  <textarea className="form-textarea large-textarea" name="pastMedicalHistory" value={formData.pastMedicalHistory} onChange={handleInputChange} onBlur={handleBlur} placeholder="e.g. Hypertension since 5 years"></textarea>
                </div>
              </div>
            )}

            {activeSection === 4 && (
              <div className="form-section">
                <div className="form-group">
                  <label className="form-label">Past Medication History <span className="form-label optional">(Optional)</span></label>
                  <textarea className="form-textarea large-textarea" name="pastMedicationHistory" value={formData.pastMedicationHistory} onChange={handleInputChange} onBlur={handleBlur} placeholder="e.g. Tab. Amlodipine 5mg OD"></textarea>
                </div>
              </div>
            )}

            {activeSection === 5 && (
              <div className="form-section">
                <div className="form-group">
                  <label className="form-label">Family Medical History <span className="form-label optional">(Optional)</span></label>
                  <textarea className="form-textarea large-textarea" name="familyMedicalHistory" value={formData.familyMedicalHistory} onChange={handleInputChange} onBlur={handleBlur} placeholder="e.g. Father had Type 2 DM"></textarea>
                </div>
              </div>
            )}

            {/* SECTION 6: Social History */}
            {activeSection === 6 && (
              <div className="form-section">
                <p style={{color: 'var(--text-secondary)', marginBottom: '1rem'}}>Complete only if applicable.</p>
                <div className="form-row">
                  <div className="form-group" style={{ flex: 1, minWidth: '300px', backgroundColor: 'var(--bg-main)', padding: '1.5rem', borderRadius: '8px' }}>
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
                  <div className="form-group" style={{ flex: 1, minWidth: '300px', backgroundColor: 'var(--bg-main)', padding: '1.5rem', borderRadius: '8px' }}>
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
                  <textarea className="form-textarea" name="foodAllergy" value={formData.foodAllergy} onChange={handleInputChange} onBlur={handleBlur} placeholder="e.g. Peanut allergy"></textarea>
                </div>
                <div className="form-group">
                  <label className="form-label">Drug Allergy <span className="form-label optional">(Optional)</span></label>
                  <textarea className="form-textarea" name="drugAllergy" value={formData.drugAllergy} onChange={handleInputChange} onBlur={handleBlur} placeholder="e.g. Penicillin (Rash)"></textarea>
                </div>
              </div>
            )}

            {/* SECTION 8: Physical Examination */}
            {activeSection === 8 && (
              <div className="form-section">
                <p style={{color: 'var(--text-secondary)', marginBottom: '1rem'}}>Complete only if applicable.</p>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Cyanosis</label>
                    <input type="text" className="form-input" placeholder="e.g. Absent" name="cyanosis" value={formData.cyanosis} onChange={handleInputChange} onBlur={handleBlur} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Icterus</label>
                    <input type="text" className="form-input" placeholder="e.g. Absent" name="icterus" value={formData.icterus} onChange={handleInputChange} onBlur={handleBlur} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Pallor</label>
                    <input type="text" className="form-input" placeholder="e.g. Mild / Absent" name="pallor" value={formData.pallor} onChange={handleInputChange} onBlur={handleBlur} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">CVS</label>
                    <input type="text" className="form-input" placeholder="e.g. S1, S2 heard, no murmurs" name="cvs" value={formData.cvs} onChange={handleInputChange} onBlur={handleBlur} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">GI</label>
                    <input type="text" className="form-input" placeholder="e.g. Soft, non-tender" name="gi" value={formData.gi} onChange={handleInputChange} onBlur={handleBlur} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">RS</label>
                    <input type="text" className="form-input" placeholder="e.g. Bilateral air entry clear" name="rs" value={formData.rs} onChange={handleInputChange} onBlur={handleBlur} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">CNS</label>
                    <input type="text" className="form-input" placeholder="e.g. Conscious, oriented" name="cns" value={formData.cns} onChange={handleInputChange} onBlur={handleBlur} />
                  </div>
                </div>
              </div>
            )}

            {/* SECTION 9: Vital Signs */}
            {activeSection === 9 && (
              <div className="form-section">
                <p style={{color: 'var(--text-secondary)', marginBottom: '1rem'}}>Add unlimited observation rows.</p>
                <div className="dynamic-table-container">
                  <table className="dynamic-table" style={{ width: '100%' }}>
                    <thead>
                      <tr>
                        <th style={{width: '24%'}}>Date</th>
                        <th style={{width: '14%'}}>TEMP [°F]</th>
                        <th style={{width: '16%'}}>BP [mmHg]</th>
                        <th style={{width: '13%'}}>PR [bpm]</th>
                        <th style={{width: '12%'}}>RR [cpm]</th>
                        <th style={{width: '13%'}}>SPO₂ [%]</th>
                        <th style={{width: '8%'}}></th>
                      </tr>
                    </thead>
                    <tbody>
                      {formData.vitalSigns.map((row, index) => (
                        <tr key={index}>
                          <td><input type="date" className="table-input" value={row.date} onChange={(e) => handleVitalChange(index, 'date', e.target.value)} /></td>
                          <td><input type="text" className="table-input" placeholder="e.g. 98.6" maxLength={6} value={row.temp} onChange={(e) => handleVitalChange(index, 'temp', e.target.value.replace(/[^\d.]/g, ''))} /></td>
                          <td><input type="text" className="table-input" placeholder="e.g. 120/80" maxLength={7} value={row.bp} onChange={(e) => handleVitalChange(index, 'bp', e.target.value.replace(/[^\d/]/g, ''))} /></td>
                          <td><input type="text" className="table-input" placeholder="e.g. 72" maxLength={3} value={row.pr} onChange={(e) => handleVitalChange(index, 'pr', e.target.value.replace(/\D/g, ''))} /></td>
                          <td><input type="text" className="table-input" placeholder="e.g. 16" maxLength={2} value={row.rr} onChange={(e) => handleVitalChange(index, 'rr', e.target.value.replace(/\D/g, ''))} /></td>
                          <td><input type="text" className="table-input" placeholder="e.g. 100" maxLength={3} value={row.spo2} onChange={(e) => handleVitalChange(index, 'spo2', e.target.value.replace(/\D/g, ''))} /></td>
                          <td style={{textAlign: 'center'}}>
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

                      {LAB_CATEGORIES.find(c => c.id === activeLabCategory)?.parameters.map(param => {
                        const val = formData.laboratory[activeLabCategory]?.[param.name] || '';
                        const status = getLabStatus(val, param.range);
                        let color = 'var(--text-primary)';
                        let borderColor = 'var(--border-color)';
                        let bg = 'var(--bg-surface)';
                        let icon = null;
                        
                        // Calculate strictly individual max length based on the parameter's own range
                        const maxLen = getDynamicMaxLen(param.range);
                        
                        if (status === 'HIGH') {
                          color = '#ef4444'; // Red
                          borderColor = '#ef4444';
                          bg = '#fef2f2';
                          icon = <ArrowUp size={16} color="#ef4444" />;
                        } else if (status === 'LOW') {
                          color = '#3b82f6'; // Blue
                          borderColor = '#3b82f6';
                          bg = '#eff6ff';
                          icon = <ArrowDown size={16} color="#3b82f6" />;
                        } else if (status === 'NORMAL') {
                          color = '#22c55e'; // Green
                          borderColor = '#22c55e';
                          bg = '#f0fdf4';
                          icon = <Check size={16} color="#22c55e" />;
                        }

                        return (
                          <div className="lab-parameter-grid" key={param.name}>
                            <div className="lab-parameter-name">{param.name}</div>
                            <div className="lab-parameter-range">{param.range}</div>
                            <div className="lab-parameter-unit">{param.unit}</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                              <input 
                                type="text" 
                                className="table-input" 
                                style={{ width: '120px', color: color, borderColor: borderColor, backgroundColor: bg, fontWeight: status ? '600' : 'normal' }}
                                placeholder="Enter value"
                                maxLength={maxLen}
                                value={val}
                                onChange={(e) => handleLabChange(activeLabCategory, param.name, e.target.value)}
                              />
                              {icon}
                            </div>
                          </div>
                        );
                      })}
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
                  <textarea className="form-textarea large-textarea" name="otherInvestigations" value={formData.otherInvestigations} onChange={handleInputChange} onBlur={handleBlur} placeholder="e.g. X-Ray Chest: Normal"></textarea>
                </div>
              </div>
            )}

            {activeSection === 12 && (
              <div className="form-section">
                <div className="form-group">
                  <label className="form-label">Final Diagnosis <span className="form-label optional">(Optional)</span></label>
                  <textarea className="form-textarea large-textarea" name="finalDiagnosis" value={formData.finalDiagnosis} onChange={handleInputChange} onBlur={handleBlur} placeholder="e.g. Community Acquired Pneumonia"></textarea>
                </div>
              </div>
            )}

            {/* SECTION 13: Drugs Prescribed */}
            {activeSection === 13 && (
              <div className="form-section">
                <p style={{color: 'var(--text-secondary)', marginBottom: '1rem'}}>Add unlimited medicine rows.</p>
                <div className="dynamic-table-container">
                  <table className="dynamic-table drugs-table" style={{ width: '100%' }}>
                    <thead>
                      <tr>
                        <th style={{width: '4%'}}>S.no</th>
                        <th style={{width: '22%'}}>Trade Name</th>
                        <th style={{width: '22%'}}>Generic Name</th>
                        <th style={{width: '8%'}}>R.O.A</th>
                        <th style={{width: '8%'}}>Dose</th>
                        <th style={{width: '8%'}}>FRQ</th>
                        <th style={{width: '10%'}}>Start Date</th>
                        <th style={{width: '10%'}}>Stop Date</th>
                        <th style={{width: '5%'}}>Duration</th>
                        <th style={{width: '3%'}}></th>
                      </tr>
                    </thead>
                    <tbody>
                      {formData.drugsPrescribed.map((row, index) => (
                        <tr key={index}>
                          <td style={{ verticalAlign: 'middle', fontWeight: 600, color: 'var(--text-secondary)' }}>{row.sNo}</td>
                          <td><input type="text" className="table-input" value={row.tradeName} onChange={(e) => handleDrugChange(index, 'tradeName', e.target.value)} /></td>
                          <td><input type="text" className="table-input" value={row.genericName} onChange={(e) => handleDrugChange(index, 'genericName', e.target.value)} /></td>
                          <td>
                            <select className="table-input" style={{ padding: '0.5rem' }} value={row.roa} onChange={(e) => handleDrugChange(index, 'roa', e.target.value)}>
                              <option value="">Select</option>
                              <option value="Oral">Oral</option>
                              <option value="IV">IV</option>
                              <option value="IM">IM</option>
                              <option value="SC">SC</option>
                              <option value="Topical">Topical</option>
                              <option value="Sublingual">Sublingual</option>
                              <option value="Inhalation">Inhalation</option>
                              <option value="Other">Other</option>
                            </select>
                          </td>
                          <td><input type="text" className="table-input" value={row.dose} onChange={(e) => handleDrugChange(index, 'dose', e.target.value)} /></td>
                          <td><input type="text" className="table-input" value={row.frq} onChange={(e) => handleDrugChange(index, 'frq', e.target.value)} /></td>
                          <td><input type="date" className="table-input" value={row.startDate} onChange={(e) => handleDrugChange(index, 'startDate', e.target.value)} /></td>
                          <td><input type="date" className="table-input" value={row.stopDate} min={row.startDate} onChange={(e) => handleDrugChange(index, 'stopDate', e.target.value)} /></td>
                          <td><input type="text" className="table-input" value={row.duration} readOnly placeholder="Auto" style={{backgroundColor: 'var(--bg-main)'}} /></td>
                          <td style={{ verticalAlign: 'middle' }}>
                            <button className="btn-remove-row" onClick={() => removeDrugRow(index)}><Trash2 size={16} /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
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
                  
                  <div style={{ marginBottom: '2rem' }}>
                    <h4 style={{ fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Patient Information</h4>
                    <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid var(--border-color)' }}>
                      <thead>
                        <tr style={{ backgroundColor: 'var(--bg-surface)' }}>
                          <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid var(--border-color)', width: '30%', color: 'var(--text-secondary)' }}>Field</th>
                          <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>Entered Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr><td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>Patient Name</td><td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>{formData.patientName || '-'}</td></tr>
                        <tr><td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>Age</td><td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>{formData.age ? formData.age + ' Years' : '-'}</td></tr>
                        <tr><td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>Gender</td><td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>{formData.gender || '-'}</td></tr>
                        <tr><td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>Diagnosis</td><td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>{formData.finalDiagnosis || '-'}</td></tr>
                        <tr><td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>I.P No</td><td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>{formData.ipNumber || '-'}</td></tr>
                        <tr><td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>Date of Admission</td><td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>{formData.doa || '-'}</td></tr>
                        <tr><td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>Height</td><td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>{formData.height ? formData.height + ' cm' : '-'}</td></tr>
                        <tr><td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>Weight</td><td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>{formData.weight ? formData.weight + ' kg' : '-'}</td></tr>
                        <tr><td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>BMI</td><td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>{formData.bmi || '-'}</td></tr>
                      </tbody>
                    </table>
                  </div>

                  <div style={{ marginBottom: '2rem' }}>
                    <h4 style={{ fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Clinical Data</h4>
                    <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid var(--border-color)' }}>
                      <thead>
                        <tr style={{ backgroundColor: 'var(--bg-surface)' }}>
                          <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid var(--border-color)', width: '30%', color: 'var(--text-secondary)' }}>Field</th>
                          <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>Entered Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr><td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>Chief Complaints</td><td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>{formData.chiefComplaints || '-'}</td></tr>
                        <tr><td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>Past Medical History</td><td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>{formData.pastMedicalHistory || '-'}</td></tr>
                        <tr><td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>Past Medication History</td><td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>{formData.pastMedicationHistory || '-'}</td></tr>
                        <tr><td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>Family History</td><td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>{formData.familyMedicalHistory || '-'}</td></tr>
                      </tbody>
                    </table>
                  </div>
                  
                  <div style={{ marginBottom: '2rem' }}>
                    <h4 style={{ fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Physical Examination</h4>
                    <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid var(--border-color)' }}>
                      <thead>
                        <tr style={{ backgroundColor: 'var(--bg-surface)' }}>
                          <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid var(--border-color)', width: '30%', color: 'var(--text-secondary)' }}>Field</th>
                          <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr><td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>Cyanosis</td><td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>{formData.cyanosis || '-'}</td></tr>
                        <tr><td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>Icterus</td><td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>{formData.icterus || '-'}</td></tr>
                        <tr><td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>Pallor</td><td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>{formData.pallor || '-'}</td></tr>
                        <tr><td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>CVS</td><td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>{formData.cvs || '-'}</td></tr>
                        <tr><td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>GI</td><td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>{formData.gi || '-'}</td></tr>
                        <tr><td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>RS</td><td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>{formData.rs || '-'}</td></tr>
                        <tr><td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>CNS</td><td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>{formData.cns || '-'}</td></tr>
                      </tbody>
                    </table>
                  </div>

                </div>

                <div className="workspace-actions">
                  <button className="btn-draft" onClick={handleSaveDraft} style={{ padding: '0.75rem 1.5rem', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Save size={18} /> Save Draft
                  </button>
                  {isReturned ? (
                    <button className="btn-submit" onClick={handleSubmit} style={{ padding: '0.75rem 1.5rem', borderRadius: '8px', border: 'none', backgroundColor: '#0b57d0', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '600' }}>
                      <Send size={18} /> Resubmit to Preceptor
                    </button>
                  ) : (
                    <button className="btn-submit" onClick={handleSubmit} style={{ padding: '0.75rem 1.5rem', borderRadius: '8px', border: 'none', backgroundColor: '#0b57d0', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '600' }}>
                      <Send size={18} /> Submit for Approval
                    </button>
                  )}
                  <button className="btn-cancel" onClick={() => navigate('/student/library')} style={{ padding: '0.75rem 1.5rem', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: 'transparent', cursor: 'pointer', marginLeft: 'auto' }}>
                    Cancel
                  </button>
                </div>
              </div>
            )}

          </div>


        </div>
      </div>
      </div>
    </Layout>
  );
};

export default PatientProfileForm;
