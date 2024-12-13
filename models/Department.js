import mongoose from "mongoose";
import { Employee } from "./Employee.js";
import { Leave } from "./Leaves.js";
import { Salary } from "./Salary.js";

const departmentSchema = new mongoose.Schema({
  dep_name: { type: String, required: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});

// Cascading delete
departmentSchema.pre(
  "deleteOne",
  {
    document: true,
    query: false,
  },
  async function (next) {
    try {
      // Find all employees which are associated with the department being deleted
      const employees = await Employee.find({ department: this._id });

      // Get the ids of all those employees
      const empIds = employees.map((emp) => emp._id);

      // Delete all leave records of those employees
      await Leave.deleteMany({ emp_Id: { $in: empIds } });

      // Delete all salary records of those employees
      await Salary.deleteMany({ employeeId: { $in: empIds } });

      // Delete all employees which are associated with the department being deleted
      await Employee.deleteMany({ department: this._id });

      // Call the next middleware function to continue the deletion process
      next();
    } catch (error) {
      // If an error occurs, call the next middleware function with the error
      next(error);
    }
  }
);

export const Department = mongoose.model("Department", departmentSchema);
