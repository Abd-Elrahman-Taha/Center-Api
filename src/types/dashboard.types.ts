
export interface StatCardData {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: "students" | "courses" | "teachers" | "enrollments";
}

export interface Activity {
  id: number;
  title: string;
  description: string;
  time: string;
  type: "student" | "course" | "enrollment";
}
