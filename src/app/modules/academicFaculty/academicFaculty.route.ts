import express from 'express';

import { AcademicFacultyController } from './academicFaculty.controller';
import { AcademicFacultyValidation } from './academicFaculty.validations';
import validateRequest from '../../middlewires/validateReuest';

const router = express.Router();

router.post(
  '/create-academic-faculty',
  validateRequest(AcademicFacultyValidation.createFacultyZodSchema),
  AcademicFacultyController.createFaculty
);

router.get('/:id', AcademicFacultyController.getSingleFaculty);

router.patch(
  '/:id',
  validateRequest(AcademicFacultyValidation.updatefacultyZodSchema),
  AcademicFacultyController.updateFaculty
);

router.delete('/:id', AcademicFacultyController.deleteFaculty);

router.get('/', AcademicFacultyController.getAllFaculties);

export const AcademicFacultyRoutes = router;
