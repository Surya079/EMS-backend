import { User } from "../models/User.js";
import { Leave } from "../models/Leaves.js";
import { Employee } from "../models/Employee.js";

export const addLeave = async (req, res) => {
  try {
    const { userId, startDate, leaveType, endDate, comments } = req.body;

    const employee = await Employee.findOne({ userId: userId });

    if (!employee) {
      return res
        .status(404)
        .json({ success: false, message: "Employee not found" });
    }
    const newLeave = new Leave({
      emp_Id: employee._id,
      leaveType: leaveType,
      startDate: startDate,
      endDate: endDate,
      comments: comments,
    });

    await newLeave.save();

    return res.status(200).json({ success: true, newLeave });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error while requesting Leave",
    });
  }
};
export const getLeave = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findOne({ userId: id });
    const leaves = await Leave.find({ emp_Id: employee._id });
    return res.status(200).json({ success: true, leaves });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error while getting employee Leave",
    });
  }
};
export const getEmpLeave = async (req, res) => {
  try {
    const { id } = req.params;
    // const employee = await Employee.findOne({ _id: id });
    const leaves = await Leave.find({ emp_Id: id });
    return res.status(200).json({ success: true, leaves });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error while getting employee Leave",
    });
  }
};
export const getLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find().populate({
      path: "emp_Id",
      select: "employeeId",
      populate: [
        { path: "department", select: "dep_name" },
        { path: "userId", select: "name" },
      ],
    });

    return res.status(200).json({ success: true, leaves });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error while getting leaves details",
    });
  }
};

export const getViewdetailsLeave = async (req, res) => {
  try {
    const { id } = req.params;
    const leave = await Leave.findById(id).populate({
      path: "emp_Id",
      populate: [{ path: "department" }, { path: "userId" }],
    });

    if (!leave) {
      return res
        .status(404)
        .json({ success: false, message: "Leaves request not found" });
    }

    return res.status(200).json({ success: true, leave });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error while view leave details ",
    });
  }
};

export const getActionsLeave = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const leave = await Leave.findByIdAndUpdate(
      { _id: id },
      {
        status: status,
      }
    );

    if (!leave) {
      return res
        .status(404)
        .json({ success: false, message: "Leaves request not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: `Leave has been ${status}` });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error while Invlolve leave  actions",
    });
  }
};
