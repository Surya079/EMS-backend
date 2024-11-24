import { Leave } from "../models/Leaves.js";

export const addLeave = async (req, res) => {
  try {
    const { userId, startDate, leaveType, endDate, comments } = req.body;
    console.log(userId, startDate, leaveType, endDate, comments);

    const newLeave = new Leave({
      employeeId: userId,
      leaveType: leaveType,
      startDate: startDate,
      endDate: endDate,
      comments: comments,
    });
    console.log(newLeave);

    await newLeave.save();

    res.status(200).json({ success: true, newLeave });
  } catch (error) {
    console.log("server error , requesting leave", error.message);
    res.status(500).json({
      success: false,
      message: "Server error while requesting Leave",
    });
  }
};
export const getLeave = async (req, res) => {};
export const getLeaves = async (req, res) => {};
