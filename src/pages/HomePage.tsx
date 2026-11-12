
import { CalendarDays, ArrowUpRight } from "lucide-react";

import DashboardLayout from "../components/layout/DashboardLayout";
import StatCard from "../components/dashboard/StatCard";
import QuickActions from "../components/dashboard/QuickActions";
import RecentActivity from "../components/dashboard/RecentActivity";

import type { StatCardData } from "../types/dashboard.types";

const stats: StatCardData[] = [
  {
    title: "Total Students",
    value: "1,284",
    change: "+12.5%",
    trend: "up",
    icon: "students",
  },
  {
    title: "Active Courses",
    value: "24",
    change: "+8.2%",
    trend: "up",
    icon: "courses",
  },
  {
    title: "Total Teachers",
    value: "38",
    change: "+4.3%",
    trend: "up",
    icon: "teachers",
  },
  {
    title: "Enrollments",
    value: "856",
    change: "-2.4%",
    trend: "down",
    icon: "enrollments",
  },
];

export default function HomePage() {
  return (
    <DashboardLayout>
      <div className="home-page">
        <section className="welcome-section">
          <div>
            <span className="welcome-eyebrow">OVERVIEW</span>

            <h1>Welcome back, Admin 👋</h1>

            <p>
              Here's what's happening with your learning platform today.
            </p>
          </div>

          <button className="date-button">
            <CalendarDays size={18} />
            <span>November 2026</span>
          </button>
        </section>

        <section className="stats-grid">
          {stats.map((stat) => (
            <StatCard key={stat.title} data={stat} />
          ))}
        </section>

        <section className="dashboard-content-grid">
          <QuickActions />
          <RecentActivity />
        </section>

        <section className="welcome-banner">
          <div className="banner-content">
            <span>YOUR PLATFORM, YOUR PROGRESS</span>
            <h2>Build a better learning experience.</h2>
            <p>
              Keep track of your students, manage courses, and grow
              your learning community.
            </p>
          </div>

          <div className="banner-decoration">
            <ArrowUpRight size={64} />
          </div>
        </section>

        <footer className="dashboard-footer">
          <span>© 2026 EduSpace. All rights reserved.</span>
          <span>Made for better learning.</span>
        </footer>
      </div>
    </DashboardLayout>
  );
}
