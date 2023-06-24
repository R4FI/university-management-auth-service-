import express from 'express';
import userController from './user.controller';
import validateRequest from '../../middlewires/validateReuest';
import { UserValidation } from './user.validation';

const router = express.Router();

router.post(
  '/create-student',
  validateRequest(UserValidation.createStudentZodSchema),
  userController.createStudent
);

export const UserRoutes = router;
