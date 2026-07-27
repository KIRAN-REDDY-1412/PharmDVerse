import React from 'react';
import { Eye, X, Printer, User } from 'lucide-react';
import '../preceptor/AddPreceptorModal.css';
import './AddStudentModal.css';
import './ViewStudentModal.css';

const ViewStudentModal = ({ isOpen, onClose, student }) => {
  if (!isOpen || !student) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="student-modal view-student-modal" onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="modal-header">
          <div className="modal-title-group">
            <Eye size={28} className="modal-title-icon" />
            <div className="modal-title-text">
              <h2>Student Profile</h2>
              <p>Complete student information (Read Only)</p>
            </div>
          </div>
          <button className="close-button" onClick={onClose}>
            <X size={22} />
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">
          <div className="form-sections-container">

            {/* ═══════════ PERSONAL INFORMATION ═══════════ */}
            <div className="form-section">
              <div className="section-heading">
                <span className="section-icon">👤</span> Personal Information
              </div>

              {/* Row 1: Roll Number, Full Name, Photo */}
              <div className="personal-info-top">
                <div className="form-group">
                  <label>Roll Number</label>
                  <input type="text" className="form-control read-only" value={student.id || '-'} readOnly />
                </div>
                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" className="form-control read-only" value={student.name || '-'} readOnly />
                </div>

                {/* Profile Photo */}
                <div className="student-photo-compact">
                  <span className="photo-upload-label">Profile Photo</span>
                  <div className="student-photo-box" style={{ cursor: 'default', borderStyle: 'solid' }}>
                    {student.profilePhoto ? (
                      <img src={student.profilePhoto} alt="Profile" />
                    ) : (
                      <User size={48} style={{ color: 'var(--text-muted)', opacity: 0.4 }} strokeWidth={1} />
                    )}
                  </div>
                </div>
              </div>

              {/* Rows 2-3: Gender, DOB, Blood, Aadhaar */}
              <div className="section-grid">
                <div className="form-group">
                  <label>Gender</label>
                  <input type="text" className="form-control read-only" value={student.gender || '-'} readOnly />
                </div>
                <div className="form-group">
                  <label>Date of Birth</label>
                  <input type="text" className="form-control read-only" value={student.dateOfBirth || '-'} readOnly />
                </div>
                <div className="form-group">
                  <label>Blood Group</label>
                  <input type="text" className="form-control read-only" value={student.bloodGroup || '-'} readOnly />
                </div>
                <div className="form-group">
                  <label>Aadhaar Number</label>
                  <input type="text" className="form-control read-only" value={student.aadhaarNumber || '-'} readOnly />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="text" className="form-control read-only" value={student.email || '-'} readOnly />
                </div>
                <div className="form-group">
                  <label>Mobile Number</label>
                  <input type="text" className="form-control read-only" value={student.phone || student.mobile || '-'} readOnly />
                </div>
              </div>
            </div>

            {/* ═══════════ ACADEMIC INFORMATION ═══════════ */}
            <div className="form-section">
              <div className="section-heading">
                <span className="section-icon">🎓</span> Academic Information
              </div>
              <div className="section-grid four-col">
                <div className="form-group">
                  <label>Course</label>
                  <input type="text" className="form-control read-only" value={student.course || '-'} readOnly />
                </div>
                <div className="form-group">
                  <label>Batch</label>
                  <input type="text" className="form-control read-only" value={student.batch || '-'} readOnly />
                </div>
                <div className="form-group">
                  <label>Year</label>
                  <input type="text" className="form-control read-only" value={student.year || '-'} readOnly />
                </div>
                <div className="form-group">
                  <label>Academic Year</label>
                  <input type="text" className="form-control read-only" value={student.academicYear || '-'} readOnly />
                </div>
              </div>
            </div>

            {/* ═══════════ PARENT / GUARDIAN ═══════════ */}
            <div className="form-section">
              <div className="section-heading">
                <span className="section-icon">👪</span> Parent / Guardian Information
              </div>
              <div className="section-grid two-col">
                <div className="form-group">
                  <label>Parent / Guardian Name</label>
                  <input type="text" className="form-control read-only" value={student.parentName || '-'} readOnly />
                </div>
                <div className="form-group">
                  <label>Mobile Number</label>
                  <input type="text" className="form-control read-only" value={student.parentMobile || '-'} readOnly />
                </div>
              </div>
            </div>

            {/* ═══════════ LOGIN INFO + ACCOUNT STATUS ═══════════ */}
            <div className="form-section">
              <div className="section-heading">
                <span className="section-icon">🔐</span> Login Information & Account Status
              </div>
              <div className="section-grid two-col">
                <div className="form-group">
                  <label>Username</label>
                  <input type="text" className="form-control read-only" value={student.id || '-'} readOnly />
                  <span className="field-hint">Same as Roll Number</span>
                </div>
                <div className="form-group">
                  <label>Account Status</label>
                  <div style={{ paddingTop: '0.5rem' }}>
                    <span
                      className={`status-pill ${student.status === 'Active' ? 'status-active' : 'status-inactive'}`}
                      style={{ padding: '0.4rem 1.25rem', fontSize: '0.85rem', fontWeight: 600 }}
                    >
                      {student.status || 'Active'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>Close</button>
          <button className="btn-save" onClick={() => window.print()}>
            <Printer size={16} /> Print
          </button>
        </div>

      </div>
    </div>
  );
};

export default ViewStudentModal;
