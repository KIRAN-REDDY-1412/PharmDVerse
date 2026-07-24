import React, { useState } from 'react';
import { Upload, FileText, BadgeCheck } from 'lucide-react';

const FileUploadUI = ({ label, required, fileState, onUpload }) => {
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const handleSimulateUpload = () => {
    if (fileState) return; // Already uploaded
    setIsUploading(true);
    let p = 0;
    const interval = setInterval(() => {
      p += 20;
      setProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setIsUploading(false);
        onUpload('dummy-file.pdf');
      }
    }, 200);
  };

  return (
    <div className={`upload-card ${fileState ? 'uploaded' : ''}`} style={fileState ? { borderColor: 'var(--color-accent)' } : {}}>
      <div className="upload-info">
        <div className="upload-icon">
          {fileState ? <BadgeCheck className="text-accent" size={32} /> : <FileText size={32} />}
        </div>
        <div className="upload-text">
          <h4>{label} {required && '*'}</h4>
          <p>{fileState ? 'Upload complete' : 'PDF, JPG, or PNG (Max 5MB)'}</p>
          
          {isUploading && (
            <div className="upload-progress">
              <div className="upload-progress-bar" style={{ width: `${progress}%` }}></div>
            </div>
          )}
        </div>
      </div>
      
      {!fileState && !isUploading && (
        <button type="button" className="btn btn-secondary" onClick={handleSimulateUpload}>
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
        Please upload clear copies of the required documents. This is a UI simulation only.
      </p>

      <div className="upload-container">
        <FileUploadUI 
          label="College Logo" 
          required={true}
          fileState={formData.fileLogo}
          onUpload={(val) => updateFormData('fileLogo', val)}
        />
        {errors.fileLogo && <span className="error-text">{errors.fileLogo}</span>}
        
        <FileUploadUI 
          label="PCI Approval Certificate" 
          required={true}
          fileState={formData.filePci}
          onUpload={(val) => updateFormData('filePci', val)}
        />
        {errors.filePci && <span className="error-text">{errors.filePci}</span>}

        <FileUploadUI 
          label="Affiliation Certificate" 
          required={false}
          fileState={formData.fileAffiliation}
          onUpload={(val) => updateFormData('fileAffiliation', val)}
        />

        <FileUploadUI 
          label="Authorization Letter" 
          required={false}
          fileState={formData.fileAuthLetter}
          onUpload={(val) => updateFormData('fileAuthLetter', val)}
        />
      </div>
    </div>
  );
};

export default Step4Documents;
