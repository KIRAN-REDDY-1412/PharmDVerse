import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { 
  ArrowLeft, Search, Download, ChevronDown, ChevronUp, Monitor, Globe
} from 'lucide-react';
import './CollegeAuditLogs.css';

const MOCK_AUDIT = [
  {
    id: 'AUD-991',
    timestamp: '2026-07-27 11:15 AM',
    user: 'Super Admin',
    role: 'System Administrator',
    module: 'College Management',
    action: 'UPDATE',
    description: 'Modified college subscription plan from Basic to Enterprise',
    ip: '192.168.1.104',
    browser: 'Chrome 120 / macOS',
    details: {
      old: '{\n  "plan": "Basic",\n  "maxStudents": 500\n}',
      new: '{\n  "plan": "Enterprise",\n  "maxStudents": "Unlimited"\n}'
    }
  },
  {
    id: 'AUD-990',
    timestamp: '2026-07-26 09:30 AM',
    user: 'Dr. Sarah Jenkins',
    role: 'Primary Admin',
    module: 'User Management',
    action: 'CREATE',
    description: 'Added new preceptor account (James Wilson)',
    ip: '10.0.0.55',
    browser: 'Safari 17 / iOS',
    details: null
  },
  {
    id: 'AUD-989',
    timestamp: '2026-07-25 02:45 PM',
    user: 'James Wilson',
    role: 'Preceptor',
    module: 'Authentication',
    action: 'AUTH',
    description: 'Successful login',
    ip: '10.0.0.56',
    browser: 'Edge 119 / Windows',
    details: null
  }
];

const CollegeAuditLogs = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [expandedRow, setExpandedRow] = useState(null);

  const getActionClass = (action) => {
    switch(action) {
      case 'CREATE': return 'create';
      case 'UPDATE': return 'update';
      case 'DELETE': return 'delete';
      case 'AUTH': return 'auth';
      default: return '';
    }
  };

  return (
    <AdminLayout>
      <div className="audit-logs-container">
        
        <div className="audit-header">
          <div className="audit-title-area">
            <button className="icon-btn-small" onClick={() => navigate(`/super-admin/colleges/view/${id}`)}>
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="page-title">Audit Logs</h1>
              <p className="page-subtitle">University of Texas Pharmacy ({id})</p>
            </div>
          </div>
          <button className="btn btn-secondary"><Download size={16}/> Export Full Log</button>
        </div>

        <div className="audit-toolbar">
          <div className="search-box audit-search">
            <Search size={18} color="var(--text-secondary)" />
            <input type="text" placeholder="Search by user, action, or IP address..." />
          </div>
          <div className="audit-filters">
            <select className="audit-filter-select">
              <option>All Modules</option>
              <option>College Management</option>
              <option>User Management</option>
              <option>Authentication</option>
            </select>
            <select className="audit-filter-select">
              <option>All Actions</option>
              <option>CREATE</option>
              <option>UPDATE</option>
              <option>DELETE</option>
              <option>AUTH</option>
            </select>
            <input type="date" className="audit-filter-select" />
          </div>
        </div>

        <div className="audit-table-container">
          <table className="enterprise-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ padding: '16px', borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>Timestamp</th>
                <th style={{ padding: '16px', borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>User</th>
                <th style={{ padding: '16px', borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>Module</th>
                <th style={{ padding: '16px', borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>Action</th>
                <th style={{ padding: '16px', borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>Description</th>
                <th style={{ padding: '16px', borderBottom: '1px solid var(--border-color)', width: '50px' }}></th>
              </tr>
            </thead>
            <tbody>
              {MOCK_AUDIT.map(log => (
                <React.Fragment key={log.id}>
                  <tr className="audit-row" onClick={() => setExpandedRow(expandedRow === log.id ? null : log.id)}>
                    <td style={{ padding: '16px', borderBottom: '1px solid var(--border-color)' }}>
                      <div style={{ fontSize: '0.875rem' }}>{log.timestamp}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{log.id}</div>
                    </td>
                    <td style={{ padding: '16px', borderBottom: '1px solid var(--border-color)' }}>
                      <div style={{ fontWeight: '500' }}>{log.user}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{log.role}</div>
                    </td>
                    <td style={{ padding: '16px', borderBottom: '1px solid var(--border-color)', fontSize: '0.875rem' }}>{log.module}</td>
                    <td style={{ padding: '16px', borderBottom: '1px solid var(--border-color)' }}>
                      <span className={`action-badge ${getActionClass(log.action)}`}>{log.action}</span>
                    </td>
                    <td style={{ padding: '16px', borderBottom: '1px solid var(--border-color)', fontSize: '0.875rem', maxWidth: '300px' }}>
                      {log.description}
                    </td>
                    <td style={{ padding: '16px', borderBottom: '1px solid var(--border-color)', textAlign: 'center', color: 'var(--text-secondary)' }}>
                      {expandedRow === log.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </td>
                  </tr>
                  {expandedRow === log.id && (
                    <tr>
                      <td colSpan="6" style={{ padding: 0, borderBottom: '1px solid var(--border-color)' }}>
                        <div className="audit-expanded-details">
                          {log.details ? (
                            <>
                              <div className="diff-panel">
                                <span className="diff-header">Previous State</span>
                                <div className="diff-content old">{log.details.old}</div>
                              </div>
                              <div className="diff-panel">
                                <span className="diff-header">New State</span>
                                <div className="diff-content new">{log.details.new}</div>
                              </div>
                            </>
                          ) : (
                            <div style={{ gridColumn: 'span 2', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                              No data payload diff available for this action type.
                            </div>
                          )}
                          <div className="audit-meta-grid">
                            <div className="meta-item">
                              <span className="meta-label"><Globe size={12} style={{display:'inline', marginRight:'4px'}}/> IP Address</span>
                              <span className="meta-value">{log.ip}</span>
                            </div>
                            <div className="meta-item">
                              <span className="meta-label"><Monitor size={12} style={{display:'inline', marginRight:'4px'}}/> User Agent</span>
                              <span className="meta-value">{log.browser}</span>
                            </div>
                            <div className="meta-item">
                              <span className="meta-label">System Status</span>
                              <span className="meta-value" style={{color: '#10b981'}}>Success</span>
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

export default CollegeAuditLogs;
