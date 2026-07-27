import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDatabase } from '../../context/DatabaseContext';
import { Building2, ArrowRight, ShieldCheck, MapPin, CheckCircle } from 'lucide-react';
import './Features.css'; // Reusing styling variables

const ActiveCollegesSection = () => {
  const navigate = useNavigate();
  const { getActiveColleges } = useDatabase();
  const activeColleges = getActiveColleges();

  return (
    <section id="active-colleges" className="features-section" style={{ backgroundColor: 'var(--bg-main)', padding: '4rem 0', borderTop: '1px solid var(--border-color)' }}>
      <div className="container">
        
        <div className="section-header text-center" style={{ marginBottom: '3rem' }}>
          <span className="section-badge" style={{ backgroundColor: 'rgba(37, 99, 235, 0.1)', color: 'var(--primary-color)', padding: '6px 16px', borderRadius: '20px', fontSize: '0.875rem', fontWeight: 600 }}>
            PARTNER INSTITUTIONS
          </span>
          <h2 className="section-title" style={{ marginTop: '1rem', fontSize: '2.25rem', fontWeight: 700 }}>
            Active Pharmacy Institutions
          </h2>
          <p className="section-description" style={{ color: 'var(--text-secondary)', maxWidth: '650px', margin: '0.5rem auto 0' }}>
            Select your college below to access your institution's dedicated portal.
          </p>
        </div>

        {activeColleges.length === 0 ? (
          <div className="card text-center" style={{ padding: '3rem', maxWidth: '600px', margin: '0 auto', backgroundColor: 'var(--surface-color)' }}>
            <Building2 size={48} color="var(--text-muted)" style={{ margin: '0 auto 1rem' }} />
            <h3>No Active Colleges Listed</h3>
            <p style={{ color: 'var(--text-secondary)' }}>No pharmacy colleges currently have an active subscription.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.75rem' }}>
            {activeColleges.map((college) => (
              <div 
                key={college.id} 
                className="card hover-lift" 
                style={{ 
                  backgroundColor: 'var(--surface-color)', 
                  borderRadius: '16px', 
                  border: '1px solid var(--border-color)',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justify: 'space-between',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onClick={() => navigate(`/${college.slug}`)}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <div style={{ width: '54px', height: '54px', borderRadius: '12px', backgroundColor: 'var(--primary-color)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1.25rem' }}>
                      {college.logo || college.name.substring(0, 3).toUpperCase()}
                    </div>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', fontWeight: 600, color: '#16a34a', backgroundColor: '#dcfce7', padding: '4px 10px', borderRadius: '12px' }}>
                      <CheckCircle size={12} /> Active Institution
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0 0 8px 0', color: 'var(--text-color)' }}>
                    {college.name}
                  </h3>

                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <MapPin size={14} color="var(--primary-color)" /> {college.address}
                  </p>

                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', margin: '0 0 20px 0', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {college.about || 'Premier Pharm.D institution delivering clinical excellence.'}
                  </p>
                </div>

                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--primary-color)' }}>
                    pharmdverse.com/{college.slug}
                  </span>
                  <button 
                    className="btn btn-primary"
                    style={{ padding: '8px 14px', fontSize: '0.85rem', borderRadius: '8px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                  >
                    Open Portal <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default ActiveCollegesSection;
