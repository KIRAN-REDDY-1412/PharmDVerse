import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  return (
    <section id="contact" className="contact-section section-padding">
      <div className="container">
        <div className="text-center animate-slide-up">
          <h2 className="section-title">Get in Touch</h2>
          <p className="section-subtitle">
            Have questions about PharmDVerse or want to schedule a demo? Our team is ready to help.
          </p>
        </div>

        <div className="contact-grid">
          <div className="contact-info card animate-slide-in-left">
            <h3 className="contact-info-title">Contact Information</h3>
            <p className="contact-info-desc">
              Fill out the form and our team will get back to you within 24 hours.
            </p>

            <div className="info-items">
              <div className="info-item">
                <Mail className="text-primary" size={24} />
                <div>
                  <h4>Email</h4>
                  <p>support@pharmdverse.app</p>
                </div>
              </div>
              
              <div className="info-item">
                <Phone className="text-primary" size={24} />
                <div>
                  <h4>Phone</h4>
                  <p>+1 (800) 555-0198</p>
                </div>
              </div>
              
              <div className="info-item">
                <MapPin className="text-primary" size={24} />
                <div>
                  <h4>Office Address</h4>
                  <p>123 Education Way, Suite 400<br/>San Francisco, CA 94105</p>
                </div>
              </div>
            </div>

              <div className="info-item">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-surface-alt)', width: '40px', height: '40px', borderRadius: '50%' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                </div>
                <div>
                  <h4>Support Hours</h4>
                  <p>Mon-Fri, 9:00 AM - 6:00 PM EST</p>
                </div>
              </div>

              <div className="info-item">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-surface-alt)', width: '40px', height: '40px', borderRadius: '50%' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M22 11.08V12a10 10 10 0 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                </div>
                <div>
                  <h4>Response Time</h4>
                  <p>Usually within 24 hours</p>
                </div>
              </div>
          </div>

          <div className="contact-form-container card animate-slide-in-right">
            <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input type="text" id="name" placeholder="Dr. Jane Smith" />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" placeholder="jane@college.edu" />
              </div>
              
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input type="text" id="subject" placeholder="Demo Request" />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" rows="4" placeholder="How can we help your college?"></textarea>
              </div>
              
              <button type="submit" className="btn btn-primary w-full">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
