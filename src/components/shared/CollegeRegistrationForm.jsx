import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDatabase } from '../../context/DatabaseContext';
import { 
  Building2, MapPin, Phone, User, Shield, 
  CreditCard, CheckCircle, UploadCloud, FileText
} from 'lucide-react';
import './CollegeRegistrationForm.css';
import SuccessScreen from '../ui/form-steps/SuccessScreen';

const CollegeRegistrationForm = ({ mode }) => {
  const navigate = useNavigate();
  const { submitRegistrationRequest, registerCollegeDirect } = useDatabase();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
    // Step 1
    collegeName: '', shortName: '', collegeCode: '', collegeType: 'Private',
    pciApproval: '', affiliation: '', website: '', establishedYear: '',
    // Step 2
    address1: '', address2: '', city: '', district: '', state: '', country: 'India', pinCode: '',
    // Step 3
    officialEmail: '', officialMobile: '', officePhone: '',
    // Step 4
    principalName: '', qualification: '', principalEmail: '', principalMobile: '',
    // Step 5 (Admin or Rep)
    employeeId: '', adminName: '', designation: '', department: '', adminEmail: '', adminMobile: '', adminUsername: '',
    // Step 6 (Admin: Subscription, Public: Docs)
    plan: 'Professional', subStart: '', subEnd: '', maxStudents: '500', maxPreceptors: '20',
    aiEnabled: true, reportsEnabled: true, libraryEnabled: true,
    filePci: null, fileAffiliation: null, fileAuthLetter: null, declarationChecked: false
  });
  
  const [errors, setErrors] = useState({});

  const STEPS = [
    { id: 1, label: 'College Info', icon: Building2 },
    { id: 2, label: 'Address', icon: MapPin },
    { id: 3, label: 'Contact', icon: Phone },
    { id: 4, label: 'Principal', icon: User },
    { id: 5, label: mode === 'admin' ? 'Administrator' : 'Representative', icon: Shield },
    { id: 6, label: mode === 'admin' ? 'Subscription' : 'Documents', icon: mode === 'admin' ? CreditCard : FileText },
    { id: 7, label: 'Review', icon: CheckCircle }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateStep = (step) => {
    let newErrors = {};
    let isValid = true;

    if (step === 1) {
      if (!formData.collegeName) newErrors.collegeName = 'College Name is required';
      if (!formData.collegeCode) newErrors.collegeCode = 'College Code is required';
      if (!formData.pciApproval) newErrors.pciApproval = 'PCI Approval Number is required';
    } else if (step === 2) {
      if (!formData.address1) newErrors.address1 = 'Address Line 1 is required';
      if (!formData.city) newErrors.city = 'City is required';
      if (!formData.state) newErrors.state = 'State is required';
      if (!formData.pinCode) newErrors.pinCode = 'PIN Code is required';
    } else if (step === 3) {
      if (!formData.officialEmail) newErrors.officialEmail = 'Official Email is required';
      if (!formData.officialMobile) newErrors.officialMobile = 'Official Mobile is required';
    } else if (step === 4) {
      if (!formData.principalName) newErrors.principalName = 'Principal Name is required';
    } else if (step === 5) {
      if (!formData.adminName) newErrors.adminName = 'Name is required';
      if (!formData.adminEmail) newErrors.adminEmail = 'Email is required';
    } else if (step === 6) {
      if (mode === 'public' && !formData.declarationChecked) {
        newErrors.declarationChecked = 'You must certify the information is true';
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      isValid = false;
    }
    return isValid;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 7));
      window.scrollTo(0, 0);
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    window.scrollTo(0, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep(7)) {
      if (mode === 'admin') {
        const newCollege = registerCollegeDirect({
          name: formData.collegeName,
          slug: formData.shortName ? formData.shortName.toLowerCase() : '',
          email: formData.officialEmail,
          phone: formData.officialMobile,
          address: `${formData.address1 || ''}, ${formData.city || ''}, ${formData.state || ''}`,
          adminName: formData.adminName || formData.principalName,
          adminEmail: formData.adminEmail || formData.officialEmail,
          adminPhone: formData.adminMobile || formData.officialMobile,
          adminUsername: formData.adminUsername,
          plan: formData.plan
        });
        alert('College registered via Method B. Proceeding to Subscription Assignment.');
        navigate(`/super-admin/subscriptions/assign?collegeId=${newCollege.id}`);
      } else {
        submitRegistrationRequest({
          collegeName: formData.collegeName,
          contactPerson: formData.adminName || formData.principalName || 'College Representative',
          email: formData.officialEmail || formData.adminEmail,
          phone: formData.officialMobile || formData.adminMobile,
          city: formData.city,
          state: formData.state,
          country: formData.country,
          estimatedStudents: parseInt(formData.maxStudents) || 500,
          requestedPlan: formData.plan || 'Professional',
          notes: `Public website registration for ${formData.collegeName}`
        });
        setIsSubmitted(true);
      }
    }
  };

  if (isSubmitted && mode === 'public') {
    return <SuccessScreen onClose={() => navigate('/')} onRegisterAnother={() => window.location.reload()} />;
  }

  const renderStep1 = () => (
    <div className="form-section">
      <h2 className="section-title">College Information</h2>
      <div className="form-group" style={{ marginBottom: '24px' }}>
        <label className="form-label">College Logo</label>
        <div className="file-upload-zone">
          <UploadCloud className="upload-icon" size={32} />
          <div className="upload-text">Click or drag image to upload</div>
          <div className="upload-hint">SVG, PNG, JPG or GIF (max. 2MB)</div>
        </div>
      </div>
      <div className="form-grid">
        <div className="form-group">
          <label className="form-label required">College Name</label>
          <input type="text" className={`form-input ${errors.collegeName ? 'error' : ''}`} name="collegeName" value={formData.collegeName} onChange={handleInputChange} />
          {errors.collegeName && <span className="error-message">{errors.collegeName}</span>}
        </div>
        <div className="form-group">
          <label className="form-label">Short Name</label>
          <input type="text" className="form-input" name="shortName" value={formData.shortName} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label className="form-label required">{mode === 'public' ? 'Requested College Code' : 'College Code'}</label>
          <input type="text" className={`form-input ${errors.collegeCode ? 'error' : ''}`} name="collegeCode" value={formData.collegeCode} onChange={handleInputChange} />
          {errors.collegeCode && <span className="error-message">{errors.collegeCode}</span>}
        </div>
        <div className="form-group">
          <label className="form-label">College Type</label>
          <select className="form-select" name="collegeType" value={formData.collegeType} onChange={handleInputChange}>
            <option value="Government">Government</option>
            <option value="Private">Private</option>
            <option value="Autonomous">Autonomous</option>
            <option value="University Constituent">University Constituent</option>
            <option value="Deemed University">Deemed University</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label required">PCI Approval Number</label>
          <input type="text" className={`form-input ${errors.pciApproval ? 'error' : ''}`} name="pciApproval" value={formData.pciApproval} onChange={handleInputChange} />
          {errors.pciApproval && <span className="error-message">{errors.pciApproval}</span>}
        </div>
        <div className="form-group">
          <label className="form-label">University Affiliation</label>
          <input type="text" className="form-input" name="affiliation" value={formData.affiliation} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label className="form-label">Website</label>
          <input type="url" className="form-input" name="website" value={formData.website} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label className="form-label">Established Year</label>
          <input type="number" className="form-input" name="establishedYear" value={formData.establishedYear} onChange={handleInputChange} />
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="form-section">
      <h2 className="section-title">Address Information</h2>
      <div className="form-grid">
        <div className="form-group" style={{ gridColumn: 'span 2' }}>
          <label className="form-label required">Address Line 1</label>
          <input type="text" className={`form-input ${errors.address1 ? 'error' : ''}`} name="address1" value={formData.address1} onChange={handleInputChange} />
          {errors.address1 && <span className="error-message">{errors.address1}</span>}
        </div>
        <div className="form-group" style={{ gridColumn: 'span 2' }}>
          <label className="form-label">Address Line 2</label>
          <input type="text" className="form-input" name="address2" value={formData.address2} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label className="form-label required">City</label>
          <input type="text" className={`form-input ${errors.city ? 'error' : ''}`} name="city" value={formData.city} onChange={handleInputChange} />
          {errors.city && <span className="error-message">{errors.city}</span>}
        </div>
        <div className="form-group">
          <label className="form-label">District</label>
          <input type="text" className="form-input" name="district" value={formData.district} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label className="form-label required">State</label>
          <input type="text" className={`form-input ${errors.state ? 'error' : ''}`} name="state" value={formData.state} onChange={handleInputChange} />
          {errors.state && <span className="error-message">{errors.state}</span>}
        </div>
        <div className="form-group">
          <label className="form-label required">PIN Code</label>
          <input type="text" className={`form-input ${errors.pinCode ? 'error' : ''}`} name="pinCode" value={formData.pinCode} onChange={handleInputChange} />
          {errors.pinCode && <span className="error-message">{errors.pinCode}</span>}
        </div>
        <div className="form-group">
          <label className="form-label">Country</label>
          <input type="text" className="form-input" name="country" value={formData.country} onChange={handleInputChange} />
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="form-section">
      <h2 className="section-title">Contact Details</h2>
      <div className="form-grid">
        <div className="form-group">
          <label className="form-label required">Official Email</label>
          <input type="email" className={`form-input ${errors.officialEmail ? 'error' : ''}`} name="officialEmail" value={formData.officialEmail} onChange={handleInputChange} />
          {errors.officialEmail && <span className="error-message">{errors.officialEmail}</span>}
        </div>
        <div className="form-group">
          <label className="form-label required">Official Mobile</label>
          <input type="tel" className={`form-input ${errors.officialMobile ? 'error' : ''}`} name="officialMobile" value={formData.officialMobile} onChange={handleInputChange} />
          {errors.officialMobile && <span className="error-message">{errors.officialMobile}</span>}
        </div>
        <div className="form-group">
          <label className="form-label">Office Phone</label>
          <input type="tel" className="form-input" name="officePhone" value={formData.officePhone} onChange={handleInputChange} />
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="form-section">
      <h2 className="section-title">Principal Information</h2>
      <div className="form-grid">
        <div className="form-group">
          <label className="form-label required">Principal Name</label>
          <input type="text" className={`form-input ${errors.principalName ? 'error' : ''}`} name="principalName" value={formData.principalName} onChange={handleInputChange} />
          {errors.principalName && <span className="error-message">{errors.principalName}</span>}
        </div>
        <div className="form-group">
          <label className="form-label">Qualification</label>
          <input type="text" className="form-input" name="qualification" value={formData.qualification} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label className="form-label">Email</label>
          <input type="email" className="form-input" name="principalEmail" value={formData.principalEmail} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label className="form-label">Mobile</label>
          <input type="tel" className="form-input" name="principalMobile" value={formData.principalMobile} onChange={handleInputChange} />
        </div>
      </div>
    </div>
  );

  const renderStep5 = () => (
    <div className="form-section">
      <h2 className="section-title">{mode === 'admin' ? 'Primary College Administrator' : 'Representative Details'}</h2>
      {mode === 'admin' && (
        <div className="alert-box info mb-4" style={{ backgroundColor: 'rgba(79, 70, 229, 0.1)', padding: '12px', borderRadius: '8px', border: '1px solid var(--primary-color)', color: 'var(--primary-color)', fontSize: '0.875rem' }}>
          This will create the first administrator account for this college.
        </div>
      )}
      <div className="form-grid">
        <div className="form-group">
          <label className="form-label required">Full Name</label>
          <input type="text" className={`form-input ${errors.adminName ? 'error' : ''}`} name="adminName" value={formData.adminName} onChange={handleInputChange} />
          {errors.adminName && <span className="error-message">{errors.adminName}</span>}
        </div>
        <div className="form-group">
          <label className="form-label">Designation</label>
          <input type="text" className="form-input" name="designation" value={formData.designation} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label className="form-label">Department</label>
          <input type="text" className="form-input" name="department" value={formData.department} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label className="form-label required">Email</label>
          <input type="email" className={`form-input ${errors.adminEmail ? 'error' : ''}`} name="adminEmail" value={formData.adminEmail} onChange={handleInputChange} />
          {errors.adminEmail && <span className="error-message">{errors.adminEmail}</span>}
        </div>
        <div className="form-group">
          <label className="form-label">Mobile</label>
          <input type="tel" className="form-input" name="adminMobile" value={formData.adminMobile} onChange={handleInputChange} />
        </div>
        
        {mode === 'admin' && (
          <>
            <div className="form-group">
              <label className="form-label">Username</label>
              <input type="text" className="form-input" name="adminUsername" value={formData.adminUsername} onChange={handleInputChange} placeholder="Auto-generated if blank" />
            </div>
            <div className="form-group">
              <label className="form-label">Temporary Password</label>
              <input type="password" className="form-input" placeholder="••••••••" />
            </div>
          </>
        )}
      </div>
    </div>
  );

  const renderStep6 = () => {
    if (mode === 'admin') {
      return (
        <div className="form-section">
          <h2 className="section-title">Subscription & Limits</h2>
          <div className="subscription-cards">
            {['Trial', 'Basic', 'Professional', 'Enterprise'].map(plan => (
              <div 
                key={plan}
                className={`sub-card ${formData.plan === plan ? 'selected' : ''}`}
                onClick={() => setFormData({...formData, plan})}
              >
                <div className="sub-title">{plan}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Select Plan</div>
              </div>
            ))}
          </div>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label required">Subscription Start Date</label>
              <input type="date" className="form-input" name="subStart" value={formData.subStart} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label className="form-label required">Subscription End Date</label>
              <input type="date" className="form-input" name="subEnd" value={formData.subEnd} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Maximum Students</label>
              <input type="number" className="form-input" name="maxStudents" value={formData.maxStudents} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Maximum Preceptors</label>
              <input type="number" className="form-input" name="maxPreceptors" value={formData.maxPreceptors} onChange={handleInputChange} />
            </div>
          </div>
          <h3 style={{ fontSize: '1rem', marginTop: '32px', marginBottom: '16px' }}>Feature Toggles</h3>
          <div className="form-grid">
            <div className="toggle-group">
              <span className="toggle-label">Enable AI Assistant</span>
              <label className="toggle-switch">
                <input type="checkbox" name="aiEnabled" checked={formData.aiEnabled} onChange={handleInputChange} />
                <span className="toggle-slider"></span>
              </label>
            </div>
            <div className="toggle-group">
              <span className="toggle-label">Enable Reports</span>
              <label className="toggle-switch">
                <input type="checkbox" name="reportsEnabled" checked={formData.reportsEnabled} onChange={handleInputChange} />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="form-section">
          <h2 className="section-title">Declaration & Documents</h2>
          <div className="form-group" style={{ marginBottom: '24px' }}>
            <label className="form-label required">PCI Approval Certificate</label>
            <input type="file" className="form-input" />
          </div>
          <div className="form-group" style={{ marginBottom: '24px' }}>
            <label className="form-label required">University Affiliation Letter</label>
            <input type="file" className="form-input" />
          </div>
          <div className="confirmation-check" style={{ marginTop: '32px' }}>
            <input 
              type="checkbox" 
              id="declarationChecked" 
              name="declarationChecked" 
              checked={formData.declarationChecked}
              onChange={handleInputChange}
            />
            <label htmlFor="declarationChecked" className={errors.declarationChecked ? 'error-text' : ''}>
              I certify that all the information provided is correct and I am authorized to register this institution.
            </label>
          </div>
        </div>
      );
    }
  };

  const renderStep7 = () => (
    <div className="form-section review-section">
      <h2 className="section-title">Review & Submit</h2>
      
      <div className="summary-card">
        <h4>College Details <span className="edit-link" onClick={() => setCurrentStep(1)}>Edit</span></h4>
        <div className="summary-grid">
          <div className="summary-item"><span className="summary-label">Name</span><span className="summary-value">{formData.collegeName || '-'}</span></div>
          <div className="summary-item"><span className="summary-label">Code</span><span className="summary-value">{formData.collegeCode || '-'}</span></div>
          <div className="summary-item"><span className="summary-label">Type</span><span className="summary-value">{formData.collegeType}</span></div>
          <div className="summary-item"><span className="summary-label">PCI Approval</span><span className="summary-value">{formData.pciApproval || '-'}</span></div>
        </div>
      </div>

      <div className="summary-card">
        <h4>{mode === 'admin' ? 'Administrator' : 'Representative'} <span className="edit-link" onClick={() => setCurrentStep(5)}>Edit</span></h4>
        <div className="summary-grid">
          <div className="summary-item"><span className="summary-label">Name</span><span className="summary-value">{formData.adminName || '-'}</span></div>
          <div className="summary-item"><span className="summary-label">Email</span><span className="summary-value">{formData.adminEmail || '-'}</span></div>
        </div>
      </div>

      {mode === 'admin' && (
        <div className="summary-card">
          <h4>Subscription <span className="edit-link" onClick={() => setCurrentStep(6)}>Edit</span></h4>
          <div className="summary-grid">
            <div className="summary-item"><span className="summary-label">Plan</span><span className="summary-value">{formData.plan}</span></div>
            <div className="summary-item"><span className="summary-label">Capacity</span><span className="summary-value">{formData.maxStudents} Students / {formData.maxPreceptors} Preceptors</span></div>
          </div>
        </div>
      )}

      {mode === 'admin' && (
        <div className="confirmation-check">
          <input type="checkbox" id="confirmData" />
          <label htmlFor="confirmData">
            I confirm that all provided information is accurate and authorized. I understand that creating this college will generate a subscription record and an audit log event.
          </label>
        </div>
      )}
    </div>
  );

  return (
    <div className="add-college-container" style={mode === 'public' ? { padding: 0, boxShadow: 'none' } : {}}>
      
      {mode === 'admin' && (
        <div className="page-header">
          <div className="breadcrumb">
            <span className="breadcrumb-link" onClick={() => navigate('/super-admin/dashboard')}>Dashboard</span>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-link" onClick={() => navigate('/super-admin/colleges')}>College Management</span>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">Add College</span>
          </div>
          <h1 className="page-title">Add College</h1>
          <p className="page-subtitle">Register a new college to the PharmDVerse platform.</p>
        </div>
      )}

      <div className="stepper-container" style={{ gap: '8px' }}>
        {STEPS.map((step) => {
          const isActive = currentStep === step.id;
          const isCompleted = currentStep > step.id;
          return (
            <div key={step.id} className={`step-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}>
              <div className="step-indicator">
                {isCompleted ? <CheckCircle size={16} /> : step.id}
              </div>
              <div className="step-label" style={{ fontSize: '0.75rem' }}>{step.label}</div>
              <div className="step-line"></div>
            </div>
          );
        })}
      </div>

      <div className="form-content">
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}
        {currentStep === 4 && renderStep4()}
        {currentStep === 5 && renderStep5()}
        {currentStep === 6 && renderStep6()}
        {currentStep === 7 && renderStep7()}
      </div>

      <div className="sticky-footer" style={mode === 'public' ? { position: 'static', marginTop: '24px', borderTop: '1px solid var(--border-color)' } : {}}>
        <div className="footer-left">
          {mode === 'admin' ? (
             <button className="btn btn-secondary" onClick={() => navigate('/super-admin/colleges')}>Cancel</button>
          ) : (
             <button className="btn btn-secondary" onClick={() => navigate('/')}>Back Home</button>
          )}
        </div>
        <div className="footer-right">
          {currentStep > 1 && (
            <button className="btn btn-secondary" onClick={handleBack}>Back</button>
          )}
          {currentStep < 7 ? (
            <button className="btn btn-primary" onClick={handleNext}>Next</button>
          ) : (
            <button className="btn btn-primary" onClick={handleSubmit}>
              {mode === 'admin' ? 'Submit College' : 'Submit Registration'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CollegeRegistrationForm;
