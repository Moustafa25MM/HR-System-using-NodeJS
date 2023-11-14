import mongoose, { Schema, Document } from 'mongoose';

enum EmployeeGroup {
  HR = 'HR',
  NORMAL_EMPLOYEE = 'Normal Employee',
}
enum Task {
  SOFTWARE = 'Software',
  BACKEND = 'Backend',
  FRONTEND = 'Frontend',
  DEVOPS = 'Devops',
}

interface IEmployee extends Document {
  name: string;
  email: string;
  password: string;
  group: EmployeeGroup;
  netSalary: number;
  grossSalary: number;
  task: Task;
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
    netSalary: {
      type: Number,
      min: 0,
    },
    grossSalary: {
      type: Number,
      min: 0,
    },
    task: {
      type: String,
      enum: Object.values(Task),
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
