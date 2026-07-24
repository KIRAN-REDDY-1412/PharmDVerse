import React from 'react';
import { Trash2, X, AlertTriangle } from 'lucide-react';
import '../preceptor/AddPreceptorModal.css';

const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm, title = 'Delete Record', message }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="student-modal" onClick={e => e.stopPropagation()} style={{ maxWidth: '420px' }}>
        
        {/* Header */}
        <div className="modal-header">
          <div className="modal-title-group">
            <div style={{
              width: '48px', height: '48px', borderRadius: '12px',
              backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
            }}>
              <AlertTriangle size={24} />
            </div>
            <div className="modal-title-text">
              <h2>{title}</h2>
              <p>Confirm action</p>
            </div>
          </div>
          <button className="close-button" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="modal-body" style={{ flexDirection: 'column', gap: '0.75rem', padding: '2rem', textAlign: 'center' }}>
          <p style={{ fontSize: '1rem', color: 'var(--text-primary)', margin: 0, fontWeight: 500 }}>
            {message || 'Are you sure you want to delete this record?'}
          </p>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0 }}>
            This action cannot be undone.
          </p>
        </div>

        {/* Footer */}
        <div className="modal-footer" style={{ justifyContent: 'flex-end' }}>
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button className="btn-save" onClick={onConfirm} style={{
            backgroundColor: '#ef4444', display: 'flex', alignItems: 'center', gap: '0.5rem'
          }}>
            <Trash2 size={18} /> Delete
          </button>
        </div>

      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
