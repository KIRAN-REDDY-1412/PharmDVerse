import React from 'react';

const Step2Address = ({ formData, updateFormData, errors }) => {
  return (
    <div className="form-section animate-slide-up">
      <h3 className="section-title" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Address Details</h3>
      
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="country">Country *</label>
          <input 
            type="text" 
            id="country" 
            value={formData.country}
            onChange={(e) => updateFormData('country', e.target.value)}
            className={errors.country ? 'input-error' : ''}
            placeholder="e.g. United States"
          />
          {errors.country && <span className="error-text">{errors.country}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="state">State *</label>
          <input 
            type="text" 
            id="state" 
            value={formData.state}
            onChange={(e) => updateFormData('state', e.target.value)}
            className={errors.state ? 'input-error' : ''}
            placeholder="e.g. California"
          />
          {errors.state && <span className="error-text">{errors.state}</span>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="districtCity">District / City *</label>
          <input 
            type="text" 
            id="districtCity" 
            value={formData.districtCity}
            onChange={(e) => updateFormData('districtCity', e.target.value)}
            className={errors.districtCity ? 'input-error' : ''}
            placeholder="e.g. San Francisco"
          />
          {errors.districtCity && <span className="error-text">{errors.districtCity}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="pinCode">PIN Code / Zip *</label>
          <input 
            type="text" 
            id="pinCode" 
            value={formData.pinCode}
            onChange={(e) => updateFormData('pinCode', e.target.value)}
            className={errors.pinCode ? 'input-error' : ''}
            placeholder="e.g. 94105"
          />
          {errors.pinCode && <span className="error-text">{errors.pinCode}</span>}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="completeAddress">Complete Address *</label>
        <input 
          type="text" 
          id="completeAddress" 
          value={formData.completeAddress}
          onChange={(e) => updateFormData('completeAddress', e.target.value)}
          className={errors.completeAddress ? 'input-error' : ''}
          placeholder="e.g. 123 Education Way, Suite 400"
        />
        {errors.completeAddress && <span className="error-text">{errors.completeAddress}</span>}
      </div>
    </div>
  );
};

export default Step2Address;
