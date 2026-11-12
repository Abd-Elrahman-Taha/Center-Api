import {apiClient} from "./apiClient";
import {ENDPOINTS} from "./endpoints";

const studentApi = {
    getAll: ()=> apiClient.get(ENDPOINTS.students.getAll),
    getById: (id:string) => apiClient.get(ENDPOINTS.students.getById(id)),
    create: (studentData: unknown) => apiClient.post(ENDPOINTS.students.create, {}, studentData),
    update: (id:string, studentData: unknown) => apiClient.patch(ENDPOINTS.students.update(id), {}, studentData),
    delete: (id:string) => apiClient.delete(ENDPOINTS.students.delete(id))
};
const teacherApi = {
    getAll: ()=> apiClient.get(ENDPOINTS.teachers.getAll),
    getById: (id:string) => apiClient.get(ENDPOINTS.teachers.getById(id)),
    create: (teacherData: unknown) => apiClient.post(ENDPOINTS.teachers.create, {}, teacherData),
    update: (id:string, teacherData: unknown) => apiClient.patch(ENDPOINTS.teachers.update(id), {}, teacherData),
    delete: (id:string) => apiClient.delete(ENDPOINTS.teachers.delete(id))
};
const courseApi = {
    getAll: ()=> apiClient.get(ENDPOINTS.courses.getAll),
    getById: (id:string) => apiClient.get(ENDPOINTS.courses.getById(id)),
    create: (courseData: unknown) => apiClient.post(ENDPOINTS.courses.create, {}, courseData),
    update: (id:string, courseData: unknown) => apiClient.patch(ENDPOINTS.courses.update(id), {}, courseData),
    delete: (id:string) => apiClient.delete(ENDPOINTS.courses.delete(id))
};

export const api = {
    students: studentApi,
    teachers: teacherApi,
    courses: courseApi
}