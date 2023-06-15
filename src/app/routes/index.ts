import express from 'express';
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.route';
import { UserRoutes } from '../modules/users/user.route';
import { AcademicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.route';
import { AcademicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.routes';
import { StudentRoutes } from '../modules/student/student.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes
  },
  {
    path: '/academic-semester',
    route: AcademicSemesterRoutes
  },
  {
    path: '/create-faculty',
    route: AcademicFacultyRoutes
  },
  {
    path: '/academic-department',
    route: AcademicDepartmentRoutes
  },
  {
    path: '/students',
    route: StudentRoutes
  }
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
