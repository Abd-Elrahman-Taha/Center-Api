/**
 * Student Service
 * Encapsulates all CRUD operations for the Student resource, communicating
 * through the centralized apiClient and endpoints.
 */

import { apiClient } from "../api/apiClient";
import { ENDPOINTS } from "../api/endpoints";
import type {
  Student,
  CreateStudentData,
  UpdateStudentData,
} from "../types/students.types";

export const studentService = {
  /**
   * Fetches all students from the REST API.
   */
  async getAll(): Promise<Student[]> {
    return apiClient.get<Student[]>(ENDPOINTS.students.getAll);
  },

  /**
   * Fetches a single student by their unique ID.
   */
  async getById(id: string): Promise<Student> {
    return apiClient.get<Student>(ENDPOINTS.students.getById(id));
  },

  /**
   * Creates a new student record.
   * JSON Server assigns a unique string ID automatically.
   */
  async create(data: CreateStudentData): Promise<Student> {
    return apiClient.post<Student>(ENDPOINTS.students.create, {}, data);
  },

  /**
   * Partially updates an existing student's data using PATCH.
   */
  async update(id: string, data: UpdateStudentData): Promise<Student> {
    return apiClient.patch<Student>(ENDPOINTS.students.update(id), {}, data);
  },

  /**
   * Deletes a student by ID.
   */
  async delete(id: string): Promise<void> {
    return apiClient.delete<void>(ENDPOINTS.students.delete(id));
  },
};
