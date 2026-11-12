/**
 * Teacher Service
 * Encapsulates all CRUD operations for the Teacher resource, communicating
 * through the centralized apiClient and endpoints.
 */

import { apiClient } from "../api/apiClient";
import { ENDPOINTS } from "../api/endpoints";
import type {
  Teacher,
  CreateTeacherData,
  UpdateTeacherData,
} from "../types/teacher.types";

export const teacherService = {
  /**
   * Fetches all teachers from the REST API.
   */
  async getAll(): Promise<Teacher[]> {
    return apiClient.get<Teacher[]>(ENDPOINTS.teachers.getAll);
  },

  /**
   * Fetches a single teacher by their unique ID.
   */
  async getById(id: string): Promise<Teacher> {
    return apiClient.get<Teacher>(ENDPOINTS.teachers.getById(id));
  },

  /**
   * Creates a new teacher record.
   * JSON Server assigns a unique string ID automatically.
   */
  async create(data: CreateTeacherData): Promise<Teacher> {
    return apiClient.post<Teacher>(ENDPOINTS.teachers.create, {}, data);
  },

  /**
   * Partially updates an existing teacher's data using PATCH.
   */
  async update(id: string, data: UpdateTeacherData): Promise<Teacher> {
    return apiClient.patch<Teacher>(ENDPOINTS.teachers.update(id), {}, data);
  },

  /**
   * Deletes a teacher by ID.
   */
  async delete(id: string): Promise<void> {
    return apiClient.delete<void>(ENDPOINTS.teachers.delete(id));
  },
};
