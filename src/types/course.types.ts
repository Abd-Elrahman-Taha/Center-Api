/**
 * Course Entity Types
 * Defines the contract for Course data received from and sent to the API.
 */

import type { Teacher } from "./teacher.types";
import type { Student } from "./students.types";

export interface Course {
  id: string;
  title: string;
  description: string;
  teacherId: string;
  price: number;
  capacity: number;
}

/**
 * Payload used when creating a new course.
 * The 'id' is generated automatically by JSON Server.
 */
export type CreateCourseData = Omit<Course, "id">;

/**
 * Payload used when updating an existing course.
 * All fields are optional since updates can be partial.
 */
export type UpdateCourseData = Partial<CreateCourseData>;

/**
 * Extended Course interface with dynamically resolved relationships
 * for rich UI presentation (teacher details, enrolled student count & list).
 */
export interface CourseWithDetails extends Course {
  teacher?: Teacher;
  enrolledStudents?: Student[];
  enrolledStudentsCount?: number;
}
