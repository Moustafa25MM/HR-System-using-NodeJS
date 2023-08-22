import { Router } from 'express';

import { authMethods } from '../middlewares/auth';
import { attendanceMiddlewares } from '../middlewares/attendance';

const router = Router();

router.post(
  '/create',
  authMethods.isHRAuthorized,
  attendanceMiddlewares.createAttendance
);

router.get(
  '/find/:id',
  authMethods.isHRAuthorized,
  attendanceMiddlewares.getAttendanceById
);
router.get(
  '/employee/:id',
  authMethods.isHRAuthorized,
  attendanceMiddlewares.getAttendanceByEmployee
);

router.patch(
  '/update/:id',
  authMethods.isHRAuthorized,
  attendanceMiddlewares.updateAttendance
);

export const attendanceRoute: Router = router;
