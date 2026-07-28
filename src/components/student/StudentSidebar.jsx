import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  ClipboardList, 
  BookOpen, 
  BarChart3, 
  Bell, 
  UserCircle, 
  Settings, 
  LogOut, 
  ChevronLeft, 
  ChevronRight, 
  Stethoscope,
  HelpCircle
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../college/CollegeSidebar.css';
import LogoutModal from '../college/LogoutModal';

const MENU_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/student/dashboard' },
  { id: 'cases', label: 'Clinical Cases', icon: ClipboardList, path: '/student/cases' },
  { id: 'library', label: 'Case Library', icon: BookOpen, path: '/student/library' },
  { id: 'notifications', label: 'Notifications', icon: Bell, path: '/student/notifications' },
  { type: 'divider', id: 'div-1' },
  { id: 'profile', label: 'My Profile', icon: UserCircle, path: '/student/profile' },
  { id: 'settings', label: 'Settings', icon: Settings, path: '/student/settings' },
  { id: 'support', label: 'Help & Support', icon: HelpCircle, path: '/student/support' },
];

const StudentSidebar = () => {
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
                           (item.id === 'dashboard' && location.pathname === '/student') ||
                           (item.id === 'cases' && location.pathname.startsWith('/student/case')) ||
                           (item.id === 'library' && location.pathname.startsWith('/student/library')) ||
                           (item.id === 'notifications' && location.pathname.startsWith('/student/notifications')) ||
                           (item.id === 'profile' && location.pathname.startsWith('/student/profile')) ||
                           (item.id === 'settings' && location.pathname.startsWith('/student/settings')) ||
                           (item.id === 'support' && location.pathname.startsWith('/student/support'));
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

export default StudentSidebar;
