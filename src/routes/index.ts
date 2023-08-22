import { Router } from 'express';
import { employeeMiddelwares } from '../middlewares/employee';
import { loginMethods } from '../middlewares/login';

const router = Router();

router.post('/create', employeeMiddelwares.createEmployee);
router.use('/login', loginMethods.employeeLogin);

export const indexRouter: Router = router;
