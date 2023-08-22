import { Router } from 'express';
import { employeeMiddelwares } from '../middlewares/employee';
import { loginMethods } from '../middlewares/login';
import { employeeRoute } from './employee';

const router = Router();

router.post('/create', employeeMiddelwares.createEmployee);
router.use('/login', loginMethods.employeeLogin);

router.use('/employees', employeeRoute);
export const indexRouter: Router = router;
