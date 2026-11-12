/**
 * CoursesPage Component
 * Full CRUD management view for Courses with relational joins to Teachers and Students.
 */

import { useState, useMemo } from "react";
import { BookOpen, Filter } from "lucide-react";
import DashboardLayout from "../components/layout/DashboardLayout";
import PageHeader from "../components/common/PageHeader";
import SearchBar from "../components/common/SearchBar";
import LoadingSpinner from "../components/common/LoadingSpinner";
import EmptyState from "../components/common/EmptyState";
import ConfirmModal from "../components/common/ConfirmModal";
import CourseTable from "../components/courses/CourseTable";
import CourseFormModal from "../components/courses/CourseFormModal";
import CourseDetailsModal from "../components/courses/CourseDetailsModal";
import { useCourses } from "../hooks/useCourses";
import { useTeachers } from "../hooks/useTeachers";
import { useStudents } from "../hooks/useStudents";
import type { Course, CreateCourseData } from "../types/course.types";

export default function CoursesPage() {
  const {
    courses,
    loading: coursesLoading,
    error: coursesError,
    createCourse,
    updateCourse,
    deleteCourse,
  } = useCourses();

  const { teachers, loading: teachersLoading } = useTeachers();
  const { students, loading: studentsLoading } = useStudents();

  // Search & Filter
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTeacherFilter, setSelectedTeacherFilter] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Modals
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [viewingCourse, setViewingCourse] = useState<Course | null>(null);
  const [deletingCourse, setDeletingCourse] = useState<Course | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Filtered courses
  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesTeacher =
        selectedTeacherFilter === "ALL" ||
        course.teacherId === selectedTeacherFilter;

      return matchesSearch && matchesTeacher;
    });
  }, [courses, searchTerm, selectedTeacherFilter]);

  // Paginated slice
  const paginatedCourses = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredCourses.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredCourses, currentPage]);

  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage) || 1;

  // Handlers
  const handleOpenCreate = () => {
    setEditingCourse(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (course: Course) => {
    setEditingCourse(course);
    setIsFormOpen(true);
  };

  const handleFormSubmit = async (data: CreateCourseData) => {
    if (editingCourse) {
      await updateCourse(editingCourse.id, data);
      showToast(`Updated course "${data.title}" successfully!`);
    } else {
      await createCourse(data);
      showToast(`Created course "${data.title}" successfully!`);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deletingCourse) return;
    setIsDeleting(true);
    try {
      await deleteCourse(deletingCourse.id);
      showToast(`Deleted course "${deletingCourse.title}".`);
      setDeletingCourse(null);
    } catch {
      // error handled by hook
    } finally {
      setIsDeleting(false);
    }
  };

  const isLoading = coursesLoading || teachersLoading || studentsLoading;

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
        {coursesError && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-300 rounded-xl text-sm">
            {coursesError}
          </div>
        )}

        {/* Header */}
        <PageHeader
          title="Courses"
          subtitle="Manage active syllabus, curriculum pricing, and assigned teachers."
          icon={BookOpen}
          count={courses.length}
          actionLabel="Create Course"
          onAction={handleOpenCreate}
        />

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <SearchBar
            value={searchTerm}
            onChange={(val) => {
              setSearchTerm(val);
              setCurrentPage(1);
            }}
            placeholder="Search by course title or syllabus..."
          />

          <div className="flex items-center gap-2">
            <Filter size={16} className="text-[#d4af37]/75" />
            <select
              value={selectedTeacherFilter}
              onChange={(e) => {
                setSelectedTeacherFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="px-3.5 py-2.5 text-xs bg-[#0d101b] border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#d4af37]/60 cursor-pointer"
            >
              <option value="ALL">All Instructors</option>
              {teachers.map((teacher) => (
                <option key={teacher.id} value={teacher.id}>
                  {teacher.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Content Section */}
        {isLoading ? (
          <LoadingSpinner message="Fetching courses from server..." />
        ) : filteredCourses.length === 0 ? (
          <EmptyState
            icon={BookOpen}
            title={
              searchTerm || selectedTeacherFilter !== "ALL"
                ? "No matching courses"
                : "No courses created yet"
            }
            description={
              searchTerm || selectedTeacherFilter !== "ALL"
                ? "Try adjusting your search terms or clearing the instructor filter."
                : "Get started by creating your first course."
            }
            actionLabel={
              searchTerm || selectedTeacherFilter !== "ALL"
                ? "Clear Filters"
                : "Create Course"
            }
            onAction={
              searchTerm || selectedTeacherFilter !== "ALL"
                ? () => {
                    setSearchTerm("");
                    setSelectedTeacherFilter("ALL");
                  }
                : handleOpenCreate
            }
          />
        ) : (
          <div className="space-y-4">
            <CourseTable
              courses={paginatedCourses}
              teachers={teachers}
              students={students}
              onView={(c) => setViewingCourse(c)}
              onEdit={handleOpenEdit}
              onDelete={(c) => setDeletingCourse(c)}
            />

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between pt-2 text-xs text-[#858ba0]">
                <span>
                  Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                  {Math.min(currentPage * itemsPerPage, filteredCourses.length)}{" "}
                  of {filteredCourses.length} courses
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
        <CourseFormModal
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSubmit={handleFormSubmit}
          course={editingCourse}
          availableTeachers={teachers}
        />

        {/* Details Modal */}
        <CourseDetailsModal
          isOpen={Boolean(viewingCourse)}
          onClose={() => setViewingCourse(null)}
          course={viewingCourse}
          teachers={teachers}
          students={students}
        />

        {/* Delete Confirmation Modal */}
        <ConfirmModal
          isOpen={Boolean(deletingCourse)}
          onClose={() => setDeletingCourse(null)}
          onConfirm={handleConfirmDelete}
          isLoading={isDeleting}
          title="Delete Course"
          message={`Are you sure you want to delete course "${deletingCourse?.title}"? This action cannot be undone.`}
          confirmText="Yes, Delete Course"
        />
      </div>
    </DashboardLayout>
  );
}
