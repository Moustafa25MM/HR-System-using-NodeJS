import { Request, Response } from 'express';
import { attendanceControllers } from '../controllers/attendance';

enum AttendanceStatus {
  ABSENT = 'absent',
  PRESENT = 'present',
  LATE = 'late',
}

const createAttendance = async (req: Request, res: Response) => {
  const { employeeId, date, status } = req.body;

  try {
    const attendance = await attendanceControllers.createAttendance(
      employeeId,
      date,
      status
    );

    return res.status(201).json(attendance);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const attendanceMiddlewares = {
  createAttendance,
};
