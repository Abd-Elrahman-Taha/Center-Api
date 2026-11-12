/**
 * useTeachers Hook
 * Custom React hook encapsulating state management and CRUD operations for Teachers.
 */

import { useState, useEffect, useCallback } from "react";
import { teacherService } from "../services/teacher.service";
import type {
  Teacher,
  CreateTeacherData,
  UpdateTeacherData,
} from "../types/teacher.types";

export interface UseTeachersReturn {
  teachers: Teacher[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  createTeacher: (data: CreateTeacherData) => Promise<Teacher>;
  updateTeacher: (id: string, data: UpdateTeacherData) => Promise<Teacher>;
  deleteTeacher: (id: string) => Promise<void>;
  getTeacherById: (id: string) => Teacher | undefined;
}

export function useTeachers(autoFetch = true): UseTeachersReturn {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState<boolean>(autoFetch);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetches the complete list of teachers from the service.
   */
  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await teacherService.getAll();
      setTeachers(data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to load teachers";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (autoFetch) {
      refresh();
    }
  }, [autoFetch, refresh]);

  /**
   * Creates a teacher via the API and updates local state.
   */
  const createTeacher = useCallback(
    async (data: CreateTeacherData): Promise<Teacher> => {
      setError(null);
      try {
        const newTeacher = await teacherService.create(data);
        setTeachers((prev) => [...prev, newTeacher]);
        return newTeacher;
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to create teacher";
        setError(message);
        throw err;
      }
    },
    []
  );

  /**
   * Updates an existing teacher and updates local state with the returned entity.
   */
  const updateTeacher = useCallback(
    async (id: string, data: UpdateTeacherData): Promise<Teacher> => {
      setError(null);
      try {
        const updated = await teacherService.update(id, data);
        setTeachers((prev) =>
          prev.map((t) => (t.id === id ? { ...t, ...updated } : t))
        );
        return updated;
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to update teacher";
        setError(message);
        throw err;
      }
    },
    []
  );

  /**
   * Deletes a teacher by ID and removes them from local state.
   */
  const deleteTeacher = useCallback(
    async (id: string): Promise<void> => {
      setError(null);
      try {
        await teacherService.delete(id);
        setTeachers((prev) => prev.filter((t) => t.id !== id));
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to delete teacher";
        setError(message);
        throw err;
      }
    },
    []
  );

  /**
   * Synchronously look up a teacher by ID from local cache.
   */
  const getTeacherById = useCallback(
    (id: string) => teachers.find((t) => t.id === id),
    [teachers]
  );

  return {
    teachers,
    loading,
    error,
    refresh,
    createTeacher,
    updateTeacher,
    deleteTeacher,
    getTeacherById,
  };
}
