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

            {/* Placeholder for Social Media */}
            <div className="social-placeholder">
              <span className="social-icon"></span>
              <span className="social-icon"></span>
              <span className="social-icon"></span>
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
