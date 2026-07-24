import React from 'react';
import { X, ClipboardList, Printer } from 'lucide-react';
import '../college/preceptor/AddPreceptorModal.css';

const CaseViewModal = ({ isOpen, onClose, caseData }) => {
  if (!isOpen || !caseData) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '800px', width: '90%' }}>
        <div className="modal-header">
          <div className="modal-title-group">
            <div className="modal-icon-wrapper purple">
              <ClipboardList size={24} />
            </div>
            <div>
              <h2 className="modal-title">Clinical Case Details</h2>
              <p className="modal-subtitle">Case #{caseData.id}</p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="modal-body">
          <div className="form-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
            <div className="form-group">
              <label>Case ID</label>
              <div className="read-only-value">{caseData.id}</div>
            </div>
            
            <div className="form-group">
              <label>Roll Number</label>
              <div className="read-only-value">{caseData.rollNo}</div>
            </div>
            
            <div className="form-group">
              <label>Student Name</label>
              <div className="read-only-value">{caseData.studentName}</div>
            </div>
            
            <div className="form-group">
              <label>Submission Date</label>
              <div className="read-only-value">{new Date(caseData.date).toLocaleDateString()}</div>
            </div>

            <div className="form-group full-width">
              <label>Diagnosis</label>
              <div className="read-only-value" style={{ minHeight: '60px' }}>{caseData.diagnosis}</div>
            </div>

            <div className="form-group full-width">
              <label>Chief Complaint</label>
              <div className="read-only-value" style={{ minHeight: '60px' }}>{caseData.chiefComplaint}</div>
            </div>

            <div className="form-group full-width">
              <label>Medications</label>
              <div className="read-only-value" style={{ minHeight: '80px' }}>{caseData.medications}</div>
            </div>

            <div className="form-group full-width">
              <label>Pharmaceutical Care Plan</label>
              <div className="read-only-value" style={{ minHeight: '100px' }}>{caseData.plan}</div>
            </div>
            
            {caseData.status === 'Returned' && caseData.returnComments && (
              <div className="form-group full-width">
                <label style={{ color: '#d32f2f' }}>Return Comments</label>
                <div className="read-only-value" style={{ minHeight: '60px', backgroundColor: '#ffebee', color: '#b71c1c', border: '1px solid #ffcdd2' }}>
                  {caseData.returnComments}
                </div>
              </div>
            )}
            
            <div className="form-group full-width">
              <label>Status</label>
              <div>
                <span className={`status-badge status-${caseData.status.toLowerCase()}`}>
                  {caseData.status}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
          <button type="button" className="btn btn-primary" onClick={handlePrint}>
            <Printer size={18} style={{ marginRight: '8px' }} />
            Print
          </button>
        </div>
      </div>
    </div>
  );
};

export default CaseViewModal;
