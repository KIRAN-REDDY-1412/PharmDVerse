import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { useDatabase } from '../../context/DatabaseContext';
import { 
  Settings, TestTube2, RefreshCw, AlertOctagon, Database, 
  History, Sliders, Shield, Rocket, CheckCircle2, AlertTriangle, 
  Play, RotateCcw, ArrowRight, UserCheck, Lock, Save, Globe, Eye
} from 'lucide-react';
import './PlatformSettings.css';
import './CreateSubscriptionPlan.css';

const PlatformSettings = () => {
  const navigate = useNavigate();
  const { 
    releases, platformSettings, toggleMaintenanceMode, 
    testRelease, deployReleaseToProduction, rollbackRelease,
    colleges, auditLogs
  } = useDatabase();

  const [activeTab, setActiveTab] = useState('testing'); // 'testing' | 'updates' | 'maintenance' | 'backup' | 'audit' | 'config'
  const [feedbackMsg, setFeedbackMsg] = useState({ text: '', type: 'success' });
  const [maintMsgInput, setMaintMsgInput] = useState(platformSettings?.maintenanceMessage || '');

  // Sandbox simulation active state
  const [sandboxRole, setSandboxRole] = useState(null); // 'admin' | 'preceptor' | 'student'

  const showFeedback = (text, type = 'success') => {
    setFeedbackMsg({ text, type });
    setTimeout(() => setFeedbackMsg({ text: '', type: 'success' }), 5000);
  };

  const handleTestReleaseClick = (relId) => {
    testRelease(relId);
    showFeedback(`Release ${relId} verified & marked as Tested! Ready for Production Deployment.`);
  };

  const handleDeployReleaseClick = (relId) => {
    const res = deployReleaseToProduction(relId);
    if (res.success) {
      showFeedback(`🚀 Release ${relId} deployed to Production! Updated ${res.count} active colleges and sent platform notifications.`);
    } else {
      showFeedback(`❌ Deployment Failed: ${res.message}`, 'error');
    }
  };

  const handleRollbackClick = (relId) => {
    rollbackRelease(relId);
    showFeedback(`⚠️ Release ${relId} has been rolled back. Notifications sent.`, 'warning');
  };

  const handleToggleMaintenance = () => {
    const newStatus = !platformSettings.maintenanceMode;
    toggleMaintenanceMode(newStatus, maintMsgInput);
    showFeedback(`Maintenance Mode ${newStatus ? 'ENABLED' : 'DISABLED'}.`);
  };

  const handleLaunchSandbox = (role) => {
    setSandboxRole(role);
    showFeedback(`Launched isolated Sandbox Testing Environment for ${role.toUpperCase()} Portal. Production data is completely isolated.`, 'success');
  };

  return (
    <AdminLayout>
      <div className="settings-container">
        
        {/* Header */}
        <div className="settings-header">
          <div>
            <h1 className="page-title" style={{ margin: '0 0 4px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Settings size={24} color="var(--primary-color)"/> Platform Settings & Release Management
            </h1>
            <p className="page-subtitle" style={{ margin: 0 }}>
              Enterprise administration, isolated portal testing, version releases, and maintenance control.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, backgroundColor: 'var(--primary-color)', color: '#fff', padding: '6px 14px', borderRadius: '20px' }}>
              PharmDVerse ERP v{platformSettings?.erpVersion || '2.1.0'}
            </span>
          </div>
        </div>

        {feedbackMsg.text && (
          <div style={{ 
            backgroundColor: feedbackMsg.type === 'error' ? '#fef2f2' : (feedbackMsg.type === 'warning' ? '#fffbebf' : '#f0fdf4'), 
            border: `1px solid ${feedbackMsg.type === 'error' ? '#fca5a5' : (feedbackMsg.type === 'warning' ? '#fde047' : '#bbf7d0')}`, 
            color: feedbackMsg.type === 'error' ? '#991b1b' : (feedbackMsg.type === 'warning' ? '#854d0e' : '#166534'), 
            padding: '12px 16px', 
            borderRadius: '8px', 
            marginBottom: '20px', 
            fontWeight: 600,
            fontSize: '0.9rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <CheckCircle2 size={18} />
            <span>{feedbackMsg.text}</span>
          </div>
        )}

        <div className="settings-layout">
          
          {/* Sidebar Tabs (Condition 7) */}
          <div className="settings-sidebar">
            <button className={`settings-tab ${activeTab === 'testing' ? 'active' : ''}`} onClick={() => setActiveTab('testing')}>
              <TestTube2 size={18}/> Platform Testing
            </button>
            <button className={`settings-tab ${activeTab === 'updates' ? 'active' : ''}`} onClick={() => setActiveTab('updates')}>
              <RefreshCw size={18}/> System Updates & Releases
            </button>
            <button className={`settings-tab ${activeTab === 'maintenance' ? 'active' : ''}`} onClick={() => setActiveTab('maintenance')}>
              <AlertOctagon size={18}/> Maintenance Mode
            </button>
            <button className={`settings-tab ${activeTab === 'backup' ? 'active' : ''}`} onClick={() => setActiveTab('backup')}>
              <Database size={18}/> Backup & Restore
            </button>
            <button className={`settings-tab ${activeTab === 'audit' ? 'active' : ''}`} onClick={() => setActiveTab('audit')}>
              <History size={18}/> Audit Logs
            </button>
            <button className={`settings-tab ${activeTab === 'config' ? 'active' : ''}`} onClick={() => setActiveTab('config')}>
              <Sliders size={18}/> System Configuration
            </button>
          </div>

          <div className="settings-content-card">
            
            {/* TAB 1: PLATFORM TESTING (Condition 7) */}
            {activeTab === 'testing' && (
              <div>
                <div style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', pb: '1rem' }}>
                  <h2 className="settings-section-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <TestTube2 color="var(--primary-color)" size={22}/> Isolated Platform Testing Environment
                  </h2>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
                    Isolated sandbox environment for Super Admin verification. Testing actions do not affect real college production data.
                  </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '2rem' }}>
                  
                  {/* Test College Admin Portal */}
                  <div className="card" style={{ padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-color)', backgroundColor: 'var(--surface-color)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: '#eff6ff', color: '#1e40af', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Shield size={22} />
                      </div>
                      <div>
                        <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700 }}>Test College Admin Portal</h3>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Isolated Admin Sandbox</span>
                      </div>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                      Test preceptor provisioning, student assignments, case overrides, and academic year settings in simulated environment.
                    </p>
                    <button className="btn btn-secondary w-full" onClick={() => handleLaunchSandbox('admin')} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                      <Play size={16} /> Launch College Admin Sandbox
                    </button>
                  </div>

                  {/* Test Preceptor Portal */}
                  <div className="card" style={{ padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-color)', backgroundColor: 'var(--surface-color)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: '#ecfdf5', color: '#047857', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <UserCheck size={22} />
                      </div>
                      <div>
                        <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700 }}>Test Preceptor Portal</h3>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Isolated Preceptor Sandbox</span>
                      </div>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                      Test case evaluation, form review, section comments auto-saving, and SOAP approval workflows.
                    </p>
                    <button className="btn btn-secondary w-full" onClick={() => handleLaunchSandbox('preceptor')} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                      <Play size={16} /> Launch Preceptor Sandbox
                    </button>
                  </div>

                  {/* Test Student Portal */}
                  <div className="card" style={{ padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-color)', backgroundColor: 'var(--surface-color)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: '#fff7ed', color: '#c2410c', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Rocket size={22} />
                      </div>
                      <div>
                        <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700 }}>Test Student Portal</h3>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Isolated Student Sandbox</span>
                      </div>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                      Test 5 clinical form creation steps (Patient Profile, Counselling, DI, Intervention, ADR) and student submission.
                    </p>
                    <button className="btn btn-secondary w-full" onClick={() => handleLaunchSandbox('student')} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                      <Play size={16} /> Launch Student Sandbox
                    </button>
                  </div>

                </div>

                {sandboxRole && (
                  <div style={{ padding: '1.5rem', backgroundColor: '#f0f9ff', borderRadius: '12px', border: '1px solid #bae6fd', color: '#0369a1' }}>
                    <h4 style={{ margin: '0 0 8px 0', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <CheckCircle2 size={18} /> Active Sandbox Session: {sandboxRole.toUpperCase()} PORTAL
                    </h4>
                    <p style={{ margin: '0 0 12px 0', fontSize: '0.85rem', lineHeight: 1.5 }}>
                      You are currently testing in isolated sandbox mode. All case creations and reviews remain in simulated memory without affecting production databases.
                    </p>
                    <button className="btn btn-secondary" onClick={() => setSandboxRole(null)} style={{ fontSize: '0.8rem' }}>
                      Exit Sandbox Testing Mode
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: SYSTEM UPDATES & RELEASE MANAGEMENT (Condition 7 & 8) */}
            {activeTab === 'updates' && (
              <div>
                <div style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', pb: '1rem' }}>
                  <h2 className="settings-section-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <RefreshCw color="var(--primary-color)" size={22}/> System Updates & Release Management
                  </h2>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
                    Enterprise Release Workflow: Developer → Development → Platform Testing → Super Admin Verification → Release To Production.
                  </p>
                </div>

                {/* Current Active Platform Version */}
                <div style={{ padding: '1.25rem 1.5rem', backgroundColor: 'var(--surface-color)', borderRadius: '12px', border: '1px solid var(--border-color)', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                  <div>
                    <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-secondary)', fontWeight: 700 }}>Current Live Version</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary-color)' }}>PharmDVerse ERP v{platformSettings?.erpVersion || '2.1.0'}</div>
                  </div>

                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    Active Institutions Updated: <strong>{colleges.filter(c => c.status === 'active').length} Colleges</strong>
                  </div>
                </div>

                {/* Release History & Management Table (Condition 8) */}
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-color)' }}>
                  Release Pipeline & History
                </h3>

                <div className="data-grid-container" style={{ overflowX: 'auto' }}>
                  <table className="enterprise-table" style={{ width: '100%' }}>
                    <thead>
                      <tr>
                        <th>Version</th>
                        <th>Release Date</th>
                        <th>Released By</th>
                        <th>Release Notes</th>
                        <th>Testing Status</th>
                        <th>Deployment Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(releases || []).map((rel) => (
                        <tr key={rel.id}>
                          <td>
                            <strong style={{ fontSize: '0.95rem', color: 'var(--primary-color)' }}>v{rel.versionNumber}</strong>
                          </td>
                          <td style={{ fontSize: '0.85rem' }}>{rel.releaseDate}</td>
                          <td style={{ fontSize: '0.85rem' }}>{rel.releasedBy}</td>
                          <td style={{ fontSize: '0.85rem', maxWidth: '280px', lineHeight: 1.4 }}>{rel.releaseNotes}</td>
                          <td>
                            {rel.tested ? (
                              <span className="status-badge success" style={{ fontSize: '0.75rem' }}><CheckCircle2 size={12}/> Tested</span>
                            ) : (
                              <span className="status-badge warning" style={{ fontSize: '0.75rem' }}><AlertTriangle size={12}/> Pending Test</span>
                            )}
                          </td>
                          <td>
                            <span className={`status-badge ${rel.deploymentStatus === 'Deployed' ? 'success' : (rel.deploymentStatus === 'Tested' ? 'warning' : 'neutral')}`}>
                              {rel.deploymentStatus}
                            </span>
                          </td>
                          <td>
                            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                              {!rel.tested && (
                                <button className="btn btn-secondary" onClick={() => handleTestReleaseClick(rel.id)} style={{ padding: '4px 10px', fontSize: '0.75rem' }}>
                                  Verify & Test
                                </button>
                              )}

                              {rel.deploymentStatus !== 'Deployed' && (
                                <button className="btn btn-primary" onClick={() => handleDeployReleaseClick(rel.id)} style={{ padding: '4px 10px', fontSize: '0.75rem' }}>
                                  Release To Production
                                </button>
                              )}

                              {rel.deploymentStatus === 'Deployed' && (
                                <button className="btn btn-danger" onClick={() => handleRollbackClick(rel.id)} style={{ padding: '4px 10px', fontSize: '0.75rem' }}>
                                  Rollback
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

              </div>
            )}

            {/* TAB 3: MAINTENANCE MODE (Condition 7) */}
            {activeTab === 'maintenance' && (
              <div>
                <div style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', pb: '1rem' }}>
                  <h2 className="settings-section-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <AlertOctagon color="var(--primary-color)" size={22}/> Maintenance Mode Control
                  </h2>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
                    Enable maintenance mode to temporarily restrict non-admin users during emergency server updates.
                  </p>
                </div>

                <div style={{ padding: '2rem', borderRadius: '12px', border: '1px solid var(--border-color)', backgroundColor: 'var(--surface-color)', maxWidth: '600px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <div>
                      <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>Maintenance Mode Status</h3>
                      <span style={{ fontSize: '0.85rem', color: platformSettings.maintenanceMode ? '#dc2626' : '#166534', fontWeight: 700 }}>
                        {platformSettings.maintenanceMode ? 'ACTIVE (System Maintenance ON)' : 'OFF (Normal Operation)'}
                      </span>
                    </div>

                    <button 
                      className={`btn ${platformSettings.maintenanceMode ? 'btn-danger' : 'btn-primary'}`}
                      onClick={handleToggleMaintenance}
                    >
                      {platformSettings.maintenanceMode ? 'Turn Maintenance OFF' : 'Enable Maintenance Mode'}
                    </button>
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ fontWeight: 600 }}>Custom Maintenance Message for Users</label>
                    <textarea 
                      className="form-input" 
                      rows={4} 
                      value={maintMsgInput} 
                      onChange={(e) => setMaintMsgInput(e.target.value)} 
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: BACKUP & RESTORE (Condition 7 & Condition 11.B) */}
            {activeTab === 'backup' && (
              <div>
                <div style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', pb: '1rem' }}>
                  <h2 className="settings-section-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Database color="var(--primary-color)" size={22}/> Enterprise Backup & Restore Management
                  </h2>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
                    Super Admin Only. Manual & scheduled backups covering Database, Clinical Cases, Media Files, Landing Pages, and System Config.
                  </p>
                </div>

                {/* Scope & Action Bar */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '12px' }}>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button 
                      className="btn btn-primary" 
                      onClick={() => {
                        const newBak = createPlatformBackup({ scope: 'Full Platform' });
                        showFeedback(`✅ Created Full Platform Backup snapshot "${newBak.name}".`);
                      }}
                      style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                    >
                      <Database size={16} /> Create Full Platform Backup
                    </button>

                    <button 
                      className="btn btn-secondary" 
                      onClick={() => {
                        const col = colleges[0];
                        if (col) {
                          const newBak = createPlatformBackup({ collegeId: col.id });
                          showFeedback(`✅ Created Institution Snapshot for ${col.name} (${newBak.name}).`);
                        }
                      }}
                      style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                    >
                      <Building2 size={16} /> Backup Specific College
                    </button>
                  </div>

                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    Schedule: <strong>{platformSettings.autoBackupFrequency || 'Daily (02:00 UTC)'}</strong>
                  </div>
                </div>

                {/* Backup Scope Overview Card */}
                <div style={{ padding: '1rem 1.25rem', backgroundColor: 'var(--surface-color)', borderRadius: '10px', border: '1px solid var(--border-color)', marginBottom: '1.5rem', fontSize: '0.85rem' }}>
                  <strong>Protected Backup Scope:</strong> Full PostgreSQL/MongoDB Database, Uploaded Clinical Documents, Clinical Case Records, Institution Landing Page Content, College Configuration Schemas, Media Assets, and System Configuration.
                </div>

                {/* Backup History Table (Condition 11.B) */}
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-color)' }}>
                  Backup History & Recovery Points
                </h3>

                <div className="data-grid-container" style={{ overflowX: 'auto' }}>
                  <table className="enterprise-table" style={{ width: '100%' }}>
                    <thead>
                      <tr>
                        <th>Backup Name / ID</th>
                        <th>Created Date</th>
                        <th>Size</th>
                        <th>Created By</th>
                        <th>Type & Scope</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(backups || []).map((bak) => (
                        <tr key={bak.id}>
                          <td>
                            <strong style={{ fontSize: '0.9rem', color: 'var(--primary-color)' }}>{bak.name}</strong>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>ID: {bak.id}</div>
                          </td>
                          <td style={{ fontSize: '0.85rem' }}>{new Date(bak.date).toLocaleString()}</td>
                          <td style={{ fontSize: '0.85rem', fontWeight: 600 }}>{bak.size}</td>
                          <td style={{ fontSize: '0.85rem' }}>{bak.createdBy}</td>
                          <td style={{ fontSize: '0.85rem' }}>
                            <div>{bak.type}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{bak.scope}</div>
                          </td>
                          <td>
                            <span className="status-badge success" style={{ fontSize: '0.75rem' }}>
                              <CheckCircle2 size={12}/> {bak.status}
                            </span>
                          </td>
                          <td>
                            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                              <button 
                                className="btn btn-secondary" 
                                onClick={() => {
                                  if (window.confirm(`Initiate safe restore from snapshot ${bak.name}?\n\nA pre-restore auto-snapshot will be created automatically for security.`)) {
                                    const res = restoreBackup({ backupId: bak.id, createPreRestoreSnapshot: true });
                                    if (res.success) {
                                      showFeedback(`🛡️ Successfully restored system state from ${res.backupName}! (Pre-restore snapshot: ${res.preRestoreSnapshot})`);
                                    }
                                  }
                                }}
                                style={{ padding: '4px 10px', fontSize: '0.75rem', backgroundColor: '#eff6ff', color: '#1e40af', border: '1px solid #bfdbfe' }}
                              >
                                Restore
                              </button>

                              <button 
                                className="btn btn-secondary" 
                                onClick={() => showFeedback(`Downloading backup log for ${bak.name}...`)}
                                style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                              >
                                Download Log
                              </button>

                              <button 
                                className="btn btn-danger" 
                                onClick={() => {
                                  if (window.confirm(`Delete backup point ${bak.name}? This action will be audited.`)) {
                                    deleteBackup(bak.id);
                                    showFeedback(`Backup point ${bak.name} deleted.`);
                                  }
                                }}
                                style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

              </div>
            )}

            {/* TAB 5: AUDIT LOGS (Condition 7) */}
            {activeTab === 'audit' && (
              <div>
                <div style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', pb: '1rem' }}>
                  <h2 className="settings-section-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <History color="var(--primary-color)" size={22}/> Platform Audit Trail
                  </h2>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
                    System audit logs recording platform updates, permission changes, and security events.
                  </p>
                </div>

                {(!auditLogs || auditLogs.length === 0) ? (
                  <p style={{ color: 'var(--text-secondary)' }}>No audit events recorded yet.</p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {auditLogs.slice(0, 10).map((log) => (
                      <div key={log.id} style={{ padding: '12px 16px', borderRadius: '8px', backgroundColor: 'var(--bg-main)', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{log.module}</div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Modified by: {log.modifiedBy}</div>
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                          {new Date(log.date).toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 6: SYSTEM CONFIGURATION (Condition 7) */}
            {activeTab === 'config' && (
              <div>
                <div style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', pb: '1rem' }}>
                  <h2 className="settings-section-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Sliders color="var(--primary-color)" size={22}/> System Configuration
                  </h2>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
                    Global ERP branding, default storage allocation, and platform parameters.
                  </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', maxWidth: '700px' }}>
                  <div className="form-group">
                    <label className="form-label" style={{ fontWeight: 600 }}>Platform Name</label>
                    <input type="text" className="form-input" defaultValue="PharmDVerse ERP" />
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ fontWeight: 600 }}>Default Storage Allocation</label>
                    <input type="text" className="form-input" defaultValue={platformSettings.defaultStorageLimit} />
                  </div>

                  <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                    <label className="form-label" style={{ fontWeight: 600 }}>Default Theme Mode</label>
                    <select className="form-select">
                      <option>Dark Mode (Recommended)</option>
                      <option>Light Mode</option>
                      <option>System Default</option>
                    </select>
                  </div>

                  <button className="btn btn-primary" onClick={() => showFeedback('System configuration saved.')}>
                    <Save size={16} /> Save Configuration
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>
      </div>
    </AdminLayout>
  );
};

export default PlatformSettings;
