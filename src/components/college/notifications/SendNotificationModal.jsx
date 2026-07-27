import React, { useState } from 'react';
import { X, Save, Send, ChevronDown, Paperclip, Calendar, Clock, AlertTriangle, Info, BellRing } from 'lucide-react';
import '../preceptor/AddPreceptorModal.css';
import '../student/AddStudentModal.css';

const SendNotificationModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    audienceType: 'broadcast', // broadcast, group, individual
    targetGroup: '',
    targetIndividual: '',
    subject: '',
    message: '',
    priority: 'info', // info, warning, urgent
    scheduleType: 'now', // now, schedule
    scheduleDate: '',
    scheduleTime: '',
    expiryDate: ''
  });
  
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateStep = (currentStep) => {
    const newErrors = {};
    if (currentStep === 1) {
      if (formData.audienceType === 'group' && !formData.targetGroup) newErrors.targetGroup = 'Required';
      if (formData.audienceType === 'individual' && !formData.targetIndividual) newErrors.targetIndividual = 'Required';
    } else if (currentStep === 2) {
      if (!formData.subject.trim()) newErrors.subject = 'Required';
      if (!formData.message.trim()) newErrors.message = 'Required';
    } else if (currentStep === 3) {
      if (formData.scheduleType === 'schedule') {
        if (!formData.scheduleDate) newErrors.scheduleDate = 'Required';
        if (!formData.scheduleTime) newErrors.scheduleTime = 'Required';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => { if (validateStep(step)) setStep(s => s + 1); };
  const prevStep = () => setStep(s => s - 1);

  const handleDispatch = () => {
    if (validateStep(3)) {
      alert('Notification broadcast sequence initiated successfully!');
      handleReset();
      onClose();
    }
  };

  const handleReset = () => {
    setStep(1);
    setFormData({
      audienceType: 'broadcast', targetGroup: '', targetIndividual: '',
      subject: '', message: '', priority: 'info',
      scheduleType: 'now', scheduleDate: '', scheduleTime: '', expiryDate: ''
    });
    setErrors({});
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="student-modal" onClick={e => e.stopPropagation()} style={{ maxWidth: '700px' }}>
        
        {/* Header */}
        <div className="modal-header">
          <div className="modal-title-group">
            <Send size={32} className="modal-title-icon" style={{ backgroundColor: 'var(--color-primary)', color: 'white', padding: '6px', borderRadius: '8px' }} />
            <div className="modal-title-text">
              <h2>New Broadcast Announcement</h2>
              <p>Dispatch alerts to Students and Preceptors</p>
            </div>
          </div>
          <button className="close-button" onClick={onClose}><X size={24} /></button>
        </div>

        {/* Wizard Progress */}
        <div style={{ display: 'flex', borderBottom: '1px solid var(--border-color)', background: 'var(--bg-surface-alt)' }}>
          {[1, 2, 3].map((num) => (
            <div key={num} style={{ flex: 1, padding: '1rem', textAlign: 'center', borderBottom: step === num ? '3px solid var(--color-primary)' : '3px solid transparent', color: step >= num ? 'var(--color-primary)' : 'var(--text-muted)', fontWeight: step === num ? 600 : 400, transition: 'all 0.2s' }}>
              Step {num}: {num === 1 ? 'Audience' : num === 2 ? 'Composition' : 'Lifecycle'}
            </div>
          ))}
        </div>

        <div className="modal-body" style={{ minHeight: '350px' }}>
          
          {/* STEP 1: AUDIENCE */}
          {step === 1 && (
            <div className="form-section">
              <h3 className="section-title">Select Target Audience</h3>
              
              <div className="form-grid" style={{ gridTemplateColumns: '1fr' }}>
                <div className="form-group">
                  <label className="required">Audience Scope</label>
                  <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                    {['broadcast', 'group', 'individual'].map(type => (
                      <label key={type} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', padding: '0.75rem 1rem', border: '1px solid var(--border-color)', borderRadius: '8px', background: formData.audienceType === type ? 'var(--bg-surface-alt)' : 'transparent', flex: 1 }}>
                        <input type="radio" name="audienceType" value={type} checked={formData.audienceType === type} onChange={handleChange} />
                        <span style={{ textTransform: 'capitalize', fontWeight: formData.audienceType === type ? 600 : 400 }}>{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {formData.audienceType === 'group' && (
                  <div className="form-group" style={{ animation: 'fadeIn 0.2s' }}>
                    <label className="required">Select Group</label>
                    <div className="select-wrapper">
                      <select name="targetGroup" value={formData.targetGroup} onChange={handleChange} className={errors.targetGroup ? 'error' : ''}>
                        <option value="">Select a specific cohort...</option>
                        <option value="All Students">All Students</option>
                        <option value="All Preceptors">All Preceptors</option>
                        <option value="Batch 2024">Batch 2024</option>
                        <option value="Batch 2025">Batch 2025</option>
                        <option value="Cardiology Preceptors">Cardiology Preceptors</option>
                      </select>
                      <ChevronDown size={18} className="select-arrow" />
                    </div>
                    {errors.targetGroup && <span className="error-message">{errors.targetGroup}</span>}
                  </div>
                )}

                {formData.audienceType === 'individual' && (
                  <div className="form-group" style={{ animation: 'fadeIn 0.2s' }}>
                    <label className="required">Recipient ID</label>
                    <input type="text" name="targetIndividual" value={formData.targetIndividual} onChange={handleChange} placeholder="Enter Student or Preceptor ID..." className={errors.targetIndividual ? 'error' : ''} />
                    {errors.targetIndividual && <span className="error-message">{errors.targetIndividual}</span>}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 2: COMPOSITION */}
          {step === 2 && (
            <div className="form-section">
              <h3 className="section-title">Message Composition</h3>
              
              <div className="form-grid" style={{ gridTemplateColumns: '1fr' }}>
                <div className="form-group">
                  <label className="required">Priority Level</label>
                  <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                    {[
                      { val: 'info', icon: <Info size={16} />, color: 'var(--color-primary)' },
                      { val: 'warning', icon: <AlertTriangle size={16} />, color: 'var(--color-warning)' },
                      { val: 'urgent', icon: <BellRing size={16} />, color: 'var(--color-danger)' }
                    ].map(type => (
                      <label key={type.val} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', padding: '0.5rem 1rem', border: `1px solid ${formData.priority === type.val ? type.color : 'var(--border-color)'}`, borderRadius: '8px', background: formData.priority === type.val ? `${type.color}15` : 'transparent', color: formData.priority === type.val ? type.color : 'inherit' }}>
                        <input type="radio" name="priority" value={type.val} checked={formData.priority === type.val} onChange={handleChange} style={{ display: 'none' }} />
                        {type.icon} <span style={{ textTransform: 'capitalize', fontWeight: 600 }}>{type.val}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label className="required">Subject</label>
                  <input type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="Brief title for this announcement..." className={errors.subject ? 'error' : ''} />
                  {errors.subject && <span className="error-message">{errors.subject}</span>}
                </div>

                <div className="form-group">
                  <label className="required">Message Body</label>
                  <textarea name="message" value={formData.message} onChange={handleChange} rows="5" placeholder="Write your full announcement here..." className={errors.message ? 'error' : ''}></textarea>
                  {errors.message && <span className="error-message">{errors.message}</span>}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: LIFECYCLE */}
          {step === 3 && (
            <div className="form-section">
              <h3 className="section-title">Delivery & Lifecycle</h3>
              
              <div className="form-grid" style={{ gridTemplateColumns: '1fr' }}>
                <div className="form-group">
                  <label className="required">Delivery Schedule</label>
                  <div className="select-wrapper">
                    <select name="scheduleType" value={formData.scheduleType} onChange={handleChange}>
                      <option value="now">Dispatch Immediately</option>
                      <option value="schedule">Schedule for Later</option>
                    </select>
                    <ChevronDown size={18} className="select-arrow" />
                  </div>
                </div>

                {formData.scheduleType === 'schedule' && (
                  <div className="form-grid" style={{ gridTemplateColumns: '1fr 1fr', padding: '1rem', background: 'var(--bg-surface-alt)', borderRadius: '8px' }}>
                    <div className="form-group">
                      <label className="required">Date</label>
                      <input type="date" name="scheduleDate" value={formData.scheduleDate} onChange={handleChange} className={errors.scheduleDate ? 'error' : ''} />
                    </div>
                    <div className="form-group">
                      <label className="required">Time</label>
                      <input type="time" name="scheduleTime" value={formData.scheduleTime} onChange={handleChange} className={errors.scheduleTime ? 'error' : ''} />
                    </div>
                  </div>
                )}

                <div className="form-group" style={{ marginTop: '1rem' }}>
                  <label>Automatic Expiry (Optional)</label>
                  <input type="date" name="expiryDate" value={formData.expiryDate} onChange={handleChange} />
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Notification will automatically disappear from user inboxes after this date.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="modal-footer" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button type="button" className="btn-secondary" onClick={step === 1 ? onClose : prevStep}>
            {step === 1 ? 'Cancel' : 'Back'}
          </button>
          
          {step < 3 ? (
            <button type="button" className="btn-primary" onClick={nextStep}>
              Next Step
            </button>
          ) : (
            <button type="button" className="btn-primary" onClick={handleDispatch} style={{ background: 'var(--color-primary)' }}>
              <Send size={18} /> {formData.scheduleType === 'schedule' ? 'Schedule Broadcast' : 'Dispatch Now'}
            </button>
          )}
        </div>

      </div>
    </div>
  );
};

export default SendNotificationModal;
