import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import CollegeRegistrationForm from '../components/shared/CollegeRegistrationForm';

const RegisterCollegePage = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-main)', padding: '2rem 1rem' }}>
      <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
        
        <button 
          onClick={goHome} 
          className="btn btn-secondary" 
          style={{ marginBottom: '1.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'var(--surface-color)' }}
        >
          <ArrowLeft size={16} /> Back to Home
        </button>

        <div className="card animate-slide-up" style={{ padding: 0, overflow: 'hidden' }}>
          <div className="registration-header" style={{ padding: '24px', borderBottom: '1px solid var(--border-color)', backgroundColor: 'var(--surface-color)' }}>
            <h2 className="registration-title" style={{ margin: '0 0 8px 0', fontSize: '1.5rem', fontWeight: 700 }}>Register Your College</h2>
            <p className="registration-subtitle" style={{ margin: 0, color: 'var(--text-secondary)' }}>
              Join PharmDVerse and streamline clinical case management for your Pharm.D institution.
            </p>
          </div>

          <div style={{ padding: '24px', backgroundColor: 'var(--surface-color)' }}>
            <CollegeRegistrationForm mode="public" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterCollegePage;
