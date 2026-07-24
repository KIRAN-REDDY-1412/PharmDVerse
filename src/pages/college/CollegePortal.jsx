import React from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Stethoscope, ArrowLeft, Shield, UserCog, Users } from 'lucide-react';
import './CollegePortal.css';

const CollegePortal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const message = location.state?.message;

  return (
    <div className="college-portal-container">
      <Link to="/" className="btn btn-secondary" style={{ position: 'absolute', top: '2rem', left: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <ArrowLeft size={16} /> Back to Home
      </Link>

      {message && (
        <div style={{
          position: 'absolute', top: '2rem', left: '50%', transform: 'translateX(-50%)',
          backgroundColor: '#d1fae5', color: '#065f46', padding: '0.75rem 1.5rem',
          borderRadius: '8px', fontWeight: '500', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          display: 'flex', alignItems: 'center', gap: '0.5rem', zIndex: 50, animation: 'slide-down 0.3s ease-out'
        }}>
          {message}
        </div>
      )}

      <div className="portal-header animate-fade-in">
        <div className="portal-brand">
          <Stethoscope className="portal-brand-icon" size={32} />
          <span className="portal-brand-text">PharmDVerse</span>
        </div>
        <h1 className="portal-title">College Portal</h1>
        <p className="portal-subtitle">Select your login portal to continue.</p>
      </div>

      <div className="portal-cards-grid">
        {/* Card 1: College Admin */}
        <div className="portal-card animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <div className="portal-card-icon-wrapper">
            <Shield size={40} />
          </div>
          <h2 className="portal-card-title">College Admin</h2>
          <p className="portal-card-description">
            Manage students, preceptors, academics, clinical cases, and reports.
          </p>
          <button 
            onClick={() => navigate('/college-login')} 
            className="btn btn-primary portal-card-btn"
          >
            Admin Login
          </button>
        </div>

        {/* Card 2: Preceptor */}
        <div className="portal-card animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="portal-card-icon-wrapper">
            <UserCog size={40} />
          </div>
          <h2 className="portal-card-title">Preceptor</h2>
          <p className="portal-card-description">
            Review assigned students, supervise clinical cases, provide evaluations, and monitor progress.
          </p>
          <button 
            onClick={() => navigate('/preceptor-login')} 
            className="btn btn-primary portal-card-btn"
          >
            Preceptor Login
          </button>
        </div>

        {/* Card 3: Student */}
        <div className="portal-card animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <div className="portal-card-icon-wrapper">
            <Users size={40} />
          </div>
          <h2 className="portal-card-title">Student</h2>
          <p className="portal-card-description">
            Submit clinical cases, view feedback, track progress, and access academic information.
          </p>
          <button 
            onClick={() => navigate('/student-login')} 
            className="btn btn-primary portal-card-btn"
          >
            Student Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default CollegePortal;
