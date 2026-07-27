import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ShieldAlert } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useDatabase } from '../../context/DatabaseContext';
import '../../components/ui/CollegeLoginModal.css';

const PreceptorLoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const { login } = useAuth();
  const { users } = useDatabase();
  const [errorMsg, setErrorMsg] = useState('');

  const IS_DEV_MODE = true;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    
    if (IS_DEV_MODE) {
      console.log('Development Mode: Bypassing authentication validation.');
      const defaultPreceptor = users.find(u => u.role === 'preceptor' && u.status !== 'Inactive');
      if (defaultPreceptor) {
        login(defaultPreceptor);
        navigate('/preceptor/dashboard');
        return;
      }
    }
    
    // Find preceptor by ID and password
    const preceptor = users.find(u => u.id === formData.username && u.role === 'preceptor' && u.password === formData.password);
    
    if (!preceptor) {
      setErrorMsg('Invalid Employee ID or Password.');
      return;
    }
    
    if (preceptor.status === 'Inactive') {
      setErrorMsg('Your account is currently Inactive. Please contact the College Administrator.');
      return;
    }

    login(preceptor);
    navigate('/preceptor/dashboard');
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-main)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem' }}>
      
      <Link to="/" className="btn btn-secondary" style={{ position: 'absolute', top: '2rem', left: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <ArrowLeft size={16} /> Back to Home
      </Link>

      <div className="login-modal-content card animate-slide-up" style={{ width: '100%', maxWidth: '450px' }}>
        


        <div className="login-header">
          <h2 className="login-title">Preceptor Login</h2>
          <p className="login-subtitle">Access your PRECEPTOR PORTAL.</p>
        </div>

        {errorMsg && (
          <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', borderRadius: '6px', padding: '0.75rem', marginBottom: '1rem', fontSize: '0.85rem', color: '#991b1b', fontWeight: 500 }}>
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Employee ID / Username</label>
            <input 
              type="text" 
              id="username" 
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
              placeholder="e.g. PRE001" 
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
            <a href="/coming-soon" className="forgot-password">Forgot Password?</a>
          </div>

          <button type="submit" className="btn btn-primary w-full" style={{ padding: '0.875rem' }}>
            Login to Dashboard
          </button>
        </form>
      </div>
    </div>
  );
};

export default PreceptorLoginPage;
