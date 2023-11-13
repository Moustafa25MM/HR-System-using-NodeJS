import mongoose, { Schema, Document } from 'mongoose';

enum AttendanceStatus {
  ABSENT = 'absent',
  PRESENT = 'present',
  LATE = 'late',
}

interface IAttendance extends Document {
  employee: mongoose.Types.ObjectId;
  date: Date;
  status: AttendanceStatus;
  signInTime: Date;
}

const AttendanceSchema: Schema = new Schema<IAttendance>(
  {
    employee: {
      type: Schema.Types.ObjectId,
      ref: 'Employee',
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: Object.values(AttendanceStatus),
    },
    signInTime: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Attendance = mongoose.model('attendance', AttendanceSchema);
export default Attendance;
