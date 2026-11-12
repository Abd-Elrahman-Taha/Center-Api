/**
 * TeachersPage Component
 * Full CRUD management view for Teachers.
 */

import { useState, useMemo } from "react";
import { GraduationCap, Filter } from "lucide-react";
import DashboardLayout from "../components/layout/DashboardLayout";
import PageHeader from "../components/common/PageHeader";
import SearchBar from "../components/common/SearchBar";
import LoadingSpinner from "../components/common/LoadingSpinner";
import EmptyState from "../components/common/EmptyState";
import ConfirmModal from "../components/common/ConfirmModal";
import TeacherTable from "../components/teachers/TeacherTable";
import TeacherFormModal from "../components/teachers/TeacherFormModal";
import TeacherDetailsModal from "../components/teachers/TeacherDetailsModal";
import { useTeachers } from "../hooks/useTeachers";
import { useCourses } from "../hooks/useCourses";
import type { Teacher, CreateTeacherData } from "../types/teacher.types";

export default function TeachersPage() {
  const {
    teachers,
    loading: teachersLoading,
    error: teachersError,
    createTeacher,
    updateTeacher,
    deleteTeacher,
  } = useTeachers();

  const { courses, loading: coursesLoading } = useCourses();

  // Search and filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [specializationFilter, setSpecializationFilter] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Modal states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);
  const [viewingTeacher, setViewingTeacher] = useState<Teacher | null>(null);
  const [deletingTeacher, setDeletingTeacher] = useState<Teacher | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Toast state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Unique specializations for filter dropdown
  const specializations = useMemo(() => {
    const specs = new Set<string>();
    teachers.forEach((t) => {
      if (t.specialization) specs.add(t.specialization);
    });
    return Array.from(specs);
  }, [teachers]);

  // Filtered teachers
  const filteredTeachers = useMemo(() => {
    return teachers.filter((teacher) => {
      const matchesSearch =
        teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.specialization.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesSpec =
        specializationFilter === "ALL" ||
        teacher.specialization === specializationFilter;

      return matchesSearch && matchesSpec;
    });
  }, [teachers, searchTerm, specializationFilter]);

  // Paginated slice
  const paginatedTeachers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredTeachers.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredTeachers, currentPage]);

  const totalPages = Math.ceil(filteredTeachers.length / itemsPerPage) || 1;

  // Handlers
  const handleOpenCreate = () => {
    setEditingTeacher(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (teacher: Teacher) => {
    setEditingTeacher(teacher);
    setIsFormOpen(true);
  };

  const handleFormSubmit = async (data: CreateTeacherData) => {
    if (editingTeacher) {
      await updateTeacher(editingTeacher.id, data);
      showToast(`Updated teacher "${data.name}" successfully!`);
    } else {
      await createTeacher(data);
      showToast(`Added teacher "${data.name}" successfully!`);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deletingTeacher) return;
    setIsDeleting(true);
    try {
      await deleteTeacher(deletingTeacher.id);
      showToast(`Removed teacher "${deletingTeacher.name}".`);
      setDeletingTeacher(null);
    } catch {
      // error handled by hook
    } finally {
      setIsDeleting(false);
    }
  };

  const isLoading = teachersLoading || coursesLoading;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Toast */}
        {toastMessage && (
          <div className="p-3.5 bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 rounded-xl text-sm flex items-center justify-between animate-fadeIn">
            <span>{toastMessage}</span>
            <button
              onClick={() => setToastMessage(null)}
              className="text-emerald-400 hover:text-white"
            >
              ✕
            </button>
          </div>
        )}

        {/* Global Error Banner */}
        {teachersError && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-300 rounded-xl text-sm">
            {teachersError}
          </div>
        )}

        {/* Header */}
        <PageHeader
          title="Teachers"
          subtitle="Manage instructors, faculty profiles, and subject specializations."
          icon={GraduationCap}
          count={teachers.length}
          actionLabel="Add Teacher"
          onAction={handleOpenCreate}
        />

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <SearchBar
            value={searchTerm}
            onChange={(val) => {
              setSearchTerm(val);
              setCurrentPage(1);
            }}
            placeholder="Search by teacher name, email, or subject..."
          />

          <div className="flex items-center gap-2">
            <Filter size={16} className="text-[#d4af37]/75" />
            <select
              value={specializationFilter}
              onChange={(e) => {
                setSpecializationFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="px-3.5 py-2.5 text-xs bg-[#0d101b] border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#d4af37]/60 cursor-pointer"
            >
              <option value="ALL">All Specializations</option>
              {specializations.map((spec) => (
                <option key={spec} value={spec}>
                  {spec}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Content Section */}
        {isLoading ? (
          <LoadingSpinner message="Fetching instructors from server..." />
        ) : filteredTeachers.length === 0 ? (
          <EmptyState
            icon={GraduationCap}
            title={
              searchTerm || specializationFilter !== "ALL"
                ? "No matching teachers"
                : "No teachers added yet"
            }
            description={
              searchTerm || specializationFilter !== "ALL"
                ? "Try adjusting your search terms or clearing specialization filters."
                : "Get started by adding your first instructor."
            }
            actionLabel={
              searchTerm || specializationFilter !== "ALL"
                ? "Clear Filters"
                : "Add Teacher"
            }
            onAction={
              searchTerm || specializationFilter !== "ALL"
                ? () => {
                    setSearchTerm("");
                    setSpecializationFilter("ALL");
                  }
                : handleOpenCreate
            }
          />
        ) : (
          <div className="space-y-4">
            <TeacherTable
              teachers={paginatedTeachers}
              courses={courses}
              onView={(t) => setViewingTeacher(t)}
              onEdit={handleOpenEdit}
              onDelete={(t) => setDeletingTeacher(t)}
            />

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between pt-2 text-xs text-[#858ba0]">
                <span>
                  Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                  {Math.min(currentPage * itemsPerPage, filteredTeachers.length)}{" "}
                  of {filteredTeachers.length} teachers
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    className="px-3 py-1.5 rounded-lg bg-[#141724] border border-white/10 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white/5"
                  >
                    Previous
                  </button>
                  <span className="px-2 font-medium text-white">
                    {currentPage} / {totalPages}
                  </span>
                  <button
                    disabled={currentPage === totalPages}
                    onClick={() =>
                      setCurrentPage((p) => Math.min(p + 1, totalPages))
                    }
                    className="px-3 py-1.5 rounded-lg bg-[#141724] border border-white/10 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white/5"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Create / Edit Modal */}
        <TeacherFormModal
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSubmit={handleFormSubmit}
          teacher={editingTeacher}
        />

        {/* Details Modal */}
        <TeacherDetailsModal
          isOpen={Boolean(viewingTeacher)}
          onClose={() => setViewingTeacher(null)}
          teacher={viewingTeacher}
          courses={courses}
        />

        {/* Delete Confirmation Modal */}
        <ConfirmModal
          isOpen={Boolean(deletingTeacher)}
          onClose={() => setDeletingTeacher(null)}
          onConfirm={handleConfirmDelete}
          isLoading={isDeleting}
          title="Delete Teacher"
          message={`Are you sure you want to delete teacher "${deletingTeacher?.name}"? This action cannot be undone.`}
          confirmText="Yes, Delete Teacher"
        />
      </div>
    </DashboardLayout>
  );
}
