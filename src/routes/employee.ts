import { Router } from 'express';

import { employeeControllers } from '../controllers/employee';
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
  '',
  authMethods.isHRAuthorized,
  employeeMiddelwares.getAllEmployeesByGroup
);
router.patch(
  '/profile/:id',
  authMethods.isHRAuthorized,
  validations.checkEmail,
  validations.checkName,
  validations.checkPassowrd,
  employeeMiddelwares.updateEmployeeFunc
);

export const employeeRoute: Router = router;
