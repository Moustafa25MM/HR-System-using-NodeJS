import { Router } from 'express';
import { loginMethods } from '../middlewares/login';
import { employeeRoute } from './employee';
import { attendanceRoute } from './attendance';
import { authMethods } from '../middlewares/auth';

const router = Router();

router.use('/login', loginMethods.employeeLogin);
router.use('/logout', authMethods.isHRAuthorized, loginMethods.employeeLogout);

router.use('/employees', employeeRoute);
router.use('/attendance', attendanceRoute);

export const indexRouter: Router = router;
