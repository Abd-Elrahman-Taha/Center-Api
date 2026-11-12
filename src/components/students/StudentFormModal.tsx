/**
 * StudentFormModal Component
 * Handles creating and editing student records.
 * Uses keyed inner form for clean React state initialization without effects.
 */

import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import Modal from "../common/Modal";
import type { Student, CreateStudentData } from "../../types/students.types";
import type { Course } from "../../types/course.types";

interface StudentFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateStudentData) => Promise<void>;
  student?: Student | null;
  availableCourses: Course[];
}

function StudentFormInner({
  onClose,
  onSubmit,
  student,
  availableCourses,
}: {
  onClose: () => void;
  onSubmit: (data: CreateStudentData) => Promise<void>;
  student?: Student | null;
  availableCourses: Course[];
}) {
  const isEditing = Boolean(student);

  const [name, setName] = useState(student?.name || "");
  const [email, setEmail] = useState(student?.email || "");
  const [age, setAge] = useState<number | "">(student ? student.age : "");
  const [enrolledCourses, setEnrolledCourses] = useState<string[]>(
    student?.enrolledCourses || []
  );

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const handleToggleCourse = (courseId: string) => {
    setEnrolledCourses((prev) =>
      prev.includes(courseId)
        ? prev.filter((id) => id !== courseId)
        : [...prev, courseId]
    );
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = "Full name is required.";
    } else if (name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
    }

    if (!email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (age === "" || isNaN(Number(age))) {
      newErrors.age = "Age is required.";
    } else if (Number(age) < 5 || Number(age) > 100) {
      newErrors.age = "Age must be between 5 and 100.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setApiError(null);

    try {
      await onSubmit({
        name: name.trim(),
        email: email.trim(),
        age: Number(age),
        enrolledCourses,
      });
      onClose();
    } catch (err) {
      setApiError(
        err instanceof Error ? err.message : "An error occurred while saving."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {apiError && (
        <div className="p-3 text-sm text-red-300 bg-red-500/10 border border-red-500/20 rounded-xl">
          {apiError}
        </div>
      )}

      {/* Name Field */}
      <div>
        <label className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#d4af37]/80 mb-1.5">
          Full Name <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Sarah Jenkins"
          className={`w-full px-3.5 py-2.5 text-sm bg-[#0b0e18] border ${
            errors.name ? "border-red-500" : "border-white/10"
          } rounded-xl text-white placeholder-[#72788c] focus:outline-none focus:border-[#d4af37]/60 focus:ring-2 focus:ring-[#d4af37]/15 transition-all`}
        />
        {errors.name && (
          <p className="mt-1 text-xs text-red-400">{errors.name}</p>
        )}
      </div>

      {/* Email Field */}
      <div>
        <label className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#d4af37]/80 mb-1.5">
          Email Address <span className="text-red-400">*</span>
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="e.g. sarah@example.com"
          className={`w-full px-3.5 py-2.5 text-sm bg-[#0b0e18] border ${
            errors.email ? "border-red-500" : "border-white/10"
          } rounded-xl text-white placeholder-[#72788c] focus:outline-none focus:border-[#d4af37]/60 focus:ring-2 focus:ring-[#d4af37]/15 transition-all`}
        />
        {errors.email && (
          <p className="mt-1 text-xs text-red-400">{errors.email}</p>
        )}
      </div>

      {/* Age Field */}
      <div>
        <label className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#d4af37]/80 mb-1.5">
          Age <span className="text-red-400">*</span>
        </label>
        <input
          type="number"
          min={5}
          max={100}
          value={age}
          onChange={(e) =>
            setAge(e.target.value === "" ? "" : Number(e.target.value))
          }
          placeholder="e.g. 21"
          className={`w-full px-3.5 py-2.5 text-sm bg-[#0b0e18] border ${
            errors.age ? "border-red-500" : "border-white/10"
          } rounded-xl text-white placeholder-[#72788c] focus:outline-none focus:border-[#d4af37]/60 focus:ring-2 focus:ring-[#d4af37]/15 transition-all`}
        />
        {errors.age && (
          <p className="mt-1 text-xs text-red-400">{errors.age}</p>
        )}
      </div>

      {/* Course Enrollment Selection */}
      <div>
        <label className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#d4af37]/80 mb-2">
          Enrolled Courses ({enrolledCourses.length} selected)
        </label>
        {availableCourses.length === 0 ? (
          <p className="text-xs text-[#9ba1b6] italic">
            No courses available. Create a course first.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto p-1 pr-2">
            {availableCourses.map((course) => {
              const isSelected = enrolledCourses.includes(course.id);
              return (
                <button
                  key={course.id}
                  type="button"
                  onClick={() => handleToggleCourse(course.id)}
                  className={`flex items-center justify-between p-3 rounded-xl border text-left text-xs transition-all ${
                    isSelected
                      ? "bg-[#d4af37]/15 border-[#d4af37]/50 text-[#f3dc92]"
                      : "bg-[#0b0e18] border-white/5 text-[#9ba1b6] hover:border-white/15 hover:text-white"
                  }`}
                >
                  <span className="font-medium truncate mr-2">
                    {course.title}
                  </span>
                  <span
                    className={`w-4 h-4 rounded-md flex items-center justify-center text-[10px] border ${
                      isSelected
                        ? "bg-[#d4af37] text-[#090b12] font-bold border-transparent"
                        : "border-white/20"
                    }`}
                  >
                    {isSelected ? "✓" : ""}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Form Actions */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#d4af37]/15">
        <button
          type="button"
          disabled={isSubmitting}
          onClick={onClose}
          className="px-4 py-2.5 text-sm font-medium text-gray-300 bg-white/5 hover:bg-white/10 rounded-xl transition-colors disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-[#0b0d14] bg-gradient-to-r from-[#f3dc92] via-[#d4af37] to-[#b58b24] hover:brightness-110 rounded-xl shadow-[0_10px_28px_rgba(212,175,55,0.28)] transition-all disabled:opacity-50"
        >
          {isSubmitting && <Loader2 size={16} className="animate-spin" />}
          {isEditing ? "Save Changes" : "Create Student"}
        </button>
      </div>
    </form>
  );
}

export default function StudentFormModal({
  isOpen,
  onClose,
  onSubmit,
  student,
  availableCourses,
}: StudentFormModalProps) {
  const isEditing = Boolean(student);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? "Edit Student" : "Add New Student"}
      description={
        isEditing
          ? "Update the student's personal details and enrolled courses."
          : "Fill in the details to register a new student on the platform."
      }
      maxWidth="md"
    >
      <StudentFormInner
        key={student ? `edit-${student.id}` : "create"}
        onClose={onClose}
        onSubmit={onSubmit}
        student={student}
        availableCourses={availableCourses}
      />
    </Modal>
  );
}
