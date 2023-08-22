import { Router } from 'express';

import { authMethods } from '../middlewares/auth';
import { attendanceMiddlewares } from '../middlewares/attendance';

const router = Router();

router.post(
  '/create',
  authMethods.isHRAuthorized,
  attendanceMiddlewares.createAttendance
);

export const attendanceRoute: Router = router;
