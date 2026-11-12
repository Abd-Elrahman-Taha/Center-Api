
import { useState } from "react";
import Sidebar from "./sidebar";
import Navbar from "./Navbar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="dashboard-layout">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="main-wrapper">
        <Navbar onMenuClick={() => setIsSidebarOpen(true)} />

        <main className="main-content">{children}</main>
      </div>
    </div>
  );
}
