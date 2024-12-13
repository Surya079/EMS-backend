import { Department } from "../models/Department.js";

const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    return res.status(200).json({ success: true, departments });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "error while getting department in server",
    });
  }
};

const addDepartment = async (req, res) => {
  try {
    const { dep_name, description } = req.body;
    const newDepartment = new Department({
      dep_name: dep_name,
      description: description,
    });
    await newDepartment.save();
    return res.status(200).json({ succes: true, department: newDepartment });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Server error in department" });
  }
};

const getDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const department = await Department.findById({ _id: id });

    return res.status(200).json({ succes: true, department });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Server error in department by id" });
  }
};

const updateDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const { dep_name, description } = req.body;

    const department = await Department.findByIdAndUpdate(
      { _id: id },
      {
        dep_name,
        description,
      }
    );

    return res.status(200).json({ succes: true, department });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Server error in department" });
  }
};

const deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const department = await Department.findById({ _id: id });

    await department.deleteOne();
    return res
      .status(200)
      .json({ success: true, message: "Department deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Server error in department" });
  }
};
export {
  addDepartment,
  getDepartments,
  getDepartment,
  updateDepartment,
  deleteDepartment,
};
