import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Save, User, Briefcase, Activity, Shield, Camera } from 'lucide-react';
import PreceptorLayout from '../../components/preceptor/PreceptorLayout';
import { useAuth } from '../../context/AuthContext';
import { useDatabase } from '../../context/DatabaseContext';

const PreceptorProfileHub = () => {
  const { currentUser } = useAuth();
  const { users, updateUser, getPreceptorAssignedCases } = useDatabase();
  
  // Find full user data from db
  const user = users.find(u => u.id === currentUser?.id) || {};

  // Editable fields state
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [profilePhoto, setProfilePhoto] = useState('');

  // UI State
  const [isModified, setIsModified] = useState(false);
  const [saveStatus, setSaveStatus] = useState({ message: '', type: '' });

  // Initialize state
  useEffect(() => {
    if (user) {
      setEmail(user.email || '');
      setPhone(user.phone || user.mobileNumber || user.mobile || '');
      setProfilePhoto(user.profilePhoto || '');
      setIsModified(false);
    }
  }, [user]);

  // Check for modifications
  useEffect(() => {
    const originalEmail = user.email || '';
    const originalPhone = user.phone || user.mobileNumber || user.mobile || '';
    const originalPhoto = user.profilePhoto || '';

    if (email !== originalEmail || phone !== originalPhone || profilePhoto !== originalPhoto) {
      setIsModified(true);
    } else {
      setIsModified(false);
    }
  }, [email, phone, profilePhoto, user]);

  // Validation & Save
  const handleSave = () => {
    setSaveStatus({ message: '', type: '' });
    
    // Basic validations
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setSaveStatus({ message: 'Invalid email address format.', type: 'error' });
      return;
    }
    
    if (phone && !/^\d{10,}$/.test(phone.replace(/\D/g, ''))) {
      setSaveStatus({ message: 'Mobile number must contain at least 10 digits.', type: 'error' });
      return;
    }

    try {
      updateUser(user.id, {
        email,
        phone,
        mobileNumber: phone, // maintain backwards compatibility if multiple keys are used
        profilePhoto
      });
      setSaveStatus({ message: 'Profile updated successfully!', type: 'success' });
      setIsModified(false);
      
      // Clear success message after 3 seconds
      setTimeout(() => setSaveStatus({ message: '', type: '' }), 3000);
    } catch (error) {
      setSaveStatus({ message: 'Failed to update profile.', type: 'error' });
    }
  };

  // Metrics calculation
  const assignedCases = getPreceptorAssignedCases(user.id);
  const assignedStudentsCount = users.filter(u => u.preceptorId === user.id).length;
  
  const metrics = {
    totalStudents: assignedStudentsCount,
    totalCases: assignedCases.filter(c => c.status !== 'Draft').length,
    underReview: assignedCases.filter(c => ['Submitted', 'Assigned to Preceptor', 'Resubmitted', 'Under Review', 'Pending'].includes(c.status)).length,
    returned: assignedCases.filter(c => c.status === 'Returned').length,
    approved: assignedCases.filter(c => c.status === 'Approved').length
  };

  const getInitials = (name) => name ? name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2) : 'U';

  const cardStyle = {
    backgroundColor: 'var(--bg-surface)',
    borderRadius: '8px',
    border: '1px solid var(--border-color)',
    padding: '1.5rem',
    marginBottom: '1.5rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
  };

  const sectionTitleStyle = {
    fontSize: '1.1rem',
    fontWeight: 600,
    color: 'var(--text-primary)',
    marginBottom: '1.25rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    paddingBottom: '0.75rem',
    borderBottom: '1px solid var(--border-color)'
  };

  const fieldGroupStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.35rem',
    marginBottom: '1rem'
  };

  const labelStyle = {
    fontSize: '0.8rem',
    color: 'var(--text-secondary)',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  };

  const inputStyle = {
    padding: '0.6rem 0.75rem',
    borderRadius: '6px',
    border: '1px solid var(--border-color)',
    backgroundColor: 'var(--bg-main)',
    color: 'var(--text-primary)',
    fontSize: '0.95rem'
  };

  const valueStyle = {
    padding: '0.6rem 0.75rem',
    borderRadius: '6px',
    backgroundColor: 'rgba(0,0,0,0.02)',
    border: '1px dashed var(--border-color)',
    color: 'var(--text-primary)',
    fontSize: '0.95rem',
    fontWeight: 500
  };

  return (
    <PreceptorLayout>
      <div className="preceptor-page" style={{ paddingBottom: '3rem' }}>
        
        <div className="page-header" style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 className="page-title">My Profile</h1>
            <div className="breadcrumbs" style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              <Link to="/preceptor/dashboard" className="breadcrumb-link" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>Dashboard</Link>
              <span className="breadcrumb-separator">&gt;</span>
              <span>My Profile</span>
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {saveStatus.message && (
              <span style={{ fontSize: '0.9rem', fontWeight: 600, color: saveStatus.type === 'error' ? '#dc2626' : '#16a34a' }}>
                {saveStatus.message}
              </span>
            )}
            {isModified && (
              <button 
                onClick={handleSave}
                style={{ 
                  display: 'flex', alignItems: 'center', gap: '0.5rem',
                  padding: '0.75rem 1.25rem', backgroundColor: 'var(--color-primary)',
                  color: 'white', border: 'none', borderRadius: '6px', fontWeight: 600, cursor: 'pointer'
                }}
              >
                <Save size={16} /> Save Changes
              </button>
            )}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '1.5rem', alignItems: 'start' }}>
          
          {/* Main Content Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* Personal Information */}
            <div style={cardStyle}>
              <h2 style={sectionTitleStyle}><User size={20} color="var(--color-primary)" /> Personal Information</h2>
              
              <div style={{ display: 'flex', gap: '2rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', minWidth: '150px' }}>
                  <div style={{ width: '120px', height: '120px', borderRadius: '50%', overflow: 'hidden', backgroundColor: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '2.5rem', fontWeight: 700, border: '4px solid var(--bg-main)' }}>
                    {profilePhoto ? <img src={profilePhoto} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : getInitials(user.name || user.fullName)}
                  </div>
                  <div style={{ width: '100%' }}>
                    <div style={{ ...labelStyle, textAlign: 'center', marginBottom: '0.25rem' }}>Profile Photo URL</div>
                    <input type="text" value={profilePhoto} onChange={e => setProfilePhoto(e.target.value)} placeholder="https://..." style={{ ...inputStyle, width: '100%', fontSize: '0.75rem' }} />
                  </div>
                </div>

                <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                  <div style={fieldGroupStyle}>
                    <label style={labelStyle}>Full Name</label>
                    <div style={valueStyle}>{user.name || user.fullName || '-'}</div>
                  </div>
                  <div style={fieldGroupStyle}>
                    <label style={labelStyle}>Preceptor ID (User ID)</label>
                    <div style={valueStyle}>{user.id}</div>
                  </div>
                  <div style={fieldGroupStyle}>
                    <label style={labelStyle}>Email Address</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} />
                  </div>
                  <div style={fieldGroupStyle}>
                    <label style={labelStyle}>Mobile Number</label>
                    <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} style={inputStyle} />
                  </div>
                  <div style={fieldGroupStyle}>
                    <label style={labelStyle}>Gender</label>
                    <div style={valueStyle}>{user.gender || '-'}</div>
                  </div>
                  <div style={fieldGroupStyle}>
                    <label style={labelStyle}>Date of Birth</label>
                    <div style={valueStyle}>{user.dob || user.dateOfBirth || '-'}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div style={cardStyle}>
              <h2 style={sectionTitleStyle}><Briefcase size={20} color="var(--color-primary)" /> Professional Information</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <div style={fieldGroupStyle}>
                  <label style={labelStyle}>Qualification</label>
                  <div style={valueStyle}>{user.qualification || '-'}</div>
                </div>
                <div style={fieldGroupStyle}>
                  <label style={labelStyle}>Designation</label>
                  <div style={valueStyle}>{user.designation || '-'}</div>
                </div>
                <div style={fieldGroupStyle}>
                  <label style={labelStyle}>Department</label>
                  <div style={valueStyle}>{user.department || '-'}</div>
                </div>
                <div style={fieldGroupStyle}>
                  <label style={labelStyle}>College Name</label>
                  <div style={valueStyle}>{user.collegeName || 'PharmDVerse Medical College'}</div>
                </div>
                <div style={fieldGroupStyle}>
                  <label style={labelStyle}>Registration Number</label>
                  <div style={valueStyle}>{user.registrationNumber || '-'}</div>
                </div>
                <div style={fieldGroupStyle}>
                  <label style={labelStyle}>Date of Joining</label>
                  <div style={valueStyle}>{user.dateOfJoining || '-'}</div>
                </div>
                <div style={fieldGroupStyle}>
                  <label style={labelStyle}>Employment Status</label>
                  <div style={{ ...valueStyle, width: 'fit-content', backgroundColor: user.status === 'Inactive' ? '#fef2f2' : '#f0fdf4', color: user.status === 'Inactive' ? '#991b1b' : '#166534', border: `1px solid ${user.status === 'Inactive' ? '#fecaca' : '#bbf7d0'}` }}>
                    {user.status || 'Active'}
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Sidebar Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* Assigned Student Summary */}
            <div style={cardStyle}>
              <h2 style={sectionTitleStyle}><Activity size={20} color="var(--color-primary)" /> Work Summary</h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', backgroundColor: '#f8fafc', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Assigned Students</span>
                  <span style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-primary)' }}>{metrics.totalStudents}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', backgroundColor: '#f8fafc', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Total Clinical Cases</span>
                  <span style={{ fontSize: '1.2rem', fontWeight: 700, color: '#6d28d9' }}>{metrics.totalCases}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', backgroundColor: '#fff8e1', borderRadius: '6px', border: '1px solid #fde68a' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#92400e' }}>Cases Under Review</span>
                  <span style={{ fontSize: '1.2rem', fontWeight: 700, color: '#d97706' }}>{metrics.underReview}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', backgroundColor: '#fef2f2', borderRadius: '6px', border: '1px solid #fecaca' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#991b1b' }}>Returned Cases</span>
                  <span style={{ fontSize: '1.2rem', fontWeight: 700, color: '#dc2626' }}>{metrics.returned}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', backgroundColor: '#f0fdf4', borderRadius: '6px', border: '1px solid #bbf7d0' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#166534' }}>Approved Cases</span>
                  <span style={{ fontSize: '1.2rem', fontWeight: 700, color: '#16a34a' }}>{metrics.approved}</span>
                </div>
              </div>
            </div>

            {/* Account Information */}
            <div style={cardStyle}>
              <h2 style={sectionTitleStyle}><Shield size={20} color="var(--color-primary)" /> Account Security</h2>
              <div style={fieldGroupStyle}>
                <label style={labelStyle}>Preceptor ID (Username)</label>
                <div style={valueStyle}>{user.id}</div>
              </div>
              <div style={fieldGroupStyle}>
                <label style={labelStyle}>Account Created On</label>
                <div style={valueStyle}>{user.registrationDate || 'Aug 15, 2023'}</div>
              </div>
              <div style={fieldGroupStyle}>
                <label style={labelStyle}>Last Login</label>
                <div style={valueStyle}>
                  {user.lastLoginDate || new Date().toLocaleDateString()} {user.lastLoginTime || ''}
                </div>
              </div>
              <div style={fieldGroupStyle}>
                <label style={labelStyle}>Account Status</label>
                <div style={{ ...valueStyle, width: 'fit-content', backgroundColor: user.status === 'Inactive' ? '#fef2f2' : '#f0fdf4', color: user.status === 'Inactive' ? '#991b1b' : '#166534', border: `1px solid ${user.status === 'Inactive' ? '#fecaca' : '#bbf7d0'}` }}>
                  {user.status || 'Active'}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </PreceptorLayout>
  );
};

export default PreceptorProfileHub;
