import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, GraduationCap, Users, UserCog, ClipboardList, 
  BellRing, FileText, ShieldCheck, DatabaseBackup, Settings2, 
  Unplug, Search, Save, X, Server
} from 'lucide-react';
import CollegeAdminLayout from '../../components/college/CollegeAdminLayout';
import './PreceptorManagement.css'; 

const SETTINGS_CATEGORIES = [
  { id: 'college', label: 'College Information', icon: <Building2 size={18} /> },
  { id: 'academic', label: 'Academic Settings', icon: <GraduationCap size={18} /> },
  { id: 'users', label: 'User Settings', icon: <Users size={18} /> },
  { id: 'student', label: 'Student Settings', icon: <UserCog size={18} /> },
  { id: 'preceptor', label: 'Preceptor Settings', icon: <UserCog size={18} /> },
  { id: 'cases', label: 'Clinical Case Settings', icon: <ClipboardList size={18} /> },
  { id: 'notifications', label: 'Notification Settings', icon: <BellRing size={18} /> },
  { id: 'reports', label: 'Report Settings', icon: <FileText size={18} /> },
  { id: 'security', label: 'Security Settings', icon: <ShieldCheck size={18} /> },
  { id: 'backup', label: 'Backup & Restore', icon: <DatabaseBackup size={18} /> },
  { id: 'preferences', label: 'System Preferences', icon: <Settings2 size={18} /> },
  { id: 'integrations', label: 'Integration Settings', icon: <Unplug size={18} /> },
];

const SettingsManagement = () => {
  const [activeTab, setActiveTab] = useState('college');
  const [searchQuery, setSearchQuery] = useState('');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isTestingConnection, setIsTestingConnection] = useState(false);

  // Mock Global State Form Data
  const [formData, setFormData] = useState({
    collegeName: 'National Institute of Pharmacy',
    address: '123 Medical Hub, Knowledge City',
    email: 'admin@nip.edu',
    academicYear: '2025-2026',
    maxStudents: '15',
    caseFormat: 'PDV-YYYY-[0000]',
    autoSaveDraft: true,
    lockApprovedCases: true,
    passwordComplexity: 'high',
    apiKey: 'sk_live_9837xxxxxxxxxx'
  });

  const filteredCategories = useMemo(() => {
    return SETTINGS_CATEGORIES.filter(c => c.label.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [searchQuery]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    setHasUnsavedChanges(true);
  };

  const handleSave = () => {
    if (window.confirm('You are about to modify global ERP parameters. Proceed?')) {
      alert('Global configuration updated successfully. Audit log appended.');
      setHasUnsavedChanges(false);
    }
  };

  const testConnection = () => {
    setIsTestingConnection(true);
    setTimeout(() => {
      setIsTestingConnection(false);
      alert('Connection successful! Integrations verified.');
    }, 1500);
  };

  const renderFormCanvas = () => {
    switch (activeTab) {
      case 'college':
        return (
          <div className="form-section animation-fade-in">
            <h2 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>College Information</h2>
            <div className="form-grid">
              <div className="form-group">
                <label>College Name</label>
                <input type="text" name="collegeName" value={formData.collegeName} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Official Email Address</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} />
              </div>
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label>Registered Address</label>
                <textarea name="address" value={formData.address} onChange={handleChange} rows="3" />
              </div>
            </div>
          </div>
        );
      case 'preceptor':
        return (
          <div className="form-section animation-fade-in">
            <h2 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>Preceptor Policies</h2>
            <div className="form-grid">
              <div className="form-group">
                <label>Maximum Students per Preceptor (Soft Cap)</label>
                <input type="number" name="maxStudents" value={formData.maxStudents} onChange={handleChange} />
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Triggers a warning if assignments exceed this limit.</p>
              </div>
            </div>
          </div>
        );
      case 'cases':
        return (
          <div className="form-section animation-fade-in">
            <h2 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>Clinical Case Constraints</h2>
            <div className="form-grid" style={{ gridTemplateColumns: '1fr' }}>
              <div className="form-group">
                <label>Case ID Generation Format</label>
                <input type="text" name="caseFormat" value={formData.caseFormat} onChange={handleChange} />
              </div>
              <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem' }}>
                <input type="checkbox" name="autoSaveDraft" checked={formData.autoSaveDraft} onChange={handleChange} style={{ width: '20px', height: '20px' }} />
                <label style={{ margin: 0 }}>Enable Auto-Save Drafts for Students</label>
              </div>
              <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input type="checkbox" name="lockApprovedCases" checked={formData.lockApprovedCases} onChange={handleChange} style={{ width: '20px', height: '20px' }} />
                <label style={{ margin: 0 }}>Lock Cases Permanently After Final Approval (Immutable Audit Rule)</label>
              </div>
            </div>
          </div>
        );
      case 'security':
        return (
          <div className="form-section animation-fade-in">
            <h2 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>Security Protocols</h2>
            <div className="form-grid">
              <div className="form-group">
                <label>Password Complexity Requirement</label>
                <div className="select-wrapper">
                  <select name="passwordComplexity" value={formData.passwordComplexity} onChange={handleChange}>
                    <option value="low">Low (Min 6 chars)</option>
                    <option value="medium">Medium (Alphanumeric, Min 8 chars)</option>
                    <option value="high">High (Special chars, Alphanumeric, Min 12 chars)</option>
                  </select>
                </div>
              </div>
            </div>
            <div style={{ marginTop: '2rem', padding: '1rem', background: '#fef2f2', border: '1px solid #f87171', borderRadius: '8px' }}>
              <h3 style={{ color: '#991b1b', fontSize: '1rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><ShieldCheck size={18} /> Two-Factor Authentication (2FA)</h3>
              <p style={{ color: '#7f1d1d', fontSize: '0.85rem' }}>Enforcing global 2FA will forcibly log out all current users. They will be required to setup Authenticator App bindings on their next login.</p>
              <button className="btn-secondary" style={{ marginTop: '1rem', background: 'white', color: '#991b1b', border: '1px solid #f87171' }}>Force Global 2FA Enablement</button>
            </div>
          </div>
        );
      case 'integrations':
        return (
          <div className="form-section animation-fade-in">
            <h2 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>External API Gateways</h2>
            <div className="form-grid" style={{ gridTemplateColumns: '1fr' }}>
              <div className="form-group">
                <label>AI Analysis API Key</label>
                <input type="password" name="apiKey" value={formData.apiKey} onChange={handleChange} />
              </div>
              <div>
                <button className="btn-secondary" onClick={testConnection} disabled={isTestingConnection} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Server size={16} /> {isTestingConnection ? 'Testing Gateway...' : 'Test AI Connection (Sandbox)'}
                </button>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-muted)' }}>
            <Settings2 size={48} style={{ opacity: 0.2, marginBottom: '1rem' }} />
            <p>This configuration panel is locked for layout demonstration.</p>
          </div>
        );
    }
  };

  return (
    <CollegeAdminLayout>
      <div className="list-page-container" style={{ padding: '0', display: 'flex', flexDirection: 'column', height: 'calc(100vh - 70px)' }}>
        
        {/* Header */}
        <div className="list-page-header" style={{ padding: '1.5rem' }}>
          <div className="header-left">
            <h1 className="page-title">Global Settings Engine</h1>
            <div className="breadcrumbs">
              <Link to="/college-admin/dashboard" className="breadcrumb-link">Dashboard</Link>
              <span className="breadcrumb-separator">&gt;</span>
              <span>Settings Configuration</span>
            </div>
          </div>
        </div>

        {/* Master Layout */}
        <div style={{ display: 'flex', flex: 1, overflow: 'hidden', borderTop: '1px solid var(--border-color)' }}>
          
          {/* Left Pane: Navigation */}
          <div style={{ width: '280px', background: 'var(--bg-surface-alt)', borderRight: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>
              <div className="search-box" style={{ width: '100%' }}>
                <Search size={16} className="search-icon" />
                <input 
                  type="text" 
                  placeholder="Search settings..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ fontSize: '0.85rem' }}
                />
              </div>
            </div>
            
            <div style={{ overflowY: 'auto', flex: 1, padding: '0.5rem 0' }}>
              {filteredCategories.map(cat => (
                <button 
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  style={{ 
                    display: 'flex', alignItems: 'center', gap: '0.75rem', width: '100%', 
                    padding: '0.85rem 1.5rem', border: 'none', background: activeTab === cat.id ? 'var(--bg-main)' : 'transparent',
                    color: activeTab === cat.id ? 'var(--color-primary)' : 'var(--text-secondary)',
                    fontWeight: activeTab === cat.id ? 600 : 400, textAlign: 'left', cursor: 'pointer',
                    borderLeft: activeTab === cat.id ? '4px solid var(--color-primary)' : '4px solid transparent',
                    transition: 'all 0.1s'
                  }}
                >
                  {cat.icon}
                  <span style={{ fontSize: '0.9rem' }}>{cat.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Right Pane: Form Canvas */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative', background: 'var(--bg-surface)' }}>
            
            <div style={{ flex: 1, overflowY: 'auto', padding: '2.5rem 3rem' }}>
              {renderFormCanvas()}
            </div>

            {/* Sticky Save Footer */}
            <div style={{ 
              position: 'absolute', bottom: 0, left: 0, right: 0, 
              padding: '1rem 2rem', background: 'var(--bg-surface)', borderTop: '1px solid var(--border-color)',
              display: 'flex', justifyContent: 'flex-end', gap: '1rem',
              transform: hasUnsavedChanges ? 'translateY(0)' : 'translateY(100%)',
              transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: '0 -4px 12px rgba(0,0,0,0.05)'
            }}>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', color: 'var(--color-warning)', fontSize: '0.9rem', fontWeight: 600 }}>
                <AlertTriangle size={16} style={{ marginRight: '0.5rem' }} /> Unsaved changes detected
              </div>
              <button className="btn-secondary" onClick={() => { setHasUnsavedChanges(false); alert('Changes discarded.'); }}>
                <X size={16} /> Discard
              </button>
              <button className="btn-primary" onClick={handleSave}>
                <Save size={16} /> Save Configuration
              </button>
            </div>

          </div>
        </div>

      </div>
    </CollegeAdminLayout>
  );
};

export default SettingsManagement;
