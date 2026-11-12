/**
 * Teacher Entity Types
 * Defines the contract for Teacher data received from and sent to the API.
 */

export interface Teacher {
  id: string;
  name: string;
  email: string;
  specialization: string;
}

/**
 * Payload used when creating a new teacher.
 * The 'id' is generated automatically by JSON Server.
 */
export type CreateTeacherData = Omit<Teacher, "id">;

/**
 * Payload used when updating an existing teacher.
 * All fields are optional since updates can be partial.
 */
export type UpdateTeacherData = Partial<CreateTeacherData>;
