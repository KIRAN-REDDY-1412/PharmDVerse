import React from 'react';
import { Upload, FileText, BadgeCheck } from 'lucide-react';

const FileUploadUI = ({ label, required, fileState }) => {
  return (
    <div className={`upload-card ${fileState ? 'uploaded' : ''}`} style={fileState ? { borderColor: 'var(--color-accent)' } : {}}>
      <div className="upload-info">
        <div className="upload-icon">
          {fileState ? <BadgeCheck className="text-accent" size={32} /> : <FileText size={32} />}
        </div>
        <div className="upload-text">
          <h4>{label} {required && '*'}</h4>
          <p>{fileState ? 'Upload complete' : 'PDF, JPG, or PNG (Max 5MB)'}</p>
        </div>
      </div>
      
      {!fileState && (
        <button type="button" className="btn btn-secondary" disabled>
          <Upload size={18} /> Upload
        </button>
      )}
    </div>
  );
};

const Step4Documents = ({ formData, updateFormData, errors }) => {
  return (
    <div className="form-section animate-slide-up">
      <h3 className="section-title" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Upload Documents</h3>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem', fontSize: '0.95rem' }}>
        Please upload clear copies of the required documents when available.
      </p>

      <div className="upload-container">
        <FileUploadUI 
          label="College Logo" 
          required={true}
          fileState={formData.fileLogo}
        />
        {errors.fileLogo && <span className="error-text">{errors.fileLogo}</span>}
        
        <FileUploadUI 
          label="PCI Approval Certificate" 
          required={true}
          fileState={formData.filePci}
        />
        {errors.filePci && <span className="error-text">{errors.filePci}</span>}

        <FileUploadUI 
          label="Affiliation Certificate" 
          required={false}
          fileState={formData.fileAffiliation}
        />

        <FileUploadUI 
          label="Authorization Letter" 
          required={false}
          fileState={formData.fileAuthLetter}
        />
      </div>
    </div>
  );
};

export default Step4Documents;
