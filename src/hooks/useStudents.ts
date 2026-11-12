/**
 * useStudents Hook
 * Custom React hook encapsulating state management and CRUD operations for Students.
 *
 * Concepts demonstrated:
 * - Clean async state machine (loading, data, error)
 * - Safe state updates with unmount cleanup (ignore flag)
 * - useCallback for stable function references across re-renders
 */

import { useState, useEffect, useCallback } from "react";
import { studentService } from "../services/students.service";
import type {
  Student,
  CreateStudentData,
  UpdateStudentData,
} from "../types/students.types";

export interface UseStudentsReturn {
  students: Student[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  createStudent: (data: CreateStudentData) => Promise<Student>;
  updateStudent: (id: string, data: UpdateStudentData) => Promise<Student>;
  deleteStudent: (id: string) => Promise<void>;
  getStudentById: (id: string) => Student | undefined;
}

export function useStudents(autoFetch = true): UseStudentsReturn {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState<boolean>(autoFetch);
  const [error, setError] = useState<string | null>(null);

  /**
   * Refreshes the students list on demand.
   */
  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await studentService.getAll();
      setStudents(data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to load students";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch initial data on mount without synchronous setState calls
  useEffect(() => {
    if (!autoFetch) return;

    let isMounted = true;
    studentService
      .getAll()
      .then((data) => {
        if (isMounted) {
          setStudents(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(
            err instanceof Error ? err.message : "Failed to load students"
          );
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [autoFetch]);

  /**
   * Creates a student via the API and updates local state.
   */
  const createStudent = useCallback(
    async (data: CreateStudentData): Promise<Student> => {
      setError(null);
      try {
        const newStudent = await studentService.create(data);
        setStudents((prev) => [...prev, newStudent]);
        return newStudent;
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to create student";
        setError(message);
        throw err;
      }
    },
    []
  );

  /**
   * Updates an existing student and updates local state with the returned entity.
   */
  const updateStudent = useCallback(
    async (id: string, data: UpdateStudentData): Promise<Student> => {
      setError(null);
      try {
        const updated = await studentService.update(id, data);
        setStudents((prev) =>
          prev.map((s) => (s.id === id ? { ...s, ...updated } : s))
        );
        return updated;
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to update student";
        setError(message);
        throw err;
      }
    },
    []
  );

  /**
   * Deletes a student by ID and removes them from local state.
   */
  const deleteStudent = useCallback(
    async (id: string): Promise<void> => {
      setError(null);
      try {
        await studentService.delete(id);
        setStudents((prev) => prev.filter((s) => s.id !== id));
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to delete student";
        setError(message);
        throw err;
      }
    },
    []
  );

  /**
   * Synchronously look up a student from the local cache.
   */
  const getStudentById = useCallback(
    (id: string) => students.find((s) => s.id === id),
    [students]
  );

  return {
    students,
    loading,
    error,
    refresh,
    createStudent,
    updateStudent,
    deleteStudent,
    getStudentById,
  };
}
