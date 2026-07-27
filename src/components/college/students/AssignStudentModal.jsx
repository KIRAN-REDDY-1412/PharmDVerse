import React, { useState } from 'react';
import { X, Save, UserPlus, ChevronDown } from 'lucide-react';
import { useDatabase } from '../../../context/DatabaseContext';
import '../preceptor/AddPreceptorModal.css';
import '../student/AddStudentModal.css';

const AssignStudentModal = ({ isOpen, onClose }) => {
  const { users, updateUser } = useDatabase();
  const students = users.filter(u => u.role === 'student');
  const preceptors = users.filter(u => u.role === 'preceptor');

  const [formData, setFormData] = useState({
    studentId: '',
    assignedPreceptorId: ''
  });
  
  const [studentDetails, setStudentDetails] = useState({
    name: '',
    course: '',
    batch: '',
    year: '',
    academicYear: ''
  });

  const [errors, setErrors] = useState({});

  const handleStudentSelect = (e) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, studentId: value }));
    
    const student = students.find(s => s.id === value);
    if (student) {
      setStudentDetails({
        name: student.name || student.fullName || '',
        course: student.course || '',
        batch: student.batch || '',
        year: student.year || '',
        academicYear: student.academicYear || ''
      });
      if (student.assignedPreceptorId) {
        setFormData(prev => ({ ...prev, assignedPreceptorId: student.assignedPreceptorId }));
      } else {
        setFormData(prev => ({ ...prev, assignedPreceptorId: '' }));
      }
    } else {
      setStudentDetails({ name: '', course: '', batch: '', year: '', academicYear: '' });
      setFormData(prev => ({ ...prev, assignedPreceptorId: '' }));
    }

    if (errors.studentId) setErrors(prev => ({ ...prev, studentId: '' }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.studentId) newErrors.studentId = 'Required';
    if (!formData.assignedPreceptorId) newErrors.assignedPreceptorId = 'Required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validate()) {
      updateUser(formData.studentId, { assignedPreceptorId: formData.assignedPreceptorId });
      alert('Student assigned successfully!');
      handleReset();
      onClose();
    }
  };

  const handleReset = () => {
    setFormData({ studentId: '', assignedPreceptorId: '' });
    setStudentDetails({ name: '', course: '', batch: '', year: '', academicYear: '' });
    setErrors({});
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="student-modal-container" onClick={e => e.stopPropagation()} style={{ maxWidth: '900px' }}>
        
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
                  <label>Select Student <span className="required-asterisk">*</span></label>
                  <div className="form-control-wrapper">
                    <select className={`form-control ${errors.studentId ? 'error' : ''}`} name="studentId" value={formData.studentId} onChange={handleStudentSelect}>
                      <option value="">Select Student</option>
                      {students.map(s => (
                        <option key={s.id} value={s.id}>{s.id} - {s.name || s.fullName}</option>
                      ))}
                    </select>
                    <ChevronDown size={16} className="select-arrow" />
                  </div>
                  {errors.studentId && <span className="field-error">{errors.studentId}</span>}
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
                    <select className={`form-control ${errors.assignedPreceptorId ? 'error' : ''}`} name="assignedPreceptorId" value={formData.assignedPreceptorId} onChange={handleChange}>
                      <option value="">Select Preceptor</option>
                      {preceptors.map(p => (
                        <option key={p.id} value={p.id}>{p.name || p.fullName} ({p.department || p.dept})</option>
                      ))}
                    </select>
                    <ChevronDown size={16} className="select-arrow" />
                  </div>
                  {errors.assignedPreceptorId && <span className="field-error">{errors.assignedPreceptorId}</span>}
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
