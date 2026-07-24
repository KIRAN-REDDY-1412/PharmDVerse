import React from 'react';

const Step3Representative = ({ formData, updateFormData, errors }) => {
  return (
    <div className="form-section animate-slide-up">
      <h3 className="section-title" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Authorized Representative</h3>
      
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="repFullName">Full Name *</label>
          <input 
            type="text" 
            id="repFullName" 
            value={formData.repFullName}
            onChange={(e) => updateFormData('repFullName', e.target.value)}
            className={errors.repFullName ? 'input-error' : ''}
            placeholder="e.g. Dr. Jane Smith"
          />
          {errors.repFullName && <span className="error-text">{errors.repFullName}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="repDesignation">Designation *</label>
          <input 
            type="text" 
            id="repDesignation" 
            value={formData.repDesignation}
            onChange={(e) => updateFormData('repDesignation', e.target.value)}
            className={errors.repDesignation ? 'input-error' : ''}
            placeholder="e.g. Dean of Pharmacy"
          />
          {errors.repDesignation && <span className="error-text">{errors.repDesignation}</span>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="repMobile">Mobile Number *</label>
          <input 
            type="tel" 
            id="repMobile" 
            value={formData.repMobile}
            onChange={(e) => updateFormData('repMobile', e.target.value)}
            className={errors.repMobile ? 'input-error' : ''}
            placeholder="+1 (555) 987-6543"
          />
          {errors.repMobile && <span className="error-text">{errors.repMobile}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="repEmail">Official Email *</label>
          <input 
            type="email" 
            id="repEmail" 
            value={formData.repEmail}
            onChange={(e) => updateFormData('repEmail', e.target.value)}
            className={errors.repEmail ? 'input-error' : ''}
            placeholder="jane.smith@college.edu"
          />
          {errors.repEmail && <span className="error-text">{errors.repEmail}</span>}
        </div>
      </div>
    </div>
  );
};

export default Step3Representative;
