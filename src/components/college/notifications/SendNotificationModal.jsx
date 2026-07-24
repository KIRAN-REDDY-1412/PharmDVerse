import React, { useState } from 'react';
import { X, Save, Send, ChevronDown, Paperclip, Calendar } from 'lucide-react';
import '../preceptor/AddPreceptorModal.css';
import '../student/AddStudentModal.css';

const SendNotificationModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    recipients: 'All Students',
    subject: '',
    message: '',
    schedule: 'Send Now',
    scheduleDate: '',
    scheduleTime: '',
    status: true
  });
  
  const [errors, setErrors] = useState({});
  const [fileName, setFileName] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/jpg', 'image/png'];
    if (!validTypes.includes(file.type)) {
      alert('Please upload a PDF, DOCX, JPG, or PNG file.');
      return;
    }
    
    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10 MB.');
      return;
    }
    
    setFileName(file.name);
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Required';
    if (!formData.category) newErrors.category = 'Required';
    if (!formData.subject.trim()) newErrors.subject = 'Required';
    if (!formData.message.trim()) newErrors.message = 'Required';
    
    if (formData.schedule === 'Schedule for Later') {
      if (!formData.scheduleDate) newErrors.scheduleDate = 'Required';
      if (!formData.scheduleTime) newErrors.scheduleTime = 'Required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validate()) {
      alert('Notification processed successfully!');
      handleReset();
      onClose();
    }
  };

  const handleReset = () => {
    setFormData({
      title: '',
      category: '',
      recipients: 'All Students',
      subject: '',
      message: '',
      schedule: 'Send Now',
      scheduleDate: '',
      scheduleTime: '',
      status: true
    });
    setErrors({});
    setFileName('');
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="student-modal" onClick={e => e.stopPropagation()} style={{ maxWidth: '900px' }}>
        
        {/* Header */}
        <div className="modal-header">
          <div className="modal-title-group">
            <Send size={32} className="modal-title-icon" />
            <div className="modal-title-text">
              <h2>Send Notification</h2>
              <p>Create and distribute announcements</p>
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
              
              {/* Left Column */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div className="form-group">
                  <label>Notification Title <span className="required-asterisk">*</span></label>
                  <input type="text" className={`form-control ${errors.title ? 'error' : ''}`} name="title" value={formData.title} onChange={handleChange} placeholder="e.g. Exam Schedule Release" />
                  {errors.title && <span className="field-error">{errors.title}</span>}
                </div>

                <div className="form-group">
                  <label>Category <span className="required-asterisk">*</span></label>
                  <div className="form-control-wrapper">
                    <select className={`form-control ${errors.category ? 'error' : ''}`} name="category" value={formData.category} onChange={handleChange}>
                      <option value="">Select Category</option>
                      <option value="General Announcement">General Announcement</option>
                      <option value="Academic">Academic</option>
                      <option value="Clinical Cases">Clinical Cases</option>
                      <option value="Meeting">Meeting</option>
                      <option value="Holiday">Holiday</option>
                      <option value="Emergency">Emergency</option>
                    </select>
                    <ChevronDown size={16} className="select-arrow" />
                  </div>
                  {errors.category && <span className="field-error">{errors.category}</span>}
                </div>

                <div className="form-group">
                  <label>Recipients <span className="required-asterisk">*</span></label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
                    {['All Students', 'All Preceptors', 'Selected Students', 'Selected Preceptors'].map(opt => (
                      <label key={opt} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                        <input 
                          type="radio" 
                          name="recipients" 
                          value={opt} 
                          checked={formData.recipients === opt} 
                          onChange={handleChange} 
                          style={{ width: '16px', height: '16px', accentColor: 'var(--color-primary)' }}
                        />
                        {opt}
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div className="form-group">
                  <label>Subject <span className="required-asterisk">*</span></label>
                  <input type="text" className={`form-control ${errors.subject ? 'error' : ''}`} name="subject" value={formData.subject} onChange={handleChange} placeholder="Email/Notification Subject" />
                  {errors.subject && <span className="field-error">{errors.subject}</span>}
                </div>

                <div className="form-group" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <label>Message <span className="required-asterisk">*</span></label>
                  <textarea 
                    className={`form-control ${errors.message ? 'error' : ''}`} 
                    name="message" 
                    value={formData.message} 
                    onChange={handleChange} 
                    placeholder="Type your message here..."
                    style={{ resize: 'vertical', flex: 1, minHeight: '150px' }}
                  />
                  {errors.message && <span className="field-error">{errors.message}</span>}
                </div>
              </div>

              {/* Full Width Footer Elements */}
              <div className="form-group full-width">
                <label>Attachment (Optional)</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <button type="button" className="btn-reset" onClick={() => document.getElementById('notif-attachment').click()} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Paperclip size={16} /> Choose File
                  </button>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    {fileName || 'No file selected (PDF, DOCX, JPG, PNG - Max 10MB)'}
                  </span>
                  <input type="file" id="notif-attachment" style={{ display: 'none' }} accept=".pdf,.docx,.jpg,.jpeg,.png" onChange={handleFileUpload} />
                </div>
              </div>

              <div className="form-group full-width" style={{ display: 'flex', alignItems: 'flex-start', gap: '3rem', padding: '1rem', backgroundColor: 'var(--bg-surface-alt)', borderRadius: '8px' }}>
                
                {/* Schedule */}
                <div style={{ flex: 1 }}>
                  <label style={{ marginBottom: '1rem', display: 'block' }}>Schedule</label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem' }}>
                      <input type="radio" name="schedule" value="Send Now" checked={formData.schedule === 'Send Now'} onChange={handleChange} style={{ width: '16px', height: '16px', accentColor: 'var(--color-primary)' }} />
                      Send Now
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem' }}>
                      <input type="radio" name="schedule" value="Schedule for Later" checked={formData.schedule === 'Schedule for Later'} onChange={handleChange} style={{ width: '16px', height: '16px', accentColor: 'var(--color-primary)' }} />
                      Schedule for Later
                    </label>
                  </div>
                  
                  {formData.schedule === 'Schedule for Later' && (
                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                      <div className="form-group" style={{ flex: 1, margin: 0 }}>
                         <input type="date" className={`form-control ${errors.scheduleDate ? 'error' : ''}`} name="scheduleDate" value={formData.scheduleDate} onChange={handleChange} />
                      </div>
                      <div className="form-group" style={{ flex: 1, margin: 0 }}>
                         <input type="time" className={`form-control ${errors.scheduleTime ? 'error' : ''}`} name="scheduleTime" value={formData.scheduleTime} onChange={handleChange} />
                      </div>
                    </div>
                  )}
                </div>

                {/* Status Toggle */}
                <div>
                  <label style={{ marginBottom: '1rem', display: 'block' }}>Status</label>
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

            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button className="btn-reset" onClick={handleReset}>Reset</button>
          <button className="btn-save" onClick={handleSave}><Send size={18} /> Send Notification</button>
        </div>

      </div>
    </div>
  );
};

export default SendNotificationModal;
