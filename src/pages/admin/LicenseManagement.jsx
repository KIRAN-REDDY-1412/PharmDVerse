import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { 
  ArrowLeft, Search, Filter, Download, FileText, Key,
  CheckCircle, AlertTriangle, Eye, Shield
} from 'lucide-react';
import './SubscriptionList.css'; // Reusing table and toolbar styles
import './LicenseManagement.css';

const MOCK_LICENSES = [
  {
    id: 'LIC-TX-9921',
    college: 'University of Texas Pharmacy',
    type: 'Enterprise (Annual)',
    status: 'Active',
    issueDate: '2024-01-15',
    expiryDate: '2027-01-15',
    activationDate: '2024-01-16 09:30 AM',
    renewals: 2
  },
  {
    id: 'LIC-MA-8832',
    college: 'Boston Healthcare College',
    type: 'Professional (Annual)',
    status: 'Expiring Soon',
    issueDate: '2023-11-01',
    expiryDate: '2026-11-01',
    activationDate: '2023-11-02 10:15 AM',
    renewals: 0
  },
  {
    id: 'LIC-OH-1102',
    college: 'Midwest Pharmacy Academy',
    type: 'Basic (Trial)',
    status: 'Expired',
    issueDate: '2023-05-15',
    expiryDate: '2026-05-15',
    activationDate: '2023-05-15 02:00 PM',
    renewals: 0
  }
];

const getStatusBadge = (status) => {
  switch(status) {
    case 'Active': return <span className="status-badge success"><CheckCircle size={14} /> Active</span>;
    case 'Expired': return <span className="status-badge danger"><AlertTriangle size={14} /> Expired</span>;
    case 'Expiring Soon': return <span className="status-badge warning"><Activity size={14} /> Expiring Soon</span>;
    default: return <span className="status-badge">{status}</span>;
  }
};

const LicenseManagement = () => {
  const navigate = useNavigate();
  const [previewLicense, setPreviewLicense] = useState(null);

  return (
    <AdminLayout>
      <div className="license-container">
        
        <div className="license-header">
          <div className="license-title-area">
            <button className="icon-btn-small" onClick={() => navigate('/super-admin/subscriptions')}>
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="page-title">License Management</h1>
              <p className="page-subtitle">Track and generate official SaaS licenses.</p>
            </div>
          </div>
          <button className="btn btn-secondary"><Download size={18} /> Export License Registry</button>
        </div>

        <div className="toolbar">
          <div className="search-box">
            <Search size={18} color="var(--text-secondary)" />
            <input type="text" placeholder="Search by License Key or College..." />
          </div>
          <div className="filters">
            <button className="filter-btn"><Filter size={18} /> License Type</button>
            <button className="filter-btn"><Filter size={18} /> Status</button>
          </div>
        </div>

        <div className="data-grid-container">
          <table className="enterprise-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ padding: '16px', borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>License Key</th>
                <th style={{ padding: '16px', borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>Tenant College</th>
                <th style={{ padding: '16px', borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>Type</th>
                <th style={{ padding: '16px', borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>Validity</th>
                <th style={{ padding: '16px', borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>Status</th>
                <th style={{ padding: '16px', borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_LICENSES.map((lic) => (
                <tr key={lic.id}>
                  <td style={{ padding: '16px', borderBottom: '1px solid var(--border-color)' }}>
                    <div className="license-key-display"><Key size={12} style={{display:'inline', marginRight:'4px'}}/>{lic.id}</div>
                  </td>
                  <td style={{ padding: '16px', borderBottom: '1px solid var(--border-color)', fontWeight: 500 }}>
                    {lic.college}
                  </td>
                  <td style={{ padding: '16px', borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                    {lic.type}
                  </td>
                  <td style={{ padding: '16px', borderBottom: '1px solid var(--border-color)', fontSize: '0.875rem' }}>
                    <div><span style={{color:'var(--text-secondary)'}}>Issued:</span> {lic.issueDate}</div>
                    <div><span style={{color:'var(--text-secondary)'}}>Expires:</span> {lic.expiryDate}</div>
                  </td>
                  <td style={{ padding: '16px', borderBottom: '1px solid var(--border-color)' }}>
                    {getStatusBadge(lic.status)}
                  </td>
                  <td style={{ padding: '16px', borderBottom: '1px solid var(--border-color)' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button className="icon-btn-small" title="Preview Certificate" onClick={() => setPreviewLicense(lic)}>
                        <Eye size={18} />
                      </button>
                      <button className="icon-btn-small" title="Download PDF">
                        <Download size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      {previewLicense && (
        <>
          <div className="modal-backdrop" onClick={() => setPreviewLicense(null)}></div>
          <div className="modal" style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'var(--surface-color)', padding: '24px', borderRadius: '12px', zIndex: 1000, width: '600px', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}><Shield color="var(--primary-color)"/> Digital License Certificate</h2>
              <button className="icon-btn-small" onClick={() => setPreviewLicense(null)}><X size={20}/></button>
            </div>
            
            <div className="certificate-preview">
              <Shield size={48} color="rgba(255,255,255,0.1)" style={{ position: 'absolute', top: '20px', right: '20px' }}/>
              <div className="cert-title">PharmDVerse</div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '16px' }}>Official Platform License</div>
              <div className="cert-college">{previewLicense.college}</div>
              <div style={{ color: 'white', fontSize: '0.875rem', marginBottom: '32px' }}>Is hereby granted the {previewLicense.type} license to operate on the platform.</div>
              
              <div className="cert-details">
                <div className="cert-block">
                  <span className="cert-label">License Key</span>
                  <span className="cert-value">{previewLicense.id}</span>
                </div>
                <div className="cert-block">
                  <span className="cert-label">Issue Date</span>
                  <span className="cert-value">{previewLicense.issueDate}</span>
                </div>
                <div className="cert-block">
                  <span className="cert-label">Valid Until</span>
                  <span className="cert-value">{previewLicense.expiryDate}</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
              <button className="btn btn-primary"><Download size={16}/> Download PDF</button>
            </div>
          </div>
        </>
      )}

    </AdminLayout>
  );
};

// Quick stub for missing X icon if not imported
const X = ({ size }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;
const Activity = ({ size }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>;

export default LicenseManagement;
