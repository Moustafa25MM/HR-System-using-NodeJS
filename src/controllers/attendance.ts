import { models } from '../models';

enum AttendanceStatus {
  ABSENT = 'absent',
  PRESENT = 'present',
  LATE = 'late',
}

const createAttendance = (
  employeeId: string,
  date: Date,
  status: AttendanceStatus,
  signInTime: Date
) => {
  return models.Attendance.create({
    employee: employeeId,
    date,
    status,
    signInTime,
  });
};

const updateAttendance = (
  attendanceId: string,
  data: Partial<{ date: Date; status: AttendanceStatus; signInTime: String }>
) => {
  return models.Attendance.findByIdAndUpdate(attendanceId, data, { new: true });
};

const getAttendanceById = (attendanceId: string) => {
  return models.Attendance.findById(attendanceId);
};

const getAttendanceByEmployee = (employeeId: string) => {
  return models.Attendance.find({ employee: employeeId });
};

const deleteAttendance = (attendanceId: string) => {
  return models.Attendance.findByIdAndDelete(attendanceId);
};

export const attendanceControllers = {
  createAttendance,
  updateAttendance,
  getAttendanceById,
  getAttendanceByEmployee,
  deleteAttendance,
};
