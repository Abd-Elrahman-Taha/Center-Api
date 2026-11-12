/**
 * CourseDetailsModal Component
 * Displays complete course details, assigned instructor, and dynamically resolved
 * enrolled students list with capacity gauge.
 */

import { User, DollarSign, Users, Hash, Mail } from "lucide-react";
import Modal from "../common/Modal";
import Badge from "../common/Badge";
import type { Course } from "../../types/course.types";
import type { Teacher } from "../../types/teacher.types";
import type { Student } from "../../types/students.types";

interface CourseDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: Course | null;
  teachers: Teacher[];
  students: Student[];
}

export default function CourseDetailsModal({
  isOpen,
  onClose,
  course,
  teachers,
  students,
}: CourseDetailsModalProps) {
  if (!course) return null;

  const assignedTeacher = teachers.find((t) => t.id === course.teacherId);
  const enrolledStudents = students.filter((s) =>
    s.enrolledCourses?.includes(course.id)
  );

  const enrollmentRatio = course.capacity
    ? Math.min(Math.round((enrolledStudents.length / course.capacity) * 100), 100)
    : 0;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Curriculum Dossier"
      description="Syllabus overview, assigned faculty, and enrolled student roster."
      maxWidth="lg"
    >
      <div className="space-y-6">
        {/* Course Header Banner */}
        <div className="p-5 rounded-2xl bg-[#0b0e18] border border-[#d4af37]/25">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[10.5px] font-semibold text-[#d4af37] uppercase tracking-[0.18em]">
                CURRICULUM OVERVIEW
              </span>
              <h4 className="text-2xl font-bold text-white font-['Cormorant_Garamond',serif] mt-0.5">
                {course.title}
              </h4>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="gold" size="md">
                ${course.price.toLocaleString()}
              </Badge>
              <Badge
                variant={
                  enrollmentRatio >= 90
                    ? "amber"
                    : enrollmentRatio >= 50
                    ? "purple"
                    : "green"
                }
                size="md"
              >
                {enrolledStudents.length} / {course.capacity} Enrolled
              </Badge>
            </div>
          </div>
          <p className="mt-3 text-sm text-[#9ba1b6] leading-relaxed">
            {course.description}
          </p>

          {/* Capacity Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-xs text-[#9ba1b6] mb-1.5">
              <span>Seat Occupancy</span>
              <span className="text-[#f3dc92] font-medium">
                {enrollmentRatio}% filled
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500 bg-gradient-to-r from-[#d4af37] to-[#f3dc92]"
                style={{ width: `${enrollmentRatio}%` }}
              />
            </div>
          </div>
        </div>

        {/* Assigned Teacher Card */}
        <div>
          <h5 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#d4af37]/80 mb-2.5">
            Assigned Instructor
          </h5>
          {assignedTeacher ? (
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#0b0e18] border border-white/10">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#f3dc92] to-[#d4af37] text-[#090b12] font-bold text-sm">
                  {assignedTeacher.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .substring(0, 2)
                    .toUpperCase()}
                </div>
                <div>
                  <h6 className="text-sm font-semibold text-white">
                    {assignedTeacher.name}
                  </h6>
                  <p className="text-xs text-[#9ba1b6] flex items-center gap-2 mt-0.5">
                    <span className="flex items-center gap-1">
                      <Mail size={12} className="text-[#d4af37]" />{" "}
                      {assignedTeacher.email}
                    </span>
                    <span>•</span>
                    <span>{assignedTeacher.specialization}</span>
                  </p>
                </div>
              </div>
              <Badge variant="gold">Teacher #{assignedTeacher.id}</Badge>
            </div>
          ) : (
            <div className="p-3.5 rounded-xl bg-[#d4af37]/10 border border-[#d4af37]/25 text-[#f3dc92] text-xs">
              Teacher ID #{course.teacherId} was not found in the database.
            </div>
          )}
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-3 gap-3">
          <div className="p-3.5 rounded-xl bg-[#0b0e18]/80 border border-white/5">
            <span className="text-[10.5px] font-semibold text-[#d4af37]/80 uppercase tracking-[0.14em] flex items-center gap-1">
              <Hash size={12} /> Course ID
            </span>
            <p className="mt-1 text-sm font-mono text-white">{course.id}</p>
          </div>
          <div className="p-3.5 rounded-xl bg-[#0b0e18]/80 border border-white/5">
            <span className="text-[10.5px] font-semibold text-[#d4af37]/80 uppercase tracking-[0.14em] flex items-center gap-1">
              <DollarSign size={12} /> Tuition Fee
            </span>
            <p className="mt-1 text-sm font-bold text-[#f3dc92]">
              ${course.price.toLocaleString()}
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-[#0b0e18]/80 border border-white/5">
            <span className="text-[10.5px] font-semibold text-[#d4af37]/80 uppercase tracking-[0.14em] flex items-center gap-1">
              <Users size={12} /> Max Capacity
            </span>
            <p className="mt-1 text-sm font-bold text-white">
              {course.capacity} seats
            </p>
          </div>
        </div>

        {/* Enrolled Students Roster */}
        <div>
          <h5 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#d4af37]/80 mb-2.5">
            Enrolled Students ({enrolledStudents.length})
          </h5>

          {enrolledStudents.length === 0 ? (
            <p className="text-xs text-[#9ba1b6] italic p-4 rounded-xl bg-[#0b0e18]/60 border border-white/5 text-center">
              No students are currently enrolled in this course.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
              {enrolledStudents.map((student) => (
                <div
                  key={student.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-[#0b0e18] border border-white/5 hover:border-[#d4af37]/30 transition-colors"
                >
                  <div className="flex items-center gap-2.5 truncate mr-2">
                    <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-[#d4af37]/15 text-[#f3dc92] text-xs font-semibold flex-shrink-0">
                      <User size={13} />
                    </div>
                    <div className="truncate">
                      <p className="text-xs font-medium text-white truncate">
                        {student.name}
                      </p>
                      <p className="text-[10px] text-[#9ba1b6] truncate">
                        {student.email}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] text-[#9ba1b6] font-mono flex-shrink-0">
                    Age {student.age}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Close Button */}
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
