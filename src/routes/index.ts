import { Router } from 'express';
import { employeeMiddelwares } from '../middlewares/employee';

const router = Router();

router.post('/create', employeeMiddelwares.createEmployee);

export const indexRouter: Router = router;
