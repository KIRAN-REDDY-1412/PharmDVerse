import React, { useState, useRef } from 'react';
import { useDatabase } from '../../../context/DatabaseContext';

const CATEGORIES = [
  'Technical Issue',
  'Login Issue',
  'Clinical Case Issue',
  'Notification Issue',
  'PDF Issue',
  'Account Issue',
  'Other'
];

const RaiseRequestTab = ({ user }) => {
  const { updateUser } = useDatabase();
  const fileInputRef = useRef(null);
  
  const [formData, setFormData] = useState({
    category: '',
    subject: '',
    description: '',
    attachment: null
  });
  
  const [errors, setErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
    setIsSuccess(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, attachment: 'File size must be less than 5MB' }));
      return;
    }
    
    // We mock storing the filename
    setFormData(prev => ({ ...prev, attachment: file.name }));
    setErrors(prev => ({ ...prev, attachment: null }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    // Create new request
    const newRequest = {
      id: `REQ-${Math.floor(Math.random() * 90000) + 10000}`,
      ...formData,
      status: 'Open',
      submittedDate: new Date().toISOString()
    };
    
    const updatedRequests = [...(user.supportRequests || []), newRequest];
    
    // Also create a notification
    const newNotification = {
      id: `NOT-${Date.now()}`,
      title: 'Support Request Submitted',
      message: `Your support request "${newRequest.subject}" has been successfully submitted and is being reviewed.`,
      date: new Date().toISOString(),
      read: false,
      type: 'system'
    };
    
    const updatedNotifications = [newNotification, ...(user.notifications || [])];
    
    updateUser(user.id, {
      ...user,
      supportRequests: updatedRequests,
      notifications: updatedNotifications
    });
    
    handleReset();
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 5000);
  };

  const handleReset = () => {
    setFormData({ category: '', subject: '', description: '', attachment: null });
    setErrors({});
    if (fileInputRef.current) fileInputRef.current.value = '';
    setIsSuccess(false);
  };

  return (
    <div className="support-form">
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Raise Support Request</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Fill out the form below to report an issue or request assistance. Our support team will respond as soon as possible.</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="support-form-group">
          <label className="support-form-label">Category *</label>
          <select 
            name="category" 
            className="support-form-select"
            value={formData.category}
            onChange={handleInputChange}
          >
            <option value="">Select Category</option>
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          {errors.category && <span className="error-text">{errors.category}</span>}
        </div>

        <div className="support-form-group">
          <label className="support-form-label">Subject *</label>
          <input 
            type="text" 
            name="subject" 
            className="support-form-input" 
            placeholder="Brief subject of the issue"
            value={formData.subject}
            onChange={handleInputChange}
          />
          {errors.subject && <span className="error-text">{errors.subject}</span>}
        </div>

        <div className="support-form-group">
          <label className="support-form-label">Description *</label>
          <textarea 
            name="description" 
            className="support-form-textarea" 
            placeholder="Provide detailed information about the issue..."
            value={formData.description}
            onChange={handleInputChange}
          ></textarea>
          {errors.description && <span className="error-text">{errors.description}</span>}
        </div>

        <div className="support-form-group">
          <label className="support-form-label">Attachment (Optional)</label>
          <input 
            type="file" 
            ref={fileInputRef}
            onChange={handleFileChange}
            className="support-form-input" 
            style={{ backgroundColor: 'transparent', padding: '0.5rem' }}
          />
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            Supported formats: PDF, JPG, PNG (Max 5MB)
          </div>
          {errors.attachment && <span className="error-text">{errors.attachment}</span>}
        </div>

        <div className="support-actions">
          <button type="submit" className="btn-primary">Submit Request</button>
          <button type="button" className="btn-outline" onClick={handleReset}>Reset</button>
          {isSuccess && <span style={{ color: 'var(--color-accent)', alignSelf: 'center', fontWeight: 500 }}>Request submitted successfully!</span>}
        </div>
      </form>
    </div>
  );
};

export default RaiseRequestTab;
