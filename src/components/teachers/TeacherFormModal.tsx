/**
 * TeacherFormModal Component
 * Handles creating and editing teacher records.
 * Uses keyed inner form for clean React state initialization without effects.
 */

import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import Modal from "../common/Modal";
import type { Teacher, CreateTeacherData } from "../../types/teacher.types";

interface TeacherFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateTeacherData) => Promise<void>;
  teacher?: Teacher | null;
}

function TeacherFormInner({
  onClose,
  onSubmit,
  teacher,
}: {
  onClose: () => void;
  onSubmit: (data: CreateTeacherData) => Promise<void>;
  teacher?: Teacher | null;
}) {
  const isEditing = Boolean(teacher);

  const [name, setName] = useState(teacher?.name || "");
  const [email, setEmail] = useState(teacher?.email || "");
  const [specialization, setSpecialization] = useState(
    teacher?.specialization || ""
  );

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = "Teacher name is required.";
    } else if (name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
    }

    if (!email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!specialization.trim()) {
      newErrors.specialization = "Specialization / Subject field is required.";
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
        specialization: specialization.trim(),
      });
      onClose();
    } catch (err) {
      setApiError(
        err instanceof Error ? err.message : "Failed to save teacher."
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

      {/* Name */}
      <div>
        <label className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#d4af37]/80 mb-1.5">
          Full Name <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Dr. Jane Doe"
          className={`w-full px-3.5 py-2.5 text-sm bg-[#0b0e18] border ${
            errors.name ? "border-red-500" : "border-white/10"
          } rounded-xl text-white placeholder-[#72788c] focus:outline-none focus:border-[#d4af37]/60 focus:ring-2 focus:ring-[#d4af37]/15 transition-all`}
        />
        {errors.name && (
          <p className="mt-1 text-xs text-red-400">{errors.name}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#d4af37]/80 mb-1.5">
          Email Address <span className="text-red-400">*</span>
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="e.g. jane.doe@eduspace.internal"
          className={`w-full px-3.5 py-2.5 text-sm bg-[#0b0e18] border ${
            errors.email ? "border-red-500" : "border-white/10"
          } rounded-xl text-white placeholder-[#72788c] focus:outline-none focus:border-[#d4af37]/60 focus:ring-2 focus:ring-[#d4af37]/15 transition-all`}
        />
        {errors.email && (
          <p className="mt-1 text-xs text-red-400">{errors.email}</p>
        )}
      </div>

      {/* Specialization */}
      <div>
        <label className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#d4af37]/80 mb-1.5">
          Specialization / Department <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          value={specialization}
          onChange={(e) => setSpecialization(e.target.value)}
          placeholder="e.g. Frontend Development, Data Science"
          className={`w-full px-3.5 py-2.5 text-sm bg-[#0b0e18] border ${
            errors.specialization ? "border-red-500" : "border-white/10"
          } rounded-xl text-white placeholder-[#72788c] focus:outline-none focus:border-[#d4af37]/60 focus:ring-2 focus:ring-[#d4af37]/15 transition-all`}
        />
        {errors.specialization && (
          <p className="mt-1 text-xs text-red-400">{errors.specialization}</p>
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
          {isEditing ? "Save Changes" : "Create Teacher"}
        </button>
      </div>
    </form>
  );
}

export default function TeacherFormModal({
  isOpen,
  onClose,
  onSubmit,
  teacher,
}: TeacherFormModalProps) {
  const isEditing = Boolean(teacher);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? "Edit Teacher" : "Add New Teacher"}
      description={
        isEditing
          ? "Update teacher profile and subject specialization."
          : "Register a new teacher to assign courses and manage lessons."
      }
      maxWidth="md"
    >
      <TeacherFormInner
        key={teacher ? `edit-${teacher.id}` : "create"}
        onClose={onClose}
        onSubmit={onSubmit}
        teacher={teacher}
      />
    </Modal>
  );
}
