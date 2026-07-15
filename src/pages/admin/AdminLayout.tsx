import { useState, useEffect } from 'react';
import { supabase, ADMIN_PATH } from '@/lib/supabase';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Trophy,
  Briefcase,
  FolderOpen,
  LogOut,
  Menu,
  X,
  ChevronRight,
  User,
  GraduationCap,
  MessageSquare,
  FileText,
} from 'lucide-react';

const navItems = [
  { to: `/${ADMIN_PATH}/dashboard`, icon: LayoutDashboard, label: 'Dashboard' },
  { to: `/${ADMIN_PATH}/categories`, icon: FolderOpen, label: 'Categories' },
  { to: `/${ADMIN_PATH}/projects`, icon: FolderOpen, label: 'Projects' },
  { to: `/${ADMIN_PATH}/achievements`, icon: Trophy, label: 'Achievements' },
  { to: `/${ADMIN_PATH}/experience`, icon: Briefcase, label: 'Experience' },
  { to: `/${ADMIN_PATH}/competitions`, icon: Trophy, label: 'Competitions' },
  { to: `/${ADMIN_PATH}/education`, icon: GraduationCap, label: 'Education' },
  { to: `/${ADMIN_PATH}/guestbook`, icon: MessageSquare, label: 'Guestbook' },
  { to: `/${ADMIN_PATH}/cv`, icon: FileText, label: 'CV / Resume' },
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  const adminEmail = localStorage.getItem('admin_email') || 'Admin';

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (e) {
      console.error(e);
    }
    localStorage.removeItem('admin_authenticated');
    localStorage.removeItem('admin_email');
    navigate(`/${ADMIN_PATH}`);
  };

  const getPageTitle = () => {
    const item = navItems.find((n) => location.pathname === n.to);
    return item?.label || 'Dashboard';
  };

  return (
    <div className="admin-layout">
      {/* Sidebar Overlay (mobile) */}
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <span className="sidebar-logo-icon">R</span>
            <div>
              <p className="sidebar-logo-title">Admin Panel</p>
              <p className="sidebar-logo-sub">Portfolio CMS</p>
            </div>
          </div>
          <button className="sidebar-close" onClick={() => setSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <nav className="sidebar-nav">
          <p className="sidebar-nav-label">Navigation</p>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? 'sidebar-link-active' : ''}`
              }
              onClick={() => setSidebarOpen(false)}
            >
              <item.icon size={20} className="sidebar-link-icon" />
              <span>{item.label}</span>
              <ChevronRight size={16} className="sidebar-link-arrow" />
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-user">
            <div className="sidebar-user-avatar">
              <User size={16} />
            </div>
            <div className="sidebar-user-info">
              <p className="sidebar-user-name">Muhammad Rakha</p>
              <p className="sidebar-user-email" title={adminEmail}>
                {adminEmail.length > 20 ? adminEmail.slice(0, 20) + '...' : adminEmail}
              </p>
            </div>
          </div>
          <button id="admin-logout-btn" className="sidebar-logout" onClick={handleLogout}>
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="admin-main">
        {/* Top Bar */}
        <header className="admin-topbar">
          <div className="topbar-left">
            <button
              id="sidebar-toggle-btn"
              className="topbar-menu-btn"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu size={22} />
            </button>
            <div>
              <h1 className="topbar-title">{getPageTitle()}</h1>
              <p className="topbar-breadcrumb">
                Admin / {getPageTitle()}
              </p>
            </div>
          </div>
          <div className="topbar-right">
            <div className="topbar-time">
              {currentTime.toLocaleTimeString('id-ID')}
            </div>
            <button className="topbar-logout-btn" onClick={handleLogout} title="Logout">
              <LogOut size={18} />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
