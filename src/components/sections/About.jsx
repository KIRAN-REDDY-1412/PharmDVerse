import React from 'react';
import { Target, Lightbulb, Zap, ShieldCheck } from 'lucide-react';
import './About.css';

const About = () => {
  return (
    <section id="about" className="about-section section-padding">
      <div className="container">
        <div className="about-grid">
          <div className="about-content animate-slide-in-left">
            <h2 className="section-title">Redefining Pharmacy Education</h2>
            <p className="about-description">
              PharmDVerse was built by educators and technologists who recognized the friction in clinical case management. We aim to bridge the gap between traditional paperwork and the future of AI-driven healthcare education.
            </p>
            
            <div className="mission-vision">
              <div className="mv-card">
                <Target className="text-primary mb-2" size={28} />
                <h3>Our Mission</h3>
                <p>To empower pharmacy colleges with intelligent tools that enhance clinical training and streamline preceptor workflows.</p>
              </div>
              <div className="mv-card">
                <Lightbulb className="text-accent mb-2" size={28} />
                <h3>Our Vision</h3>
                <p>A connected ecosystem where every clinical case contributes to a global standard of excellence in Pharm.D education.</p>
              </div>
            </div>
          </div>

          <div className="about-features animate-slide-in-right">
            <div className="about-feature-item card hover-lift">
              <Zap className="text-yellow" size={24} />
              <div>
                <h4>Future-Ready Architecture</h4>
                <p>Built on modern tech stacks ensuring fast, scalable, and reliable performance across multiple colleges.</p>
              </div>
            </div>
            
            <div className="about-feature-item card hover-lift">
              <ShieldCheck className="text-accent" size={24} />
              <div>
                <h4>Secure Cloud Platform</h4>
                <p>Enterprise-grade encryption protecting patient data, student records, and institutional IP.</p>
              </div>
            </div>
            
            <div className="about-feature-item card hover-lift">
              <Target className="text-primary" size={24} />
              <div>
                <h4>AI-Powered Education</h4>
                <p>Integrating artificial intelligence to provide instant feedback, analyze SOAP notes, and guide clinical reasoning.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
