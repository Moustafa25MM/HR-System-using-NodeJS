import { Router } from 'express';

import { employeeControllers } from '../controllers/employee';
import { employeeMiddelwares } from '../middlewares/employee';

const router = Router();

router.patch('/profile/:id', employeeMiddelwares.updateEmployeeFunc);

export const employeeRoute: Router = router;
