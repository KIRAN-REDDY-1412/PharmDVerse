import React, { useState, useEffect } from 'react';
import { X, ClipboardList, BadgeCheck, RotateCcw } from 'lucide-react';
import '../college/preceptor/AddPreceptorModal.css';

const CaseReviewModal = ({ isOpen, onClose, caseData, onUpdateStatus }) => {
  const [action, setAction] = useState(null); // 'approve' or 'return'
  const [comments, setComments] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setAction(null);
      setComments('');
      setError('');
      setSuccess(false);
    }
  }, [isOpen]);

  if (!isOpen || !caseData) return null;

  const handleApprove = () => {
    onUpdateStatus(caseData.id, 'Approved', '');
    setSuccess(true);
    setTimeout(() => {
      onClose();
    }, 1500);
  };

  const handleReturnAction = () => {
    setAction('return');
  };

  const handleSubmitReturn = () => {
    if (!comments.trim()) {
      setError('Comments are mandatory when returning a case.');
      return;
    }
    onUpdateStatus(caseData.id, 'Returned', comments);
    setSuccess(true);
    setTimeout(() => {
      onClose();
    }, 1500);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '700px', width: '90%' }}>
        <div className="modal-header">
          <div className="modal-title-group">
            <div className="modal-icon-wrapper orange">
              <ClipboardList size={24} />
            </div>
            <div>
              <h2 className="modal-title">Review Clinical Case</h2>
              <p className="modal-subtitle">Case #{caseData.id} — {caseData.studentName}</p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose} disabled={success}>
            <X size={24} />
          </button>
        </div>

        <div className="modal-body">
          {success ? (
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              <BadgeCheck size={48} color="#2e7d32" style={{ margin: '0 auto 16px' }} />
              <h3>{action === 'return' ? 'Case Returned Successfully' : 'Case Approved Successfully'}</h3>
              <p style={{ color: '#666', marginTop: '8px' }}>Closing window...</p>
            </div>
          ) : (
            <>
              <div style={{ backgroundColor: '#f8fafc', padding: '16px', borderRadius: '8px', marginBottom: '24px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                  <div>
                    <span style={{ fontSize: '12px', color: '#64748b', display: 'block', marginBottom: '4px' }}>Case ID</span>
                    <strong style={{ color: '#0f172a' }}>{caseData.id}</strong>
                  </div>
                  <div>
                    <span style={{ fontSize: '12px', color: '#64748b', display: 'block', marginBottom: '4px' }}>Student</span>
                    <strong style={{ color: '#0f172a' }}>{caseData.studentName}</strong>
                  </div>
                  <div>
                    <span style={{ fontSize: '12px', color: '#64748b', display: 'block', marginBottom: '4px' }}>Diagnosis</span>
                    <strong style={{ color: '#0f172a' }}>{caseData.diagnosis}</strong>
                  </div>
                </div>
              </div>

              {!action ? (
                <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', margin: '32px 0' }}>
                  <button 
                    onClick={handleApprove}
                    style={{ 
                      display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px',
                      backgroundColor: '#16a34a', color: 'white', border: 'none', borderRadius: '6px',
                      fontSize: '16px', fontWeight: '500', cursor: 'pointer', transition: 'background-color 0.2s'
                    }}
                  >
                    <BadgeCheck size={20} />
                    Approve Case
                  </button>
                  <button 
                    onClick={handleReturnAction}
                    style={{ 
                      display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px',
                      backgroundColor: '#dc2626', color: 'white', border: 'none', borderRadius: '6px',
                      fontSize: '16px', fontWeight: '500', cursor: 'pointer', transition: 'background-color 0.2s'
                    }}
                  >
                    <RotateCcw size={20} />
                    Return Case
                  </button>
                </div>
              ) : (
                <div className="form-group full-width">
                  <label htmlFor="returnComments" className="required">Return Comments</label>
                  <textarea
                    id="returnComments"
                    className={`form-control ${error ? 'error' : ''}`}
                    placeholder="Provide specific feedback on why the case is being returned..."
                    value={comments}
                    onChange={(e) => {
                      setComments(e.target.value);
                      if (e.target.value.trim()) setError('');
                    }}
                    style={{ minHeight: '120px' }}
                  />
                  {error && <span className="error-message">{error}</span>}
                </div>
              )}
            </>
          )}
        </div>

        {!success && (
          <div className="modal-footer">
            {action === 'return' ? (
              <>
                <button type="button" className="btn btn-secondary" onClick={() => { setAction(null); setError(''); }}>
                  Back
                </button>
                <button type="button" className="btn btn-danger" onClick={handleSubmitReturn}>
                  Submit Return
                </button>
              </>
            ) : (
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CaseReviewModal;
