import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  UserCircle, 
  UserCog,
  UserPlus,
  GraduationCap, 
  ClipboardList, 
  BarChart3, 
  Bell, 
  Settings, 
  LogOut, 
  ChevronLeft, 
  ChevronRight, 
  Stethoscope
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import './CollegeSidebar.css';

import LogoutModal from './LogoutModal';

const MENU_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/college-admin/dashboard' },
  { id: 'preceptors', label: 'Preceptor Management', icon: UserCog, path: '/college-admin/preceptors' },
  { id: 'students', label: 'Student Management', icon: Users, path: '/college-admin/students' },
  { id: 'assign-students', label: 'Assign Students', icon: UserPlus, path: '/college-admin/assign-students' },
  { id: 'cases', label: 'Clinical Case Management', icon: ClipboardList, path: '/college-admin/cases' },
  { id: 'reports', label: 'Reports', icon: BarChart3, path: '/college-admin/reports' },
  { id: 'notifications', label: 'Notifications', icon: Bell, path: '/college-admin/notifications' },
  { type: 'divider', id: 'div-1' },
  { id: 'profile', label: 'My Profile', icon: UserCircle, path: '/college-admin/profile' },
  { id: 'settings', label: 'Settings', icon: Settings, path: '/college-admin/settings' },
];

const CollegeSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleLogoutClick = () => {
    setIsLogoutModalOpen(true);
  };

  const handleConfirmLogout = () => {
    setIsLogoutModalOpen(false);
    
    // Log the action for auditing
    const logoutTime = new Date().toISOString();
    console.log(`[Audit] Administrator logged out at ${logoutTime}`);
    
    // Replace history to prevent using the back button
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
                           (item.id === 'dashboard' && location.pathname === '/college-admin') ||
                           (item.id === 'preceptors' && location.pathname.startsWith('/college-admin/preceptor')) ||
                           (item.id === 'students' && location.pathname.startsWith('/college-admin/student') && !location.pathname.startsWith('/college-admin/assign-students')) ||
                           (item.id === 'assign-students' && location.pathname.startsWith('/college-admin/assign-students')) ||
                           (item.id === 'cases' && location.pathname.startsWith('/college-admin/case')) ||
                           (item.id === 'reports' && location.pathname.startsWith('/college-admin/reports')) ||
                           (item.id === 'profile' && location.pathname.startsWith('/college-admin/profile')) ||
                           (item.id === 'notifications' && location.pathname.startsWith('/college-admin/notifications')) ||
                           (item.id === 'settings' && location.pathname.startsWith('/college-admin/settings'));
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
      </div>
      
      <LogoutModal 
        isOpen={isLogoutModalOpen} 
        onClose={() => setIsLogoutModalOpen(false)} 
        onConfirm={handleConfirmLogout} 
      />
    </aside>
  );
};

export default CollegeSidebar;
