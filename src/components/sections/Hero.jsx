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
              Select Active College
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
              <div className="mockup-sidebar">
                <div className="mockup-menu-item active"></div>
                <div className="mockup-menu-item"></div>
                <div className="mockup-menu-item"></div>
              </div>
              <div className="mockup-content" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ width: '40%', height: '1.5rem', background: 'var(--border-color)', borderRadius: '4px' }}></div>
                  <div style={{ width: '20%', height: '2rem', background: 'var(--color-primary)', borderRadius: '6px' }}></div>
                </div>
                <div className="mockup-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                  <div className="mockup-card" style={{ background: 'var(--bg-surface)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)', height: '80px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div style={{ width: '60%', height: '10px', background: 'var(--border-color)', borderRadius: '4px' }}></div>
                    <div style={{ width: '30%', height: '20px', background: 'var(--color-primary)', borderRadius: '4px' }}></div>
                  </div>
                  <div className="mockup-card" style={{ background: 'var(--bg-surface)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)', height: '80px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div style={{ width: '60%', height: '10px', background: 'var(--border-color)', borderRadius: '4px' }}></div>
                    <div style={{ width: '30%', height: '20px', background: 'var(--color-success)', borderRadius: '4px' }}></div>
                  </div>
                  <div className="mockup-card" style={{ background: 'var(--bg-surface)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)', height: '80px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div style={{ width: '60%', height: '10px', background: 'var(--border-color)', borderRadius: '4px' }}></div>
                    <div style={{ width: '30%', height: '20px', background: 'var(--color-warning)', borderRadius: '4px' }}></div>
                  </div>
                </div>
                <div className="mockup-chart" style={{ flex: 1, background: 'var(--bg-surface)', borderRadius: '8px', border: '1px solid var(--border-color)', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '60%', background: 'linear-gradient(0deg, rgba(79,70,229,0.1) 0%, rgba(255,255,255,0) 100%)' }}></div>
                  <svg viewBox="0 0 100 30" style={{ position: 'absolute', bottom: 0, width: '100%', height: '60%', stroke: 'var(--color-primary)', strokeWidth: 2, fill: 'none' }}>
                    <path d="M0 30 L10 20 L20 25 L30 10 L40 15 L50 5 L60 12 L70 2 L80 18 L90 8 L100 20" />
                  </svg>
                </div>
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
