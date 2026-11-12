/**
 * CourseTable Component
 * Renders courses with dynamically resolved teacher names, enrollment occupancy,
 * price badges, and full CRUD action triggers.
 */

import { Eye, Edit2, Trash2 } from "lucide-react";
import Badge from "../common/Badge";
import type { Course } from "../../types/course.types";
import type { Teacher } from "../../types/teacher.types";
import type { Student } from "../../types/students.types";

interface CourseTableProps {
  courses: Course[];
  teachers: Teacher[];
  students: Student[];
  onView: (course: Course) => void;
  onEdit: (course: Course) => void;
  onDelete: (course: Course) => void;
}

export default function CourseTable({
  courses,
  teachers,
  students,
  onView,
  onEdit,
  onDelete,
}: CourseTableProps) {
  const getTeacher = (teacherId: string) => {
    return teachers.find((t) => t.id === teacherId);
  };

  const getEnrolledCount = (courseId: string) => {
    return students.filter((s) => s.enrolledCourses?.includes(courseId)).length;
  };

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-[#d4af37]/20 bg-gradient-to-b from-[#121624] to-[#0b0e17] shadow-[0_18px_44px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.05)]">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-[#f2efe9]">
          <thead className="border-b border-[#d4af37]/15 bg-[#0d101b]/90 text-[11px] uppercase tracking-[0.14em] text-[#d4af37]/80">
            <tr>
              <th scope="col" className="px-6 py-4 font-semibold">
                Course
              </th>
              <th scope="col" className="px-6 py-4 font-semibold">
                Assigned Teacher
              </th>
              <th scope="col" className="px-6 py-4 font-semibold">
                Tuition
              </th>
              <th scope="col" className="px-6 py-4 font-semibold">
                Enrollment / Capacity
              </th>
              <th
                scope="col"
                className="px-6 py-4 font-semibold text-right"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.05]">
            {courses.map((course) => {
              const teacher = getTeacher(course.teacherId);
              const enrolledCount = getEnrolledCount(course.id);
              const percent = course.capacity
                ? Math.round((enrolledCount / course.capacity) * 100)
                : 0;

              return (
                <tr
                  key={course.id}
                  className="hover:bg-[#d4af37]/[0.03] transition-colors group"
                >
                  {/* Title & Description */}
                  <td className="px-6 py-4">
                    <div className="max-w-xs sm:max-w-sm">
                      <div className="font-semibold text-white group-hover:text-[#f3dc92] transition-colors">
                        {course.title}
                      </div>
                      <div className="text-xs text-[#9ba1b6] truncate mt-0.5">
                        {course.description}
                      </div>
                    </div>
                  </td>

                  {/* Teacher */}
                  <td className="px-6 py-4">
                    {teacher ? (
                      <div className="flex items-center gap-2">
                        <Badge variant="gold" size="sm">
                          {teacher.name}
                        </Badge>
                      </div>
                    ) : (
                      <span className="text-xs text-[#8f95ab] italic">
                        Unassigned
                      </span>
                    )}
                  </td>

                  {/* Price */}
                  <td className="px-6 py-4 font-semibold text-[#f3dc92] font-['Outfit']">
                    ${course.price.toLocaleString()}
                  </td>

                  {/* Enrollment / Capacity */}
                  <td className="px-6 py-4">
                    <div className="space-y-1.5 max-w-[140px]">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-medium text-white">
                          {enrolledCount} / {course.capacity}
                        </span>
                        <span className="text-[10px] text-[#d4af37]">
                          {percent}%
                        </span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[#d4af37] to-[#f3dc92]"
                          style={{ width: `${Math.min(percent, 100)}%` }}
                        />
                      </div>
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1 opacity-85 group-hover:opacity-100">
                      <button
                        onClick={() => onView(course)}
                        className="p-2 text-[#9ba1b6] hover:text-[#89c0ff] hover:bg-[#5fa4f8]/10 rounded-lg transition-colors"
                        title="View Details"
                        aria-label="View Details"
                      >
                        <Eye size={17} />
                      </button>
                      <button
                        onClick={() => onEdit(course)}
                        className="p-2 text-[#9ba1b6] hover:text-[#f3dc92] hover:bg-[#d4af37]/10 rounded-lg transition-colors"
                        title="Edit Course"
                        aria-label="Edit Course"
                      >
                        <Edit2 size={17} />
                      </button>
                      <button
                        onClick={() => onDelete(course)}
                        className="p-2 text-[#9ba1b6] hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                        title="Delete Course"
                        aria-label="Delete Course"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
