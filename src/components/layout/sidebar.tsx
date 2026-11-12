import {
  LayoutDashboard,
  Users,
  BookOpen,
  GraduationCap,
  X,
} from "lucide-react";
import { NavLink } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navigationItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/", end: true },
  { label: "Students", icon: Users, path: "/students", end: false },
  { label: "Teachers", icon: GraduationCap, path: "/teachers", end: false },
  { label: "Courses", icon: BookOpen, path: "/courses", end: false },
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {isOpen && (
        <div
          className="sidebar-overlay"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside className={`sidebar ${isOpen ? "sidebar-open" : ""}`}>
        <div className="sidebar-header">
          <div className="brand">
            <div className="brand-icon">
              <GraduationCap size={25} />
            </div>

            <div>
              <h2>EduSpace</h2>
              <span>Learning Platform</span>
            </div>
          </div>

          <button
            className="mobile-close"
            onClick={onClose}
            aria-label="Close navigation"
          >
            <X size={21} />
          </button>
        </div>

        <div className="sidebar-section">
          <span className="sidebar-label">MENU</span>

          <nav className="sidebar-nav">
            {navigationItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.end}
                  className={({ isActive }) =>
                    `nav-item ${isActive ? "active" : ""}`
                  }
                  onClick={onClose}
                >
                  <Icon size={19} />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        <div className="sidebar-bottom">
          <div className="sidebar-profile">
            <div className="avatar">AD</div>
            <div className="profile-info">
              <strong>Admin User</strong>
              <span>admin@eduspace.internal</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
