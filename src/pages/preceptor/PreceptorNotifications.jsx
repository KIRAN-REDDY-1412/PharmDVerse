import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bell, Search, CheckCircle2, Circle, AlertTriangle, 
  RotateCcw, ExternalLink, Filter, CheckCheck
} from 'lucide-react';
import PreceptorLayout from '../../components/preceptor/PreceptorLayout';
import { useDatabase } from '../../context/DatabaseContext';
import { useAuth } from '../../context/AuthContext';
import '../college/PreceptorManagement.css'; // Reuse existing styles

const getNotificationIcon = (category) => {
  switch (category) {
    case 'New Clinical Case': return <Bell size={20} color="#0284c7" />; // Blue
    case 'Case Returned': return <AlertTriangle size={20} color="#b45309" />; // Orange/Yellow
    case 'Case Resubmitted': return <RotateCcw size={20} color="#6d28d9" />; // Purple
    case 'Case Approved': return <CheckCircle2 size={20} color="#166534" />; // Green
    default: return <Bell size={20} color="var(--text-secondary)" />;
  }
};

const getNotificationColor = (category) => {
  switch (category) {
    case 'New Clinical Case': return { bg: '#e0f2fe', border: '#bae6fd' };
    case 'Case Returned': return { bg: '#fef3c7', border: '#fde68a' };
    case 'Case Resubmitted': return { bg: '#ede9fe', border: '#ddd6fe' };
    case 'Case Approved': return { bg: '#dcfce3', border: '#bbf7d0' };
    default: return { bg: 'var(--bg-main)', border: 'var(--border-color)' };
  }
};

const PreceptorNotifications = () => {
  const { getUserNotifications, markNotificationRead, markAllNotificationsRead } = useDatabase();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const allNotifications = currentUser ? getUserNotifications(currentUser.id) : [];

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All'); // All, Unread, Read
  const [typeFilter, setTypeFilter] = useState('All'); // All, New Clinical Case, Case Returned, Case Resubmitted, Case Approved

  // Search & Filter
  const filteredNotifications = useMemo(() => {
    return allNotifications.filter(n => {
      const searchStr = searchQuery.toLowerCase();
      const matchesSearch = !searchQuery || 
        (n.studentName || '').toLowerCase().includes(searchStr) ||
        (n.rollNo || '').toLowerCase().includes(searchStr) ||
        (n.caseId || '').toLowerCase().includes(searchStr) ||
        (n.diagnosis || '').toLowerCase().includes(searchStr) ||
        (n.title || '').toLowerCase().includes(searchStr);

      const matchesStatus = statusFilter === 'All' || n.status === statusFilter;
      const matchesType = typeFilter === 'All' || n.category === typeFilter;

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [allNotifications, searchQuery, statusFilter, typeFilter]);

  const handleNotificationClick = (n) => {
    if (n.status === 'Unread') {
      markNotificationRead(n.id);
    }
    if (n.actionLink) {
      navigate(n.actionLink);
    }
  };

  const handleMarkAllRead = () => {
    if (currentUser) {
      markAllNotificationsRead(currentUser.id);
    }
  };

  return (
    <PreceptorLayout>
      <div className="preceptor-page">
        <div className="page-header" style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 className="page-title">Notification Center</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
              View and manage your workflow notifications.
            </p>
          </div>
          <button 
            onClick={handleMarkAllRead}
            disabled={allNotifications.filter(n => n.status === 'Unread').length === 0}
            className="btn-secondary" 
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', opacity: allNotifications.filter(n => n.status === 'Unread').length === 0 ? 0.5 : 1 }}
          >
            <CheckCheck size={16} /> Mark All as Read
          </button>
        </div>

        {/* Filters and Search */}
        <div style={{ backgroundColor: 'var(--bg-surface)', padding: '1.25rem', borderRadius: '8px', border: '1px solid var(--border-color)', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <div className="search-bar" style={{ flex: 1, minWidth: '250px' }}>
              <Search size={18} color="var(--text-secondary)" />
              <input 
                type="text" 
                placeholder="Search by student name, roll no, case id, diagnosis..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <Filter size={16} color="var(--text-secondary)" />
              <select 
                value={statusFilter} 
                onChange={(e) => setStatusFilter(e.target.value)}
                style={{ padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-main)', color: 'var(--text-primary)' }}
              >
                <option value="All">All Statuses</option>
                <option value="Unread">Unread</option>
                <option value="Read">Read</option>
              </select>

              <select 
                value={typeFilter} 
                onChange={(e) => setTypeFilter(e.target.value)}
                style={{ padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-main)', color: 'var(--text-primary)' }}
              >
                <option value="All">All Types</option>
                <option value="New Clinical Case">New Clinical Case</option>
                <option value="Case Returned">Returned Cases</option>
                <option value="Case Resubmitted">Resubmitted Cases</option>
                <option value="Case Approved">Approved Cases</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {filteredNotifications.length === 0 ? (
            <div style={{ padding: '3rem', textAlign: 'center', backgroundColor: 'var(--bg-surface)', borderRadius: '8px', border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
              <Bell size={48} color="var(--border-color)" style={{ marginBottom: '1rem' }} />
              <h3>No notifications found.</h3>
              <p>Try adjusting your search or filters.</p>
            </div>
          ) : (
            filteredNotifications.map(n => {
              const colors = getNotificationColor(n.category);
              return (
                <div 
                  key={n.id}
                  onClick={() => handleNotificationClick(n)}
                  style={{ 
                    display: 'flex', 
                    gap: '1rem', 
                    padding: '1.25rem', 
                    backgroundColor: n.status === 'Unread' ? 'var(--bg-surface)' : 'var(--bg-main)', 
                    borderRadius: '8px', 
                    border: `1px solid ${n.status === 'Unread' ? 'var(--color-primary)' : 'var(--border-color)'}`,
                    boxShadow: n.status === 'Unread' ? '0 2px 8px rgba(11, 87, 208, 0.1)' : 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  {/* Unread indicator bar */}
                  {n.status === 'Unread' && (
                    <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '4px', backgroundColor: 'var(--color-primary)' }} />
                  )}

                  <div style={{ 
                    width: '40px', height: '40px', borderRadius: '50%', 
                    backgroundColor: colors.bg, border: `1px solid ${colors.border}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    {getNotificationIcon(n.category)}
                  </div>
                  
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.25rem' }}>
                      <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: n.status === 'Unread' ? 700 : 500, color: 'var(--text-primary)' }}>
                        {n.title}
                      </h4>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                        {new Date(n.date).toLocaleString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    
                    <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                      {n.message}
                    </p>
                    
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', fontSize: '0.8rem', marginTop: '0.75rem' }}>
                      {n.caseId && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', backgroundColor: 'var(--bg-main)', padding: '0.25rem 0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
                          <span style={{ color: 'var(--text-secondary)' }}>Case ID:</span>
                          <strong style={{ color: 'var(--text-primary)' }}>{n.caseId}</strong>
                        </div>
                      )}
                      {(n.studentName || n.rollNo) && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', backgroundColor: 'var(--bg-main)', padding: '0.25rem 0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
                          <span style={{ color: 'var(--text-secondary)' }}>Student:</span>
                          <strong style={{ color: 'var(--text-primary)' }}>{n.studentName} ({n.rollNo})</strong>
                        </div>
                      )}
                      {n.diagnosis && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', backgroundColor: 'var(--bg-main)', padding: '0.25rem 0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
                          <span style={{ color: 'var(--text-secondary)' }}>Diagnosis:</span>
                          <strong style={{ color: 'var(--text-primary)' }}>{n.diagnosis}</strong>
                        </div>
                      )}
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: n.status === 'Unread' ? 'var(--color-primary)' : 'var(--text-secondary)' }}>
                      {n.status === 'Unread' ? <Circle size={10} fill="currentColor" /> : <CheckCircle2 size={12} />}
                      <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>{n.status}</span>
                    </div>
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleNotificationClick(n); }}
                      style={{ 
                        background: 'none', border: 'none', color: 'var(--color-primary)', 
                        fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem',
                        cursor: 'pointer', padding: 0
                      }}
                    >
                      Open Case <ExternalLink size={14} />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

      </div>
    </PreceptorLayout>
  );
};

export default PreceptorNotifications;
