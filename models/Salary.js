import mongoose, { Schema } from "mongoose";

const SalarySchema = new mongoose.Schema({
  employeeId: { type: Schema.Types.ObjectId, ref: "Employee", required: true },
  basicSalary: { type: Number, required: true },
  allowances: { type: Number },
  deductions: { type: Number },
  netSalary: { type: Number, required: true },
  payDate: { type: String, required: true, match: /^\d{1,2}\/\d{1,2}\/\d{4}$/ },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});

export const Salary = mongoose.model("Salary", SalarySchema);
