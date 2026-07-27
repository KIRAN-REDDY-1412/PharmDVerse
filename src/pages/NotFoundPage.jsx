import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Stethoscope, ArrowLeft, Home, HelpCircle } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-main)' }}>
      <Navbar />
      <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem 1rem' }}>
        <div style={{ 
          maxWidth: '540px', 
          width: '100%', 
          padding: '3rem 2rem', 
          backgroundColor: 'var(--surface-color)', 
          borderRadius: '16px', 
          border: '1px solid var(--border-color)', 
          textAlign: 'center',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)'
        }}>
          <div style={{ 
            width: '72px', 
            height: '72px', 
            borderRadius: '50%', 
            backgroundColor: 'rgba(139, 92, 246, 0.1)', 
            color: 'var(--primary-color)', 
            display: 'flex', 
            alignItems: 'center', 
            justify: 'center', 
            margin: '0 auto 1.5rem' 
          }}>
            <Stethoscope size={36} />
          </div>

          <h1 style={{ fontSize: '3rem', fontWeight: 800, margin: '0 0 0.5rem 0', color: 'var(--primary-color)' }}>
            404
          </h1>

          <h2 style={{ fontSize: '1.4rem', fontWeight: 700, margin: '0 0 1rem 0', color: 'var(--text-color)' }}>
            Page Not Found
          </h2>

          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, margin: '0 0 2rem 0' }}>
            The page or clinical module route you are attempting to access does not exist or may have been relocated.
          </p>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-secondary" onClick={() => navigate(-1)} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ArrowLeft size={16} /> Go Back
            </button>

            <button className="btn btn-primary" onClick={() => navigate('/')} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Home size={16} /> PharmDVerse Home
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFoundPage;
