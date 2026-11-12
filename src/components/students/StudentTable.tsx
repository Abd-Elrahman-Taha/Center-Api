/**
 * StudentTable Component
 * Renders the students in a luxury, high-craft table with gilded accents,
 * dynamically resolved course tags, and action buttons.
 */

import { Eye, Edit2, Trash2 } from "lucide-react";
import Badge from "../common/Badge";
import type { Student } from "../../types/students.types";
import type { Course } from "../../types/course.types";

interface StudentTableProps {
  students: Student[];
  courses: Course[];
  onView: (student: Student) => void;
  onEdit: (student: Student) => void;
  onDelete: (student: Student) => void;
}

export default function StudentTable({
  students,
  courses,
  onView,
  onEdit,
  onDelete,
}: StudentTableProps) {
  const getCourseTitle = (courseId: string) => {
    const course = courses.find((c) => c.id === courseId);
    return course ? course.title : `Course #${courseId}`;
  };

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-[#d4af37]/20 bg-gradient-to-b from-[#121624] to-[#0b0e17] shadow-[0_18px_44px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.05)]">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-[#f2efe9]">
          <thead className="border-b border-[#d4af37]/15 bg-[#0d101b]/90 text-[11px] uppercase tracking-[0.14em] text-[#d4af37]/80">
            <tr>
              <th scope="col" className="px-6 py-4 font-semibold">
                Student
              </th>
              <th scope="col" className="px-6 py-4 font-semibold">
                Email
              </th>
              <th scope="col" className="px-6 py-4 font-semibold">
                Age
              </th>
              <th scope="col" className="px-6 py-4 font-semibold">
                Enrolled Courses
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
            {students.map((student) => {
              const initials = student.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .substring(0, 2)
                .toUpperCase();

              return (
                <tr
                  key={student.id}
                  className="hover:bg-[#d4af37]/[0.03] transition-colors group"
                >
                  {/* Name with Gilded Avatar */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3.5">
                      <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-[#231e38] to-[#161326] text-[#f3dc92] font-semibold text-xs border border-[#d4af37]/30 shadow-sm">
                        {initials}
                      </div>
                      <div>
                        <div className="font-semibold text-white group-hover:text-[#f3dc92] transition-colors">
                          {student.name}
                        </div>
                        <div className="text-xs text-[#8f95ab] md:hidden">
                          {student.email}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Email */}
                  <td className="px-6 py-4 text-[#9ba1b6]">
                    {student.email}
                  </td>

                  {/* Age */}
                  <td className="px-6 py-4 text-[#9ba1b6]">
                    <span className="font-mono text-white/90">
                      {student.age}
                    </span>{" "}
                    yrs
                  </td>

                  {/* Enrolled Courses */}
                  <td className="px-6 py-4">
                    {student.enrolledCourses &&
                    student.enrolledCourses.length > 0 ? (
                      <div className="flex flex-wrap gap-1.5 max-w-xs">
                        {student.enrolledCourses.map((cId) => (
                          <Badge key={cId} variant="purple" size="sm">
                            {getCourseTitle(cId)}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <span className="text-xs text-[#8f95ab] italic">
                        Not enrolled
                      </span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1 opacity-85 group-hover:opacity-100">
                      <button
                        onClick={() => onView(student)}
                        className="p-2 text-[#9ba1b6] hover:text-[#89c0ff] hover:bg-[#5fa4f8]/10 rounded-lg transition-colors"
                        title="View Details"
                        aria-label="View Details"
                      >
                        <Eye size={17} />
                      </button>
                      <button
                        onClick={() => onEdit(student)}
                        className="p-2 text-[#9ba1b6] hover:text-[#f3dc92] hover:bg-[#d4af37]/10 rounded-lg transition-colors"
                        title="Edit Student"
                        aria-label="Edit Student"
                      >
                        <Edit2 size={17} />
                      </button>
                      <button
                        onClick={() => onDelete(student)}
                        className="p-2 text-[#9ba1b6] hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                        title="Delete Student"
                        aria-label="Delete Student"
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
