import React, { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { useDatabase } from '../../context/DatabaseContext';
import { 
  ArrowLeft, Edit, Users, CreditCard, BarChart2, Shield,
  Building2, MapPin, Phone, User, CheckCircle, Activity, Globe,
  Calendar, FileText, Database, Layout, Save, Eye, Send, Clock,
  AlertTriangle, Image, MessageSquare, ExternalLink, RefreshCw
} from 'lucide-react';
import './ViewCollege.css';

const ViewCollege = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { 
    colleges, subscriptions, updateCollegeStatus, 
    publishCollegeLandingPage, updateCollegeLandingPageDraft 
  } = useDatabase();

  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'landing_page' | 'timeline'
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');

  const college = (colleges || []).find(c => c.id === id || c.slug === id) || colleges[0];
  const collegeSub = (subscriptions || []).find(s => s.collegeId === college?.id);

  // Form State for Landing Page Settings (Condition 9)
  const [landingForm, setLandingForm] = useState({
    name: college?.name || '',
    logo: college?.logo || '',
    bannerText: college?.bannerText || '',
    principalMessage: college?.principalMessage || '',
    principalPhoto: college?.principalPhoto || '',
    about: college?.about || '',
    email: college?.email || '',
    phone: college?.phone || '',
    website: college?.website || `https://${college?.slug}.pharmdverse.com`,
    footerText: college?.footerText || `© 2026 ${college?.name}. All Rights Reserved.`,
    facebook: college?.socialLinks?.facebook || '',
    twitter: college?.socialLinks?.twitter || '',
    linkedin: college?.socialLinks?.linkedin || '',
    campusImagesStr: (college?.campusImages || []).join('\n')
  });

  if (!college) {
    return (
      <AdminLayout>
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <h2>College Not Found</h2>
          <button className="btn btn-primary" onClick={() => navigate('/super-admin/college-management')}>
            Return to College List
          </button>
        </div>
      </AdminLayout>
    );
  }

  const handleLandingFormChange = (e) => {
    const { name, value } = e.target;
    setLandingForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveDraft = () => {
    const campusImages = landingForm.campusImagesStr
      .split('\n')
      .map(url => url.trim())
      .filter(url => url.length > 0);

    const draftData = {
      ...landingForm,
      campusImages,
      socialLinks: {
        facebook: landingForm.facebook,
        twitter: landingForm.twitter,
        linkedin: landingForm.linkedin
      }
    };

    updateCollegeLandingPageDraft(college.id, draftData);
    setSaveSuccessMsg('Draft saved successfully! Click "Preview" to inspect before publishing.');
    setTimeout(() => setSaveSuccessMsg(''), 4000);
  };

  const handlePublishLandingPage = () => {
    const campusImages = landingForm.campusImagesStr
      .split('\n')
      .map(url => url.trim())
      .filter(url => url.length > 0);

    const publishedData = {
      ...landingForm,
      campusImages,
      socialLinks: {
        facebook: landingForm.facebook,
        twitter: landingForm.twitter,
        linkedin: landingForm.linkedin
      }
    };

    publishCollegeLandingPage(college.id, publishedData);
    setSaveSuccessMsg('🎉 Institution Landing Page Published Live!');
    setTimeout(() => setSaveSuccessMsg(''), 4000);
  };

  const handlePreviewLandingPage = () => {
    window.open(`/${college.slug}?preview=true`, '_blank');
  };

  const handleStatusChange = (newStatus) => {
    updateCollegeStatus(college.id, newStatus, `Super Admin updated lifecycle status to ${newStatus}`);
  };

  const getLifecycleStatusBadge = (statusStr) => {
    const s = (statusStr || 'active').toLowerCase();
    if (s === 'active') return <span className="status-badge success"><CheckCircle size={14}/> Active</span>;
    if (s === 'pending_approval' || s === 'pending approval') return <span className="status-badge warning"><Clock size={14}/> Pending Approval</span>;
    if (s === 'approved') return <span className="status-badge success"><CheckCircle size={14}/> Approved</span>;
    if (s === 'subscription_pending' || s === 'subscription pending') return <span className="status-badge warning"><CreditCard size={14}/> Subscription Pending</span>;
    if (s === 'expired' || s === 'subscription expired') return <span className="status-badge danger"><AlertTriangle size={14}/> Subscription Expired</span>;
    if (s === 'suspended') return <span className="status-badge danger"><Shield size={14}/> Suspended</span>;
    if (s === 'archived') return <span className="status-badge neutral"><Database size={14}/> Archived</span>;
    return <span className="status-badge neutral">{statusStr}</span>;
  };

  return (
    <AdminLayout>
      <div className="view-college-container">
        
        {/* Command Bar */}
        <div className="college-command-bar">
          <div className="college-header-info">
            <button className="icon-btn-small" onClick={() => navigate('/super-admin/college-management')} style={{ marginRight: '8px' }}>
              <ArrowLeft size={20} />
            </button>
            <div className="college-logo-large">{college.logo}</div>
            <div>
              <h1 className="college-title">{college.name}</h1>
              <div className="college-meta">
                <span>ID: {college.id}</span>
                {getLifecycleStatusBadge(college.status)}
                <span><Globe size={14}/> pharmdverse.com/{college.slug}</span>
              </div>
            </div>
          </div>

          {/* Condition 10.A: Lifecycle Status Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Lifecycle Status:</span>
            <select 
              className="form-select"
              value={college.status}
              onChange={(e) => handleStatusChange(e.target.value)}
              style={{ padding: '6px 12px', fontSize: '0.85rem', fontWeight: 600, width: 'auto' }}
            >
              <option value="pending_approval">Pending Approval</option>
              <option value="approved">Approved</option>
              <option value="subscription_pending">Subscription Pending</option>
              <option value="active">Active</option>
              <option value="expired">Subscription Expired</option>
              <option value="suspended">Suspended</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>

        {/* Action Bar (Navigation within college) */}
        <div className="action-bar" style={{ display: 'flex', gap: '8px', borderBottom: '1px solid var(--border-color)', marginBottom: '24px' }}>
          <button 
            className={`action-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <Building2 size={16}/> Overview
          </button>

          <button 
            className={`action-btn ${activeTab === 'landing_page' ? 'active' : ''}`}
            onClick={() => setActiveTab('landing_page')}
          >
            <Layout size={16}/> Landing Page Settings (Condition 9)
          </button>

          <button 
            className={`action-btn ${activeTab === 'timeline' ? 'active' : ''}`}
            onClick={() => setActiveTab('timeline')}
          >
            <Activity size={16}/> Activity Timeline (Condition 10.B)
          </button>
        </div>

        {saveSuccessMsg && (
          <div style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', color: '#166534', padding: '12px 16px', borderRadius: '8px', marginBottom: '20px', fontSize: '0.9rem', fontWeight: 600 }}>
            {saveSuccessMsg}
          </div>
        )}

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="dashboard-grid">
            
            {/* College Information */}
            <div className="dashboard-card col-span-2">
              <div className="card-header">
                <h2 className="card-title"><Building2 size={20}/> College Profile Information</h2>
              </div>
              <div className="dashboard-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                <div className="info-list">
                  <div className="info-row"><span className="info-label">College ID</span><span className="info-value">{college.id}</span></div>
                  <div className="info-row"><span className="info-label">Domain Slug</span><span className="info-value">/{college.slug}</span></div>
                  <div className="info-row"><span className="info-label">Official Domain</span><span className="info-value">{college.domain || 'N/A'}</span></div>
                  <div className="info-row"><span className="info-label">Registered Date</span><span className="info-value">{college.registeredDate}</span></div>
                </div>
                <div className="info-list">
                  <div className="info-row"><span className="info-label">Address</span><span className="info-value">{college.address || 'N/A'}</span></div>
                  <div className="info-row"><span className="info-label">Official Email</span><span className="info-value">{college.email}</span></div>
                  <div className="info-row"><span className="info-label">Official Phone</span><span className="info-value">{college.phone}</span></div>
                  <div className="info-row"><span className="info-label">Storage Used</span><span className="info-value">{college.storageUsed || '0 GB'} / {college.storageLimit || '100 GB'}</span></div>
                </div>
              </div>
            </div>

            {/* Subscription Snippet */}
            <div className="dashboard-card">
              <div className="card-header">
                <h2 className="card-title"><CreditCard size={20}/> Subscription</h2>
                <span className="status-badge active" style={{ fontSize: '0.85rem' }}>{collegeSub?.plan || college.plan || 'Standard'}</span>
              </div>
              <div className="info-list">
                <div className="info-row"><span className="info-label">Status</span><span className="info-value">{collegeSub?.status || 'Active'}</span></div>
                <div className="info-row"><span className="info-label">Start Date</span><span className="info-value">{collegeSub?.startDate || college.startDate || 'N/A'}</span></div>
                <div className="info-row"><span className="info-label">Expiry Date</span><span className="info-value">{collegeSub?.expiryDate || college.expiryDate || 'N/A'}</span></div>
                <div className="info-row"><span className="info-label">Invoice Ref</span><span className="info-value">{collegeSub?.invoiceReference || 'N/A'}</span></div>
              </div>
              <button className="btn btn-secondary w-full" style={{ marginTop: '20px' }} onClick={() => navigate(`/super-admin/subscriptions/assign?collegeId=${college.id}`)}>
                Manage Subscription
              </button>
            </div>

            {/* Key Personnel */}
            <div className="dashboard-card col-span-3">
              <div className="card-header">
                <h2 className="card-title"><Users size={20}/> Key Personnel & Primary Administrator</h2>
              </div>
              <div className="dashboard-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                <div className="info-list">
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '12px', color: 'var(--primary-color)' }}>Primary College Admin Account</h3>
                  <div className="info-row"><span className="info-label">Admin Name</span><span className="info-value">{college.primaryAdmin?.name || 'N/A'}</span></div>
                  <div className="info-row"><span className="info-label">Admin Email</span><span className="info-value">{college.primaryAdmin?.email || 'N/A'}</span></div>
                  <div className="info-row"><span className="info-label">Username</span><span className="info-value">{college.primaryAdmin?.username || `${college.slug}_admin`}</span></div>
                  <div className="info-row"><span className="info-label">Account Status</span><span className="info-value">{college.primaryAdmin?.status || 'Active'}</span></div>
                </div>

                <div className="info-list">
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '12px', color: 'var(--primary-color)' }}>Institution Metrics</h3>
                  <div className="info-row"><span className="info-label">Active Students</span><span className="info-value">{college.students || 0} / {college.studentsLimit || '500'}</span></div>
                  <div className="info-row"><span className="info-label">Active Preceptors</span><span className="info-value">{college.preceptors || 0}</span></div>
                  <div className="info-row"><span className="info-label">Clinical Cases</span><span className="info-value">{college.cases || 0}</span></div>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: LANDING PAGE SETTINGS (Condition 9) */}
        {activeTab === 'landing_page' && (
          <div className="dashboard-card" style={{ backgroundColor: 'var(--surface-color)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0, color: 'var(--text-color)' }}>
                  Institution Landing Page Settings
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: '4px 0 0 0' }}>
                  Manage branding, photos, and content for <strong>pharmdverse.com/{college.slug}</strong>. Uses 1 dynamic common template.
                </p>
              </div>

              {/* PUBLISHING WORKFLOW BUTTONS */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <button className="btn btn-secondary" onClick={handleSaveDraft} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Save size={16} /> Save Draft
                </button>
                <button className="btn btn-secondary" onClick={handlePreviewLandingPage} style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#eff6ff', color: '#1e40af', border: '1px solid #bfdbfe' }}>
                  <Eye size={16} /> Preview Landing Page
                </button>
                <button className="btn btn-primary" onClick={handlePublishLandingPage} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Send size={16} /> Publish Live
                </button>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
              
              <div className="form-group">
                <label className="form-label" style={{ fontWeight: 600 }}>College Name</label>
                <input type="text" className="form-input" name="name" value={landingForm.name} onChange={handleLandingFormChange} />
              </div>

              <div className="form-group">
                <label className="form-label" style={{ fontWeight: 600 }}>Logo Text / Initials</label>
                <input type="text" className="form-input" name="logo" value={landingForm.logo} onChange={handleLandingFormChange} />
              </div>

              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="form-label" style={{ fontWeight: 600 }}>Banner Text / Tagline</label>
                <input type="text" className="form-input" name="bannerText" value={landingForm.bannerText} onChange={handleLandingFormChange} />
              </div>

              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="form-label" style={{ fontWeight: 600 }}>About College</label>
                <textarea className="form-input" name="about" rows={4} value={landingForm.about} onChange={handleLandingFormChange} />
              </div>

              <div className="form-group">
                <label className="form-label" style={{ fontWeight: 600 }}>Principal Photo URL</label>
                <input type="text" className="form-input" name="principalPhoto" value={landingForm.principalPhoto} onChange={handleLandingFormChange} placeholder="https://..." />
              </div>

              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="form-label" style={{ fontWeight: 600 }}>Principal / Leadership Message</label>
                <textarea className="form-input" name="principalMessage" rows={3} value={landingForm.principalMessage} onChange={handleLandingFormChange} />
              </div>

              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="form-label" style={{ fontWeight: 600 }}>Campus Image URLs (One URL per line)</label>
                <textarea className="form-input" name="campusImagesStr" rows={3} value={landingForm.campusImagesStr} onChange={handleLandingFormChange} placeholder="https://..." />
              </div>

              <div className="form-group">
                <label className="form-label" style={{ fontWeight: 600 }}>Official Email</label>
                <input type="email" className="form-input" name="email" value={landingForm.email} onChange={handleLandingFormChange} />
              </div>

              <div className="form-group">
                <label className="form-label" style={{ fontWeight: 600 }}>Official Phone</label>
                <input type="text" className="form-input" name="phone" value={landingForm.phone} onChange={handleLandingFormChange} />
              </div>

              <div className="form-group">
                <label className="form-label" style={{ fontWeight: 600 }}>Official Website</label>
                <input type="text" className="form-input" name="website" value={landingForm.website} onChange={handleLandingFormChange} />
              </div>

              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="form-label" style={{ fontWeight: 600 }}>Footer Text</label>
                <input type="text" className="form-input" name="footerText" value={landingForm.footerText} onChange={handleLandingFormChange} />
              </div>

              <div className="form-group">
                <label className="form-label" style={{ fontWeight: 600 }}>Facebook Link</label>
                <input type="text" className="form-input" name="facebook" value={landingForm.facebook} onChange={handleLandingFormChange} />
              </div>

              <div className="form-group">
                <label className="form-label" style={{ fontWeight: 600 }}>Twitter Link</label>
                <input type="text" className="form-input" name="twitter" value={landingForm.twitter} onChange={handleLandingFormChange} />
              </div>

              <div className="form-group">
                <label className="form-label" style={{ fontWeight: 600 }}>LinkedIn Link</label>
                <input type="text" className="form-input" name="linkedin" value={landingForm.linkedin} onChange={handleLandingFormChange} />
              </div>

            </div>
          </div>
        )}

        {/* TAB 3: ACTIVITY TIMELINE (Condition 10.B) */}
        {activeTab === 'timeline' && (
          <div className="dashboard-card" style={{ backgroundColor: 'var(--surface-color)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem', color: 'var(--text-color)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Activity size={20} color="var(--primary-color)"/> College Activity Timeline
            </h2>

            {(!college.timeline || college.timeline.length === 0) ? (
              <p style={{ color: 'var(--text-secondary)' }}>No activity logs recorded for this institution yet.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {college.timeline.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', borderLeft: '3px solid var(--primary-color)', paddingLeft: '16px' }}>
                    <div style={{ minWidth: '120px' }}>
                      <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>{item.date}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{item.time || ''}</div>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, color: 'var(--primary-color)', fontSize: '0.95rem' }}>
                        {item.event}
                      </div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-color)', marginTop: '2px' }}>
                        {item.details}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                        Performed By: <strong>{item.performedBy}</strong>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </AdminLayout>
  );
};

export default ViewCollege;
