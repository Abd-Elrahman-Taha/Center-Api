
import {
  Users,
  BookOpen,
  GraduationCap,
  ClipboardList,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

import type { StatCardData } from "../../types/dashboard.types";

interface StatCardProps {
  data: StatCardData;
}

const icons = {
  students: Users,
  courses: BookOpen,
  teachers: GraduationCap,
  enrollments: ClipboardList,
};

export default function StatCard({ data }: StatCardProps) {
  const Icon = icons[data.icon];

  const isPositive = data.trend === "up";

  return (
    <article className="stat-card">
      <div className="stat-card-top">
        <div className={`stat-icon ${data.icon}`}>
          <Icon size={22} />
        </div>

        <span className="stat-period">This month</span>
      </div>

      <div className="stat-card-info">
        <span>{data.title}</span>
        <h2>{data.value}</h2>
      </div>

      <div className="stat-card-footer">
        <span className={`stat-change ${isPositive ? "positive" : "negative"}`}>
          {isPositive ? (
            <TrendingUp size={15} />
          ) : (
            <TrendingDown size={15} />
          )}

          {data.change}
        </span>

        <span>vs last month</span>
      </div>
    </article>
  );
}
