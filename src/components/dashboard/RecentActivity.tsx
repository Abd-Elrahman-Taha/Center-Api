
import {
  UserPlus,
  BookOpen,
  ClipboardCheck,
  Clock,
} from "lucide-react";

import type { Activity } from "../../types/dashboard.types";

const activities: Activity[] = [
  {
    id: 1,
    title: "New student registered",
    description: "Ahmed Mohamed joined the platform",
    time: "10 minutes ago",
    type: "student",
  },
  {
    id: 2,
    title: "New course created",
    description: "Advanced React Development",
    time: "1 hour ago",
    type: "course",
  },
  {
    id: 3,
    title: "New enrollment",
    description: "Omar Ali enrolled in TypeScript",
    time: "3 hours ago",
    type: "enrollment",
  },
  {
    id: 4,
    title: "New student registered",
    description: "Sara Hassan joined the platform",
    time: "Yesterday",
    type: "student",
  },
];

const activityIcons = {
  student: UserPlus,
  course: BookOpen,
  enrollment: ClipboardCheck,
};

export default function RecentActivity() {
  return (
    <section className="panel activity-panel">
      <div className="section-heading">
        <div>
          <h2>Recent Activity</h2>
          <p>Latest updates from your platform</p>
        </div>

        <button
          className="text-button"
          onClick={() => window.alert("Activity history is coming soon.")}
        >
          View all
        </button>
      </div>

      <div className="activity-list">
        {activities.map((activity) => {
          const Icon = activityIcons[activity.type];

          return (
            <div className="activity-item" key={activity.id}>
              <div className={`activity-icon ${activity.type}`}>
                <Icon size={18} />
              </div>

              <div className="activity-details">
                <strong>{activity.title}</strong>
                <p>{activity.description}</p>
              </div>

              <div className="activity-time">
                <Clock size={13} />
                <span>{activity.time}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
