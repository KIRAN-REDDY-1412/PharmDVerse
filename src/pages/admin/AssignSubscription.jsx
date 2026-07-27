import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { useDatabase } from '../../context/DatabaseContext';
import { 
  ArrowLeft, Save, Link as LinkIcon, Building2, CheckCircle, XCircle, UserCheck, Shield, Key
} from 'lucide-react';
import './AssignSubscription.css';
import './CreateSubscriptionPlan.css';

const AssignSubscription = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { colleges, assignSubscription } = useDatabase();

  const queryCollegeId = searchParams.get('collegeId') || '';

  const [selectedCollegeId, setSelectedCollegeId] = useState(queryCollegeId);
  const [selectedPlan, setSelectedPlan] = useState('Enterprise');
  const [renewal, setRenewal] = useState('Auto-Renew (Annual)');
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [expiryDate, setExpiryDate] = useState(
    new Date(Date.now() + 365*24*60*60*1000).toISOString().split('T')[0]
  );
  const [invoiceRef, setInvoiceRef] = useState(`INV-${Date.now().toString().slice(-6)}`);
  const [paymentStatus, setPaymentStatus] = useState('Paid');

  // Primary Admin Fields (Condition 4)
  const [adminFullName, setAdminFullName] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminMobile, setAdminMobile] = useState('');
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('Admin@123');

  const [showConfirm, setShowConfirm] = useState(false);

  // Auto-fill Primary Admin info when college is selected
  useEffect(() => {
    if (selectedCollegeId) {
      const col = colleges?.find(c => c.id === selectedCollegeId);
      if (col) {
        setAdminFullName(col.primaryAdmin?.name || `${col.name} Primary Admin`);
        setAdminEmail(col.primaryAdmin?.email || col.email || `admin@${col.slug}.edu`);
        setAdminMobile(col.primaryAdmin?.phone || col.phone || '+91 98765 43210');
        setAdminUsername(col.primaryAdmin?.username || `${col.slug}_admin`);
        if (col.plan) setSelectedPlan(col.plan);
      }
    }
  }, [selectedCollegeId, colleges]);

  const handleSaveClick = () => {
    if (!selectedCollegeId || !selectedPlan) {
      alert("Please select a valid college and plan.");
      return;
    }
    if (!adminEmail || !adminUsername) {
      alert("Primary Admin Email and Username are required.");
      return;
    }
    setShowConfirm(true);
  };

  const confirmAssign = () => {
    const success = assignSubscription(
      selectedCollegeId, 
      {
        plan: selectedPlan,
        startDate,
        expiryDate,
        renewal,
        status: 'Active',
        invoiceReference: invoiceRef,
        paymentStatus
      },
      {
        fullName: adminFullName,
        email: adminEmail,
        mobile: adminMobile,
        username: adminUsername,
        password: adminPassword
      }
    );

    if (success) {
      setShowConfirm(false);
      alert(`Subscription assigned successfully! Primary Admin (${adminUsername}) provisioned for ${selectedCollegeId}.`);
      navigate('/super-admin/college-management');
    }
  };

  const selectedColObj = colleges?.find(c => c.id === selectedCollegeId);

  return (
    <AdminLayout>
      <div className="assign-sub-container">
        
        <div className="plan-header">
          <div className="plan-title-area">
            <button className="icon-btn-small" onClick={() => navigate('/super-admin/college-management')}>
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="page-title">Assign Subscription & Provision College Portal</h1>
              <p className="page-subtitle">Assign subscription parameters and automatically provision Primary College Admin.</p>
            </div>
          </div>
        </div>

        {/* Section 1: Institution & Plan Selection */}
        <div className="form-section">
          <h2 className="section-title"><LinkIcon size={20} color="var(--primary-color)"/> Target Institution & Subscription Plan</h2>
          <div className="form-grid">
            <div className="form-group full-width">
              <label className="form-label required">Target College</label>
              <div className="input-with-icon">
                <Building2 size={16} className="input-icon" />
                <select 
                  className="form-select w-full" 
                  value={selectedCollegeId} 
                  onChange={(e) => setSelectedCollegeId(e.target.value)} 
                  style={{ paddingLeft: '36px' }}
                >
                  <option value="">-- Search / Select Institution --</option>
                  {(colleges || []).map(col => (
                    <option key={col.id} value={col.id}>
                      {col.name} ({col.id}) - Status: {col.status}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label required">Subscription Type / Plan</label>
              <select className="form-select" value={selectedPlan} onChange={(e) => setSelectedPlan(e.target.value)}>
                <option value="Enterprise">Enterprise Tier (Unlimited Users - ₹2,50,000/yr)</option>
                <option value="Professional">Professional Tier (Up to 1,000 Users - ₹1,50,000/yr)</option>
                <option value="Standard">Standard Tier (Up to 500 Users - ₹80,000/yr)</option>
                <option value="Trial">14-Day Free Evaluation Trial</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Renewal Policy</label>
              <select className="form-select" value={renewal} onChange={(e) => setRenewal(e.target.value)}>
                <option value="Auto-Renew (Annual)">Auto-Renew (Annual)</option>
                <option value="Manual Renewal">Manual Renewal</option>
                <option value="Quarterly Billing">Quarterly Billing</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Start Date</label>
              <input type="date" className="form-input" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </div>

            <div className="form-group">
              <label className="form-label">Expiry Date</label>
              <input type="date" className="form-input" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} />
            </div>

            <div className="form-group">
              <label className="form-label">Invoice Reference</label>
              <input type="text" className="form-input" value={invoiceRef} onChange={(e) => setInvoiceRef(e.target.value)} />
            </div>

            <div className="form-group">
              <label className="form-label">Payment Status</label>
              <select className="form-select" value={paymentStatus} onChange={(e) => setPaymentStatus(e.target.value)}>
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
                <option value="Overdue">Overdue</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 2: Primary College Admin Creation (Condition 4) */}
        {selectedCollegeId && (
          <div className="form-section">
            <h2 className="section-title"><UserCheck size={20} color="var(--primary-color)"/> Primary College Admin Creation (Tenant Admin)</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '16px' }}>
              The Primary College Admin account will be automatically created and bound ONLY to college ID <strong>{selectedCollegeId}</strong>.
            </p>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label required">Full Name</label>
                <input type="text" className="form-input" value={adminFullName} onChange={(e) => setAdminFullName(e.target.value)} placeholder="e.g. Dr. S. K. Rao" />
              </div>

              <div className="form-group">
                <label className="form-label required">Email Address</label>
                <input type="email" className="form-input" value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)} placeholder="e.g. admin@amrpharmacy.edu" />
              </div>

              <div className="form-group">
                <label className="form-label">Mobile Number</label>
                <input type="text" className="form-input" value={adminMobile} onChange={(e) => setAdminMobile(e.target.value)} placeholder="e.g. +91 98765 43210" />
              </div>

              <div className="form-group">
                <label className="form-label required">Username</label>
                <input type="text" className="form-input" value={adminUsername} onChange={(e) => setAdminUsername(e.target.value)} placeholder="e.g. amr_admin" />
              </div>

              <div className="form-group">
                <label className="form-label required">Default Password</label>
                <input type="text" className="form-input" value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)} />
              </div>

              <div className="form-group">
                <label className="form-label">Role Isolation</label>
                <input type="text" className="form-input" value={`College Admin (Tenant ID: ${selectedCollegeId})`} disabled style={{ backgroundColor: 'var(--bg-main)', opacity: 0.8 }} />
              </div>
            </div>
          </div>
        )}

      </div>

      <div className="sticky-footer">
        <div className="footer-left">
          <button className="btn btn-secondary" onClick={() => navigate('/super-admin/college-management')}>Cancel</button>
        </div>
        <div className="footer-right">
          <button className="btn btn-primary" onClick={handleSaveClick} disabled={!selectedCollegeId || !selectedPlan}>
            <Save size={16} /> Assign Subscription & Activate College
          </button>
        </div>
      </div>

      {showConfirm && (
        <>
          <div className="modal-backdrop" onClick={() => setShowConfirm(false)}></div>
          <div className="modal" style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'var(--surface-color)', padding: '24px', borderRadius: '12px', zIndex: 1000, width: '450px', border: '1px solid var(--border-color)' }}>
            <h3 style={{ margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-color)' }}>
              Confirm Provisioning & Admin Creation
            </h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '16px', fontSize: '0.875rem', lineHeight: '1.5' }}>
              Assigning <strong>{selectedPlan} Plan</strong> to <strong>{selectedColObj?.name}</strong>.
            </p>
            <div style={{ padding: '12px', backgroundColor: 'var(--bg-main)', borderRadius: '8px', marginBottom: '20px', fontSize: '0.8rem' }}>
              <div><strong>Primary Admin:</strong> {adminFullName} ({adminUsername})</div>
              <div><strong>Email:</strong> {adminEmail}</div>
              <div><strong>College Scope:</strong> {selectedCollegeId} ONLY</div>
            </div>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button className="btn btn-secondary" onClick={() => setShowConfirm(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={confirmAssign}>Activate College & Create Primary Admin</button>
            </div>
          </div>
        </>
      )}

    </AdminLayout>
  );
};

export default AssignSubscription;
