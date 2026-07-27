import React, { useState } from 'react';
import { FileText, CheckCircle, XCircle, MessageSquare, ChevronDown, ChevronRight } from 'lucide-react';
import './FormReviewCard.css';

const getStatusBadge = (status) => {
  switch (status) {
    case 'Approved':
      return <span className="status-badge status-approved">Approved</span>;
    case 'Returned':
      return <span className="status-badge status-returned">Returned</span>;
    case 'Submitted':
    case 'Assigned to Preceptor':
    case 'Resubmitted':
    case 'Under Review':
      return <span className="status-badge status-pending">{status}</span>;
    case 'Not Submitted':
    case 'Not Applicable':
      return <span className="status-badge status-inactive">{status}</span>;
    default:
      return <span className="status-badge">{status || 'Unknown'}</span>;
  }
};

const renderFormData = (data) => {
  if (!data || Object.keys(data).length === 0) return <div className="no-data-msg">No data provided.</div>;
  
  return (
    <div className="form-data-grid">
      {Object.entries(data).map(([key, value]) => {
        // Format camelCase key to Capitalized Words
        const formattedKey = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
        return (
          <div key={key} className="form-data-item">
            <span className="data-key">{formattedKey}</span>
            <span className="data-value">{typeof value === 'object' ? JSON.stringify(value) : (value || '-')}</span>
          </div>
        );
      })}
    </div>
  );
};

const FormReviewCard = ({ formName, formData, onAction, isViewMode }) => {
  const [isCommenting, setIsCommenting] = useState(false);
  const [commentText, setCommentText] = useState(formData?.comments || '');
  
  const status = formData ? formData.status : 'Not Applicable';
  const isActionable = ['Submitted', 'Assigned to Preceptor', 'Resubmitted', 'Under Review', 'Approved', 'Returned'].includes(status);
  const hasData = formData && !!formData.data;
  
  const [isExpanded, setIsExpanded] = useState(hasData); // Auto-expand if there is data

  const handleCommentSubmit = () => {
    onAction('comment', commentText);
    setIsCommenting(false);
  };

  const handleHeaderClick = () => {
    if (isActionable && hasData) {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <div className={`form-review-card ${isExpanded ? 'expanded' : ''} ${!isActionable ? 'not-actionable' : ''}`}>
      <div 
        className="form-review-header" 
        onClick={handleHeaderClick} 
        style={{ cursor: isActionable && hasData ? 'pointer' : 'default' }}
      >
        <div className="form-title-area">
          {isActionable && hasData ? (
            isExpanded ? <ChevronDown size={18} className="expand-icon" /> : <ChevronRight size={18} className="expand-icon" />
          ) : (
            <div style={{ width: '18px' }} />
          )}
          <FileText size={20} className="form-icon" />
          <h3 className="form-title">{formName}</h3>
        </div>
        <div className="form-status-area">
          {getStatusBadge(status)}
        </div>
      </div>

      {isExpanded && isActionable && (
        <div className="form-review-body">
          
          <div className="form-data-container">
            {renderFormData(formData.data)}
          </div>

          {(formData?.comments || isCommenting) && (
            <div className="form-comments-section">
              <MessageSquare size={14} className="comment-icon" />
              {isCommenting ? (
                <div className="comment-input-area">
                  <textarea 
                    className="comment-textarea"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Enter form-specific remarks..."
                  />
                  <div className="comment-actions">
                    <button className="btn-small btn-secondary" onClick={() => setIsCommenting(false)}>Cancel</button>
                    <button className="btn-small btn-primary" onClick={handleCommentSubmit}>Save</button>
                  </div>
                </div>
              ) : (
                <div className="comment-text">
                  <strong>Preceptor Remarks:</strong> {formData.comments}
                </div>
              )}
            </div>
          )}

          {/* Action Bar is hidden in View Mode */}
          {isActionable && !isViewMode && (
            <div className="form-action-bar">
              <div className="action-left">
                {/* View Form Data button removed as data is now inline */}
              </div>
              <div className="action-right">
                {!isCommenting && (
                  <button className="btn-action comment" onClick={() => setIsCommenting(true)}>
                    <MessageSquare size={14} /> Add Comment
                  </button>
                )}
                <button className="btn-action return" onClick={() => onAction('return')}>
                  <XCircle size={14} /> Return Form
                </button>
                <button className="btn-action approve" onClick={() => onAction('approve')}>
                  <CheckCircle size={14} /> Approve Form
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FormReviewCard;
