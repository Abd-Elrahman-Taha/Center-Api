/**
 * TeacherTable Component
 * Displays teachers with specialization, assigned course counts, and action buttons.
 */

import { Eye, Edit2, Trash2 } from "lucide-react";
import Badge from "../common/Badge";
import type { Teacher } from "../../types/teacher.types";
import type { Course } from "../../types/course.types";

interface TeacherTableProps {
  teachers: Teacher[];
  courses: Course[];
  onView: (teacher: Teacher) => void;
  onEdit: (teacher: Teacher) => void;
  onDelete: (teacher: Teacher) => void;
}

export default function TeacherTable({
  teachers,
  courses,
  onView,
  onEdit,
  onDelete,
}: TeacherTableProps) {
  const getTeacherCourses = (teacherId: string) => {
    return courses.filter((c) => c.teacherId === teacherId);
  };

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-[#d4af37]/20 bg-gradient-to-b from-[#121624] to-[#0b0e17] shadow-[0_18px_44px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.05)]">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-[#f2efe9]">
          <thead className="border-b border-[#d4af37]/15 bg-[#0d101b]/90 text-[11px] uppercase tracking-[0.14em] text-[#d4af37]/80">
            <tr>
              <th scope="col" className="px-6 py-4 font-semibold">
                Teacher
              </th>
              <th scope="col" className="px-6 py-4 font-semibold">
                Email
              </th>
              <th scope="col" className="px-6 py-4 font-semibold">
                Specialization
              </th>
              <th scope="col" className="px-6 py-4 font-semibold">
                Assigned Courses
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
            {teachers.map((teacher) => {
              const assignedCourses = getTeacherCourses(teacher.id);
              const initials = teacher.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .substring(0, 2)
                .toUpperCase();

              return (
                <tr
                  key={teacher.id}
                  className="hover:bg-[#d4af37]/[0.03] transition-colors group"
                >
                  {/* Name with Gilded Avatar */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3.5">
                      <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-[#2a2214] to-[#1a150c] text-[#f3dc92] font-semibold text-xs border border-[#d4af37]/35 shadow-sm">
                        {initials}
                      </div>
                      <div>
                        <div className="font-semibold text-white group-hover:text-[#f3dc92] transition-colors">
                          {teacher.name}
                        </div>
                        <div className="text-xs text-[#8f95ab] md:hidden">
                          {teacher.email}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Email */}
                  <td className="px-6 py-4 text-[#9ba1b6]">
                    {teacher.email}
                  </td>

                  {/* Specialization */}
                  <td className="px-6 py-4">
                    <Badge variant="gold" size="sm">
                      {teacher.specialization}
                    </Badge>
                  </td>

                  {/* Assigned Courses */}
                  <td className="px-6 py-4">
                    {assignedCourses.length > 0 ? (
                      <div className="flex flex-wrap gap-1.5 max-w-xs">
                        {assignedCourses.map((c) => (
                          <Badge key={c.id} variant="blue" size="sm">
                            {c.title}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <span className="text-xs text-[#8f95ab] italic">
                        No courses assigned
                      </span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1 opacity-85 group-hover:opacity-100">
                      <button
                        onClick={() => onView(teacher)}
                        className="p-2 text-[#9ba1b6] hover:text-[#89c0ff] hover:bg-[#5fa4f8]/10 rounded-lg transition-colors"
                        title="View Details"
                        aria-label="View Details"
                      >
                        <Eye size={17} />
                      </button>
                      <button
                        onClick={() => onEdit(teacher)}
                        className="p-2 text-[#9ba1b6] hover:text-[#f3dc92] hover:bg-[#d4af37]/10 rounded-lg transition-colors"
                        title="Edit Teacher"
                        aria-label="Edit Teacher"
                      >
                        <Edit2 size={17} />
                      </button>
                      <button
                        onClick={() => onDelete(teacher)}
                        className="p-2 text-[#9ba1b6] hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                        title="Delete Teacher"
                        aria-label="Delete Teacher"
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
