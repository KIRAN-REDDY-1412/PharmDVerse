import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  ClipboardList, 
  BarChart3, 
  Bell, 
  Settings, 
  LogOut, 
  ChevronLeft, 
  ChevronRight, 
  Stethoscope,
  UserCircle,
  HelpCircle
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../college/CollegeSidebar.css';
import LogoutModal from '../college/LogoutModal';

const MENU_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/preceptor/dashboard' },
  { id: 'students', label: 'Assigned Students', icon: Users, path: '/preceptor/students' },
  { id: 'cases', label: 'Clinical Cases', icon: ClipboardList, path: '/preceptor/cases' },
  { id: 'notifications', label: 'Notifications', icon: Bell, path: '/preceptor/notifications' },
  { type: 'divider', id: 'div-1' },
  { id: 'profile', label: 'My Profile', icon: UserCircle, path: '/preceptor/profile' },
  { id: 'settings', label: 'Settings', icon: Settings, path: '/preceptor/settings' },
  { id: 'support', label: 'Help & Support', icon: HelpCircle, path: '/preceptor/support' },
];

const PreceptorSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleLogoutClick = () => {
    setIsLogoutModalOpen(true);
  };

  const handleConfirmLogout = () => {
    setIsLogoutModalOpen(false);
    navigate('/college-portal', { 
      replace: true,
      state: { message: 'You have been logged out successfully.' }
    });
  };

  const handleNavClick = (path) => {
    if (path) navigate(path);
  };

  return (
    <aside className={`college-sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="sidebar-brand">
          <Stethoscope className="brand-icon" size={24} />
          <span className="brand-text">PharmDVerse</span>
        </div>
        <button 
          className="collapse-btn" 
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-label={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      <nav className="sidebar-nav">
        {MENU_ITEMS.map((item) => {
          if (item.type === 'divider') {
            return <div key={item.id} className="nav-divider"></div>;
          }
          
          const isActive = location.pathname === item.path || 
                           (item.id === 'dashboard' && location.pathname === '/preceptor') ||
                           (item.id === 'students' && location.pathname.startsWith('/preceptor/students')) ||
                           (item.id === 'cases' && location.pathname.startsWith('/preceptor/cases')) ||
                           (item.id === 'notifications' && location.pathname.startsWith('/preceptor/notifications')) ||
                           (item.id === 'profile' && location.pathname.startsWith('/preceptor/profile')) ||
                           (item.id === 'settings' && location.pathname.startsWith('/preceptor/settings')) ||
                           (item.id === 'support' && location.pathname.startsWith('/preceptor/support'));
          const Icon = item.icon;

          return (
            <div 
              key={item.id} 
              className={`nav-item ${isActive ? 'active' : ''}`}
              onClick={() => handleNavClick(item.path)}
              data-tooltip={item.label}
            >
              <Icon className="nav-icon" size={20} />
              <span className="nav-label">{item.label}</span>
            </div>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <div className="nav-divider" style={{ margin: '0 0 1.25rem 0' }}></div>
        <div 
          className="nav-item logout-item" 
          onClick={handleLogoutClick}
          data-tooltip="Logout"
        >
          <LogOut className="nav-icon" size={20} />
          <span className="nav-label">Logout</span>
        </div>
        <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', textAlign: 'center', marginTop: '0.75rem', fontWeight: 600 }}>
          PharmDVerse ERP v2.1.0
        </div>
      </div>
      
      <LogoutModal 
        isOpen={isLogoutModalOpen} 
        onClose={() => setIsLogoutModalOpen(false)} 
        onConfirm={handleConfirmLogout} 
      />
    </aside>
  );
};

export default PreceptorSidebar;
