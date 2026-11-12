/**
 * Course Service
 * Encapsulates all CRUD operations for the Course resource, communicating
 * through the centralized apiClient and endpoints.
 */

import { apiClient } from "../api/apiClient";
import { ENDPOINTS } from "../api/endpoints";
import type {
  Course,
  CreateCourseData,
  UpdateCourseData,
} from "../types/course.types";

export const courseService = {
  /**
   * Fetches all courses from the REST API.
   */
  async getAll(): Promise<Course[]> {
    return apiClient.get<Course[]>(ENDPOINTS.courses.getAll);
  },

  /**
   * Fetches a single course by its unique ID.
   */
  async getById(id: string): Promise<Course> {
    return apiClient.get<Course>(ENDPOINTS.courses.getById(id));
  },

  /**
   * Creates a new course record.
   * JSON Server assigns a unique string ID automatically.
   */
  async create(data: CreateCourseData): Promise<Course> {
    return apiClient.post<Course>(ENDPOINTS.courses.create, {}, data);
  },

  /**
   * Partially updates an existing course's data using PATCH.
   */
  async update(id: string, data: UpdateCourseData): Promise<Course> {
    return apiClient.patch<Course>(ENDPOINTS.courses.update(id), {}, data);
  },

  /**
   * Deletes a course by ID.
   */
  async delete(id: string): Promise<void> {
    return apiClient.delete<void>(ENDPOINTS.courses.delete(id));
  },
};
