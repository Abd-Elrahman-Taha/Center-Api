/**
 * StudentsPage Component
 * Full CRUD management view for Students.
 * Features:
 * - Search & Course Filter
 * - Create, Edit, View Details, and Delete Modals
 * - Pagination
 * - Synchronous state updates matching JSON Server operations
 */

import { useState, useMemo } from "react";
import { Users, Filter } from "lucide-react";
import DashboardLayout from "../components/layout/DashboardLayout";
import PageHeader from "../components/common/PageHeader";
import SearchBar from "../components/common/SearchBar";
import LoadingSpinner from "../components/common/LoadingSpinner";
import EmptyState from "../components/common/EmptyState";
import ConfirmModal from "../components/common/ConfirmModal";
import StudentTable from "../components/students/StudentTable";
import StudentFormModal from "../components/students/StudentFormModal";
import StudentDetailsModal from "../components/students/StudentDetailsModal";
import { useStudents } from "../hooks/useStudents";
import { useCourses } from "../hooks/useCourses";
import type { Student, CreateStudentData } from "../types/students.types";

export default function StudentsPage() {
  // Data hooks
  const {
    students,
    loading: studentsLoading,
    error: studentsError,
    createStudent,
    updateStudent,
    deleteStudent,
  } = useStudents();

  const { courses, loading: coursesLoading } = useCourses();

  // Filter & Search states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourseFilter, setSelectedCourseFilter] = useState<string>("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Modal states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [viewingStudent, setViewingStudent] = useState<Student | null>(null);
  const [deletingStudent, setDeletingStudent] = useState<Student | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Success toast state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Filtered & searched students
  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchesSearch =
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCourse =
        selectedCourseFilter === "ALL" ||
        student.enrolledCourses?.includes(selectedCourseFilter);

      return matchesSearch && matchesCourse;
    });
  }, [students, searchTerm, selectedCourseFilter]);

  // Paginated students slice
  const paginatedStudents = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredStudents.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredStudents, currentPage]);

  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage) || 1;

  // Handlers
  const handleOpenCreate = () => {
    setEditingStudent(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (student: Student) => {
    setEditingStudent(student);
    setIsFormOpen(true);
  };

  const handleFormSubmit = async (data: CreateStudentData) => {
    if (editingStudent) {
      await updateStudent(editingStudent.id, data);
      showToast(`Updated student "${data.name}" successfully!`);
    } else {
      await createStudent(data);
      showToast(`Created student "${data.name}" successfully!`);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deletingStudent) return;
    setIsDeleting(true);
    try {
      await deleteStudent(deletingStudent.id);
      showToast(`Deleted student "${deletingStudent.name}".`);
      setDeletingStudent(null);
    } catch {
      // error handled by hook
    } finally {
      setIsDeleting(false);
    }
  };

  const isLoading = studentsLoading || coursesLoading;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Toast Notification */}
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
        {studentsError && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-300 rounded-xl text-sm">
            {studentsError}
          </div>
        )}

        {/* Header */}
        <PageHeader
          title="Students"
          subtitle="Manage enrolled students, registrations, and courses."
          icon={Users}
          count={students.length}
          actionLabel="Add Student"
          onAction={handleOpenCreate}
        />

        {/* Controls Bar: Search & Filter */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <SearchBar
            value={searchTerm}
            onChange={(val) => {
              setSearchTerm(val);
              setCurrentPage(1);
            }}
            placeholder="Search by student name or email..."
          />

          <div className="flex items-center gap-2">
            <Filter size={16} className="text-[#d4af37]/75" />
            <select
              value={selectedCourseFilter}
              onChange={(e) => {
                setSelectedCourseFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="px-3.5 py-2.5 text-xs bg-[#0d101b] border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#d4af37]/60 cursor-pointer"
            >
              <option value="ALL">All Courses</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Content Section */}
        {isLoading ? (
          <LoadingSpinner message="Fetching students from server..." />
        ) : filteredStudents.length === 0 ? (
          <EmptyState
            icon={Users}
            title={
              searchTerm || selectedCourseFilter !== "ALL"
                ? "No matching students"
                : "No students registered yet"
            }
            description={
              searchTerm || selectedCourseFilter !== "ALL"
                ? "Try adjusting your search terms or clearing course filters."
                : "Get started by registering your first student into EduSpace."
            }
            actionLabel={
              searchTerm || selectedCourseFilter !== "ALL"
                ? "Clear Filters"
                : "Add Student"
            }
            onAction={
              searchTerm || selectedCourseFilter !== "ALL"
                ? () => {
                    setSearchTerm("");
                    setSelectedCourseFilter("ALL");
                  }
                : handleOpenCreate
            }
          />
        ) : (
          <div className="space-y-4">
            <StudentTable
              students={paginatedStudents}
              courses={courses}
              onView={(s) => setViewingStudent(s)}
              onEdit={handleOpenEdit}
              onDelete={(s) => setDeletingStudent(s)}
            />

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between pt-2 text-xs text-[#858ba0]">
                <span>
                  Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                  {Math.min(currentPage * itemsPerPage, filteredStudents.length)}{" "}
                  of {filteredStudents.length} students
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
        <StudentFormModal
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSubmit={handleFormSubmit}
          student={editingStudent}
          availableCourses={courses}
        />

        {/* View Details Modal */}
        <StudentDetailsModal
          isOpen={Boolean(viewingStudent)}
          onClose={() => setViewingStudent(null)}
          student={viewingStudent}
          courses={courses}
        />

        {/* Delete Confirmation Modal */}
        <ConfirmModal
          isOpen={Boolean(deletingStudent)}
          onClose={() => setDeletingStudent(null)}
          onConfirm={handleConfirmDelete}
          isLoading={isDeleting}
          title="Delete Student"
          message={`Are you sure you want to delete student "${deletingStudent?.name}"? This action cannot be undone.`}
          confirmText="Yes, Delete Student"
        />
      </div>
    </DashboardLayout>
  );
}
