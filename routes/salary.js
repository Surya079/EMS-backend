import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  getSalary,
  addSalary,
  getEmpSalary,
  getSalaries,
} from "../controllers/salaryController.js";

const router = express.Router();

router.post("/add", authMiddleware, addSalary);
router.get("/employee/:id", authMiddleware, getSalary);
router.get("/:id", authMiddleware, getEmpSalary);
router.get("/all/salaries", authMiddleware, getSalaries);

export default router;
