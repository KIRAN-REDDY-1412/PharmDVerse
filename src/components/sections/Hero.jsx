import React from 'react';
import { ArrowRight, ShieldCheck, BrainCircuit, Users } from 'lucide-react';
import './Hero.css';

const Hero = ({ onLoginClick, onRegisterClick }) => {
  return (
    <section id="home" className="hero-section">
      <div className="container hero-container">
        <div className="hero-content animate-slide-up">
          <h1 className="hero-title">
            The Complete <span className="text-primary">Clinical Case</span> Management Platform for Pharm.D Education
          </h1>
          <p className="hero-description">
            PharmDVerse streamlines case collection, AI-powered SOAP analysis, and preceptor reviews in a secure, multi-college cloud platform. Built for the future of pharmacy education.
          </p>
          <div className="hero-buttons">
            <button className="btn btn-primary btn-lg" onClick={onRegisterClick}>
              Register College <ArrowRight size={20} />
            </button>
            <button className="btn btn-secondary btn-lg" onClick={onLoginClick}>
              College Login
            </button>
          </div>
          
          <div className="hero-trust">
            <p className="trust-title">Trusted for clinical excellence</p>
            <div className="trust-badges">
              <span className="badge"><ShieldCheck size={18} /> HIPAA Compliant</span>
              <span className="badge"><BrainCircuit size={18} /> AI-Powered</span>
              <span className="badge"><Users size={18} /> Multi-College</span>
            </div>
          </div>
        </div>

        <div className="hero-illustration animate-slide-up-delay-2">
          {/* Dashboard Illustration Mockup */}
          <div className="dashboard-mockup hover-lift">
            <div className="mockup-header">
              <div className="mockup-dots">
                <span></span><span></span><span></span>
              </div>
              <div className="mockup-url">pharmdverse.app/dashboard</div>
            </div>
            <div className="mockup-body">
              <div className="mockup-sidebar"></div>
              <div className="mockup-content">
                <div className="mockup-card top-card"></div>
                <div className="mockup-grid">
                  <div className="mockup-card"></div>
                  <div className="mockup-card"></div>
                  <div className="mockup-card"></div>
                </div>
                <div className="mockup-chart"></div>
              </div>
            </div>
            
            {/* Floating Elements for visual appeal */}
            <div className="floating-element ai-card animate-pulse">
              <BrainCircuit className="text-accent" size={24} />
              <div>
                <h4>AI Analysis Complete</h4>
                <p>SOAP Note Generated</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
