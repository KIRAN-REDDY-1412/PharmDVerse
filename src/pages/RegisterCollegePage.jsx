import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, ArrowLeft } from 'lucide-react';
import Step1CollegeInfo from '../components/ui/form-steps/Step1CollegeInfo';
import Step2Address from '../components/ui/form-steps/Step2Address';
import Step3Representative from '../components/ui/form-steps/Step3Representative';
import Step4Documents from '../components/ui/form-steps/Step4Documents';
import Step5Declaration from '../components/ui/form-steps/Step5Declaration';
import SuccessScreen from '../components/ui/form-steps/SuccessScreen';
import '../components/ui/RegisterCollege.css';

const STEPS = [
  'College Info',
  'Address',
  'Representative',
  'Documents',
  'Declaration'
];

const INITIAL_FORM_DATA = {
  collegeName: '',
  collegeCode: '',
  pciApprovalNumber: '',
  universityAffiliation: '',
  collegeType: '',
  establishmentYear: '',
  officialEmail: '',
  officialPhone: '',
  website: '',
  
  country: '',
  state: '',
  districtCity: '',
  completeAddress: '',
  pinCode: '',
  
  repFullName: '',
  repDesignation: '',
  repMobile: '',
  repEmail: '',
  
  fileLogo: null,
  filePci: null,
  fileAffiliation: null,
  fileAuthLetter: null,
  
  declarationChecked: false
};

const RegisterCollegePage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone) => {
    return /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/.test(phone) && phone.length >= 7;
  };

  const validateStep = () => {
    // Skipping full validation for development as per prompt:
    // "After clicking Submit Registration... Do NOT perform validation with backend. Simply display the Registration Successful page."
    // However, I will keep frontend validation for user experience, but it was requested to "Simply display Registration successful page".
    // Let's keep the existing UI validation.
    
    const newErrors = {};
    let isValid = true;

    if (currentStep === 1) {
      if (!formData.collegeName.trim()) newErrors.collegeName = 'College Name is required';
      if (!formData.collegeCode.trim()) newErrors.collegeCode = 'College Code is required';
      if (!formData.pciApprovalNumber.trim()) newErrors.pciApprovalNumber = 'PCI Approval Number is required';
      if (!formData.universityAffiliation.trim()) newErrors.universityAffiliation = 'University Affiliation is required';
      if (!formData.officialEmail.trim()) {
        newErrors.officialEmail = 'Official Email is required';
      } else if (!validateEmail(formData.officialEmail)) {
        newErrors.officialEmail = 'Invalid email format';
      }
      if (!formData.officialPhone.trim()) {
        newErrors.officialPhone = 'Official Phone is required';
      } else if (!validatePhone(formData.officialPhone)) {
        newErrors.officialPhone = 'Invalid phone format';
      }
    } else if (currentStep === 2) {
      if (!formData.country.trim()) newErrors.country = 'Country is required';
      if (!formData.state.trim()) newErrors.state = 'State is required';
      if (!formData.districtCity.trim()) newErrors.districtCity = 'City is required';
      if (!formData.completeAddress.trim()) newErrors.completeAddress = 'Address is required';
    } else if (currentStep === 3) {
      if (!formData.repFullName.trim()) newErrors.repFullName = 'Name is required';
      if (!formData.repDesignation.trim()) newErrors.repDesignation = 'Designation is required';
      if (!formData.repMobile.trim()) {
        newErrors.repMobile = 'Mobile is required';
      } else if (!validatePhone(formData.repMobile)) {
        newErrors.repMobile = 'Invalid mobile format';
      }
      if (!formData.repEmail.trim()) {
        newErrors.repEmail = 'Email is required';
      } else if (!validateEmail(formData.repEmail)) {
        newErrors.repEmail = 'Invalid email format';
      }
    } else if (currentStep === 4) {
      if (!formData.fileLogo) newErrors.fileLogo = 'Logo is required';
      if (!formData.filePci) newErrors.filePci = 'PCI Certificate is required';
    } else if (currentStep === 5) {
      if (!formData.declarationChecked) newErrors.declarationChecked = 'You must certify the information is true';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      isValid = false;
    }

    return isValid;
  };

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = () => {
    if (validateStep()) {
      setIsSubmitted(true);
    }
  };

  const handleReset = () => {
    setFormData(INITIAL_FORM_DATA);
    setErrors({});
    setCurrentStep(1);
  };

  const goHome = () => {
    navigate('/');
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-main)', padding: '2rem 1rem' }}>
      <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
        
        <button 
          onClick={goHome} 
          className="btn btn-secondary" 
          style={{ marginBottom: '1.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <ArrowLeft size={16} /> Back to Home
        </button>

        <div className="card animate-slide-up" style={{ padding: 0, overflow: 'hidden' }}>
          {isSubmitted ? (
            <SuccessScreen onClose={goHome} onRegisterAnother={() => { setIsSubmitted(false); handleReset(); }} />
          ) : (
            <div className="registration-layout">
              <div className="registration-header">
                <h2 className="registration-title">Register Your College</h2>
                <p className="registration-subtitle">
                  Join PharmDVerse and streamline clinical case management for your Pharm.D institution.
                </p>
              </div>

              {/* Progress Stepper */}
              <div className="stepper-container">
                {STEPS.map((stepLabel, index) => {
                  const stepNumber = index + 1;
                  const isActive = stepNumber === currentStep;
                  const isCompleted = stepNumber < currentStep;

                  return (
                    <div key={stepLabel} className={`stepper-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}>
                      <div className="step-circle">
                        {isCompleted ? <Check size={16} /> : stepNumber}
                      </div>
                      <span className="step-label">{stepLabel}</span>
                      {index < STEPS.length - 1 && <div className="step-connector"></div>}
                    </div>
                  );
                })}
              </div>

              <div className="registration-content" style={{ maxHeight: '60vh' }}>
                {currentStep === 1 && <Step1CollegeInfo formData={formData} updateFormData={updateFormData} errors={errors} />}
                {currentStep === 2 && <Step2Address formData={formData} updateFormData={updateFormData} errors={errors} />}
                {currentStep === 3 && <Step3Representative formData={formData} updateFormData={updateFormData} errors={errors} />}
                {currentStep === 4 && <Step4Documents formData={formData} updateFormData={updateFormData} errors={errors} />}
                {currentStep === 5 && <Step5Declaration formData={formData} updateFormData={updateFormData} errors={errors} />}
              </div>

              <div className="registration-footer">
                <button className="btn btn-secondary" onClick={handleReset} disabled={currentStep === 1}>
                  Reset
                </button>
                
                <div className="footer-actions">
                  {currentStep > 1 && (
                    <button className="btn btn-secondary" onClick={handlePrev}>
                      Previous
                    </button>
                  )}
                  
                  {currentStep < 5 ? (
                    <button className="btn btn-primary" onClick={handleNext}>
                      Next
                    </button>
                  ) : (
                    <button className="btn btn-accent" onClick={handleSubmit}>
                      Submit Registration
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterCollegePage;
