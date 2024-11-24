import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { getSalary, addSalary } from "../controllers/salaryController.js";

const router = express.Router();

router.post("/add", authMiddleware, addSalary);
router.get("/employee/:id", authMiddleware, getSalary);

export default router;
