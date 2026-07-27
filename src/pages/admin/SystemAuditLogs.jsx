import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { 
  Search, Filter, Download, ArrowLeft, History,
  Server, Monitor, Globe, ChevronDown, ChevronRight
} from 'lucide-react';
import './SubscriptionList.css'; // For the table layout

const MOCK_LOGS = [
  {
    id: 'LOG-8812',
    timestamp: '2026-07-27 10:45:12 AM',
    user: 'Sarah Jenkins',
    role: 'Super Admin',
    college: 'PharmDVerse Core',
    module: 'Subscription Management',
    action: 'UPDATE_PLAN',
    description: 'Modified Enterprise Plan Storage Limit',
    oldValue: '50 GB',
    newValue: '100 GB',
    ip: '192.168.1.105',
    browser: 'Chrome 114.0',
    os: 'Windows 11',
    status: 'Success'
  },
  {
    id: 'LOG-8813',
    timestamp: '2026-07-27 09:12:00 AM',
    user: 'Michael Chang',
    role: 'College Admin',
    college: 'University of Texas Pharmacy',
    module: 'User Management',
    action: 'SUSPEND_USER',
    description: 'Suspended Preceptor Account (Dr. Emily Roberts)',
    oldValue: 'Status: Active',
    newValue: 'Status: Suspended',
    ip: '10.0.1.25',
    browser: 'Safari 16.5',
    os: 'macOS 13.4',
    status: 'Success'
  },
  {
    id: 'LOG-8814',
    timestamp: '2026-07-26 11:30:45 PM',
    user: 'SYSTEM',
    role: 'System',
    college: 'Global',
    module: 'Platform Settings',
    action: 'BACKUP_DB',
    description: 'Automated Nightly Database Backup',
    oldValue: 'N/A',
    newValue: 'Snapshot: db-20260726',
    ip: 'localhost',
    browser: 'N/A',
    os: 'Linux (Ubuntu 22.04)',
    status: 'Success'
  },
  {
    id: 'LOG-8815',
    timestamp: '2026-07-26 04:15:22 PM',
    user: 'Unknown User',
    role: 'None',
    college: 'Unknown',
    module: 'Authentication',
    action: 'LOGIN_FAILED',
    description: 'Invalid password attempt for admin@pharmdverse.com',
    oldValue: 'N/A',
    newValue: 'N/A',
    ip: '45.33.12.9',
    browser: 'Firefox 115.0',
    os: 'Windows 10',
    status: 'Failed'
  }
];

const SystemAuditLogs = () => {
  const navigate = useNavigate();
  const [expandedLog, setExpandedLog] = useState(null);

  const toggleExpand = (id) => {
    setExpandedLog(expandedLog === id ? null : id);
  };

  return (
    <AdminLayout>
      <div style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto', color: 'var(--text-color)' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
          <div>
            <h1 className="page-title" style={{ margin: '0 0 4px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <History size={24} color="var(--primary-color)"/> Platform Audit Logs
            </h1>
            <p className="page-subtitle" style={{ margin: 0 }}>Immutable record of all critical platform activities.</p>
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: '12px' }}>
            <button className="btn btn-secondary"><Download size={18} /> Export PDF</button>
            <button className="btn btn-primary"><Download size={18} /> Export Excel / CSV</button>
          </div>
        </div>

        <div className="toolbar" style={{ flexWrap: 'wrap' }}>
          <div className="search-box">
            <Search size={18} color="var(--text-secondary)" />
            <input type="text" placeholder="Search by user, action, module, or ID..." />
          </div>
          <div className="filters" style={{ flexWrap: 'wrap' }}>
            <input type="date" className="filter-btn" style={{ padding: '8px 12px' }}/>
            <select className="form-select" style={{ padding: '8px 12px', fontSize: '0.85rem' }} defaultValue="">
              <option value="" disabled>Module</option>
              <option value="auth">Authentication</option>
              <option value="users">User Management</option>
              <option value="subs">Subscriptions</option>
            </select>
            <select className="form-select" style={{ padding: '8px 12px', fontSize: '0.85rem' }} defaultValue="">
              <option value="" disabled>Status</option>
              <option value="success">Success</option>
              <option value="failed">Failed</option>
            </select>
            <button className="filter-btn"><Filter size={16}/> More Filters</button>
          </div>
        </div>

        <div className="data-grid-container" style={{ overflowX: 'auto' }}>
          <table className="enterprise-table" style={{ width: '100%', minWidth: '1200px', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ width: '40px', padding: '16px' }}></th>
                <th style={{ padding: '16px', textAlign: 'left' }}>Timestamp & ID</th>
                <th style={{ padding: '16px', textAlign: 'left' }}>Actor (User)</th>
                <th style={{ padding: '16px', textAlign: 'left' }}>Module & Action</th>
                <th style={{ padding: '16px', textAlign: 'left' }}>Description</th>
                <th style={{ padding: '16px', textAlign: 'left' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_LOGS.map((log) => (
                <React.Fragment key={log.id}>
                  <tr style={{ cursor: 'pointer', backgroundColor: expandedLog === log.id ? 'rgba(139, 92, 246, 0.05)' : 'transparent' }} onClick={() => toggleExpand(log.id)}>
                    <td style={{ padding: '16px', borderBottom: expandedLog === log.id ? 'none' : '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                      {expandedLog === log.id ? <ChevronDown size={18}/> : <ChevronRight size={18}/>}
                    </td>
                    <td style={{ padding: '16px', borderBottom: expandedLog === log.id ? 'none' : '1px solid var(--border-color)' }}>
                      <div style={{ fontWeight: 600 }}>{log.timestamp}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontFamily: 'monospace' }}>{log.id}</div>
                    </td>
                    <td style={{ padding: '16px', borderBottom: expandedLog === log.id ? 'none' : '1px solid var(--border-color)' }}>
                      <div style={{ fontWeight: 600 }}>{log.user}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{log.role} • {log.college}</div>
                    </td>
                    <td style={{ padding: '16px', borderBottom: expandedLog === log.id ? 'none' : '1px solid var(--border-color)' }}>
                      <div style={{ fontSize: '0.85rem', color: 'var(--primary-color)', fontWeight: 600 }}>{log.module}</div>
                      <div style={{ fontSize: '0.85rem', fontFamily: 'monospace' }}>{log.action}</div>
                    </td>
                    <td style={{ padding: '16px', borderBottom: expandedLog === log.id ? 'none' : '1px solid var(--border-color)', fontSize: '0.875rem' }}>
                      {log.description}
                    </td>
                    <td style={{ padding: '16px', borderBottom: expandedLog === log.id ? 'none' : '1px solid var(--border-color)' }}>
                      <span className={`status-badge ${log.status === 'Success' ? 'success' : 'danger'}`}>
                        {log.status}
                      </span>
                    </td>
                  </tr>
                  
                  {expandedLog === log.id && (
                    <tr style={{ backgroundColor: 'rgba(139, 92, 246, 0.02)' }}>
                      <td colSpan={6} style={{ padding: '0 24px 24px 64px', borderBottom: '1px solid var(--border-color)' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', backgroundColor: 'var(--surface-color)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                          
                          <div>
                            <h4 style={{ margin: '0 0 12px 0', fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Data Changes</h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px', backgroundColor: 'rgba(239, 68, 68, 0.05)', borderRadius: '4px', borderLeft: '3px solid #ef4444' }}>
                                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Old Value:</span>
                                <span style={{ fontFamily: 'monospace', fontSize: '0.85rem' }}>{log.oldValue}</span>
                              </div>
                              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px', backgroundColor: 'rgba(16, 185, 129, 0.05)', borderRadius: '4px', borderLeft: '3px solid #10b981' }}>
                                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>New Value:</span>
                                <span style={{ fontFamily: 'monospace', fontSize: '0.85rem' }}>{log.newValue}</span>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h4 style={{ margin: '0 0 12px 0', fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>System Details</h4>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '0.85rem' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Globe size={14} color="var(--text-secondary)"/> <strong>IP:</strong> {log.ip}
                              </div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Monitor size={14} color="var(--text-secondary)"/> <strong>Browser:</strong> {log.browser}
                              </div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Server size={14} color="var(--text-secondary)"/> <strong>OS:</strong> {log.os}
                              </div>
                            </div>
                          </div>
                          
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </AdminLayout>
  );
};

export default SystemAuditLogs;
