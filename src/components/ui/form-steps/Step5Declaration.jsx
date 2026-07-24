import React from 'react';
import { AlertCircle } from 'lucide-react';

const Step5Declaration = ({ formData, updateFormData, errors }) => {
  return (
    <div className="form-section animate-slide-up">
      <h3 className="section-title" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Declaration</h3>
      
      <div 
        className="card" 
        style={{ 
          backgroundColor: 'var(--bg-surface-alt)', 
          border: '1px solid var(--border-color)',
          padding: '1.5rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1.5rem' }}>
          <AlertCircle className="text-primary" size={24} style={{ flexShrink: 0 }} />
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
            By submitting this registration, you acknowledge that you are an authorized representative of the institution. 
            The information provided will be reviewed by the PharmDVerse administration team. False information may result in the rejection of your application or termination of platform access.
          </p>
        </div>

        <label 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.75rem', 
            cursor: 'pointer',
            padding: '1rem',
            backgroundColor: 'var(--bg-surface)',
            borderRadius: 'var(--radius-md)',
            border: errors.declarationChecked ? '1px solid var(--color-red)' : '1px solid var(--border-color)'
          }}
        >
          <input 
            type="checkbox" 
            checked={formData.declarationChecked}
            onChange={(e) => updateFormData('declarationChecked', e.target.checked)}
            style={{ width: '1.25rem', height: '1.25rem', cursor: 'pointer', accentColor: 'var(--color-primary)' }}
          />
          <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
            I certify that all information submitted is true and accurate. *
          </span>
        </label>
        {errors.declarationChecked && (
          <span className="error-text" style={{ display: 'block', marginTop: '0.5rem' }}>
            {errors.declarationChecked}
          </span>
        )}
      </div>
    </div>
  );
};

export default Step5Declaration;
