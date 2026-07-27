import React, { useState, useEffect } from 'react';
import { X, User, Camera, Eye, EyeOff, Save, ChevronDown, UserPlus, ShieldCheck, AlertTriangle, CheckCircle, Trash2, UploadCloud } from 'lucide-react';
import { useDatabase } from '../../../context/DatabaseContext';
import './AddPreceptorModal.css';

const AddPreceptorModal = ({ isOpen, onClose, mode = 'add', initialData = null }) => {
  const { users, addUser, updateUser } = useDatabase();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [photoPreview, setPhotoPreview] = useState(null);

  const [isDirty, setIsDirty] = useState(false);
  const [showUnsavedDialog, setShowUnsavedDialog] = useState(false);
  const [saveState, setSaveState] = useState('idle');

  const [formData, setFormData] = useState({
    preceptorId: 'PRE011',
    fullName: '',
    gender: 'Male',
    dateOfBirth: '1985-06-15',
    qualification: 'Pharm.D',
    designation: 'Assistant Professor',
    department: 'Pharmacy Practice',
    email: '',
    mobileNumber: '',
    password: '',
    confirmPassword: '',
    status: 'Active',
    username: 'PRE011'
  });

  useEffect(() => {
    if (mode === 'edit' && initialData) {
      setFormData({
        preceptorId: initialData.id || '',
        fullName: initialData.name || initialData.fullName || '',
        gender: initialData.gender || 'Male',
        dateOfBirth: initialData.dateOfBirth || '',
        qualification: initialData.qualification || 'Pharm.D',
        designation: initialData.designation || 'Assistant Professor',
        department: initialData.department || initialData.dept || 'Pharmacy Practice',
        email: initialData.email || '',
        mobileNumber: initialData.phone || initialData.mobileNumber || initialData.mobile || '',
        password: '',
        confirmPassword: '',
        status: initialData.status || 'Active',
        username: initialData.id || ''
      });
      setPhotoPreview(initialData.profilePhoto || null);
      setIsDirty(false);
    } else if (mode === 'add') {
      setIsDirty(false);
    }
  }, [mode, initialData, isOpen]);

  // Keyboard Navigation & Escape key handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        if (isDirty) {
          setShowUnsavedDialog(true);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isDirty, onClose]);

  const calculateProfileCompletion = () => {
    const fieldsToTrack = [
      formData.preceptorId, formData.fullName, formData.gender, formData.dateOfBirth,
      formData.qualification, formData.designation, formData.department,
      formData.email, formData.mobileNumber, formData.status, photoPreview
    ];
    if (mode === 'add') fieldsToTrack.push(formData.password);

    const filled = fieldsToTrack.filter(v => v && v.toString().trim() !== '').length;
    return Math.round((filled / fieldsToTrack.length) * 100);
  };

  const profileCompletion = calculateProfileCompletion();

  const getPasswordStrength = (pw) => {
    if (!pw) return { score: 0, label: 'None', color: 'var(--border-color)' };
    let score = 0;
    if (pw.length >= 8) score += 25;
    if (/[A-Z]/.test(pw)) score += 25;
    if (/[a-z]/.test(pw)) score += 25;
    if (/[0-9!@#$%^&*]/.test(pw)) score += 25;

    if (score < 50) return { score, label: 'Weak', color: 'var(--color-danger)' };
    if (score < 100) return { score, label: 'Medium', color: 'var(--color-warning)' };
    return { score, label: 'Strong', color: 'var(--color-success)' };
  };
  const pwStrength = getPasswordStrength(formData.password);

  const handleAutoCapitalizeChange = (e) => {
    const { name, value } = e.target;
    setIsDirty(true);
    
    const capitalizedValue = value
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
      
    setFormData(prev => ({ ...prev, [name]: capitalizedValue }));
    validateField(name, capitalizedValue);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIsDirty(true);

    let updates = { [name]: value };

    if (name === 'preceptorId' && mode === 'add') {
      updates.username = value;
    }

    setFormData(prev => ({ ...prev, ...updates }));
    validateField(name, value);
    if (name === 'preceptorId' && mode === 'add') validateField('username', value);
  };

  const validateField = (name, value) => {
    let errorMsg = '';
    
    if (name === 'email') {
      if (!value) errorMsg = 'Email Address is required.';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) errorMsg = 'Please enter a valid email address.';
      else if (users.some(u => u.email === value && u.id !== formData.preceptorId)) errorMsg = 'Email already registered.';
    }
    else if (name === 'mobileNumber') {
      if (!value) errorMsg = 'Mobile Number is required.';
      else if (!/^\d{10}$/.test(value)) errorMsg = 'Mobile Number must contain exactly 10 digits.';
      else if (users.some(u => (u.phone === value || u.mobileNumber === value) && u.id !== formData.preceptorId)) errorMsg = 'Mobile Number already registered.';
    }
    else if (name === 'preceptorId' && mode === 'add') {
      if (!value) errorMsg = 'Preceptor ID is required.';
      else if (users.some(u => u.id === value)) errorMsg = 'Preceptor ID already exists.';
    }
    else if (name === 'confirmPassword') {
      if (formData.password && value !== formData.password) errorMsg = 'Passwords do not match.';
    }
    else if (name === 'password' && formData.confirmPassword) {
      if (value !== formData.confirmPassword) {
        setErrors(prev => ({ ...prev, confirmPassword: 'Passwords do not match.' }));
      } else {
        setErrors(prev => ({ ...prev, confirmPassword: '' }));
      }
    }

    setErrors(prev => ({ ...prev, [name]: errorMsg }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      if (!validTypes.includes(file.type)) {
        alert('Please upload a valid JPG or PNG image.');
        e.target.value = '';
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        alert('File size exceeds 2 MB limit.');
        e.target.value = '';
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
        setIsDirty(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    setPhotoPreview(null);
    setIsDirty(true);
  };

  const handleSave = async () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = 'Full Name is required.';
    if (!formData.gender) newErrors.gender = 'Gender is required.';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of Birth is required.';
    if (!formData.qualification) newErrors.qualification = 'Qualification is required.';
    if (!formData.designation) newErrors.designation = 'Designation is required.';
    if (!formData.department) newErrors.department = 'Department is required.';
    
    if (!formData.email) newErrors.email = 'Email Address is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email address.';
    else if (users.some(u => u.email === formData.email && u.id !== formData.preceptorId)) newErrors.email = 'Email already registered.';
    
    if (!formData.mobileNumber) newErrors.mobileNumber = 'Mobile Number is required.';
    else if (!/^\d{10}$/.test(formData.mobileNumber)) newErrors.mobileNumber = 'Mobile Number must be 10 digits.';
    else if (users.some(u => (u.phone === formData.mobileNumber || u.mobileNumber === formData.mobileNumber) && u.id !== formData.preceptorId)) newErrors.mobileNumber = 'Mobile Number already registered.';

    if (mode === 'add') {
      if (!formData.preceptorId) newErrors.preceptorId = 'Preceptor ID is required.';
      else if (users.some(u => u.id === formData.preceptorId)) newErrors.preceptorId = 'Preceptor ID already exists.';
      if (!formData.password) newErrors.password = 'Password is required.';
    }
    
    if (formData.password && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    setErrors(newErrors);
    
    if (Object.values(newErrors).some(err => err !== '')) {
      setTimeout(() => {
        const firstError = document.querySelector('.form-control.error');
        if (firstError) firstError.focus();
      }, 0);
      return;
    }

    setSaveState('validating');
    await new Promise(r => setTimeout(r, 400));
    
    setSaveState(mode === 'add' ? 'creating' : 'saving');
    await new Promise(r => setTimeout(r, 400));

    const newUser = {
      id: formData.preceptorId,
      name: formData.fullName,
      email: formData.email,
      phone: formData.mobileNumber,
      role: 'preceptor',
      password: formData.password,
      gender: formData.gender,
      dateOfBirth: formData.dateOfBirth,
      department: formData.department,
      designation: formData.designation,
      qualification: formData.qualification,
      status: formData.status,
      profilePhoto: photoPreview
    };
    
    if (mode === 'edit' && !newUser.password) {
      delete newUser.password;
    }

    try {
      if (mode === 'edit') updateUser(initialData.id, newUser);
      else addUser(newUser);
      
      setSaveState('success');
      setIsDirty(false);
      
      setTimeout(() => {
        setSaveState('idle');
        onClose();
      }, 1500);
      
    } catch (err) {
      alert(err.message);
      setSaveState('idle');
    }
  };

  const handleCloseRequest = () => {
    if (isDirty && saveState !== 'success') {
      setShowUnsavedDialog(true);
    } else {
      onClose();
    }
  };

  const handleReset = () => {
    if (mode === 'add') {
      setFormData({
        preceptorId: 'PRE011', fullName: '', gender: 'Male', dateOfBirth: '',
        qualification: 'Pharm.D', designation: 'Assistant Professor', department: 'Pharmacy Practice',
        email: '', mobileNumber: '', password: '', confirmPassword: '', status: 'Active', username: 'PRE011'
      });
      setPhotoPreview(null);
    } else {
      setFormData({
        ...initialData,
        preceptorId: initialData.id,
        fullName: initialData.name,
        mobileNumber: initialData.phone,
        password: '', confirmPassword: '',
        username: initialData.id
      });
      setPhotoPreview(initialData.profilePhoto);
    }
    setErrors({});
    setIsDirty(false);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleCloseRequest}>
      <div className="preceptor-modal" onClick={e => e.stopPropagation()}>
        
        {/* Unsaved Changes Dialog Overlay */}
        {showUnsavedDialog && (
          <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '12px' }}>
            <div style={{ backgroundColor: '#fff', padding: '2rem', borderRadius: '12px', width: '400px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-danger)', marginBottom: '1rem' }}>
                <AlertTriangle size={24} /> Unsaved Changes
              </h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: '1.5' }}>
                You have unsaved changes. Do you want to save your changes before leaving? Accidental loss of data will occur if you discard.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <button className="btn-primary" onClick={() => { setShowUnsavedDialog(false); handleSave(); }}>Save & Exit</button>
                <button className="btn-cancel" style={{ border: '1px solid var(--color-danger)', color: 'var(--color-danger)' }} onClick={() => { setShowUnsavedDialog(false); setIsDirty(false); onClose(); }}>Discard Changes</button>
                <button className="btn-cancel" onClick={() => setShowUnsavedDialog(false)}>Continue Editing</button>
              </div>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="modal-header">
          <div className="modal-title-group">
            <UserPlus size={32} className="modal-title-icon" />
            <div className="modal-title-text">
              <h2>{mode === 'add' ? 'Add New Preceptor' : 'Edit Preceptor Profile'}</h2>
              <p>{mode === 'add' ? 'Register a new clinical preceptor' : 'Update existing preceptor information'}</p>
            </div>
          </div>
          <button className="close-button" onClick={handleCloseRequest}>
            <X size={24} />
          </button>
        </div>

        {/* Body (Original two-column layout) */}
        <div className="modal-body custom-scrollbar">
          
          <div className="form-fields-container">
            
            <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-primary)', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>Personal Information</h3>
            <div className="form-grid" style={{ marginBottom: '2rem' }}>
              <div className="form-group">
                <label>Preceptor ID <span className="required-asterisk">*</span></label>
                <input 
                  type="text" name="preceptorId" 
                  className={`form-control ${errors.preceptorId ? 'error' : ''} ${mode === 'edit' ? 'read-only' : ''}`}
                  value={formData.preceptorId} 
                  onChange={handleChange} 
                  readOnly={mode === 'edit'}
                />
                {errors.preceptorId && <span className="field-error">{errors.preceptorId}</span>}
              </div>

              <div className="form-group">
                <label>Full Name <span className="required-asterisk">*</span></label>
                <input 
                  type="text" name="fullName"
                  className={`form-control ${errors.fullName ? 'error' : ''}`}
                  placeholder="e.g. Dr. Ramesh Patel"
                  value={formData.fullName}
                  onChange={handleAutoCapitalizeChange}
                />
                {errors.fullName && <span className="field-error">{errors.fullName}</span>}
              </div>

              <div className="form-group">
                <label>Gender <span className="required-asterisk">*</span></label>
                <div className="form-control-wrapper">
                  <select name="gender" className="form-control" value={formData.gender} onChange={handleChange}>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  <ChevronDown size={18} className="select-arrow" />
                </div>
              </div>

              <div className="form-group">
                <label>Date of Birth <span className="required-asterisk">*</span></label>
                <input 
                  type="date" name="dateOfBirth"
                  className={`form-control ${errors.dateOfBirth ? 'error' : ''}`}
                  value={formData.dateOfBirth} onChange={handleChange}
                />
                {errors.dateOfBirth && <span className="field-error">{errors.dateOfBirth}</span>}
              </div>
            </div>

            <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-primary)', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>Professional Information</h3>
            <div className="form-grid" style={{ marginBottom: '2rem' }}>
              <div className="form-group">
                <label>Qualification <span className="required-asterisk">*</span></label>
                <div className="form-control-wrapper">
                  <select name="qualification" className="form-control" value={formData.qualification} onChange={handleChange}>
                    <option value="Pharm.D">Pharm.D</option>
                    <option value="Pharm.D (PB)">Pharm.D (PB)</option>
                    <option value="M.Pharm">M.Pharm</option>
                    <option value="B.Pharm">B.Pharm</option>
                  </select>
                  <ChevronDown size={18} className="select-arrow" />
                </div>
              </div>

              <div className="form-group">
                <label>Department <span className="required-asterisk">*</span></label>
                <div className="form-control-wrapper">
                  <select name="department" className="form-control" value={formData.department} onChange={handleChange}>
                    <option value="Pharmacy Practice">Pharmacy Practice</option>
                    <option value="Pharmacology">Pharmacology</option>
                    <option value="Pharmaceutics">Pharmaceutics</option>
                    <option value="Pharmacognosy">Pharmacognosy</option>
                    <option value="Pharmaceutical Analysis">Pharmaceutical Analysis</option>
                  </select>
                  <ChevronDown size={18} className="select-arrow" />
                </div>
              </div>

              <div className="form-group">
                <label>Designation <span className="required-asterisk">*</span></label>
                <div className="form-control-wrapper">
                  <select name="designation" className="form-control" value={formData.designation} onChange={handleChange}>
                    <option value="Professor">Professor</option>
                    <option value="Associate Professor">Associate Professor</option>
                    <option value="Assistant Professor">Assistant Professor</option>
                    <option value="Lecturer">Lecturer</option>
                  </select>
                  <ChevronDown size={18} className="select-arrow" />
                </div>
              </div>
              
              <div className="form-group">
                <label>Registration Number (Future Ready)</label>
                <input type="text" className="form-control read-only" placeholder="e.g. PCI-12345" disabled />
              </div>
              
              <div className="form-group">
                <label>Joining Date (Future Ready)</label>
                <input type="date" className="form-control read-only" disabled />
              </div>
            </div>

            <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-primary)', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>Contact Information</h3>
            <div className="form-grid" style={{ marginBottom: '2rem' }}>
              <div className="form-group">
                <label>Email Address <span className="required-asterisk">*</span></label>
                <input 
                  type="email" name="email"
                  className={`form-control ${errors.email ? 'error' : ''}`}
                  placeholder="ramesh.patel@pharmdverse.edu"
                  value={formData.email} onChange={handleChange}
                />
                {errors.email && <span className="field-error">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label>Mobile Number <span className="required-asterisk">*</span></label>
                <input 
                  type="tel" name="mobileNumber"
                  className={`form-control ${errors.mobileNumber ? 'error' : ''}`}
                  placeholder="9876543210" maxLength="10"
                  value={formData.mobileNumber} onChange={handleChange}
                />
                {errors.mobileNumber && <span className="field-error">{errors.mobileNumber}</span>}
              </div>
            </div>

            <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-primary)', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>Account Information</h3>
            <div className="form-grid">
              
              <div className="form-group">
                <label>Username <span className="required-asterisk">*</span></label>
                <input 
                  type="text" name="username"
                  className="form-control read-only"
                  value={formData.username}
                  readOnly
                />
                <span className="field-hint">Username is automatically generated from the Preceptor ID.</span>
              </div>

              <div className="form-group">
                <label>Status <span className="required-asterisk">*</span></label>
                <div className="form-control-wrapper">
                  <select name="status" className="form-control" value={formData.status} onChange={handleChange}>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                  <ChevronDown size={18} className="select-arrow" />
                </div>
              </div>

              <div className="form-group">
                <label>Password {mode === 'add' && <span className="required-asterisk">*</span>}</label>
                <div className="form-control-wrapper">
                  <input 
                    type={showPassword ? 'text' : 'password'} 
                    name="password"
                    className={`form-control ${errors.password ? 'error' : ''}`}
                    placeholder={mode === 'edit' ? 'Leave blank to keep current' : 'Enter strong password'}
                    value={formData.password} onChange={handleChange}
                  />
                  <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && <span className="field-error">{errors.password}</span>}
                {formData.password && (
                  <div style={{ marginTop: '0.5rem' }}>
                    <div style={{ height: '4px', background: 'var(--bg-surface-alt)', borderRadius: '2px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${pwStrength.score}%`, backgroundColor: pwStrength.color, transition: 'all 0.3s' }}></div>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: pwStrength.color, fontWeight: 500, marginTop: '2px', display: 'block' }}>{pwStrength.label}</span>
                  </div>
                )}
              </div>

              <div className="form-group">
                <label>Confirm Password {mode === 'add' && <span className="required-asterisk">*</span>}</label>
                <div className="form-control-wrapper">
                  <input 
                    type={showConfirmPassword ? 'text' : 'password'} 
                    name="confirmPassword"
                    className={`form-control ${errors.confirmPassword ? 'error' : ''}`}
                    placeholder="Re-enter password"
                    value={formData.confirmPassword} onChange={handleChange}
                  />
                  <button type="button" className="password-toggle" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.confirmPassword && <span className="field-error">{errors.confirmPassword}</span>}
                {formData.confirmPassword && !errors.confirmPassword && formData.password === formData.confirmPassword && (
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-success)', display: 'flex', alignItems: 'center', gap: '0.2rem', marginTop: '4px' }}>
                    <CheckCircle size={12} /> Passwords match
                  </span>
                )}
              </div>

            </div>

          </div>
          
          <div className="photo-summary-container" style={{ width: '280px', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            <div className="photo-upload-section">
              <span className="photo-upload-label">Profile Photo</span>
              <div className="photo-preview-box">
                {photoPreview ? (
                  <img src={photoPreview} alt="Profile Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <User className="photo-placeholder-icon" size={80} />
                )}
                <label className="photo-upload-btn" title="Upload Photo">
                  <Camera size={20} />
                  <input type="file" accept="image/jpeg, image/png" onChange={handlePhotoUpload} style={{ display: 'none' }} />
                </label>
              </div>
              <span className="photo-hint">JPG or PNG. Max size of 2MB.</span>
              
              {photoPreview && (
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem', width: '100%' }}>
                  <button type="button" onClick={removePhoto} style={{ flex: 1, padding: '0.4rem', fontSize: '0.75rem', border: '1px solid var(--color-danger)', color: 'var(--color-danger)', background: 'transparent', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem' }}>
                    <Trash2 size={12} /> Remove
                  </button>
                </div>
              )}
            </div>

            <div className="summary-card">
              <h3 className="summary-title" style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>Live Summary</h3>
              
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '4px', color: 'var(--text-secondary)' }}>
                  <span>Profile Completion</span>
                  <span style={{ fontWeight: 600 }}>{profileCompletion}%</span>
                </div>
                <div style={{ height: '6px', background: 'var(--bg-surface-alt)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${profileCompletion}%`, backgroundColor: profileCompletion === 100 ? 'var(--color-success)' : 'var(--color-primary)' }}></div>
                </div>
              </div>

              <div className="summary-details" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Preceptor ID</span>
                  <span style={{ fontWeight: 600, color: 'var(--color-primary)' }}>{formData.preceptorId || '-'}</span>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Full Name</span>
                  <span style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{formData.fullName || '-'}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Qualification</span>
                  <span style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{formData.qualification || '-'}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Department</span>
                  <span style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{formData.department || '-'}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Designation</span>
                  <span style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{formData.designation || '-'}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid var(--border-color)' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Status</span>
                  <span style={{ fontWeight: 600, color: formData.status === 'Active' ? 'var(--color-success)' : 'var(--text-secondary)' }}>
                    {formData.status}
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Footer */}
        <div className="modal-footer" style={{ position: 'sticky', bottom: 0, backgroundColor: 'var(--bg-surface)', borderTop: '1px solid var(--border-color)', padding: '1.5rem 2rem', zIndex: 10, borderRadius: '0 0 12px 12px' }}>
          
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '24px', marginBottom: '1rem' }}>
            {saveState === 'validating' && <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-warning)', fontWeight: 600, fontSize: '0.9rem' }}><ShieldCheck size={16} /> Validating Information...</span>}
            {saveState === 'creating' && <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-primary)', fontWeight: 600, fontSize: '0.9rem' }}><div className="spinner" style={{ width: '16px', height: '16px', border: '2px solid rgba(0,0,0,0.1)', borderLeftColor: 'currentColor', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div> Creating Preceptor Account...</span>}
            {saveState === 'saving' && <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-primary)', fontWeight: 600, fontSize: '0.9rem' }}><div className="spinner" style={{ width: '16px', height: '16px', border: '2px solid rgba(0,0,0,0.1)', borderLeftColor: 'currentColor', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div> Saving Records...</span>}
            {saveState === 'success' && <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-success)', fontWeight: 600, fontSize: '0.9rem' }}><CheckCircle size={16} /> Account {mode === 'add' ? 'Created' : 'Updated'} Successfully</span>}
          </div>

          <div className="enterprise-footer-actions" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem' }}>
            <button type="button" className="btn-cancel" onClick={handleCloseRequest} disabled={saveState !== 'idle'}>
              Cancel
            </button>
            <button type="button" className="btn-reset" onClick={handleReset} disabled={saveState !== 'idle'}>
              Reset
            </button>
            <button type="button" className="btn-save" onClick={handleSave} disabled={saveState !== 'idle'}>
              {saveState !== 'idle' && saveState !== 'success' ? (
                <>
                  <div className="spinner" style={{ width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.3)', borderLeftColor: '#fff', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save size={18} />
                  Save
                </>
              )}
            </button>
          </div>
        </div>
        <style>{`
          @keyframes spin { 100% { transform: rotate(360deg); } }
        `}</style>
      </div>
    </div>
  );
};

export default AddPreceptorModal;
