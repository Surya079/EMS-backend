import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { upload } from "../controllers/employeeController.js";
import {
  getEmployees,
  addEmployee,
  getEmployee,
  updateEmployee,
  fetchEmployeeDepId
} from "../controllers/employeeController.js";

const router = express.Router();

router.get("/", authMiddleware, getEmployees);
router.post("/add", authMiddleware, upload.single("image"), addEmployee);
router.get("/:id", authMiddleware, getEmployee);
router.put("/:id", authMiddleware,updateEmployee );
router.get("/department/:id", authMiddleware, fetchEmployeeDepId);

export default router;
