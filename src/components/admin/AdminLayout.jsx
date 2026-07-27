import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Building2, Users, LayoutDashboard, Settings, 
  Bell, LogOut, Search, Activity, ShieldAlert,
  Moon, Sun, Menu, CreditCard, History, LifeBuoy, User
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import './AdminLayout.css';

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const { logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    // Clear session and tokens
    localStorage.clear();
    sessionStorage.clear();
    logout();
    navigate('/super-admin'); // Redirect to login
  };

  const platformControlItems = [
    { name: 'Dashboard', path: '/super-admin/dashboard', icon: <LayoutDashboard size={20} strokeWidth={2} /> },
    { name: 'College Management', path: '/super-admin/college-management', icon: <Building2 size={20} strokeWidth={2} /> },
    { name: 'Subscription Management', path: '/super-admin/subscription', icon: <CreditCard size={20} strokeWidth={2} /> },
    { name: 'User Management', path: '/super-admin/users', icon: <Users size={20} strokeWidth={2} /> },
    { name: 'Role Permission Matrix', path: '/super-admin/users/role-matrix', icon: <ShieldAlert size={20} strokeWidth={2} /> },
    { name: 'Reports & Analytics', path: '/super-admin/analytics', icon: <Activity size={20} strokeWidth={2} /> },
    { name: 'Clinical Case Repository', path: '/super-admin/cases', icon: <Activity size={20} strokeWidth={2} /> },
    { name: 'Notifications', path: '/super-admin/notifications', icon: <Bell size={20} strokeWidth={2} /> },
    { name: 'Audit Logs', path: '/super-admin/audit-logs', icon: <History size={20} strokeWidth={2} /> },
  ];

  const systemItems = [
    { name: 'Platform Settings', path: '/super-admin/platform-settings', icon: <Settings size={20} strokeWidth={2} /> },
    { name: 'Help & Support', path: '/super-admin/help-support', icon: <LifeBuoy size={20} strokeWidth={2} /> },
  ];

  const accountItems = [
    { name: 'My Profile', path: '/super-admin/profile', icon: <User size={20} strokeWidth={2} /> },
  ];

  // Helper to check active state based on route prefixes
  const isActive = (itemPath) => {
    if (itemPath === '/super-admin/dashboard') return location.pathname === itemPath;
    if (itemPath === '/super-admin/college-management') return location.pathname.includes('/super-admin/college');
    if (itemPath === '/super-admin/subscription') return location.pathname.includes('/super-admin/subscription');
    if (itemPath === '/super-admin/users') return location.pathname.includes('/super-admin/user');
    if (itemPath === '/super-admin/analytics') return location.pathname.includes('/super-admin/analytics');
    if (itemPath === '/super-admin/notifications') return location.pathname.includes('/super-admin/notification');
    if (itemPath === '/super-admin/audit-logs') return location.pathname.includes('/super-admin/audit');
    if (itemPath === '/super-admin/platform-settings') return location.pathname.includes('/super-admin/settings') || location.pathname.includes('platform-settings');
    if (itemPath === '/super-admin/help-support') return location.pathname.includes('/super-admin/support') || location.pathname.includes('help-support');
    if (itemPath === '/super-admin/profile') return location.pathname.includes('/super-admin/profile');
    return location.pathname === itemPath;
  };

  return (
    <div className="admin-layout-container">
      
      {/* Super Admin Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="admin-sidebar-header">
          <ShieldAlert size={32} className="admin-brand-icon" strokeWidth={2} />
          {sidebarOpen && (
            <div className="admin-brand-text">
              <span className="admin-brand-name">PharmDVerse</span>
              <span className="admin-portal-title">SUPER ADMIN PORTAL</span>
            </div>
          )}
        </div>
        
        <div className="admin-sidebar-menu" style={{ display: 'flex', flexDirection: 'column', height: 'calc(100% - 70px)' }}>
          <div style={{ flex: 1, overflowY: 'auto' }}>
            <p className="admin-menu-label">PLATFORM CONTROL</p>
            <ul className="admin-nav-list">
              {platformControlItems.map((item) => (
                <li key={item.name} className="admin-nav-item">
                  <Link 
                    to={item.path} 
                    className={isActive(item.path) ? 'active' : ''}
                  >
                    {item.icon}
                    {sidebarOpen && <span>{item.name}</span>}
                  </Link>
                </li>
              ))}
            </ul>

            <p className="admin-menu-label" style={{ marginTop: '16px' }}>SYSTEM</p>
            <ul className="admin-nav-list">
              {systemItems.map((item) => (
                <li key={item.name} className="admin-nav-item">
                  <Link 
                    to={item.path} 
                    className={isActive(item.path) ? 'active' : ''}
                  >
                    {item.icon}
                    {sidebarOpen && <span>{item.name}</span>}
                  </Link>
                </li>
              ))}
            </ul>

            <p className="admin-menu-label" style={{ marginTop: '16px' }}>ACCOUNT</p>
            <ul className="admin-nav-list">
              {accountItems.map((item) => (
                <li key={item.name} className="admin-nav-item">
                  <Link 
                    to={item.path} 
                    className={isActive(item.path) ? 'active' : ''}
                  >
                    {item.icon}
                    {sidebarOpen && <span>{item.name}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div style={{ padding: '16px 0', borderTop: '1px solid var(--border-color)' }}>
            <ul className="admin-nav-list">
              <li className="admin-nav-item">
                <button 
                  onClick={() => setShowLogoutConfirm(true)}
                  className="admin-nav-link"
                  style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-color)' }}
                >
                  <LogOut size={20} strokeWidth={2} color="#ef4444" />
                  {sidebarOpen && <span style={{ color: '#ef4444', fontWeight: 500 }}>Logout</span>}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </aside>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ backgroundColor: 'var(--surface-color)', padding: '24px', borderRadius: '12px', maxWidth: '400px', width: '100%', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '1.25rem', color: 'var(--text-color)' }}>Confirm Logout</h3>
            <p style={{ margin: '0 0 24px 0', color: 'var(--text-secondary)' }}>Are you sure you want to end your session? You will need to sign in again to access the Super Admin portal.</p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button className="btn btn-secondary" onClick={() => setShowLogoutConfirm(false)}>Cancel</button>
              <button className="btn btn-danger" onClick={handleLogout}>Confirm Logout</button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="admin-main-wrapper">
        
        {/* Top Navbar */}
        <header className="admin-top-navbar">
          <div className="admin-navbar-left">
            <button className="admin-toggle-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <Menu size={24} strokeWidth={2} />
            </button>
            <div className="admin-search-bar">
              <Search size={18} style={{ color: 'var(--text-muted)' }} strokeWidth={2} />
              <input type="text" placeholder="Search colleges, students, preceptors, subscriptions, reports..." />
            </div>
          </div>
          
          <div className="admin-navbar-right">
            <button className="admin-icon-btn" onClick={toggleTheme} title="Toggle Theme">
               {theme === 'light' ? (
                 <Moon size={20} strokeWidth={2} />
               ) : (
                 <Sun size={20} strokeWidth={2} />
               )}
            </button>
            <button className="admin-icon-btn" title="Notifications">
              <Bell size={20} strokeWidth={2} />
              <span className="admin-badge">12</span>
            </button>
            
            <div className="admin-user-profile">
              <div className="admin-avatar">
                {/* SA could also be an actual avatar image, but sticking to initials for now */}
                SA
              </div>
              <div className="admin-user-info">
                <span className="admin-user-name">System Administrator</span>
                <span className="admin-user-role">Platform Owner</span>
              </div>
            </div>
            
            <button className="admin-icon-btn danger" onClick={logout} title="Logout" style={{ marginLeft: '0.5rem' }}>
              <LogOut size={20} strokeWidth={2} />
            </button>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="admin-page-content">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
