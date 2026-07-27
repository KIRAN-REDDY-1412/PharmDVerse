import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, ArrowLeft, Home } from 'lucide-react';
import './ComingSoon.css';

const ComingSoon = () => {
  const navigate = useNavigate();

  return (
    <div className="coming-soon-container">
      <div className="coming-soon-content">
        <div className="coming-soon-icon">
          <Clock size={40} strokeWidth={1.5} />
        </div>
        <h1 className="coming-soon-title">Coming Soon</h1>
        <p className="coming-soon-subtitle">
          We're working hard to bring you this feature. It's currently under active development and will be available in an upcoming release.
        </p>
        <div className="coming-soon-actions">
          <button className="btn btn-secondary" onClick={() => navigate(-1)} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ArrowLeft size={16} /> Go Back
          </button>
          <button className="btn btn-primary" onClick={() => navigate('/')} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Home size={16} /> Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
