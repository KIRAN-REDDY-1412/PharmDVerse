import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import '../../components/ui/CollegeLoginModal.css';

const CollegeLoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    collegeCode: '',
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.email || !formData.password) {
      setErrorMsg('Please enter both Email and Password.');
      return;
    }

    setLoading(true);
    try {
      const res = await login(formData.email, formData.password);
      if (res && res.token && (res.user?.role === 'admin' || res.user?.role === 'college_admin' || res.user?.role === 'superadmin')) {
        navigate('/college-admin/dashboard');
      } else {
        setErrorMsg('Invalid College Admin credentials.');
      }
    } catch (err) {
      setErrorMsg(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-main)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem' }}>
      
      <Link to="/" className="btn btn-secondary" style={{ position: 'absolute', top: '2rem', left: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <ArrowLeft size={16} /> Back to Home
      </Link>

      <div className="login-modal-content card animate-slide-up" style={{ width: '100%', maxWidth: '450px' }}>
        
        <div className="login-header">
          <h2 className="login-title">College Admin Login</h2>
          <p className="login-subtitle">Access your institution management portal.</p>
        </div>

        {errorMsg && (
          <div style={{ backgroundColor: '#fee2e2', color: '#b91c1c', padding: '0.75rem 1rem', borderRadius: '8px', marginBottom: '1.25rem', fontSize: '0.875rem', fontWeight: 500 }}>
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="collegeCode">College Code (Optional)</label>
            <input 
              type="text" 
              id="collegeCode" 
              value={formData.collegeCode}
              onChange={(e) => setFormData({...formData, collegeCode: e.target.value})}
              placeholder="e.g. AMR" 
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Official Admin Email</label>
            <input 
              type="email" 
              id="email" 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder="m.chang@utexas.edu" 
              required
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
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-full" disabled={loading} style={{ padding: '0.875rem', marginTop: '1rem' }}>
            {loading ? 'Logging in...' : 'Sign In to College Admin'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CollegeLoginPage;
