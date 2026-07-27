import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { 
  ArrowLeft, Save, RotateCcw, Box, DollarSign, Settings,
  Zap, Database, Users, AlertTriangle
} from 'lucide-react';
import './CreateSubscriptionPlan.css'; // Reusing the same CSS

const EditSubscriptionPlan = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);
  
  // Pre-populated mock data for editing
  const [formData, setFormData] = useState({
    planName: 'Enterprise Plus',
    planCode: id || 'ENT-PLUS-24',
    description: 'Full-featured enterprise plan with API access and unlimited seats.',
    duration: 'Yearly',
    price: '25000',
    maxStudents: '', // blank = unlimited
    maxPreceptors: '',
    storageLimit: 'Unlimited',
    supportLevel: 'Dedicated',
    status: 'Active',
    features: {
      aiAssistant: true,
      reports: true,
      digitalLibrary: true,
      notifications: true
    }
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleToggle = (feature) => {
    setFormData(prev => ({
      ...prev,
      features: {
        ...prev.features,
        [feature]: !prev.features[feature]
      }
    }));
  };

  const handleSaveClick = () => {
    if (!formData.planName || !formData.planCode || !formData.price) {
      alert("Please fill all required fields.");
      return;
    }
    setShowConfirm(true);
  };

  const confirmSave = () => {
    setShowConfirm(false);
    alert(`Subscription Plan ${formData.planCode} updated successfully! Audit log generated.`);
    navigate('/super-admin/subscriptions');
  };

  return (
    <AdminLayout>
      <div className="create-plan-container">
        
        <div className="plan-header">
          <div className="plan-title-area">
            <button className="icon-btn-small" onClick={() => navigate('/super-admin/subscriptions')}>
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="page-title">Edit Subscription Plan</h1>
              <p className="page-subtitle">Modifying plan code: {formData.planCode}</p>
            </div>
          </div>
        </div>

        <div className="warning-banner" style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)', border: '1px solid #f59e0b', padding: '16px', borderRadius: '8px', marginBottom: '24px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
          <AlertTriangle color="#f59e0b" style={{ flexShrink: 0 }} />
          <div>
            <h4 style={{ color: '#f59e0b', margin: '0 0 4px 0', fontSize: '0.875rem' }}>Active Tenants Impact Warning</h4>
            <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.875rem' }}>Changes made here will instantly propagate to 142 colleges currently assigned to this plan. Reducing limits may restrict existing college access.</p>
          </div>
        </div>

        <div className="form-section">
          <h2 className="section-title"><Box size={20} color="var(--primary-color)"/> General Information</h2>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label required">Plan Name</label>
              <input type="text" className="form-input" name="planName" value={formData.planName} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label className="form-label required">Plan Code (Unique)</label>
              <input type="text" className="form-input" name="planCode" value={formData.planCode} disabled title="Plan Code cannot be edited once active." />
            </div>
            <div className="form-group full-width">
              <label className="form-label">Description</label>
              <textarea className="form-textarea" name="description" value={formData.description} onChange={handleInputChange}></textarea>
            </div>
            <div className="form-group">
              <label className="form-label required">Duration</label>
              <select className="form-select" name="duration" value={formData.duration} onChange={handleInputChange}>
                <option value="Monthly">Monthly</option>
                <option value="Quarterly">Quarterly</option>
                <option value="Half-Yearly">Half-Yearly</option>
                <option value="Yearly">Yearly</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label required">Status</label>
              <select className="form-select" name="status" value={formData.status} onChange={handleInputChange}>
                <option value="Active">Active (Available for Assignment)</option>
                <option value="Draft">Draft (Hidden)</option>
                <option value="Legacy">Legacy (No new assignments)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h2 className="section-title"><Settings size={20} color="var(--primary-color)"/> Limits & Pricing</h2>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label required">Price (USD)</label>
              <div className="input-with-icon">
                <DollarSign size={16} className="input-icon" />
                <input type="number" className="form-input w-full" name="price" value={formData.price} onChange={handleInputChange} />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label required">Maximum Students</label>
              <div className="input-with-icon">
                <Users size={16} className="input-icon" />
                <input type="number" className="form-input w-full" name="maxStudents" placeholder="Leave blank for unlimited" value={formData.maxStudents} onChange={handleInputChange} />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label required">Maximum Preceptors</label>
              <div className="input-with-icon">
                <Users size={16} className="input-icon" />
                <input type="number" className="form-input w-full" name="maxPreceptors" placeholder="Leave blank for unlimited" value={formData.maxPreceptors} onChange={handleInputChange} />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label required">Storage Limit (GB)</label>
              <div className="input-with-icon">
                <Database size={16} className="input-icon" />
                <input type="text" className="form-input w-full" name="storageLimit" value={formData.storageLimit} onChange={handleInputChange} />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label required">Support Level</label>
              <select className="form-select" name="supportLevel" value={formData.supportLevel} onChange={handleInputChange}>
                <option value="Standard">Standard (Email)</option>
                <option value="Priority">Priority (Email + Chat)</option>
                <option value="Dedicated">Dedicated (24/7 Phone + SLA)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h2 className="section-title"><Zap size={20} color="var(--primary-color)"/> Feature Matrix</h2>
          <div className="form-grid" style={{ gridTemplateColumns: '1fr' }}>
            <div className="toggle-group">
              <div className="toggle-label">
                <span className="toggle-title">AI Clinical Assistant</span>
                <span className="toggle-desc">Enable automated SOAP analysis and differential diagnosis suggestions.</span>
              </div>
              <label className="switch">
                <input type="checkbox" checked={formData.features.aiAssistant} onChange={() => handleToggle('aiAssistant')} />
                <span className="slider"></span>
              </label>
            </div>
            <div className="toggle-group">
              <div className="toggle-label">
                <span className="toggle-title">Advanced Reports</span>
                <span className="toggle-desc">Enable custom dashboards, PDF exports, and academic year analytics.</span>
              </div>
              <label className="switch">
                <input type="checkbox" checked={formData.features.reports} onChange={() => handleToggle('reports')} />
                <span className="slider"></span>
              </label>
            </div>
            <div className="toggle-group">
              <div className="toggle-label">
                <span className="toggle-title">Digital Library Access</span>
                <span className="toggle-desc">Provide access to the internal medical literature database.</span>
              </div>
              <label className="switch">
                <input type="checkbox" checked={formData.features.digitalLibrary} onChange={() => handleToggle('digitalLibrary')} />
                <span className="slider"></span>
              </label>
            </div>
            <div className="toggle-group">
              <div className="toggle-label">
                <span className="toggle-title">SMS Notifications</span>
                <span className="toggle-desc">Enable SMS alerts for preceptors (requires Twilio integration).</span>
              </div>
              <label className="switch">
                <input type="checkbox" checked={formData.features.notifications} onChange={() => handleToggle('notifications')} />
                <span className="slider"></span>
              </label>
            </div>
          </div>
        </div>

      </div>

      <div className="sticky-footer">
        <div className="footer-left">
          <button className="btn btn-secondary" onClick={() => navigate('/super-admin/subscriptions')} >Cancel</button>
        </div>
        <div className="footer-right">
          <button className="btn btn-secondary"><RotateCcw size={16} /> Reset</button>
          <button className="btn btn-primary" onClick={handleSaveClick}><Save size={16} /> Save Changes</button>
        </div>
      </div>

      {showConfirm && (
        <>
          <div className="modal-backdrop" onClick={() => setShowConfirm(false)}></div>
          <div className="modal" style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'var(--surface-color)', padding: '24px', borderRadius: '12px', zIndex: 1000, width: '400px', border: '1px solid var(--border-color)' }}>
            <h3 style={{ margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-color)' }}><AlertTriangle color="var(--warning-color)"/> Apply Changes?</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', fontSize: '0.875rem', lineHeight: '1.5' }}>
              You are about to modify a globally applied plan. This will affect 142 active colleges. Do you wish to proceed? An audit log will be generated.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button className="btn btn-secondary" onClick={() => setShowConfirm(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={confirmSave}>Confirm & Save</button>
            </div>
          </div>
        </>
      )}

    </AdminLayout>
  );
};

export default EditSubscriptionPlan;
