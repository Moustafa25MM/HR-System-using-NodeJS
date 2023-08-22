import { Router } from 'express';
import { loginMethods } from '../middlewares/login';
import { employeeRoute } from './employee';

const router = Router();

router.use('/login', loginMethods.employeeLogin);

router.use('/employees', employeeRoute);
export const indexRouter: Router = router;
