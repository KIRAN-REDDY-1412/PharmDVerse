import React, { useState } from 'react';
import { X, User, Camera, Eye, EyeOff, Save, ChevronDown, GraduationCap } from 'lucide-react';
import { useDatabase } from '../../../context/DatabaseContext';
import '../preceptor/AddPreceptorModal.css';
import './AddStudentModal.css';

const AddStudentModal = ({ isOpen, onClose, mode = 'add', initialData = null }) => {
  const { addUser, updateUser } = useDatabase();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [photoPreview, setPhotoPreview] = useState(null);

  const [formData, setFormData] = useState({
    rollNumber: 'Y26PHD0301',
    fullName: '',
    gender: 'Male',
    dateOfBirth: '',
    bloodGroup: '',
    aadhaarNumber: '',
    course: 'Pharm.D',
    batch: 'Y26',
    year: 'I Year',
    academicYear: '2026-2027',
    email: '',
    mobileNumber: '',
    parentName: '',
    parentMobile: '',
    address: '',
    password: '',
    confirmPassword: '',
    status: true
  });

  React.useEffect(() => {
    if (mode === 'edit' && initialData) {
      setFormData({
        rollNumber: initialData.id || '',
        fullName: initialData.name || '',
        gender: initialData.gender || 'Male',
        dateOfBirth: initialData.dateOfBirth || '',
        bloodGroup: initialData.bloodGroup || '',
        aadhaarNumber: initialData.aadhaarNumber || '',
        course: initialData.course || initialData.program || 'Pharm.D',
        batch: initialData.batch || 'Y26',
        year: initialData.year || 'I Year',
        academicYear: initialData.academicYear || '2026-2027',
        email: initialData.email || '',
        mobileNumber: initialData.phone || initialData.mobile || '',
        parentName: initialData.parentName || '',
        parentMobile: initialData.parentMobile || '',
        address: initialData.address || '',
        password: '', // Leave empty for edit unless user wants to change
        confirmPassword: '',
        status: initialData.status === 'Active'
      });
      setPhotoPreview(initialData.profilePhoto || null);
    }
  }, [mode, initialData, isOpen]);

  const handleAutoCapitalizeChange = (e) => {
    const { name, value } = e.target;
    const capitalizedValue = value
      .split(' ')
      .map(word => word.length > 0 ? word.charAt(0).toUpperCase() + word.slice(1) : '')
      .join(' ');
    setFormData(prev => ({ ...prev, [name]: capitalizedValue }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!validTypes.includes(file.type)) {
      alert('Please upload a JPG, JPEG, or PNG file.');
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      alert('File size must be less than 2 MB.');
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => setPhotoPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.rollNumber.trim()) newErrors.rollNumber = 'Roll Number is required';
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of Birth is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.mobileNumber.trim()) newErrors.mobileNumber = 'Mobile Number is required';
    if (!formData.parentName.trim()) newErrors.parentName = 'Parent/Guardian Name is required';
    if (!formData.parentMobile.trim()) newErrors.parentMobile = 'Parent/Guardian Mobile is required';
    
    if (mode === 'add') {
      if (!formData.password) newErrors.password = 'Password is required';
      if (!formData.confirmPassword) newErrors.confirmPassword = 'Confirm Password is required';
    }
    
    if (formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    setSubmitError('');
    if (validate()) {
      const newUser = {
        id: formData.rollNumber,
        name: formData.fullName,
        email: formData.email,
        phone: formData.mobileNumber,
        role: 'student',
        password: formData.password,
        gender: formData.gender,
        dateOfBirth: formData.dateOfBirth,
        course: formData.course,
        batch: formData.batch,
        year: formData.year,
        academicYear: formData.academicYear,
        address: formData.address,
        status: formData.status ? 'Active' : 'Inactive',
        profilePhoto: photoPreview
      };
      
      // If editing and no new password provided, do not overwrite the old one
      if (mode === 'edit' && !newUser.password) {
        delete newUser.password;
      }
      
      try {
        if (mode === 'edit') {
          updateUser(initialData.id, newUser);
          alert('Student updated successfully.');
        } else {
          addUser(newUser);
          alert('Student added successfully.');
        }
        onClose();
      } catch (err) {
        setSubmitError(err.message);
      }
    }
  };

  const handleReset = () => {
    setFormData({
      rollNumber: 'Y26PHD0301',
      fullName: '',
      gender: 'Male',
      dateOfBirth: '',
      bloodGroup: '',
      aadhaarNumber: '',
      course: 'Pharm.D',
      batch: 'Y26',
      year: 'I Year',
      academicYear: '2026-2027',
      email: '',
      mobileNumber: '',
      parentName: '',
      parentMobile: '',
      address: '',
      password: '',
      confirmPassword: '',
      status: true
    });
    setErrors({});
    setPhotoPreview(null);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="student-modal" onClick={e => e.stopPropagation()}>
        
        {/* Header */}
        <div className="modal-header">
          <div className="modal-title-group">
            <GraduationCap size={32} className="modal-title-icon" />
            <div className="modal-title-text">
              <h2>{mode === 'edit' ? 'Edit Student' : 'Add Student'}</h2>
              <p>{mode === 'edit' ? 'Update student details' : 'Enter student details to register'}</p>
            </div>
          </div>
          <button className="close-button" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">
          
          {submitError && (
            <div style={{ backgroundColor: '#fee2e2', color: '#dc2626', padding: '10px', borderRadius: '6px', marginBottom: '1rem', fontSize: '0.9rem' }}>
              {submitError}
            </div>
          )}

          <div className="form-sections-container">

            {/* ── Personal Information ── */}
            <div className="form-section">
              <div className="section-heading">
                <span className="section-icon">👤</span> Personal Information
              </div>
              <div className="section-grid">
                <div className="form-group">
                  <label>Roll Number <span className="required-asterisk">*</span></label>
                  <input type="text" className={`form-control ${errors.rollNumber ? 'error' : ''} ${mode === 'edit' ? 'read-only' : ''}`} name="rollNumber" placeholder="e.g. Y26PHD0301" value={formData.rollNumber} onChange={handleChange} readOnly={mode === 'edit'} />
                  {errors.rollNumber && <span className="field-error">{errors.rollNumber}</span>}
                </div>

                <div className="form-group">
                  <label>Full Name <span className="required-asterisk">*</span></label>
                  <input type="text" className={`form-control ${errors.fullName ? 'error' : ''}`} name="fullName" placeholder="e.g. T. Sri Ram" value={formData.fullName} onChange={handleAutoCapitalizeChange} />
                  {errors.fullName && <span className="field-error">{errors.fullName}</span>}
                </div>

                <div className="form-group">
                  <label>Gender <span className="required-asterisk">*</span></label>
                  <div className="form-control-wrapper">
                    <select className="form-control" name="gender" value={formData.gender} onChange={handleChange}>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                    <ChevronDown size={16} className="select-arrow" />
                  </div>
                </div>

                <div className="form-group">
                  <label>Date of Birth <span className="required-asterisk">*</span></label>
                  <input type="date" className={`form-control ${errors.dateOfBirth ? 'error' : ''}`} name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} />
                  {errors.dateOfBirth && <span className="field-error">{errors.dateOfBirth}</span>}
                </div>

                <div className="form-group">
                  <label>Blood Group</label>
                  <div className="form-control-wrapper">
                    <select className="form-control" name="bloodGroup" value={formData.bloodGroup} onChange={handleChange}>
                      <option value="">Select Blood Group</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                    <ChevronDown size={16} className="select-arrow" />
                  </div>
                </div>

                <div className="form-group">
                  <label>Aadhaar Number</label>
                  <input type="text" className="form-control" name="aadhaarNumber" placeholder="Optional" value={formData.aadhaarNumber} onChange={handleChange} maxLength={12} />
                </div>
              </div>
            </div>

            {/* ── Academic Information ── */}
            <div className="form-section">
              <div className="section-heading">
                <span className="section-icon">🎓</span> Academic Information
              </div>
              <div className="section-grid">
                <div className="form-group">
                  <label>Course <span className="required-asterisk">*</span></label>
                  <div className="form-control-wrapper">
                    <select className="form-control" name="course" value={formData.course} onChange={handleChange}>
                      <option value="Pharm.D">Pharm.D</option>
                      <option value="B.Pharm">B.Pharm</option>
                    </select>
                    <ChevronDown size={16} className="select-arrow" />
                  </div>
                </div>

                <div className="form-group">
                  <label>Batch <span className="required-asterisk">*</span></label>
                  <div className="form-control-wrapper">
                    <select className="form-control" name="batch" value={formData.batch} onChange={handleChange}>
                      <option value="Y25">Y25</option>
                      <option value="Y26">Y26</option>
                      <option value="Y27">Y27</option>
                    </select>
                    <ChevronDown size={16} className="select-arrow" />
                  </div>
                </div>

                <div className="form-group">
                  <label>Year <span className="required-asterisk">*</span></label>
                  <div className="form-control-wrapper">
                    <select className="form-control" name="year" value={formData.year} onChange={handleChange}>
                      <option value="I Year">I Year</option>
                      <option value="II Year">II Year</option>
                      <option value="III Year">III Year</option>
                      <option value="IV Year">IV Year</option>
                      <option value="V Year">V Year</option>
                      <option value="VI Year">VI Year</option>
                    </select>
                    <ChevronDown size={16} className="select-arrow" />
                  </div>
                </div>

                <div className="form-group">
                  <label>Academic Year <span className="required-asterisk">*</span></label>
                  <input type="text" className="form-control" name="academicYear" placeholder="e.g. 2026–2027" value={formData.academicYear} onChange={handleChange} />
                </div>
              </div>
            </div>

            {/* ── Contact Information ── */}
            <div className="form-section">
              <div className="section-heading">
                <span className="section-icon">📞</span> Contact Information
              </div>
              <div className="section-grid">
                <div className="form-group">
                  <label>Email Address <span className="required-asterisk">*</span></label>
                  <input type="email" className={`form-control ${errors.email ? 'error' : ''}`} name="email" placeholder="e.g. name@pharmdverse.edu.in" value={formData.email} onChange={handleChange} />
                  {errors.email && <span className="field-error">{errors.email}</span>}
                </div>

                <div className="form-group">
                  <label>Mobile Number <span className="required-asterisk">*</span></label>
                  <input type="tel" className={`form-control ${errors.mobileNumber ? 'error' : ''}`} name="mobileNumber" placeholder="e.g. 9876543210" value={formData.mobileNumber} onChange={handleChange} />
                  {errors.mobileNumber && <span className="field-error">{errors.mobileNumber}</span>}
                </div>

                <div className="form-group">
                  <label>Parent/Guardian Name <span className="required-asterisk">*</span></label>
                  <input type="text" className={`form-control ${errors.parentName ? 'error' : ''}`} name="parentName" placeholder="e.g. S. Venkatesh" value={formData.parentName} onChange={handleAutoCapitalizeChange} />
                  {errors.parentName && <span className="field-error">{errors.parentName}</span>}
                </div>

                <div className="form-group">
                  <label>Parent/Guardian Mobile <span className="required-asterisk">*</span></label>
                  <input type="tel" className={`form-control ${errors.parentMobile ? 'error' : ''}`} name="parentMobile" placeholder="e.g. 9876543211" value={formData.parentMobile} onChange={handleChange} />
                  {errors.parentMobile && <span className="field-error">{errors.parentMobile}</span>}
                </div>

                <div className="form-group full-width">
                  <label>Address</label>
                  <textarea className="form-control" name="address" placeholder="Optional" rows={2} value={formData.address} onChange={handleChange} style={{ resize: 'vertical' }} />
                </div>
              </div>
            </div>

            {/* ── Login Credentials ── */}
            <div className="form-section">
              <div className="section-heading">
                <span className="section-icon">🔐</span> Login Credentials {mode === 'edit' && '(Leave blank to keep current)'}
              </div>
              <div className="section-grid">
                <div className="form-group full-width">
                  <label>Username <span className="required-asterisk">*</span></label>
                  <input type="text" className="form-control read-only" value={formData.rollNumber} readOnly />
                  <span className="field-hint">Username is auto-generated from Roll Number</span>
                </div>

                <div className="form-group">
                  <label>Password {mode === 'add' && <span className="required-asterisk">*</span>}</label>
                  <div className="form-control-wrapper">
                    <input type={showPassword ? "text" : "password"} className={`form-control ${errors.password ? 'error' : ''}`} name="password" value={formData.password} onChange={handleChange} placeholder={mode === 'edit' ? '••••••••' : ''} />
                    <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                    </button>
                  </div>
                  {errors.password && <span className="field-error">{errors.password}</span>}
                </div>

                <div className="form-group">
                  <label>Confirm Password {mode === 'add' && <span className="required-asterisk">*</span>}</label>
                  <div className="form-control-wrapper">
                    <input type={showConfirmPassword ? "text" : "password"} className={`form-control ${errors.confirmPassword ? 'error' : ''}`} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder={mode === 'edit' ? '••••••••' : ''} />
                    <button type="button" className="password-toggle" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                      {showConfirmPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                    </button>
                  </div>
                  {errors.confirmPassword && <span className="field-error">{errors.confirmPassword}</span>}
                </div>
              </div>
            </div>

            {/* ── Status ── */}
            <div className="form-section">
              <div className="section-heading">
                <span className="section-icon">⚙️</span> Status
              </div>
              <div className="toggle-container">
                <label className="toggle-switch">
                  <input type="checkbox" checked={formData.status} onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.checked }))} />
                  <span className="toggle-slider"></span>
                </label>
                <span className={`toggle-label ${formData.status ? 'active-label' : 'inactive-label'}`}>
                  {formData.status ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>

          </div>

          {/* Profile Photo - Right Column */}
          <div className="student-photo-section">
            <span className="photo-upload-label">Profile Photo</span>
            <div className="student-photo-box" onClick={() => document.getElementById('student-photo-input').click()}>
              {photoPreview ? (
                <img src={photoPreview} alt="Preview" />
              ) : (
                <User size={80} style={{ color: 'var(--text-secondary)', opacity: 0.4 }} strokeWidth={1} />
              )}
              <button className="photo-camera-btn" type="button" aria-label="Upload photo">
                <Camera size={16} />
              </button>
            </div>
            <input type="file" id="student-photo-input" accept=".jpg,.jpeg,.png" style={{ display: 'none' }} onChange={handlePhotoUpload} />
            <span className="photo-formats">JPG, JPEG, PNG (Max. 2MB)</span>
          </div>

        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button className="btn-reset" onClick={handleReset}>Reset</button>
          <button className="btn-save" onClick={handleSave}><Save size={18} /> Save</button>
        </div>

      </div>
    </div>
  );
};

export default AddStudentModal;
