import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { 
  ArrowLeft, RefreshCw, Calendar, FileText, CreditCard,
  Building2, AlertTriangle, ArrowRight, ShieldCheck
} from 'lucide-react';
import './CreateSubscriptionPlan.css'; // Reusing standard form styles
import './AssignSubscription.css'; // Reusing calc block styles

const MOCK_RENEWAL = {
  id: 'SUB-2024-045',
  college: 'Boston Healthcare College',
  plan: 'Professional',
  currentExpiry: '2026-11-01',
  daysRemaining: 96,
  pricePerYear: 12000
};

const RenewSubscription = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [renewalPeriod, setRenewalPeriod] = useState(1); // years
  const [generateInvoice, setGenerateInvoice] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);

  const subId = id || MOCK_RENEWAL.id;

  const handleRenew = () => {
    setShowConfirm(true);
  };

  const confirmRenewal = () => {
    setShowConfirm(false);
    alert('Subscription successfully renewed!');
    navigate('/super-admin/subscriptions/list');
  };

  return (
    <AdminLayout>
      <div className="create-plan-container">
        
        <div className="plan-header">
          <div className="plan-title-area">
            <button className="icon-btn-small" onClick={() => navigate('/super-admin/subscriptions/list')}>
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="page-title">Renew Subscription</h1>
              <p className="page-subtitle">Processing renewal for {subId}</p>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h2 className="section-title"><Building2 size={20} color="var(--primary-color)"/> Current Subscription State</h2>
          
          <div className="date-calculation" style={{ marginTop: 0, marginBottom: '24px' }}>
            <div className="calc-block">
              <span className="calc-label">Tenant</span>
              <span className="calc-value">{MOCK_RENEWAL.college}</span>
            </div>
            <div className="calc-block">
              <span className="calc-label">Active Plan</span>
              <span className="calc-value" style={{ color: 'var(--primary-color)' }}>{MOCK_RENEWAL.plan}</span>
            </div>
            <div className="calc-block">
              <span className="calc-label">Current Expiry</span>
              <span className="calc-value">{MOCK_RENEWAL.currentExpiry}</span>
            </div>
            <div className="calc-block">
              <span className="calc-label">Status</span>
              <span className="calc-value" style={{ color: '#f59e0b' }}>Expiring in {MOCK_RENEWAL.daysRemaining} days</span>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h2 className="section-title"><Calendar size={20} color="var(--primary-color)"/> Renewal Configuration</h2>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label required">Renewal Period</label>
              <select className="form-select" value={renewalPeriod} onChange={(e) => setRenewalPeriod(Number(e.target.value))}>
                <option value={1}>1 Year (Annual)</option>
                <option value={2}>2 Years</option>
                <option value={3}>3 Years (Lock-in Discount)</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Discount applied</label>
              <input type="text" className="form-input" disabled value={renewalPeriod === 3 ? "15% Multi-year Discount" : "None"} />
            </div>
            
            <div className="form-group full-width" style={{ marginTop: '16px' }}>
              <div className="toggle-group">
                <div className="toggle-label">
                  <span className="toggle-title">Generate Renewal Invoice</span>
                  <span className="toggle-desc">Automatically create and email an invoice to the primary college administrator.</span>
                </div>
                <label className="switch">
                  <input type="checkbox" checked={generateInvoice} onChange={() => setGenerateInvoice(!generateInvoice)} />
                  <span className="slider"></span>
                </label>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '24px', margin: '32px 0', padding: '24px', backgroundColor: 'var(--bg-color)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>Old Expiry</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 600 }}>Nov 01, 2026</div>
            </div>
            <ArrowRight size={32} color="var(--primary-color)" />
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>New Expiry</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 600, color: '#10b981' }}>Nov 01, 202{6 + renewalPeriod}</div>
            </div>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '16px', borderTop: '1px solid var(--border-color)', paddingTop: '24px' }}>
            <span style={{ fontSize: '1.125rem', fontWeight: 600 }}>Total Renewal Cost:</span>
            <span style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--primary-color)' }}>
              ${(MOCK_RENEWAL.pricePerYear * renewalPeriod * (renewalPeriod === 3 ? 0.85 : 1)).toLocaleString()}
            </span>
          </div>
        </div>

      </div>

      <div className="sticky-footer">
        <div className="footer-left">
          <button className="btn btn-secondary" onClick={() => navigate('/super-admin/subscriptions/list')} >Cancel</button>
        </div>
        <div className="footer-right">
          <button className="btn btn-primary" onClick={handleRenew}><RefreshCw size={16} /> Process Renewal</button>
        </div>
      </div>

      {showConfirm && (
        <>
          <div className="modal-backdrop" onClick={() => setShowConfirm(false)}></div>
          <div className="modal" style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'var(--surface-color)', padding: '24px', borderRadius: '12px', zIndex: 1000, width: '400px', border: '1px solid var(--border-color)' }}>
            <h3 style={{ margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-color)' }}><ShieldCheck color="#10b981"/> Confirm Renewal</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', fontSize: '0.875rem', lineHeight: '1.5' }}>
              You are about to extend the Professional plan for Boston Healthcare College by {renewalPeriod} year(s). {generateInvoice && 'An invoice will be automatically dispatched.'}
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button className="btn btn-secondary" onClick={() => setShowConfirm(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={confirmRenewal}>Confirm & Process</button>
            </div>
          </div>
        </>
      )}
    </AdminLayout>
  );
};

export default RenewSubscription;
