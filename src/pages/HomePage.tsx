/**
 * HomePage Component
 * Dashboard Overview connected directly to real REST API statistics.
 */

import { CalendarDays } from "lucide-react";
import DashboardLayout from "../components/layout/DashboardLayout";
import StatCard from "../components/dashboard/StatCard";
import QuickActions from "../components/dashboard/QuickActions";
import RecentActivity from "../components/dashboard/RecentActivity";
import InteractiveHeroVisual from "../components/dashboard/InteractiveHeroVisual";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { useStudents } from "../hooks/useStudents";
import { useTeachers } from "../hooks/useTeachers";
import { useCourses } from "../hooks/useCourses";
import type { StatCardData } from "../types/dashboard.types";

export default function HomePage() {
  const { students, loading: studentsLoading } = useStudents();
  const { teachers, loading: teachersLoading } = useTeachers();
  const { courses, loading: coursesLoading } = useCourses();

  const isLoading = studentsLoading || teachersLoading || coursesLoading;

  // Real calculations based strictly on live API records
  const totalStudents = students.length;
  const totalTeachers = teachers.length;
  const totalCourses = courses.length;
  const totalEnrollments = students.reduce(
    (acc, s) => acc + (s.enrolledCourses ? s.enrolledCourses.length : 0),
    0
  );

  const stats: StatCardData[] = [
    {
      title: "Total Students",
      value: String(totalStudents),
      change: `${totalStudents} registered`,
      trend: "up",
      icon: "students",
    },
    {
      title: "Active Courses",
      value: String(totalCourses),
      change: `${totalCourses} offered`,
      trend: "up",
      icon: "courses",
    },
    {
      title: "Total Teachers",
      value: String(totalTeachers),
      change: `${totalTeachers} faculty`,
      trend: "up",
      icon: "teachers",
    },
    {
      title: "Total Enrollments",
      value: String(totalEnrollments),
      change: `${totalEnrollments} active seats`,
      trend: "up",
      icon: "enrollments",
    },
  ];

  // Dynamic formatted current date
  const currentDate = new Date().toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <DashboardLayout>
      <div className="home-page">
        {/* Welcome Section */}
        <section className="welcome-section">
          <div>
            <span className="welcome-eyebrow">OVERVIEW</span>
            <h1>Welcome back, Admin 👋</h1>
            <p>
              Here's the live status of your learning platform today.
            </p>
          </div>

          <button className="date-button" type="button">
            <CalendarDays size={18} />
            <span>{currentDate}</span>
          </button>
        </section>

        {/* Live API Stat Cards */}
        {isLoading ? (
          <LoadingSpinner message="Calculating real-time analytics..." />
        ) : (
          <section className="stats-grid">
            {stats.map((stat) => (
              <StatCard key={stat.title} data={stat} />
            ))}
          </section>
        )}

        {/* Quick Actions & Live Activity */}
        <section className="dashboard-content-grid">
          <QuickActions />
          <RecentActivity
            students={students}
            courses={courses}
            teachers={teachers}
          />
        </section>

        {/* Welcome Banner with 3D Canvas visual */}
        <section className="welcome-banner">
          <div className="banner-content">
            <span>YOUR PLATFORM, YOUR PROGRESS</span>
            <h2>Build a better learning experience.</h2>
            <p>
              Keep track of students, assign qualified instructors, and grow
              your course curriculum with clean, real-time data sync.
            </p>
          </div>

          <div className="banner-decoration">
            <InteractiveHeroVisual />
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
