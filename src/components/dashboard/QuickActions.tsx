
import {
  UserPlus,
  BookPlus,
  GraduationCap,
  ArrowUpRight,
} from "lucide-react";

const actions = [
  {
    title: "Add Student",
    description: "Register a new student",
    icon: UserPlus,
    color: "purple",
  },
  {
    title: "Create Course",
    description: "Add a new learning course",
    icon: BookPlus,
    color: "blue",
  },
  {
    title: "Add Teacher",
    description: "Register a new teacher",
    icon: GraduationCap,
    color: "orange",
  },
];

export default function QuickActions() {
  return (
    <section className="panel quick-actions-panel">
      <div className="section-heading">
        <div>
          <h2>Quick Actions</h2>
          <p>Manage your platform faster</p>
        </div>
      </div>

      <div className="quick-actions-list">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.title}
              className="quick-action"
              onClick={() =>
                window.alert(`${action.title} functionality is coming soon.`)
              }
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
