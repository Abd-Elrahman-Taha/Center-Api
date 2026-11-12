import {
  UserPlus,
  BookOpen,
  GraduationCap,
  Clock,
} from "lucide-react";
import type { Student } from "../../types/students.types";
import type { Course } from "../../types/course.types";
import type { Teacher } from "../../types/teacher.types";

interface RecentActivityProps {
  students: Student[];
  courses: Course[];
  teachers: Teacher[];
}

export default function RecentActivity({
  students,
  courses,
  teachers,
}: RecentActivityProps) {
  // Build activity feed strictly from actual records present in the database
  const activities = [
    ...students.slice(-2).map((s) => ({
      id: `student-${s.id}`,
      title: "Student registered",
      description: `${s.name} (${s.email})`,
      time: "Database record",
      type: "student" as const,
    })),
    ...courses.slice(-2).map((c) => ({
      id: `course-${c.id}`,
      title: "Course available",
      description: `${c.title} ($${c.price})`,
      time: "Database record",
      type: "course" as const,
    })),
    ...teachers.slice(-1).map((t) => ({
      id: `teacher-${t.id}`,
      title: "Faculty instructor",
      description: `${t.name} - ${t.specialization}`,
      time: "Database record",
      type: "teacher" as const,
    })),
  ];

  return (
    <section className="panel activity-panel">
      <div className="section-heading">
        <div>
          <h2>System Roster Activity</h2>
          <p>Real-time records from your REST API</p>
        </div>
      </div>

      <div className="activity-list">
        {activities.length === 0 ? (
          <p className="text-xs text-[#858ba0] py-4 text-center">
            No records found in database.
          </p>
        ) : (
          activities.map((activity) => (
            <div className="activity-item" key={activity.id}>
              <div
                className={`activity-icon ${
                  activity.type === "student"
                    ? "student"
                    : activity.type === "course"
                    ? "course"
                    : "enrollment"
                }`}
              >
                {activity.type === "student" ? (
                  <UserPlus size={18} />
                ) : activity.type === "course" ? (
                  <BookOpen size={18} />
                ) : (
                  <GraduationCap size={18} />
                )}
              </div>

              <div className="activity-details">
                <strong>{activity.title}</strong>
                <p>{activity.description}</p>
              </div>

              <div className="activity-time">
                <Clock size={12} />
                <span>{activity.time}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
