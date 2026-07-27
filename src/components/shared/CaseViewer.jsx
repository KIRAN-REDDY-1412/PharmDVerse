import React, { useState } from 'react';
import { CheckCircle2, XCircle, FileText, User, Activity, Droplets, FlaskConical, Stethoscope, AlertTriangle, Pill } from 'lucide-react';
import './CaseViewer.css';

const SECTIONS = [
  { id: 'patientInfo', title: 'Patient Information', icon: <User size={18} /> },
  { id: 'chiefComplaints', title: 'Chief Complaints', icon: <FileText size={18} /> },
  { id: 'diagnosis', title: 'Final Diagnosis', icon: <Stethoscope size={18} /> },
  { id: 'vitals', title: 'Vital Signs', icon: <Activity size={18} /> },
  { id: 'labs', title: 'Laboratory Investigations', icon: <Droplets size={18} /> },
  { id: 'medications', title: 'Drugs Prescribed', icon: <Pill size={18} /> },
  { id: 'remarks', title: 'Preceptor Remarks', icon: <AlertTriangle size={18} /> },
];

const CaseViewer = ({ caseData, isPreceptor = false, onApprove, onReturn }) => {
  const [activeSection, setActiveSection] = useState(SECTIONS[0].id);
  const [remarks, setRemarks] = useState('');

  if (!caseData) return <div className="empty-state">No clinical case data found.</div>;

  const handleApprove = () => {
    if (onApprove) onApprove(remarks);
  };

  const handleReturn = () => {
    if (onReturn) onReturn(remarks);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'patientInfo':
        return (
          <div className="data-grid">
            <div className="data-group">
              <span className="data-label">Patient Name</span>
              <div className="data-value">{caseData.patientName || '-'}</div>
            </div>
            <div className="data-group">
              <span className="data-label">Age</span>
              <div className="data-value">{caseData.age || '-'}</div>
            </div>
            <div className="data-group">
              <span className="data-label">Gender</span>
              <div className="data-value">{caseData.gender || '-'}</div>
            </div>
            <div className="data-group">
              <span className="data-label">Hospital</span>
              <div className="data-value">{caseData.hospital || '-'}</div>
            </div>
            <div className="data-group">
              <span className="data-label">Department</span>
              <div className="data-value">{caseData.department || '-'}</div>
            </div>
          </div>
        );
      
      case 'chiefComplaints':
        return (
          <div className="data-grid" style={{ gridTemplateColumns: '1fr' }}>
            <div className="data-group">
              <span className="data-label">Chief Complaints / History of Present Illness</span>
              <div className="data-value long-text">{caseData.chiefComplaint || 'No chief complaints documented.'}</div>
            </div>
          </div>
        );

      case 'diagnosis':
        return (
          <div className="data-grid" style={{ gridTemplateColumns: '1fr' }}>
            <div className="data-group">
              <span className="data-label">Final Diagnosis</span>
              <div className="data-value long-text">{caseData.diagnosis || 'No diagnosis documented.'}</div>
            </div>
          </div>
        );

      case 'vitals':
      case 'labs':
        return (
          <div className="empty-state">
            <FlaskConical size={48} style={{ color: 'var(--text-muted)', marginBottom: '1rem', opacity: 0.5 }} />
            <p>Detailed structured data will be displayed here in full production implementation.</p>
          </div>
        );

      case 'medications':
        return (
          <div className="data-grid" style={{ gridTemplateColumns: '1fr' }}>
            <div className="data-group">
              <span className="data-label">Medications Prescribed</span>
              <div className="data-value long-text">{caseData.medications || caseData.plan || 'No medications documented.'}</div>
            </div>
          </div>
        );

      case 'remarks':
        return (
          <div className="data-grid" style={{ gridTemplateColumns: '1fr' }}>
            <div className="data-group">
              <span className="data-label">Previous Remarks (If returned)</span>
              <div className="data-value long-text" style={{ backgroundColor: '#fff0f0', color: '#d32f2f', borderColor: '#ffcdd2' }}>
                {caseData.remarks || caseData.returnComments || 'No remarks.'}
              </div>
            </div>
          </div>
        );

      default:
        return <div className="empty-state">Select a section from the left menu.</div>;
    }
  };

  const activeSectionTitle = SECTIONS.find(s => s.id === activeSection)?.title;
  const activeSectionIcon = SECTIONS.find(s => s.id === activeSection)?.icon;

  const isPending = caseData.status === 'Pending' || ['Submitted', 'Assigned to Preceptor', 'Resubmitted'].includes(caseData.status);

  return (
    <div className="case-viewer-container">
      {/* Sidebar Navigation */}
      <div className="case-sidebar">
        <div className="case-sidebar-header">
          <div className="case-sidebar-title">Clinical Case</div>
          <div className="case-meta">ID: {caseData.id}</div>
          <div className="case-meta">Type: {caseData.docType || 'Patient Profile'}</div>
          <div style={{ marginTop: '0.5rem' }}>
            <span className={`status-pill ${caseData.status === 'Approved' ? 'status-active' : caseData.status === 'Returned' ? 'status-inactive' : 'status-pending'}`} style={{ fontSize: '0.7rem', padding: '2px 8px' }}>
              {caseData.status}
            </span>
          </div>
        </div>
        <ul className="case-sections-list">
          {SECTIONS.map((section) => (
            <li 
              key={section.id} 
              className={`case-section-item ${activeSection === section.id ? 'active' : ''}`}
              onClick={() => setActiveSection(section.id)}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                {section.icon}
                {section.title}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content Area */}
      <div className="case-content-area custom-scrollbar">
        <div className="case-content-header">
          <div className="case-content-title">
            {activeSectionIcon}
            {activeSectionTitle}
          </div>
        </div>
        
        <div className="case-content-body">
          {renderContent()}
        </div>

        {/* Preceptor Action Footer (Only visible if Preceptor and Case is Pending) */}
        {isPreceptor && isPending && (
          <div className="review-action-bar">
            <div className="review-input-group">
              <input 
                type="text" 
                className="review-input" 
                placeholder="Enter review comments or remarks here..." 
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
              />
            </div>
            <div className="review-actions">
              <button className="btn-return" onClick={handleReturn}>
                <XCircle size={18} /> Return for Revision
              </button>
              <button className="btn-approve" onClick={handleApprove}>
                <CheckCircle2 size={18} /> Approve Case
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CaseViewer;
