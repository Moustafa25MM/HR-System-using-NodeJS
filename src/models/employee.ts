import mongoose, { Schema, Document } from 'mongoose';

enum EmployeeGroup {
  HR = 'HR',
  NORMAL_EMPLOYEE = 'Normal Employee',
}

interface IEmployee extends Document {
  name: string;
  email: string;
  password: string;
  group: EmployeeGroup;
}

const EmployeeSchema: Schema = new Schema<IEmployee>(
  {
    name: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 50,
    },
    password: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 1024,
    },
    email: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 255,
      unique: true,
    },
    group: {
      type: String,
      required: true,
      enum: Object.values(EmployeeGroup),
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
      },
    },
  }
);

const Employee = mongoose.model('employee', EmployeeSchema);
export default Employee;
