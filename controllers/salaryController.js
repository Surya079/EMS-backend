import { Salary } from "../models/Salary.js";
import { Employee } from "../models/Employee.js";

const addSalary = async (req, res) => {
  try {
    const { employeeId, basicSalary, allowances, deductions, payDate } =
      req.body;

    const totalNetSalary =
      parseInt(basicSalary) + parseInt(allowances) - parseInt(deductions);

    const newSalary = new Salary({
      employeeId,
      basicSalary,
      allowances,
      deductions,
      netSalary: totalNetSalary,
      payDate,
    });

    const savedSalary = await newSalary.save();

    if (savedSalary) {
      return res.status(200).json({ success: true, savedSalary });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error while adding salary",
    });
  }
};

const getSalary = async (req, res) => {
  try {
    const { id } = req.params;

    const findEmployee = await Employee.findById({ _id: id }).populate(
      "userId",
      "name"
    );
    if (!findEmployee) {
      return res
        .status(401)
        .json({ success: false, message: "User not found" });
    }
    const salarybyEmp = await Salary.find({ employeeId: id });
    const salaryData = salarybyEmp.map((salary) => ({
      ...salary._doc,
      employeeName: findEmployee.userId.name,
    }));

    return res.status(200).json({
      success: true,
      salaryData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error while getting salary",
    });
  }
};
const getEmpSalary = async (req, res) => {
  try {
    const { id } = req.params;

    const findEmployee = await Employee.findOne({ userId: id }).populate(
      "userId",
      "name"
    );

    let salary;
    salary = await Salary.find({ employeeId: id }).populate(
      "employeeId",
      "employeeId"
    );
    if (!salary || salary.length < 1) {
      const employee = await Employee.findOne({ userId: id }).populate(
        "userId",
        "name"
      );
      salary = await Salary.find({ employeeId: employee._id }).populate(
        "employeeId",
        "employeeId"
      );
    }
    salary = salary.map((sal) => ({
      ...sal._doc, // _doc is used to access other properties and values
      employeeName: findEmployee.userId.name,
    }));
    return res.status(200).json({ success: true, salary });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error while getting salary",
    });
  }
};
const getSalaries = async (req, res) => {
  try {
    const salaryData = await Salary.find();

    if (!salaryData || salaryData.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No salary found",
      });
    }

    return res.status(200).json({
      success: true,
      salaryData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error while getting all salary",
    });
  }
};

export { getSalary, addSalary, getEmpSalary, getSalaries };
