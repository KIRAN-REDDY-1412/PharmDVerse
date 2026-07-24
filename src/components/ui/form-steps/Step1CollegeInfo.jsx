import React from 'react';

const Step1CollegeInfo = ({ formData, updateFormData, errors }) => {
  return (
    <div className="form-section animate-slide-up">
      <h3 className="section-title" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>College Information</h3>
      
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="collegeName">College Name *</label>
          <input 
            type="text" 
            id="collegeName" 
            value={formData.collegeName}
            onChange={(e) => updateFormData('collegeName', e.target.value)}
            className={errors.collegeName ? 'input-error' : ''}
            placeholder="e.g. University of Pharmacy"
          />
          {errors.collegeName && <span className="error-text">{errors.collegeName}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="collegeCode">Requested College Code *</label>
          <input 
            type="text" 
            id="collegeCode" 
            value={formData.collegeCode}
            onChange={(e) => updateFormData('collegeCode', e.target.value)}
            className={errors.collegeCode ? 'input-error' : ''}
            placeholder="e.g. PHARM-123"
          />
          {errors.collegeCode && <span className="error-text">{errors.collegeCode}</span>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="pciApprovalNumber">PCI Approval Number *</label>
          <input 
            type="text" 
            id="pciApprovalNumber" 
            value={formData.pciApprovalNumber}
            onChange={(e) => updateFormData('pciApprovalNumber', e.target.value)}
            className={errors.pciApprovalNumber ? 'input-error' : ''}
            placeholder="e.g. PCI-98765"
          />
          {errors.pciApprovalNumber && <span className="error-text">{errors.pciApprovalNumber}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="universityAffiliation">University Affiliation *</label>
          <input 
            type="text" 
            id="universityAffiliation" 
            value={formData.universityAffiliation}
            onChange={(e) => updateFormData('universityAffiliation', e.target.value)}
            className={errors.universityAffiliation ? 'input-error' : ''}
            placeholder="e.g. State Medical University"
          />
          {errors.universityAffiliation && <span className="error-text">{errors.universityAffiliation}</span>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="collegeType">College Type</label>
          <select 
            id="collegeType"
            value={formData.collegeType}
            onChange={(e) => updateFormData('collegeType', e.target.value)}
          >
            <option value="">Select Type</option>
            <option value="Government">Government</option>
            <option value="Private">Private</option>
            <option value="Autonomous">Autonomous</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="establishmentYear">Establishment Year</label>
          <input 
            type="number" 
            id="establishmentYear" 
            min="1800"
            max={new Date().getFullYear()}
            value={formData.establishmentYear}
            onChange={(e) => updateFormData('establishmentYear', e.target.value)}
            placeholder="e.g. 1995"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="officialEmail">Official Email *</label>
          <input 
            type="email" 
            id="officialEmail" 
            value={formData.officialEmail}
            onChange={(e) => updateFormData('officialEmail', e.target.value)}
            className={errors.officialEmail ? 'input-error' : ''}
            placeholder="admin@college.edu"
          />
          {errors.officialEmail && <span className="error-text">{errors.officialEmail}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="officialPhone">Official Phone *</label>
          <input 
            type="tel" 
            id="officialPhone" 
            value={formData.officialPhone}
            onChange={(e) => updateFormData('officialPhone', e.target.value)}
            className={errors.officialPhone ? 'input-error' : ''}
            placeholder="+1 (555) 123-4567"
          />
          {errors.officialPhone && <span className="error-text">{errors.officialPhone}</span>}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="website">College Website (Optional)</label>
        <input 
          type="url" 
          id="website" 
          value={formData.website}
          onChange={(e) => updateFormData('website', e.target.value)}
          placeholder="https://college.edu"
        />
      </div>
    </div>
  );
};

export default Step1CollegeInfo;
