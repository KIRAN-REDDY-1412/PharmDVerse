import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Save, Plus, Pencil, ChevronDown } from 'lucide-react';
import CollegeAdminLayout from '../../components/college/CollegeAdminLayout';
import './SettingsPage.css';

const MOCK_BATCHES = [
  { id: 1, name: 'Y26 Batch', status: true },
  { id: 2, name: 'Y25 Batch', status: true },
  { id: 3, name: 'Y24 Batch', status: false },
];

const AcademicSettings = () => {
  const [academicYear, setAcademicYear] = useState(() => {
    return localStorage.getItem('erp_academic_year') || '2026-2027';
  });
  
  const [batches, setBatches] = useState(() => {
    const saved = localStorage.getItem('erp_academic_batches');
    return saved ? JSON.parse(saved) : MOCK_BATCHES;
  });

  const handleSave = () => {
    localStorage.setItem('erp_academic_year', academicYear);
    localStorage.setItem('erp_academic_batches', JSON.stringify(batches));
    alert('Academic Settings saved successfully!');
  };

  const handleReset = () => {
    setAcademicYear('2026-2027');
    setBatches(MOCK_BATCHES);
    localStorage.removeItem('erp_academic_year');
    localStorage.removeItem('erp_academic_batches');
  };

  const toggleBatchStatus = (id) => {
    setBatches(batches.map(b => b.id === id ? { ...b, status: !b.status } : b));
  };

  const handleEditBatch = (id) => {
    const batch = batches.find(b => b.id === id);
    const newName = window.prompt("Enter new batch name:", batch.name);
    if (newName && newName.trim() !== '') {
      setBatches(batches.map(b => b.id === id ? { ...b, name: newName.trim() } : b));
    }
  };

  const handleAddBatch = () => {
    const newName = window.prompt("Enter new batch name (e.g., Y27 Batch):");
    if (newName && newName.trim() !== '') {
      const newId = batches.length > 0 ? Math.max(...batches.map(b => b.id)) + 1 : 1;
      setBatches([...batches, { id: newId, name: newName.trim(), status: true }]);
    }
  };

  return (
    <CollegeAdminLayout>
      <div className="settings-page-container">
        
        <div className="page-header">
          <h1 className="page-title">Academic Settings</h1>
          <div className="breadcrumbs">
            <Link to="/college-admin/dashboard" className="breadcrumb-link">Dashboard</Link>
            <span className="breadcrumb-separator">&gt;</span>
            <Link to="/college-admin/settings" className="breadcrumb-link">Settings</Link>
            <span className="breadcrumb-separator">&gt;</span>
            <span>Academic Settings</span>
          </div>
        </div>

        <div className="settings-card">
          <h2 className="settings-section-title">
            <BookOpen size={20} className="text-orange" />
            Academic Configuration
          </h2>

          <div className="settings-form-grid" style={{ marginBottom: '2.5rem' }}>
            <div className="form-group full-width">
              <label>Current Academic Year</label>
              <div className="form-control-wrapper" style={{ position: 'relative' }}>
                <select className="form-control" value={academicYear} onChange={(e) => setAcademicYear(e.target.value)}>
                  <option value="2026-2027">2026-2027</option>
                  <option value="2025-2026">2025-2026</option>
                  <option value="2024-2025">2024-2025</option>
                </select>
                <ChevronDown size={16} style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--text-secondary)' }} />
              </div>
            </div>
          </div>

          <h2 className="settings-section-title" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <BookOpen size={20} className="text-orange" />
              Batch Management
            </div>
            <button className="btn-save" style={{ fontSize: '0.85rem', padding: '0.4rem 0.8rem', backgroundColor: 'var(--color-primary)' }} onClick={handleAddBatch}>
              <Plus size={16} /> Add New Batch
            </button>
          </h2>

          <div className="table-container" style={{ margin: '1rem 0' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Batch Name</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {batches.map(batch => (
                  <tr key={batch.id}>
                    <td style={{ fontWeight: 600 }}>{batch.name}</td>
                    <td>
                      <div className="toggle-container" style={{ margin: 0 }}>
                        <label className="toggle-switch">
                          <input type="checkbox" checked={batch.status} onChange={() => toggleBatchStatus(batch.id)} />
                          <span className="toggle-slider"></span>
                        </label>
                        <span className={`toggle-label ${batch.status ? 'active-label' : 'inactive-label'}`} style={{ fontSize: '0.8rem' }}>
                          {batch.status ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button className="action-btn" title="Edit Batch" onClick={() => handleEditBatch(batch.id)}>
                          <Pencil size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="settings-footer">
            <button className="btn-cancel" onClick={() => window.history.back()}>Cancel</button>
            <button className="btn-reset" onClick={handleReset}>Reset</button>
            <button className="btn-save" onClick={handleSave}><Save size={18} /> Save Changes</button>
          </div>

        </div>

      </div>
    </CollegeAdminLayout>
  );
};

export default AcademicSettings;
