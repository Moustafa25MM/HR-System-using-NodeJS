import { Request, Response } from 'express';
import { attendanceControllers } from '../controllers/attendance';
import { paginationOption } from '../libs/paginations';

enum AttendanceStatus {
  ABSENT = 'absent',
  PRESENT = 'present',
  LATE = 'late',
}

const createAttendance = async (req: Request, res: Response) => {
  const { employeeId, date, status, signInTime } = req.body;

  try {
    const attendance = await attendanceControllers.createAttendance(
      employeeId,
      date,
      status,
      signInTime
    );

    return res.status(201).json(attendance);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

const updateAttendance = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { date, status, signInTime } = req.body;

  try {
    const data: Partial<{
      date: Date;
      status: AttendanceStatus;
      signInTime: String;
    }> = {};

    if (date) {
      data.date = date;
    }

    if (status) {
      data.status = status as AttendanceStatus;
    }
    if (signInTime) {
      data.signInTime = signInTime;
      console.log(signInTime);
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
const getAttendanceById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const attendance = await attendanceControllers.getAttendanceById(id);

    if (!attendance) {
      throw new Error('Attendance not found');
    }

    return res.status(200).json(attendance);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

const getAttendanceByEmployee = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const attendance = await attendanceControllers.getAttendanceByEmployee(id);

    const pageSize = req.query.pageSize
      ? parseInt(req.query.pageSize as string)
      : 8;
    const pageNumber = req.query.pageNumber
      ? parseInt(req.query.pageNumber as string)
      : 1;
    const paginatedAttendances = attendance.slice(
      (pageNumber - 1) * pageSize,
      pageNumber * pageSize
    );

    const totalDocs = attendance.length;
    const paginationOptions = paginationOption(pageSize, pageNumber, totalDocs);

    return res.status(200).json({
      pagination: paginationOptions,
      attendance: paginatedAttendances,
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
const deleteAttendance = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedAttendance = await attendanceControllers.deleteAttendance(id);

    if (!deletedAttendance) {
      throw new Error('No attendance found to delete');
    }

    return res.status(200).json({ message: 'Attendance deleted successfully' });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const attendanceMiddlewares = {
  createAttendance,
  updateAttendance,
  getAttendanceById,
  getAttendanceByEmployee,
  deleteAttendance,
};
