import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, Book, PlayCircle, FileText, CheckCircle, 
  AlertCircle, MessageSquareWarning, ArrowRight, LifeBuoy, X, Paperclip, Send
} from 'lucide-react';
import CollegeAdminLayout from '../../components/college/CollegeAdminLayout';
import './PreceptorManagement.css'; // Leverage standard list grid
import './PreceptorList.css'; // Leverage standard data grid

const MOCK_TICKETS = [
  { id: 'TKT-2026-8094', category: 'Bug Report', subject: 'Preceptor assignment sync failure', date: '2026-10-25 14:30', status: 'In Progress' },
  { id: 'TKT-2026-8091', category: 'Feature Request', subject: 'Add Bulk SMS capability', date: '2026-10-22 09:15', status: 'Open' },
  { id: 'TKT-2026-8088', category: 'Help Request', subject: 'How to export custom case analytics?', date: '2026-10-20 11:00', status: 'Pending User' },
  { id: 'TKT-2026-8012', category: 'Bug Report', subject: 'Dashboard KPIs not refreshing', date: '2026-10-01 16:45', status: 'Resolved' },
];

const getStatusColor = (status) => {
  switch (status) {
    case 'Open': return { bg: '#fee2e2', color: '#991b1b', border: '#fca5a5' }; // Red
    case 'In Progress': return { bg: '#fef3c7', color: '#92400e', border: '#fcd34d' }; // Yellow
    case 'Pending User': return { bg: '#ffedd5', color: '#9a3412', border: '#fdba74' }; // Orange
    case 'Resolved': return { bg: '#dcfce7', color: '#166534', border: '#86efac' }; // Green
    default: return { bg: '#f3f4f6', color: '#374151', border: '#d1d5db' };
  }
};

const CollegeSupportHub = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [ticketData, setTicketData] = useState({ category: 'bug', subject: '', description: '' });

  const handleTicketSubmit = () => {
    if (!ticketData.subject || !ticketData.description) {
      alert('Please fill out all required fields.');
      return;
    }
    alert(`Ticket TKT-2026-${Math.floor(Math.random() * 9000) + 1000} created successfully. Context variables (Browser, OS) attached.`);
    setIsTicketModalOpen(false);
    setTicketData({ category: 'bug', subject: '', description: '' });
  };

  return (
    <CollegeAdminLayout>
      <div className="list-page-container" style={{ padding: '0', display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 70px)', background: 'var(--bg-main)' }}>
        
        {/* Header (No standard breadcrumbs, this is a dashboard hub) */}
        
        {/* 1. Hero Banner (Global Search) */}
        <div style={{ background: 'var(--color-primary)', padding: '4rem 2rem', textAlign: 'center', color: 'white' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem' }}>How can we help you today?</h1>
          <p style={{ fontSize: '1.1rem', opacity: 0.9, marginBottom: '2rem' }}>Search our knowledge base, tutorials, and system documentation.</p>
          
          <div style={{ maxWidth: '600px', margin: '0 auto', position: 'relative' }}>
            <Search size={24} style={{ position: 'absolute', left: '20px', top: '16px', color: '#6b7280' }} />
            <input 
              type="text" 
              placeholder="Search for articles (e.g. 'How to reset a student password')" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: '100%', padding: '1.25rem 1.25rem 1.25rem 3.5rem', fontSize: '1.1rem', borderRadius: '30px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
            />
          </div>
        </div>

        {/* 2. System Status Ribbon */}
        <div style={{ background: '#ecfdf5', borderBottom: '1px solid #a7f3d0', padding: '1rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', color: '#065f46', fontWeight: 600 }}>
          <CheckCircle size={20} /> All Systems Operational. No maintenance scheduled.
        </div>

        <div style={{ padding: '3rem 2rem', maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
          
          {/* 3. Grid Navigation (Self-Service) */}
          <div className="preceptor-actions-grid" style={{ marginBottom: '4rem' }}>
            <Link to="/coming-soon" className="action-card" style={{ background: 'var(--bg-surface)' }}>
              <div className="action-icon-wrapper blue">
                <Book size={32} />
              </div>
              <div className="action-details">
                <span className="action-title">Documentation & FAQs</span>
                <span className="action-subtitle">Browse detailed user guides and frequently asked questions.</span>
              </div>
            </Link>
            <Link to="/coming-soon" className="action-card" style={{ background: 'var(--bg-surface)' }}>
              <div className="action-icon-wrapper purple">
                <PlayCircle size={32} />
              </div>
              <div className="action-details">
                <span className="action-title">Video Library</span>
                <span className="action-subtitle">Watch interactive tutorials on ERP features and workflows.</span>
              </div>
            </Link>
            <Link to="/coming-soon" className="action-card" style={{ background: 'var(--bg-surface)' }}>
              <div className="action-icon-wrapper orange">
                <FileText size={32} />
              </div>
              <div className="action-details">
                <span className="action-title">Release Notes</span>
                <span className="action-subtitle">See what's new in PharmDVerse v2.4 updates and patches.</span>
              </div>
            </Link>
          </div>

          {/* 4. Ticket Tracker Data Grid */}
          <div style={{ background: 'var(--bg-surface)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--border-color)', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>My Support Tickets</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Track the lifecycle of your bug reports and feature requests.</p>
              </div>
              <button className="btn-primary" onClick={() => setIsTicketModalOpen(true)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <LifeBuoy size={18} /> Raise Support Ticket
              </button>
            </div>

            <div className="table-container" style={{ border: 'none' }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Ticket ID</th>
                    <th>Category</th>
                    <th>Subject</th>
                    <th>Submission Date</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {MOCK_TICKETS.map(tkt => {
                    const statusStyle = getStatusColor(tkt.status);
                    return (
                      <tr key={tkt.id}>
                        <td style={{ fontWeight: 600, color: 'var(--color-primary)' }}>{tkt.id}</td>
                        <td>{tkt.category}</td>
                        <td style={{ fontWeight: 500 }}>{tkt.subject}</td>
                        <td style={{ color: 'var(--text-secondary)' }}>{tkt.date}</td>
                        <td>
                          <span style={{ 
                            background: statusStyle.bg, color: statusStyle.color, border: `1px solid ${statusStyle.border}`,
                            padding: '4px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 600
                          }}>
                            {tkt.status}
                          </span>
                        </td>
                        <td>
                          <button style={{ background: 'transparent', border: 'none', color: 'var(--color-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: 600 }}>
                            View <ArrowRight size={14} />
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

          </div>

          {/* Emergency Escalation */}
          <div style={{ marginTop: '2rem', display: 'flex', alignItems: 'flex-start', gap: '1rem', padding: '1.5rem', background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: '12px' }}>
            <AlertCircle size={28} style={{ color: '#dc2626', flexShrink: 0 }} />
            <div>
              <h3 style={{ fontSize: '1.1rem', color: '#991b1b', marginBottom: '0.25rem' }}>Emergency Escalation Hotline</h3>
              <p style={{ color: '#7f1d1d', fontSize: '0.9rem', marginBottom: '0.5rem' }}>For critical platform outages (e.g. Database Offline) that severely impact institutional operations, bypass the ticketing queue.</p>
              <div style={{ fontWeight: 700, color: '#dc2626', fontSize: '1.1rem' }}>+1 (800) 555-CRITICAL (Option 1)</div>
            </div>
          </div>

        </div>

      </div>

      {/* Slide-out Drawer / Modal for Raise Ticket */}
      {isTicketModalOpen && (
        <div className="modal-overlay" onClick={() => setIsTicketModalOpen(false)}>
          <div className="student-modal" onClick={e => e.stopPropagation()} style={{ maxWidth: '600px', width: '100%' }}>
            
            <div className="modal-header">
              <div className="modal-title-group">
                <MessageSquareWarning size={32} className="modal-title-icon" style={{ backgroundColor: 'var(--color-primary)', color: 'white', padding: '6px', borderRadius: '8px' }} />
                <div className="modal-title-text">
                  <h2>Submit a Ticket</h2>
                  <p>Escalate an issue directly to the engineering team.</p>
                </div>
              </div>
              <button className="close-button" onClick={() => setIsTicketModalOpen(false)}><X size={24} /></button>
            </div>

            <div className="modal-body">
              <div className="form-section">
                
                <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                  <label className="required">Ticket Category</label>
                  <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                    {['bug', 'feature', 'help'].map(type => (
                      <label key={type} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', padding: '0.75rem 1rem', border: '1px solid var(--border-color)', borderRadius: '8px', background: ticketData.category === type ? 'var(--bg-surface-alt)' : 'transparent', flex: 1 }}>
                        <input type="radio" name="category" value={type} checked={ticketData.category === type} onChange={(e) => setTicketData({...ticketData, category: e.target.value})} />
                        <span style={{ textTransform: 'capitalize', fontWeight: ticketData.category === type ? 600 : 400 }}>
                          {type === 'bug' ? 'Bug Report' : type === 'feature' ? 'Feature Req' : 'General Help'}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                  <label className="required">Subject</label>
                  <input type="text" placeholder="Brief summary of the issue..." value={ticketData.subject} onChange={(e) => setTicketData({...ticketData, subject: e.target.value})} />
                </div>

                <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                  <label className="required">Detailed Description</label>
                  <textarea rows="5" placeholder="Please provide exact steps to reproduce the issue..." value={ticketData.description} onChange={(e) => setTicketData({...ticketData, description: e.target.value})}></textarea>
                </div>

                <div className="form-group">
                  <label>Attachments (Optional)</label>
                  <div style={{ border: '2px dashed var(--border-color)', borderRadius: '8px', padding: '2rem', textAlign: 'center', color: 'var(--text-muted)', cursor: 'pointer', background: 'var(--bg-surface-alt)' }}>
                    <Paperclip size={24} style={{ marginBottom: '0.5rem' }} />
                    <p>Drag & drop screenshots here, or click to browse.</p>
                  </div>
                </div>

                {/* Context Awareness Notice */}
                <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'var(--bg-main)', borderRadius: '8px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  <strong style={{ color: 'var(--text-primary)' }}>Context Capture Enabled:</strong> To expedite triage, this ticket will securely capture your current OS (Windows 11) and Browser Version (Chrome 120).
                </div>

              </div>
            </div>

            <div className="modal-footer" style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
              <button className="btn-secondary" onClick={() => setIsTicketModalOpen(false)}>Cancel</button>
              <button className="btn-primary" onClick={handleTicketSubmit} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Send size={16} /> Submit Ticket
              </button>
            </div>

          </div>
        </div>
      )}

    </CollegeAdminLayout>
  );
};

export default CollegeSupportHub;
