/**
 * CourseFormModal Component
 * Handles creating and editing course records.
 * Uses keyed inner form for clean React state initialization without effects.
 */

import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import Modal from "../common/Modal";
import type { Course, CreateCourseData } from "../../types/course.types";
import type { Teacher } from "../../types/teacher.types";

interface CourseFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateCourseData) => Promise<void>;
  course?: Course | null;
  availableTeachers: Teacher[];
}

function CourseFormInner({
  onClose,
  onSubmit,
  course,
  availableTeachers,
}: {
  onClose: () => void;
  onSubmit: (data: CreateCourseData) => Promise<void>;
  course?: Course | null;
  availableTeachers: Teacher[];
}) {
  const isEditing = Boolean(course);

  const [title, setTitle] = useState(course?.title || "");
  const [description, setDescription] = useState(course?.description || "");
  const [teacherId, setTeacherId] = useState(
    course?.teacherId ||
      (availableTeachers.length > 0 ? availableTeachers[0].id : "")
  );
  const [price, setPrice] = useState<number | "">(course ? course.price : "");
  const [capacity, setCapacity] = useState<number | "">(
    course ? course.capacity : ""
  );

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!title.trim()) {
      newErrors.title = "Course title is required.";
    } else if (title.trim().length < 3) {
      newErrors.title = "Title must be at least 3 characters.";
    }

    if (!description.trim()) {
      newErrors.description = "Course description is required.";
    }

    if (!teacherId) {
      newErrors.teacherId = "Please select an assigned teacher.";
    }

    if (price === "" || isNaN(Number(price))) {
      newErrors.price = "Valid price is required.";
    } else if (Number(price) < 0) {
      newErrors.price = "Price cannot be negative.";
    }

    if (capacity === "" || isNaN(Number(capacity))) {
      newErrors.capacity = "Valid capacity is required.";
    } else if (Number(capacity) < 1) {
      newErrors.capacity = "Capacity must be at least 1 student.";
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
        title: title.trim(),
        description: description.trim(),
        teacherId,
        price: Number(price),
        capacity: Number(capacity),
      });
      onClose();
    } catch (err) {
      setApiError(
        err instanceof Error ? err.message : "Failed to save course."
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

      {/* Title */}
      <div>
        <label className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#d4af37]/80 mb-1.5">
          Course Title <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Modern React & Next.js"
          className={`w-full px-3.5 py-2.5 text-sm bg-[#0b0e18] border ${
            errors.title ? "border-red-500" : "border-white/10"
          } rounded-xl text-white placeholder-[#72788c] focus:outline-none focus:border-[#d4af37]/60 focus:ring-2 focus:ring-[#d4af37]/15 transition-all`}
        />
        {errors.title && (
          <p className="mt-1 text-xs text-red-400">{errors.title}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <label className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#d4af37]/80 mb-1.5">
          Description <span className="text-red-400">*</span>
        </label>
        <textarea
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Overview of syllabus, key topics, and prerequisites..."
          className={`w-full px-3.5 py-2.5 text-sm bg-[#0b0e18] border ${
            errors.description ? "border-red-500" : "border-white/10"
          } rounded-xl text-white placeholder-[#72788c] focus:outline-none focus:border-[#d4af37]/60 focus:ring-2 focus:ring-[#d4af37]/15 transition-all`}
        />
        {errors.description && (
          <p className="mt-1 text-xs text-red-400">{errors.description}</p>
        )}
      </div>

      {/* Assigned Teacher */}
      <div>
        <label className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#d4af37]/80 mb-1.5">
          Assigned Teacher <span className="text-red-400">*</span>
        </label>
        {availableTeachers.length === 0 ? (
          <p className="text-xs text-[#f3dc92] bg-[#d4af37]/10 p-3 rounded-xl border border-[#d4af37]/25">
            No teachers found. Please register an instructor before creating a
            course.
          </p>
        ) : (
          <select
            value={teacherId}
            onChange={(e) => setTeacherId(e.target.value)}
            className={`w-full px-3.5 py-2.5 text-sm bg-[#0b0e18] border ${
              errors.teacherId ? "border-red-500" : "border-white/10"
            } rounded-xl text-white focus:outline-none focus:border-[#d4af37]/60 focus:ring-2 focus:ring-[#d4af37]/15 transition-all`}
          >
            <option value="" disabled>
              Select an instructor...
            </option>
            {availableTeachers.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name} ({t.specialization})
              </option>
            ))}
          </select>
        )}
        {errors.teacherId && (
          <p className="mt-1 text-xs text-red-400">{errors.teacherId}</p>
        )}
      </div>

      {/* Price and Capacity */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#d4af37]/80 mb-1.5">
            Price (USD) <span className="text-red-400">*</span>
          </label>
          <input
            type="number"
            min={0}
            step={10}
            value={price}
            onChange={(e) =>
              setPrice(e.target.value === "" ? "" : Number(e.target.value))
            }
            placeholder="e.g. 1500"
            className={`w-full px-3.5 py-2.5 text-sm bg-[#0b0e18] border ${
              errors.price ? "border-red-500" : "border-white/10"
            } rounded-xl text-white placeholder-[#72788c] focus:outline-none focus:border-[#d4af37]/60 focus:ring-2 focus:ring-[#d4af37]/15 transition-all`}
          />
          {errors.price && (
            <p className="mt-1 text-xs text-red-400">{errors.price}</p>
          )}
        </div>

        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#d4af37]/80 mb-1.5">
            Capacity <span className="text-red-400">*</span>
          </label>
          <input
            type="number"
            min={1}
            value={capacity}
            onChange={(e) =>
              setCapacity(e.target.value === "" ? "" : Number(e.target.value))
            }
            placeholder="e.g. 30"
            className={`w-full px-3.5 py-2.5 text-sm bg-[#0b0e18] border ${
              errors.capacity ? "border-red-500" : "border-white/10"
            } rounded-xl text-white placeholder-[#72788c] focus:outline-none focus:border-[#d4af37]/60 focus:ring-2 focus:ring-[#d4af37]/15 transition-all`}
          />
          {errors.capacity && (
            <p className="mt-1 text-xs text-red-400">{errors.capacity}</p>
          )}
        </div>
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
          disabled={isSubmitting || availableTeachers.length === 0}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-[#0b0d14] bg-gradient-to-r from-[#f3dc92] via-[#d4af37] to-[#b58b24] hover:brightness-110 rounded-xl shadow-[0_10px_28px_rgba(212,175,55,0.28)] transition-all disabled:opacity-50"
        >
          {isSubmitting && <Loader2 size={16} className="animate-spin" />}
          {isEditing ? "Save Changes" : "Create Course"}
        </button>
      </div>
    </form>
  );
}

export default function CourseFormModal({
  isOpen,
  onClose,
  onSubmit,
  course,
  availableTeachers,
}: CourseFormModalProps) {
  const isEditing = Boolean(course);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? "Edit Course" : "Create New Course"}
      description={
        isEditing
          ? "Update course curriculum, pricing, and assigned instructor."
          : "Add a new course curriculum with pricing and class capacity."
      }
      maxWidth="md"
    >
      <CourseFormInner
        key={course ? `edit-${course.id}` : "create"}
        onClose={onClose}
        onSubmit={onSubmit}
        course={course}
        availableTeachers={availableTeachers}
      />
    </Modal>
  );
}
