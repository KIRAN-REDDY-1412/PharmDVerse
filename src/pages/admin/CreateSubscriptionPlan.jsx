import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { 
  ArrowLeft, Save, RotateCcw, Box, DollarSign, Settings,
  Zap, Database, Users, AlertCircle
} from 'lucide-react';
import './CreateSubscriptionPlan.css';

const CreateSubscriptionPlan = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    planName: '',
    planCode: '',
    description: '',
    duration: 'Yearly',
    price: '',
    maxStudents: '',
    maxPreceptors: '',
    storageLimit: '100',
    supportLevel: 'Standard',
    status: 'Active',
    features: {
      aiAssistant: false,
      reports: true,
      digitalLibrary: false,
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

  const handleSave = () => {
    if (!formData.planName || !formData.planCode || !formData.price) {
      alert("Please fill all required fields.");
      return;
    }
    alert(`Subscription Plan ${formData.planCode} created successfully!`);
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
              <h1 className="page-title">Create Subscription Plan</h1>
              <p className="page-subtitle">Configure a new SaaS tier for colleges.</p>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h2 className="section-title"><Box size={20} color="var(--primary-color)"/> General Information</h2>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label required">Plan Name</label>
              <input type="text" className="form-input" name="planName" placeholder="e.g., Enterprise Plus" value={formData.planName} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label className="form-label required">Plan Code (Unique)</label>
              <input type="text" className="form-input" name="planCode" placeholder="e.g., ENT-PLUS-24" value={formData.planCode} onChange={handleInputChange} />
            </div>
            <div className="form-group full-width">
              <label className="form-label">Description</label>
              <textarea className="form-textarea" name="description" placeholder="Brief description of the target audience..." value={formData.description} onChange={handleInputChange}></textarea>
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
                <input type="number" className="form-input w-full" name="price" placeholder="0.00" value={formData.price} onChange={handleInputChange} />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label required">Maximum Students</label>
              <div className="input-with-icon">
                <Users size={16} className="input-icon" />
                <input type="number" className="form-input w-full" name="maxStudents" placeholder="Enter limit (or leave blank for unlimited)" value={formData.maxStudents} onChange={handleInputChange} />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label required">Maximum Preceptors</label>
              <div className="input-with-icon">
                <Users size={16} className="input-icon" />
                <input type="number" className="form-input w-full" name="maxPreceptors" placeholder="Enter limit" value={formData.maxPreceptors} onChange={handleInputChange} />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label required">Storage Limit (GB)</label>
              <div className="input-with-icon">
                <Database size={16} className="input-icon" />
                <input type="number" className="form-input w-full" name="storageLimit" placeholder="100" value={formData.storageLimit} onChange={handleInputChange} />
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
          <button className="btn btn-primary" onClick={handleSave}><Save size={16} /> Create Plan</button>
        </div>
      </div>

    </AdminLayout>
  );
};

export default CreateSubscriptionPlan;
