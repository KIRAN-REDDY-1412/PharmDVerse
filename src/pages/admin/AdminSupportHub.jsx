import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { 
  LifeBuoy, Book, Video, HelpCircle, 
  MessageCircle, Activity, FileText, ChevronRight,
  ShieldCheck, ShieldAlert
} from 'lucide-react';
import './AdminSupportHub.css';

const AdminSupportHub = () => {
  const navigate = useNavigate();

  return (
    <AdminLayout>
      <div className="support-container">
        
        <div className="support-header">
          <div>
            <h1 className="page-title" style={{ margin: '0 0 4px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <LifeBuoy size={24} color="var(--primary-color)"/> Help & Support Center
            </h1>
            <p className="page-subtitle" style={{ margin: 0 }}>Resources and ticketing for platform administrators.</p>
          </div>
          <button className="btn btn-primary">
            <MessageCircle size={18} /> Raise a Support Ticket
          </button>
        </div>

        <div className="support-grid">
          
          <div className="support-main-content">
            
            <div className="support-card">
              <h2 className="support-card-title"><Book size={20} color="var(--primary-color)"/> Quick Resources</h2>
              <div className="quick-links-grid">
                <div className="quick-link-item">
                  <div style={{ backgroundColor: 'rgba(139, 92, 246, 0.1)', color: 'var(--primary-color)', padding: '12px', borderRadius: '8px' }}><Book size={24} /></div>
                  <div>
                    <div style={{ fontWeight: 600 }}>Platform Documentation</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Complete administrator guide</div>
                  </div>
                </div>
                <div className="quick-link-item">
                  <div style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', padding: '12px', borderRadius: '8px' }}><Video size={24} /></div>
                  <div>
                    <div style={{ fontWeight: 600 }}>Video Tutorials</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Step-by-step video walkthroughs</div>
                  </div>
                </div>
                <div className="quick-link-item">
                  <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10b981', padding: '12px', borderRadius: '8px' }}><FileText size={24} /></div>
                  <div>
                    <div style={{ fontWeight: 600 }}>Release Notes</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Latest updates and features (v2.1)</div>
                  </div>
                </div>
                <div className="quick-link-item" onClick={() => alert('Opening ticketing portal...')}>
                  <div style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', padding: '12px', borderRadius: '8px' }}><MessageCircle size={24} /></div>
                  <div>
                    <div style={{ fontWeight: 600 }}>Track Tickets</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>View your active support requests</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="support-card">
              <h2 className="support-card-title"><HelpCircle size={20} color="var(--primary-color)"/> Frequently Asked Questions (FAQs)</h2>
              <div>
                <div className="faq-item">
                  <h4 className="faq-question">How do I suspend a College Tenant? <ChevronRight size={16} color="var(--text-secondary)"/></h4>
                  <p className="faq-answer">Navigate to <strong>College Management &gt; College List</strong>, find the target college, click the 'Actions' menu, and select 'Suspend'. This immediately revokes access for all users under that tenant.</p>
                </div>
                <div className="faq-item">
                  <h4 className="faq-question">Where can I view the global audit logs? <ChevronRight size={16} color="var(--text-secondary)"/></h4>
                  <p className="faq-answer">Global audit logs are available under the <strong>Audit Logs</strong> module. You can filter by module, user, and action, or export the logs for compliance auditing.</p>
                </div>
                <div className="faq-item">
                  <h4 className="faq-question">How do I adjust the platform's email limits? <ChevronRight size={16} color="var(--text-secondary)"/></h4>
                  <p className="faq-answer">Go to <strong>Platform Settings &gt; Email & SMTP</strong>. Note that changes to SMTP limits require Super Admin credentials and immediate verification.</p>
                </div>
              </div>
            </div>

          </div>

          <div className="support-sidebar">
            
            <div className="support-card">
              <h2 className="support-card-title"><Activity size={20} color="var(--primary-color)"/> System Status</h2>
              <div className="system-status-indicator">
                <ShieldCheck size={20} /> All Systems Operational
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.875rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>API Services</span>
                  <span style={{ color: '#10b981' }}>99.99% Uptime</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Database Nodes</span>
                  <span style={{ color: '#10b981' }}>Operational</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Email Dispatcher</span>
                  <span style={{ color: '#10b981' }}>Operational</span>
                </div>
              </div>
              <button className="btn btn-secondary w-full" style={{ marginTop: '16px' }}>View Detailed Status Page</button>
            </div>

            <div className="support-card">
              <h2 className="support-card-title"><ShieldAlert size={20} color="var(--primary-color)"/> Legal & Policies</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <a href="/coming-soon" style={{ color: 'var(--primary-color)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}><FileText size={16}/> Privacy Policy</a>
                <a href="/coming-soon" style={{ color: 'var(--primary-color)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}><FileText size={16}/> Terms & Conditions</a>
                <a href="/coming-soon" style={{ color: 'var(--primary-color)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}><FileText size={16}/> End User License Agreement (EULA)</a>
              </div>
            </div>

            <div className="support-card">
              <h2 className="support-card-title">About PharmDVerse</h2>
              <div style={{ textAlign: 'center', margin: '24px 0' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '2px', color: 'var(--primary-color)' }}>PHARMDVERSE</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>Version 2.1.0-enterprise</div>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textAlign: 'center', margin: 0 }}>
                &copy; 2026 PharmDVerse Inc. All rights reserved.
              </p>
            </div>

          </div>

        </div>

      </div>
    </AdminLayout>
  );
};

export default AdminSupportHub;
