import bycrpt from "bcrypt";
import { User } from "../models/User.js";
import multer from "multer";
import path from "path";
import { Employee } from "../models/Employee.js";
import { Department } from "../models/Department.js";

// store the upload file server though multer
const Storage = multer.diskStorage({
  // where the image should save
  destination: (req, file, callback) => {
    callback(null, "public/uploads");
  },
  //   how the image should save Ex:(23232003.png)
  filename: (req, file, callback) => {
    callback(null, Date.now() + path.extname(file.originalname));
  },
});

// assign the multer
export const upload = multer({ storage: Storage });

export const addEmployee = async (req, res) => {
  // destructure the body formdata's
  try {
    const {
      name,
      email,
      employeeId,
      dob,
      gender,
      maritalStatus,
      designation,
      department,
      salary,
      password,
      role,
    } = req.body;

    const departmentName = await Department.findOne({ _id: department });
    if (!departmentName) {
      return res
        .status(400)
        .json({ success: false, error: "department invalid" });
    }

    // check user exist or not
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, error: "User already register in employee" });
    }

    //   hashing the password
    const hashPassword = await bycrpt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashPassword,
      role,
      profileImage: req.file ? req.file.filename : "",
    });

    const savedUser = await newUser.save();

    const newEmployee = new Employee({
      userId: savedUser._id,
      employeeId,
      gender,
      dob,
      maritalStatus,
      designation,
      department: departmentName._id,
      salary,
    });
    await newEmployee.save();
    return res.status(200).json({ success: true, message: "employee created" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "server error while adding employee" });
  }
};

export const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find()
      .populate("userId", "name profileImage")
      .populate("department", "dep_name");

    return res.status(200).json({ success: true, employees });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error While getting employees",
    });
  }
};

export const getEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    let employee;
    employee = await Employee.findById({ _id: id })
      .populate("userId", "name profileImage")
      .populate("department", "dep_name");
    if (!employee) {
      employee = await Employee.findOne({ userId: id })
        .populate("userId", "name profileImage")
        .populate("department", "dep_name");
    }
    res.status(200).json({ success: true, employee });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while getting employee details by id",
    });
  }
};

export const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { maritalStatus, designation, department, salary } = req.body;

    const isEmployee = await Employee.findById({ _id: id }); // check employee exist

    if (!isEmployee) {
      return res
        .status(404)
        .json({ success: false, message: "Employee not found" });
    }
    const departmentName = await Department.findOne({ dep_name: department }); // check department exist

    if (!departmentName) {
      return res
        .status(404)
        .json({ success: false, message: "Department not found" });
    }

    // Update employee
    const employee = await Employee.findByIdAndUpdate(
      { _id: id },
      {
        maritalStatus,
        designation,
        department: departmentName._id,
        salary,
      }
    );

    return res.status(200).json({ success: true, employee });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error while updating employee",
    });
  }
};

export const fetchEmployeeDepId = async (req, res) => {
  try {
    const { id } = req.params;
    const employees = await Employee.find({ department: id }).populate(
      "userId",
      "name"
    );
    res.status(200).json({ success: true, employees });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while getting employees details by department id",
    });
  }
};
