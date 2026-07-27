import React from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useDatabase } from '../context/DatabaseContext';
import { useAuth } from '../context/AuthContext';
import { 
  Building2, Shield, User, GraduationCap, MapPin, Phone, 
  Mail, AlertCircle, ArrowLeft, ExternalLink, Award, CheckCircle2, Lock, Eye
} from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const CollegeLandingPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { getCollegeBySlug, subscriptions } = useDatabase();
  const { setCurrentUser } = useAuth() || {};

  const queryParams = new URLSearchParams(location.search);
  const isPreviewMode = queryParams.get('preview') === 'true';

  const rawCollege = getCollegeBySlug(slug || '');
  const activeContent = isPreviewMode ? (rawCollege?.landingPageDraft || rawCollege) : (rawCollege?.landingPageContent || rawCollege);
  const college = rawCollege ? { ...rawCollege, ...activeContent } : null;

  // If college does not exist at all in system
  if (!college) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-main)' }}>
        <Navbar />
        <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem 1rem' }}>
          <div className="card text-center" style={{ maxWidth: '500px', width: '100%', padding: '2.5rem', backgroundColor: 'var(--surface-color)', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
            <Building2 size={48} color="var(--text-muted)" style={{ margin: '0 auto 1rem' }} />
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Institution Not Found</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              No pharmacy college found for address "<strong>/{slug}</strong>".
            </p>
            <button className="btn btn-primary" onClick={() => navigate('/')}>
              <ArrowLeft size={16} /> Return to PharmDVerse Home
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Check Subscription Status for Condition 7
  const colSub = subscriptions?.find(s => s.collegeId === college.id);
  const isExpired = college.status === 'expired' || (colSub && colSub.status === 'Expired');

  // Condition 7: Subscription Expired View
  if (isExpired) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-main)' }}>
        <Navbar />
        <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem 1rem' }}>
          <div className="card text-center" style={{ maxWidth: '560px', width: '100%', padding: '3rem 2rem', backgroundColor: 'var(--surface-color)', borderRadius: '16px', border: '2px solid #ef4444', boxShadow: '0 10px 30px rgba(239, 68, 68, 0.1)' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#fee2e2', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
              <AlertCircle size={36} />
            </div>
            
            <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#b91c1c', margin: '0 0 12px 0' }}>
              Subscription Expired
            </h2>

            <p style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-color)', margin: '0 0 16px 0' }}>
              {college.name}
            </p>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, margin: '0 0 24px 0' }}>
              Your institution's subscription has expired. Please contact your administrator.
            </p>

            <div style={{ backgroundColor: '#fef2f2', padding: '12px 16px', borderRadius: '8px', border: '1px solid #fca5a5', color: '#991b1b', fontSize: '0.85rem', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Lock size={16} />
              <span>Access to clinical ERP modules, student cases, and preceptor reviews is blocked. Institution data is preserved securely.</span>
            </div>

            <button className="btn btn-secondary" onClick={() => navigate('/')} style={{ margin: '0 auto' }}>
              <ArrowLeft size={16} /> Back to Active Institutions
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Helper for portal button click
  const handlePortalLogin = (role) => {
    // Navigate to appropriate login page pre-scoped for this college
    if (role === 'admin') navigate(`/college-login?collegeId=${college.id}`);
    if (role === 'preceptor') navigate(`/preceptor-login?collegeId=${college.id}`);
    if (role === 'student') navigate(`/student-login?collegeId=${college.id}`);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-main)' }}>
      
      {/* Condition 9: Preview Mode Banner */}
      {isPreviewMode && (
        <div style={{ backgroundColor: '#fef3c7', borderBottom: '1px solid #fde047', color: '#92400e', padding: '10px 16px', textAlign: 'center', fontWeight: 700, fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', zIndex: 1000 }}>
          <Eye size={18} />
          <span>LANDING PAGE PREVIEW MODE — You are viewing an unpublished draft. Changes are not live until Published.</span>
        </div>
      )}

      {/* College Customized Header */}
      <header style={{ backgroundColor: 'var(--surface-color)', borderBottom: '1px solid var(--border-color)', sticky: 'top', zIndex: 100 }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '10px', backgroundColor: 'var(--primary-color)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1.2rem' }}>
              {college.logo}
            </div>
            <div>
              <h1 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-color)' }}>
                {college.name}
              </h1>
              <span style={{ fontSize: '0.75rem', color: 'var(--primary-color)', fontWeight: 600 }}>
                PharmDVerse Authorized Institution • {college.domain}
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="btn btn-secondary" onClick={() => navigate('/')} style={{ fontSize: '0.85rem' }}>
              <ArrowLeft size={14} /> Main Portal
            </button>
          </div>
        </div>
      </header>

      <main style={{ flex: 1 }}>
        
        {/* Banner Section */}
        <section style={{ 
          background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)', 
          color: '#fff', 
          padding: '4rem 1rem', 
          textAlign: 'center',
          position: 'relative'
        }}>
          <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
            <span style={{ backgroundColor: 'rgba(255,255,255,0.2)', padding: '6px 16px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Official Clinical Rotations & Case Repository
            </span>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginTop: '1rem', marginBottom: '1rem', lineHeight: 1.2 }}>
              {college.bannerText || `Welcome to ${college.name}`}
            </h1>
            <p style={{ fontSize: '1.1rem', opacity: 0.9, maxWidth: '700px', margin: '0 auto 2.5rem' }}>
              Access student clinical documentation, preceptor SOAP reviews, and hospital rotation records.
            </p>

            {/* THREE LOGIN BUTTONS (Condition 6) */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', maxWidth: '780px', margin: '0 auto' }}>
              
              <button 
                onClick={() => handlePortalLogin('admin')}
                style={{ 
                  backgroundColor: '#ffffff', 
                  color: '#1e3a8a', 
                  padding: '16px', 
                  borderRadius: '12px', 
                  border: 'none',
                  fontWeight: 700,
                  fontSize: '1rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justify: 'center',
                  gap: '10px',
                  boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
                  transition: 'transform 0.2s ease'
                }}
              >
                <Shield size={20} color="#1e3a8a" />
                College Admin Login
              </button>

              <button 
                onClick={() => handlePortalLogin('preceptor')}
                style={{ 
                  backgroundColor: '#059669', 
                  color: '#ffffff', 
                  padding: '16px', 
                  borderRadius: '12px', 
                  border: 'none',
                  fontWeight: 700,
                  fontSize: '1rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justify: 'center',
                  gap: '10px',
                  boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
                  transition: 'transform 0.2s ease'
                }}
              >
                <User size={20} color="#ffffff" />
                Preceptor Login
              </button>

              <button 
                onClick={() => handlePortalLogin('student')}
                style={{ 
                  backgroundColor: '#d97706', 
                  color: '#ffffff', 
                  padding: '16px', 
                  borderRadius: '12px', 
                  border: 'none',
                  fontWeight: 700,
                  fontSize: '1rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justify: 'center',
                  gap: '10px',
                  boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
                  transition: 'transform 0.2s ease'
                }}
              >
                <GraduationCap size={20} color="#ffffff" />
                Student Login
              </button>

            </div>
          </div>
        </section>

        {/* Content Section: About & Principal Message */}
        <section style={{ padding: '4rem 1rem' }}>
          <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            
            {/* About College */}
            <div className="card" style={{ padding: '2rem', backgroundColor: 'var(--surface-color)', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--primary-color)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Building2 size={20} /> About {college.name}
              </h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.95rem' }}>
                {college.about}
              </p>
            </div>

            {/* Principal Message */}
            <div className="card" style={{ padding: '2rem', backgroundColor: 'var(--surface-color)', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--primary-color)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Award size={20} /> Leadership Message
              </h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.95rem', italic: 'true' }}>
                "{college.principalMessage}"
              </p>
              <div style={{ marginTop: '16px', fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-color)' }}>
                — Office of the Principal & Head of Clinical Pharmacy
              </div>
            </div>

          </div>
        </section>

        {/* Campus Images & Contact Details */}
        <section style={{ backgroundColor: 'var(--surface-color)', borderTop: '1px solid var(--border-color)', padding: '4rem 1rem' }}>
          <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
            
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem', textAlign: 'center', color: 'var(--text-color)' }}>
              Campus Facilities & Clinical Affiliations
            </h2>

            {college.campusImages && college.campusImages.length > 0 && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                {college.campusImages.map((img, idx) => (
                  <div key={idx} style={{ borderRadius: '12px', overflow: 'hidden', height: '200px', border: '1px solid var(--border-color)' }}>
                    <img src={img} alt={`${college.name} Campus ${idx+1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                ))}
              </div>
            )}

            {/* Contact Info Footer Block */}
            <div style={{ backgroundColor: 'var(--bg-main)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--border-color)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
              <div>
                <div style={{ fontWeight: 600, marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <MapPin size={16} color="var(--primary-color)" /> Campus Address
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{college.address}</div>
              </div>

              <div>
                <div style={{ fontWeight: 600, marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Mail size={16} color="var(--primary-color)" /> Email Contact
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{college.email}</div>
              </div>

              <div>
                <div style={{ fontWeight: 600, marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Phone size={16} color="var(--primary-color)" /> Phone Number
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{college.phone}</div>
              </div>
            </div>

          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default CollegeLandingPage;
