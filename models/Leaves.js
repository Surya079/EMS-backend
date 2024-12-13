import mongoose, { Schema } from "mongoose";

const leaveSchema = new mongoose.Schema({
  emp_Id: {
    type: Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  leaveType: {
    type: String,
    enum: ["Sick Leave", "Casual Leave", "Medical Leave"],
    required: true,
  },
  startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
    required: true,
  },
  comments: { type: String, required: true },
  appliedAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Leave = mongoose.model("Leave", leaveSchema);
