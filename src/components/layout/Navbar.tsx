import { Menu, Search, Bell, Sparkles } from "lucide-react";
import { useLocation } from "react-router-dom";

interface NavbarProps {
  onMenuClick: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  const location = useLocation();

  // Dynamically resolve page title based on the active path
  const getPageInfo = () => {
    switch (location.pathname) {
      case "/students":
        return { section: "Management", page: "Students" };
      case "/teachers":
        return { section: "Management", page: "Teachers" };
      case "/courses":
        return { section: "Management", page: "Courses" };
      case "/":
      default:
        return { section: "Overview", page: "Dashboard" };
    }
  };

  const { section, page } = getPageInfo();

  return (
    <header className="navbar">
      <div className="navbar-left">
        <button
          className="menu-button"
          onClick={onMenuClick}
          aria-label="Open navigation"
        >
          <Menu size={23} />
        </button>

        <div className="breadcrumb">
          <span>{section}</span>
          <span className="breadcrumb-divider">/</span>
          <strong>{page}</strong>
        </div>
      </div>

      <div className="navbar-right">
        <div className="search-box">
          <Search size={16} />
          <input
            type="search"
            placeholder="Search resources..."
            aria-label="Search"
          />
          <kbd>⌘ K</kbd>
        </div>

        <div
          className="notification-button"
          aria-label="System status"
          title="API Connected"
        >
          <Bell size={18} />
          <span className="notification-dot" />
        </div>

        <div className="navbar-profile" title="Signed in as Admin">
          <div className="avatar">AD</div>

          <div className="navbar-profile-info">
            <strong>Admin</strong>
            <span className="flex items-center gap-1">
              <Sparkles size={10} className="text-amber-400" /> Active Session
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
