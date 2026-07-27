import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { ArrowLeft, Save, RotateCcw, AlertTriangle } from 'lucide-react';
import './EditCollege.css';

const MOCK_COLLEGE = {
  id: 'COL-001',
  collegeName: 'University of Texas Pharmacy',
  shortName: 'UT Pharmacy',
  collegeCode: 'UTP-001',
  collegeType: 'University',
  pciApproval: 'PCI-2023-8891',
  affiliation: 'University of Texas System',
  website: 'pharmacy.utexas.edu',
  establishedYear: '1952',
  address1: '123 University Ave',
  address2: 'Building B',
  city: 'Austin',
  district: 'Travis',
  state: 'Texas',
  country: 'USA',
  pinCode: '78712',
  officialEmail: 'admin@pharmacy.utexas.edu',
  officialMobile: '+1 (512) 555-0198',
  officePhone: '+1 (512) 555-0199',
  principalName: 'Dr. Alan Peterson',
  qualification: 'Pharm.D, Ph.D',
  principalEmail: 'a.peterson@utexas.edu',
  principalMobile: '+1 (512) 555-0200'
};

const EditCollege = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(MOCK_COLLEGE);
  const [errors, setErrors] = useState({});
  const [showConfirm, setShowConfirm] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.collegeName) newErrors.collegeName = 'Required';
    if (!formData.officialEmail) newErrors.officialEmail = 'Required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return false;
    }
    return true;
  };

  const handleSave = () => {
    if (validate()) {
      setShowConfirm(true);
    }
  };

  const confirmSave = () => {
    setShowConfirm(false);
    alert('Changes saved successfully! Audit log generated.');
    navigate(`/super-admin/colleges/view/${id}`);
  };

  return (
    <AdminLayout>
      <div className="edit-college-container">
        
        <div className="edit-header">
          <div className="edit-title-area">
            <button className="icon-btn-small" onClick={() => navigate(`/super-admin/colleges/view/${id}`)}>
              <ArrowLeft size={20} />
            </button>
            <div className="edit-college-logo">UT</div>
            <div>
              <h1 className="page-title">Edit College</h1>
              <p className="page-subtitle">Modifying: {MOCK_COLLEGE.collegeName}</p>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h2 className="section-title">College Information</h2>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label required">College Name</label>
              <input type="text" className={`form-input ${errors.collegeName ? 'error' : ''}`} name="collegeName" value={formData.collegeName} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Short Name</label>
              <input type="text" className="form-input" name="shortName" value={formData.shortName} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label className="form-label">College Code</label>
              <input type="text" className="form-input" name="collegeCode" value={formData.collegeCode} disabled title="College Code cannot be modified after registration" />
            </div>
            <div className="form-group">
              <label className="form-label">College Type</label>
              <select className="form-select" name="collegeType" value={formData.collegeType} onChange={handleInputChange}>
                <option value="Government">Government</option>
                <option value="Private">Private</option>
                <option value="Autonomous">Autonomous</option>
                <option value="University">University</option>
                <option value="Deemed">Deemed</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">PCI Approval Number</label>
              <input type="text" className="form-input" name="pciApproval" value={formData.pciApproval} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Website</label>
              <input type="url" className="form-input" name="website" value={formData.website} onChange={handleInputChange} />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h2 className="section-title">Address Information</h2>
          <div className="form-grid">
            <div className="form-group" style={{ gridColumn: 'span 2' }}>
              <label className="form-label required">Address Line 1</label>
              <input type="text" className="form-input" name="address1" value={formData.address1} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label className="form-label required">City</label>
              <input type="text" className="form-input" name="city" value={formData.city} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label className="form-label required">State</label>
              <input type="text" className="form-input" name="state" value={formData.state} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label className="form-label required">PIN Code</label>
              <input type="text" className="form-input" name="pinCode" value={formData.pinCode} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label className="form-label required">Country</label>
              <input type="text" className="form-input" name="country" value={formData.country} onChange={handleInputChange} />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h2 className="section-title">Contact & Principal</h2>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label required">Official Email</label>
              <input type="email" className={`form-input ${errors.officialEmail ? 'error' : ''}`} name="officialEmail" value={formData.officialEmail} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label className="form-label required">Official Mobile</label>
              <input type="tel" className="form-input" name="officialMobile" value={formData.officialMobile} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label className="form-label required">Principal Name</label>
              <input type="text" className="form-input" name="principalName" value={formData.principalName} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Principal Email</label>
              <input type="email" className="form-input" name="principalEmail" value={formData.principalEmail} onChange={handleInputChange} />
            </div>
          </div>
        </div>

      </div>

      <div className="sticky-footer">
        <div className="footer-left">
          <button className="btn btn-secondary" onClick={() => navigate(`/super-admin/colleges/view/${id}`)}>Cancel</button>
        </div>
        <div className="footer-right">
          <button className="btn btn-secondary" onClick={() => setFormData(MOCK_COLLEGE)}><RotateCcw size={16} /> Reset</button>
          <button className="btn btn-primary" onClick={handleSave}><Save size={16} /> Save Changes</button>
        </div>
      </div>

      {showConfirm && (
        <>
          <div className="modal-backdrop" onClick={() => setShowConfirm(false)}></div>
          <div className="modal" style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'var(--surface-color)', padding: '24px', borderRadius: '12px', zIndex: 1000, width: '400px', border: '1px solid var(--border-color)' }}>
            <h3 style={{ margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-color)' }}><AlertTriangle color="var(--warning-color)"/> Confirm Changes</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', fontSize: '0.875rem', lineHeight: '1.5' }}>
              Are you sure you want to save these modifications? This action will update the college profile and generate a system audit log.
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

export default EditCollege;
