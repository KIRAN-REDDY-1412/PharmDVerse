import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DatabaseBackup, Download, RotateCcw, Plus } from 'lucide-react';
import CollegeAdminLayout from '../../components/college/CollegeAdminLayout';
import './SettingsPage.css';

const MOCK_BACKUPS = [
  { id: 'BAK-001', date: '2026-07-24', time: '02:00 AM', type: 'Automated', size: '45.2 MB', createdBy: 'System', status: 'Success' },
  { id: 'BAK-002', date: '2026-07-20', time: '11:45 AM', type: 'Manual', size: '44.8 MB', createdBy: 'Admin User', status: 'Success' },
  { id: 'BAK-003', date: '2026-07-17', time: '02:00 AM', type: 'Automated', size: '44.1 MB', createdBy: 'System', status: 'Success' },
];

const BackupRestore = () => {
  const [backups] = useState(MOCK_BACKUPS);

  const handleCreateBackup = () => {
    const backupData = {
      users: JSON.parse(localStorage.getItem('erp_users') || '[]'),
      cases: JSON.parse(localStorage.getItem('erp_cases') || '[]'),
      notifications: JSON.parse(localStorage.getItem('erp_notifications') || '[]'),
    };
    const content = JSON.stringify(backupData, null, 2);
    const blob = new Blob([content], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `PharmDVerse_Backup_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    alert('Database backup downloaded successfully.');
  };

  const handleDownload = (id) => {
    handleCreateBackup(); // For now, just generate a fresh backup
  };

  const handleRestore = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const confirmRestore = window.confirm(`WARNING: Restoring will overwrite all current database records. Are you sure you want to proceed?`);
      if (confirmRestore) {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const data = JSON.parse(event.target.result);
            if (data.users && data.cases) {
              localStorage.setItem('erp_users', JSON.stringify(data.users));
              localStorage.setItem('erp_cases', JSON.stringify(data.cases));
              localStorage.setItem('erp_notifications', JSON.stringify(data.notifications || []));
              alert('Database restored successfully! The application will now reload.');
              window.location.reload();
            } else {
              alert('Invalid backup file format.');
            }
          } catch (err) {
            alert('Error parsing backup file.');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  return (
    <CollegeAdminLayout>
      <div className="settings-page-container">
        
        <div className="page-header">
          <h1 className="page-title">Backup & Restore</h1>
          <div className="breadcrumbs">
            <Link to="/college-admin/dashboard" className="breadcrumb-link">Dashboard</Link>
            <span className="breadcrumb-separator">&gt;</span>
            <Link to="/college-admin/settings" className="breadcrumb-link">Settings</Link>
            <span className="breadcrumb-separator">&gt;</span>
            <span>Backup & Restore</span>
          </div>
        </div>

        <div className="settings-card" style={{ maxWidth: '1000px' }}>
          
          <h2 className="settings-section-title" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <DatabaseBackup size={20} className="text-blue" />
              Backup History
            </div>
            <button className="btn-save" style={{ fontSize: '0.85rem', padding: '0.4rem 0.8rem', backgroundColor: 'var(--color-primary)' }} onClick={handleCreateBackup}>
              <Plus size={16} /> Create Backup
            </button>
          </h2>

          <div className="table-container" style={{ margin: '1rem 0' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Backup Date</th>
                  <th>Time</th>
                  <th>Type</th>
                  <th>Size</th>
                  <th>Created By</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {backups.map(row => (
                  <tr key={row.id}>
                    <td>{new Date(row.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
                    <td>{row.time}</td>
                    <td>{row.type}</td>
                    <td>{row.size}</td>
                    <td>{row.createdBy}</td>
                    <td>
                      <span className="status-pill status-active">{row.status}</span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button className="action-btn" title="Download Backup" onClick={() => handleDownload(row.id)}>
                          <Download size={16} />
                        </button>
                        <button className="action-btn" title="Restore Database" onClick={() => handleRestore()} style={{ color: 'var(--color-danger)' }}>
                          <RotateCcw size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>

      </div>
    </CollegeAdminLayout>
  );
};

export default BackupRestore;
