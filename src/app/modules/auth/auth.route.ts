import express from 'express';
import validateRequest from '../../middlewires/validateReuest';
import { AuthValidation } from './auth.validation';
import { authController } from './auth.controller';

const router = express.Router();

router.post(
  '/login',
  validateRequest(AuthValidation.loginZodSchema),
  authController.loginUser
);

export const AuthRoutes = router;
