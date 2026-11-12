/**
 * useCourses Hook
 * Custom React hook encapsulating state management and CRUD operations for Courses.
 */

import { useState, useEffect, useCallback } from "react";
import { courseService } from "../services/course.service";
import type {
  Course,
  CreateCourseData,
  UpdateCourseData,
} from "../types/course.types";

export interface UseCoursesReturn {
  courses: Course[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  createCourse: (data: CreateCourseData) => Promise<Course>;
  updateCourse: (id: string, data: UpdateCourseData) => Promise<Course>;
  deleteCourse: (id: string) => Promise<void>;
  getCourseById: (id: string) => Course | undefined;
}

export function useCourses(autoFetch = true): UseCoursesReturn {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(autoFetch);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetches the complete list of courses from the service.
   */
  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await courseService.getAll();
      setCourses(data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to load courses";
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
   * Creates a course via the API and updates local state.
   */
  const createCourse = useCallback(
    async (data: CreateCourseData): Promise<Course> => {
      setError(null);
      try {
        const newCourse = await courseService.create(data);
        setCourses((prev) => [...prev, newCourse]);
        return newCourse;
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to create course";
        setError(message);
        throw err;
      }
    },
    []
  );

  /**
   * Updates an existing course and updates local state with the returned entity.
   */
  const updateCourse = useCallback(
    async (id: string, data: UpdateCourseData): Promise<Course> => {
      setError(null);
      try {
        const updated = await courseService.update(id, data);
        setCourses((prev) =>
          prev.map((c) => (c.id === id ? { ...c, ...updated } : c))
        );
        return updated;
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to update course";
        setError(message);
        throw err;
      }
    },
    []
  );

  /**
   * Deletes a course by ID and removes it from local state.
   */
  const deleteCourse = useCallback(
    async (id: string): Promise<void> => {
      setError(null);
      try {
        await courseService.delete(id);
        setCourses((prev) => prev.filter((c) => c.id !== id));
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to delete course";
        setError(message);
        throw err;
      }
    },
    []
  );

  /**
   * Synchronously look up a course by ID from local cache.
   */
  const getCourseById = useCallback(
    (id: string) => courses.find((c) => c.id === id),
    [courses]
  );

  return {
    courses,
    loading,
    error,
    refresh,
    createCourse,
    updateCourse,
    deleteCourse,
    getCourseById,
  };
}
