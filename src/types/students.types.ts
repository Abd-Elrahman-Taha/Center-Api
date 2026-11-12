/**
 * Student Entity Types
 * Defines the contract for Student data received from and sent to the API.
 */

import type { Course } from "./course.types";

export interface Student {
  id: string;
  name: string;
  email: string;
  age: number;
  enrolledCourses: string[];
}

/**
 * Payload used when creating a new student.
 * The 'id' is generated automatically by JSON Server.
 */
export type CreateStudentData = Omit<Student, "id">;

/**
 * Payload used when updating an existing student.
 * All fields are optional since updates can be partial.
 */
export type UpdateStudentData = Partial<CreateStudentData>;

/**
 * Extended Student interface with dynamically resolved course objects
 * for display in tables and detail dialogs.
 */
export interface StudentWithCourses extends Student {
  courses?: Course[];
}
