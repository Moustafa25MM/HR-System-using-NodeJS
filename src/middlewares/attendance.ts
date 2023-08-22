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

const updateAttendance = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { date, status } = req.body;

  try {
    const data: Partial<{ date: Date; status: AttendanceStatus }> = {};

    if (date) {
      data.date = date;
    }

    if (status) {
      data.status = status as AttendanceStatus;
    }

    const updatedAttendance = await attendanceControllers.updateAttendance(
      id,
      data
    );

    if (!updatedAttendance) {
      throw new Error('Failed to update attendance');
    }

    return res.status(200).json(updatedAttendance);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const attendanceMiddlewares = {
  createAttendance,
  updateAttendance,
};
