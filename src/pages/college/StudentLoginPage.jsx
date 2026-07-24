import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ShieldAlert } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import '../../components/ui/CollegeLoginModal.css';

const StudentLoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    login('student');
    navigate('/student/dashboard');
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-main)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem' }}>
      
      <Link to="/" className="btn btn-secondary" style={{ position: 'absolute', top: '2rem', left: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <ArrowLeft size={16} /> Back to Home
      </Link>

      <div className="login-modal-content card animate-slide-up" style={{ width: '100%', maxWidth: '450px' }}>
        
        {/* Development Badge */}
        <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid var(--color-red)', borderRadius: 'var(--radius-md)', padding: '0.75rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
          <ShieldAlert className="text-red" size={20} style={{ color: 'var(--color-red)', flexShrink: 0 }} />
          <div>
            <span style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-red)', marginBottom: '0.25rem' }}>Development Mode</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Authentication is temporarily disabled for UI testing. Clicking Login will bypass validation.</span>
          </div>
        </div>

        <div className="login-header">
          <h2 className="login-title">Student Login</h2>
          <p className="login-subtitle">Access your STUDENT PORTAL.</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Roll Number / Username</label>
            <input 
              type="text" 
              id="username" 
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
              placeholder="e.g. Y26PHD0301" 
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              placeholder="••••••••" 
            />
          </div>

          <div className="login-options">
            <label className="remember-me">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>
            <a href="#" className="forgot-password">Forgot Password?</a>
          </div>

          <button type="submit" className="btn btn-primary w-full" style={{ padding: '0.875rem' }}>
            Login to Dashboard
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentLoginPage;
