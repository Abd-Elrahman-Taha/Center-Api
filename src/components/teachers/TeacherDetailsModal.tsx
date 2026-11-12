/**
 * TeacherDetailsModal Component
 * Displays complete teacher profile and dynamically resolved assigned courses.
 */

import { Mail, Briefcase, BookOpen, Hash } from "lucide-react";
import Modal from "../common/Modal";
import Badge from "../common/Badge";
import type { Teacher } from "../../types/teacher.types";
import type { Course } from "../../types/course.types";

interface TeacherDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  teacher: Teacher | null;
  courses: Course[];
}

export default function TeacherDetailsModal({
  isOpen,
  onClose,
  teacher,
  courses,
}: TeacherDetailsModalProps) {
  if (!teacher) return null;

  const assignedCourses = courses.filter((c) => c.teacherId === teacher.id);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Faculty Dossier"
      description="Instructor profile and active teaching assignments."
      maxWidth="md"
    >
      <div className="space-y-6">
        {/* Profile Card Header */}
        <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#0b0e18] border border-[#d4af37]/25">
          <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#f3dc92] via-[#d4af37] to-[#a67c1e] text-[#090b12] text-lg font-bold font-['Outfit'] shadow-[0_8px_24px_rgba(212,175,55,0.28)]">
            {teacher.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .substring(0, 2)
              .toUpperCase()}
          </div>
          <div>
            <h4 className="text-xl font-bold text-white font-['Cormorant_Garamond',serif]">
              {teacher.name}
            </h4>
            <div className="flex items-center gap-3 mt-1 text-xs text-[#9ba1b6]">
              <span className="flex items-center gap-1">
                <Mail size={13} className="text-[#d4af37]" /> {teacher.email}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Briefcase size={13} className="text-[#d4af37]" />{" "}
                {teacher.specialization}
              </span>
            </div>
          </div>
        </div>

        {/* Detailed Fields */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3.5 rounded-xl bg-[#0b0e18]/80 border border-white/5">
            <span className="text-[10.5px] font-semibold text-[#d4af37]/80 uppercase tracking-[0.14em] flex items-center gap-1">
              <Hash size={12} /> Teacher ID
            </span>
            <p className="mt-1 text-sm font-mono text-white">{teacher.id}</p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#0b0e18]/80 border border-white/5">
            <span className="text-[10.5px] font-semibold text-[#d4af37]/80 uppercase tracking-[0.14em] flex items-center gap-1">
              <BookOpen size={12} /> Assigned Courses
            </span>
            <p className="mt-1 text-sm font-semibold text-[#f3dc92]">
              {assignedCourses.length} course(s)
            </p>
          </div>
        </div>

        {/* Assigned Courses List */}
        <div>
          <h5 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#d4af37]/80 mb-3">
            Courses Taught by {teacher.name}
          </h5>

          {assignedCourses.length === 0 ? (
            <p className="text-xs text-[#9ba1b6] italic p-4 rounded-xl bg-[#0b0e18]/60 border border-white/5 text-center">
              No courses are currently assigned to this teacher.
            </p>
          ) : (
            <div className="space-y-2">
              {assignedCourses.map((course) => (
                <div
                  key={course.id}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-[#0b0e18] border border-white/5 hover:border-[#d4af37]/30 transition-colors"
                >
                  <div>
                    <h6 className="text-sm font-medium text-white">
                      {course.title}
                    </h6>
                    <p className="text-xs text-[#9ba1b6] mt-0.5 line-clamp-1">
                      {course.description}
                    </p>
                  </div>
                  <Badge variant="gold">Cap: {course.capacity}</Badge>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Close */}
        <div className="flex justify-end pt-4 border-t border-[#d4af37]/15">
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-sm font-medium text-white bg-white/5 hover:bg-white/10 rounded-xl transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
}
