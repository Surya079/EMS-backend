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
      res.status(200).json({ success: true, savedSalary });
    }
  } catch (error) {
    console.log("server error , adding salary", error);
    res.status(500).json({
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
      res.status(401).json({ success: false, message: "User not found" });
    }
    const salarybyEmp = await Salary.find({ employeeId: id });
    const salaryData = salarybyEmp.map((salary) => ({
      ...salary._doc,
      employeeName: findEmployee.userId.name,
    }));
    res.status(200).json({
      success: true,
      salaryData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error while getting salary",
    });
  }
};
export { getSalary, addSalary };
