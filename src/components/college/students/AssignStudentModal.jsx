import React, { useState } from 'react';
import { X, Save, UserPlus, ChevronDown } from 'lucide-react';
import '../preceptor/AddPreceptorModal.css';
import '../student/AddStudentModal.css';

const MOCK_STUDENTS = [
  { rollNumber: 'Y26PHD0301', name: 'John Doe', course: 'Pharm.D', batch: 'Y26', year: 'IV Year', academicYear: '2026-2027' },
  { rollNumber: 'Y26PHD0302', name: 'Jane Smith', course: 'Pharm.D', batch: 'Y26', year: 'IV Year', academicYear: '2026-2027' },
];

const AssignStudentModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    rollNumber: '',
    assignedPreceptor: ''
  });
  
  const [studentDetails, setStudentDetails] = useState({
    name: '',
    course: '',
    batch: '',
    year: '',
    academicYear: ''
  });

  const [errors, setErrors] = useState({});

  const handleRollNumberChange = (e) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, rollNumber: value }));
    
    // Mock auto-fill logic
    const student = MOCK_STUDENTS.find(s => s.rollNumber === value);
    if (student) {
      setStudentDetails({
        name: student.name,
        course: student.course,
        batch: student.batch,
        year: student.year,
        academicYear: student.academicYear
      });
    } else {
      setStudentDetails({
        name: '',
        course: '',
        batch: '',
        year: '',
        academicYear: ''
      });
    }

    if (errors.rollNumber) setErrors(prev => ({ ...prev, rollNumber: '' }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.rollNumber) newErrors.rollNumber = 'Required';
    if (!formData.assignedPreceptor) newErrors.assignedPreceptor = 'Required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validate()) {
      alert('Student assigned successfully!');
      handleReset();
      onClose();
    }
  };

  const handleReset = () => {
    setFormData({ rollNumber: '', assignedPreceptor: '' });
    setStudentDetails({ name: '', course: '', batch: '', year: '', academicYear: '' });
    setErrors({});
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="student-modal" onClick={e => e.stopPropagation()} style={{ maxWidth: '900px' }}>
        
        {/* Header */}
        <div className="modal-header">
          <div className="modal-title-group">
            <UserPlus size={32} className="modal-title-icon" />
            <div className="modal-title-text">
              <h2>Assign Student</h2>
              <p>Assign a student to a preceptor</p>
            </div>
          </div>
          <button className="close-button" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">
          <div className="form-main">
            
            <div className="section-grid">
              
              {/* Left Column: Student Information */}
              <div className="form-section" style={{ margin: 0, paddingRight: '1rem', borderRight: '1px solid var(--border-color)' }}>
                <div className="section-heading">
                  <span className="section-icon">👤</span> Student Information
                </div>
                
                <div className="form-group">
                  <label>Roll Number <span className="required-asterisk">*</span></label>
                  <div className="form-control-wrapper">
                    <select className={`form-control ${errors.rollNumber ? 'error' : ''}`} name="rollNumber" value={formData.rollNumber} onChange={handleRollNumberChange}>
                      <option value="">Select Roll Number</option>
                      <option value="Y26PHD0301">Y26PHD0301</option>
                      <option value="Y26PHD0302">Y26PHD0302</option>
                    </select>
                    <ChevronDown size={16} className="select-arrow" />
                  </div>
                  {errors.rollNumber && <span className="field-error">{errors.rollNumber}</span>}
                </div>

                <div className="form-group">
                  <label>Student Name</label>
                  <input type="text" className="form-control read-only" value={studentDetails.name} readOnly placeholder="Auto-filled" />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label>Course</label>
                    <input type="text" className="form-control read-only" value={studentDetails.course} readOnly placeholder="Auto-filled" />
                  </div>
                  <div className="form-group">
                    <label>Batch</label>
                    <input type="text" className="form-control read-only" value={studentDetails.batch} readOnly placeholder="Auto-filled" />
                  </div>
                  <div className="form-group">
                    <label>Year</label>
                    <input type="text" className="form-control read-only" value={studentDetails.year} readOnly placeholder="Auto-filled" />
                  </div>
                  <div className="form-group">
                    <label>Academic Year</label>
                    <input type="text" className="form-control read-only" value={studentDetails.academicYear} readOnly placeholder="Auto-filled" />
                  </div>
                </div>
              </div>

              {/* Right Column: Assignment Information */}
              <div className="form-section" style={{ margin: 0, paddingLeft: '1rem' }}>
                <div className="section-heading">
                  <span className="section-icon">🔗</span> Assignment Information
                </div>

                <div className="form-group">
                  <label>Assigned Preceptor <span className="required-asterisk">*</span></label>
                  <div className="form-control-wrapper">
                    <select className={`form-control ${errors.assignedPreceptor ? 'error' : ''}`} name="assignedPreceptor" value={formData.assignedPreceptor} onChange={handleChange}>
                      <option value="">Select Preceptor</option>
                      <option value="Dr. Sarah Jenkins">Dr. Sarah Jenkins (Pharmacy Practice)</option>
                      <option value="Dr. Michael Chen">Dr. Michael Chen (Pharmacology)</option>
                    </select>
                    <ChevronDown size={16} className="select-arrow" />
                  </div>
                  {errors.assignedPreceptor && <span className="field-error">{errors.assignedPreceptor}</span>}
                </div>
                
                <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: 'var(--bg-surface-alt)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Assignment Rules</h4>
                  <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    <li>A student can only be assigned to one preceptor at a time per academic year.</li>
                    <li>Duplicate assignments will be automatically blocked by the system.</li>
                  </ul>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button className="btn-reset" onClick={handleReset}>Reset</button>
          <button className="btn-save" onClick={handleSave}><Save size={18} /> Assign Student</button>
        </div>

      </div>
    </div>
  );
};

export default AssignStudentModal;
