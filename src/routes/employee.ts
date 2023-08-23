import { Router } from 'express';

import { employeeMiddelwares } from '../middlewares/employee';
import { authMethods } from '../middlewares/auth';
import { validations } from '../middlewares/validations';

const router = Router();

router.post(
  '/create',
  authMethods.isHRAuthorized,
  validations.checkEmail,
  validations.checkName,
  validations.checkPassowrd,
  employeeMiddelwares.createEmployee
);
router.get(
  '/all',
  authMethods.isHRAuthorized,
  employeeMiddelwares.getAllEmployeesByGroup
);
router.get(
  '/emp/:id',
  authMethods.isHRAuthorized,
  employeeMiddelwares.getEmployeeById
);
router.patch(
  '/profile/:id',
  authMethods.isHRAuthorized,
  employeeMiddelwares.updateEmployeeFunc
);

export const employeeRoute: Router = router;
