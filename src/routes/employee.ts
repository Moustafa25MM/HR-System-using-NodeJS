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
  employeeMiddelwares.createEmployee
);
router.patch(
  '/profile/:id',
  authMethods.isHRAuthorized,
  employeeMiddelwares.updateEmployeeFunc
);

export const employeeRoute: Router = router;
