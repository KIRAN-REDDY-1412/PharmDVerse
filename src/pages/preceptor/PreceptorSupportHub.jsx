import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  HelpCircle, BookOpen, MessageSquare, Phone, 
  Info, ChevronDown, ChevronRight, FileText, Send, 
  CheckCircle2, Paperclip 
} from 'lucide-react';
import PreceptorLayout from '../../components/preceptor/PreceptorLayout';

const FAQs = [
  {
    question: 'How do I review a Clinical Case?',
    answer: 'Navigate to "Clinical Cases" -> "Cases Under Review". Click "Review Case" on the case card to open the Documentation Review Hub. You can view all submitted modules in sequence.'
  },
  {
    question: 'How do I return a Clinical Case?',
    answer: 'After reviewing the required documentation modules, proceed to the "Final Review" page. Enter your Overall Remarks and click the "Return Case" button to send it back to the student for correction.'
  },
  {
    question: 'How do I approve a Clinical Case?',
    answer: 'After reviewing all available documentation modules and ensuring they meet requirements, navigate to the "Final Review" page. Enter your Overall Remarks and click the "Approve Case" button.'
  },
  {
    question: 'How do I update my profile?',
    answer: 'Navigate to "My Profile" from the sidebar. You can edit your Profile Photo, Email Address, and Mobile Number. Other institutional fields are read-only and managed by the College Admin.'
  },
  {
    question: 'How do I change my password?',
    answer: 'Navigate to "Settings" from the sidebar, and open the "Security Settings" tab. Enter your current password and your new password to securely update your credentials.'
  }
];

const PreceptorSupportHub = () => {
  const [activeTab, setActiveTab] = useState('quick-help');
  const [expandedFaq, setExpandedFaq] = useState(null);

  // Support Form State
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketCategory, setTicketCategory] = useState('General Inquiry');
  const [ticketDescription, setTicketDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState(null);

  const handleFaqToggle = (index) => {
    if (expandedFaq === index) {
      setExpandedFaq(null);
    } else {
      setExpandedFaq(index);
    }
  };

  const handleSubmitTicket = (e) => {
    e.preventDefault();
    if (!ticketSubject || !ticketDescription) return;

    setIsSubmitting(true);

    // Mock API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedTicket(`TKT-${Math.floor(10000 + Math.random() * 90000)}`);
      setTicketSubject('');
      setTicketDescription('');
      setTicketCategory('General Inquiry');
    }, 1200);
  };

  const resetForm = () => {
    setSubmittedTicket(null);
  };

  const tabStyle = (isActive) => ({
    display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem',
    cursor: 'pointer', borderRadius: '8px', transition: 'all 0.2s',
    backgroundColor: isActive ? 'rgba(11, 87, 208, 0.08)' : 'transparent',
    color: isActive ? 'var(--color-primary)' : 'var(--text-secondary)',
    fontWeight: isActive ? 600 : 500,
    borderLeft: isActive ? '4px solid var(--color-primary)' : '4px solid transparent'
  });

  const cardStyle = {
    backgroundColor: 'var(--bg-surface)',
    borderRadius: '12px',
    border: '1px solid var(--border-color)',
    padding: '2rem',
    boxShadow: '0 2px 12px rgba(0,0,0,0.02)'
  };

  return (
    <PreceptorLayout>
      <div className="preceptor-page" style={{ paddingBottom: '3rem' }}>
        
        <div className="page-header" style={{ marginBottom: '2rem' }}>
          <h1 className="page-title">Help & Support</h1>
          <div className="breadcrumbs" style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            <Link to="/preceptor/dashboard" className="breadcrumb-link" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>Dashboard</Link>
            <span className="breadcrumb-separator">&gt;</span>
            <span>Help & Support</span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '2rem', alignItems: 'start' }}>
          
          {/* Navigation Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', backgroundColor: 'var(--bg-surface)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <div onClick={() => setActiveTab('quick-help')} style={tabStyle(activeTab === 'quick-help')}>
              <HelpCircle size={20} /> Quick Help (FAQ)
            </div>
            <div onClick={() => setActiveTab('user-guide')} style={tabStyle(activeTab === 'user-guide')}>
              <BookOpen size={20} /> User Guide
            </div>
            <div onClick={() => setActiveTab('report-issue')} style={tabStyle(activeTab === 'report-issue')}>
              <MessageSquare size={20} /> Report an Issue
            </div>
            <div onClick={() => setActiveTab('contact')} style={tabStyle(activeTab === 'contact')}>
              <Phone size={20} /> Contact Information
            </div>
            <div onClick={() => setActiveTab('system-info')} style={tabStyle(activeTab === 'system-info')}>
              <Info size={20} /> System Information
            </div>
          </div>

          {/* Content Area */}
          <div>
            
            {/* 1. Quick Help */}
            {activeTab === 'quick-help' && (
              <div style={cardStyle}>
                <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <HelpCircle color="var(--color-primary)" /> Frequently Asked Questions
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {FAQs.map((faq, index) => (
                    <div key={index} style={{ border: '1px solid var(--border-color)', borderRadius: '8px', overflow: 'hidden' }}>
                      <div 
                        onClick={() => handleFaqToggle(index)}
                        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.25rem', backgroundColor: 'var(--bg-main)', cursor: 'pointer', fontWeight: 600, color: 'var(--text-primary)' }}
                      >
                        {faq.question}
                        {expandedFaq === index ? <ChevronDown size={18} color="var(--text-secondary)" /> : <ChevronRight size={18} color="var(--text-secondary)" />}
                      </div>
                      {expandedFaq === index && (
                        <div style={{ padding: '1rem 1.25rem', backgroundColor: 'var(--bg-surface)', color: 'var(--text-secondary)', lineHeight: 1.6, borderTop: '1px solid var(--border-color)' }}>
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 2. User Guide */}
            {activeTab === 'user-guide' && (
              <div style={cardStyle}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <h2 style={{ fontSize: '1.25rem', margin: 0, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <BookOpen color="var(--color-primary)" /> System Workflows
                  </h2>
                  <button disabled style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', backgroundColor: 'var(--bg-main)', border: '1px solid var(--border-color)', borderRadius: '6px', cursor: 'not-allowed', color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 600 }}>
                    <FileText size={16} /> Download Manual (PDF)
                  </button>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                  <div style={{ padding: '1.5rem', backgroundColor: 'var(--bg-main)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                    <h3 style={{ fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'rgba(11, 87, 208, 0.1)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 700 }}>1</span>
                      Documentation Review Process
                    </h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                      When a student submits a case, review each specific module via the Review Navigator sidebar. The system forces sequential or explicit review of all submitted forms before granting access to the Final Review.
                    </p>
                  </div>
                  <div style={{ padding: '1.5rem', backgroundColor: 'var(--bg-main)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                    <h3 style={{ fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'rgba(11, 87, 208, 0.1)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 700 }}>2</span>
                      Final Case Decisions
                    </h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                      Decisions are strictly centralized on the Final Review page. Approving a case locks the workflow for the student. Returning a case reopens it as a draft for student corrections.
                    </p>
                  </div>
                  <div style={{ padding: '1.5rem', backgroundColor: 'var(--bg-main)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                    <h3 style={{ fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'rgba(11, 87, 208, 0.1)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 700 }}>3</span>
                      Notification Center
                    </h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                      The bell icon aggregates workflow events automatically. Clicking a notification routes you directly to the relevant case. Unread notifications are highlighted until explicitly opened or marked as read.
                    </p>
                  </div>
                  <div style={{ padding: '1.5rem', backgroundColor: 'var(--bg-main)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                    <h3 style={{ fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'rgba(11, 87, 208, 0.1)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 700 }}>4</span>
                      Profile & Settings
                    </h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                      My Profile manages your contact information securely. Settings manages your password, visual appearance (Light/Dark mode), and active login sessions.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 3. Report an Issue */}
            {activeTab === 'report-issue' && (
              <div style={cardStyle}>
                <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <MessageSquare color="var(--color-primary)" /> Report a Technical Issue
                </h2>
                
                {submittedTicket ? (
                  <div style={{ textAlign: 'center', padding: '3rem 2rem', backgroundColor: '#f0fdf4', borderRadius: '8px', border: '1px solid #bbf7d0' }}>
                    <CheckCircle2 size={48} color="#16a34a" style={{ marginBottom: '1rem' }} />
                    <h3 style={{ fontSize: '1.25rem', color: '#166534', marginBottom: '0.5rem' }}>Support Request Submitted</h3>
                    <p style={{ color: '#15803d', marginBottom: '1.5rem' }}>
                      Your ticket has been recorded. The administration team will review it shortly.
                    </p>
                    <div style={{ display: 'inline-block', padding: '0.5rem 1rem', backgroundColor: '#dcfce3', borderRadius: '6px', fontWeight: 700, color: '#166534', marginBottom: '2rem' }}>
                      Ticket ID: {submittedTicket}
                    </div>
                    <div>
                      <button onClick={resetForm} style={{ padding: '0.75rem 1.5rem', backgroundColor: 'var(--color-primary)', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 600, cursor: 'pointer' }}>
                        Submit Another Request
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmitTicket} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: '600px' }}>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Issue Category</label>
                      <select 
                        value={ticketCategory} 
                        onChange={e => setTicketCategory(e.target.value)}
                        style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-main)', color: 'var(--text-primary)', fontSize: '0.95rem' }}
                      >
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Workflow Error">Workflow Error (Cannot approve/return case)</option>
                        <option value="Missing Data">Missing Data (Students or cases not showing)</option>
                        <option value="Account Access">Account Access / Password Issues</option>
                        <option value="Feature Request">Feature Request</option>
                      </select>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Subject Line</label>
                      <input 
                        type="text" 
                        required
                        value={ticketSubject}
                        onChange={e => setTicketSubject(e.target.value)}
                        placeholder="Brief summary of the issue..."
                        style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-main)', color: 'var(--text-primary)', fontSize: '0.95rem' }}
                      />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Detailed Description</label>
                      <textarea 
                        required
                        rows={5}
                        value={ticketDescription}
                        onChange={e => setTicketDescription(e.target.value)}
                        placeholder="Please provide steps to reproduce the error or additional context..."
                        style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-main)', color: 'var(--text-primary)', fontSize: '0.95rem', resize: 'vertical' }}
                      ></textarea>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Screenshot Attachment (Optional)</label>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', border: '1px dashed var(--border-color)', borderRadius: '6px', backgroundColor: 'var(--bg-main)' }}>
                        <Paperclip size={20} color="var(--text-secondary)" />
                        <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Click to upload or drag & drop an image</span>
                      </div>
                    </div>

                    <div style={{ marginTop: '0.5rem' }}>
                      <button 
                        type="submit"
                        disabled={isSubmitting || !ticketSubject || !ticketDescription}
                        style={{ 
                          padding: '0.75rem 1.5rem', backgroundColor: 'var(--color-primary)', 
                          color: 'white', border: 'none', borderRadius: '6px', fontWeight: 600, 
                          cursor: (isSubmitting || !ticketSubject || !ticketDescription) ? 'not-allowed' : 'pointer',
                          display: 'flex', alignItems: 'center', gap: '0.5rem', opacity: (isSubmitting || !ticketSubject || !ticketDescription) ? 0.7 : 1
                        }}
                      >
                        {isSubmitting ? 'Submitting...' : <><Send size={18} /> Submit Support Request</>}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}

            {/* 4. Contact Information */}
            {activeTab === 'contact' && (
              <div style={cardStyle}>
                <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Phone color="var(--color-primary)" /> Contact Administration
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem', maxWidth: '600px' }}>
                  
                  <div style={{ padding: '1.25rem', backgroundColor: 'var(--bg-main)', borderRadius: '8px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>ERP Administrator</span>
                      <span style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)' }}>Dr. Sarah Jenkins</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Support Email</span>
                      <a href="mailto:support@pharmdverse.edu" style={{ fontSize: '0.95rem', fontWeight: 500, color: 'var(--color-primary)', textDecoration: 'none' }}>support@pharmdverse.edu</a>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Support Hotline</span>
                      <a href="tel:+18005550199" style={{ fontSize: '0.95rem', fontWeight: 500, color: 'var(--color-primary)', textDecoration: 'none' }}>+1 (800) 555-0199</a>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Working Hours</span>
                      <span style={{ fontSize: '0.95rem', fontWeight: 500, color: 'var(--text-primary)' }}>Mon-Fri, 9:00 AM - 5:00 PM (EST)</span>
                    </div>
                  </div>
                  
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, padding: '1rem', backgroundColor: 'rgba(11, 87, 208, 0.05)', borderRadius: '8px', borderLeft: '4px solid var(--color-primary)' }}>
                    For critical system outages outside working hours, please use the <strong>Report an Issue</strong> form. An on-call technician will be notified immediately.
                  </p>

                </div>
              </div>
            )}

            {/* 5. System Information */}
            {activeTab === 'system-info' && (
              <div style={cardStyle}>
                <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Info color="var(--color-primary)" /> System Details
                </h2>
                
                <div style={{ maxWidth: '500px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', backgroundColor: 'var(--bg-main)', borderBottom: '1px solid var(--border-color)' }}>
                    <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)' }}>PharmDVerse Version</span>
                    <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>v2.4.0 (Enterprise)</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', backgroundColor: 'var(--bg-main)', borderBottom: '1px solid var(--border-color)' }}>
                    <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Build Revision</span>
                    <span style={{ fontSize: '0.95rem', fontWeight: 500, color: 'var(--text-primary)' }}>#8b39c2f</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', backgroundColor: 'var(--bg-main)', borderBottom: '1px solid var(--border-color)' }}>
                    <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Environment</span>
                    <span style={{ fontSize: '0.95rem', fontWeight: 500, color: '#16a34a' }}>Production (Live)</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', backgroundColor: 'var(--bg-main)' }}>
                    <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Last Updated</span>
                    <span style={{ fontSize: '0.95rem', fontWeight: 500, color: 'var(--text-primary)' }}>Oct 14, 2023, 03:00 AM UTC</span>
                  </div>
                </div>

                <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  © {new Date().getFullYear()} PharmDVerse Medical Systems. All rights reserved.
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </PreceptorLayout>
  );
};

export default PreceptorSupportHub;
