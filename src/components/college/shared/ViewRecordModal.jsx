import React from 'react';
import { Eye, X, Printer, FileText } from 'lucide-react';
import '../preceptor/AddPreceptorModal.css';

const ViewRecordModal = ({ isOpen, onClose, title, subtitle, fields = [], icon, onOpenComplete }) => {
  if (!isOpen) return null;

  const IconComponent = icon || Eye;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="student-modal" onClick={e => e.stopPropagation()} style={{ maxWidth: '700px' }}>
        
        {/* Header */}
        <div className="modal-header">
          <div className="modal-title-group">
            <IconComponent size={32} className="modal-title-icon" />
            <div className="modal-title-text">
              <h2>{title || 'View Details'}</h2>
              <p>{subtitle || 'Read-only record information'}</p>
            </div>
          </div>
          <button className="close-button" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="modal-body" style={{ padding: '2rem', flexDirection: 'column' }}>
          <div className="form-grid" style={{ gap: '1.25rem' }}>
            {fields.map((field, index) => (
              <div key={index} className={`form-group ${field.fullWidth ? 'full-width' : ''}`}>
                <label>{field.label}</label>
                {field.type === 'status' ? (
                  <span className={`status-pill status-${field.value?.toLowerCase()}`} style={{ width: 'fit-content', padding: '0.35rem 1rem' }}>
                    {field.value}
                  </span>
                ) : (
                  <input 
                    type="text" 
                    className="form-control read-only" 
                    value={field.value || '-'} 
                    readOnly 
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="modal-footer" style={{ justifyContent: onOpenComplete ? 'space-between' : 'flex-end' }}>
          {onOpenComplete && (
            <button 
              className="btn-save" 
              onClick={onOpenComplete}
              style={{ backgroundColor: '#10b981', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <FileText size={18} /> Open Complete Case
            </button>
          )}
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className="btn-cancel" onClick={onClose}>Close</button>
            <button className="btn-save" onClick={handlePrint} style={{ backgroundColor: 'var(--color-primary)' }}>
              <Printer size={18} /> Print
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ViewRecordModal;
