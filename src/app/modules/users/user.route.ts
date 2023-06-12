import express from 'express';
import userController from './user.controller';
import validateRequest from '../../middlewires/validateReuest';
import { UserValidation } from './user.validation';

const router = express.Router();

router.post(
  '/create-user',
  validateRequest(UserValidation.createUserZodSchema),
  userController.createUser
);

export const UserRoutes = router;
