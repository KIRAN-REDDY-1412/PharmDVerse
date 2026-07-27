import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp, Mail, Phone, Clock, Globe } from 'lucide-react';

const FAQS = [
  {
    id: 1,
    question: 'How to create a Clinical Case?',
    answer: 'Navigate to "Clinical Cases" from the left sidebar and click on the "New Case" button. You will be required to fill out the Patient Profile Form first. Once saved, you can add optional forms like Patient Counselling or ADR.'
  },
  {
    id: 2,
    question: 'How to submit a Case?',
    answer: 'Once you have filled out the necessary documentation for your case, open the case details and click the "Submit Case" button. It will then be sent to your assigned preceptor for review.'
  },
  {
    id: 3,
    question: 'How to resubmit a Returned Case?',
    answer: 'If your preceptor returns a case, you will find it in your Case Library with a "Returned" status. Open it, read the preceptor comments, make the necessary corrections, and click "Resubmit".'
  },
  {
    id: 4,
    question: 'How to download PDF?',
    answer: 'Open any approved or submitted clinical case from your Case Library. In the top right corner of the case view, click the "Download PDF" button to generate a standardized report.'
  },
  {
    id: 5,
    question: 'How to change Password?',
    answer: 'Go to Settings > Security Settings. Enter your current password, your new password (ensuring it meets the strength requirements), confirm it, and click "Update Password".'
  },
  {
    id: 6,
    question: 'How to update Profile Photo?',
    answer: 'Go to Settings > Profile Settings. Click on "Upload New Photo" or "Replace Photo", select a JPG or PNG image under 2MB, and click "Save Changes".'
  }
];

const FaqContactTab = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState(null);

  const filteredFaqs = FAQS.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFaq = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>FAQ & Contact Support</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Find answers to common questions or reach out to our support teams.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3rem' }}>
        {/* FAQ Section */}
        <div>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Frequently Asked Questions</h3>
          
          <div className="faq-search">
            <Search className="faq-search-icon" size={20} />
            <input 
              type="text" 
              className="faq-search-input" 
              placeholder="Search for answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="faq-list">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map(faq => (
                <div key={faq.id} className="faq-item">
                  <div className="faq-question" onClick={() => toggleFaq(faq.id)}>
                    <span>{faq.question}</span>
                    {expandedId === faq.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                  {expandedId === faq.id && (
                    <div className="faq-answer">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                No FAQs found matching your search.
              </div>
            )}
          </div>
        </div>

        {/* Contact Support Section */}
        <div>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--text-primary)', borderTop: '1px solid var(--border-color)', paddingTop: '2rem' }}>Contact Support</h3>
          
          <div className="contact-grid">
            <div className="contact-card">
              <div className="contact-icon-wrapper">
                <Mail size={24} />
              </div>
              <div>
                <h4>ERP Support</h4>
                <p style={{ marginTop: '0.25rem', color: 'var(--color-primary)', fontWeight: 500 }}>support@pharmdverse.edu</p>
                <p style={{ fontSize: '0.8rem', marginTop: '0.25rem' }}>For technical & portal issues</p>
              </div>
            </div>

            <div className="contact-card">
              <div className="contact-icon-wrapper">
                <Globe size={24} />
              </div>
              <div>
                <h4>College Admin</h4>
                <p style={{ marginTop: '0.25rem', color: 'var(--color-primary)', fontWeight: 500 }}>admin@pharmacycollege.edu</p>
                <p style={{ fontSize: '0.8rem', marginTop: '0.25rem' }}>For academic queries</p>
              </div>
            </div>

            <div className="contact-card">
              <div className="contact-icon-wrapper">
                <Phone size={24} />
              </div>
              <div>
                <h4>Phone Support</h4>
                <p style={{ marginTop: '0.25rem', color: 'var(--color-primary)', fontWeight: 500 }}>+1 (800) 123-4567</p>
                <p style={{ fontSize: '0.8rem', marginTop: '0.25rem' }}>Mon-Fri, 9:00 AM - 5:00 PM</p>
              </div>
            </div>

            <div className="contact-card">
              <div className="contact-icon-wrapper">
                <Clock size={24} />
              </div>
              <div>
                <h4>Working Hours</h4>
                <p style={{ marginTop: '0.25rem', color: 'var(--color-primary)', fontWeight: 500 }}>9:00 AM - 5:00 PM</p>
                <p style={{ fontSize: '0.8rem', marginTop: '0.25rem' }}>Response time: ~24 hours</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqContactTab;
