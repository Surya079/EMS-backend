import mongoose, { Schema } from "mongoose";

const employeSchema = new mongoose.Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  employeeId: { type: String, required: true, unique: true },
  gender: { type: String },
  // this line will validate the date of birth field
  // it should be in the format of mm/dd/yyyy
  // the regex pattern is ^\d{1,2}\/\d{1,2}\/\d{4}$
  // it will check if the date is valid or not
  dob: { type: String, required: true, match: /^\d{1,2}\/\d{1,2}\/\d{4}$/ },
  maritalStatus: { type: String },
  designation: { type: String, required: true },
  department: {
    type: Schema.Types.ObjectId,
    ref: "Department",
    required: true,
  },
  salary: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now() },
  UpdatedAt: { type: Date, default: Date.now() },
});
export const Employee = mongoose.model("Employee", employeSchema);
