import {
  UserPlus,
  BookPlus,
  GraduationCap,
  ArrowUpRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const actions = [
  {
    title: "Manage Students",
    description: "Register and enroll students",
    icon: UserPlus,
    color: "purple",
    path: "/students",
  },
  {
    title: "Manage Courses",
    description: "Create and update curriculum",
    icon: BookPlus,
    color: "blue",
    path: "/courses",
  },
  {
    title: "Manage Teachers",
    description: "Add instructors and faculty",
    icon: GraduationCap,
    color: "orange",
    path: "/teachers",
  },
];

export default function QuickActions() {
  const navigate = useNavigate();

  return (
    <section className="panel quick-actions-panel">
      <div className="section-heading">
        <div>
          <h2>Quick Actions</h2>
          <p>Navigate directly to resource management</p>
        </div>
      </div>

      <div className="quick-actions-list">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.title}
              className="quick-action"
              onClick={() => navigate(action.path)}
            >
              <div className={`quick-action-icon ${action.color}`}>
                <Icon size={21} />
              </div>

              <div className="quick-action-content">
                <strong>{action.title}</strong>
                <span>{action.description}</span>
              </div>

              <ArrowUpRight size={18} className="action-arrow" />
            </button>
          );
        })}
      </div>
    </section>
  );
}
