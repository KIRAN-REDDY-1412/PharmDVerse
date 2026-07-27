import React from 'react';
import { Eye, X, Printer, User, Activity, FileText, BadgeCheck, Clock3, RotateCcw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDatabase } from '../../../context/DatabaseContext';
import './AddPreceptorModal.css';
import './ViewPreceptorModal.css';

const ViewPreceptorModal = ({ isOpen, onClose, preceptor }) => {
  const { users, cases } = useDatabase();
  const navigate = useNavigate();
  
  if (!isOpen || !preceptor) return null;

  const handlePrint = () => {
    window.print();
  };

  const preceptorId = preceptor.id || preceptor.preceptorId || '-';
  const fullName = preceptor.name || preceptor.fullName || '-';
  const gender = preceptor.gender || '-';
  const dob = preceptor.dateOfBirth || preceptor.dob || '-';
  const department = preceptor.department || preceptor.dept || '-';
  const qualification = preceptor.qualification || '-';
  const designation = preceptor.designation || '-';
  const specialization = preceptor.specialization || '-';
  const email = preceptor.email || '-';
  const mobile = preceptor.phone || preceptor.mobileNumber || preceptor.mobile || '-';
  const address = preceptor.address || '-';
  const status = preceptor.status || '-';
  const profilePhoto = preceptor.profilePhoto;

  // Dynamic Statistics
  const assignedStudentsCount = users.filter(u => u.role === 'student' && u.assignedPreceptorId === preceptorId).length;
  
  const preceptorCases = cases.filter(c => c.preceptor === fullName || c.preceptorId === preceptorId);
  const totalCasesCount = preceptorCases.length;
  const approvedCasesCount = preceptorCases.filter(c => c.status === 'Approved').length;
  const pendingCasesCount = preceptorCases.filter(c => c.status === 'Pending' || c.status === 'Submitted').length;
  const returnedCasesCount = preceptorCases.filter(c => c.status === 'Returned').length;

  const navigateToStudents = () => {
    onClose();
    navigate('/college-admin/assign-students/list', { state: { filterPreceptor: fullName } });
  };

  const navigateToCases = (filterStatus) => {
    onClose();
    navigate('/college-admin/cases/list', { state: { filterStatus: filterStatus, filterPreceptor: fullName } });
  };

  return (
    <div className="modal-overlay">
      <div className="preceptor-modal view-preceptor-modal">
        <div className="modal-header">
          <div className="modal-title-group">
            <div className="modal-icon-bg">
              <Eye className="modal-icon" />
            </div>
            <div>
              <h2>Preceptor Profile</h2>
              <p className="modal-subtitle">Complete preceptor information and clinical statistics (Read Only)</p>
            </div>
          </div>
          <button className="btn-close" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        <div className="modal-body custom-scrollbar">
          <div className="section-grid">
            
            {/* Clinical Statistics */}
            <div className="form-section full-width">
              <h3 className="section-title">📊 Clinical Workload Statistics</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1rem', marginTop: '1rem' }}>
                
                <div onClick={navigateToStudents} style={{ cursor: 'pointer', backgroundColor: 'var(--bg-surface-alt)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', alignItems: 'center', transition: 'all 0.2s' }}>
                  <div style={{ color: 'var(--color-primary)', marginBottom: '0.5rem' }}><User size={24} /></div>
                  <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>{assignedStudentsCount}</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Assigned Students</span>
                </div>

                <div onClick={() => navigateToCases('All')} style={{ cursor: 'pointer', backgroundColor: 'var(--bg-surface-alt)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', alignItems: 'center', transition: 'all 0.2s' }}>
                  <div style={{ color: '#8b5cf6', marginBottom: '0.5rem' }}><FileText size={24} /></div>
                  <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>{totalCasesCount}</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Total Cases</span>
                </div>

                <div onClick={() => navigateToCases('Pending')} style={{ cursor: 'pointer', backgroundColor: 'var(--bg-surface-alt)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', alignItems: 'center', transition: 'all 0.2s' }}>
                  <div style={{ color: 'var(--color-warning)', marginBottom: '0.5rem' }}><Clock3 size={24} /></div>
                  <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>{pendingCasesCount}</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Under Review</span>
                </div>

                <div onClick={() => navigateToCases('Approved')} style={{ cursor: 'pointer', backgroundColor: 'var(--bg-surface-alt)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', alignItems: 'center', transition: 'all 0.2s' }}>
                  <div style={{ color: 'var(--color-success)', marginBottom: '0.5rem' }}><BadgeCheck size={24} /></div>
                  <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>{approvedCasesCount}</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Approved Cases</span>
                </div>

                <div onClick={() => navigateToCases('Returned')} style={{ cursor: 'pointer', backgroundColor: 'var(--bg-surface-alt)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', alignItems: 'center', transition: 'all 0.2s' }}>
                  <div style={{ color: 'var(--color-danger)', marginBottom: '0.5rem' }}><RotateCcw size={24} /></div>
                  <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>{returnedCasesCount}</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Returned Cases</span>
                </div>

              </div>
            </div>

            {/* Personal Information */}
            <div className="form-section">
              <h3 className="section-title">👤 Personal Information</h3>
              
              <div className="profile-section-container">
                <div className="profile-details-grid">
                  <div className="form-group">
                    <label>Preceptor ID</label>
                    <input type="text" className="form-control read-only" value={preceptorId} readOnly />
                  </div>
                  <div className="form-group">
                    <label>Full Name</label>
                    <input type="text" className="form-control read-only" value={fullName} readOnly />
                  </div>
                  <div className="form-group">
                    <label>Gender</label>
                    <input type="text" className="form-control read-only" value={gender} readOnly />
                  </div>
                  <div className="form-group">
                    <label>Date of Birth</label>
                    <input type="text" className="form-control read-only" value={dob} readOnly />
                  </div>
                </div>
                
                <div className="profile-photo-compact">
                  {profilePhoto ? (
                    <img src={profilePhoto} alt="Profile" className="photo-preview" />
                  ) : (
                    <div className="photo-placeholder">
                      <User size={40} />
                    </div>
                  )}
                  <span className="photo-label">Profile Photo</span>
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div className="form-section">
              <h3 className="section-title">💼 Professional Information</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>Department</label>
                  <input type="text" className="form-control read-only" value={department} readOnly />
                </div>
                <div className="form-group">
                  <label>Qualification</label>
                  <input type="text" className="form-control read-only" value={qualification} readOnly />
                </div>
                <div className="form-group">
                  <label>Designation</label>
                  <input type="text" className="form-control read-only" value={designation} readOnly />
                </div>
                <div className="form-group">
                  <label>Specialization</label>
                  <input type="text" className="form-control read-only" value={specialization} readOnly />
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="form-section">
              <h3 className="section-title">📞 Contact Information</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" className="form-control read-only" value={email} readOnly />
                </div>
                <div className="form-group">
                  <label>Mobile Number</label>
                  <input type="text" className="form-control read-only" value={mobile} readOnly />
                </div>
                <div className="form-group full-width">
                  <label>Address</label>
                  <textarea className="form-control read-only" value={address} readOnly rows="2" />
                </div>
              </div>
            </div>

            <div className="form-row-split">
              {/* Login Information */}
              <div className="form-section">
                <h3 className="section-title">🔐 Login Information</h3>
                <div className="form-grid-single">
                  <div className="form-group">
                    <label>Username</label>
                    <input type="text" className="form-control read-only" value={preceptorId} readOnly />
                  </div>
                </div>
              </div>

              {/* Account Status */}
              <div className="form-section">
                <h3 className="section-title">⚙️ Account Status</h3>
                <div className="status-display-container">
                  <span className={`status-badge ${status && status.toLowerCase() === 'active' ? 'status-active' : 'status-inactive'}`}>
                    {status}
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className="modal-footer">
          <button type="button" className="btn-cancel" onClick={onClose}>
            Close
          </button>
          <button type="button" className="btn-save" onClick={handlePrint}>
            <Printer size={18} />
            Print
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewPreceptorModal;
